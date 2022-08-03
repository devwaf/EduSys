import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useStuCourseDesgin = defineStore("stuCourseDesgin", {
	state: () => {
		return {
			designDefenseState: false,
			designDefense:""
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/DefenseRecord/AddDesignDefenseObjective 添加答辩记录表
		async addDesignDefenseObjective(form: any) {
			const res = await service({
				path: "/api/services/app/DefenseRecord/AddDesignDefenseObjective",
				data: form,
				method: "post"
			})
			return res
		},
		// get /api/services/app/DefenseRecord/GetDesignDefense 获取答辩记录表
		async getDesignDefense(form: any) {
			const res = await service({
				path: "/api/services/app/DefenseRecord/GetDesignDefense",
				query: form,
				method: "get"
			})
			if (res.result) {
				if (res.result.state == 2) {
					this.designDefenseState = true
					this.designDefense = res.result
				} else {
					this.designDefenseState = false
				}
			} else {
				this.designDefenseState = false
			}
			return res
		},
		// get /api/services/app/CourseFile/GetCourseFile 下载模板
		async getCourseFile(form: any) {
			const res = await service({
				path: "/api/services/app/CourseFile/GetCourseFile",
				query: form,
				method: "get"
			})
			return res
		}
	}
})
