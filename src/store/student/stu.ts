import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useStu = defineStore("Stu", {
	state: () => {
		return {
			stuDesSel: {},
			stuCourseSel: {},
			stuCSFirstLabel: "" // 开课日期第一个日期
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/Student/GetStudentDesignSelect 获取学生课程设计下拉框
		async getStudentDesignSelect() {
			const res = await service({
				path: "/api/services/app/Student/GetStudentDesignSelect",
				query: { stuId: localStorage.getItem("userId") },
				method: "get"
			})
			this.stuDesSel = res.result
			return res
		},
		// get /api/services/app/Student/GetStudentCourseelect 获取学生课程下拉框
		async getStudentCourseelect() {
			const res = await service({
				path: "/api/services/app/Student/GetStudentCourseelect",
				query: { stuId: localStorage.getItem("userId") },
				method: "get"
			})
			this.stuCourseSel = res.result
			this.stuCSFirstLabel = res.result.list2[0].label
			return res
		}
	}
})
