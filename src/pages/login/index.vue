<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { useAccount } from "@/store/account.ts";
import type { FormInstance } from "element-plus";
const account = useAccount();

let router = useRouter();
let form = ref({
  phoneNum: "",
  identity: "",
  password: "",
  rememberClient: true,
});
const ruleFormRef = ref<FormInstance>();
const register = () => {
  router.push({ name: "Register" });
};

const  hide=ref(true)
const type=ref('')
// 密码框
const   hideHandler=()=>{
hide.value=!hide.value
console.log(hide.value,999999);
// if(hide.value){
//   console.log();
  
//   type.value=='password'
// }else{
//    type.value=='text'
// }
}
const rules = reactive({
  phoneNum: [{ required: true, message: "请填写工号", trigger: "blur" }],
  identity: [
    {
      required: true,
      message: "请选择身份",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入您的密码",
      trigger: "change",
    },
  ],
});
// 登录
const loginHandler = () => {
  if (ruleFormRef.value == null) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      account
        .authenticate(form.value)
        .then((res: Object) => {
          ElNotification({
            title: "账号密码输入正确",
            type: "success",
          });
          let data = res.result;
          localStorage.setItem(
            "encryptedAccessToken",
            data.encryptedAccessToken
          );
          localStorage.setItem(
            "encryptedAccessToken",
            data.encryptedAccessToken
          );
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("name", data.name);
          localStorage.setItem("userId", data.userInfoId);
          localStorage.setItem(
            "isTeacher",
            form.value.identity == "教师" ? "1" : "0"
          );
          let name = form.value.identity == "教师" ? "Home2" : "Home";
          router.push({ name });
          return;
        })
        .catch((err: Object) => {
          ElNotification({
            title: "账号不存在",
            type: "error",
          });
        });
    }
  });
};
const keyupHandler = (e) => {
  // 如果是回车则执行登录方法
  if (e.keyCode === 13) {
    loginHandler();
  }
};
const loginkeyupHandler = () => {
  //   console.log(111111111111111111111);

  window.addEventListener("keyup", keyupHandler);
};
loginkeyupHandler();
</script>

<template>
  <div class="login">
    <div class="left">
      <img src="../../assets/login/背景图片.png" alt="" />
    </div>
    <div class="right">
      <h1>教务系统</h1>
      <div class="login-box">
        <el-form
          :model="form"
          label-width="120px"
          label-position="top"
          ref="ruleFormRef"
          :rules="rules"
        >
          <el-form-item prop="identity">
            <el-radio-group v-model="form.identity">
              <el-radio label="教师" />
              <el-radio label="学生" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="学号/工号" prop="phoneNum">
            <el-input
              v-model="form.phoneNum"
              placeholder="请输入您的学号/工号"
              @keyup.enter="loginkeyupHandler"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入您的密码"
            class="password"
            :type="hide?'password':'text'"
              @keyup.enter="loginkeyupHandler"
            />
            <svg-icon @click="hideHandler" class="password-icon"  icon="exhibit" v-show="!hide"/>
            
            <svg-icon  @click="hideHandler" class="password-icon"  icon="hide" v-show="hide"/>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-top: 30px" @click="loginHandler"
              >登录</el-button
            >
          </el-form-item>
          <!-- TODO：后期开放注册，对老师发放内部验证码 -->
          <!-- <el-form-item>
						<el-button style="margin-top: 10px; background: #ffffff; opacity: 0.3" @click="register"
							>注册</el-button
						>
					</el-form-item> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 664px;

    background-color: #2ebba3;
    h1 {
      font-size: 36px;
      font-weight: 500;
      line-height: 48px;
      text-align: center;
      margin-top: 170px;
      color: #116052;
    }
    .login-box {
      margin: 60px auto;
      width: 260px;
      height: 300px;

      :deep(.el-form) {
        color: #606266;
        .el-radio__inner {
          width: 18px;
          height: 18px;
          background: #ffffff;
          opacity: 0.4;
          border: 1px solid #116052;
        }

        .el-input--suffix {
          .el-input__wrapper {
        
            .el-input__inner {
              background-color: transparent !important;
            }
          }
        }
        .el-radio__inner::after {
          width: 10px;
          height: 10px;
          background: #116052;
          opacity: 1;
        }
        .el-input__inner {
          width: 320px;
          background-color: transparent;
        }

        .el-radio__label {
          font-weight: 500;
          color: #116052;
          font-size: 20px;
        }

        .el-form-item__label {
          width: 100px;
          line-height: 39px;
          margin-bottom: 4px;
          margin-top: 10px;
          color: #116052;
          justify-content: space-between;
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
          height: 35px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 5px;
        }
        .el-form-item__content {
          min-width: 320px;
        }
.password{
  position: relative;

}
  .password-icon{
    position: absolute;
    top: 5px;
    right: 10px;
    width: 20px;
  }
        .el-button {
          width: 340px;
          height: 46px;
          background: #ffffff;
          opacity: 0.7;
          color: #606266;
          text-align: center;
          color: #116052;
        }
        .el-button:hover {
        background: #44FFDF;
          opacity: 0.7;
        }
        .el-button:not(.is-text, .is-link, .el-button--text) {
          border: 0;
        }
      }
    }
  }
}
</style>
