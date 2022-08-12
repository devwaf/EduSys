<script lang="ts" setup>
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive, defineProps, watch } from "vue"
import { ElNotification } from "element-plus"
import { useTeacherFormCenterGoalAchi } from "@/store/teacher/formCenter/goalAchi.ts"
import { storeToRefs } from "pinia"

const teacherFormCenterGoalAchi = useTeacherFormCenterGoalAchi()
const props = defineProps({
	queryId: {
		type: Object,
		default: () => []
	}
})
let formData = reactive({
	courseId: "",
	classId: "",
	teacherName: localStorage.getItem("name"),
	examTime: "",
	trueExamPeople: "",
	evaluationMethod: "",
	testDifficulty: "",
	fillBill: "",
	analEvalua: "",
	studentAnalEvalua: "",
	problem1: "",
	assess: "",
	problem2: "",
	improve: ""
})
watch(
	props.queryId,
	() => {
		formData.courseId = props.queryId.courseId
		formData.classId = props.queryId.classId
	},
	{
		deep: true,
		immediate: true
	}
)
let formRef = ref()
// 日期选择器约束
const disabledDate = time => {
	let oneDay = 60 * 60 * 24 * 1000
	return time.getTime() < Date.now() - oneDay
}
// 人数验证
const trueExamPeopleValidate = (rule: any, value: any, callback: any) => {
	let reg = /^[0-9]([0-9])*$/
	let regFlag = reg.test(value)
	if (value === "") {
		return callback(new Error("请输入实考人数"))
	} else if (!regFlag) {
		callback(new Error("考试时间必须为数字整数"))
	} else {
		callback()
	}
}
const formRules = reactive({
	examTime: [{ required: true, message: "请选择考试时间", trigger: "blur" }],
	trueExamPeople: [{ validator: trueExamPeopleValidate, trigger: "blur" }],
	evaluationMethod: [{ required: true, message: "请选择评卷方式", trigger: "change" }],
	testDifficulty: [{ required: true, message: "请选择试卷难易程度", trigger: "change" }],
	fillBill: [{ required: true, message: "请选择命题范围、内容与教学大纲要求", trigger: "change" }],
	analEvalua: [{ required: true, message: "请输入整体达成评价结果分析师", trigger: "blur" }],
	studentAnalEvalua: [{ required: true, message: "请输入学生个体达成分析", trigger: "blur" }],
	problem1: [{ required: true, message: "请输入存在问题或不足", trigger: "blur" }],
	assess: [{ required: true, message: "请输入评估结果", trigger: "blur" }],
	problem2: [{ required: true, message: "请输入存在问题", trigger: "blur" }],
	improve: [{ required: true, message: "请输入后期改进措施", trigger: "blur" }]
})
// 保存
const preview = () => {}
// 导出
const exportChart = () => {
	formRef.value.validate(async (valid: any) => {
		if (valid) {
			teacherFormCenterGoalAchi.exportAchiveComputeWord(formData).then(res => {
				if (res.result) {
					window.open(res.result[1])
					setTimeout(() => {
						window.open(res.result[0])
					}, 500)
				} else {
					ElNotification({
						title: "导出失败",
						type: "warning"
					})
				}
			})
		}
	})
}
// 去打印
const goPrint = () => {}
</script>
<template>
	<div id="form">
		<el-scrollbar height="550px">
			<div class="form1">
				<el-form :inline="true" :model="formData" :rules="formRules" ref="formRef">
					<el-form-item label="考试时间：" prop="examTime" style="width: 350px">
						<el-date-picker
							v-model="formData.examTime"
							type="date"
							format="YYYY/MM/DD"
							value-format="YYYY-MM-DD"
							:disabled-date="disabledDate"
						/>
					</el-form-item>
					<el-form-item label="实考人数" prop="trueExamPeople" style="width: 220px">
						<el-input-number v-model="formData.trueExamPeople" :min="0" :controls="false" />
						<div class="company">人</div>
					</el-form-item>
					<el-form-item label="评卷方式：" prop="evaluationMethod" style="width: 290px">
						<el-radio-group v-model="formData.evaluationMethod">
							<el-radio :label="1">集体</el-radio>
							<el-radio :label="2">单独</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="试卷难易程度：" prop="testDifficulty" style="width: 330px">
						<el-radio-group v-model="formData.testDifficulty">
							<el-radio :label="1">容易</el-radio>
							<el-radio :label="2">适中</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="命题范围、内容与教学大纲要求：" prop="fillBill" style="width: 645px">
						<el-radio-group v-model="formData.fillBill">
							<el-radio :label="1">符合</el-radio>
							<el-radio :label="2">基本符合</el-radio>
							<el-radio :label="3">不符合</el-radio>
						</el-radio-group>
					</el-form-item>
					<div class="categoryText">
						<div class="block"></div>
						<div class="text">2、课程目标达成情况分析</div>
					</div>
					<el-form-item class="categoryItem" prop="analEvalua">
						<div class="title">（1）整体达成评价结果分析</div>
						<div class="content">
							<el-input
								v-model="formData.analEvalua"
								placeholder="请输入内容"
								type="textarea"
								class="textarea"
							/>
						</div>
					</el-form-item>
					<el-form-item class="categoryItem" prop="studentAnalEvalua">
						<div class="title">（2）学生个体达成分析</div>
						<div class="content">
							<el-input
								v-model="formData.studentAnalEvalua"
								placeholder="请输入内容"
								type="textarea"
								class="textarea"
							/>
						</div>
					</el-form-item>
					<el-form-item class="categoryItem" prop="problem1">
						<div class="title">（3）存在问题或不足</div>
						<div class="content">
							<el-input
								v-model="formData.problem1"
								placeholder="请输入内容"
								type="textarea"
								class="textarea"
							/>
						</div>
					</el-form-item>
					<div class="categoryText">
						<div class="block"></div>
						<div class="text">3、课程教学质量的持续改进</div>
					</div>
					<el-form-item label="评估结果:" prop="assess" style="width: 100%">
						<el-input
							style="width: 96%"
							v-model="formData.assess"
							placeholder="请输入评估结果"
							type="textarea"
					/></el-form-item>
					<el-form-item label="存在问题:" prop="problem2" style="width: 100%">
						<el-input
							style="width: 96%"
							v-model="formData.problem2"
							placeholder="请输入存在问题"
							type="textarea"
							class="textarea"
					/></el-form-item>
					<el-form-item label="后期改进措施:" prop="improve" style="width: 100%">
						<el-input
							style="width: 96%"
							v-model="formData.improve"
							placeholder="请输入后期改进措施"
							type="textarea"
							class="textarea"
					/></el-form-item>
				</el-form>
			</div>
			<div style="margin-bottom: 30px"></div>
		</el-scrollbar>
	</div>

	<div class="formCoreBtn">
		<el-button class="exportChart" @click="exportChart">导出表</el-button>
	</div>
</template>

<style lang="scss" scoped>
#form {
	position: relative;
	width: 100%;
	:deep(.is-horizontal) {
		height: 0px;
	}
	:deep(.el-form) {
		.el-form-item {
			margin-top: 15px;
		}
		.el-input-number {
			width: 64px;
			.el-input__wrapper {
				padding: 0;
				width: 64px;
			}
		}
		.scoreWeight {
			.el-form-item {
				margin-top: 0;
			}
		}
		.el-form-item__label,
		.el-radio__label {
			font-size: 16px;
			height: 36px;
			line-height: 36px;
			font-weight: normal;
		}
		.el-radio__inner {
			width: 16px;
			height: 16px;
		}
		.el-input {
			.el-input__wrapper {
				border-radius: 0px;
				.el-input__inner {
					height: 34px;
					font-size: 16px;
				}
			}
		}
		.company {
			margin-left: 10px;
			font-size: 16px;
			color: #646464;
		}
		.categoryText {
			width: 96%;
			height: 36px;
			margin-top: 20px;
			background-color: #f5f5f5;
			.block {
				width: 6px;
				height: 100%;
				background-color: #646464;
				float: left;
			}
			.text {
				margin-left: 10px;
				height: 36px;
				line-height: 36px;
				font-size: 18px;
				font-weight: 500;
				color: #646464;
				float: left;
			}
		}
		.categoryItem {
			width: 96%;
			margin: 10px 0;

			.title {
				font-size: 16px;
				line-height: 50px;
				color: #646464;
				width: 100%;
			}
			.content {
				width: 100%;
			}
			:deep(.textarea) {
				font-size: 14px;
			}
		}
	}
}
:deep(.el-textarea__inner) {
	width: 100%;
	height: 50px;
	background: #ffffff;
	border-radius: 0;
}
.formCoreBtn {
	margin: 20px;
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
	.exportChart {
		width: 98px;
		background-color: #479fec;
	}
}
</style>
