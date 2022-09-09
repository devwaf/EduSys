<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"

import { ElNotification } from "element-plus"

import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"
import { useTeacherFormCenterTotalMark } from "@/store/teacher/formCenter/totalMark.ts"
import { storeToRefs } from "pinia"
import { ref, reactive } from "vue"
import { printPDF } from "@/utils/print.ts"

const teacherPublic = useTeacherPublic()
const teacherCourse = useTeacherCourse()
const teacherHomework = useTeacherHomework()
const teacherFormCenterTotalMark = useTeacherFormCenterTotalMark()

const { courseClassList } = storeToRefs(teacherPublic)
const { courseNameList, semesterList } = storeToRefs(teacherCourse)
const { tmList, tmDicsList } = storeToRefs(teacherFormCenterTotalMark)

// 表单值
let queryForm = reactive({
	courseName: "",
	semester: "",
	class: ""
})
// 表单查询 学生表查询
let queryIDForm = reactive({
	courseId: "",
	classId: ""
})
// 首次获取课程，开课日期,班级
const initQueryForm = success => {
	Promise.all([teacherCourse.getAllCourseName(), teacherCourse.getAllTerm()]).then(([res1, res2]) => {
		if (res1.result.length && res2.result.length) {
			queryForm.courseName = res1.result[0].value
			queryForm.semester = res2.result[0].value
			if (success) success()
		}
	})
}

initQueryForm(() => {
	// 首次获取课程id
	teacherCourse
		.getCourseSelect({ courseName: queryForm.courseName, semester: queryForm.semester })
		.then((res: any) => {
			queryIDForm.courseId = res.result
			// 获取班级下拉框
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId).then((res: any) => {
				queryForm.class = res.result[0].value
				queryIDForm.classId = res.result[0].value
				teacherFormCenterTotalMark.getAllTable(queryIDForm)
			})
		})
})
const courseNameChange = (val: string) => {
	queryForm.courseName = val
	teacherCourse.getTermForCourseName(val).then((res: any) => {
		queryForm.semester = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.courseId = res1.result
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId).then((res2: any) => {
				queryForm.class = res2.result[0].value
				queryIDForm.classId = res2.result[0].value
				teacherFormCenterTotalMark.getAllTable(queryIDForm)
			})
		})
	})
}
const semesterChange = (val: string) => {
	queryForm.semester = val
	teacherCourse.getCourseNameForTrem(val).then((res: any) => {
		queryForm.courseName = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.courseId = res1.result
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId).then((res2: any) => {
				queryForm.class = res2.result[0].value
				queryIDForm.classId = res2.result[0].value
				teacherFormCenterTotalMark.getAllTable(queryIDForm)
			})
		})
	})
}
const classChange = (val: string) => {
	queryIDForm.classId = val
	teacherFormCenterTotalMark.getAllTable(queryIDForm)
}
// 导出
const exportAcm = () => {
	teacherFormCenterTotalMark.exportExcelHead(queryIDForm.courseId).then((res: any) => {
		window.open(res.result)
	})
}
// 上传
let headerToken = ref({
	Authorization: `Bearer ${localStorage.getItem("token")}`
})
let filePath = ref("")
// 文件上传之前的钩子
const fileBeforeUpload = (file: any) => {
	// 格式限制
	let fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1)
	let whiteList = ["xlsx", "xls"]
	if (whiteList.indexOf(fileSuffix) === -1) {
		ElNotification({
			title: "请上传excel文件",
			type: "warning"
		})
		return false
	}
}
// 文件上传成功的钩子
const fileSuccess = (res: any) => {
	filePath.value = res.result.path
	teacherFormCenterTotalMark
		.importScoreExcel({ filePath: filePath.value, courseId: queryIDForm.courseId })
		.then((res: Object) => {
			if (!res.result.result) {
				ElNotification({
					title: res.result.message,
					type: "warning"
				})
				return false
			} else if (res.result.result) {
				ElNotification({
					title: res.result.message,
					type: "warning"
				})
			}
		})
}
// 打印 导出
const goPrint = () => {
	teacherFormCenterTotalMark.exportAllTable(queryIDForm).then((res: any) => {
		// printPDF(res.result.message)
		window.open(res.result.message)
	})
}
</script>
<template>
	<div id="form">
		<div class="title">总评成绩表</div>
		<el-form :inline="true" :model="queryForm" class="queryForm" label-width="100px">
			<el-form-item label="课程名称：">
				<CustomSelect
					@change="courseNameChange"
					v-model="queryForm.courseName"
					:localdata="courseNameList"
					style="width: 178px"
				/>
			</el-form-item>
			<el-form-item label="开课学期：">
				<CustomSelect
					@change="semesterChange"
					v-model="queryForm.semester"
					:localdata="semesterList"
					style="width: 208px"
				/>
			</el-form-item>
			<el-form-item label="专业班级：">
				<CustomSelect
					v-model="queryForm.class"
					@change="classChange"
					:localdata="courseClassList"
					style="width: 178px"
				/>
			</el-form-item>
		</el-form>

		<CustomTable class="table" :data="tmDicsList" border ref="table" max-height="625px" stripe>
			<template #default>
				<el-table-column fixed label="序号" width="60">
					<template #default="scope"> {{ scope.$index + 1 }} </template>
				</el-table-column>
				<el-table-column v-for="(item, index) in tmList" :key="index" :prop="item.value" width="120">
					<template #header> {{ item.label }} </template>
				</el-table-column>
			</template>
		</CustomTable>

		<div class="formCoreBtn">
			<el-button class="exportAcm" @click="exportAcm">导出模板</el-button>
			<el-upload
				style="width: 135px"
				ref="uploadBox"
				action="http://101.133.234.110:10203/api/File/FileUpload"
				:show-file-list="false"
				:headers="headerToken"
				:data="{ Module: 'recovery' }"
				:file-list="fileList"
				:before-upload="fileBeforeUpload"
				:on-success="fileSuccess"
			>
				<el-button class="importAcm">导入考试成绩</el-button>
			</el-upload>
			<!-- <el-button class="goPrint" @click="goPrint">去打印</el-button> -->
			<el-button class="goPrint" @click="goPrint">导出表</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#form {
	width: 100%;
	.title {
		width: 100%;
		text-align: center;
		font-size: 24px;
		font-weight: 500;
		color: #646464;
		line-height: 66px;
	}
	:deep(.el-form-item__label) {
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}
	:deep(.el-input__wrapper) {
		height: 34px;
		margin: 0;
		border-radius: 0;
		font-size: 14px;
	}
	:deep(.el-table) {
		width: 98%;
		.el-table__header {
			th {
				background: #f9f9f9;
			}
		}
		.el-table__cell {
			height: 50px;
			.cell {
				text-align: center;
				font-size: 14px;
			}
			.edit {
				cursor: pointer;
				color: #2ebba3;
				:deep(.el-input) {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.formCoreBtn {
		// width: 350px;
		display: flex;
		justify-content: space-around;
		padding: 10px;
		box-sizing: border-box;
		margin-right: 20px;
		float: right;
		:deep(.el-button) {
			height: 40px;
			color: white;
			line-height: 0;
			border-radius: 0;
			border: none;
			span {
				line-height: 0;
			}
		}
		.importAcm {
			margin-right: 10px;
			width: 135px;
			background: #479fec;
		}
		.exportAcm,
		.goPrint {
			margin: 0 10px;
			width: 88px;
			background-color: #2ebba3;
		}
	}
}
</style>
