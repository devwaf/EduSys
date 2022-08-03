import { defineStore } from "pinia"
import { service } from "@/api/service"

import { ElMessage, ElMessageBox } from 'element-plus'
export const usePageCard = defineStore("card", {
	state: () => {
		return {
			classList: [], //所有班级
			list: [],
			selectedList: [], //课设选中班级
			curriculumSelectedList: [],
			classId: [],
			id: '',
			name: ''

		}
	},
	actions: {
		getId(id: string) {
			this.id = id

		},
		getyyy(val: any) {
			this.name = val
			console.log(this.name, '9999999999999999999');
		},
		// 获取所有班级信息
		async GetAllClasses() {
			const res = await service({ path: "/api/services/app/Classes/GetAllClasses", method: "get" })
			this.classList = []

			res.result.forEach(item => {
				this.classList.push({
					id: item.id,
					checked: false,
					schoolYear: item.schoolYear,
					major: item.major,
					name: item.name
				})

			})

		},
		// 添加班级
		async AddClasses() {
			if (this.classList.length == 5) {
				ElMessage({
					message: "班级最多为5个",
					type: "warning"
				})

			} else {
				const res = await service({
					path: "/api/services/app/Classes/AddClasses",
					method: "post",
					data: {
						schoolYear: "",
						major: "",
						name: ""
					}
				})
				this.classList.push({
					id: res.result.id,
					checked: false,
					schoolYear: "",
					major: "",
					name: ""
				})
			}

		},

		// 修改请求
		async UpdateClasses(val: any) {

			const res = await service({
				path: "/api/services/app/Classes/UpdateClasses",
				method: "put",
				data: {
					id: val.id,
					schoolYear: val.schoolYear,
					major: val.major,
					name: val.name
				}
			})
			if (res.success) {
				this.GetAllClasses()
			}
		},

		// 勾选的班级
		getAllSelected(val: any) {
			this.selectedList = []
			this.curriculumSelectedList = []
			this.classList.forEach(item => {

				if (item.checked) {
					if (val == "课设") {

						this.selectedList.push({
							id: item.id,
							schoolYear: item.schoolYear,
							major: item.major,
							name: item.name
						})
					} else {
					
						this.curriculumSelectedList.push({
							id: item.id,
							schoolYear: item.schoolYear,
							major: item.major,
							name: item.name
						})
					}








					// this.classId.push(item.id)
				}


			})
			// console.log(this.curriculumSelectedList, '9999999999999922222');
			// console.log(this.selectedList, '77777777777777');

		},



		// 删除
		async DeleteClasses(id: any) {
			ElMessageBox.confirm(
				'是否删除?',

				{
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
				.then(async () => {
					const res = await service({
						path: "/api/services/app/Classes/DeleteClasses",
						method: "delete",
						query: { id: id }
					})
					if (res.result.result) {
						// this.GetAllClasses()
						ElMessage({
							type: 'success',
							message: res.result.message,
						})
						this.GetAllClasses()
					} else {
						ElMessage({
							type: 'warning',
							message: res.result.message,
						})

					}

				}).catch(() => {
					ElMessage({
						type: 'info',
						message: '取消删除',
					})
				})

		},


		//删除选中的班级
		getDelClassHandler(val: any, n: any) {
			if (n == "课设") {
				const list = this.selectedList.filter(item => item.id !== val)
				this.classList.forEach(item => {
					if (item.id == val) {
						item.checked = false
					}
				})
				this.selectedList = list
			}
			if (n == "课程") {
				const list = this.curriculumSelectedList.filter(item => item.id !== val)
				this.classList.forEach(item => {
					if (item.id == val) {
						item.checked = false
					}
				})
				this.curriculumSelectedList = list
			}


		}
	}
})
