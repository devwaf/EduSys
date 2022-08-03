<script lang="ts" setup>
import { ref, reactive, nextTick, getCurrentInstance } from "vue"
import { ElNotification } from "element-plus"
import { stuGraProject } from "@/utils/student.ts"
import { useStuGraduation } from "@/store/student/graduation.ts"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
let router = useRouter()

const stuGraduation = useStuGraduation()
const { graduationDesign } = storeToRefs(stuGraduation)

let activeNum = ref(1)
let stuGra = ref([])
// 获取学生毕业设计状态
const getStuGraFun = () => {
	stuGraduation.getGraduationDesign().then((res: any) => {
		let data = res.result
		stuGra.value = [
			[data.assignment, data.headline, data.foreignTrans],
			[data.draftDissertation, data.firstReport, data.secondReport],
			[data.dissertation, data.annex, data.checkReport]
		]
		// 代码不好看，但是能最大节省代码
		nextTick(() => {
			let tableDOM = document.querySelectorAll(".tableDOM")
			let tdMask = document.createElement("div")
			tdMask.classList.add("tdMask")
			tdMask.style.cssText = "position: absolute;top: 0px;left: 0px;cursor: not-allowed;width: 100%;height: 100%;"
			if (data.isStart) {
				if (stuGra.value[0][0].state && stuGra.value[0][1].state && stuGra.value[0][2].state) {
					activeNum.value = 2
					let tdMaskList1 = tableDOM[1].querySelectorAll(".tdMask")
					tdMaskList1.forEach(item => {
						item.remove()
					})
					if (stuGra.value[1][0].state && stuGra.value[1][1].state && stuGra.value[1][2].state) {
						activeNum.value = 3
						let tdMaskList2 = tableDOM[2].querySelectorAll(".tdMask")
						tdMaskList2.forEach(item => {
							item.remove()
						})
						// if (stuGra.value[2][0].state && stuGra.value[2][1].state && stuGra.value[2][2].state) {
						// 	activeNum.value = 3
						// }
					} else {
						let tdMask1 = tdMask.cloneNode()
						let tdMask2 = tdMask.cloneNode()
						let tdMask3 = tdMask.cloneNode()
						tableDOM[2].children[0].children[1].appendChild(tdMask1)
						tableDOM[2].children[1].children[1].appendChild(tdMask2)
						tableDOM[2].children[2].children[1].appendChild(tdMask3)
					}
				} else {
					let tdMask1 = tdMask.cloneNode()
					let tdMask2 = tdMask.cloneNode()
					let tdMask3 = tdMask.cloneNode()
					let tdMask4 = tdMask.cloneNode()
					let tdMask5 = tdMask.cloneNode()
					let tdMask6 = tdMask.cloneNode()
					tableDOM[1].children[0].children[1].appendChild(tdMask1)
					tableDOM[1].children[1].children[1].appendChild(tdMask2)
					tableDOM[1].children[2].children[1].appendChild(tdMask3)
					tableDOM[2].children[0].children[1].appendChild(tdMask4)
					tableDOM[2].children[1].children[1].appendChild(tdMask5)
					tableDOM[2].children[2].children[1].appendChild(tdMask6)
				}
			} else {
				tableDOM[0].children[0].children[1].appendChild(tdMask.cloneNode())
				tableDOM[0].children[1].children[1].appendChild(tdMask.cloneNode())
				tableDOM[0].children[2].children[1].appendChild(tdMask.cloneNode())
				tableDOM[1].children[0].children[1].appendChild(tdMask.cloneNode())
				tableDOM[1].children[1].children[1].appendChild(tdMask.cloneNode())
				tableDOM[1].children[2].children[1].appendChild(tdMask.cloneNode())
				tableDOM[2].children[0].children[1].appendChild(tdMask.cloneNode())
				tableDOM[2].children[1].children[1].appendChild(tdMask.cloneNode())
				tableDOM[2].children[2].children[1].appendChild(tdMask.cloneNode())
			}
		})
	})
}
getStuGraFun()

// 上传
const submit = () => {
	stuGraduation.addGraduationDesign()
}
// 文件
let headerToken = ref({
	Authorization: `Bearer ${localStorage.getItem("token")}`
})
let fileList = ref([])
// 文件上传之前的钩子
const fileBeforeUpload = (file: any) => {
	// 格式限制
	let fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1)
	let whiteList = ["docx", "doc", "xlsx", "xls", "pptx", "ppt"]
	if (whiteList.indexOf(fileSuffix) === -1) {
		ElNotification({
			title: "请上传word文件或excel文件或ppt文件",
			type: "warning"
		})
		return false
	}
}
const instance = getCurrentInstance()
// 文件上传成功的钩子 代码不好看，但是能最大节省代码
const fileSuccess = (res: any, index1: any, index2: any) => {
	let form = reactive({
		id: graduationDesign.value.id,
		stuId: localStorage.getItem("userId"),
		name: graduationDesign.value.name
	})
	if (index1 === 0 && index2 === 0) {
		form.assignment = res.result
		stuGraduation.addGraduationDesign(form).then((res1: res) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 0 && index2 === 1) {
		form.headline = res.result
		stuGraduation.addGraduationDesign(form).then((res1: res) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 0 && index2 === 2) {
		form.foreignTrans = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 1 && index2 === 0) {
		form.draftDissertation = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 1 && index2 === 1) {
		form.firstReport = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 1 && index2 === 2) {
		form.secondReport = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 2 && index2 === 0) {
		form.dissertation = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 2 && index2 === 1) {
		form.annex = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	} else if (index1 === 2 && index2 === 2) {
		form.checkReport = res.result
		stuGraduation.addGraduationDesign(form).then((res1: any) => {
			form = {}
			getStuGraFun()
		})
	}
}
</script>

<template>
	<div>
		<div class="container-main">
			<div class="main">
				<el-steps :active="activeNum" align-center="true">
					<el-step description="前期"></el-step>
					<el-step description="中期"></el-step>
					<el-step description="后期"></el-step>
				</el-steps>
				<div class="addFill" v-if="stuGra.length">
					<table
						v-for="(item1, index1) in stuGraProject"
						:key="index1"
						border="1"
						cell-spacing="0"
						class="tableDOM"
					>
						<tr v-for="(item2, index2) in item1" :key="index2">
							<td>
								<div v-if="stuGra[index1][index2].state === false">
									{{ item2.name }} <span style="color: #ee5f66">(退回)</span>
								</div>
								<div v-else>{{ item2.name }}</div>
							</td>

							<td>
								<div v-if="stuGra[index1][index2].state === null">
									<el-upload
										ref="uploadBox"
										action="http://101.133.234.110:10203/api/File/FileUpload"
										:show-file-list="false"
										:headers="headerToken"
										:data="{ Module: '学生毕业设计' }"
										:file-list="fileList"
										:before-upload="fileBeforeUpload"
										:on-success="
											res => {
												return fileSuccess(res, index1, index2)
											}
										"
									>
										<span class="uploadText">上传</span>
									</el-upload>
								</div>
								<div v-else-if="stuGra[index1][index2].state === true">
									<span style="color: #2ebba3">已提交</span>
								</div>
								<div v-else-if="stuGra[index1][index2].state === false">
									<el-upload
										ref="uploadBox"
										action="http://101.133.234.110:10203/api/File/FileUpload"
										:show-file-list="false"
										:headers="headerToken"
										:data="{ Module: '学生毕业设计' }"
										:file-list="fileList"
										:before-upload="fileBeforeUpload"
										:on-success="
											res => {
												return fileSuccess(res, index1, index2)
											}
										"
									>
										<span style="color: #ee5f66">重新上传</span>
									</el-upload>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container-main {
	position: relative;
	padding: 20px;
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 60px);
	overflow: auto;
	background-color: #fff;
}
:deep(.el-steps--horizontal) {
	position: absolute;
	top: 100px;
	left: 50%;
	transform: translate(-50%);
	width: 900px;
	.el-step__head.is-finish {
		color: #fff;
		border-color: #2ebba3;
		// background-color: #2ebba3;
		> .el-step__icon.is-text {
			color: #fff;
			background-color: #2ebba3;
		}
	}
	.el-step__icon.is-text {
		color: #b2b2b2;
		border-color: #f2f2f2;
		background-color: #f2f2f2;
	}
	.el-step__description.is-finish {
		color: #2ebba3;
	}
	.el-step.is-center .el-step__description {
		margin-top: 10px;
		text-align: center;
	}
	.el-step__icon {
		width: 36px;
		height: 36px;
		line-height: 36px;
		border: 0;
	}
	.el-step__line {
		top: 17px;
	}
	.is-wait,
	.is-process {
		color: #646464;
	}
}
.addFill {
	position: absolute;
	display: flex;
	justify-content: space-between;
	top: 200px;
	left: 50%;
	transform: translate(-50%);
	width: 800px;
	table {
		border-color: #cbcbcb;
		margin: 0 15px;
		td {
			position: relative;
			padding: 0;
			width: 126px;
			height: 52px;
			word-wrap: break-word;
			line-height: 52px;
			text-align: center;
			color: #707070;
			> div {
				text-align: center;
				> div {
					text-align: center;
				}
			}
			.uploadText {
				color: #ff7537;
			}
		}
	}
}
</style>
