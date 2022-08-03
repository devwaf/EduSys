import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useStuGraduation = defineStore("stuGraduation", {
	state: () => {
		return {
			graduationDesign: {}
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/GraduationDesign/GetGraduationDesign 获取学生的毕业设计
		async getGraduationDesign() {
			const res = await service({
				path: "/api/services/app/GraduationDesign/GetGraduationDesign",
				query: { studentId: localStorage.getItem("userId") },
				method: "get"
			})
			this.graduationDesign = res.result
			return res
		},

		// post /api/services/app/GraduationDesign/AddGraduationDesign 学生上传毕业设计
		async addGraduationDesign(form: any) {
			const res = await service({
				path: "/api/services/app/GraduationDesign/AddGraduationDesign",
				data: form,
				method: "post"
			})
			return res
		}
	}
})
