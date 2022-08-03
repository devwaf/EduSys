import { defineStore } from "pinia"
import { service } from "../../api/service"
import { ElMessage, ElMessageBox } from 'element-plus'
export const usePageOutlinemanagement = defineStore("management", {
	state: () => {
		return {
			Outlinemanagementlist: [], //课程大纲
			courseDesignList: [] //课设大纲
		}
	},
	actions: {
		// 获取课程大纲
		async GetAllCourseOutline() {
			const res = await service({
				path: "/api/services/app/Outline/GetAllCourseOutline",
				method: "get",
				query: { teacherId: localStorage.getItem("userId") }
			})
			console.log(res, "9999999999")
			this.Outlinemanagementlist = []
			this.Outlinemanagementlist = res.result
		},
		// 获取课设大纲
		async GetAllDesignOutline() {
			const res = await service({
				path: "/api/services/app/Outline/GetAllDesignOutline",
				method: "get",
				query: { teacherId: localStorage.getItem("userId") }
			})
			this.courseDesignList = res.result
		},
		//    删除大纲
		async DeleteCourse(id: String) {
			ElMessageBox.confirm(
				'是否删除?',
				{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).then(async () => {
					const res = await service({
						path: "/api/services/app/Outline/DeleteOutline",
						query: { id: id },
						method: "delete"
					})
					if (res.result.result) {
						this.GetAllCourseOutline()
						this.GetAllDesignOutline()
						ElMessage({
							type: 'success',
							message: '删除成功',
						})
					} else {
						ElMessage({
							type: 'warning',
							message: res.result.message
						})
					}
				}).catch(() => {
					ElMessage({
						type: 'info',
						message: '取消删除',
					})
				})
		},
		leavePage(router: any) {
			console.log(router, 999999);
			if (router !== "/course/coursemanagement") {
				// resetForm()
				this.curriculumFormData = {
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
				}
				this.curriculumSelectedList = []

				const card = usePageCard()
				card.curriculumSelectedList = []

			}
		}
	}

})
