<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive } from "vue"
import { storeToRefs } from "pinia"
import { useTeacherCourse } from "@/store/teacher/course/course.ts"
import { useTeacherFormCenterTestPaper } from "@/store/teacher/formCenter/testPaper.ts"
import { log } from "console"

const teacherCourse = useTeacherCourse()
const teacherFormCenterTestPaper = useTeacherFormCenterTestPaper()
const { courseNameList, semesterList } = storeToRefs(teacherCourse)
// const {  } = storeToRefs(teacherFormCenterTestPaper)
let queryForm = reactive({
	courseName: "",
	semester: ""
})
let formData = reactive({
	courseId: "",
	// majorClass: "",
	// studentCount: "",
	examTime: "",
	wingdingsExam: 1,
	wingdingsExceed: 2,
	wingdingsCover: 1,
	wingdingsModelStyle: 1,
	wingdingsContent: 1,
	wingdingsClear: 1,
	wingdingsHundred: 1,
	wingdingsTypeSuit: 1,
	wingdingsNumSuit: 1,
	wingdingsExceedS: 2,
	wingdingsError: 2,
	wingdingsAgree: 1,
	wingdingsAgreeS: 1,
	wingdingsIsA: 1,
	wingdingsIsAS: 1,
	examTable1: [],
	examTable2: []
})
let tableData1 = ref([])
let tableData2 = ref([])

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
			formData.courseId = res.result
			teacherFormCenterTestPaper.getCoureObjAndQuestionScore(formData.courseId).then(res => {
				tableData1.value = res.result
				tableData2.value = res.result
			})
		})
})
const courseNameChange = (val: string) => {
	queryForm.courseName = val
	teacherCourse.getTermForCourseName(val).then((res: any) => {
		queryForm.semester = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			formData.courseId = res1.result
			teacherFormCenterTestPaper.getCoureObjAndQuestionScore(formData.courseId).then(res => {
				tableData1.value = res.result
				tableData2.value = res.result
			})
		})
	})
}
const semesterChange = (val: string) => {
	queryForm.semester = val
	teacherCourse.getCourseNameForTrem(val).then((res: any) => {
		queryForm.courseName = res.result[0].label
		teacherCourse.getCourseSelect(queryForm).then((res1: any) => {
			formData.courseId = res1.result
			teacherFormCenterTestPaper.getCoureObjAndQuestionScore(formData.courseId).then(res => {
				tableData1.value = res.result
				tableData2.value = res.result
			})
		})
	})
}
// 日期选择器约束
const disabledDate = time => {
	let oneDay = 60 * 60 * 24 * 1000
	return time.getTime() < Date.now() - oneDay
}
let formRef = ref()
// 表单验证
const formRules = reactive({
	examTime: [{ required: true, message: "请选择考试日期", trigger: "blur" }]
})
// 保存
// const preview = () => {}
// 导出表
const goPrint = () => {
	formRef.value.validate(async (valid: any) => {
		if (valid) {
			formData.examTable1 = tableData1.value
			formData.examTable2 = tableData2.value
			teacherFormCenterTestPaper.examinationReview(formData).then(res => {
				window.open(res.result)
			})
		}
	})
}
</script>
<template>
	<div id="form">
		<div class="title">试卷审核表</div>
		<el-scrollbar height="700px">
			<div class="query">
				<el-form :inline="true" :model="formData" class="queryForm" ref="formRef" :rules="formRules">
					<div class="categoryText">
						<div class="block"></div>
						<div class="text">试卷使用信息及其命题自查（由命题教师填写）</div>
					</div>
					<el-form-item label="课程名称：" style="width: 280px">
						<CustomSelect
							@change="courseNameChange"
							v-model="queryForm.courseName"
							:localdata="courseNameList"
						/>
					</el-form-item>
					<el-form-item label="开课学期：" style="width: 300px">
						<CustomSelect @change="semesterChange" v-model="queryForm.semester" :localdata="semesterList" />
					</el-form-item>
					<!-- <el-form-item label="专业班级：" style="width: 280px" prop="majorClass">
						<CustomSelect @change="classListChange" v-model="formData.majorClass" :localdata="classList" />
					</el-form-item>
					<el-form-item label="学生人数：" style="width: 160px" prop="studentCount">
						<el-input-number v-model="formData.studentCount" :min="0" :controls="false" />
					</el-form-item> -->
					<el-form-item label="考试日期：" style="width: 280px" prop="examTime">
						<el-date-picker
							v-model="formData.examTime"
							type="date"
							format="YYYY/MM/DD"
							value-format="YYYY-MM-DD"
							:disabled-date="disabledDate"
						/>
					</el-form-item>
					<el-form-item label="考试方式：" style="width: 280px" prop="wingdingsExam">
						<el-radio-group v-model="formData.wingdingsExam">
							<el-radio :label="1">闭卷</el-radio>
							<el-radio :label="2">闭卷</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="A卷B卷重复试题的合计分数是否超过试卷总分的10%"
						style="width: 100%"
						prop="wingdingsExceed"
					>
						<el-radio-group v-model="formData.wingdingsExceed">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="试题考核内容是否覆盖教学大纲规定的基本内容"
						style="width: 100%"
						prop="wingdingsCover"
					>
						<el-radio-group v-model="formData.wingdingsCover">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<div class="tableHead">论题方式是否与教学大纲考核方式一致</div>
					<CustomTable class="table" :data="tableData1" border>
						<template #default>
							<el-table-column label="课程目标" width="450">
								<template #default="scope">
									{{ scope.row.objContent }}
								</template>
							</el-table-column>
							<el-table-column label="试题及分值" width="300">
								<template #default="scope">
									<p v-for="(item, index) in scope.row.questionScore" :key="index" class="questions">
										{{ item }}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="是否与教学大纲一致" width="250">
								<template #default="scope">
									<el-radio-group v-model="scope.row.isPass">
										<el-radio :label="1">是</el-radio>
										<el-radio :label="2">否</el-radio>
									</el-radio-group>
								</template>
							</el-table-column>
						</template>
					</CustomTable>
					<!-- <table border="1" cellspacing="0" class="table">
						<thead>
							<tr>
								<td style="width: 450px">课程目标</td>
								<td style="width: 300px">试题及分值</td>
								<td style="width: 250px">是否与教学大纲一致</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="text-align: left">{{ tableData[0].objContent }}</td>
								<td>
									<p v-for="(item, index) in tableData[0].questionScore" :key="index">{{ item }}</p>
								</td>
								<td>
									<el-form-item prop="wingdingsObjOne">
										<el-radio-group v-model="formData.wingdingsObjOne">
											<el-radio :label="1">是</el-radio>
											<el-radio :label="2">否</el-radio>
										</el-radio-group>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td style="text-align: left">{{ tableData[1].objContent }}</td>
								<td>
									<p v-for="(item, index) in tableData[1].questionScore" :key="index">{{ item }}</p>
								</td>
								<td>
									<el-form-item prop="wingdingsObjTwo">
										<el-radio-group v-model="formData.wingdingsObjTwo">
											<el-radio :label="1">是</el-radio>
											<el-radio :label="2">否</el-radio>
										</el-radio-group>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td style="text-align: left">{{ tableData[0].objContent }}</td>
								<td>
									<p v-for="(item, index) in tableData[0].questionScore" :key="index">{{ item }}</p>
								</td>
								<td>
									<el-form-item prop="wingdingsObjThree">
										<el-radio-group v-model="formData.wingdingsObjThree">
											<el-radio :label="1">是</el-radio>
											<el-radio :label="2">否</el-radio>
										</el-radio-group>
									</el-form-item>
								</td>
							</tr>
						</tbody>
					</table> -->
					<div class="categoryText">
						<div class="block"></div>
						<div class="text">试卷审核信息（由系或课程负责人填写）</div>
					</div>
					<el-form-item
						label="试卷样式是否按照学校规定的统一模版样式"
						style="width: 100%"
						prop="wingdingsModelStyle"
					>
						<el-radio-group v-model="formData.wingdingsModelStyle">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="试题考核内容是否覆盖教学大纲规定的基本内容"
						style="width: 100%"
						prop="wingdingsContent"
					>
						<el-radio-group v-model="formData.wingdingsContent">
							<el-radio :label="1">较好</el-radio>
							<el-radio :label="2">一般</el-radio>
							<el-radio :label="3">需改进</el-radio>
						</el-radio-group>
					</el-form-item>
					<div class="tableHead">论题方式是否与教学大纲考核方式一致</div>
					<CustomTable class="table" :data="tableData2" border>
						<template #default>
							<el-table-column label="课程目标" width="450">
								<template #default="scope">
									{{ scope.row.objContent }}
								</template>
							</el-table-column>
							<el-table-column label="试题及分值" width="300">
								<template #default="scope">
									<p v-for="(item, index) in scope.row.questionScore" :key="index" class="questions">
										{{ item }}
									</p>
								</template>
							</el-table-column>
							<el-table-column label="是否与教学大纲一致" width="250">
								<template #default="scope">
									<el-radio-group v-model="scope.row.isPass">
										<el-radio :label="1">是</el-radio>
										<el-radio :label="2">否</el-radio>
									</el-radio-group>
								</template>
							</el-table-column>
						</template>
					</CustomTable>
					<el-form-item
						label="各试题分数分配是否总体合理，标注分数是否明确清晰"
						style="width: 100%"
						prop="wingdingsClear"
					>
						<el-radio-group v-model="formData.wingdingsClear">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="各试题总分是否为100分（百分制评分试卷）"
						style="width: 100%"
						prop="wingdingsHundred"
					>
						<el-radio-group v-model="formData.wingdingsHundred">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="题型是否合适" style="width: 100%" prop="wingdingsTypeSuit">
						<el-radio-group v-model="formData.wingdingsTypeSuit">
							<el-radio :label="1">合适</el-radio>
							<el-radio :label="2">偏多</el-radio>
							<el-radio :label="3">偏少</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="题量是否合适" style="width: 100%" prop="wingdingsNumSuit">
						<el-radio-group v-model="formData.wingdingsNumSuit">
							<el-radio :label="1">合适</el-radio>
							<el-radio :label="2">偏重</el-radio>
							<el-radio :label="3">偏轻</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="A、 B卷重复试题的合计分数是否超过试卷总分的10%"
						style="width: 100%"
						prop="wingdingsExceedS"
					>
						<el-radio-group v-model="formData.wingdingsExceedS">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="发现命题错误" style="width: 100%" prop="wingdingsError">
						<el-radio-group v-model="formData.wingdingsError">
							<el-radio :label="1">有</el-radio>
							<el-radio :label="2">无</el-radio>
						</el-radio-group>
					</el-form-item>
					<!-- <el-form-item label="其他审核发现的问题或说明事项：" style="width: 100%">
						<el-input v-model="formData.bb" placeholder="输入内容" type="textarea" class="textarea" />
					</el-form-item> -->
					<el-form-item label="课程负责人审核意见：" style="width: 100%" prop="wingdingsAgree">
						<el-radio-group v-model="formData.wingdingsAgree">
							<el-radio :label="1">同意</el-radio>
							<el-radio :label="2">改进后再审</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="系审核意见：" style="width: 100%" prop="wingdingsAgreeS">
						<el-radio-group v-model="formData.wingdingsAgreeS">
							<el-radio :label="1">同意</el-radio>
							<el-radio :label="2">改进后再审</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="学院教学办公室意见：" style="width: 100%" class="sSAgree">
						<el-form-item label="考试卷为：" style="width: 70%" prop="wingdingsIsA">
							<el-radio-group v-model="formData.wingdingsIsA">
								<el-radio :label="1">A卷</el-radio>
								<el-radio :label="2">B卷</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="补考卷为：" style="width: 70%" prop="wingdingsIsAS">
							<el-radio-group v-model="formData.wingdingsIsAS">
								<el-radio :label="1">A卷</el-radio>
								<el-radio :label="2">B卷</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form-item>
				</el-form>
			</div>
		</el-scrollbar>
		<div class="formCoreBtn">
			<!-- <el-button class="preview" @click="preview">保存</el-button> -->
			<!-- <el-button class="goPrint" @click="goPrint">去打印</el-button> -->
			<el-button class="goPrint" @click="goPrint">导出表</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#form {
	:deep(.is-horizontal) {
		height: 0px;
	}
	width: 100%;
	.title {
		width: 100%;
		text-align: center;
		font-size: 24px;
		font-weight: 500;
		color: #646464;
		line-height: 66px;
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
	.query {
		position: relative;
		:deep(.el-form) {
			.el-form-item {
				margin-top: 15px;
			}
			.el-input__wrapper {
				margin: 0;
				border-radius: 0px;
			}
			.el-radio__label {
				font-size: 16px;
				line-height: 36px;
			}
			.el-form-item__label {
				font-size: 16px;
				height: 38px;
				line-height: 38px;
			}
			.el-radio__inner {
				width: 16px;
				height: 16px;
			}
			.textarea {
				.el-textarea__inner {
					width: 500px;
					height: 80px;
					background: #ffffff;
					font-size: 16px;
				}
			}
			.el-input {
				.el-input__inner {
					height: 36px;
					font-size: 16px;
				}
			}
			.sSAgree {
				.el-form-item {
					margin-top: 0;
					margin-bottom: 15px;
				}
			}
		}
	}
	.tableHead {
		width: 1000px;
		height: 50px;
		border: 1px solid #ebeef5;
		border-bottom: none;
		box-sizing: border-box;
		font-size: 16px;
		color: #646464;
		line-height: 50px;
		text-align: center;
		margin-top: 10px;
	}
	.table {
		margin-bottom: 40px;
		width: 1000px;
		td {
			width: 125px;
			height: 50px;
			font-size: 16px;
			font-weight: 400;
			color: #646464;
			padding: 0;
		}

		:deep(.cell) {
			font-size: 18px;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 400;
			color: #646464;
			text-align: left;
			padding: 15px 10px;
			box-sizing: border-box;
			.questions {
				letter-spacing: 4px;
			}
		}
	}
	.formCoreBtn {
		margin: 10px;
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
