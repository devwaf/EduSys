import { defineStore } from "pinia"
import { service } from "@/api/service"

export const usePageCourseDesign = defineStore("courseDesign", {
	state: () => {
		return {
			options: [], //课设大纲
			courseNameDesList: [],
			semesterDesList: []
		}
	},
	actions: {
		async GetAllDesignSelect() {
			const res = await service({
				path: " /api/services/app/Outline/GetAllDesignSelect",
				query: { outlineId: localStorage.getItem("userId") }
			})
			this.options = res.result
		},
		// get /api/services/app/Course/GetAllDesignName 获取所有的课设名称(不重复)
		async getAllDesignName(id: any) {
			const res = await service({
				path: "/api/services/app/Course/GetAllDesignName",
				query: { teacherId: localStorage.getItem("userId") },
				method: "get"
			})
			this.courseNameDesList = res.result
			return res
		},
		// get /api/services/app/Course/GetAllDesignTerm 获取所有的学期(不重复)
		async getAllDesignTerm(id: any) {
			const res = await service({
				path: "/api/services/app/Course/GetAllDesignTerm",
				query: { teacherId: localStorage.getItem("userId") },
				method: "get"
			})
			this.semesterDesList = res.result
			return res
		},
		// get /api/services/app/Course/GetDesignNameForTrem 获取该学期有哪几个课程
		async getDesignNameForTrem(data: any) {
			const res = await service({
				path: "/api/services/app/Course/GetDesignNameForTrem",
				query: { semester: data },
				method: "get"
			})
			this.courseNameDesList = res.result
			return res
		},
		// get /api/services/app/Course/GetTermForDesignName 获取该课程名称有哪几个学期
		async getTermForDesignName(data: any) {
			const res = await service({
				path: "/api/services/app/Course/GetTermForDesignName",
				query: { courseName: data },
				method: "get"
			})
			this.semesterDesList = res.result
			return res
		},
		// get /api/services/app/Course/GetDesignSelect 根据课程名称和学期得到课程Id
		async getDesignSelect(form: any) {
			const res = await service({
				path: "/api/services/app/Course/GetDesignSelect",
				query: { courseName: form.courseName, semester: form.semester },
				method: "get"
			})
			return res
		}
	}
})
