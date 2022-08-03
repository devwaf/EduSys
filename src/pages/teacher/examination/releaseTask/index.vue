<script lang="ts" setup>
import { onMounted, nextTick, reactive, ref } from "vue"
import { ElNotification } from "element-plus"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { fileTypeList } from "@/utils/teacher.ts"
import { service } from "@/api/service"
import router from "@/router/router.ts"

import { useTeacherPublic } from "@/store/teacher/public.ts"
import { useTeacherHomework } from "@/store/teacher/homework.ts"
import { storeToRefs } from "pinia"

const teacherPublic = useTeacherPublic()
const teacherHomework = useTeacherHomework()
const { allCourseSelect, outlineId, semester, scoreWeightList, classList, timesList } = storeToRefs(teacherPublic)
// 获取课程下拉框
teacherPublic.getAllCourseSelect()
// // 获取所有专业班级
// teacherPublic.getAllClasses()

let taskFormData = reactive({
	name: "",
	// classesId: [],
	fileType: "",
	courseId: "",
	type: "",
	times: "",
	closingDate: "",
	isNotSendMessage: false
})

let typeId = ref("")

const publishedBtn = () => {
	router.push({ name: "PublishedTask" })
}
const courseChange = async (val: any) => {
	taskFormData.type = ""
	taskFormData.times = ""
	timesList.value = []

	// 获取当前课程的信息
	await teacherPublic.getCourse(val)
	// 获取所有权重
	teacherPublic.getAllScoreWeight(outlineId.value)
}
const scoreWeightChange = (val: any) => {
	taskFormData.times = ""
	timesList.value = []
	typeId = val
	// 获取作业次数(权重)
	let form = reactive({
		courseId: taskFormData.courseId,
		scoreWeightId: typeId
	})
	teacherPublic.getScoreWeightTimes(form).then((res: any) => {
		if (res.result.length <= 0) {
			ElNotification({
				title: "该作业类型发布已到上限",
				type: "warning"
			})
		}
	})
}
// 日期选择器约束
const disabledDate = time => {
	let oneDay = 60 * 60 * 24 * 1000
	return time.getTime() < Date.now() - oneDay
}
// 表单验证
const formRef = ref()
const rules = reactive({
	name: [{ required: true, message: "请输入作业名称", trigger: "blur" }],
	courseId: [{ required: true, message: "请选择课程名称", trigger: "blur" }],
	type: [{ required: true, message: "请选择作业类型", trigger: "blur" }],
	times: [{ required: true, message: "请选择作业次数", trigger: "blur" }],
	fileType: [{ required: true, message: "请选择文件类型", trigger: "blur" }],
	closingDate: [{ required: true, message: "请选择截止日期", trigger: "blur" }]
})
// 发布作业
const releaseBtn = () => {
	formRef.value.validate(async (valid: any) => {
		if (valid) {
			teacherHomework.addHomework(taskFormData).then((res: any) => {
				ElNotification({
					title: "作业发布成功",
					type: "success"
				})
				formRef.value.resetFields()
			})
		}
	})
}
</script>

<template>
	<div id="release">
		<button class="publishedTask" @click.prevent="publishedBtn">已发布的作业</button>
		<el-form ref="formRef" :rules="rules" :model="taskFormData" label-width="85px" label-position="right">
			<el-form-item label="作业名称：" style="width: 540px" prop="name">
				<el-input v-model="taskFormData.name" placeholder="输入名称"></el-input>
			</el-form-item>
			<el-form-item label="课程名称：" style="width: 250px" prop="courseId">
				<CustomSelect
					ref="courseRef"
					v-model="taskFormData.courseId"
					:localdata="allCourseSelect"
					@change="courseChange"
					placeholder="请选择课程名称"
				/>
			</el-form-item>
			<el-form-item label="作业类型：" style="width: 250px" prop="type">
				<CustomSelect
					v-model="taskFormData.type"
					:localdata="scoreWeightList"
					@change="scoreWeightChange"
					v-if="taskFormData.courseId"
					placeholder="请选择作业类型"
				/>
				<CustomSelect v-else disabled placeholder="请先选择课程名称" prop="type" />
			</el-form-item>
			<el-form-item label="作业次数：" style="width: 300px" prop="times">
				<CustomSelect
					v-model="taskFormData.times"
					v-if="timesList.length"
					:localdata="timesList"
					placeholder="请选择作业次数"
				/>
				<CustomSelect ref="timesRef" v-else disabled placeholder="请先选择课程名称和作业类型" prop="times" />
			</el-form-item>
			<!-- <el-form-item label="专业班级：" style="width: 540px" prop="classesId">
				<el-checkbox-group v-model="taskFormData.classesId">
					<el-checkbox v-for="item in classList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
				</el-checkbox-group>
			</el-form-item> -->
			<el-form-item label="文件类型：" style="width: 540px" prop="fileType">
				<el-radio-group v-model="taskFormData.fileType">
					<el-radio v-for="item in fileTypeList" :key="item" :label="item">{{ item }}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="截止日期：" class="endDate" style="width: 540px" prop="closingDate">
				<el-date-picker v-model="taskFormData.closingDate" type="date" :disabled-date="disabledDate" />
				<div class="dateText">当前学期：{{ semester }}</div>
			</el-form-item>
			<el-form-item style="width: 540px">
				<button class="form-button" @click.prevent="releaseBtn">发布</button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="scss" scoped>
#release {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	background-color: #fff;
	display: flex;
	justify-content: center;
	.publishedTask {
		position: absolute;
		top: 30px;
		left: 30px;
		width: 136px;
		height: 40px;
		background: #479fec;
		border-radius: 2px 2px 2px 2px;
		text-align: center;
		font-size: 16px;
		color: #fff;
		cursor: pointer;
	}
	:deep(.el-form) {
		height: 100%;
		margin-top: 50px;
		.el-form-item {
			color: #646464 !important;
			margin-right: 0;
		}
		.el-form-item__label {
			height: 36px;
			line-height: 36px;
			padding: 0;
		}
		.el-input__wrapper {
			height: 34px;
			margin: 0;
			padding: 0 11px;
			border-radius: 0;
		}
		.el-input__inner {
			background-color: transparent;
			// border: 1px solid #d9d9d9;
		}
		.endDate {
			display: flex;
			justify-content: space-around;
			.el-select {
				width: 170px;
			}
			.dateText {
				margin-left: 20px;
			}
		}
		.form-button {
			width: 72px;
			height: 40px;
			line-height: 40px;
			color: #fff;
			margin-left: 388px;
			text-align: center;
			background: #2ebba3;
			border-radius: 2px 2px 2px 2px;
			cursor: pointer;
		}
	}
}
</style>
