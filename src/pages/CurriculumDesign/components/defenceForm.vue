<script lang="ts" setup>
import { ref, reactive, defineProps, toRefs } from "vue"
import { ElNotification } from "element-plus"
import { useStuCourseDesgin } from "@/store/student/courseDesgin.ts"

import { storeToRefs } from "pinia"

const stuCourseDesgin = useStuCourseDesgin()
const props = defineProps({
	formDataFa: {
		type: Object,
		require: true
	}
})
const { formDataFa } = toRefs(props)
let formData = reactive({
	collegeName: "",
	major: "",
	className: "",
	studentName: "",
	sno: "",
	academicAdvisor: "",
	subject: "",
	members: [],
	jobDescription: "",
	questionOne: "",
	questionTwo: "",
	questionThree: "",
	answerOne: "",
	answerTwo: "",
	answerThree: "",
	courseDesignId: "",
	studentId: ""
})
let tableData = reactive(["", "", "", "", "", "", "", ""])
// 表单验证
const formRef = ref()
const rules = reactive({
	collegeName: [{ required: true, message: "请填写学院名称", trigger: "blur" }],
	major: [{ required: true, message: "请填写专业名称", trigger: "blur" }],
	className: [{ required: true, message: "请填写班级名称", trigger: "blur" }],
	studentName: [{ required: true, message: "请填写学生姓名", trigger: "blur" }],
	sno: [{ required: true, message: "请填写学号", trigger: "blur" }],
	academicAdvisor: [{ required: true, message: "请填写指导老师", trigger: "blur" }],
	subject: [{ required: true, message: "请填写指导题目", trigger: "blur" }],
	questionOne: [{ required: true, message: "请填写问题一", trigger: "blur" }],
	questionTwo: [{ required: true, message: "请填写问题二", trigger: "blur" }],
	questionThree: [{ required: true, message: "请填写问题三", trigger: "blur" }],
	answerOne: [{ required: true, message: "请填写回答一", trigger: "blur" }],
	answerTwo: [{ required: true, message: "请填写回答二", trigger: "blur" }],
	answerThree: [{ required: true, message: "请填写回答三", trigger: "blur" }]
})

const preservation = () => {
	// 获取答辩小组成员姓名
	formData.members = tableData.filter(item => item)
	formData.courseDesignId = formDataFa.value.courseDesignId
	formData.studentId = localStorage.getItem("userId")

	formRef.value.validate(async (valid: any) => {
		if (valid) {
			stuCourseDesgin.addDesignDefenseObjective(formData).then((res: any) => {
				ElNotification({
					message: "答辩记录表已保存",
					type: "success"
				})
        stuCourseDesgin.getDesignDefense(formDataFa.value)
			})
			// formRef.value.resetFields()
		}
	})
}
</script>
<template>
	<div id="dform">
		<el-form
			ref="formRef"
			:rules="rules"
			class="form"
			:model="formData"
			label-position="right"
			:inline="true"
			label-width="100px"
			width="100%"
		>
			<div class="title">《软件项目管理》 课程设计答辩记录表</div>
			<el-form-item label="学院：" prop="collegeName">
				<el-input v-model="formData.collegeName" style="width: 160px"></el-input>
			</el-form-item>
			<el-form-item label="专业：" prop="major">
				<el-input v-model="formData.major" style="width: 160px"></el-input>
			</el-form-item>
			<el-form-item label="班级：" prop="className">
				<el-input v-model="formData.className" style="width: 160px"></el-input>
			</el-form-item>
			<el-form-item label="学生姓名：" prop="studentName">
				<el-input v-model="formData.studentName" style="width: 160px"></el-input>
			</el-form-item>
			<el-form-item label="学号：" prop="sno">
				<el-input v-model="formData.sno" style="width: 160px"></el-input>
			</el-form-item>
			<el-form-item label="指导老师：" prop="academicAdvisor">
				<el-input v-model="formData.academicAdvisor" style="width: 160px"></el-input>
			</el-form-item>
			<el-form-item label="题目：" prop="subject">
				<el-input v-model="formData.subject" style="width: 716px"></el-input>
			</el-form-item>
			<el-form-item>
				<table class="form-table">
					<tr>
						<td rowspan="2">
							答辩小组
							<br />
							成员姓名
						</td>
						<td>
							<input v-model="tableData[0]" type="text" class="td-input" />
						</td>
						<td>
							<input v-model="tableData[1]" type="text" class="td-input" />
						</td>
						<td>
							<input v-model="tableData[2]" type="text" class="td-input" />
						</td>
						<td>
							<input v-model="tableData[3]" type="text" class="td-input" />
						</td>
					</tr>
					<tr>
						<td>
							<input v-model="tableData[4]" type="text" class="td-input" />
						</td>
						<td>
							<input v-model="tableData[5]" type="text" class="td-input" />
						</td>
						<td>
							<input v-model="tableData[6]" type="text" class="td-input" />
						</td>
						<td>
							<input v-model="tableData[7]" type="text" class="td-input" />
						</td>
					</tr>
				</table>
			</el-form-item>
			<el-form-item label="工作简述：" prop="studentName">
				<el-input type="textarea" v-model="formData.jobDescription"></el-input>
			</el-form-item>
			<div class="title2">答辩问题记录（问题、解答等）</div>
			<el-form-item label="问题1：" prop="questionOne">
				<el-input v-model="formData.questionOne" style="width: 656px"></el-input>
			</el-form-item>
			<el-form-item label="答：" prop="answerOne">
				<el-input type="textarea" v-model="formData.answerOne"></el-input>
			</el-form-item>
			<el-form-item label="问题2：" prop="questionTwo">
				<el-input v-model="formData.questionTwo" style="width: 656px"></el-input>
			</el-form-item>
			<el-form-item label="答：" prop="answerTwo">
				<el-input type="textarea" v-model="formData.answerTwo"></el-input>
			</el-form-item>
			<el-form-item label="问题3：" prop="questionThree">
				<el-input v-model="formData.questionThree" style="width: 656px"></el-input>
			</el-form-item>
			<el-form-item label="答：" prop="answerThree">
				<el-input type="textarea" v-model="formData.answerThree"></el-input>
			</el-form-item>
			<el-form-item class="el-form-item-button">
				<button class="form-button" @click.prevent="preservation">保存</button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style lang="scss" scoped>
#dform {
	width: 100%;
	height: 100%;
	// background-color: pink;
	.subjectDiv {
		height: 32px;
		line-height: 36px;
		font-size: 16px;
		color: #646464;
	}
	:deep(.el-form) {
		// width: 800px;
		// background-color: #fff;
		.el-form-item__label {
			line-height: 36px;
		}
		.el-input__wrapper {
			height: 34px;

			border-radius: 0;
			//   .el-input__inner {
			//     width: 650px;
			//   }
		}
		.title {
			// width: 100%;
			text-align: center;
			font-size: 24px;
			font-weight: 500;
			color: #646464;
			line-height: 96px;
		}
		.form-table {
			width: 656px;
			height: 100px;
			margin-left: 100px;
			color: #646464;
			font-size: 16px;
			td,
			tr,
			table {
				border-collapse: collapse;
				text-align: center;
				border: 1px solid #d9d9d9;
			}
			td,
			tr {
				width: 200px;
				height: 50px;
			}
			.td-input {
				width: 100%;
				height: 100%;
				text-align: center;
				background-color: transparent;
				border: 0;
				color: #646464;
				font-size: 16px;
			}
		}
		.title2 {
			width: 100%;
			text-align: center;
			font-size: 18px;
			font-weight: 500;
			color: #646464;
			margin: 15px 0 30px 0;
		}
		.el-textarea {
			// width: 100%;
			width: 656px;
			.el-textarea__inner {
				height: 100px;
				border-radius: 0;
			}
		}
		// .el-form-item-button {
		//   display: flex;
		//   justify-content: flex-end;
		//   width: 100%;
		//   height: 40px;

		//   background-color: #fff;
		// }
		.form-button {
			//   float: right;
			width: 72px;
			height: 40px;
			line-height: 40px;
			color: #fff;
			margin-left: 730px;
			text-align: center;
			background: #2ebba3;
			border-radius: 2px 2px 2px 2px;
			cursor: pointer;
		}
	}
}
</style>
