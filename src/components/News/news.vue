<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue"
import { ElMessageBox } from "element-plus"
import { useRouter } from "vue-router"
import SignalRAspNetCoreHelper from "../../utils/SignalRAspNetCoreHelper"
import { useNotice } from "../../store/notice"

// import { defineProps } from "vue";
// const { prop } = defineProps({
//   prop: {
//     type: Array,
//     require: true,
//   },
// });

const router = useRouter()
const activeName = ref("first")
const _useNotice = useNotice()
let notices = ref([])
let userId = localStorage.getItem("userId")
let isTeacher = localStorage.getItem("isTeacher") == "1"

let connect,
	connectNum = 0
const connectSocket = () => {
	// 初始化
	SignalRAspNetCoreHelper.initSignalR()
	abp.event.on("abp.notifications.received", userNotification => {
		let flag = notices.value.some(s => s.id == userNotification.notification.id)
		if (!flag) {
			let data = {
				message: userNotification.notification.data.properties.Message
			}
			if (isTeacher) {
				const getCount = message => {
					let num = 0
					notices.value.forEach((item, index) => {
						if (item.message == message) {
							num += item.count
							notices.splice(index, 1)
						}
					})
					return num
				}
				data.count = getCount(data.message)
			} else {
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
const getNotices = () => {
	const call = res => {
		notices.value = res.result
	}
	if (isTeacher) {
		_useNotice.getTeacherNotice(userId).then(call)
	} else {
		_useNotice.getAllNotice(userId).then(call)
	}
}

const removeNotice = item => {
	ElMessageBox.confirm("确定删除此消息么!", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			const call = () => {
				getNotices()
			}
			if (isTeacher) {
				let message = ""
				_useNotice.deleteTeacherNotice(userId, item.message).then(call)
			} else {
				_useNotice.deleteNotice(item.noticeId, userId).then(call)
			}
		})
		.catch(err => {})
}

onMounted(() => {
	connectSocket()
	getNotices()
})
</script>

<template>
	<div class="news-main">
		<div class="news-main-top">作业</div>
		<div class="task">
			<ul>
				<li v-for="(item, index) in notices" :key="index" @click="router.push(item.router)">
					<div class="class">{{ item.message }}</div>
					<div class="time">{{ item.creationTime }}</div>
					<div class="correct">{{ item.state }}</div>
					<div class="number" v-if="isTeacher">{{ item.count }}</div>
				</li>
				<!-- <li>{{notices}}</li> -->
			</ul>
		</div>

		<div class="data">共{{ notices.length }}条通知</div>
	</div>
</template>

<style lang="scss" scoped>
.news-main {
	.news-main-top {
		height: 40px;

		line-height: 40px;
		font-weight: 500;
		color: #2ebba3;
		font-size: 14px;
		text-align: center;
		background-color: #f5f5f5;
	}

	.task {
		width: 100%;
		ul {
			width: 100%;
			max-height: 200px;
			overflow-y: auto;

			li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20px;
				color: #646464;
				height: 42px;
				// height: 300px;
				line-height: 42px;
				border-top: 1px solid #f5f5f5;
        cursor: pointer;
				div {
					font-size: 14px;
					margin-right: 10px;
				}
				div:last-child {
					margin-right: 0;
				}
				.time {
					width: 75px;

					color: #a4a4a4;
				}
				.class {
					flex: 5;
					color: #646464;
				}
				.correct {
					width: 42px;
					color: #ff7537;
					font-weight: 500;
				}
				.number {
					width: 32px;
					height: 20px;
					color: #ee5f66;
					text-align: center;
					font-size: 12px;
					line-height: 20px;
					background: #fdebec;
					border-radius: 10px 10px 10px 10px;
					opacity: 1;
				}
			}
			li:last-child {
				border-bottom: 1px solid #f5f5f5;
			}
		}
	}
	ul::-webkit-scrollbar {
		display: none !important;
	}
	.data {
		line-height: 30px;
		color: #bcbebf;
		font-size: 12px;
		text-align: center;
		background: #f5f5f5;
	}
}
</style>
