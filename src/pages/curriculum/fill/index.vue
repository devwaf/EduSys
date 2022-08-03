<script lang="ts" setup>
import AddFill from "./components/upload.vue"
import Tabs from "./components/tabs.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive } from "vue"
import type { TabsPaneContext } from "element-plus"
import { useStu } from "@/store/student/stu.ts"
import { useStuCurriculum } from "@/store/student/curriculum.ts"
import { storeToRefs } from "pinia"

const stu = useStu()
const stuCurriculum = useStuCurriculum()
const { stuCourseSel } = storeToRefs(stu)
const { stuAllHomework, rate } = storeToRefs(stuCurriculum)

let dateFirst = ref()
let formData = ref({
	name: "",
	date: "",
	option: ""
})
stu.getStudentCourseelect().then((res: any) => {
	dateFirst.value = res.result.list2[0].label
	formData.value.name = res.result.list1[0].value
	stuCurriculum.getStudentAllHomework(formData.value.name)
})
// 获取作业
const curriculumChange = (val: any) => {
	stuCurriculum.getStudentAllHomework(val)
}
</script>

<template>
	<div class="container-main">
		<div class="main-top">
			<el-form ref="formRef" :model="formData" :inline="true" label-width="85px">
				<el-form-item label="课程名称：" style="width: 275px" prop="name">
					<CustomSelect
						v-model="formData.name"
						:localdata="stuCourseSel.list1"
						placeholder="请选择课程名称"
						@change="curriculumChange"
					/>
				</el-form-item>
				<el-form-item label="开学日期：" style="padding: 0 15px">
					<div class="date">{{ dateFirst }}</div>
					<!-- <CustomSelect v-model="formData.date" :localdata="stuCourseSel.list2" /> -->
				</el-form-item>
				<el-form-item label="完成情况:">
					<div class="option">{{ rate }}</div>
				</el-form-item>
			</el-form>
		</div>
		<div class="homework">
			<Tabs :courseId="formData.name"></Tabs>
		</div>

		<div class="fill-box" v-if="stuAllHomework.length">
			<div v-for="item in stuAllHomework" :key="item.stuHomeworkId">
				<AddFill :questions="item" :courseId="formData.name"></AddFill>
			</div>
		</div>
		<div class="defaultPage" v-else></div>
	</div>
</template>

<style lang="scss" scoped>
.container-main {
	position: relative;
	padding: 20px 36px;
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
}
.main-top {
	display: inline-block;
	width: 45%;
	:deep(.el-form) {
		.el-form-item {
			margin-right: 0;
		}
		.el-form-item__label {
			height: 36px;
			line-height: 36px;
		}
		.el-input__wrapper {
			height: 34px;
			margin: 0;
			border-radius: 0;
		}
		.date {
			color: #646464;
			height: 36px;
			line-height: 36px;
		}
		.el-input {
			width: 180px;
		}
		.option {
			box-sizing: border-box;
			width: 77px;
			height: 36px;
			color: #646464;
			text-align: center;
			line-height: 36px;
			border: 1px solid #dcdfe6;
		}
	}
}
.homework {
	float: right;
	width: 650px;
}
.fill-box {
	margin-right: 50px;
	width: 615px;
	> div {
		margin-top: 20px;
	}
}
.defaultPage {
	width: 615px;
	height: 60%;
	background: url(@/assets/images/暂无内容.png) no-repeat center;
}
</style>
