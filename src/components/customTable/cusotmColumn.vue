<script lang="ts" setup>
import {defineProps} from 'vue'
const {prop,column} = defineProps({
    prop:{
        type:Array,
        require:true
    },
    column:{
        type:Object,
        require:true
    }
})
</script>

<template>

   <el-table-column :label="column.label" v-bind="$attrs">

        <template #default="scope">
            <template v-if="column.children && column.children.length>0">
                <!-- {{column.children}} -->
                <cusotmColumn :key="index" v-for="(option,index) in column.children" :prop="option.prop" :column="option" />
            </template>
           <slot :name="prop" :column="scope.row[prop]" v-else>
                <span class="column"> {{scope.row[prop]}} </span>
            </slot>
        </template>
   </el-table-column>
</template>

<style lang="scss" scoped>
    :deep(.cell) {
  text-align: center;
}
</style>