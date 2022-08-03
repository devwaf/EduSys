<script lang="ts" setup>
import { reactive, ref } from "vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import CustomTable from "@/components/customTable/customTable.vue"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { storeToRefs } from "pinia"

const teacherPublic = useTeacherPublic()
const teacherCourse = useTeacherCourse()

const { majorClassList } = storeToRefs(teacherPublic)
const { courseNameList, semesterList } = storeToRefs(teacherCourse)

const printFormData = reactive({
	courseName: "",
	semester: "",
	class: ""
})
// 获取课程
teacherCourse.getAllCourseName().then((res: any) => {
	printFormData.courseName = res.result[0].value
})
// 获取开课学期
teacherCourse.getAllTerm().then((res: any) => {
	printFormData.semester = res.result[0].value
})
// 获取专业班级下拉框
teacherPublic.getAllClassSelect().then((res: any) => {
	printFormData.class = res.result[0].value
})
const showPrintTable = ref(false)
const preview = () => {
	showPrintTable.value = !showPrintTable.value
}
let taskCorrectList = reactive([
	{
		class: "1班",
		studentID: 123456789,
		name: "龙傲天",
		sex: "男",
		report: 97,
		defence: 99,
		generalComment: 95
	},
	{
		class: "2班",
		studentID: 123456789,
		name: "叶凡",
		sex: "男",
		report: 97,
		defence: 90,
		generalComment: 85
	},
	{
		class: "3班",
		studentID: 123456789,
		name: "刘亦菲",
		sex: "女",
		report: 97,
		defence: 91,
		generalComment: 98
	}
])
</script>

<template>
	<div id="print">
		<div class="condition">
			<el-form :inline="true" :model="printFormData" class="form-inline">
				<el-form-item label="课程名称：">
					<CustomSelect
						@change="courseNameChange"
						v-model="printFormData.courseName"
						:localdata="courseNameList"
					/>
				</el-form-item>
				<el-form-item label="开课学期：">
					<CustomSelect
						@change="startDateChange"
						v-model="printFormData.semester"
						:localdata="semesterList"
					/>
				</el-form-item>
				<el-form-item label="专业班级：">
					<CustomSelect @change="classChange" v-model="printFormData.class" :localdata="majorClassList" />
				</el-form-item>
			</el-form>
			<table class="archiveData" border="1" cellspacing="0">
				<tr>
					<td class="title">存档资料</td>
				</tr>
				<tr>
					<td class="content active" @click="preview()">
						<el-icon><Check /></el-icon>总成绩表
					</td>
				</tr>
			</table>

			<div class="printFun" v-show="showPrintTable">
				<div class="printPreview">
					<div class="title">打印预览</div>
					<div class="content">
						<CustomTable class="table" :data="taskCorrectList" border style="width: 100%">
							<template #default>
								<el-table-column label="班级" width="120">
									<template #default="scope">
										{{ scope.row.class }}
									</template>
								</el-table-column>
								<el-table-column label="学号" width="120">
									<template #default="scope">
										{{ scope.row.studentID }}
									</template>
								</el-table-column>
								<el-table-column label="姓名" width="100">
									<template #default="scope">
										{{ scope.row.name }}
									</template>
								</el-table-column>
								<el-table-column label="性别" width="60">
									<template #default="scope">
										{{ scope.row.sex }}
									</template>
								</el-table-column>
								<el-table-column label="课设报告" width="100">
									<template #default="scope">
										{{ scope.row.report }}
									</template>
								</el-table-column>
								<el-table-column label="答辩" width="60">
									<template #default="scope">
										{{ scope.row.defence }}
									</template>
								</el-table-column>
								<el-table-column label="总评" width="60">
									<template #default="scope">
										{{ scope.row.generalComment }}
									</template>
								</el-table-column>
							</template>
						</CustomTable>
					</div>
				</div>
				<div class="printBtn">
					<span>表单打印：</span>
					<el-button>打印</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#print {
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	position: relative;
	padding: 20px;
	background-color: #fff;
	.condition {
		width: 100%;
		height: 100%;
		float: left;

		.form-inline {
			width: 100%;
			:deep(.el-form-item) {
				color: #646464 !important;
				margin-left: 15px;
				height: 36px;
				.el-form-item__label {
					height: 36px;
					line-height: 36px;
					font-size: 16px;
					padding: 0;
				}
				.el-input__wrapper {
					height: 34px;
					margin: 0;
					padding-right: 17px;
				}
			}
		}
		.archiveData {
			margin-left: 10px;
			border-color: #d8d8d8;
			td {
				width: 265px;
				height: 64px;
				font-size: 16px;
				text-align: center;
				line-height: 64px;
				color: #a4a4a4;
				background-color: none;

				i {
					position: relative;
					top: 2px;
					margin-right: 5px;
					box-sizing: border-box;
					border: 1px solid #a4a4a4;
					border-radius: 2px;
				}
			}
			.content {
				cursor: pointer;
			}
			.active {
				color: #2ebba3;
				i {
					border-color: #2ebba3;
				}
			}
			.title {
				height: 48px;
				line-height: 48px;
				color: #646464;
				background-color: #f9f9f9;
			}
		}
	}
	.printFun {
		position: absolute;
		top: 100px;
		right: 20px;
		width: 55%;
		// height: 100%;
		float: left;
		color: #646464;
		.printPreview {
			.title {
				width: 485px;
				height: 48px;
				background: #f9f9f9;
				border: 1px solid #d8d8d8;
				line-height: 48px;
				text-align: center;
				font-size: 20px;
			}
			.content {
				position: absolute;
				left: -72px;
				width: 620px;
				margin-top: 30px;
			}
		}
		.printBtn {
			position: absolute;
			top: 200px;
			left: 600px;
			font-size: 16px;
			color: #646464;
			:deep(.el-button) {
				width: 72px;
				height: 40px;
				color: white;
				line-height: 0;
				border-radius: 0;
				background-color: #2ebba3;
			}
		}
	}
}
</style>
