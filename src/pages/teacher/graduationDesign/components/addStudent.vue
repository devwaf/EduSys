<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive, defineExpose, watch } from "vue"

import { usePageAddStudent } from "@/store/teacher/graduationDesign/addStudent"
import { usePageGraduationDesign } from "@/store/teacher/graduationDesign/graduationDesign"
import { storeToRefs } from "pinia"
const addStudent = usePageAddStudent()
const graduationDesign = usePageGraduationDesign()
const { classList, studentList } = storeToRefs(addStudent)

addStudent.GetAllClasses()

let dialogVisible = ref(false)
defineExpose({ dialogVisible })

let selected = ref(false)
let queryForm = reactive({
	name: "",
	sno: "",
	classId: "",
	teacherId: localStorage.getItem("userId")
})
let classChange = (val: any) => {
	queryForm.classId = val
}
let stuList = ref([])
watch(
	dialogVisible,
	() => {
		if (dialogVisible.value == true) {
			// 获取已添加学生
			addStudent.getGraDesStudent().then((res: any) => {
				res.result.forEach(item => {
					stuList.value.push(item)
				})
			})
		} else {
			stuList.value = []
		}
	},
	{}
)
const queryStu = () => {
	studentList.value = []
	addStudent.getAllStudent(queryForm).then((res: any) => {
		if (studentList.value.length) {
			studentList.value.forEach((item1, index1) => {
				if (item1.myChoose) {
					if (stuList.value.length) {
						// 去重
						stuList.value.forEach((item2, index2) => {
							if (item1.studentId == item2.studentId) {
								if (item2.myChoose) {
									item1.myChoose = true
									stuList.value.splice(index2, 1, item1)
								} else {
									// 已添加删除
									let elCheckboxOriginal = document.querySelectorAll(".el-checkbox__original")
									elCheckboxOriginal[index1].checked = false // 改变输入框的checked值
									elCheckboxOriginal[index1].parentNode.classList.remove("is-checked") // 删除输入框的父元素类名
								}
							}
						})
					} else {
						item1.myChoose = true
						stuList.value.push(item1)
					}
				}
			})
			stuList.value.forEach(item1 => {
				if (item1.myChoose) {
					studentList.value.forEach(item2 => {
						if (item1.studentId == item2.studentId) {
							item2.myChoose = true
						}
					})
				}
			})
		}
	})
	console.log(stuList, "queryStu")
}
// 多选框事件
const addChoiceChange = (val: any, e: any, stuId: any) => {
	// val checked值	stuId 学生Id
	if (val) {
		stuList.value.forEach((item, index) => {
			if (item.studentId == stuId) {
				item.myChoose = true
			} else {
				studentList.value.forEach(item2 => {
					if (item2.studentId == stuId) {
						item2.myChoose = true
						stuList.value.push(item2)
					}
				})
			}
		})
		let resMap = new Map()
		// Map.has()方法将要搜索的元素的键作为参数，并返回布尔值。如果该元素存在于Map中，则返回true，否则返回false，
		stuList.value = stuList.value.filter(item => !resMap.has(item.studentId) && resMap.set(item.studentId, 1))
		console.log(stuList.value, "stuList.value")
	} else {
		stuList.value.forEach(item => {
			if (item.studentId == stuId) {
				item.myChoose = false
			}
		})
	}
	console.log(stuList, "addChoiceChange")
}
// 已选择学生关闭事件
const stuListClose = (studentId: any) => {
	// stuList
	stuList.value.forEach((item, index) => {
		if (item.studentId === studentId) {
			item.myChoose = false
		}
	})
	// 已添加删除studentList
	let elCheckboxOriginal = document.querySelectorAll(".el-checkbox__original")
	studentList.value.forEach((item, index) => {
		if (item.studentId === studentId) {
			elCheckboxOriginal[index].checked = false // 改变输入框的checked值
			elCheckboxOriginal[index].parentNode.classList.remove("is-checked") // 删除输入框的父元素类名
		}
	})
}
let formRef = ref()
// 关闭按钮
const closeBtn = () => {
	formRef.value.resetFields()
	studentList.value = []
	dialogVisible.value = false
}
// 取消确认
const cancelBtn = () => {
	formRef.value.resetFields()
	studentList.value = []
	dialogVisible.value = false
}
// 确认添加
const confirmBtn = () => {
	let addStuForm = {
		teacherId: localStorage.getItem("userId"),
		stuIds: []
	}
	stuList.value.forEach(item => {
		if (item.myChoose) {
			addStuForm.stuIds.push(item.studentId)
		}
	})
	console.log(stuList.value, "stuList.value")
	console.log(addStuForm, "addStuForm")
	addStudent.teacherChooseStuGra(addStuForm).then(() => {
		formRef.value.resetFields()
		studentList.value = []
		graduationDesign.GetAllGraduationDesign()
	})
	dialogVisible.value = false
}
</script>

<template>
	<div id="addStudent">
		<el-dialog v-model="dialogVisible" title="添加学生" :close-on-click-modal="false" :show-close="false">
			<div @click="closeBtn" class="closeBtn">
				<i class="iconfont icon-CloseDefault"></i>
			</div>
			<p class="title">毕业设计</p>
			<div class="addStuent">
				<div class="addStuent-top">
					<div>已添加的学生列表：</div>
					<div v-for="(item, index) in stuList" :key="index">
						<div v-if="item.myChoose" class="addStu">
							<el-alert :title="item.name" :closable="false" type="success" />
							<i @click="stuListClose(item.studentId)" class="iconfont icon-CloseDefault"></i>
						</div>
					</div>
				</div>
				<div class="addStudent-main">
					<el-form :model="queryForm" ref="formRef">
						<div class="demo-input-size">
							<el-form-item label="学生姓名" prop="name">
								<div class="screen">
									<el-input v-model="queryForm.name" class="w-50 m-2" :suffix-icon="Search" />
								</div>
							</el-form-item>
							<el-form-item label="学号" prop="sno">
								<div class="screen">
									<el-input v-model="queryForm.sno" class="w-50 m-2" :suffix-icon="Search" />
								</div>
							</el-form-item>
							<el-form-item label="班级：" prop="classId">
								<div class="screen">
									<CustomSelect
										v-model="queryForm.classId"
										:localdata="classList"
										@change="classChange"
                    clearable 
									></CustomSelect>
								</div>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="queryStu">查看</el-button>
							</el-form-item>
						</div>
					</el-form>
					<ul class="studentListUl">
						<li class="choice" v-for="(item, index) in studentList" :key="index">
							<div>{{ item.name }}</div>
							<div>学号：{{ item.sno }}</div>
							<div>班级：{{ item.class }}</div>
							<div style="display: flex; justify-content: space-between; align-items: center">
								<!-- 未选择 -->
								<div v-if="item.myChoose">
									<el-checkbox
										label="添加"
										size="large"
										checked="true"
										@change="(val, $e, data) => addChoiceChange(val, $e, item.studentId)"
									/>
								</div>
								<!-- 已选择 -->
								<div v-else-if="!item.myChoose">
									<div v-if="item.state">别人已选择</div>
									<el-checkbox
										v-else
										label="添加"
										size="large"
										@change="(val, $e, data) => addChoiceChange(val, $e, item.studentId)"
									/>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancelBtn" class="cancel">取消</el-button>
					<el-button @click="confirmBtn" class="confirm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
#addStudent {
	width: 100%;
	:deep(.el-dialog) {
		width: 720px;
		margin-top: 40px;
		.el-dialog__header {
			margin: 0;
			padding: 0;
			height: 40px;
			line-height: 40px;
			background-color: #f5f5f5;
			.el-dialog__title {
				margin-left: 15px;
			}
		}
		.el-dialog__body {
			padding-top: 0;
			.closeBtn {
				position: absolute;
				top: 6px;
				right: 0;
				width: 40px;
				height: 40px;
				cursor: pointer;
			}
		}
	}
	.title {
		font-size: 20px;
		text-align: center;
		margin: 20px 0;
	}
	.addStuent {
    box-sizing: border-box;
		width: 100%;
		border: 1px solid #ccc;
	}
	.addStuent-top {
		padding: 10px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		.addStu {
			position: relative;
			margin: 5px;
			width: 96px;
			height: 32px;
			:deep(.el-alert--success) {
				margin: 0;
			}
			> i {
				position: absolute;
				top: 6px;
				font-size: 14px;
				color: #babec0;
				right: 8px;
				cursor: pointer;
			}
		}
	}
	.el-alert {
		padding: 0;
		margin-right: 20px;
	}
	.el-alert--success.is-light {
		width: 96px;
		height: 32px;
		background: rgba($color: #2ebba3, $alpha: 0.1);
		color: #2ebba3;
		margin: 5px;
		:deep(.el-alert.is-light .el-alert__close-btn) {
			margin-top: -2px;
		}
	}
	.addStudent-main {
		width: 100%;
		padding: 20px;
	}
	.demo-input-size {
		display: flex;
		align-items: center;
	}
	:deep(.el-form-item) {
		margin-bottom: 0;
	}
	:deep(.el-input__wrapper) {
		margin: 0px !important;
	}
	.screen {
		margin-right: 10px;
		:deep(.el-input) {
			width: 100px;
		}
	}
	.choice {
		display: flex;
		flex: 4;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		padding: 0 10px;
		width: 400px;
		height: 40px;
		border: 1px solid #ccc;
		.choice-circular {
			// display: flex;
			display: inline-block;
			position: relative;
			margin-right: 10px;
			width: 16px;
			height: 16px;
			line-height: 40px;
			background: #ffffff;
			opacity: 0.4;
			border-radius: 50%;
			border: 1px solid #2ebba3;
			i {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				display: inline-block;
				width: 10px;
				height: 10px;
				// margin: auto;
				border-radius: 50%;
				background-color: #2ebba3;
			}
		}
		.selected {
			color: #2ebba3;
			i {
				background-color: #2ebba3;
			}
		}
	}
	:deep(.el-form) {
		.el-form-item {
			//   width: 190px;
			margin-right: 20px;
			//   background-color:pink;
		}
	}
	.studentListUl {
		width: 74%;
		height: 500px;
		margin-top: 10px;
		overflow-x: auto;
		overflow-y: auto;
	}
	:deep(.el-button) {
		border-radius: 0;
	}

	.cancel {
		color: #2ebba3;
		border-color: #2ebba3;
	}
	.confirm {
		color: #fff;
		background-color: #2ebba3;
		border-color: #2ebba3;
	}
}
</style>
