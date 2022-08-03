<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue"

import { ref, reactive } from "vue"
let queryForm = reactive({
	classPeopleNum: "",
	joinPeopleNum: ""
})
let tableData = reactive({
	achievement: ["90-100", "80-90", "70-80"],
	proportion: ["24%", "14%", "30%"]
})
let explainText = ref("")
</script>
<template>
	<div id="form">
		<div class="title">实验报告分析表</div>
		<div class="query">
			<el-form :inline="true" :model="queryForm" class="queryForm">
				<el-form-item label="班级人数：">
					<el-input v-model="queryForm.classPeopleNum" />
				</el-form-item>
				<el-form-item label="参加实验人数：">
					<el-input v-model="queryForm.joinPeopleNum" />
				</el-form-item>
			</el-form>
		</div>

		<table border="1" cellspacing="0" class="table">
			<tr>
				<td>成绩分析</td>
				<td v-for="(item, index) in tableData.achievement" :key="index">{{ item }}</td>
			</tr>
			<tr>
				<td>占比</td>
				<td v-for="(item, index) in tableData.proportion" :key="index">{{ item }}</td>
			</tr>
		</table>

		<div class="explain">
			<p>分析说明：</p>
			<el-input v-model="explainText" type="textarea" />
		</div>

		<div class="formCoreBtn">
			<el-button class="preview">保存</el-button>
			<!-- <el-button class="goPrint">去打印</el-button> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
#form {
	width: 100%;
	.title {
		width: 100%;
		text-align: center;
		font-size: 24px;
		font-weight: 500;
		color: #646464;
		line-height: 66px;
	}
	.query {
		margin-left: 200px;
	}
	.table {
		margin: 10px 0 40px 200px;
		border: 1px solid #cbcbcb;
		td {
			width: 125px;
			height: 50px;
			font-size: 16px;
			font-weight: 400;
			color: #646464;
			text-align: center;
			padding: 0;
		}
	}
	.explain {
		margin-left: 200px;
		width: 762px;
		font-size: 16px;
		font-weight: 400;
		color: #646464;
		p {
			margin-bottom: 10px;
		}
	}
	.formCoreBtn {
		position: absolute;
		bottom: 200px;
		right: 100px;
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
