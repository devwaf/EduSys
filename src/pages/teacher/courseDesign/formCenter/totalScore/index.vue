<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue"
import FormCom from "../components/index.vue"
let title = "总成绩表"
const props = defineProps({
	courseId: {
		type: String
	}
})
</script>
<template>
	<div>
		<FormCom :title="title" :courseId="props.courseId" :ordinaryFlag="true"></FormCom>
	</div>
</template>

<style lang="scss" scoped></style>
