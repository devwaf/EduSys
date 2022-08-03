import { defineStore } from "pinia"
import { service } from "../../api/service"

export const usePageAdministration = defineStore("administration", {
	state: () => {
		return {
			administrationlist: [], //课程大纲
			curriculumList: [] //课设
		}
	},
	actions: {
		// 获取所有课设大纲
		async GetAllCourse() {
			const res = await service({
				path: "/api/services/app/Course/GetAllCourse"
			})
			console.log(res, "课程9")
			this.administrationlist = []
			this.administrationlist = res.result
		},
		// 获取所有课设
		async GetAllDesgin() {
			const res = await service({
				path: "/api/services/app/Course/GetAllDesgin"
			})
			console.log(res, "课设9")
			this.curriculumList = []
			this.curriculumList = res.result
		},
		//    删除课设
		async DeleteCourse(id: String) {
			await service({
				path: "/api/services/app/Course/DeleteCourse",
				query: { id: id },
				method: "delete"
			})
		}
	}
})
