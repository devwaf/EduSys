import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherFormCenterGoalAchi = defineStore("teacherFormCenterGoalAchi", {
	state: () => {
		return {}
	},
	getters: {},
	actions: {
		// post /api/services/app/Outline/ExportAchiveComputeWord 达成度表 传班级就是班级表不传就是专业表
		async exportAchiveComputeWord(form: String) {
			let res = await service({
				path: "/api/services/app/Outline/ExportAchiveComputeWord",
				method: "post",
				data: form
			})
			return res
		}
	}
})
