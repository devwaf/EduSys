import { defineStore } from "pinia"
import { service } from "../../../api/service"
import { ElMessage } from "element-plus"
export const usePageCurriculum = defineStore("HomeCurriculum", {
	state: () => {
		return {
			curriculumList: [], //所有课程下拉框
			outline: "", // 课程大纲
			list: [],
			semester: "", //开课学期
			outlineId: "", //大纲id
			outlineName: "", //大纲名称
			courseName: "", //开课学期
			achievement: [], //成绩权重
			evaluateTable: [], //课程目标
			examinationTable: [], //考试配置
			weightDate: [], //成绩权重配置
			tableData: [], //课程信息
			id: "",
			curriculum: '',
			courseList: [], //课程目标
			examinationForm: {
				name: "",
				quantity: "",
				score: "100"
			},
			disabled: true,
			examine: true,
			show: '',
		}
	},
	actions: {
		//   获取所有课程
		async GetAllCourse() {
			const res = await service({ path: "/api/services/app/Course/GetAllCourse" })
			// console.log(res, "课程")
			this.curriculumList = []
			res.result.forEach(item => {
				this.curriculumList.push({
					label: item.name,
					value: item.id
				})
			})
			this.list = res.result
			// console.log(this.curriculumList, "24658")
		},

		// 获取课程绑定的大纲和学期
		GetOutline(id: any) {
			this.id = id
			this.list.forEach(async item => {
				if (item.id == id) {
					// console.log(item);
					this.courseName = item.semester
					this.examinationForm.name = item.name
					const res = await service({
						path: "/api/services/app/Outline/GetOutline",
						method: "get",
						query: { id: item.outlineId }
					})
					this.outlineName = res.result.name
					if (this.outlineName !== "") {

						this.disabled = false

					}
					this.outlineId = item.outlineId
				}
			})
		},
		Message() {
			ElMessage({
				message: "请先选择课程",
				type: "warning"
			})
		},

		// 查看
		getExamineHanlder() {
// console.log(this.outlineId,'111111111111111111');
// console.log(this.show,'222222222222222');

			if (this.outlineId == this.show) {
				console.log(66666666666666);

				return
			}

			console.log(this.examine, 111111);
			this.examine = false;
			this.GetAllScoreWeight();
			this.GetAllCourseObjective();
			this.GetAllTestQuestion();
			this.GetAllSwDetail();
			this.GetCourse();
			this.show = this.outlineId

			console.log(this.examine, 22222222222);




		},

		// },
		// 课程信息
		async GetCourse() {
			const res = await service({
				path: "/api/services/app/Course/GetCourse",
				query: { id: this.id }
			})
			// console.log(res, "23256")
			this.tableData = []

			this.tableData.push(res.result)
			this.tableData[0].credit = this.tableData[0].credit + '学分'
			this.tableData[0].classDuration = this.tableData[0].classDuration + '周'
			this.tableData[0].homeWorkCount = this.tableData[0].homeWorkCount + '次'
			this.tableData[0].questionCount = this.tableData[0].questionCount + '次'
			
			// this.information[0].frequency = this.information[0].frequency + '次'
			this.tableData[0].textDuration = this.tableData[0].textDuration + '次'
			this.tableData.forEach(item => {
				item.outlineId = this.outlineName
			})
		},
		// 成绩权重
		// 原本是GetAllScoreWeight,改为GetUsualScoreWeight，api名字不要改，不然很多地方都要改
		async GetAllScoreWeight() {
			const res = await service({
				path: "/api/services/app/ScoreWeight/GetAllScoreWeight",
				query: { outlineId: this.outlineId }
			})
			console.log(res)
			this.achievement = []
			res.result.forEach(item => {
				this.achievement.push({
					name: item.name,
					power: item.power
				})
			})
		},
		// 获取课程目标
		async GetAllCourseObjective() {
			const res = await service({
				path: "/api/services/app/CourseObjective/GetAllCourseObjective",
				query: { outlineId: this.outlineId }
			})
			res.result.forEach(item => {
				this.courseList.push({
					label: item.name,
					value: item.id
				})
			})
			this.evaluateTable = []
			this.evaluateTable = res.result
			// console.log(this.evaluateTable, "99999999999999")
		},

		// 成绩权重配置
		async GetAllSwDetail() {
			const res = await service({
				path: "/api/services/app/ScoreWeight/GetAllSwDetail",
				query: { outlineId: this.outlineId }
			})
			this.weightDate = []
			this.weightDate = res.result
		},
		// 考试配置
		async GetAllTestQuestion() {
			const res = await service({
				path: "/api/services/app/TestQuestion/GetAllTestQuestion",
				query: { outlineId: this.outlineId }
			})
			this.examinationTable = []
			this.examinationTable = res.result.testQuestions
			// console.log(this.examinationTable, "11222445")
			this.examinationForm.quantity = this.examinationTable.length
			this.examinationTable.forEach(element => {
				this.courseList.forEach(item=> {
					if(element.courseObjectiveId==item.value){
						element.courseObjectiveId=item.label
					}
				});
				
			});
			
		}
	}
})
