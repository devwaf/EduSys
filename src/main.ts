import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "element-plus/dist/index.css"
import './assets/css/element.scss'
import "./style/common.scss"
import "./assets/icon-font/iconfont.css"
import "./assets/icon-font/iconfont.js"
import { createPinia } from "pinia"
import router from "./router/router"

// svg 图标依赖
import "virtual:svg-icons-register"
import SvgIcon from "./components/SvgIcon.vue"

import { service } from "./api/service"
import { ElMessage } from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus,{locale:zhCn})
app.use(router)


// app.directive('focus', {
// 	// 当被绑定的元素挂载到 DOM 中时……
// 	mounted(el, binding) {
// 		function eventHandler(e) {
// 			if (el.contains(e.target)) {
// 				return false
// 			}

// 			if (binding.value && typeof binding.value === 'function') {
// 				binding.value(e)
// 			}
// 		}
// 		// 用于销毁前注销事件监听
// 		el.__click_outside__ = eventHandler
// 		// 添加事件监听
// 		document.addEventListener('click', eventHandler)
// 	},
// 	beforeUnmount(el) {
// 		// 移除事件监听
// 		document.removeEventListener('click', el.__click_outside__)
// 		// 删除无用属性
// 		delete el.__click_outside__
// 	}
// })
app.component("SvgIcon", SvgIcon)

app.mount("#app")
