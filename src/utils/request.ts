import axios, { AxiosInstance } from "axios"
import router from "../router/router"
import { ElMessage } from "element-plus"
// let baseURL ='http://192.168.1.117:21004/api'
let baseURL = "http://127.0.0.1:10203"
let token = localStorage.getItem("token")
// 
let loginOnce = 0
const toLogin = (text:string)=>{
	if(!loginOnce){
		ElMessage.warning(text)
		router.push({ name: "Login" })
		loginOnce++
		setTimeout(()=>{
			loginOnce = 0
		},300)
	}
}
const error = (err: Error) => {
	if (err.response.status == 403) {
		toLogin("当前登录用户和身份不匹配")
	}else if(err.response.status == 401){
		toLogin("身份信息过期，请重新登录")
	}
	if (err.response.status == 401) {
		toLogin("身份信息过期")
	}
}
const request: AxiosInstance = axios.create({
	baseURL: baseURL, //import.meta.env.VITE_APP_Base_URL,
	timeout: 5000,
	headers: {
		Authorization: token
	}
})
// console.log(import.meta.env.VITE_APP_Base_URL, 1323425);

/**
 * 请求拦截
 */
request.interceptors.request.use(config => {
	token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

/**
 * 响应拦截
 */
request.interceptors.response.use(
	config => {
		return config
	},
	err => {
		error(err)
	}
)

export default request
