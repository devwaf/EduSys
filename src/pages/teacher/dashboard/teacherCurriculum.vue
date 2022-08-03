<script lang="ts" setup>
import { reactive } from "vue"
let tableData = reactive([
	{
		name: "计算机网络",
		type: "123",
		list: { a: 1, b: 2, c: 3, d: 4 },
		responsible: "雷老师",
		outline: "2022年大纲",
		credit: "8学分",
		creditHours: "2周",
		frequency: "2次",
		test: "2次",
		questions: "2次"
	}
])

let table4Data = reactive([
	{
		name: "第一大题",
		type: "选择题",
		score: "20分",
		subtopic: [
			{
				subtopicNo: 1.1,
				subtopicNoScore: 2,
				courseObjectives: "课程目标1"
			},
			{
				subtopicNo: 1.2,
				subtopicNoScore: 2,
				courseObjectives: "课程目标2"
			}
		]
	},
	{
		name: "第二大题",
		type: "判断题",
		score: "20分",
		subtopic: []
	}
])

let formInline = reactive({
	courseName: "自动导入",
	subjectNum: "自动统计",
	sum: "100"
})
</script>
<template>
	<div>
		<div class="top">
			<div>
				<span>课程名称：</span
				><el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<el-button type="primary" size="small" style="margin-left: 10px">新建课程</el-button>
			</div>
			<div>
				<span>课程大纲：</span
				><el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<el-button type="primary" size="small" style="margin-left: 10px">新建大纲</el-button>
			</div>
			<div>
				<span>开课学期：</span
				><el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button size="small" type="primary" style="background-color: #2ebba3; margin-left: 10px"
					>查看</el-button
				>
			</div>
		</div>
		<div class="main">
			<div class="curriculum">
				<p>1.课程信息</p>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="name" label="课程信息" width="180"> </el-table-column>
					<el-table-column prop="type" label="课程类型" width="180"> </el-table-column>
					<el-table-column prop="responsible" label="课程负责人"> </el-table-column>
					<el-table-column prop="outline" label="课程大纲"> </el-table-column>
					<el-table-column prop="credit" label="学分"> </el-table-column>
					<el-table-column prop="creditHours" label="总学时"> </el-table-column>
					<el-table-column prop="frequency" label="作业次数"> </el-table-column>
					<el-table-column prop="test" label="试验次数"> </el-table-column>
					<el-table-column prop="questions" label="试题数量"> </el-table-column>
				</el-table>
			</div>
			<div class="curriculum">
				<p>2.课程成绩组成比例</p>

				<div class="achievement">
					<div>成绩权重：</div>
					<el-table :data="tableData" border style="width: 500px">
						<el-table-column prop="name" label="平时表现" width="180"> </el-table-column>
						<el-table-column prop="type" label="平时作业" width="180"> </el-table-column>
						<el-table-column prop="responsible" label="实验"> </el-table-column>
						<el-table-column prop="outline" label="期末考试"> </el-table-column>
					</el-table>
				</div>
			</div>
			<div class="curriculum">
				<p>3.课程目标达成考核方式及成绩评定对照表</p>
				<el-table class="table3" :data="tableData" border style="width: 1081px">
					<el-table-column prop="name" label="课程目标" width="200"> </el-table-column>
					<el-table-column prop="type" label="支撑毕业要求" width="250"> </el-table-column>
					<el-table-column label="考核方式及比例" width="360">
						<el-table-column prop="list.a" label="平时表现" width="90"> </el-table-column>
						<el-table-column prop="list.b" label="平时作业" width="90"> </el-table-column>
						<el-table-column prop="list.c" label="实验" width="90"> </el-table-column>
						<el-table-column prop="list.d" label="期末考试" width="90"> </el-table-column>
					</el-table-column>
					<el-table-column prop="outline" label="成绩比例" width="270"> </el-table-column>
				</el-table>
			</div>

			<div class="curriculum">
				<p>4.考试配置</p>
				<el-form :inline="true" :model="formInline" class="formInline">
					<el-form-item label="课程名称：">
						<el-input v-model="formInline.courseName"></el-input>
					</el-form-item>
					<el-form-item label="试题数量：">
						<el-input v-model="formInline.subjectNum"></el-input>
						<span class="tail">题</span>
					</el-form-item>
					<el-form-item label="总分：">
						<el-input v-model="formInline.sum" class="sumIpt"></el-input>
						<span class="tail">分</span>
					</el-form-item>
				</el-form>

				<table class="table4" border="1" bordercolor="#e2e2e2" cellspacing="0">
					<thead>
						<tr>
							<td>题号</td>
							<td>题型</td>
							<td>分值</td>
							<td>
								小题号
								<span class="addSubtopicNo"><i class="el-icon-circle-plus-outline"></i>添加</span>
							</td>
							<td>每小题分值</td>
							<td>课程目标</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in table4Data" :key="index">
							<td>{{ item.name }}</td>
							<td>{{ item.type }}</td>
							<td>{{ item.score }}</td>
							<td>
								<p class="tdp" v-for="(item1, index) in item.subtopic" :key="index">
									{{ item1.subtopicNo }}
								</p>
							</td>
							<td>
								<p class="tdp" v-for="(item1, index) in item.subtopic" :key="index">
									{{ item1.subtopicNoScore }}
								</p>
							</td>
							<td>
								<p class="tdp" v-for="(item1, index) in item.subtopic" :key="index">
									{{ item1.courseObjectives }}
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.el-button {
	border: none;
}
:deep(.el-input__inner) {
	height: 36px;
	line-height: 36px;
}

:deep(.cell) {
	font-size: 16px;
	text-align: center;
}

.top {
	display: flex;
	margin-bottom: 30px;
	> div {
		margin-left: 20px;
	}
}
.main {
	padding: 20px;
	width: 100%;
	// height: 800px;
	border: 1px solid #ccc;
}
.curriculum {
	color: #646464 !important;
	margin-bottom: 20px;
	> p {
		font-size: 20px;
		font-family: Source Han Sans CN-Medium, Source Han Sans CN;
		font-weight: 500;
		color: #646464;
		line-height: 56px;
	}
	.table3 {
		:deep th {
			height: 40px;
			padding: 0;
			background-color: white !important;
		}
	}
	.formInline {
		margin-bottom: 20px;
		height: 36px;
		:deep .el-form-item__label {
			height: 36px;
			font-weight: normal;
			color: #646464;
			line-height: 36px;
		}
		:deep(.el-form-item__content) {
			position: relative;
			margin-right: 20px;
			height: 36px;
			line-height: 36px;
			:deep(.el-input) {
				width: 160px !important;
				float: left;

				:deep(.el-input__inner) {
					color: #646464;
					border-radius: 0px;
				}
			}

			.sumIpt {
				width: 60px !important;
			}

			.tail {
				position: absolute;
				right: -20px;
				color: #646464;
			}
		}
	}
	.table4 {
		td {
			width: 200px;
			text-align: center;
			font-size: 16px;
			margin: 0;
			padding: 0;
		}
		thead {
			td {
				height: 50px;
			}
		}
		tbody {
			.tdp {
				height: 50px;
				line-height: 50px;
				text-align: center;
				border-bottom: 1px solid rgb(226, 226, 226);
			}
			td {
				.tdp:last-child {
					border-bottom: none;
				}
			}
		}
	}
}
.achievement {
	display: flex;
	align-items: center;
	width: 700px;
}
</style>
