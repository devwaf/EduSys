import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeachercDFormCenter = defineStore("teachercDFormCenter", {
	state: () => {
		return {
			desginList:[]
		}
	},
	getters: {},
	actions: {
		// post /api/services/app/CourseFile/AddOrUpdateCourseFile 上传表
		async addOrUpdateCourseFile(form: Object) {
			let res = await service({
				path: "/api/services/app/CourseFile/AddOrUpdateCourseFile",
				method: "post",
				query: form
			})
			return res
		},
		// post /api/services/app/CourseFile/RevieweCourseFile 预览表
		async revieweCourseFile(form: Object) {
			let res = await service({
				path: "/api/services/app/CourseFile/RevieweCourseFile",
				method: "post",
				query: form
			})
			return res
		}
	}
})
