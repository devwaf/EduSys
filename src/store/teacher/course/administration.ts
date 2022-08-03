import { defineStore } from "pinia"
import { service } from "@/api/service"
import { ElMessage, ElMessageBox } from 'element-plus'
export const usePageAdministration = defineStore("administration", {
	state: () => {
		return {
			administrationlist: [], //课程大纲
			curriculumList: [], //课设
			id:''
		}
	},
	actions: {
	// 获取详情
	getId(id: any) {
		this.id = id
		console.log(id, '2436');

	},
	
		// 获取所有课程
		async GetAllCourse() {
			const res = await service({
				path: "/api/services/app/Course/GetAllCourse"
			})
			this.administrationlist = []
			this.administrationlist = res.result
		},
		// 获取所有课设
		async GetAllDesgin() {
			const res = await service({
				path: "/api/services/app/Course/GetAllDesgin"
			})
			this.curriculumList = []
			this.curriculumList = res.result
		},
		//    删除课设
		async DeleteCourse(id: String) {
			
		ElMessageBox.confirm(
					'是否删除?',
	
					{
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				)
					.then(async () => {
						await service({
							path: "/api/services/app/Course/DeleteCourse",
							query: { id: id },
							method: "delete"
						})
						ElMessage({
							type: 'success',
							message: '删除成功',
						})
						this.GetAllCourse()
						this.GetAllDesgin()
					}).catch(() => {
						ElMessage({
							type: 'info',
							message: '取消删除',
						})
					})
		}
	}
})
