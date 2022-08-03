import { defineStore } from "pinia"
import { service } from "../../api/service"
import { usePageOutline } from '../../store/teacher/outline/outline'
import { ElMessage, ElMessageBox } from 'element-plus'
export const usePageRequirement = defineStore("requirement", {
	state: () => {
		return {
			graduationList: [], //添加毕业要求
			isInut: false,
			title: "",
			requirementList: []
		}
	},
	actions: {
		// 获取全部毕业要求
		async GetAllGraduationRequirement() {
			const res = await service({ path: "/api/services/app/GraduationRequirement/GetAllGraduationRequirement" })
			this.requirementList = res.result
			console.log(this.requirementList, 9999999)
		},
		// 添加毕业要求
		async AddGraduationRequirement() {
			// this.isInut = true
			// console.log(this.title, "是否有值")
			console.log(this.requirementList.length, '888888888888888');
			let num = "毕业要求"
			let title = `${num}${this.requirementList.length}`
			console.log(title);

			const res = await service({
				path: "/api/services/app/GraduationRequirement/AddGraduationRequirement",
				method: "post",
				data: {
					name: title,
					require: ""
				}
			})

			if (res.success) {
				this.GetAllGraduationRequirement()
				let _usePageOutline = usePageOutline()
				_usePageOutline.GetAllGraduationRequirement()
			}

			// this.GetAllGraduationRequirement()
		},
		// 修改
		async UpdateGraduationRequirement(val: any) {
			const res = await service({
				path: "/api/services/app/GraduationRequirement/UpdateGraduationRequirement",
				method: "put",
				data: val
			})
			if (res.success) {
				this.GetAllGraduationRequirement()
				let _usePageOutline = usePageOutline()
				_usePageOutline.GetAllGraduationRequirement()
			}
		},
		// 删除毕业要求
		async DeleteGraduationRequirement(id: string) {
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
						path: "/api/services/app/GraduationRequirement/DeleteGraduationRequirement",
						method: "delete",
						query: { id: id }
					})

					if (res.result.result) {

						this.GetAllGraduationRequirement()
						let _usePageOutline = usePageOutline()
						_usePageOutline.GetAllGraduationRequirement()
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
			// else{

			// }
		},


		// 添加毕业指标
		AddTarget(id: string) {
			this.requirementList.forEach(async (item) => {
				if (item.id == id) {
					console.log(item);
					const res = await service({
						path: "/api/services/app/Target/AddTarget",
						method: "post",
						data: {
							graduationRequireId: id,
							name: "",
							content: ""
						}
					})
					item.target.push(
						{
							id: res.result.id,
							graduationRequireId: id,
							name: "",
							content: ""
						}
					)
					if (res.success) {
						this.GetAllGraduationRequirement()
						let _usePageOutline = usePageOutline()
						_usePageOutline.GetAllGraduationRequirement()
					}
				}
			});
			console.log(this.requirementList, '9999999999999999');


		},
		// 修改添加指标
		async UpdateTarget(vay: any, id: string) {
			if (vay.content !== "" && vay.name !== "") {
				const res = await service({
					path: "/api/services/app/Target/UpdateTarget",
					method: "put",
					data: {
						id: vay.id,
						graduationRequireId: id,
						name: vay.name,
						content: vay.content
					}
				})
				if (res.success) {
					this.GetAllGraduationRequirement()
					let _usePageOutline = usePageOutline()
					_usePageOutline.GetAllGraduationRequirement()
				}
			}

		},
		// 删除
		async DeleteTarget(id: any) {
			const res = await service({
				path: "/api/services/app/Target/DeleteTarget",
				method: "delete",
				query: { id: id }
			})
			if (res.success) {
				this.GetAllGraduationRequirement()
				let _usePageOutline = usePageOutline()
				_usePageOutline.GetAllGraduationRequirement()
			}
		}


	}
})
