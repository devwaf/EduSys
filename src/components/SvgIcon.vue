<template>
  <svg aria-hidden="true" class="svg-icon" :class="props.class">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
const props =
  defineProps<{
    prefix: string;
    icon: string;
    color: string;
    class: string | Array<string> | Object;
  }>();
let symbolId = computed(() => `#${props.prefix || "icon"}-${props.icon}`);
</script>

<style>
.svg-icon {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>