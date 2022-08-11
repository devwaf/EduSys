import { el } from "element-plus/lib/locale"
import { pageIFace } from "../router/page"

type menuType = {
	label: string
	children?: Array<menuType>
	path: string | any
	name: string
	icon:string
}

const getMenuIndex = (list: Array<menuType>, title: string): number => {
	return list.findIndex(l => l.label == title)
}
export const showMenuByIsTeacher = () => {
	let data: Array<string> = []
	let isTeacher = localStorage.getItem("isTeacher") == "1"
	if (isTeacher) {
		data = [
			"Home2",
			"Course",
			"Administration",
			"Coursemanagement",
			"Outline",
			"Addoutline",
			"Outlinemanagement",
			"Coursedesign",
			"Outlineconfig",
			"Coursedesignconfig",
			"Correctionreplyform",
			"Cdformcenter",
			// "Cdprint",
			"Examination",
			"Releasetask",
			"Publishedtask",
			"Taskcorrect",
			"Etformcenter",
			// "Etprint",
			"Graduationdesign"
		]
	} else {
		data = [
			// "Home", 
			"Curriculumdesign", 
			"Curriculum", 
			"Fill", 
			"Graduation"]
	}
	return data
}
export const getMenuList = (pages: pageIFace) => {
	let menuList: Array<menuType> = []
	let k: string = "",
		menu,
		page,
		showPages = showMenuByIsTeacher()
	for (k in pages) {
		page = pages[k]
		if (!page.menu) continue
		if (!showPages.includes(page.name)) continue
		let recode = page.recode,
			meta = page.meta
			
			
		menu = {
			path: `/${page.name.toLowerCase()}`,
			name: page.name
			// icon:
		}
		
		
		if (recode.title) {
			let index: number = getMenuIndex(menuList, recode.title)		
			menu.path = `/${page.recode.path.toLowerCase()}/${page.name.toLowerCase()}`
	
			
			index > -1
				? menuList[index].children.push({ label: meta.title,icon: meta.icon, ...menu })
				: menuList.push({
						label: recode.title,
						path: `/${recode.path}`,
						name: recode.name,
						icon: recode.icon,
						children: [{ label: meta.title,icon:meta.icon, ...menu }]
				  })
		} else {
			menuList.push({ label: meta.title,icon:meta.icon, ...menu, children: [] })
		}
	}
	return menuList
}
