import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherFormCenterTotalMark = defineStore("teacherFormCenterTotalMark", {
	state: () => {
		return {
			tmList: [],
			tmDicsList: []
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/Outline/GetAllTable 获取总评表
		async getAllTable(form: Object) {
			let res = await service({
				path: "/api/services/app/Outline/GetAllTable",
				method: "get",
				query: form
			})
			let data = res.result
			this.tmList = data.list
			this.tmDicsList = data.dicsList
			if (this.tmDicsList.length) {
				this.tmDicsList.forEach(item => {
					item.flag = false
				})
			}
			return res
		},
		// post /api/services/app/Outline/ExportExcelHead 导出表头 导出模板
		async exportExcelHead(id: String) {
			let res = await service({
				path: "/api/services/app/Outline/ExportExcelHead",
				method: "post",
				query: { courseId: id }
			})
			return res
		},
		// post /api/services/app/Outline/ImportScoreExcel 导入所有成绩
		async importScoreExcel(form: Object) {
			let res = await service({
				path: "/api/services/app/Outline/ImportScoreExcel",
				method: "post",
				query: form
			})
			return res
		},
		// post /api/services/app/Outline/ExportAllTable 导出总表 打印
		async exportAllTable(form: Object) {
			let res = await service({
				path: "/api/services/app/Outline/ExportAllTable",
				method: "post",
				query: form
			})
			return res
		}
	}
})
