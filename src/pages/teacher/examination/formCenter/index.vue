<script lang="ts" setup>
import TotalMarkForm from "./totalMarkForm/index.vue"
import TeachingTCForm from "./teachingTCForm/index.vue"
// import ExpmRAForm from "./expmRAForm/index.vue"
import TestPaperForm from "./testPaperForm/index.vue"
import ClassGoalAchiForm from "./classGoalAchiForm/index.vue"
import MajorGoalAchiForm from "./majorGoalAchiForm/index.vue"
import { ElMessageBox } from "element-plus"
import { ref, reactive, onMounted } from "vue"
import { onBeforeRouteLeave } from "vue-router"
import { useTeacherFormCenterExam } from "@/store/teacher/formCenter/exam"
import { storeToRefs } from "pinia"

const teacherFormCenterExam = useTeacherFormCenterExam()
const { teachingTaskShowList, changeFlag, oldTeaList } = storeToRefs(teacherFormCenterExam)

const formNavList = [
	{
		title: "总评成绩表",
		id: 0
	},
	{
		title: "教学任务确认表",
		id: 1
	},
	// {
	// 	title: "实验报告分析表",
	// 	id: 2
	// },
	{
		title: "试卷审核表",
		id: 2
	},
	{
		title: "班级目标达成度",
		id: 3
	},
	{
		title: "专业目标达成度",
		id: 4
	}
]
let navList = ref(null)
let formBoxList = ref(null)
let activeId = ref(0)
const navBtn = id => {
	activeId.value = id
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
let teachingTCForm = ref()
onBeforeRouteLeave((to, from, next) => {
	if (activeId.value == 1) {
		if (JSON.stringify(teachingTaskShowList.value) == JSON.stringify(oldTeaList.value)) {
			changeFlag.value = false
		} else {
			changeFlag.value = true
		}

		if (changeFlag.value) {
			ElMessageBox.confirm("教学任务表改变,是否保存?", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					teachingTCForm.value.okSave()
					next()
				})
				.catch(() => {
					next()
				})
		} else {
			next()
		}
	} else {
		next()
	}
})
</script>
<template>
	<div id="formCenter">
		<div class="nav">
			<ul ref="navList">
				<li v-for="item in formNavList" :key="item.id" @click="navBtn(item.id)">
					<span class="title">{{ item.title }}</span>
					<div class="btn"></div>
				</li>
			</ul>
		</div>
		<div class="formBox" ref="formBoxList">
			<div class="form1"><TotalMarkForm></TotalMarkForm></div>
			<div class="form2"><TeachingTCForm ref="teachingTCForm"></TeachingTCForm></div>
			<!-- <div class="form3"><ExpmRAForm></ExpmRAForm></div> -->
			<div class="form4"><TestPaperForm></TestPaperForm></div>
			<div class="form5"><ClassGoalAchiForm></ClassGoalAchiForm></div>
			<div class="form6"><MajorGoalAchiForm></MajorGoalAchiForm></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#formCenter {
	position: relative;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
	.nav {
		position: absolute;
		top: 50px;
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
		left: 220px;
		width: 85%;
		height: 100%;
		:deep(.el-table) {
			.el-table--border,
			.el-table--group {
				border: 1px solid #707070;
				opacity: 0.2;
			}
		}
		:deep(.cell) {
			font-size: 16px;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 400;
			color: #646464;
		}

		> div {
			display: none;
		}
	}
}
</style>
