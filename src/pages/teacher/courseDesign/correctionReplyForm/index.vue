<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive } from "vue"
import { ElNotification } from "element-plus"
import type { FormInstance } from "element-plus"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherCourseDesign } from "@/store/teacher/courseDesign.ts"
import { storeToRefs } from "pinia"

const teacherPublic = useTeacherPublic()
const teacherCourseDesign = useTeacherCourseDesign()
// 获取专业班级下拉框
teacherPublic.getAllClassSelect()
// 获取课设列表
teacherCourseDesign.getAllDesginSelect()

const { majorClassList } = storeToRefs(teacherPublic)
const { desginList, stuList, stuListCount } = storeToRefs(teacherCourseDesign)

let desginForm = reactive({
	courseDesignId: "",
	classId: ""
})
// 答辩表预览打分
let radioCell = ref()
let showStuForm = ref(false)
let infoForm = reactive({
	id: "",
	defenseScore: "",
	defenseOpinion: ""
})
let pdfUrl = ref("")
// 分页
let currentPage = ref(1) // 当前页数
let totalNum = ref(0) // 总页数
let pageSize = ref(20) // 每页要展示数据条数
let showPage = ref([]) // 每页展示的数据
// 切换清空值
const changeSec = () => {
	radioCell.value = ""
	showStuForm.value = false
	pdfUrl.value = ""
}
// 获取分页数据
const getPage = (num: any) => {
	changeSec()
	currentPage.value = num
	let list = (currentPage.value - 1) * pageSize.value
	showPage.value = stuList.value.slice(list, list + pageSize.value)
	console.log(showPage, "showPage")
}
getPage(1)
const prevPage = () => {
	getPage(currentPage.value)
}
const nextPage = () => {
	getPage(currentPage.value)
}
const courseChange = (val: any) => {
	changeSec()
	desginForm.courseDesignId = val
	teacherCourseDesign.getDesignDefenseList(desginForm).then((res: any) => {
		totalNum.value = Math.ceil(stuListCount.value / pageSize.value)
		getPage(1)
	})
}
const classChange = (val: any) => {
	changeSec()
	desginForm.classId = val
	teacherCourseDesign.getDesignDefenseList(desginForm).then((res: any) => {
		totalNum.value = Math.ceil(stuListCount.value / pageSize.value)
		getPage(1)
	})
}
const radioChange = (val: any) => {
	showStuForm.value = false
	pdfUrl.value = ""
	infoForm.id = val
	// 获取答辩表
	teacherCourseDesign.getDesignDefenseFile(val).then((res: any) => {
		showStuForm.value = true
		infoForm.defenseScore = res.result.defenseScore
		infoForm.defenseOpinion = res.result.defenseOption
		pdfUrl.value = res.result.pdfUrl
	})
}

const infoFormRef = ref()
const rules = reactive({
	defenseScore: [{ required: true, message: "请输入分数", trigger: "blur" }],
	defenseOpinion: [{ required: true, message: "请输入答辩意见", trigger: "blur" }]
})
// 答辩成绩
const complete = () => {
	infoFormRef.value.validate(async (valid: any) => {
		if (valid) {
			teacherCourseDesign.updateDesignDefenseObjective(infoForm).then(res => {
				ElNotification({
					title: "答辩记录表批改成功",
					type: "success"
				})
				teacherCourseDesign.getDesignDefenseList(desginForm).then(res => {
					getPage(currentPage.value)
				})
			})
		}
	})
}
</script>
<template>
	<div id="cRForm">
		<div class="choice">
			<CustomSelect
				@change="courseChange"
				v-model="desginForm.courseDesignId"
				:localdata="desginList"
				placeholder="请选择课设"
			></CustomSelect>

			<CustomSelect
				@change="classChange"
				v-model="desginForm.classId"
				:localdata="majorClassList"
				placeholder="请选择班级"
			></CustomSelect>

			<div class="choiceCell">
				<div class="paging">
					<div class="title">学生</div>
					<el-pagination
						layout="prev, next"
						:total="stuListCount"
						:page-size="pageSize"
						v-model:currentPage="currentPage"
						@prev-click="prevPage"
						@next-click="nextPage"
					/>
				</div>
				<div class="cells">
					<el-radio-group v-model="radioCell" @change="radioChange">
						<div class="cell" v-for="(item, index) in showPage" :key="item.defenseRecordId">
							<el-radio :label="item.defenseRecordId">{{ item.studentName }}</el-radio>
							<i v-if="item.state === 2" class="iconfont icon-chenggong1" style="color: #2ebba3"></i>
							<i
								v-if="item.state === 1"
								class="iconfont icon-qingjiashenqing-daiban-05"
								style="color: #ff7537"
							></i>
						</div>
					</el-radio-group>
				</div>
			</div>
		</div>
		<!-- 学生的答辩表 -->
		<div class="stuForm" v-if="showStuForm">
			<!-- 预览 -->
			<div class="defenseForm">
				<iframe class="ptf" ref="mainiframe" :src="pdfUrl"></iframe>
			</div>
			<div class="infoForm">
				<el-form ref="infoFormRef" :rules="rules" :model="infoForm" label-position="left">
					<el-form-item label="答辩成绩：" prop="defenseScore" class="achievement">
						<el-input-number v-model="infoForm.defenseScore" :min="0" :max="100" :controls="false" />
						<span class="company">分</span>
					</el-form-item>
					<el-form-item label="答辩小组意见：" prop="defenseOpinion" class="opinion">
						<el-input v-model="infoForm.defenseOpinion" type="textarea" />
					</el-form-item>
					<el-form-item class="complete">
						<el-button @click="complete()">完成</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#cRForm {
	display: flex;
	justify-content: start;
	position: relative;
	padding: 20px;
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
	.choice {
		width: 270px;
		margin-top: 36px;
		margin-left: 40px;
		:deep(.el-select) {
			width: 270px;
			height: 36px;
			margin-top: 16px;
			.el-input__wrapper {
				margin: 0;
			}
			.el-input__inner {
				height: 34px;
			}
		}
		.choiceCell {
			margin-top: 16px;
			box-sizing: border-box;
			width: 270px;
			color: #8f9795;
			.paging {
				position: relative;
				box-sizing: border-box;
				width: 269px;
				height: 50px;
				border: 1px solid #d4d4d4;
				margin-bottom: -1px;
				.title {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					color: #646464;
					letter-spacing: 2px;
					line-height: 50px;
					font-size: 16px;
				}

				:deep(.el-pagination) {
					padding: 0;
					position: relative;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: space-around;
					i {
						font-size: 18px;
						color: #89918f;
					}
					.btn-prev {
						position: absolute;
						left: 15px;
					}
					.btn-next {
						position: absolute;
						right: 15px;
					}
				}
			}
		}
		.cells {
			display: flex;
			flex-wrap: wrap;
			.cell {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				margin: 0px -1px -1px 0px;
				padding: 0 10px;
				width: 135px;
				height: 60px;
				border: 1px solid #d4d4d4;
				line-height: 60px;
				:deep(.el-radio) {
					width: 95px;
					margin-right: 4px;
					.el-radio__input {
						.el-radio__inner {
							width: 16px;
							height: 16px;
						}
					}
					.el-radio__label {
						font-size: 16px;
						font-family: Source Han Sans CN-Regular, Source Han Sans CN;
						font-weight: 400;
						color: #646464;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				i {
					font-size: 16px;
					font-weight: bold;
				}
			}
		}
	}
	.stuForm {
		display: flex;
		margin-left: 100px;
		.defenseForm {
			width: 620px;
			height: 765px;
			overflow: hidden;
			.ptf {
				width: 100%;
				height: 100%;
			}
		}
		.infoForm {
			margin: 300px 0 0 100px;
			:deep(.el-form) {
				width: 380px;
				.el-form-item__label {
					font-family: Source Han Sans CN-Normal, Source Han Sans CN;
					font-weight: 400;
					color: #646464;
					font-size: 16px;
					height: 36px;
					line-height: 36px;
				}
				.el-input__wrapper {
					border-radius: 0;
				}
				.el-input {
					height: 36px;
				}
				.achievement {
					.el-input-number {
						width: 0;
						.el-input__wrapper {
							padding: 0;
							width: 90px;
						}
					}
					.el-input {
						width: 90px;
					}
					.company {
						margin-left: 9px;
						font-size: 16px;
						color: #646464;
					}
				}
				.groupLeader {
					.el-input {
						width: 123px;
					}
				}
				.opinion {
					display: block;
					.el-textarea__inner {
						width: 380px;
						height: 270px;
					}
				}
				.complete {
					.el-form-item__content {
						justify-content: end;
						.el-button {
							width: 68px;
							height: 32px;
							color: white;
							background: #2ebba3;
							border: none;
							border-radius: 0;
						}
					}
				}
			}
		}
	}
}
</style>
