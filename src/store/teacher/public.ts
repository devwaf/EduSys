import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherPublic = defineStore("teacherPublic", {
	state: () => {
		return {
			allCourseSelect: [], // 课程下拉框
			outlineId: "", // 大纲id
			semester: "", //
			scoreWeightList: [], // 权重
			swFlag: false,
			classList: [], // 班级列表
			majorClassList: [], // 专业班级下拉框
			courseClassList: [], // 根据课程获取班级下拉框
			allHomework: [], // 已发布作业
			timesList: []
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/Course/GetAllCourse 获取所有课程
		async getAllCourse() {
			const res = await service({
				path: "/api/services/app/Course/GetAllCourse",
				method: "get"
			})
		},
		// get /api/services/app/Course/GetAllCourseSelect 获取课程列表
		async getAllCourseSelect() {
			const res = await service({
				path: "/api/services/app/Course/GetAllCourseSelect",
				method: "get"
			})
			this.allCourseSelect = res.result
			return res
		},
		// get /api/services/app/Course/GetCourse 获取课程
		async getCourse(courseId: any) {
			const res = await service({
				path: "/api/services/app/Course/GetCourse",
				query: { id: courseId },
				method: "get"
			})
			this.outlineId = res.result.outlineId
			this.semester = res.result.semester
			return res
		},
		// get /api/services/app/ScoreWeight/GetUsualScoreWeight 获取所有权重
		// 原本是GetAllScoreWeight,改为GetUsualScoreWeight，api名字不要改，不然很多地方都要改
		async getAllScoreWeight(id: any) {
			this.scoreWeightList = []
			const res = await service({
				path: "/api/services/app/ScoreWeight/GetUsualScoreWeight",
				query: { outlineId: id },
				method: "get"
			})
			res.result = res.result.map(item => {
				return (item = {
					label: item.name,
					value: item.id,
					power: item.power
				})
			})
			this.scoreWeightList = res.result
			if (res.result.length) {
				this.swFlag = true
			} else {
				this.swFlag = false
			}
			return res
		},
		// get /api/services/app/ScoreWeight/GetScoreWeightTimes 返回作业权重次数列表
		async getScoreWeightTimes(form: any) {
			const res = await service({
				path: "/api/services/app/ScoreWeight/GetScoreWeightTimes",
				query: form,
				method: "get"
			})
			this.timesList = res.result
			return res
		},
		// get /api/services/app/Classes/GetAllClasses 获取所有班级
		async getAllClasses() {
			const res = await service({
				path: "/api/services/app/Classes/GetAllClasses",
				method: "get"
			})
			this.classList = res.result
			return res
		},
		// get /api/services/app/Classes/GetAllClassSelect 获取所有班级下拉框
		async getAllClassSelect() {
			const res = await service({
				path: "/api/services/app/Classes/GetAllClassSelect",
				method: "get"
			})
			this.majorClassList = res.result
			return res
		},
		//get /api/services/app/Classes/GetAllCourseClassSelect 根据课程获取班级下拉框
		async getAllCourseClassSelect(id: any) {
			this.courseClassList = []
			const res = await service({
				path: "/api/services/app/Classes/GetAllCourseClassSelect",
				query: { courseId: id },
				method: "get"
			})
			this.courseClassList = res.result
			return res
		},
		// get /api/services/app/Homework/GetAllHomework 获取所有作业
		async getAllHomework(form: any) {
			const res = await service({
				path: "/api/services/app/Homework/GetAllHomework",
				query: form,
				method: "get"
			})
			this.allHomework = res.result
		},
		// 课程id>获取大纲ID>获取权重
		taskCorrect(id: any) {
			this.getCourse(id).then((res1: any) => {
				this.getAllScoreWeight(res1.result.outlineId).then((res2: any) => {
					this.scoreWeightList = res2.result
					return res2
				})
			})
		}
	}
})
