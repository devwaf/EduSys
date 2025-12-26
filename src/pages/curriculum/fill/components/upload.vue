<script lang="ts" setup>
import { defineProps, reactive, ref, watch } from "vue"
import { ElNotification } from "element-plus"
import { useStuCurriculum } from "@/store/student/curriculum.ts"
import { storeToRefs } from "pinia"

const stuCurriculum = useStuCurriculum()
const { historyActive } = storeToRefs(stuCurriculum)
const { questions, courseId } = defineProps({
	questions: {
		type: Object
	},
	courseId: {
		type: String
	}
})
let quest = ref(questions)

let showFileUpload = ref(false)
const showDialog = () => {
	showFileUpload.value = true
}
// 文件
let headerToken = ref({
	Authorization: `Bearer ${localStorage.getItem("token")}`
})
let fileList = ref({})
let uploadBox = ref()
watch(
	showFileUpload,
	() => {
		if (!showFileUpload.value) {
			uploadBox.value.clearFiles()
		}
	},
	{ deep: true }
)
// 文件上传之前的钩子
const fileBeforeUpload = (file: any, fileList: any) => {
	// 格式大小限制
	let fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1)
	let whiteList = []
	let titleText = ""
	if (quest.value.fileType == "word") {
		whiteList = ["docx", "doc"]
		titleText = "请上传word文件"
	} else if (quest.value.fileType == "excel") {
		whiteList = ["xlsx", "xls"]
		titleText = "请上传excel文件"
	} else if (quest.value.fileType == "ppt") {
		whiteList = ["pptx", "ppt"]
		titleText = "请上传ppt文件"
	} else if (quest.value.fileType == "pdf") {
		whiteList = ["pdf"]
		titleText = "请上传pdf文件"
	}
	if (whiteList.indexOf(fileSuffix) === -1) {
		ElNotification({
			title: titleText,
			type: "warning"
		})
		return false
	} else if (file.size / 1024 / 1024 > 5) {
		ElNotification({
			title: "文件大小不能超过5mb",
			type: "warning"
		})
		return false
	}
}
// 文件上传成功的钩子
const fileSuccess = (res: any) => {
	let title = document.querySelectorAll(".el-icon--document")
	let close = document.querySelectorAll(".el-icon--close")
	title.forEach(item => {
		let c = item.lastElementChild
		item.removeChild(c)
		item.className = "iconfont icon-chenggong1"
		item.style.fontSize = "22px"
		item.style.padding = "2px 6px 0 0"
	})
	close.forEach(item => {
		let c = item.lastElementChild
		item.removeChild(c)
		item.className = "iconfont icon-CloseDefault"
		item.style.color = "#ee5f66"
		item.style.cursor = "pointer"
	})
	fileList.value = res.result
}
// 关闭按钮
const closeBtn = () => {
	if (fileList.value == {}) {
		stuCurriculum.forceDeleteFiles(fileList.value.id).then((res: any) => {
			showFileUpload.value = false
		})
	} else {
		showFileUpload.value = false
	}
}
// 取消
const cancel = () => {
	if (fileList.value == {}) {
		stuCurriculum.forceDeleteFiles(fileList.value.id).then((res: any) => {
			showFileUpload.value = false
		})
	} else {
		showFileUpload.value = false
	}
}
let uploadFlag = ref(true)
// 确定
const confirm = () => {
	stuCurriculum
		.submitStuHomework({
			stuHomeworkId: quest.value.stuHomeworkId,
			fileList: fileList.value
		})
		.then((res: any) => {
			ElNotification({
				title: "上传作业成功",
				type: "success"
			})
			showFileUpload.value = false
			uploadFlag.value = false
			stuCurriculum.getStudentAllHomeworkHistory({
				studentId: localStorage.getItem("userId"),
				courseId: courseId,
				state: false
			})
			historyActive.value = false
		})
}
</script>

<template>
	<div id="upload" v-if="uploadFlag">
		<div class="title">{{ quest.homeworkName }}：</div>
		<!-- 弹窗 -->
		<el-dialog v-model="showFileUpload" title="上传文件" width="460px" :show-close="false">
			<div @click="closeBtn" class="closeBtn"><i class="iconfont icon-CloseDefault"></i></div>
			<div class="upload">
				<el-upload
					ref="uploadBox"
					action="http://127.0.0.1:10203/api/File/FileUpload"
					:limit="1"
					:headers="headerToken"
					:data="{ Module: '学生作业' }"
					:before-upload="fileBeforeUpload"
					:on-success="fileSuccess"
				>
					<el-button size="small" class="btn">
						<i class="iconfont icon-shangchuan" style="font-size: 12px"></i>
						选择文件上传</el-button
					>
				</el-upload>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button class="cancel" @click="cancel()">取消</el-button>
					<el-button class="confirm" @click="confirm()">确定</el-button>
				</span>
			</template>
		</el-dialog>
		<div class="uploadTT">
			<el-button size="small" class="btn" @click="showDialog">
				<i class="iconfont icon-shangchuan" style="font-size: 12px; padding: 0 5px 2px 0"></i>
				选择文件上传</el-button
			>
			<div class="text">只能上传{{ quest.fileType }}文件，且不超过5MB</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
#upload {
	display: flex;
	align-items: center;
	height: 120px;
	border: 1px solid #d8d8d8;
	background: #f9f9f9;
	font-size: 16px !important;
	:deep(.el-dialog) {
		.el-dialog__header {
			margin: 0;
			padding: 0;
			height: 44px;
			line-height: 44px;
			padding: 0 15px;
			background: #f5f5f5;
			.el-dialog__title {
				font-size: 16px;
				color: #646464;
			}
			.el-dialog__headerbtn {
				width: 16px;
				height: 16px;
				top: 10px;
				right: 15px;
			}
		}
		.el-dialog__body {
			padding: 0 15px;
			.closeBtn {
				position: absolute;
				top: 10px;
				right: 20px;
				cursor: pointer;
			}
			.upload {
				margin-top: 20px;
				.el-upload {
					margin-left: 50%;
					transform: translateX(-50%);
					.btn {
						box-sizing: border-box;
						width: 150px;
						height: 34px;
						font-size: 16px;
						letter-spacing: 1px;
						color: #767676;
						i {
							padding-right: 5px;
						}
					}
				}
				.el-upload-list {
					margin: 20px 10px 10px 10px;
					height: 55px;
					overflow-y: hidden;
					border: 1px solid #dadada;
					span {
						font-size: 16px;
					}
					.el-upload-list__item {
						width: 90%;
						box-sizing: border-box;
						margin: 10px;
						.el-upload-list__item-name {
							color: #2ebba3;
							.el-icon {
								color: #2ebba3;
							}
						}
						.el-icon--upload-success {
							display: none;
						}
						.el-icon--close {
							display: block;
						}
					}
					.is-success {
						color: #2ebba3;
					}
				}
			}
		}
		.el-button {
			width: 68px;
			height: 32px;
			color: white;
			line-height: 0;
			border-radius: 0;
			--el-button-hover-bg-color: none;
			--el-button-hover-border-color: none;
			span {
				line-height: 0;
			}
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
	.title {
		color: #646464;
		margin-left: 20px;
	}
	.uploadTT {
		display: flex;

		.btn {
			box-sizing: border-box;
			width: 150px;
			height: 34px;
			font-size: 14px;
		}
		.text {
			margin-top: 5px;
			margin-left: 30px;
			color: #a4a4a4;
		}
	}
}
</style>
