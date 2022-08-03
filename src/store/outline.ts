import { WindPower } from "@element-plus/icons-vue"
import { useRefHistory } from "@vueuse/core"
import { defineStore } from "pinia"
import { service } from "../api/service"
import { ElMessage } from "element-plus"

export const usePageOutline1 = defineStore("outline", {
	state: () => {
		return {
			// outlinedata: {
			// 	name: "",
			// 	teacherId: localStorage.getItem("userId"),
			// 	kind: "课程"}, //大纲
			targetList: [], //毕业要求
			value: "",
			courseList: [], //所有课程目标
			outlineId: "",//大纲id
			assessmentList: [], //考核
			contrastList: [], //对照表
			List: [],
			formationTable: [], //成绩权重
			weightDate: [], 	//权重配置
			examination: [], //考试配置			
			tmp: [],
			id: "",
			arr: [],
			disabled: true, //禁用
			scorRateHeader: [], //考核方式及比例
			examinationForm: {
				name: "",
				quantity: "",
				score: "100"
			}
		}
	},
	actions: {

		async getAddOutline() {
			if (this.outlinedata.name == "") return
			if (this.outlineId == "") {
				// 新建大纲
				const res = await service({
					path: "/api/services/app/Outline/AddOutline",
					data: this.outlinedata,
					method: "post"
				})
				this.outlineId = res.result.id
				// console.log(this.outlineId, 7787878)
				// 获取初始权重信息
				this.GetAllScoreWeight(this.outlineId)
			} else {
				
			}
			if (this.outlineId !== "") {
				this.disabled = false
			}
		},
		getId(id: any) {
			this.id = id
			this.outlineId = id
		},
		// 获取大纲
		async GetOutline() {

			this.outlineId = this.id
			if (this.outlineId !== "") {
				this.disabled = false
			}
			if (this.id) {
				const res = await service({
					path: "/api/services/app/Outline/GetOutline",
					query: { id: this.id }
				})
				this.outlinedata.name = res.result.name
			}
		},

		Message(val: any) {
			ElMessage({
				message: val,
				type: "warning"
			})
		},

		// 添加权重
		async AddScoreWeight() {
			const res = await service({
				path: "/api/services/app/ScoreWeight/AddScoreWeight",
				data: { outlineId: this.outlineId },
				method: "post"
			})
			this.formationTable.push({
				id: res.result.id,
				outlineId: this.outlineId,
				name: "",
				power: null,
				times: "0"
			})
			// console.log(this.formationTable, "成绩权重")

			this.GetAllScoreWeight(this.outlineId)
		},

		// 修改权重
		async UpdateScoreWeight(list: any) {
			// console.log(this.arr, "是否一致")
			// console.log(list, "事儿额")
			if (this.arr.name == list.name && this.arr.power == list.power && this.arr.times == list.times) {
				// console.log(list, "一致")
				return
			}


			const res = await service({
				path: "/api/services/app/ScoreWeight/UpdateScoreWeight",
				data: {
					outlineId: this.outlineId,
					id: list.id,
					name: list.name,
					power: list.power,
					times: list.times
				},
				method: "put"
			})
			if (res.success) {
				this.GetAllScoreWeight(this.outlineId)
				this.GetAllSwDetail()
			}
			this.arr = list
		},

		// 获取所有权重
		async GetAllScoreWeight(val: any) {
			const data = await service({
				path: "/api/services/app/ScoreWeight/GetAllScoreWeight",
				query: { outlineId: val }
			})
			this.formationTable = []
			this.formationTable = data.result

			this.assessmentList = []
			this.formationTable.forEach(item => {
				this.assessmentList.push({
					name: item.name,
					power: ""
				})
			})
		},

		// 获取所有权重配置
		async GetAllSwDetail() {
			const res = await service({
				path: "/api/services/app/ScoreWeight/GetAllSwDetail",
				query: { outlineId: this.outlineId },
				method: "get"
			})
			this.weightDate = res.result
			//
		},

		// 更改
		async UpdateSwDetail(val: any) {
			const res = await service({
				path: "/api/services/app/ScoreWeight/UpdateSwDetail",
				data: { id: val.swDetailId, courseObjectiveId: val.courseObjectiveId },
				method: "put"
			})
		},

		// 删除权重
		async DeleteScoreWeight(id: string) {
			const res = await service({
				path: "/api/services/app/ScoreWeight/DeleteScoreWeight",
				query: { id: id },
				method: "Delete"
			})
			this.GetAllScoreWeight(this.outlineId)
			this.GetAllSwDetail()
		},

		// 添加对照表
		async getAddContrast() {
			this.GetAllScoreWeight(this.outlineId)
			const res = await service({
				path: "/api/services/app/CourseObjective/AddCourseObjective",
				query: {
					outlineId: this.outlineId
				},
				method: "post"
			})
			this.contrastList.push({
				id: res.result.id,
				content: "",
				name: "",
				graduationRequirementId: "",
				degreeSupport: ""
			})

			// console.log(this.contrastList, "32435")
		},
		// 考核方式及比例
		// getscorRateHeader() {
		// 	this.contrastList.map((item, index) => {
		// 		console.log(item?.scoreRate, "llllll")

		// 		if (item?.scoreRate) {
		// 			item.scoreRate.map((i, j) => {
		// 				if (!this.tmp?.includes(i.name)) {
		// 					this.tmp.push(i.name)
		// 				}
		// 			})
		// 		}
		// 	})
		// 	this.scorRateHeader = this.tmp
		// 	console.log(this.scorRateHeader, 99999911111)
		// },

		// 修改课程目标
		async UpdateCourseObjective(val: any) {
			const res = await service({
				path: "/api/services/app/CourseObjective/UpdateCourseObjective",
				data: val,
				method: "put"
			})

			this.GetAllCourseObjective(this.outlineId)
		},

		// 获取所有课程目标
		async GetAllCourseObjective(val: any) {
			// console.log(this.contrastList, "获取所有课程目标121")

			const res = await service({
				path: "/api/services/app/CourseObjective/GetAllCourseObjective",
				query: { outlineId: val }
			})
			console.log(res)
			this.courseList = []
			res.result.forEach(item => {
				this.courseList.push({
					label: item.name,
					value: item.id
				})
			})
			this.contrastList = res.result
			// this.getscorRateHeader()
			// console.log(this.contrastList, "获取所有课程目标")
		},

		// 删除课程目标
		async DeleteCourseObjective(id: string) {
			const res = await service({
				path: "/api/services/app/CourseObjective/DeleteCourseObjective",
				query: { id: id },
				method: "delete"
			})
			this.GetAllCourseObjective(this.outlineId)
		},

		// 添加题
		async getTopic() {
			const res = await service({
				path: "/api/services/app/TestQuestion/AddTestQuestion",
				method: "post",
				query: { outlineId: this.outlineId }
			})

			this.examination.push({
				id: res.result.id,
				titleNum: "",
				outlineId: this.outlineId,
				type: "",
				score: 0,
				question: []
			})

			this.examinationForm.name = this.outlinedata.name
			this.examinationForm.quantity = this.examination.length
		},

		// 		修改大题
		async UpdateTestQuestion(val: any) {
			const res = await service({
				path: "/api/services/app/TestQuestion/UpdateTestQuestion",
				method: "put",
				data: {
					id: val.id,
					titleNum: val.titleNum,
					outlineId: this.outlineId,
					type: val.type,
					score: val.score
				}
			})
			// console.log(res, "ppppppppppppp")
			// console.log(this.examination, "wwwwwwwwwwwww")
		},

		// 添加小题
		async getSubtopic(id: any) {
			const res = await service({
				path: "/api/services/app/Question/AddQuestion",
				query: {
					outline: this.outlineId,
					TestQuestionId: id
				},
				method: "post"
			})
			this.examination.forEach(item => {
				if (item.id == id) {
					item.question.push({
						id: res.result.id,
						testQuestionId: id,
						titleNum: 0,
						score: 0,
						courseObjectiveId: ""
					})
				}
			})
		},
		// 修改小题
		async UpdateQuestion(val: any) {
			const res = await service({
				path: "/api/services/app/Question/UpdateQuestion",
				data: val,
				method: "put"
			})
		},

		// 获取所有题
		async GetAllTestQuestion(val: any) {
			const res = await service({
				path: "/api/services/app/TestQuestion/GetAllTestQuestion",
				method: "get",
				query: { outlineId: val }
			})

			this.examination = res.result.testQuestions

		
			this.examinationForm.name = this.outlinedata.name
			this.examinationForm.quantity = this.examination.length
		},

		// 删除小题
		async DeleteQuestion(id: string, row: string) {
			const res = await service({
				path: "/api/services/app/Question/DeleteQuestion",
				method: "delete",
				query: { id: id }
			})
			this.GetAllTestQuestion(this.outlineId)
			this.examination.forEach((item) => {
				if (item.id == row) {
					// console.log(item.question.length, 9999999);
					if (item.question.length == 1) {
						this.DeleteTestQuestion(row)
					}
				}
			});



		},



		// 删除大题
		async DeleteTestQuestion(id: string) {
			const res = await service({
				path: "/api/services/app/TestQuestion/DeleteTestQuestion",
				method: "delete",
				query: { id: id }
			})

			this.GetAllTestQuestion(this.outlineId)
		},

		// 获取全部毕业要求
		async GetAllGraduationRequirement() {
			const res = await service({ path: "/api/services/app/GraduationRequirement/GetAllGraduationRequirement" })
			this.targetList = []
			res.result.forEach(item => {
				this.targetList.push({
					label: item.name,
					value: item.id
				})
			})

			// console.log(this.targetList, 9999999)
		},
		// 大纲是否完整
		async CheckOutline() {
			const res = await service({
				path: "/api/services/app/Outline/CheckOutline",
				method: "post",
				query: { outlineId: this.outlineId }
			})
			ElMessage({
				message: res.result.message,
				type: "success"
			})
			// console.log(res, "大纲是否完整")
		},

		// 离开当前页面
		leavePage(router: any) {
			// console.log(router, "路由变化了");
			if (router !== "/outline/addoutline") {
				this.outlinedata.name = ''
				this.outlineId = ""
				this.formationTable = []
				this.contrastList = []
				this.targetList = []
				this.weightDate = []
				this.courseList = []
				this.examinationForm = {
					name: '',
					quantity: "",
					score: 100
				}
				this.examination = []
			}
			if (this.outlineId == "") {
				this.disabled = true

			}
		},

		getModel(value: string) {
			this.value = value
		}
	}
})
