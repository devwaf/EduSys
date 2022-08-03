<script lang="ts" setup>
import Home from "@/pages/components/home.vue";
import { curriculum } from "../../utils/student";
import { reactive, ref } from "vue";
let curriculumList = reactive(curriculum);
</script>

<template>

  <div class="main">
    <div class="main-left">
      <Home :data="curriculumList"></Home>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  padding: 20px;
}
.main-left {
  height: 120px;
  display: flex;
}
.curriculum-box {
  width: 200px;
  height: 100px;
  padding: 20px;
  margin-right: 30px;
  font-size: 18px;
  color: #57c8b5;
  border-radius: 20px;
  background-color: #e1e8e7;
}
.kesheicon {
  width: 30px;
  height: 30px;
  //   color: #57c8b5;
  font-size: 32px;

  // background-color: #57c8b5;
}
.jiantouico {
  font-size: 18px;
  color: #000;
}




</style>
