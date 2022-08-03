<script lang="ts" setup>
import { ref, reactive,defineProps } from "vue"
import FormCom from "../components/index.vue"
let title = "课程报告"
const props = defineProps({
	courseId: {
		type: String
	}
})
</script>
<template>
	<div>
		<FormCom :title="title" :courseId="props.courseId" :ordinaryFlag="false"></FormCom>
	</div>
</template>

<style lang="scss" scoped></style>
