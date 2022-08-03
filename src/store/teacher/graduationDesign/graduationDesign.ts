import { defineStore } from "pinia"
import { service } from "../../../api/service"

export const usePageGraduationDesign = defineStore("graduationDesign", {
	state: () => {
		return {
			graduationList: [] //毕业设计
		}
	},
	actions: {
		async GetAllGraduationDesign() {
			let res = await service({
				path: "/api/services/app/GraduationDesign/GetAllGraduationDesign",
				method: "get",
				query: { teacherId: localStorage.getItem("userId") }
			})
			this.graduationList = res.result
			return res
		},
		// delete /api/services/app/GraduationDesign/DeleteGraduationDesign 老师打回毕业设计
		async deleteGraduationDesign(form: any) {
			let res = await service({
				path: "/api/services/app/GraduationDesign/DeleteGraduationDesign",
				method: "delete",
				query: form
			})
			return res
		}
	}
})
