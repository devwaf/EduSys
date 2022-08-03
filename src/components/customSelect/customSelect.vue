<script lang="ts" setup>
import { defineProps, ref, defineEmits, useAttrs, toRefs,watch } from "vue"

interface ILocaldata {
	value: string | number
	label: string
}
const $props =defineProps<{ localdata: ILocaldata; modelValue: String }>()
const _emit = defineEmits(["update:modelValue"])

const _attrs = useAttrs()

let value = ref($props.modelValue)
watch(toRefs($props).modelValue,(nv)=>{
	value.value = nv
})
const selectChange = (value: string | number) => {
	_emit("update:modelValue", value)
}
</script>

<template>
	<el-select v-model="value" v-bind="_attrs" @change="selectChange">
		<el-option :key="index" v-for="(local, index) in localdata" v-bind="{ ...local }"></el-option>
	</el-select>
</template>
<style lang="scss" scoped>
:deep(.el-input__wrapper) {
	margin: 5px;
}
</style>
