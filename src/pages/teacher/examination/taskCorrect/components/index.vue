<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive, toRefs, defineProps, watch } from "vue"
import { ElNotification } from "element-plus"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { storeToRefs } from "pinia"

const correctionList = [
	{ label: "已批改", value: "true" },
	{ label: "待批改", value: "false" }
]

const teacherHomework = useTeacherHomework()
const { stuDetailList, homeWorkTitle, homeWorkFlag } = storeToRefs(teacherHomework)

const props = defineProps({
	queryIDFormFa: String
})
const { queryIDFormFa } = toRefs(props)

// 学生状态筛选
let queryIDForm = ref({
	HomeworkId: "",
	state: ""
})

let stuStateArr = ref([])
let tableData = ref()
watch(
	homeWorkTitle,
	() => {
		let indexs, items
		stuStateArr.value.forEach((item, index) => {
			if (item) {
				items = item
				indexs = index
			}
		})
		stuStateArr.value = []
		homeWorkTitle.value.forEach(item => {
			stuStateArr.value.push("")
		})
		if (indexs != undefined && indexs + 1 <= stuStateArr.value.length) {
			stuStateArr.value[indexs] = items
		}
	},
	{
		deep: true
	}
)
const stuStateChange = (e: any, scope: any, index: any) => {
	stuStateArr.value = stuStateArr.value.map(item => {
		return (item = "")
	})
	stuStateArr.value[index] = e
	Object.assign(queryIDForm.value, queryIDFormFa?.value)
	if (stuDetailList.value.studentHomeworks.length) {
		queryIDForm.value.HomeworkId = stuDetailList.value.studentHomeworks[0].stuHomeworks[scope.$index - 5].homeworkId
		queryIDForm.value.state = e
		teacherHomework.getAllStuHomeworkDetail(queryIDForm.value)
	} else {
		teacherHomework
			.getAllStuHomeworkDetail({
				courseId: queryIDForm.value.courseId,
				classId: queryIDForm.value.classId,
				type: queryIDForm.value.type
			})
			.then(res => {
				queryIDForm.value.HomeworkId =
					stuDetailList.value.studentHomeworks[0].stuHomeworks[scope.$index - 5].homeworkId
				queryIDForm.value.state = e
				teacherHomework.getAllStuHomeworkDetail(queryIDForm.value)
			})
	}
}
// 批改弹窗
let dialogForm = reactive({
	id: "",
	remark: "",
	score: ""
})
let dialogFormVisible = ref(false)

let pdfUrl = ref()
const correct = (id: any, flag: any) => {
	dialogForm.id = id
	dialogFormVisible.value = true
	teacherHomework.getStudentHomework(id).then((res: any) => {
		pdfUrl.value = res.result
	})
	if (flag) {
		teacherHomework.getStudentHomeWorkScore(id).then((res: any) => {
			dialogForm.remark = res.result.remark
			dialogForm.score = res.result.score
		})
	}
}

let formRef = ref()
const rulesForm = reactive({
	remark: [{ required: true, message: "请输入评语", trigger: "blur" }],
	score: [{ required: true, message: "请输入分数", trigger: "blur" }]
})
const closeBtn = () => {
	formRef.value.resetFields()
	dialogFormVisible.value = false
}
const cancel = () => {
	formRef.value.resetFields()
	dialogFormVisible.value = false
}
const confirm = () => {
	formRef.value.validate(async (valid: any) => {
		if (valid) {
			teacherHomework.updateStudentHomeWork(dialogForm).then((res: any) => {
				formRef.value.resetFields()
				dialogFormVisible.value = false
				if (res.result.result) {
					ElNotification({
						title: "批改成功",
						type: "success"
					})
				} else {
					ElNotification({
						title: "批改失败",
						type: "warning"
					})
				}
				teacherHomework.getAllStuHomeworkDetail(Object.assign(queryIDForm.value, queryIDFormFa?.value))
			})
		}
	})
}
</script>
<template>
	<div id="taskCorrectTable">
		<div v-if="stuDetailList != {}">
			<div class="rate">批改情况:{{ stuDetailList.rate }}</div>
			<CustomTable
				class="table"
				ref="tableData"
				:data="stuDetailList.studentHomeworks"
				border
				max-height="630px"
				stripe
			>
				<template #default v-if="homeWorkFlag">
					<el-table-column fixed label="姓名" width="140">
						<template #default="scope">
							{{ scope.row.stuName }}
						</template>
					</el-table-column>
					<el-table-column label="班级" width="200">
						<template #default="scope">
							{{ scope.row.className }}
						</template>
					</el-table-column>
					<el-table-column label="学号" width="200">
						<template #default="scope">
							{{ scope.row.sno }}
						</template>
					</el-table-column>
					<el-table-column label="性别" width="82">
						<template #default="scope">
							{{ scope.row.gender ? "男" : "女" }}
						</template>
					</el-table-column>
					<el-table-column label="课程名字" width="200">
						<template #default="scope">
							{{ scope.row.courseName }}
						</template>
					</el-table-column>
					<template v-if="homeWorkFlag">
						<el-table-column width="200" v-for="(item, index) in homeWorkTitle" :key="index">
							<template #header="scope">
								{{ item }}
								<CustomSelect
									v-model="stuStateArr[index]"
									:localdata="correctionList"
									style="width: 105px"
									@change="stuStateChange($event, scope, index)"
									clearable
								/>
							</template>
							<template #default="scope">
								<div
									class="corrected"
									v-if="scope.row.stuHomeworks[index].state === true"
									@click="correct(scope.row.stuHomeworks[index].id, 1)"
								>
									<i class="iconfont icon-chenggong1"></i>
									<span>已批改</span>
								</div>
								<div
									class="uncorrected"
									v-if="scope.row.stuHomeworks[index].state === false"
									@click="correct(scope.row.stuHomeworks[index].id, 0)"
								>
									<i class="iconfont icon-qingjiashenqing-daiban-05"></i>
									<span>未批改</span>
								</div>
								<div style="text-align: center" v-if="scope.row.stuHomeworks[index].state === null">
									<span>未提交</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column width="140" v-for="(item, index) in homeWorkTitle" :key="index">
							<template #header> {{ item }}成绩 </template>
							<template #default="scope">
								<div
									style="text-align: center; color: #646464"
									v-if="scope.row.stuHomeworks[index].homeworkScore === null"
								>
									0
								</div>
								<div style="text-align: center; color: #646464" v-else>
									{{ scope.row.stuHomeworks[index].homeworkScore }}
								</div>
							</template>
						</el-table-column>
					</template>
				</template>
				<template #default v-else>
					<el-table-column fixed label="姓名" width="300">
						<template #default="scope">
							{{ scope.row.stuName }}
						</template>
					</el-table-column>
					<el-table-column label="班级" width="300">
						<template #default="scope">
							{{ scope.row.className }}
						</template>
					</el-table-column>
					<el-table-column label="学号" width="300">
						<template #default="scope">
							{{ scope.row.sno }}
						</template>
					</el-table-column>
					<el-table-column label="性别" width="300">
						<template #default="scope">
							{{ scope.row.gender ? "男" : "女" }}
						</template>
					</el-table-column>
					<el-table-column label="课程名字" width="300">
						<template #default="scope">
							{{ scope.row.courseName }}
						</template>
					</el-table-column>
				</template>
			</CustomTable>
		</div>

		<!-- 批改弹窗 -->
		<el-dialog
			v-model="dialogFormVisible"
			title="批改弹窗"
			style="width: 800px"
			:show-close="false"
			:close-on-click-modal="false"
		>
			<div @click="closeBtn" class="closeBtn"><i class="iconfont icon-CloseDefault"></i></div>

			<el-form :model="dialogForm" style="width: 90%; margin: auto" ref="formRef" :rules="rulesForm">
				<iframe class="ptf" ref="mainiframe" :src="pdfUrl" style="width: 100%"></iframe>
				<el-form-item label="评语：" prop="remark">
					<el-input v-model="dialogForm.remark" type="textarea" autocomplete="off" />
				</el-form-item>
				<el-form-item label="成绩：" prop="score">
					<el-input-number v-model="dialogForm.score" :min="0" :max="100" :controls="false" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel()">取消</el-button>
					<el-button @click="confirm()">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
#taskCorrectTable {
	width: 100%;
	height: 100%;
	.rate {
		position: absolute;
		right: 0px;
		font-size: 16px;
		font-family: Source Han Sans CN-Normal, Source Han Sans CN;
		color: #646464;
	}
	:deep(.el-select) {
		height: 30px !important;
		margin-left: 0 !important;
		.el-input {
			height: 30px;
		}
		.el-input__wrapper {
			margin: 0 !important;
		}
	}
	:deep(.el-table) {
		width: fit-content;
		max-width: 90%;
		margin-top: 5px;
		margin-left: 30px;
		.cell {
			font-size: 14px;
		}
		.el-table__header {
			height: 50px;
			font-size: 16px;
			color: #646464;
			th {
				background: #f9f9f9;
			}
		}
		.el-table__row {
			height: 50px;
			font-size: 16px;
			color: #646464;
		}
		.el-table__cell {
			.cell {
				padding: 0;
				text-align: center;
				.corrected,
				.uncorrected {
					text-align: center;
					span {
						margin-left: 5px;
						font-size: 14px;
					}
					i {
						vertical-align: middle;
						font-size: 20px;
					}
				}
				.corrected {
					cursor: pointer;
					color: #2ebba3;
				}
				.uncorrected {
					cursor: pointer;
					color: #ff7537;
				}
				.el-select {
					margin-left: 10px;
					width: 92px;
					height: 30px;
					.el-input {
						border-color: #d9d9d9;
					}
					.el-input__wrapper {
						border-radius: 0;
					}
				}
			}
		}
	}
	:deep(.el-dialog) {
		margin-top: 50px;
		width: 800px;
		height: 800px;
		.el-dialog__header {
			margin: 0;
			padding: 0;
			height: 40px;
			color: #646464;
			background: #f5f5f5;
			span {
				line-height: 40px;
				font-style: 16px;
				opacity: 0.6;
				margin-left: 24px;
			}
			.el-dialog__headerbtn {
				width: 0;
				height: 0;
				top: 3px;
				right: 34px;
				font-size: 18px;
				font-weight: bold;
				line-height: 40px;
			}
			.el-form-item__label {
				height: 36px;
				line-height: 36px;
				font-size: 16px;
				padding: 0;
			}
			.el-input__wrapper {
				height: 34px;
				margin: 0;
				// padding-right: 17px;
				border-radius: 0;
			}
			.el-input {
				height: 36px;
			}
			.el-textarea__inner {
				height: 100px;
			}
		}
		.el-dialog__body {
			padding: 0;
			padding-top: 30px;
			.closeBtn {
				position: absolute;
				top: 8px;
				right: 20px;
				cursor: pointer;
			}
			.el-textarea__inner {
				border-radius: 0px !important;
				min-height: 80px !important;
			}
			.el-input-number {
				width: 0;
				.el-input__wrapper {
					padding: 0;
					width: 64px;
				}
			}
			.el-input {
				width: 64px;
			}
			.ptf {
				width: 80%;
				height: 500px;
				overflow-y: hidden;
			}
		}
	}
}
</style>
