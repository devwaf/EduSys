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
		}
	}
})
