import { defineStore } from "pinia"
import { service } from "@/api/service.ts"
import request from "@/utils/request.ts"

export const useAccount = defineStore("account", {
	state: () => {
		return {}
	},
	getters: {},
	actions: {
		// post /api/TokenAuth/Authenticate 登录
		async authenticate(form: Object) {
			let res = await service({
				path: "/api/TokenAuth/Authenticate",
				method: "post",
				data: form
			})
			return res
		},
		// post /api/services/app/User/PersonalRegister 注册
		async personalRegister(form: Object) {
			let res = await service({
				path: "/api/services/app/User/PersonalRegister",
				method: "post",
				data: form
			})
			return res
		},
	}
})
