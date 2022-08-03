<script lang="ts" setup>
import { ref, reactive, watch, defineExpose } from "vue"
import { ElMessage, ElNotification, ElMessageBox } from "element-plus"
import CustomTable from "@/components/customTable/customTable.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { useTeacherFormCenterExam } from "@/store/teacher/formCenter/exam"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"
import { storeToRefs } from "pinia"
import { printPDF } from "@/utils/print.ts"
import { ok } from "assert"

const teacherPublic = useTeacherPublic()
const teacherCourse = useTeacherCourse()
const teacherHomework = useTeacherHomework()
const teacherFormCenterExam = useTeacherFormCenterExam()

const { courseClassList } = storeToRefs(teacherPublic)
const { courseNameList, semesterList } = storeToRefs(teacherCourse)
const { teachingTaskShowList, saveFlag, changeFlag, oldTeaList } = storeToRefs(teacherFormCenterExam)

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
		.getCourseSelect({
			courseName: queryForm.courseName,
			semester: queryForm.semester
		})
		.then((res: any) => {
			queryIDForm.courseId = res.result
			// 获取班级下拉框
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId).then((res: any) => {
				queryForm.class = res.result[0].value
				queryIDForm.classId = res.result[0].value
				teacherFormCenterExam.getTeacherTask(queryIDForm)
			})
		})
})
// 是否保存
const saveOrNot = () => {
	if (JSON.stringify(teachingTaskShowList.value) == JSON.stringify(oldTeaList.value)) {
		changeFlag.value = false
	} else {
		changeFlag.value = true
	}
	if (changeFlag.value) {
		ElMessageBox.confirm("教学任务表改变,是否保存?", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				okSave()
			})
			.catch(() => {
				teacherFormCenterExam.getTeacherTask(queryIDForm)
			})
	} else {
		teacherFormCenterExam.getTeacherTask(queryIDForm)
	}
}
const courseNameChange = (val: string) => {
	queryForm.courseName = val
	teacherCourse.getTermForCourseName(val).then((res: any) => {
		queryForm.semester = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.courseId = res1.result
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId).then((res2: any) => {
				queryForm.class = res2.result[0].value
				queryIDForm.classId = res2.result[0].value
				saveOrNot()
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
				saveOrNot()
			})
		})
	})
}
const classChange = (val: string) => {
	queryIDForm.classId = val
	saveOrNot()
}

/**
 * 保存
 */
const okSave = () => {
	let map = {
		classId: queryIDForm.classId,
		courseId: queryIDForm.courseId,
		content: {}
	}
	teachingTaskShowList.value.forEach(v => {
		let prop = "num" + v.sort
		map.content[prop] = {
			// 是否通过
			isPass: v.isPass,
			// 备注
			remark: v.remark
			// 自查内容及要求
			// claimAndCon: v.claimAndCon
		}
	})
	teacherFormCenterExam.updateTeacherTask(map).then(res => {
		if (res.success) {
			ElNotification({
				title: "保存成功",
				type: "success"
			})
			teacherFormCenterExam.getTeacherTask(queryIDForm)
		} else {
			ElNotification({
				title: "保存失败",
				type: "warning"
			})
		}
	})
}
/**
 * 导出任务确认表
 */
const exportTT = () => {
	teacherFormCenterExam
		.exportTeaTask({
			courseId: queryIDForm.courseId,
			classId: queryIDForm.classId
		})
		.then(res => {
			if (res.success) {
				// printPDF(res.result)
				window.open(res.result)
			} else {
				ElNotification({
					title: "打印失败",
					type: "warning"
				})
			}
		})
}
const exportTeaTask = () => {
	if (saveFlag.value) {
		if (JSON.stringify(teachingTaskShowList.value) == JSON.stringify(oldTeaList.value)) {
			changeFlag.value = false
		} else {
			changeFlag.value = true
		}
		if (changeFlag.value) {
			ElMessageBox.confirm("教学任务表改变,是否保存?", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(res => {
					let map = {
						classId: queryIDForm.classId,
						courseId: queryIDForm.courseId,
						content: {}
					}
					teachingTaskShowList.value.forEach(v => {
						let prop = "num" + v.sort
						map.content[prop] = {
							// 是否通过
							isPass: v.isPass,
							// 备注
							remark: v.remark
						}
					})
					teacherFormCenterExam.updateTeacherTask(map).then(res => {
						if (res.success) {
							ElNotification({
								title: "保存成功",
								type: "success"
							})
							teacherFormCenterExam.getTeacherTask(queryIDForm).then(res => {
								exportTT()
							})
						} else {
							ElNotification({
								title: "保存失败",
								type: "warning"
							})
						}
					})
				})
				.catch(() => {
					exportTT()
				})
		} else {
			exportTT()
		}
	} else {
		ElNotification({
			title: "当前表未保存",
			type: "warning"
		})
	}
}
defineExpose({
	queryIDForm,
	okSave
})
</script>
<template>
	<div id="form">
		<div class="title">教学任务确认表</div>
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

		<CustomTable class="table" :data="teachingTaskShowList" border max-height="625px">
			<template #default>
				<el-table-column label="序号" prop="sort" width="60"> </el-table-column>
				<el-table-column label="自查内容及要求" prop="claimAndCon"> </el-table-column>
				<el-table-column label="是否合格" width="140">
					<template #default="scope">
						<el-radio-group v-model="scope.row.isPass" class="ml-4">
							<el-radio label="是">是</el-radio>
							<el-radio label="否">否</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>
				<el-table-column label="备注">
					<template #default="scope">
						<el-input type="textarea" v-model="scope.row.remark" />
					</template>
				</el-table-column>
			</template>
		</CustomTable>

		<div class="formCoreBtn">
			<el-button class="preview" @click="okSave">保存</el-button>
			<el-button class="goPrint" @click="exportTeaTask">导出表</el-button>
			<!-- <el-button class="goPrint" @click="exportTeaTask">去打印</el-button> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
#form {
	width: 100%;
	height: 100%;
	.title {
		width: 100%;
		text-align: center;
		font-size: 24px;
		font-weight: 500;
		color: #646464;
		line-height: 66px;
	}
	:deep(.el-form-item__label) {
		height: 42px;
		line-height: 42px;
		font-size: 16px;
	}
	:deep(.el-table) {
		.el-table__cell {
			height: 50px;
			.cell {
				text-align: center;
			}
		}
	}
	.formCoreBtn {
		padding: 10px;
		text-align: right;
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
			width: 135px;
			background: #479fec;
		}
		.preview {
			width: 72px;
			background: #479fec;
		}
		.goPrint {
			width: 88px;
			background-color: #2ebba3;
		}
	}
}
</style>
