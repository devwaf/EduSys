import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherFormCenterTestPaper = defineStore("teacherFormCenterTestPaper", {
	state: () => {
		return {}
	},
	getters: {},
	actions: {
		// post /api/services/app/Outline/ExaminationReview 试卷审核表
		async examinationReview(form: Object) {
			let res = await service({
				path: "/api/services/app/Outline/ExaminationReview",
				method: "post",
				data: form
			})
			return res
		},
		// get /api/services/app/Question/GetCoureObjAndQuestionScore 试卷审核表中的课程目标与考试分值
		async getCoureObjAndQuestionScore(id: Object) {
			let res = await service({
				path: "/api/services/app/Question/GetCoureObjAndQuestionScore",
				method: "get",
				query: { courseId: id }
			})
			return res
		}
	}
})
