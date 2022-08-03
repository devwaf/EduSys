export const data: Array<Object> = [
	{ sort: 1, claimAndCon: "教案（电子版）", isPass: "是", remark: "" },
	{ sort: 2, claimAndCon: "空白试卷、学生试卷（或答题纸）", isPass: "是", remark: "" },
	{ sort: 3, claimAndCon: "标准答案及评分标准", isPass: "是", remark: "" },
	{ sort: 4, claimAndCon: "平时成绩表（清晰、规范；表头信息完整）", isPass: "是", remark: "" },
	{ sort: 5, claimAndCon: "总评成绩表（签字完整，不及格红笔圈出）", isPass: "是", remark: "" },
	{ sort: 6, claimAndCon: "学生试卷（按学生顺序装订、评阅规范）", isPass: "是", remark: "" },
	{
		sort: 7,
		claimAndCon: "课程目标达成分析表（信息完整，达成评价合理且与大纲相符，分析具体、有针对性）",
		isPass: "是",
		remark: ""
	},
	{
		sort: 8,
		claimAndCon: "湖北工业大学本科课程考试试卷审核表",
		isPass: "是",
		remark: ""
	},
	{
		sort: 9,
		claimAndCon: "教学大纲",
		isPass: "是",
		remark: ""
	},
	{
		sort: 10,
		claimAndCon: "考试成绩或其他考核环节分目标达成统计表",
		isPass: "是",
		remark: ""
	},
	{ sort: 11, claimAndCon: "作业本（5本，体现优、良、差等次）", isPass: "是", remark: "教学办存留" },
	{
		sort: 12,
		claimAndCon: "其他与成绩有关资料（如大作业、课堂作业、课程阅读汇总表、每科三问表、调研报告或设计等）",
		isPass: "是",
		remark: ""
	},
	{ sort: 13, claimAndCon: "其他，如学生课程目标达成自我评价表等", isPass: "是", remark: "" },
	{ sort: 14, claimAndCon: "试卷袋、成绩表、大纲、达成评价表信息一致性", isPass: "是", remark: "" },
	{ sort: 15, claimAndCon: "平时成绩分布合理、有区分度", isPass: "是", remark: "" },
	{ sort: 16, claimAndCon: "装订规范（顺序正确、装订整齐、符合要求）", isPass: "是", remark: "" }
]

export function getTaskTable(map: Object) {
	let k,
		name: number,
		res = [],
		d
	for (k in map) {
		name = Number(k.replace("num", ""))
		d = data[name]
		d.isPass = map[k].isPass
		d.remark = map[k].remark
		res.push(d)
	}
	return res
}
