import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherHomework = defineStore("teacherHomework", {
	state: () => {
		return {
			stuDetailList: {}, // 学生详情
			homeWorkTitle: [], // 作业名称
			homeWorkFlag: false // 是否有作业
		}
	},
	actions: {
		// post /api/services/app/Homework/AddHomework 老师发布作业
		async addHomework(form: any) {
			const res = await service({
				path: "/api/services/app/Homework/AddHomework",
				data: form,
				method: "post"
			})
			return res
		},
		// put /api/services/app/Homework/UpdateStudentHomeWork 批改作业
		async updateStudentHomeWork(form: any) {
			const res = await service({
				path: "/api/services/app/Homework/UpdateStudentHomeWork",
				data: form,
				method: "put"
			})
			return res
		},
		// get api/services/app/Homework/GetStudentHoemwork 获取学生作业文件信息
		async getStudentHomework(hwId: any) {
			const res = await service({
				path: "/api/services/app/Homework/GetStudentHomework",
				query: { id: hwId },
				method: "get"
			})
			return res
		},
		// get api/services/app/Homework/GetAllStuHomeworkDetail 获取作业对应班级的学生详情
		async getAllStuHomeworkDetail(form: any) {
			const res = await service({
				path: "/api/services/app/Homework/GetAllStuHomeworkDetail",
				query: form,
				method: "get"
			})
			let data = res.result
			console.log(data, "data ")

			this.stuDetailList = data
			if (data.studentHomeworks.length) {
				if (data.studentHomeworks[0].stuHomeworks.length) {
					this.homeWorkFlag = true
					this.homeWorkTitle = data.studentHomeworks[0].stuHomeworks.map(item => {
						return item.homeworkName
					})
				} else {
					this.homeWorkFlag = false
				}
			}
			return res
		},
		// get api/services/app/Homework/GetStudentHomeWorkScore 获取作业成绩
		async getStudentHomeWorkScore(hwId: any) {
			const res = await service({
				path: "/api/services/app/Homework/GetStudentHomeWorkScore",
				query: { id: hwId },
				method: "get"
			})
			return res
		}
	}
})
