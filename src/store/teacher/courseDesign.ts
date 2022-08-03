import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherCourseDesign = defineStore("teacherCourseDesign", {
	state: () => {
		return {
			desginList: [],
			stuList: [],
			stuListCount: 0
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/Classes/GetClassAllStu 获取一个班级内所有的学生
		async getClassAllStu(id: any) {
			const res = await service({
				path: "/api/services/app/Classes/GetClassAllStu",
				query: { classId: id },
				method: "get"
			})
			return res
		},
		// get /api/services/app/Course/GetAllDesginSelect 获取课设列表
		async getAllDesginSelect() {
			const res = await service({
				path: "/api/services/app/Course/GetAllDesginSelect",
				method: "get"
			})
			this.desginList = res.result
			return res
		},
		// get /api/services/app/DefenseRecord/GetDesignDefenseList 获取答辩记录表学生
		async getDesignDefenseList(form: any) {
			const res = await service({
				path: "/api/services/app/DefenseRecord/GetDesignDefenseList",
				query: form,
				method: "get"
			})
			this.stuList = res.result.list
			this.stuListCount = res.result.count
			return res
		},
		// put /api/services/app/DefenseRecord/UpdateDesignDefenseObjective 老师审核答辩记录表
		async updateDesignDefenseObjective(form: any) {
			const res = await service({
				path: "/api/services/app/DefenseRecord/UpdateDesignDefenseObjective",
				data: form,
				method: "put"
			})
			return res
		},
		// get /api/services/app/DefenseRecord/GetDesignDefenseFile 教师端获取接口
		async getDesignDefenseFile(id: any) {
			const res = await service({
				path: "/api/services/app/DefenseRecord/GetDesignDefenseFile",
				query: { id: id },
				method: "get"
			})
			return res
		}
	}
})
