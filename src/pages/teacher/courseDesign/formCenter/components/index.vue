<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { ref, reactive, toRefs, defineProps } from "vue"
import { ElNotification } from "element-plus"
import { useTeachercDFormCenter } from "@/store/teacher/formCenter/cDFormCenter.ts"
import { storeToRefs } from "pinia"

const teachercDFormCenter = useTeachercDFormCenter()
const props = defineProps({
	title: {
		type: String
	},
	courseId: {
		type: String
	},
	ordinaryFlag: {
		type: String
	}
})
const { title, courseId } = toRefs(props)
let pdfUrl = ref("")

let headerToken = ref({
	Authorization: `Bearer ${localStorage.getItem("token")}`
})
// 文件上传之前的钩子
const fileBeforeUpload = (file: any) => {
	let fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1)
	let whiteList = ["docx", "doc"]
	if (whiteList.indexOf(fileSuffix) === -1) {
		ElNotification({
			title: "请上传word文件",
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
	let form = {
		courseId: courseId.value,
		fileName: title.value,
		url: res.result.path
	}
	teachercDFormCenter.addOrUpdateCourseFile(form).then(res1 => {
		if (res.success) {
			ElNotification({
				title: `${title.value}上传成功`,
				type: "success"
			})
		}
	})
}
// 预览
const preview = () => {
	let form = {
		courseId: courseId.value,
		fileName: title.value
	}
	teachercDFormCenter.revieweCourseFile(form).then(res => {
		if (res.result.result) {
			// window.open(res.result.message)
			pdfUrl.value = res.result.message
		} else {
			ElNotification({
				title: res.result.message,
				type: "warning"
			})
		}
	})
}
</script>
<template>
	<div id="form">
		<div class="title">{{ title }}</div>
		<div class="upload">
			<el-upload
				v-if="ordinaryFlag"
				ref="uploadBox"
				action="http://101.133.234.110:10203/api/File/FileUpload"
				:show-file-list="false"
				:headers="headerToken"
				:data="{ Module: '普通文件夹' }"
				:file-list="fileList"
				:before-upload="fileBeforeUpload"
				:on-success="fileSuccess"
			>
				<el-button size="small" class="btn">
					<i class="iconfont icon-shangchuan" style="font-size: 12px"></i>
					选择文件上传</el-button
				>
			</el-upload>
			<el-upload
				v-else
				ref="uploadBox"
				action="http://101.133.234.110:10203/api/File/FileUpload"
				:show-file-list="false"
				:headers="headerToken"
				:data="{ Module: title }"
				:file-list="fileList"
				:before-upload="fileBeforeUpload"
				:on-success="fileSuccess"
			>
				<el-button size="small" class="btn">
					<i class="iconfont icon-shangchuan" style="font-size: 12px"></i>
					选择文件上传</el-button
				>
			</el-upload>
			<div class="text">只能上传word文件，且不超过5MB</div>
		</div>
		<embed v-if="pdfUrl" class="editHeader" ref="mainiframe" :src="pdfUrl" />

		<div class="formCoreBtn" v-if="title == '课程报告' || title == '任务书'">
			<el-button class="preview" @click="preview">预览</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
#form {
	> div {
		text-align: center;
		margin: auto;
	}
	.title {
		font-size: 24px;
		font-weight: 500;
		color: #646464;
	}
	.upload {
		position: relative;
		width: 600px;
		height: 60px;
		background: #f9f9f9;
		border: 1px solid #d8d8d8;
		margin-top: 20px;

		.btn {
			position: absolute;
			top: 13px;
			left: 20px;
			box-sizing: border-box;
			width: 150px;
			height: 34px;
			font-size: 14px;
			float: left;
		}
		.text {
			position: absolute;
			top: 0;
			left: 180px;
			line-height: 60px;
			margin-left: 30px;
			float: left;
			color: #a4a4a4;
		}
	}
	.editHeader {
		margin-top: 10px;
		width: 602px;
		height: 600px;
	}
	.formCoreBtn {
		position: absolute;
		top: 70px;
		left: 600px;
		width: 180px;
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
