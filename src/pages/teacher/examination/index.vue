<script lang="ts" setup>
import { reactive, ref } from "vue"
import { curriculum, curriculumSide } from "../../../utils/teacher"
import Home from "../../components/home.vue"
import SideList from "../../components/sideList.vue"
import Select from "../../../components/customSelect/customSelect.vue"
let curriculumList = reactive(curriculum)
let curriculumSideList = reactive(curriculumSide)
</script>
<template>
	<div class="examination-main">
		<div class="main-left">
			<Home :data="curriculumList"></Home>
		</div>
		<div class="main-right">
			<SideList :data="curriculumSideList"></SideList>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.examination-main {
	position: relative;
	padding: 20px;
	height: 88vh;
	overflow-y: auto;
	overflow-x: hidden;
	//   background-color: pink;
}
.examination-main::-webkit-scrollbar {
	display: none !important;
}

.main-left {
	display: flex;
	flex-wrap: wrap;
	width: 900px;
  margin-top: -10px;
}
.curriculum-title {
	display: flex;
	width: 160px;

	justify-content: space-between;
	align-items: center;
	height: 40px;

	margin-right: 100px;
	line-height: 40px;
	> span {
		display: inline-block;
		margin-left: 20px;
		font-size: 24px;
	}
}
.curriculum-box {
	padding: 15px;
	margin-right: 50px;
	margin-bottom: 40px;
	font-size: 18px;
	color: #646464;
	border-radius: 20px;
	background-color: #e1e8e7;
}
.curriculum {
	display: flex;
	margin-top: 20px;
}
.kesheicon {
	display: inline-block;
	width: 40px;
	height: 40px;
	font-size: 32px;
}
.jiantouico {
	font-size: 18px;
	color: #000;
}
.main-right {
	position: absolute;
	top: 200px;
	right: 30px;
	width: 300px;
	height: 600px;
	overflow-y: auto;
	.outline {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 50px;
		margin-bottom: 20px;
		> span {
			width: 72px;
		}
		.el-select {
			flex: 1;
		}
	}
	.main-li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		padding-right: 30px;
		height: 50px;
		line-height: 50px;
		background-color: #e1e8e7;
		border-radius: 5px;
		border-left: 4px solid #ff7537;
	}
}
.main-right::-webkit-scrollbar {
	display: none !important;
}
.right {
	.el-icon {
		height: 2em;
		width: 2em;
	}
	.account:hover,
	.quit:hover {
		display: flex;
		align-items: center;
		height: 100%;
		cursor: pointer;
		background-color: #1abc9c;
	}
}
</style>
