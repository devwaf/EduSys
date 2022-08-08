import { defineStore } from "pinia"
import { service } from "../../api/service"
import { ElMessage } from "element-plus"
import { el, fi } from "element-plus/lib/locale"

export const usePageStoreOutLineConfig = defineStore("outLineConfig", {
	state: () => {
		return {
			addOutLineConfig: {
				name: "",
				teacherId: localStorage.getItem("userId"),
				kind: "课设"
			},
			outlineId: "",
			subentryList: [], //分项成绩表
			contrastList: [], // 对照表
			targetList: [], //毕业要求
			list: [],
			id: [],
			quotaList: [], //所有指标
			assessmentList: [], //考核技巧
			AllScoreAchievement: [], //所有成绩对照表
			requirementList: [],
			disabled: true, //禁用
			quota: [],
			arr: [],
			tmp: [],
			yy: [],
			scorRateHeader: [], //考核方式及比例
			forbidden: []
		}
	},
	actions: {
		// 新建课设大纲
		async getAddOutline() {
			if (this.addOutLineConfig.name == "") return
			if (this.outlineId == "") {
				const res = await service({
					path: "/api/services/app/Outline/AddOutline",
					data: this.addOutLineConfig,
					method: "post"
				})
				this.outlineId = res.result.id
				this.GetAllGraduationRequirement()
			} else {
				// 修改大纲
				const res = await service({
					path: "/api/services/app/Outline/UpdateOutline",
					data: {
						id: this.outlineId, name: this.addOutLineConfig.name, teacherId: localStorage.getItem("userId"),
						kind: "课设"
					},
					method: "put"
				})
			}

			if (this.outlineId !== "") {
				this.disabled = false
				this.GetAllGraduationRequirement()
			}
		},
		// 获取课设名称
		// 获取大纲
		getID(id: string) {
            this.outlineId = id
            console.log(this.outlineId, 'id');
            this.GetOutline(this.outlineId)
        },

		async GetOutline(id: any) {
			this.outlineId = id
			console.log(this.outlineId,'id');
			
			const res = await service({
				path: "/api/services/app/Outline/GetOutline",
				query: { id: id }
			})
			this.addOutLineConfig.name = res.result.name

			if (id !== "") {
				this.disabled = false
			}
			if (res.success) {
				this.GetAllScoreAchievement(id)
				this.GetHasAchievementTarget(id)
				this.GetAllDesignObjective(id);
				this.GetAllGraduationRequirement()
			}

		},

		Message(val: any) {
			ElMessage({
				message: val,
				type: "warning"
			})
		},


		// 添加评审项目
		async getAddReview() {
			const res = await service({
				path: "/api/services/app/ScoreAchievement/AddScoreAchievement",
				data: { outlineId: this.outlineId, name: "", weight: 0, },
				method: "post"
			})
			this.GetAllScoreAchievement(this.outlineId)

		},
		// 修改评审项目
		async UpdateScoreAchievement(list: any) {
			const res = await service({
				path: "/api/services/app/ScoreAchievement/UpdateScoreAchievement",
				data: { id: list.id, outlineId: this.outlineId, name: list.name, weight: list.weight },
				method: "put"
			})
			this.GetAllScoreAchievement(this.outlineId)
			// 如果在添加了成绩评定对照表后修改，则修改评审项目，成绩评定对照表也会改变
			if (this.contrastList.length == 0) return
			this.contrastList.forEach(item => {
				for (var i = 0; i < item.scoreRate.length; i++) {
					if (this.subentryList[i].name !== item.scoreRate[i].name) {
						console.log(item.scoreRate[i], 1111111);
						item.scoreRate[i].name = this.subentryList[i].name
						console.log(item, '替换');
					}
				}
				// 调成绩评定对照表修改接口
				this.UpdateDesignObjective(item)
			});
		},


		// 删除评审
		async DeleteScoreAchievement(id: string) {
			const res = await service({
				path: "/api/services/app/ScoreAchievement/DeleteScoreAchievement",
				query: { id: id },
				method: "delete"
			})
			this.GetAllScoreAchievement(this.outlineId)
			this.GetHasAchievementTarget(this.outlineId)
		},
		// 添加指标
		async AddAchievementTarget(scoreAchievementId: any) {
			const res = await service({
				path: "/api/services/app/AchievementTarget/AddAchievementTarget",
				data: { outlineId: this.outlineId, scoreAchievementId: scoreAchievementId, target: "", score: 0, rate: 0 },
				method: "post"
			})
			this.GetAllScoreAchievement(this.outlineId)
		},

		// 修改指标		
		async UpdateAchievementTarget(list: any, row: string) {
			const res = await service({
				path: "/api/services/app/AchievementTarget/UpdateAchievementTarget",
				data: { outlineId: this.outlineId, scoreAchievementId: row, id: list.id, target: list.target, score: list.score, },
				method: "put"
			})
			let num = 0
			// 根据指标的分数计算评审项目的百分比
			this.subentryList.forEach(item => {
				if (item.id == row) {
					item.achieveTarget.forEach(async (k) => {
						num += parseInt(k.score)
					});
				}
			})
			// 修改评审项目
			this.subentryList.forEach(async (item) => {
				if (item.id == row) {
					const res = await service({
						path: "/api/services/app/ScoreAchievement/UpdateScoreAchievement",
						data: { id: item.id, outlineId: this.outlineId, name: item.name, weight: num },
						method: "put"
					})

					if (res.success) {
						this.GetAllScoreAchievement(this.outlineId)
						this.GetHasAchievementTarget(this.outlineId)
					}


				}
			})
			let n = 0
			if (this.contrastList) {

				this.contrastList.forEach(element => {
					element.scoreRate.forEach(e => {
						e.achieveTarget.forEach(i => {
							if (i.id == list.id) {
								i.target = list.target
								i.score = list.score
								console.log(i.target, 'oppppp');

							}
							n += parseInt(i.score)
							console.log(n, 5555555555555555);
						});
						element.gredeProportion = n
						console.log(element, '是这个');

					});
				});
				this.contrastList.forEach(element => {
					this.UpdateDesignObjective(element)
				});
			}
		},
		// 删除指标
		async DeleteAchievementTarget(id: string, row: string) {
			// console.log(this.quotaList,'aaaaaaaaaaaa');

			// this.quotaList.forEach(element => {
			// 	if (element.value == id && element.disabled) {
			// 		console.log(element, 'aaaaaaaaaaa');

			// 		alert('指标已绑定')
					
			// 	}
			// 	return
			// });

			const res = await service({
				path: "/api/services/app/AchievementTarget/DeleteAchievementTarget",
				query: { id: id },
				method: "delete"
			})
			this.GetAllScoreAchievement(this.outlineId)
			// this.GetHasAchievementTarget(this.outlineId)
			// 如果删除的指标是最后一个，删除评审项目
			this.subentryList.forEach((item) => {
				if (item.id == row) {
					console.log(item.achieveTarget.length, 9999999);
					if (item.achieveTarget.length == 1) {
						this.DeleteScoreAchievement(row)
					}
				}
			});

		},
		//所有指标
		async GetHasAchievementTarget(id: string) {

			const res = await service({
				path: "/api/services/app/AchievementTarget/GetHasAchievementTarget",
				query: { OutlineId: id },
				method: "get"
			})
			this.arr = res.result
			this.quotaList = []
			this.forbidden = []
			res.result.forEach(item => {
				this.quotaList.push({
					label: item.target,
					value: item.id,
					disabled: item.isActive
				})
			});
			console.log(this.forbidden, '999999');

		},

		// 获取所有的评审
		async GetAllScoreAchievement(val: any) {
			const res = await service({
				path: "/api/services/app/ScoreAchievement/GetAllScoreAchievement",
				query: { outlineId: val },
				method: "get"
			})
			this.subentryList = []
			this.subentryList = res.result
			this.quota = []
			let nn = []

			console.log(this.subentryList, '评审');

			this.subentryList.forEach(item => {
				console.log(item, 'id值');

				item.achieveTarget.forEach(element => {
					nn.push({
						label: element.target,
						value: element.id
					})
				});
				this.quota.push({
					id: item.id,
					name: item.name,
					weight: item.weight,

					achieveTarget: [

					]
				})
			})
			console.log(this.quota, '13243556');
		},
		// 获取对照表
		async GetAllDesignObjective(val: any) {
			// this.GetHasAchievementTarget(this.outlineId)

			const res = await service({
				path: "/api/services/app/DesignObjective/GetAllDesignObjective",
				query: { outlineId: val }
			})
			this.contrastList = []
			this.contrastList = res.result

		},
		// 添加对照表
		async AddDesignObjective() {
			this.GetHasAchievementTarget(this.outlineId)
			const res = await service({
				path: "/api/services/app/DesignObjective/AddDesignObjective",
				data: { outlineId: this.outlineId },
				method: "post"
			})
			let id = res.result.id
			console.log(this.subentryList, 'pings');
			this.GetAllScoreAchievement(this.outlineId)
			this.contrastList.push(
				{
					id: id,
					name: "",
					graduationRequirementId: "",
					degreeSupport: "",
					scoreRate: this.quota,

					gredeProportion: 0
				}
			)
		},
		// 修改对照表
		async UpdateDesignObjective(val: any) {
			console.log(val, 999999);


			console.log(val, 111111);
			const data = await service({
				path: "/api/services/app/DesignObjective/UpdateDesignObjective",
				data: val,
				method: "put"
			})

			this.GetAllDesignObjective(this.outlineId)


		},


		// 修改
		getMentHandler(val: any, i: string, value: any, index: any) {
			let num = 0

			this.contrastList.forEach(element => {
				if (val.id == element.id) {

					element.scoreRate.forEach(e => {
						if (e.id == i) {
							console.log(e);
							this.arr.forEach((y) => {
								if (y.target == value) {
									this.forbidden.push(y.target)
									e.achieveTarget[index].id = y.id
									e.achieveTarget[index].score = y.score
									console.log(11111111111);

								}
							})



						}

					});

				}

			});
			this.contrastList.forEach(element => {
				if (element.id == val.id) {
					element.scoreRate.forEach(e => {
						e.achieveTarget.forEach(m => {
							console.log(m.score, 999999999);

							num += parseInt(m.score)
							console.log(num, 5555555555555555);

						});

					})
					element.gredeProportion = num
					this.UpdateDesignObjective(element)
				}
			})
		},
		// 删除对照表
		async DeleteDesignObjective(id: string) {


			const res = await service({
				path: "/api/services/app/DesignObjective/DeleteDesignObjective",
				query: { id: id },
				method: "delete"
			})
			this.GetAllDesignObjective(this.outlineId)
		},
		// 考核环节
		getAddSubscript(id: any, val: any) {
			console.log(id, val, "1224356")
			this.contrastList.forEach(item => {
				if (item.id == val) {
					console.log(item, "1323433656")
					item.scoreRate.forEach(element => {
						if (element.id == id) {
							element.achieveTarget.push({
								id: '',
								target: "",
								score: 0
							})
						}
					})
				}
			})
			console.log(this.contrastList, "添加后")
		},
		// 考核环节删除
		delSubscript(id: string, val: string, i: any) {
			let num = 0
			this.contrastList.forEach(element => {
				if (element.id == id) {
					element.scoreRate.forEach(e => {
						console.log(e, 99999999999);
						if (e.id == val) {
							e.achieveTarget.splice(i, 1)
						}
					});
					element.scoreRate.forEach(e => {
						e.achieveTarget.forEach(m => {
							console.log(m.score, 999999999);
							num += parseInt(m.score)
							console.log(num, 5555555555555555);
						});
					})
					element.gredeProportion = num
					this.UpdateDesignObjective(element)
				}


			});

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

			console.log(this.targetList, 9999999)
		},
		// 验证大纲
		async CheckDesignOutLine() {
			const res = await service({
				path: "/api/services/app/AchievementTarget/CheckDesignOutLine",
				method: "post",
				query: { outlineId: this.outlineId }
			})
			ElMessage({
				message: res.result.message,
				type: "success"
			})
			console.log(res, "大纲是否完整")
		},
		leavePage(router: any) {
			if (router !== "/coursedesign/outlineconfig") {
				this.addOutLineConfig.name = ""
				this.outlineId = ""
				this.subentryList = []
				this.achieveTarget = []
				this.contrastList = []
				this.targetList = []
				this.quotaList = []
				// this.quota=[]
			}
			if (this.outlineId == "") {
				this.disabled = true

			}
		}
	}
})
