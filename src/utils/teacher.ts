// 首页课设 课程目标达成考核方式及成绩评定对照表
export const assessmentOptions: Array<Object> = [
	{ label: "课程目标", prop: "target" },
	{ label: "支撑毕业要求", prop: "requirement" },
	{ label: "考核环节", prop: "assessment" },
	{ label: "成绩比例（100%）", prop: "proportion" }
]
// 首页课设 课程目标达成考核方式及成绩评定对照表
export const assessment: Array<Object> = [
	{
		target: "课程目标1",
		requirement: [
			{
				label: "计算机网络",
				value: "1"
			},
			{
				label: "计算机应用",
				value: "2"
			},
			{
				label: "计算机科学",
				value: "3"
			}
		],
		design: "50",
		efence: "50",
		proportion: "100"
	}
]

// 首页课程  课程目标达成考核方式及成绩评定对照表
export const evaluateOptions: Array<Object> = [
	{
		label: "计算机网络",
		value: "1"
	},
	{
		label: "计算机应用",
		value: "2"
	},
	{
		label: "计算机科学",
		value: "3"
	}
]
export const evaluate: Array<Object> = [
	{
		target: "课程目标1",
		graduation: [
			{
				label: "支撑毕业要求1.1",
				value: "1"
			},
			{
				label: "支撑毕业要求1.2",
				value: "2"
			},
			{
				label: "支撑毕业要求1.3",
				value: "3"
			}
		],
		performance: "5",
		task: "5",
		experiment: "0",
		examination: "15",
		achievementRatio: "25"
	},
	{
		target: "课程目标1",
		graduation: [
			{
				label: "支撑毕业要求1.1",
				value: "1"
			},
			{
				label: "支撑毕业要求1.2",
				value: "2"
			},
			{
				label: "支撑毕业要求1.3",
				value: "3"
			}
		],
		performance: "5",
		task: "5",
		experiment: "0",
		examination: "15",
		achievementRatio: "25"
	}
]
// 首页课程   考试配置
export const examination: Object = {
	name: "计算机",
	quantity: "3",
	totalScore: "100",
	examinationTable: [
		{
			titleId: "第一大题",
			questionType: "选择题",
			score: "20分",
			subtopic: "1.1",
			topicScore: "2",
			target: [
				{
					label: "课程目标1",
					value: "1"
				},
				{
					label: "课程目标2",
					value: "2"
				},
				{
					label: "课程目标3",
					value: "3"
				}
			]
		},
		{
			titleId: "第一大题",
			questionType: "选择题",
			score: "20分",
			subtopic: "1.1",
			topicScore: "2",
			target: [
				{
					label: "课程目标1",
					value: "1"
				},
				{
					label: "课程目标2",
					value: "2"
				},
				{
					label: "课程目标3",
					value: "3"
				}
			]
		},
		{
			titleId: "第二大题",
			questionType: "填空题",
			score: "30分",
			subtopic: "1.1",
			topicScore: "2",
			target: [
				{
					label: "课程目标1",
					value: "1"
				},
				{
					label: "课程目标2",
					value: "2"
				},
				{
					label: "课程目标3",
					value: "3"
				}
			]
		},
		{
			titleId: "第二大题",
			questionType: "填空题",
			score: "30分",
			subtopic: "1.1",
			topicScore: "2",
			target: [
				{
					label: "课程目标1",
					value: "1"
				},
				{
					label: "课程目标2",
					value: "2"
				},
				{
					label: "课程目标3",
					value: "3"
				}
			]
		}
	]
}
export const query: Object = {
	name: "丫丫",
	studentID: "123456",
	class: [
		{
			label: "18级",
			value: "0"
		},
		{
			label: "19级",
			value: "1"
		},
		{
			label: "20级",
			value: "2"
		}
	]
}

// 课设-大纲配置 -课设成绩组成比例
export const subItem: Array<Object> = [
	{
		review: "1.课程设计报告书",
		index: "(1)系统分析与算法设计",
		full: "20分",
		operation: ""
		// list:[
		//   {
		//     index: "(1)系统分析与算法设计",
		//     full: '20分',
		//     operation: ''
		//   },
		//   {
		//     index: "(1)系统分析与算法设计",
		//     full: '20分',
		//     operation: ''
		//   },{
		//     index: "(1)系统分析与算法设计",
		//     full: '20分',
		//     operation: ''
		//   },
		// ]
	},
	{
		review: "1.答辩环节",
		index: "(1)系统分析与算法设计",
		full: "20分",
		operation: ""
	},
	{
		review: "1.答辩环节",
		index: "(1)系统分析与算法设计",
		full: "20分",
		operation: ""
	}
]
export const subItemTabel: Array<Object> = [
	{
		label: "项目评审",
		prop: "review"
	},
	{
		label: "指标",
		prop: "index"
	},
	{
		label: "满分",
		prop: "full"
	},
	{
		label: "操作",
		prop: "operation"
	}
]

// 课设-大纲设置 - 课设目标达成考核方式及成绩评定对照表
export const reach: Array<Object> = [
	{
		target: "课设目标",
		requirement: [
			{
				label: "支撑毕业要求1.1",
				value: "1"
			},
			{
				label: "支撑毕业要求1.2",
				value: "2"
			},
			{
				label: "支撑毕业要求1.3",
				value: "3"
			}
		],
		assessment: [
			{
				report: "课程设计报告",
				reportList: [
					{
						reportTitle: [
							{
								label: "(1)系统分析与算法设计",
								value: "1"
							},
							{
								label: "(2)系统分析与算法设计",
								value: "2"
							},
							{
								label: "(3)系统分析与算法设计",
								value: "3"
							},
							{
								label: "(4)系统分析与算法设计",
								value: "4"
							}
						],
						fraction: "20分",
						del: "删除"
					},
					{
						reportTitle: [
							{
								label: "(1)系统分析与算法设计",
								value: "1"
							},
							{
								label: "(2)系统分析与算法设计",
								value: "2"
							},
							{
								label: "(3)系统分析与算法设计",
								value: "3"
							},
							{
								label: "(4)系统分析与算法设计",
								value: "4"
							}
						],
						fraction: "20分",
						del: "删除"
					},
					{
						reportTitle: [
							{
								label: "(1)系统分析与算法设计",
								value: "1"
							},
							{
								label: "(2)系统分析与算法设计",
								value: "2"
							},
							{
								label: "(3)系统分析与算法设计",
								value: "3"
							},
							{
								label: "(4)系统分析与算法设计",
								value: "4"
							}
						],
						fraction: "20分",
						del: "删除"
					}
				]
			},
			{
				report: "答辩",
				reportList: [
					{
						reportTitle: [
							{ lable: "(1)演示效果", value: "1" },
							{ lable: "(2)演示效果", value: "2" },
							{ lable: "(3)演示效果", value: "3" },
							{ lable: "(4)演示效果", value: "4" }
						],
						fraction: "20分",
						del: "删除"
					}
				]
			}
		],

		proportion: "60",
		operation: ""
	}
]
export const reachTable: Array<Object> = [
	{
		label: "课设目标",
		prop: "target"
	},
	{
		label: "支撑毕业要求",
		prop: "requirement"
	}
]

// export const outlineData: Array<Object> =[
//   {

//   }
// ]

// 课程大纲配置  - 新建大纲  - 考试配置
export const outline: Array<Object> = [
	{
		title: "第一大题",
		type: "选择题",
		score: "20分",
		ti: [
			{
				subtopic: 1.1,
				subtopicScore: 2,
				targetList: [
					{
						label: "课设目标1",
						value: "1"
					},
					{
						label: "课设目标2",
						value: "2"
					},
					{
						label: "课设目标3",
						value: "3"
					}
				]
			},
			{
				subtopic: 1.1,
				subtopicScore: 2,
				targetList: [
					{
						label: "课设目标1",
						value: "1"
					},
					{
						label: "课设目标2",
						value: "2"
					},
					{
						label: "课设目标3",
						value: "3"
					}
				]
			}
		],
		operation: "删除"
	},
	{
		title: "第二大题",
		type: "填空题",
		score: "20分",
		ti: [
			{
				subtopic: 1.1,
				subtopicScore: 2,
				targetList: [
					{
						label: "课设目标1",
						value: "1"
					},
					{
						label: "课设目标2",
						value: "2"
					},
					{
						label: "课设目标3",
						value: "3"
					}
				]
			},
			{
				subtopic: 1.1,
				subtopicScore: 2,
				targetList: [
					{
						label: "课设目标1",
						value: "1"
					},
					{
						label: "课设目标2",
						value: "2"
					},
					{
						label: "课设目标3",
						value: "3"
					}
				]
			}
		],
		operation: "删除"
	},
	{
		title: "第三大题",
		type: "选择题",
		score: "20分",
		ti: [
			{
				subtopic: 1.1,
				subtopicScore: 2,
				targetList: [
					{
						label: "课设目标1",
						value: "1"
					},
					{
						label: "课设目标2",
						value: "2"
					},
					{
						label: "课设目标3",
						value: "3"
					}
				]
			},
			{
				subtopic: 1.1,
				subtopicScore: 2,
				targetList: [
					{
						label: "课设目标1",
						value: "1"
					},
					{
						label: "课设目标2",
						value: "2"
					},
					{
						label: "课设目标3",
						value: "3"
					}
				]
			}
		],
		operation: "删除"
	}
]
export const outlineTable: Array<Object> = [
	{
		label: "题号",
		prop: "title"
	},
	{
		label: "题型",
		prop: "type"
	},
	{ label: "分值", prop: "score" }
]

// 笔试、机试
export const curriculum: Array<Object> = [
	{
		icon: "#icon-kesheicon",
		title: "作业发布",
		list: [
			{
				name: "发布作业",
				path: "/examination/releasetask"
			}
		]
	},
	{
		icon: "#icon-kechengshejiicon",
		title: "作业批改",
		list: [{ name: "批改作业", path: "/examination/taskcorrect" }]
	},
	{
		icon: "#icon-biyeshejiicon",
		title: "表单配置",
		list: [
			{
				name: "表单中心",
				path: "/examination/etformcenter"
			},
			
		]
	}
]
export const curriculumSide: Array<Object> = [
	{ title: "一班作业未批改" },
	{ title: "二班作业未批改" },
	{ title: "三班作业未批改" }
]

// 课设中心
export const courseDesign: Array<Object> = [
	{
		icon: "#icon-kesheicon",
		title: "课设大纲配置",
		list: [
			{
				name: "课设配置",
				path: "/coursedesign/coursedesignconfig"
			},
			{
				name: "大纲配置",
				path: "/coursedesign/outlineconfig"
			}
		]
	},
	{
		icon: "#icon-kechengshejiicon",
		title: "作业批改",
		list: [
			{
				name: "批改答辩记录表",
				path: "/coursedesign/correctionreplyform"
			}
		]
	},
	{
		icon: "#icon-biyeshejiicon",
		title: "表单配置",
		list: [
			{
				name: "表单中心",
				path: "/coursedesign/cdformcenter"
			},
			
		]
	}
]
export const courseDesignSide: Array<Object> = [
	{ title: "一班作业未批改" },
	{ title: "二班作业未批改" },
	{ title: "三班作业未批改" }
]

// 文件类型
export const fileTypeList: Array<Object> = ["word", "excel", "ppt", "pdf"]

// 课设表单中心
export const formNavList: Array<Object> = [
	{
		title: "总成绩表",
		id: 0
	},
	{
		title: "分项成绩表",
		id: 1
	},
	{
		title: "大纲",
		id: 2
	},
	{
		title: "课程报告",
		id: 3
	},
	{
		title: "任务书",
		id: 4
	}
]
