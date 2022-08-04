<script lang="ts" setup>
import TaskTabs from "./components/index.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"

import { ref, reactive, onMounted } from "vue"
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"

import { storeToRefs } from "pinia"

const teacherPublic = useTeacherPublic()
const teacherCourse = useTeacherCourse()
const teacherHomework = useTeacherHomework()

const { courseClassList, scoreWeightList, swFlag } = storeToRefs(teacherPublic)
const { courseNameList, semesterList } = storeToRefs(teacherCourse)

// 表单值
let queryForm = reactive({
	courseName: "",
	semester: ""
})
// 表单查询 学生表查询
let queryIDForm = reactive({
	courseId: "",
	classId: "",
	type: ""
})

// 首次获取课程，开课日期
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
	teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
		queryIDForm.courseId = res1.result
		// 获取权重
		teacherPublic.getCourse(queryIDForm.courseId).then((res2: any) => {
			teacherPublic.getAllScoreWeight(res2.result.outlineId).then((res3: any) => {
				if (swFlag.value) {
					queryIDForm.type = scoreWeightList.value[0].value
					teacherHomework.getAllStuHomeworkDetail(queryIDForm)
				}
			})
		})
		// 获取班级
		teacherPublic.getAllCourseClassSelect(queryIDForm.courseId)
	})
})

let activeName = ref("0")

const courseNameChange = (val: string) => {
	queryForm.courseName = val
	teacherCourse.getTermForCourseName(val).then((res: any) => {
		queryForm.semester = res.result[0].value
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.courseId = res1.result
			teacherPublic.getCourse(queryIDForm.courseId).then((res2: any) => {
				activeName.value = "0"
				teacherPublic.getAllScoreWeight(res2.result.outlineId).then((res3: any) => {
					if (swFlag.value) {
						queryIDForm.type = scoreWeightList.value[0].value
						teacherHomework.getAllStuHomeworkDetail(queryIDForm)
					}
				})
			})
			queryIDForm.classId = ""
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId)
		})
	})
}
const semesterChange = (val: string) => {
	queryForm.semester = val
	teacherCourse.getCourseNameForTrem(val).then((res: any) => {
		queryForm.courseName = res.result[0].value
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			queryIDForm.courseId = res1.result
			teacherPublic.getCourse(queryIDForm.courseId).then((res2: any) => {
				activeName.value = "0"
				teacherPublic.getAllScoreWeight(res2.result.outlineId).then((res3: any) => {
					if (swFlag.value) {
						queryIDForm.type = scoreWeightList.value[0].value
						teacherHomework.getAllStuHomeworkDetail(queryIDForm)
					}
				})
			})
			queryIDForm.classId = ""
			teacherPublic.getAllCourseClassSelect(queryIDForm.courseId)
		})
	})
}
const classChange = (val: string) => {
	queryIDForm.classId = val
	activeName.value = "0"
	teacherHomework.getAllStuHomeworkDetail(queryIDForm)
}
const scoreWeightListChange = (val: any) => {
	queryIDForm.type = scoreWeightList.value[val].value
	teacherHomework.getAllStuHomeworkDetail(queryIDForm)
}
// onBeforeRouteLeave((to, from) => {
// 	activeName.value = ""
// 	scoreWeightList.value = []
// })
</script>
<template>
	<div id="taskCorrect">
		<el-form :inline="true" :model="queryForm" class="queryForm" label-width="80px">
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
					v-model="queryIDForm.classId"
					@change="classChange"
					:localdata="courseClassList"
					style="width: 178px"
					clearable
				/>
			</el-form-item>
		</el-form>

		<el-tabs v-model="activeName" v-if="swFlag" @tab-change="scoreWeightListChange">
			<el-tab-pane v-for="(item, index) in scoreWeightList" :key="item.value" :label="item.label" :name="index">
				<TaskTabs :queryIDFormFa="queryIDForm"></TaskTabs>
			</el-tab-pane>
		</el-tabs>

		<div v-else class="defaultPage"></div>
	</div>
</template>

<style lang="scss" scoped>
#taskCorrect {
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
	padding: 20px 0;

	:deep(.el-form) {
		margin-left: 40px;
		.el-form-item__label {
			height: 36px;
			line-height: 36px;
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
	}
	:deep(.el-tabs) {
		width: 98%;
		.el-tabs__nav {
			margin: 15px 0 0 50px;
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
				:hover {
					color: #2ebba3;
				}
			}
			.is-active {
				color: #2ebba3;
			}
		}
	}
	.defaultPage {
		height: 60%;
		background: url(@/assets/images/暂无内容.png) no-repeat center;
	}
}
</style>
