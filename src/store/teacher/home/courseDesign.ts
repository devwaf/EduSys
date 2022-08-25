import { defineStore } from "pinia"
import { service } from "../../../api/service"
import { ElMessage } from "element-plus"
export const usePageHomeCourseDesign = defineStore("HomeCourseDesign", {
	state: () => {
		return {
			courseDesignList: [],  //所有课设

			id: '',// 选中的课设
			outline: "", // 课程大纲
			list: [],
			curriculumList: [],//课设下拉框
			semester: "", //开课学期
			outlineId: "", //大纲id
			outlineName: '',//大纲名称

			courseName: '',//学期
			information: [],// 课设信息
			proportion: [],//成绩评审
			achievement: [], //成绩权重
			evaluateTable: [], //课程目标
			examinationTable: [

			],//考试配置
			arr: [],
			tmp: [],
			disabled: true,
			scorRateHeader: [], //考核方式及比例
			examine: true,
			show: '',
			targetList: [], //毕业要求
		}
	},
	actions: {
		//   获取所有课设
		async GetAllDesgin() {
			const res = await service({
				path: "/api/services/app/Course/GetAllDesgin",
			})
			console.log(res, "课程")
			this.courseDesignList = []
			this.courseDesignList = res.result
			this.curriculumList = []
			res.result.forEach(item => {
				this.curriculumList.push({
					label: item.name,
					value: item.id,
				})

			});
			// this.list = res.result
			console.log(this.courseDesignList, "rrrrrrrrrrrrrrr")
		},
		// 获取课设绑定的大纲
		GetOutline(id: any) {
			this.id = id
			this.courseDesignList.forEach(async item => {
				if (item.id == id) {
					console.log(item);

					this.courseName = item.semester
					this.outlineId = item.outlineId
					const res = await service({
						path: "/api/services/app/Outline/GetOutline",
						method: "get",
						query: { id: item.outlineId }
					})
					this.outlineName = res.result.name
					if (this.outlineName !== "") {

						this.disabled = false

					}
					console.log(this.outlineName, '大纲');



				}
			})
		},
		Message() {
			ElMessage({
				message: "请先选择课设",
				type: "warning"
			})
		},


		// 查看
		getExamineHanlder() {
			if (this.outlineId == this.show) {
				console.log(1111111111111);

				return
			}


			console.log(this.examine, 111111);
			this.examine = false;
			this.GetAllGraduationRequirement()
			this.GetCourse();
			this.GetAllScoreAchievement();
			this.GetAllDesignObjective();

			this.show = this.outlineId
			console.log(this.examine, 22222222222);




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
        },
		// 课设信息
		async GetCourse() {
			const res = await service({
				path: "/api/services/app/Course/GetCourse",
				method: "get",
				query: { id: this.id }
			})
			this.information = []
			this.information.push(res.result)
			this.information[0].credit = this.information[0].credit + '学分'
			this.information[0].classDuration = this.information[0].classDuration + '学时'
			// this.information[0].frequency = this.information[0].frequency + '次'
			this.information[0].textDuration = this.information[0].textDuration + '次'
			this.information[0].homeWorkCount = this.information[0].homeWorkCount + '次'
			this.information[0].questionCount = this.information[0].questionCount + '次'
			// this.information[0].questions = this.information[0].questions + '次'
			console.log(this.information, '课设信息');


		},



		// 成绩评审
		async GetAllScoreAchievement() {
			const res = await service({
				path: "/api/services/app/ScoreAchievement/GetAllScoreAchievement",
				query: { outlineId: this.outlineId }
			})
			console.log(res)
			this.proportion=[]
			this.proportion = res.result
			console.log(this.proportion, "成绩评审");


		},




		// 获取设目标
		async GetAllDesignObjective() {
			this.evaluateTable = []
			const res = await service({
				path: "/api/services/app/DesignObjective/GetAllDesignObjective",
				query: { outlineId: this.outlineId }
			})


			this.evaluateTable = res.result
			this.arr = []
			let num = 0
			res.result.forEach(item => {
				item.scoreRate.forEach(element => {
					this.arr.push({
						power: 0,
						name: element.name
					})
				});
			})
			this.evaluateTable.forEach(item => {
				item.scoreRate.forEach(element => {
					// console.log(element, 1232434);
					this.arr.forEach(e => {
						num = 0
						if (element.name == e.name) {
							element.achieveTarget.forEach(y => {
								num += parseInt(y.score)
							});
							element.power = num
						}
						// console.log(e, 69999999);
					});
				});
			})

			this.getscorRateHeader()
			// console.log(this.evaluateTable, "99999999999999")
		},

		// 考核方式及比例
		getscorRateHeader() {
			this.tmp = []
			this.evaluateTable.map((item, index) => {
				// console.log(item?.scoreRate, "llllll")

				if (item?.scoreRate) {
					item.scoreRate.map((i, j) => {
						if (!this.tmp?.includes(i.name)) {
							this.tmp.push(i.name)
						}
					})
				}
			})
			this.scorRateHeader = this.tmp
			// console.log(this.scorRateHeader, 99999911111)
		},
		// 考试配置
		async GetAllTestQuestion() {
			const res = await service({
				path: "/api/services/app/TestQuestion/GetAllTestQuestion",
				query: { outlineId: this.outlineId }
			})
			this.examinationTable=[]
			this.examinationTable = res.result.testQuestions

			console.log(this.examinationTable, "11222445")
		}
	}
})
