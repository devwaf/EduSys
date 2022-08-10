<script lang="ts" setup>
import TeacherCurriculum from "./teacherCurriculum.vue";
import CourseDesign from "./courseDesign.vue";
import { ref,watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePageHome } from "../../store/teacher/home/home";

import { storeToRefs } from "pinia";
const _Home = usePageHome();


let router = useRouter();
let activeName = ref("first");
watch(
  () => router.currentRoute.value,
  () => {
    console.log(router.currentRoute.value.path,"路由变化了");
    _Home.getExamine(router.currentRoute.value.path)
  }
);
</script>

<template>
  <div>
    <div class="container-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程" name="first">
          <TeacherCurriculum></TeacherCurriculum>
        </el-tab-pane>
        <el-tab-pane label="课设" name="second">
          <CourseDesign></CourseDesign>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-main {
  padding: 20px;
  height: 90vh;
  overflow: auto;
  background-color: #fff;
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
    font-size: 16px;
    // color: #2ebba3;
    text-align: center;
    &:hover {
      color: #2ebba3;
    }
  }
  .is-active {
    color: #2ebba3;
  }
}
}


</style>
