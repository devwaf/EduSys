<script lang="ts" setup>
import CustomSelect from "@/components/customSelect/customSelect.vue"
import FormBox from "./components/index.vue"
import { ref, reactive } from "vue"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"
import { storeToRefs } from "pinia"

const teacherCourse = useTeacherCourse()
const teacherHomework = useTeacherHomework()

const { courseNameList, semesterList } = storeToRefs(teacherCourse)
// 表单值
let queryForm = reactive({
	courseName: "",
	semester: ""
})
// 表单查询 学生表查询
let courseId = ref("")
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
			courseId.value = res.result
		})
})
const courseNameChange = (val: string) => {
	queryForm.courseName = val
	teacherCourse.getTermForCourseName(val).then((res: any) => {
		queryForm.semester = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			courseId.value = res1.result
		})
	})
}
const semesterChange = (val: string) => {
	queryForm.semester = val
	teacherCourse.getCourseNameForTrem(val).then((res: any) => {
		queryForm.courseName = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			courseId.value = res1.result
		})
	})
}
</script>
<template>
	<div id="classGoalAchi">
		<div class="title">班级目标达成度（2021至2022学年第一学期）</div>
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
		</el-form>
		<div class="light"></div>
		<FormBox :courseId="courseId"></FormBox>
	</div>
</template>

<style lang="scss" scoped>
#classGoalAchi {
	:deep(.el-form-item__label) {
		height: 36px;
		line-height: 42px;
		font-size: 16px;
	}
	.title {
		width: 100%;
		text-align: center;
		font-size: 24px;
		font-weight: 500;
		color: #646464;
		line-height: 66px;
	}
	.light {
		width: 98%;
		height: 2px;
		background-color: #e4e7ed;
	}
}
</style>
