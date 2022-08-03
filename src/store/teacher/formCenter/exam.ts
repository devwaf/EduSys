import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useTeacherFormCenterExam = defineStore("teacherFormCenterExam", {
	state: () => {
		return {
			teachingTaskShowList: [
				{ sort: 1, claimAndCon: "教案（电子版）", isPass: "是", remark: "" },
				{ sort: 2, claimAndCon: "空白试卷、学生试卷（或答题纸）", isPass: "是", remark: "" },
				{ sort: 3, claimAndCon: "标准答案及评分标准", isPass: "是", remark: "" },
				{ sort: 4, claimAndCon: "平时成绩表（清晰、规范；表头信息完整）", isPass: "是", remark: "" },
				{ sort: 5, claimAndCon: "总评成绩表（签字完整，不及格红笔圈出）", isPass: "是", remark: "" },
				{ sort: 6, claimAndCon: "学生试卷（按学生顺序装订、评阅规范）", isPass: "是", remark: "" },
				{
					sort: 7,
					claimAndCon: "课程目标达成分析表（信息完整，达成评价合理且与大纲相符，分析具体、有针对性）",
					isPass: "是",
					remark: ""
				},
				{
					sort: 8,
					claimAndCon: "湖北工业大学本科课程考试试卷审核表",
					isPass: "是",
					remark: ""
				},
				{
					sort: 9,
					claimAndCon: "教学大纲",
					isPass: "是",
					remark: ""
				},
				{
					sort: 10,
					claimAndCon: "考试成绩或其他考核环节分目标达成统计表",
					isPass: "是",
					remark: ""
				},
				{ sort: 11, claimAndCon: "作业本（5本，体现优、良、差等次）", isPass: "是", remark: "教学办存留" },
				{
					sort: 12,
					claimAndCon:
						"其他与成绩有关资料（如大作业、课堂作业、课程阅读汇总表、每科三问表、调研报告或设计等）",
					isPass: "是",
					remark: ""
				},
				{ sort: 13, claimAndCon: "其他，如学生课程目标达成自我评价表等", isPass: "是", remark: "" },
				{ sort: 14, claimAndCon: "试卷袋、成绩表、大纲、达成评价表信息一致性", isPass: "是", remark: "" },
				{ sort: 15, claimAndCon: "平时成绩分布合理、有区分度", isPass: "是", remark: "" },
				{ sort: 16, claimAndCon: "装订规范（顺序正确、装订整齐、符合要求）", isPass: "是", remark: "" }
			],
			saveFlag: false, // 是否保存过
			changeFlag: false, //是否更改过
			oldTeaList: [
				{ sort: 1, claimAndCon: "教案（电子版）", isPass: "是", remark: "" },
				{ sort: 2, claimAndCon: "空白试卷、学生试卷（或答题纸）", isPass: "是", remark: "" },
				{ sort: 3, claimAndCon: "标准答案及评分标准", isPass: "是", remark: "" },
				{ sort: 4, claimAndCon: "平时成绩表（清晰、规范；表头信息完整）", isPass: "是", remark: "" },
				{ sort: 5, claimAndCon: "总评成绩表（签字完整，不及格红笔圈出）", isPass: "是", remark: "" },
				{ sort: 6, claimAndCon: "学生试卷（按学生顺序装订、评阅规范）", isPass: "是", remark: "" },
				{
					sort: 7,
					claimAndCon: "课程目标达成分析表（信息完整，达成评价合理且与大纲相符，分析具体、有针对性）",
					isPass: "是",
					remark: ""
				},
				{
					sort: 8,
					claimAndCon: "湖北工业大学本科课程考试试卷审核表",
					isPass: "是",
					remark: ""
				},
				{
					sort: 9,
					claimAndCon: "教学大纲",
					isPass: "是",
					remark: ""
				},
				{
					sort: 10,
					claimAndCon: "考试成绩或其他考核环节分目标达成统计表",
					isPass: "是",
					remark: ""
				},
				{ sort: 11, claimAndCon: "作业本（5本，体现优、良、差等次）", isPass: "是", remark: "教学办存留" },
				{
					sort: 12,
					claimAndCon:
						"其他与成绩有关资料（如大作业、课堂作业、课程阅读汇总表、每科三问表、调研报告或设计等）",
					isPass: "是",
					remark: ""
				},
				{ sort: 13, claimAndCon: "其他，如学生课程目标达成自我评价表等", isPass: "是", remark: "" },
				{ sort: 14, claimAndCon: "试卷袋、成绩表、大纲、达成评价表信息一致性", isPass: "是", remark: "" },
				{ sort: 15, claimAndCon: "平时成绩分布合理、有区分度", isPass: "是", remark: "" },
				{ sort: 16, claimAndCon: "装订规范（顺序正确、装订整齐、符合要求）", isPass: "是", remark: "" }
			] //教学表旧数据
		}
	},
	getters: {},
	actions: {
		// get /api/services/app/TeachingTask/GetTeachingTaskShow 获取教学任务表的内容
		async getTeacherTask(form: Object) {
			let res = await service({
				path: "/api/services/app/TeachingTask/GetTeachingTaskShow",
				method: "get",
				query: form
			})
			if (res.result) {
				let obj = []
				for (let key in res.result) {
					if (res.result[key]) {
						obj.push(res.result[key])
					}
				}
				this.saveFlag = true
				this.teachingTaskShowList.forEach((item, index) => {
					item.isPass = obj[index].isPass
					item.remark = obj[index].remark
				})
				this.oldTeaList.forEach((item, index) => {
					item.isPass = obj[index].isPass
					item.remark = obj[index].remark
				})
			} else {
				this.saveFlag = false
				this.teachingTaskShowList.forEach(item => {
					item.isPass = "是"
					item.remark = ""
				})
				this.oldTeaList.forEach(item => {
					item.isPass = "是"
					item.remark = ""
				})
			}
			return res
		},
		// post /api/services/app/TeachingTask/AddOrUpdateTeachingTask 添加或修改教学任务
		async updateTeacherTask(form: Object) {
			let res = await service({
				path: "/api/services/app/TeachingTask/AddOrUpdateTeachingTask",
				method: "post",
				data: form
			})
			if (res.success) {
				this.saveFlag = true
			}
			return res
		},
		//post /api/services/app/TeachingTask/ExportTeaTask 导出老师任务
		async exportTeaTask(form: Object) {
			let res = await service({
				path: "/api/services/app/TeachingTask/ExportTeaTask",
				method: "post",
				query: form
			})
			return res
		}
	}
})
