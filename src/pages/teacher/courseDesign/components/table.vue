<script lang="ts" setup>
import { ref, defineProps, reactive } from "vue";
import Select from "@/components/customSelect/customSelect.vue";

// import TableColumn from "./cusotmColumn.vue";
const { data } = defineProps({
  data: {
    type: Array,
    require: true,
  },
});
// let list = reactive(data);
console.log(data, 3456788);

let value = ref("1");
</script>
<template>
  <div class="box" v-for="item in data" :key="item">
    <div class="report-left">{{ item.report }}</div>
    <div class="report-right">
      <!-- {{ item.reportList }} -->
      <ul>
        <li
          class="report-right-li"
          v-for="reprot in item.reportList"
          :key="reprot"
        >
          <div class="report-right-li-box" style="flex: 5">
            <Select :localdata="reprot.reportTitle"></Select>
          </div>
          <div
            class="report-right-li-box"
            style="
              flex: 1.5;
              border-right: 1px solid #ebeef5;
              border-left: 1px solid #ebeef5;
            "
          >
            {{ reprot.fraction }}
          </div>
          <div class="report-right-li-box" style="flex: 1">删除</div>
        </li>

        <li class="report-right-li-add" style="color: #2ebaa2">添加</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  // width: 300px;
  border-bottom: 1px solid #ebeef5;
}
.box {
  //   height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  //   width: 100%;
  //   border-right: 1px solid #ebeef5;
}
.report-left,
.defence-left {
  width: 120px;
  text-align: center;
  //   margin: auto;
  //   margin-left: 30px;
  //   height: 100px;
  //   border-right: 1px solid #ebeef5;
}
.report-right,
.defence-right {
  flex: 1;
  ul {
    width: 100%;
  }
}
.report-right-li {
  display: flex;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;

  width: 100%;
}
.report-right-li-box {
  text-align: center;
  padding: 5px;
}
.report-right-li-add {
  text-align: center;
  padding: 5px;
  border-left: 1px solid #ebeef5;
}
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0;
}
div {
  box-sizing: border-box;
  //   border: 1px solid #ebeef5;
}
</style>