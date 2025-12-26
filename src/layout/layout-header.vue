<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import { useRouter } from "vue-router"
import { ref, reactive } from "vue"
import { useAddStu } from "@/store/teacher/addStu.ts"
import { useNotice } from "../store/notice"
import News from "../components/News/news.vue"
// import  SideList from  '../pages/components/sideList.vue'
import { storeToRefs } from "pinia"
const addStu = useAddStu()
const router = useRouter()
const _useNotice = useNotice()
const quit = () => {
	ElMessageBox.confirm("确认退出登录？", {
		confirmButtonText: "确认",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		localStorage.removeItem("token")
		localStorage.removeItem("name")
		localStorage.removeItem("userId")
		localStorage.removeItem("encryptedAccessToken")
		localStorage.removeItem("isTeacher")
		ElMessage({
			type: "success",
			message: "成功退出"
		})
		router.push({ name: "Login" })
	})
}
let headerToken = ref({
	Authorization: `Bearer ${localStorage.getItem("token")}`
})
let userName = ref(localStorage.getItem("name"))
let isTea = ref(Number(localStorage.getItem("isTeacher")))
// 文件上传之前的钩子
const fileBeforeUpload = (file: any) => {
	let fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1)
	let whiteList = ["xlsx", "xls"]
	if (whiteList.indexOf(fileSuffix) === -1) {
		ElNotification({
			title: "请上传excel文件",
			type: "warning"
		})
		return false
	} else if (file.size / 1024 / 1024 > 5) {
		ElNotification({
			title: "文件大小不能超过5MB",
			type: "warning"
		})
		return false
	}
}
// 文件上传成功的钩子
const fileSuccess = (res: any) => {
	addStu.importStudentFromExcel(res.result.path).then(res2 => {
		if (res2.success) {
			ElNotification({
				title: res2.result.message,
				type: "success"
			})
		} else {
			ElNotification({
				title: res2.result.message,
				type: "warning"
			})
		}
	})
}
// 消息
const sideLiST = reactive([])
let num = localStorage.getItem("isTeacher")
const newsButton = () => {
	if (num == "1") {
		_useNotice.getTeacherNotice(localStorage.getItem("userId")).then(res => {
			sideLiST.values = res.result
		})
	}
	if (num == "0") {
		_useNotice.getAllNotice(localStorage.getItem("userId")).then(res => {
			sideLiST.values = res.result
		})
	}
}
// 下载学生信息模板
const downloadFile = () => {
	addStu.getImportStudentTemplate().then(res => {
		if (res.success) {
			window.open(res.result)
		}
	})
}
</script>

<template>
	<div class="navbar">
		<div class="left">
			<span>欢迎，{{ userName }}</span>
		</div>

		<div class="right">
			<div class="news">
				<el-popover placement="bottom" :width="360" trigger="click" popper-class="my-popover">
					<template #reference>
						<el-button class="news-button" @click="newsButton"
							><svg-icon
								icon="xiaoxi"
								class="home-icon"
								style="margin-top: 2px"
							/>&nbsp;&nbsp;消息</el-button
						>
					</template>
					<News></News>
				</el-popover>
			</div>
			<div class="importStu" v-if="isTea">
				<el-dropdown trigger="click">
					<div class="teaImportStu">
						<div class="img">
							<svg class="icon home-icon" aria-hidden="true">
								<use xlink:href="#icon-daoruxueshengzhanghao" />
							</svg>
						</div>
						<p class="text">下载模板/导入学生账号</p>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="downloadFile()">下载模板</el-dropdown-item>
							<el-dropdown-item>
								<el-upload
									ref="uploadBox"
									action="http://127.0.0.1:10203/api/File/FileUpload"
									:show-file-list="false"
									:headers="headerToken"
									:data="{ Module: 'recovery' }"
									:file-list="fileList"
									:before-upload="fileBeforeUpload"
									:on-success="fileSuccess"
								>
									<span>导入学生账号</span>
								</el-upload>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div class="userImg">
				<div class="img">
					<i class="iconfont icon-touxiang" style="font-size: 26px"></i>
				</div>
				<span>{{ userName }}</span>
			</div>
			<div class="quit" @click="quit">
				<div class="img">
					<i class="iconfont icon-tuichuicon" style="font-size: 14px"></i>
				</div>
				<span>退出登录</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 5vh;
	overflow: hidden;
	padding: 0 20px;
	position: relative;
	background: #2ebba3;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.left,
	.right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		color: #fff;
	}

	.importStu,
	.quit,
	.userImg,
	.news {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}
	.importStu,
	.quit {
		margin: 0 5px;
		cursor: pointer;
		:deep(.el-upload) {
			color: #fff;
		}
	}
	.right .img {
		display: inline-block;
		margin-right: 6px;
		margin-left: 20px;
		border-radius: 50%;
		.home-icon {
			margin-top: 6px;
			width: 28px;
			height: 28px;
		}
	}
	.teaImportStu {
		display: flex;
		color: white;
		align-items: center;
	}
	.news-button {
		display: flex;
		align-items: center;
		height: 100%;
		background-color: transparent;
		border: 0;
		color: #fff;
		&:hover {
			color: #fff;
		}
	}
	.left > span {
		font-size: 20px;
	}
	.right {
		.el-icon {
			height: 2em;
			width: 2em;
		}
		.account:hover,
		.quit:hover {
			display: flex;
			align-items: center;
			height: 100%;
			cursor: pointer;
			background-color: #1abc9c;
		}
	}
	:deep(.el-header) {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 5vh;
		background-color: #2ebba3;
		.left,
		.right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 200px;
			height: 100%;
			color: #fff;
		}

		.userImg {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// height: 50px;
			text-align: center;
		}
		.right .img {
			display: inline-block;
			margin-right: 10px;
			width: 30px;
			height: 30px;
			// line-height: 50px;
			margin-left: 20px;
			border-radius: 50%;
		}
		.left > span {
			font-size: 20px;
		}
		.right {
			.el-icon {
				height: 2em;
				width: 2em;
			}
			.account:hover,
			.quit:hover {
				display: flex;
				align-items: center;
				height: 100%;
				cursor: pointer;
				background-color: #1abc9c;
			}
		}
	}
	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;

			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
<style lang="scss">
.el-popover.my-popover {
	padding: 0 !important;
}
:deep(.el-dropdown-menu__item) {
	color: #a4a4a4 !important;
}
</style>