<script lang="ts" setup>
import { ref, reactive, defineProps, watch, onMounted } from "vue"
import type { TabsPaneContext } from "element-plus"
import { useStuCurriculum } from "@/store/student/curriculum.ts"
import { storeToRefs } from "pinia"

const stuCurriculum = useStuCurriculum()
const { stuAllHomeworkHistory, historyActive } = storeToRefs(stuCurriculum)
const props = defineProps({
	courseId: {
		type: String
	}
})
let activeName = ref(`${historyActive.value}`)

watch(
	props,
	(n, o) => {
		historyActive.value = "false"
		activeName.value = `${historyActive.value}`
	},
	{ deep: true }
)
watch(
	historyActive,
	(n, o) => {
		historyActive.value = "false"
		activeName.value = `${historyActive.value}`
	},
	{ deep: true }
)
let queryIdForm = ref({
	studentId: localStorage.getItem("userId"),
	courseId: "",
	state: false
})
// 作业历史
const handleClick = (tab: TabsPaneContext) => {
	queryIdForm.value.courseId = props.courseId
	queryIdForm.value.state = tab.props.name
	stuCurriculum.getStudentAllHomeworkHistory(queryIdForm.value)
}
</script>

<template>
	<el-tabs v-model="activeName" type="card" class="tabs" @tab-click="handleClick">
		<el-scrollbar height="720px">
			<el-tab-pane label="待批改的作业" name="false">
				<div v-for="(item, index) in stuAllHomeworkHistory" :key="index" class="box">
					<span class="name">{{ item.homeworkName }}</span>
				</div>
			</el-tab-pane>
			<el-tab-pane label="已批改的作业" name="true">
				<div v-for="(item, index) in stuAllHomeworkHistory" :key="index" class="table">
					<table border="1" cellspacing="0">
						<tr class="trF">
							<td style="width: 33%">作业名称</td>
							<td style="width: 30%">所属课程</td>
							<td style="width: 22%">批改时间</td>
							<td style="width: 15%">分数</td>
						</tr>
						<tr>
							<td>{{ item.homeworkName }}</td>
							<td>{{ item.courseName }}</td>
							<td>{{ item.updateTime }}</td>
							<td>{{ item.score }}</td>
						</tr>
						<tr>
							<td colspan="4" class="remark">评语:{{ item.remark }}</td>
						</tr>
					</table>
				</div>
			</el-tab-pane>
		</el-scrollbar>
	</el-tabs>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
	border: none;
	background-color: #f9f9f9;
}
:deep(.el-tabs__nav) {
	border: none !important;
	border-radius: 0px !important;
	.el-tabs__item {
		font-size: 16px;
		color: #a4a4a4;
		background-color: #f3f3f3;
		border: none;
	}
	.is-active {
		color: #fff;
		background-color: #2ebba3;
	}
}
.box {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: 300px;
	height: 60px;
	padding: 0 10px 0 25px;
	font-size: 16px;
	color: #646464;
	background-color: #f3f3f3;
	margin-bottom: 20px;
	.name {
		width: 120px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 20px;
	}
	.name,
	.score {
		display: inline-block;
		height: 24px;
	}
}
.table {
	table {
		box-sizing: border-box;
		width: 98%;
		border-color: #d8d8d8;
		color: #646464;
		td {
			padding: 0;
			text-align: center;
			height: 47px;
			font-size: 16px;
		}
		.trF {
			background-color: #f9f9f9;
		}
		.remark {
			height: inherit;
			text-align: left;
			padding: 10px 25px;
		}
	}
}
</style>
