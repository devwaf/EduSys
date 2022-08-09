import { defineStore } from "pinia"
import { service } from "../../api/service"
import { usePageOutline } from '../../store/teacher/outline/outline'
import { ElMessage, ElMessageBox } from 'element-plus'
import { threadId } from "worker_threads"
export const usePageRequirement = defineStore("requirement", {
	state: () => {
		return {
			graduationList: [], //添加毕业要求
			addGraduationList: {}

			,
			isInut: false,
			title: "",
			showTitleList: [],
			requirementList: [],
			list: [],
			id: '',
			tabsId: "",
			headline: '',
			number: ''
		}
	},
	actions: {
		// 获取全部毕业要求
		async GetAllGraduationRequirement() {
			this.list = []
			const res = await service({ path: "/api/services/app/GraduationRequirement/GetAllGraduationRequirement" })
			this.requirementList = res.result
			this.showTitleList = []
			this.requirementList.forEach((v, i) => {
				if (this.showTitleList.length < 7) {
					this.showTitleList.push(v);
				}
			});
			this.tabsId = this.requirementList[0].id
			let num = "毕业要求"
			// this.number = this.requirementList.length + 1
			this.title = `${num}${this.requirementList.length + 1}`

			this.graduationList = this.requirementList[0]

			this.addGraduationList = {
				id: "",
				require: '',
				target: [

				]
			}
			console.log(this.requirementList, this.title, 9999999)
		},
		// 添加毕业指标
		AddTarget(val: any) {
			console.log(val, 'pppppp');

			if (this.addGraduationList.require == '') {
				ElMessage({
					type: 'warning',
					message: '先填写毕业要求'
				})
				return
			}
			if (val) {
				let num = this.addGraduationList.name.slice(4)
				console.log(num, '00000');

				this.headline = `${'指标'}${num}${'.'}${this.addGraduationList.target.length
					+ 1}`
				console.log(this.addGraduationList.target, '99999999999999');

			} else {
				this.headline = `${'指标'}${this.requirementList.length + 1}${'.'}${this.addGraduationList.target.length
					+ 1}`
			}

			this.addGraduationList.target.push(
				{
					graduationRequireId: this.addGraduationList.id,
					name: this.headline,
					content: ""
				})
		},

		// 添加毕业要求
		async AddGraduationRequirement(value: any) {
			const res = await service({
				path: "/api/services/app/GraduationRequirement/AddGraduationRequirement",
				method: "post",
				data: {
					name: this.title,
					require: value.require
				}
			})
			if (res.result.result) {
				// this.GetAllGraduationRequirement()
				let _usePageOutline = usePageOutline()
				_usePageOutline.GetAllGraduationRequirement()
			}



		},


		//新增  
		async GetAddRequirement() {

			let list = []
			if (this.addGraduationList.target == []) return
			this.addGraduationList.target.forEach(element => {
				if (element.content == "") return
				list.push(element)
			});
			console.log(list, '99999999999');
			list.forEach(async (item) => {
				item.graduationRequireId = this.id
				const data = await service({
					path: "/api/services/app/Target/AddTarget",
					method: "post",
					data: item
				})
			})


		},
		// 修改
		async UpdateGraduationRequirement(val: any, value: any) {
			console.log(val.require, value.require, '999999');
			if (val.require !== value.require) {
				const res = await service({
					path: "/api/services/app/GraduationRequirement/UpdateGraduationRequirement",
					method: "put",
					data: {
						id: val.id,
						name: val.name,
						require: val.require
					}
				})
				if (res.result.result) {
					// this.GetAllGraduationRequirement()
					let _usePageOutline = usePageOutline()
					_usePageOutline.GetAllGraduationRequirement()
				}
			}


			console.log(val.target, 1111);
			console.log(value.target, 2222);




			if (value.target !== []) {
				let resList = val.target.filter(item => !value.target.some(ele => ele.content == item.content))
				console.log(resList, '99999999');


				resList.forEach(async (element) => {
					if (element.id !== undefined) {
						const res = await service({
							path: "/api/services/app/Target/UpdateTarget",
							method: "put",
							data: {
								id: element.id,
								graduationRequireId: val.id,
								name: element.name,
								content: element.content
							}

						})
					} if (element.graduationRequireId !== undefined && element.content !== "") {
						const data = await service({
							path: "/api/services/app/Target/AddTarget",
							method: "post",
							data: element
						})
					}

				})

			}

		},

		// 删除
		DeleteGraduationRequirement(val: any, value: any) {
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
						query: { id: val.id }
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


























		// 修改添加指标
		// async UpdateTarget(vay: any, id: string) {
		// 	if (vay.content !== "" && vay.name !== "") {
		// 		const res = await service({
		// 			path: "/api/services/app/Target/UpdateTarget",
		// 			method: "put",
		// 			data: {
		// 				id: vay.id,
		// 				graduationRequireId: id,
		// 				name: vay.name,
		// 				content: vay.content
		// 			}
		// 		})
		// 		if (res.success) {
		// 			this.GetAllGraduationRequirement()
		// 			let _usePageOutline = usePageOutline()
		// 			_usePageOutline.GetAllGraduationRequirement()
		// 		}
		// 	}

		// },
		// 删除
		// async DeleteTarget(id: any) {
		// 	const res = await service({
		// 		path: "/api/services/app/Target/DeleteTarget",
		// 		method: "delete",
		// 		query: { id: id }
		// 	})
		// 	if (res.success) {
		// 		this.GetAllGraduationRequirement()
		// 		let _usePageOutline = usePageOutline()
		// 		_usePageOutline.GetAllGraduationRequirement()
		// 	}
		// }


	}
})
