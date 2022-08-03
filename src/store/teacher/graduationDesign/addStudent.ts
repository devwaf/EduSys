import { defineStore } from "pinia"
import { service } from "../../../api/service"

export const usePageAddStudent = defineStore("addStudent", {
	state: () => {
		return {
			classList: [], // 班级
			studentList: [] //学生列表
		}
	},
	actions: {
		// get /api/services/app/Classes/GetAllClassSelect 获取所有班级下拉框
		async GetAllClasses() {
			const res = await service({
				path: "/api/services/app/Classes/GetAllClassSelect",
				method: "get"
			})
			this.classList = res.result
			return res
		},
		// get /api/services/app/Student/GetGraDesStudent 获取已添加学生
		// (记得下面的api获取的数据和这个api获取的数据去重去重,后端不改,这个不用去重，因为只是首次进入获取)
		async getGraDesStudent() {
			let res = await service({
				path: "/api/services/app/Student/GetGraDesStudent",
				method: "get",
				query: { teacherId: localStorage.getItem("userId") }
			})
			this.studentList = res.result
			return res
		},
		// get /api/services/app/Student/GetAllStudent 获取学生列表
		async getAllStudent(form: any) {
			let res = await service({
				path: "/api/services/app/Student/GetAllStudent",
				method: "get",
				query: form
			})
			this.studentList = res.result
			return res
		},
		// post /api/services/app/Student/TeacherChooseStuGra 老师选择学生毕业设计
		async teacherChooseStuGra(form: any) {
			let res = await service({
				path: "/api/services/app/Student/TeacherChooseStuGra",
				method: "post",
				data: form
			})
			return res
		}
	}
})
