import { DefineComponent } from "vue"
import Components from "./componens"

type recodeType = {
	title: string
	path?: string
	icon?: string
}

type pageType = {
	component: DefineComponent | any
	name: string
	recode: recodeType
	meta: recodeType
	menu: boolean
	path?: string
}

export interface pageIFace {
	[propName: string]: pageType
}

const addPage = (
	comName: string,
	meta: recodeType,
	menu = true,
	recode = { title: "", path: "", name: "", icon: "" }
	// icon:string
): pageType => {
	return {
		component: Components[comName],
		name: comName,
		recode,
		meta,
		menu
	}
}

const pages: pageIFace = {
	Login: addPage("Login", { title: "登录" }, false),
	Register: addPage("Register", { title: "注册" }, false),
	// 教师
	Home2: addPage("Home2", { title: "首页", icon: "#icon-shouyeicon" }),
	Course: addPage("", { title: "课程配置" }, false),
	Coursemanagement: addPage("Coursemanagement", { title: "新建课程", icon: "xinjian" }, true, {
		title: "课程配置",
		path: "Course",
		name: "Course",
		icon: "#icon-kechengpeizhi-icon"
	}),
	Administration: addPage("Administration", { title: "课程管理", icon: "kechengguanli" }, true, {
		title: "课程配置",
		path: "Course",
		name: "Course",
		icon: "#icon-kechengpeizhi-icon"
	}),

	Outline: addPage("", { title: "课程大纲配置" }, false),
	Addoutline: addPage("Addoutline", { title: "新建大纲", icon: "xinjian" }, true, {
		title: "课程大纲配置",
		path: "Outline",
		name: "Outline",
		icon: "#icon-kechengdagangpeizhi-icon"
	}),
	Outlinemanagement: addPage("Outlinemanagement", { title: "大纲管理", icon: "dagangguanli" }, true, {
		title: "课程大纲配置",
		path: "Outline",
		name: "Outline",
		icon: "#icon-kechengdagangpeizhi-icon"
	}),

	Coursedesign: addPage("", { title: "课设" }, false),
	Coursedesignconfig: addPage("Coursedesignconfig", { title: "课设配置", icon: "keshepeizhi" }, true, {
		title: "课设",
		path: "Coursedesign",
		name: "Coursedesign",
		icon: "#icon-keshe-icon"
	}),
	Outlineconfig: addPage("Outlineconfig", { title: "大纲配置", icon: "dagangguanli" }, true, {
		title: "课设",
		path: "Coursedesign",
		name: "Coursedesign",
		icon: "#icon-keshe-icon"
	}),

	Correctionreplyform: addPage(
		"Correctionreplyform",
		{ title: "批改答辩记录表", icon: "pigaidabianjilubiao" },
		true,
		{
			title: "课设",
			path: "Coursedesign",
			name: "Coursedesign",
			icon: "#icon-keshe-icon"
		}
	),
	Cdformcenter: addPage("Cdformcenter", { title: "表单中心", icon: "biaodanzhongxin" }, true, {
		title: "课设",
		path: "Coursedesign",
		name: "Coursedesign",
		icon: "#icon-keshe-icon"
	}),

	Examination: addPage("",{ title: "笔试 / 机试中心" }, false),
	Releasetask: addPage("Releasetask", { title: "发布作业", icon: "fabuzuoye" }, true, {
		title: "笔试 / 机试中心",
		path: "Examination",
		name: "Examination",
		icon: "#icon-bishi-jishi-icon"
	}),
	Publishedtask: addPage("Publishedtask", { title: "已发布作业" }, false, {
		title: "发布作业",
		path: "Examination",
		name: "Examination",
		icon: "fabuzuoye"
	}),
	Taskcorrect: addPage("Taskcorrect", { title: "批改作业", icon: "pigaidabianjilubiao" }, true, {
		title: "笔试 / 机试中心",
		path: "Examination",
		name: "Examination",
		icon: "#icon-bishi-jishi-icon"
	}),
	Etformcenter: addPage("Etformcenter", { title: "表单中心", icon: "biaodanzhongxin" }, true, {
		title: "笔试 / 机试中心",
		path: "Examination",
		name: "Examination",
		icon: "#icon-bishi-jishi-icon"
	}),
	Graduationdesign: addPage("Graduationdesign", { title: "毕业设计", icon: "#icon-biyeshejiicon" }),
	// Home: addPage("Home", { title: "首页", icon: "#icon-shouyeicon" }),
	Curriculumdesign: addPage("Curriculumdesign", { title: "课设", icon: "#icon-keshe-icon" }),
	Curriculum: addPage("", { title: "课程" }, false),
	Fill: addPage("Fill", { title: "上传作业", icon: "updata" }, true, {
		title: "课程",
		path: "Curriculum",
		name: "Curriculum",
		icon: "#icon-kechengshejiicon"
	}),

	Graduation: addPage("Graduation", { title: "毕业设计", icon: "#icon-biyeshejiicon" })
}

export default pages
