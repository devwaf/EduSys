<script lang="ts" setup>
import CustomSelect from "@/components/customSelect/customSelect.vue"
import CustomTable from "@/components/customTable/customTable.vue"
import { reactive, ref } from "vue"
import { useTeacherPublic } from "@/store/teacher/public.ts"
import { storeToRefs } from "pinia"

const teacherPublic = useTeacherPublic()
const { allCourseSelect, outlineId, scoreWeightList, allHomework } = storeToRefs(teacherPublic)

let queryForm = reactive({
	courseId: "",
	teacherId: localStorage.getItem("userId"),
	type: ""
})
teacherPublic.getAllCourseSelect().then(res => {
	queryForm.courseId = res.result[0].value
	teacherPublic.getAllHomework(queryForm)
})

const courseChange = (val: any) => {
	queryForm.type = ""
	if (val) {
		// 获取当前课程的信息
		teacherPublic.getCourse(val).then(res => {
			// 获取所有权重
			teacherPublic.getAllScoreWeight(outlineId.value)
			teacherPublic.getAllHomework(queryForm)
		})
	}
}
const typeChange = (val: any) => {
	queryForm.type = val
	teacherPublic.getAllHomework(queryForm)
}
</script>

<template>
	<div id="publishedTask">
		<el-form :inline="true" :model="queryForm" class="queryForm" label-width="100px">
			<el-form-item label="课程名称：">
				<CustomSelect
					@change="courseChange"
					v-model="queryForm.courseId"
					:localdata="allCourseSelect"
					clearable
				/>
			</el-form-item>
			<el-form-item label="作业类型：">
				<CustomSelect
					@change="typeChange"
					v-model="queryForm.type"
					:localdata="scoreWeightList"
					v-if="queryForm.courseId"
					clearable
				/>
				<CustomSelect @change="queryChange" v-else disabled placeholder="请先选择课程名称" />
			</el-form-item>
		</el-form>

		<CustomTable class="table" :data="allHomework" border align="center" style="width: 80%" max-height="750px">
			<template #default>
				<el-table-column label="作业名称" align="center">
					<template #default="scope">
						{{ scope.row.name }}
					</template>
				</el-table-column>
				<el-table-column label="作业类型" align="center">
					<template #default="scope">
						{{ scope.row.type }}
					</template>
				</el-table-column>
				<el-table-column label="课程名称" align="center">
					<template #default="scope">
						{{ scope.row.courseName }}
					</template>
				</el-table-column>
				<el-table-column label="文件类型" align="center">
					<template #default="scope">
						{{ scope.row.fileType }}
					</template>
				</el-table-column>
				<el-table-column label="发布时间" align="center">
					<template #default="scope">
						{{ scope.row.creationTime }}
					</template>
				</el-table-column>
			</template>
		</CustomTable>
	</div>
</template>

<style lang="scss" scoped>
#publishedTask {
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
	padding: 20px;
	:deep(.el-form) {
		.el-form-item {
			color: #646464 !important;
			margin-right: 0;
			height: 36px;
		}
		.el-form-item__label {
			height: 34px;
			line-height: 34px;
			padding: 0;
			font-size: 14px;
		}
		.el-input__wrapper {
			height: 32px;
			margin: 0;
			padding-right: 17px;
			font-size: 14px;
		}
	}
	:deep(.el-table) {
		margin-left: 30px;
		tr {
			height: 50px;
			.cell {
				font-size: 14px;
				color: #646464;
			}
		}
	}
}
</style>
