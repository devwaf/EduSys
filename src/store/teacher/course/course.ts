import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherCourse = defineStore("teacherCourse", {
	state: () => {
		return {
			courseName: "",
			semester: "",
			courseNameList: [],
			semesterList: []
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/Course/GetAllCourseName 获取所有的课程名称(不重复)
		async getAllCourseName(id: any) {
			const res = await service({
				path: "/api/services/app/Course/GetAllCourseName",
				query: { teacherId: localStorage.getItem("userId") },
				method: "get"
			})
			this.courseNameList = res.result
			return res
		},
		// get /api/services/app/Course/GetAllTerm 获取所有的学期(不重复)
		async getAllTerm(id: any) {
			const res = await service({
				path: "/api/services/app/Course/GetAllTerm",
				query: { teacherId: localStorage.getItem("userId") },
				method: "get"
			})
			this.semesterList = res.result
			return res
		},
		// get /api/services/app/Course/GetCourseNameForTrem 获取该学期有哪几个课程
		async getCourseNameForTrem(data: any) {
			const res = await service({
				path: "/api/services/app/Course/GetCourseNameForTrem",
				query: { semester: data },
				method: "get"
			})
			this.courseNameList = res.result
			return res
		},
		// get /api/services/app/Course/GetTermForCourseName 获取该课程名称有哪几个学期
		async getTermForCourseName(data: any) {
			const res = await service({
				path: "/api/services/app/Course/GetTermForCourseName",
				query: { courseName: data },
				method: "get"
			})
			this.semesterList = res.result
			return res
		},
		// get /api/services/app/Course/GetCourseSelect 根据课程名称和学期得到课程Id
		async getCourseSelect(form: any) {
			const res = await service({
				path: "/api/services/app/Course/GetCourseSelect",
				query: { courseName: form.courseName, semester: form.semester },
				method: "get"
			})
			return res
		}
	}
})
