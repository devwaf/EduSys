<script lang="ts" setup>
import CustomTable from "../../../components/customTable/customTable.vue"
import Dialog from "@/components/Dialog/index.vue"
import AddStudent from "./components/addStudent.vue"
import CustomSelect from "../../../components/customSelect/customSelect.vue"
import { ElMessageBox } from "element-plus"
import { reactive, ref } from "vue"

import { usePageGraduationDesign } from "../../../store/teacher/graduationDesign/graduationDesign"
import { storeToRefs } from "pinia"
const graduationDesign = usePageGraduationDesign()
const { graduationList } = storeToRefs(graduationDesign)
graduationDesign.GetAllGraduationDesign()

let addStudentRef = ref()
const addStudent = () => {
	addStudentRef.value.dialogVisible = true
}
// 下载
const download = (url: any) => {
	window.open(url)
}
// 打回毕业设计
let recForm = ref({
	id: "",
	fileName: ""
})
const recurrence = (scope: any) => {
	ElMessageBox.confirm("确认打回该毕业设计吗", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			let recForm = {
				id: scope.row.id,
				fileName: ""
			}
			if (scope.cellIndex == 4) {
				recForm.fileName = "assignment"
			} else if (scope.cellIndex == 5) {
				recForm.fileName = "headline"
			} else if (scope.cellIndex == 6) {
				recForm.fileName = "foreignTrans"
			} else if (scope.cellIndex == 7) {
				recForm.fileName = "draftDissertation"
			} else if (scope.cellIndex == 8) {
				recForm.fileName = "firstReport"
			} else if (scope.cellIndex == 9) {
				recForm.fileName = "secondReport"
			} else if (scope.cellIndex == 10) {
				recForm.fileName = "dissertation"
			} else if (scope.cellIndex == 11) {
				recForm.fileName = "annex"
			} else if (scope.cellIndex == 12) {
				recForm.fileName = "checkReport"
			}
			graduationDesign.deleteGraduationDesign(recForm).then(res => {
				graduationDesign.GetAllGraduationDesign()
			})
		})
		.catch(() => {})
}
</script>
<template>
	<div id="teacherGra">
		<button @click="addStudent" class="add">添加学生</button>
		<AddStudent ref="addStudentRef"></AddStudent>

		<div class="graduationDesign-main">
			<CustomTable :data="graduationList" border style="width: 96%; margin-left: 20px" max-height="750px" stripe>
				<template #default>
					<el-table-column label="姓名" align="center">
						<template #default="scope">
							{{ scope.row.stuName }}
						</template>
					</el-table-column>
					<el-table-column label="性别" align="center">
						<template #default="scope">
							{{ scope.row.gender ? "男" : "女" }}
						</template>
					</el-table-column>
					<el-table-column label="学号" align="center">
						<template #default="scope">
							{{ scope.row.sno }}
						</template>
					</el-table-column>
					<el-table-column label="班级" align="center">
						<template #default="scope">
							{{ scope.row.classses }}
						</template>
					</el-table-column>
					<el-table-column label="任务书" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.assignment.state === true">
								<span class="download" @click="download(scope.row.assignment.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.assignment.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="开题报告" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.headline.state === true">
								<span class="download" @click="download(scope.row.headline.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.headline.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="中英文翻译" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.foreignTrans.state === true">
								<span class="download" @click="download(scope.row.foreignTrans.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.foreignTrans.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="论文草稿" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.draftDissertation.state === true">
								<span class="download" @click="download(scope.row.draftDissertation.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.draftDissertation.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="第一阶段情况报告" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.firstReport.state === true">
								<span class="download" @click="download(scope.row.firstReport.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.firstReport.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="第二阶段情况报告" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.secondReport.state === true">
								<span class="download" @click="download(scope.row.secondReport.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.secondReport.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="论文" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.dissertation.state === true">
								<span class="download" @click="download(scope.row.dissertation.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.dissertation.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="附件" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.annex.state === true">
								<span class="download" @click="download(scope.row.annex.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.annex.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="查重报告" align="center">
						<template #default="scope">
							<div class="box" v-if="scope.row.checkReport.state === true">
								<span class="download" @click="download(scope.row.checkReport.url)">下载</span>
								<span class="separate">|</span>
								<span class="recurrence" @click="recurrence(scope)"> 退回</span>
							</div>
							<div class="falsebox" v-else-if="scope.row.checkReport.state === false">
								<span class="nodownload">下载</span>
								<span class="separate">|</span>
								<span class="recurrence">已退回</span>
							</div>
							<div v-else class="nullBox">
								<span>下载</span>
								<span>|</span>
								<span> 退回</span>
							</div>
						</template>
					</el-table-column>
				</template>
			</CustomTable>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#teacherGra {
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
}
:deep(.el-table) {
	font-size: 16px;
	color: #646464;
	td{
		height: 50px;
	}
	.cell {
		font-size: 14px;
	}
	.el-table__header {
		th {
			background: #f9f9f9;
		}
	}
}
.add {
	margin: 20px;
	width: 104px;
	height: 40px;
	color: #fff;
	cursor: pointer;
	text-align: center;
	background: #2ebba3;
	border-radius: 2px 2px 2px 2px;
}
.edit {
	color: #479fec;
	border: none;
	background: transparent;
}
.addStudent {
	width: 100%;
	height: 100%;
	background-color: pink;
}
.download {
	color: #2ebba3;
	font-size: 16px;
	cursor: pointer;
}
.nodownload {
	color: #646464;
	font-size: 16px;
}
.recurrence {
	color: red;
	font-size: 16px;
	cursor: pointer;
}
.box {
	width: 100%;
	display: flex;
	justify-content: space-between;
	text-align: left;
}
.falsebox {
	width: 100%;
	display: flex;
	justify-content: space-between;
	text-align: left;
	.recurrence {
		color: #646464;
		cursor: default;
	}
}
.nullBox {
	width: 100%;
	display: flex;
	justify-content: space-between;
	text-align: left;
	font-size: 16px;
	color: #d8d8d8 !important;
}
</style>
