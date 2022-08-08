import { defineStore } from "pinia"
import { service } from "@/api/service"
import { usePageCard } from '../course/card'
import { ElMessage } from "element-plus"
export const usePageCoursemanagement = defineStore("coursemanagement", {
	state: () => {
		return {
			outlineSelect: [], //所有课程大纲
			semesterList: [], //开课学期
			curriculumFormData: {
				classIds: [],
				name: "",
				type: "",
				teacherId: localStorage.getItem('userId'),
				outlineId: "",
				outlineName: '',
				semester: "",
				supervisor: '',
				credit: null,
				classDuration: null,
				textDuration: null,
				department: "",
				kind: "课程"
			},
			id: '',
			arrList: null
		}
	},
	actions: {
		// 获取详情
		async getId(id: any) {
			this.id = id
			console.log(id, '2436');
			const res = await service({
				path: "/api/services/app/Course/GetCourse",
				query: { id: this.id },
			});
			this.curriculumFormData = res.result
			if (res.success) {
				let card = usePageCard()
				// card.GetAllClasses()
				card.curriculumSelectedList = []
				console.log(123456788);

				this.curriculumFormData.classIds.forEach(i => {
					card.classList.forEach(item => {
						if (i == item.id) {											
							item.checked = true
							// console.log(item.checked,'yyyyyy');
							card.curriculumSelectedList.push({
								id: item.id,
								schoolYear: item.schoolYear,
								major: item.major,
								name: item.name
							})
						}
					})
				})
			}
		},
		//    获取所有课程大纲的下拉框
		async GetAllCourseOutlineSelect() {
			const res = await service({
				path: "/api/services/app/Outline/GetAllCourseOutlineSelect",
				query: {
					teacherId: localStorage.getItem("userId"),
					method: "get"
				}
			})
			this.outlineSelect = res.result
		},
		//学期
		async GetAllTerm() {
			const res = await service({
				path: "/api/services/app/Course/GetTerm",
				query: {
					teacherId: localStorage.getItem("userId"),

				}
			})
			this.semesterList = res.result
		},
		// 获取选择的班级
		getClass() {
			const card = usePageCard()
			console.log(card.curriculumSelectedList, '9999999999');
			this.curriculumFormData.classIds = []
			card.curriculumSelectedList.forEach(async (item) => {
				this.curriculumFormData.classIds.push(item.id)
			})
			console.log(this.curriculumFormData.classIds, '9999999999');
		},

		getOutlineName(id: any) {
			this.outlineSelect.forEach(item => {
				if (item.value == id) {
					this.curriculumFormData.outlineName = item.label
				}
			})
		},
		async AddCourse() {
			if (this.id) {
				console.log('修改');

				const res = await service({
					path: "/api/services/app/Course/UpdateCourse",
					data: this.curriculumFormData,
					method: "put",
				});
				if (res.success) {
					ElMessage({
						message: res.result.message,
						type: "warning"
					})
				}

			} else {
				console.log(this.id, '添加');

				const res = await service({
					path: "/api/services/app/Course/AddCourse",
					data: this.curriculumFormData,
					method: "post",
				});
				if (res.success) {
					ElMessage({
						message: res.result.message,
						type: "warning"
					})
				}
			}

		},
		leavePage(router: any) {
			console.log(router, 999999);
			if (router !== "/course/coursemanagement") {
				// this.curriculumFormData = {
				// 	classIds: [],
				// 	name: "",
				// 	type: "",
				// 	teacherId: localStorage.getItem('userId'),
				// 	outlineId: "",
				// 	outlineName: '',
				// 	semester: "",
				// 	supervisor: '',
				// 	credit: null,
				// 	classDuration: null,
				// 	textDuration: null,
				// 	department: "",
				// 	kind: "课程"
				// }
				this.curriculumSelectedList = []
				this.id = ''
				const card = usePageCard()
				card.curriculumSelectedList = []

			}
		}
	}
})
