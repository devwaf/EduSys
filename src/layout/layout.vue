<script lang="ts" setup>
import LayoutHeader from "./layout-header.vue"
import LayoutContent from "./layout-content.vue"
</script>
<template>
	<div class="layout-container" id="app-main-content">
		<LayoutHeader />

		<LayoutContent />
	</div>
</template>
<style lang="scss">
@import "../style/base-color.scss";
@import "../style/layout.scss";
#app-main-content {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #e1e8e7;
}
</style>
