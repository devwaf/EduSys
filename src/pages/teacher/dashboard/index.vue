<script lang="ts" setup>
import { ref } from "vue"
let activeName = ref("first")
</script>
<template>
	<div class="container-main">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="课程" name="first"><teacherCurriculum></teacherCurriculum></el-tab-pane>
			<el-tab-pane label="课设" name="second">课设</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style lang="scss" scoped>
.container-main {
	padding: 20px;
	width: 100%;
	height: 100%;
	background-color: #fff;
}
:deep(.el-tabs__nav) {
	margin-left: 50px;
	.el-tabs__active-bar .is-top {
		width: 80px;
	}
	.el-tabs__active-bar {
		background-color: #2ebba3;
	}
	.el-tabs__item {
		width: 100px;
		// color: #2ebba3;
		text-align: center;
		:hover {
			color: #2ebba3;
		}
	}
	.is-active {
		color: #2ebba3;
	}
}
</style>
