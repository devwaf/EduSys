<script lang="ts" setup>
import CustomSelect from "@/components/customSelect/customSelect.vue"
import FormBox from "./components/index.vue"
import { ref, reactive, watch } from "vue"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"
import { storeToRefs } from "pinia"

const teacherPublic = useTeacherPublic()
const teacherCourse = useTeacherCourse()
const teacherHomework = useTeacherHomework()

const { courseClassList } = storeToRefs(teacherPublic)
const { courseNameList, semesterList } = storeToRefs(teacherCourse)
// 表单值
let queryForm = reactive({
	courseName: "",
	semester: "",
	class: ""
})
// 表单查询 学生表查询
let queryIDForm = ref({
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
			queryIDForm.value.courseId = res.result
			// 获取班级下拉框
			teacherPublic.getAllCourseClassSelect(queryIDForm.value.courseId).then((res: any) => {
				queryForm.class = res.result[0].label
				queryIDForm.value.classId = res.result[0].value
			})
		})
})
const courseNameChange = (val: string) => {
	queryForm.courseName = val
	teacherCourse.getTermForCourseName(val).then((res: any) => {
		queryForm.semester = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.value.courseId = res1.result
			teacherPublic.getAllCourseClassSelect(queryIDForm.value.courseId).then((res2: any) => {
				activeName.value = "0"
				queryForm.class = res2.result[0].label
				queryIDForm.value.classId = res2.result[0].value
			})
		})
	})
}
const semesterChange = (val: string) => {
	queryForm.semester = val
	teacherCourse.getCourseNameForTrem(val).then((res: any) => {
		queryForm.courseName = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.value.courseId = res1.result
			teacherPublic.getAllCourseClassSelect(queryIDForm.value.courseId).then((res2: any) => {
				activeName.value = "0"
				queryForm.class = res2.result[0].label
				queryIDForm.value.classId = res2.result[0].value
			})
		})
	})
}
let activeName = ref("0")
const handleClick = pane => {
	queryIDForm.value.classId = courseClassList.value[pane.props.name].value
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
		<el-tabs v-model="activeName" @tab-click="handleClick" v-if="courseClassList.length">
			<el-tab-pane v-for="(item, index) in courseClassList" :key="item.value" :label="item.label" :name="index">
				<FormBox :queryId="queryIDForm"></FormBox>
			</el-tab-pane>
		</el-tabs>
		<div class="defaultPage" v-else></div>
	</div>
</template>

<style lang="scss" scoped>
#classGoalAchi {
	:deep(.el-form-item__label) {
		height: 36px;
		line-height: 36px;
		font-size: 16px;
	}
	:deep(.el-input__wrapper) {
		height: 34px;
		margin: 0;
		border-radius: 0;
		font-size: 14px;
	}
	.title {
		width: 100%;
		text-align: center;
		font-size: 24px;
		font-weight: 500;
		color: #646464;
		line-height: 66px;
	}
	:deep(.el-tabs__nav) {
		.el-tabs__active-bar .is-top {
			width: 80px;
		}
		.el-tabs__active-bar {
			background-color: #2ebba3;
		}
		.el-tabs__item {
			width: 100px;
			color: #89918f;
			font-size: 16px;
			text-align: center;
			margin: 0 20px;
			:hover {
				color: #2ebba3;
			}
		}
		.is-active {
			color: #2ebba3;
		}
	}
	.defaultPage {
		width: 615px;
		height: 60%;
		background: url(@/assets/images/暂无内容.png) no-repeat center;
	}
}
</style>
