<script lang="ts"  setup>
import { reactive,onMounted, ref } from "vue";
import {ElMessageBox} from 'element-plus'
import SignalRAspNetCoreHelper from '../../utils/SignalRAspNetCoreHelper'
import {useNotice} from '../../store/notice'
const _useNotice = useNotice()
let notices = ref([])
let userId = localStorage.getItem("userId")
let isTeacher = localStorage.getItem("isTeacher") == '1'

let connect,connectNum = 0
const connectSocket = ()=>{
  // 初始化
  SignalRAspNetCoreHelper.initSignalR()
  abp.event.on("abp.notifications.received", (userNotification) =>{
    let flag = notices.value.some(s=>s.id == userNotification.notification.id)
    if(!flag){
      let data = {
        message:userNotification.notification.data.properties.Message
      }
      if(isTeacher){
        const getCount = (message)=>{
          let num = 0
          notices.value.forEach((item,index)=>{
            if(item.message == message){
              num+=item.count
              notices.splice(index,1)
            }
          })
          return num
        }
        data.count = getCount(data.message)
      }else{
        data.noticeId = userNotification.notification.id
      }
      notices.value.unshift(data)
    }
  })

  // connect.error((err)=>{
  //   console.error(err.toString());
  // })

  // 断开连接后尝试重新连接 
  // connect.disconnected(()=>{
  //   if(connectNum > 3) return
  //   connectSocket()
  //   connectNum++
  // })
}
const getNotices = ()=>{
  const call = (res)=>{
    notices.value = res.result
  }
  if(isTeacher){
    _useNotice.getTeacherNotice(userId).then(call)
  }else{
    _useNotice.getAllNotice(userId).then(call)
  }
  
}

const removeNotice = (item)=>{
  ElMessageBox.confirm("确定删除此消息么!",{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(()=>{
    const call = ()=>{
      getNotices()
    }
    if(isTeacher){
      let message = ""
      _useNotice.deleteTeacherNotice(userId,item.message).then(call)
    }else{
      _useNotice.deleteNotice(item.noticeId,userId).then(call)
    }
    
  }).catch(err=>{})
}

onMounted(()=>{
  connectSocket()
  getNotices()
})
</script>
<template>
  <div>
    <ul>
      <li class="main-li" v-for="(item,index) in notices" :key="index">
        <e style="margin-left: 20px"> {{item.message}}</e>
        <span class="count" v-if="isTeacher"> {{item.count}} </span>
        <svg class="icon main-li-icon" aria-hidden="true" @click="removeNotice(item)">
          <use xlink:href="#icon-CloseDefault" />
        </svg>
      </li>
    </ul>
  </div>
</template>
<style lang='scss'  scoped>
.main-li {
  position: relative;
  margin-bottom: 15px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-radius: 5px;
  border-left: 4px solid #ff7537;
  .main-li-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    width: 15px;
    height: 20px;
  }
  .count{
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #FF7537;
    text-align: center;
    background-color: rgba($color: #FF7537, $alpha: .16);
    border-radius: 50%;
  }
}
</style>
