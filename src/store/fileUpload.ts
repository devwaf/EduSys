import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useFileUpload = defineStore("fileUpload", {
	state: () => {
		return {}
	},
	getters: {},
	actions: {
		// post /api/File/FileUpload 文件上传统一接口
		async fileUpload(form: any) {
			const res = await service({
				path: "/api/File/FileUpload",
				data: form,
				method: "post"
			})
			return res
		}
	}
})
