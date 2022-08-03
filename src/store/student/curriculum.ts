import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useStuCurriculum = defineStore("stuCurriculum", {
	state: () => {
		return {
			stuAllHomework: [],
			rate: "",
			stuAllHomeworkHistory: [],
			historyActive: false
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/Homework/GetStudentAllHomework 学生获取指定课程作业
		async getStudentAllHomework(id: any) {
			const res = await service({
				path: "/api/services/app/Homework/GetStudentAllHomework",
				query: { studentId: localStorage.getItem("userId"), courseId: id },
				method: "get"
			})
			this.getStudentAllHomeworkHistory({
				studentId: localStorage.getItem("userId"),
				courseId: id,
				state: false
			})
			this.stuAllHomework = res.result.stuAllHomework
			this.rate = res.result.rate
			return res
		},
		// post /api/services/app/Homework/SubmitStuHomework 学生上传作业
		async submitStuHomework(form: any) {
			const res = await service({
				path: "/api/services/app/Homework/SubmitStuHomework",
				data: form,
				method: "post"
			})
			return res
		},
		// post /api/services/app/FileManagement/ForceDeleteFile 删除上传文件(点击取消触发)
		async forceDeleteFiles(id: any) {
			const res = await service({
				path: "/api/services/app/FileManagement/ForceDeleteFile",
				query: { fileId: id },
				method: "post"
			})
			return res
		},
		// get /api/services/app/Homework/GetStudentAllHomeworkHistory 作业历史
		async getStudentAllHomeworkHistory(form: any) {
			this.stuAllHomeworkHistory = []
			const res = await service({
				path: "/api/services/app/Homework/GetStudentAllHomeworkHistory",
				query: form,
				method: "get"
			})
			this.stuAllHomeworkHistory = res.result
			return res
		}
	}
})
