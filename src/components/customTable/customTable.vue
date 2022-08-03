<script lang="ts" setup>
import { defineProps } from "vue";
import TableColumn from "./cusotmColumn.vue";
const { options, data } = defineProps({
  options: {
    type: Array,
    require: true,
  },
  data: {
    type: Array,
    require: true,
  },
});
</script>

<template>
  <el-table v-bind="$attrs" :data="data" >
    <TableColumn
      v-for="(option, index) in options"
      :key="index"
      :prop="option.prop"
      :column="option"
    />

    <slot name="default"></slot>
  </el-table>
</template>

<style lang="scss" scoped>
:deep(.cell) {
  text-align: center;
}
</style>