<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus"
import { reactive, ref } from "vue"
import CustomSelect from "@/components/customSelect/customSelect.vue"
import { useRouter } from "vue-router"
import { useAccount } from "@/store/account.ts"

const account = useAccount()
let router = useRouter()
const ruleFormRef = ref()
const ruleForm = ref({
	name: "",
	phone: "",
	password: "",
	role: "教师"
})
// 表单校验
const rules = reactive<FormRules>({
	resource: [{ required: true, message: "请选择身份", trigger: "blur" }],
	name: [
		{
			required: true,
			message: "请填写姓名",
			trigger: "change"
		}
	],
	stuID: [
		{
			required: true,
			message: "请填写工号",
			trigger: "change"
		}
	],
	password: [
		{
			required: true,
			message: "请输入您的密码",
			trigger: "change"
		}
	]
})
// 显示
let reveal = ref(false)

const registerHandler = () => {
	ruleFormRef.value.validate(valid => {
		if (valid) {
			account.personalRegister(ruleForm.value).then((res:Object)=>{
				console.log(res.result);
				
			})
		}
	})
}
</script>

<template>
	<div></div>
	<div class="login">
		<div class="left">
			<img src="../../assets/login/背景图片.png" alt="" />
		</div>
		<div class="right">
			<div class="success-box" v-show="reveal">
				<svg class="icon home-icon" aria-hidden="true" @click="router.push({ name: 'Login' })">
					<use xlink:href="#icon-zhucechenggong" />
				</svg>
				<div class="success-box-text">注册成功</div>
			</div>
			<h1 @click="router.push({ name: 'Login' })">
				<svg class="icon home-icon" aria-hidden="true">
					<use xlink:href="#icon-fanhui" /></svg
				><span>注册</span>
			</h1>
			<div class="login-box">
				<el-form
					label-position="left"
					ref="ruleFormRef"
					:model="ruleForm"
					status-icon
					:rules="rules"
					label-width="120px"
					class="demo-ruleForm"
				>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm.name" placeholder="请输入您的姓名" />
					</el-form-item>
					<el-form-item label="学号/工号" prop="stuID">
						<el-input v-model="ruleForm.stuID" placeholder="请输入您的学号/工号" />
					</el-form-item>

					<el-form-item label="密码" prop="password">
						<el-input v-model="ruleForm.password" placeholder="请输入您的密码" show-password />
					</el-form-item>
					<el-form-item>
						<el-button style="margin-top: 30px" @click="registerHandler"> 注册 </el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.icon {
	width: 40px;
	height: 56px;
	margin-right: 20px;
}

:deep(.el-form-item) {
	display: block;
}
.login {
	display: flex;
	height: 100vh;
	width: 100vw;

	.left {
		flex: 1;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.right {
		width: 664px;
		position: relative;
		background-color: #2ebba3;

		.success-box {
			position: absolute;
			top: 30px;
			left: 50%;
			transform: translate(-50%);
			display: flex;
			width: 170px;
			height: 50px;
			//   background-color: pink;
			justify-content: space-between;
			align-items: center;
			.success-box-text {
				font-size: 24px;
				color: #fff;
			}
		}
		.success-prompt {
			position: absolute;
			top: 50px;
			left: 50%;
			transform: translate(-50%);
			color: #fff;
			font-size: 30px;
			.success {
				margin-right: 20px;

				font-size: 30px;
				color: #2ebba3;
				border-radius: 50%;
				background-color: #fff;
			}
		}
		h1 {
			cursor: pointer;
			display: flex;
			width: 260px;
			font-size: 36px;
			font-weight: 500;
			line-height: 48px;
			text-align: center;
			margin: 100px 0 50px 140px;
			//   margin: 120px auto 0;
			color: #116052;
			.register {
				font-size: 24px;
				margin: 10px 50px 0 -50px;
			}
		}
		.login-box {
			position: absolute;
			top: 200px;
			left: 150px;

			width: 260px;
			height: 300px;

			:deep(.el-form) {
				color: #606266;
				.el-radio__inner {
					background-color: rgba(255, 255, 255, 0.7);
				}
				.el-input__inner {
					width: 320px;
				}
				.el-form-item__label {
					width: 90px !important;

					//   justify-content: space-between;
				}
				.el-form-item {
					position: relative;
					margin-bottom: 10px;
					.biyanjing {
						position: absolute;
						top: 12px;
						right: 10px;
						height: 2em;
						width: 2em;
					}
				}
				.el-input__wrapper {
					width: 300px;
					height: 30px;
					background-color: rgba(255, 255, 255, 0.7);
					border-radius: 5px;
				}
				.el-form-item__content {
					min-width: 320px;
				}
			}
			button {
				width: 320px;
				height: 46px;
				background: #ffffff;
				opacity: 0.7;
				margin-left: -120px;
				color: #606266;
				text-align: center;
				//  background-color: rgba(255,255,255,0.7);
			}
			button:hover {
				background: #44ffdf;
				opacity: 0.7;
			}
		}
	}
}
</style>
