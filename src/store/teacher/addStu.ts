import { defineStore } from "pinia"
import { service } from "../../api/service"

export const useAddStu = defineStore("addStu", {
	state: () => {
		return {}
	},
	actions: {
		// post /api/services/app/Course/ImportStudentFromExcel 从excel导入学生信息
		async importStudentFromExcel(path: any) {
			const res = await service({
				path: "/api/services/app/Course/ImportStudentFromExcel",
				query: { filePath: path },
				method: "post"
			})
			return res
		},
		// get /api/services/app/Course/GetImportStudentTemplate 下载导入学生信息
		async getImportStudentTemplate() {
			const res = await service({
				path: "/api/services/app/Course/GetImportStudentTemplate",
				method: "get"
			})
			return res
		}
	}
})
