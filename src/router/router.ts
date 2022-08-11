import { createRouter, createWebHashHistory, RouteRecordRaw, useRouter } from "vue-router"
import pages from "./page"
import Layout from "../layout/layout.vue"
import { formContextKey, ElMessage } from "element-plus"
import { showMenuByIsTeacher } from "../utils/menu"
const getLayoutTem = (route: any): RouteRecordRaw => {
	let c = {
		path: "",
		component: route.component,
		meta: route.meta,
		name: route.name
	}
	if (route.recode && route.recode.path) {
		c.path = `${route.recode.path.toLowerCase()}/${route.name.toLowerCase()}`
	} else {
		c.path = route.name.toLowerCase()
	}
	let redirectPath = ""
	let isTeachers = localStorage.getItem("isTeacher")
	if (isTeachers == "1") {
		redirectPath = "home2"
	} else if (isTeachers == "0") {
		redirectPath = "curriculumdesign"
	}
	return {
		path: "/",
		component: Layout,
		redirect: redirectPath,
		children: [c]
	}
}

const routes: RouteRecordRaw[] = [
	{
		name: "Login",
		path: "/login",
		component: pages.Login.component
	},
	{
		name: "Register",
		path: "/register",
		component: pages.Register.component
	},
	getLayoutTem(pages.Home2),
	getLayoutTem(pages.Administration),
	getLayoutTem(pages.Course),
	getLayoutTem(pages.Coursemanagement),

	getLayoutTem(pages.Outline),
	getLayoutTem(pages.Outlinemanagement),
	getLayoutTem(pages.Addoutline),

	getLayoutTem(pages.Coursedesign),
	getLayoutTem(pages.Coursedesignconfig),
	getLayoutTem(pages.Outlineconfig),
	getLayoutTem(pages.Correctionreplyform),
	getLayoutTem(pages.Cdformcenter),
	// getLayoutTem(pages.Cdprint),

	getLayoutTem(pages.Examination),
	getLayoutTem(pages.Releasetask),
	getLayoutTem(pages.Publishedtask),

	getLayoutTem(pages.Taskcorrect),
	getLayoutTem(pages.Etformcenter),
	// getLayoutTem(pages.Etprint),

	getLayoutTem(pages.Graduationdesign),

	// getLayoutTem(pages.Home),
	getLayoutTem(pages.Graduation),
	getLayoutTem(pages.Curriculumdesign),
	getLayoutTem(pages.Curriculum),
	getLayoutTem(pages.Fill)
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

const whiteList = ["Login", "Register"]
let token,
	menus: Array<string> = []
router.beforeEach(async (to, from, next) => {
	token = localStorage.getItem("token")
	if (whiteList.includes(to.name)) {
		menus = []
		next()
		return
	} else if (!token) {
		next({ name: "Login" })
		return
	}
	if (menus.length == 0) {
		menus = showMenuByIsTeacher()
	}
	if (!menus.includes(to.name)) {
		console.log("不包含这一个路由")
		next({ name: from.name })
		return
	}
	next()
})

export default router
