<script lang="ts" setup>
import DefenceForm from "./components/defenceForm.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive } from "vue"
import { ElNotification } from "element-plus"
import { useStu } from "@/store/student/stu.ts"
import { useStuCourseDesgin } from "@/store/student/courseDesgin.ts"
import { storeToRefs } from "pinia"

const stu = useStu()
const stuCourseDesgin = useStuCourseDesgin()
const { stuDesSel } = storeToRefs(stu)
const { designDefenseState, designDefense } = storeToRefs(stuCourseDesgin)
let isEdit = ref(false)
let formData = reactive({
	studentId: localStorage.getItem("userId"),
	courseDesignId: ""
})
stu.getStudentDesignSelect().then(res => {
	formData.courseDesignId = res.result.list1[0].value
	stuCourseDesgin.getDesignDefense(formData)
})
// 课程切换
const courseChange = (val: any) => {
	formData.courseDesignId = val
	stuCourseDesgin.getDesignDefense(formData)
}
const write = () => {
	if (formData.courseDesignId) {
		isEdit.value = true
	} else {
		if (!formData.courseDesignId) {
			ElNotification({
				message: "课程设计未选择",
				type: "warning"
			})
		}
	}
}
// 下载答辩记录表
const dlDefenseForm = () => {
	window.open(designDefense.value.wordUrl)
}
// 课程报告
const dlCourseReport = () => {
	if (formData.courseDesignId) {
		let form = {
			fileName: "课程报告",
			courseId: formData.courseDesignId
		}
		stuCourseDesgin.getCourseFile(form).then(res => {
			if (res.result.result) {
				window.open(res.result.message)
			} else {
				ElNotification({
					message: res.result.message,
					type: "warning"
				})
			}
		})
	} else {
		ElNotification({
			message: "课程设计未选择",
			type: "warning"
		})
	}
}
// 任务书
const dlAssignment = () => {
	if (formData.courseDesignId) {
		let form = {
			fileName: "任务书",
			courseId: formData.courseDesignId
		}
		stuCourseDesgin.getCourseFile(form).then(res => {
			if (res.result.result) {
				window.open(res.result.message)
			} else {
				ElNotification({
					message: res.result.message,
					type: "warning"
				})
			}
		})
	} else {
		ElNotification({
			message: "课程设计未选择",
			type: "warning"
		})
	}
}
</script>

<template>
	<div id="CurriculumDesign-main">
		<div class="scrollbar-flex-content">
			<div class="scrollbar-demo-item-left">
				<el-form ref="formRef" :model="formData" :inline="true" label-width="100px">
					<el-form-item label="课程设计：">
						<CustomSelect
							v-model="formData.courseDesignId"
							:localdata="stuDesSel.list1"
							@change="courseChange"
						/>
					</el-form-item>
				</el-form>

				<div class="biao-list">
					<div class="box-main">
						<div class="box-left">答辩记录表</div>
						<div class="box-right">
							<div class="box box1" @click="write()" v-if="!designDefenseState">
								<svg class="icon home-icon" aria-hidden="true">
									<use xlink:href="#icon-tianxieicon" /></svg
								>填写
							</div>
							<div class="boxGary" v-else>
								<svg class="icon home-icon" aria-hidden="true">
									<use xlink:href="#icon-tianxie999" /></svg
								>填写
							</div>
							<div class="box" @click="dlDefenseForm()" v-if="designDefenseState">
								<svg class="icon home-icon" aria-hidden="true">
									<use xlink:href="#icon-xiazaimobanicon" /></svg
								>下载
							</div>
							<div class="boxGary" v-else>
								<svg class="icon home-icon" aria-hidden="true">
									<use xlink:href="#icon-xiazaimuban" /></svg
								>下载
							</div>
						</div>
					</div>
				</div>

				<div class="biao-list">
					<div class="box-main">
						<div class="box-left">课程报告</div>
						<div class="box-right">
							<div class="box" @click="dlCourseReport()">
								<svg class="icon home-icon" aria-hidden="true">
									<use xlink:href="#icon-xiazaimobanicon" />
								</svg>
								<i class="el-icon-edit-outline" />下载模板
							</div>
						</div>
					</div>
				</div>

				<div class="biao-list">
					<div class="box-main">
						<div class="box-left">任务书</div>
						<div class="box-right">
							<div class="box" @click="dlAssignment()">
								<svg class="icon home-icon" aria-hidden="true">
									<use xlink:href="#icon-xiazaimobanicon" />
								</svg>
								<i class="el-icon-edit-outline" />下载模板
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-show="isEdit" class="scrollbar-demo-item-rigth">
				<DefenceForm :formDataFa="formData" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#CurriculumDesign-main {
	display: flex;
	// padding: 20px;

	width: 100%;
	// overflow-x: auto;
	height: calc(100vh - 80px);
	background-color: #fff;

	.scrollbar-flex-content {
		display: flex;
		// min-width: 1650px;
		height: calc(100vh - 110px);
		background-color: #fff;
	}

	.scrollbar-demo-item-left {
		width: 600px;
		height: 300px;
		margin: 10px;
		text-align: center;
		border-radius: 4px;

		// background: green;
		:deep(.el-form) {
			height: 36px;
			.el-form-item__label {
				height: 36px;
				line-height: 36px;
				font-size: 16px;
			}
			.el-form-item {
				width: 300px;
				margin-right: 0;
			}
			.el-input__wrapper {
				height: 34px;
				margin: 0;
				border-radius: 0;
			}
			.el-input {
				width: 180px;
			}
		}
		.biao-list {
			margin-top: 20px;
			width: 560px;
			font-size: 18px;
			color: #646464;
			.box-left {
				margin-left: 15px;
			}

			.box-main {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;
				padding: 10px;
				height: 50px;
				background-color: #f7f7f7;
				border-radius: 10px;
			}
			.box-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-right: 20px;
			}
			.box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 20px;
				color: #2ebba3;
				cursor: pointer;
			}
			.boxGary {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 20px;
				color: #999999;
			}
		}
		.list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin-top: 20px;
			padding: 10px;
			font-size: 18px;
			background-color: #f7f7f7;
			.biao-right {
				display: flex;
				justify-content: space-between;
				width: 180px;
				color: #2ebba3;
			}
		}
	}
	.scrollbar-demo-item-rigth {
		margin-left: 150px;
		margin-right: 50px;
		box-sizing: border-box;

		overflow-y: auto;
		width: 880px;
		height: 730px;
		// padding: 10px;
	}

	.scrollbar-demo-item-rigth::-webkit-scrollbar {
		display: none !important;
	}
	.icon {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
}
</style>
