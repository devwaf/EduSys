<script lang="ts" setup>
import TotalScore from "./totalScore/index.vue"
import SubGrade from "./subGrade/index.vue"
import Outline from "./outline/index.vue"
import CourseReport from "./courseReport/index.vue"
import Assignment from "./assignment/index.vue"
import { ref, reactive, onMounted } from "vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { formNavList } from "@/utils/teacher.ts"
import { usePageCourseDesign } from "@/store/teacher/courseDesign/courseDesign.ts"
import { storeToRefs } from "pinia"

const courseDesign = usePageCourseDesign()
const { courseNameDesList, semesterDesList } = storeToRefs(courseDesign)
let navList = ref(null)
let formBoxList = ref(null)

const navBtn = id => {
	for (let i = 0; i < navList._value.children.length; i++) {
		navList._value.children[i].classList.remove("active")
		formBoxList._value.children[i].style.display = "none"
	}
	navList._value.children[id].classList.add("active")
	formBoxList._value.children[id].style.display = "block"
}
onMounted(() => {
	navList._value.children[0].classList.add("active")
	formBoxList._value.children[0].style.display = "block"
})
// 表单值
let queryForm = reactive({
	courseName: "",
	semester: ""
})
// 课程id
let courseId = ref()
// 首次获取课程，开课日期,班级
const initQueryForm = success => {
	Promise.all([courseDesign.getAllDesignName(), courseDesign.getAllDesignTerm()]).then(([res1, res2]) => {
		if (res1.result.length && res2.result.length) {
			queryForm.courseName = res1.result[0].value
			queryForm.semester = res2.result[0].value
			if (success) success()
		}
	})
}
initQueryForm(() => {
	// 首次获取课程id
	courseDesign.getDesignSelect(queryForm).then((res: any) => {
		courseId.value = res.result
	})
})
const courseNameChange = (val: string) => {
	queryForm.courseName = val
	courseDesign.getTermForDesignName(val).then((res: any) => {
		queryForm.semester = res.result[0].label
		courseDesign.getDesignSelect(queryForm).then((res1: any) => {
			courseId.value = res1.result
		})
	})
}
const semesterChange = (val: string) => {
	queryForm.semester = val
	courseDesign.getDesignNameForTrem(val).then((res: any) => {
		queryForm.courseName = res.result[0].label
		courseDesign.getDesignSelect(queryForm).then((res1: any) => {
			courseId.value = res1.result
		})
	})
}
</script>
<template>
	<div id="formCenter">
		<el-form :inline="true" :model="queryForm" class="queryForm" label-width="100px">
			<el-form-item label="课程名称：">
				<CustomSelect
					@change="courseNameChange"
					v-model="queryForm.courseName"
					:localdata="courseNameDesList"
					style="width: 178px"
				/>
			</el-form-item>
			<el-form-item label="开课学期：">
				<CustomSelect
					@change="semesterChange"
					v-model="queryForm.semester"
					:localdata="semesterDesList"
					style="width: 208px"
				/>
			</el-form-item>
		</el-form>
		<div class="nav">
			<ul ref="navList">
				<li v-for="item in formNavList" :key="item.id" @click="navBtn(item.id)">
					<span class="title">{{ item.title }}</span>
					<div class="btn"></div>
				</li>
			</ul>
		</div>
		<div class="formBox" ref="formBoxList">
			<div>
				<TotalScore :courseId="courseId"></TotalScore>
			</div>
			<div>
				<SubGrade :courseId="courseId"></SubGrade>
			</div>
			<div>
				<Outline :courseId="courseId"></Outline>
			</div>
			<div>
				<CourseReport :courseId="courseId"></CourseReport>
			</div>
			<div>
				<Assignment :courseId="courseId"></Assignment>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#formCenter {
	position: relative;
	padding: 20px;
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
	.queryForm {
		margin-left: 60px;
		:deep(.el-form-item__label) {
			height: 42px;
			line-height: 42px;
			font-size: 16px;
		}
		:deep(.el-input__inner) {
			font-size: 16px;
		}
	}
	.nav {
		position: absolute;
		top: 100px;
		left: 20px;
		ul {
			width: 150px;
			.active {
				.title {
					color: #2ebba3;
				}
				.btn {
					background-color: #2ebba3;
				}
			}
			li {
				display: flex;
				justify-content: right;
				align-items: center;
				margin-top: 10px;
				width: 100%;
				height: 70px;
				cursor: pointer;

				.title {
					font-size: 16px;
					color: #d5d7e3;
					margin-right: 10px;
				}
				.btn {
					width: 8px;
					height: 70px;
					background: #d5d7e3;
				}
			}
		}
	}
	.formBox {
		position: absolute;
		left: 500px;
		width: 600px;
		// height: 100vh;

		> div {
			display: none;
		}
	}
}
</style>
