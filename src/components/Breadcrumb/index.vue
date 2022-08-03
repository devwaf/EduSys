<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
let router = useRouter();
defineProps<{ data: Array<string> }>();

const routerPush = (path: string) => {
  path = path[0].toUpperCase() + path.substr(1);
  console.log(path, "11111111111111");

  if (path == "Coursedesign") {
    path = "CourseDesign";
  }
  if (path == "Outline") return;
  if (path == "Coursedesign") return;
  if (path == "Course") return;
  if (path == "Examination") return;
  if (path == "Curriculum") return;
  router.push({ name: path });
};
</script>
<template>
  <div id="breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in data"
        :key="index"
        @click="routerPush(item.path)"
        >{{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
#breadcrumb {
  height: 38px;
  width: 100%;
  background-color: #f5f5f5;
  :deep(.el-breadcrumb) {
    height: 38px;
    margin-left: 30px;
    > span {
      height: 38px;
      font-size: 16px;
      cursor: pointer;
    }
    .el-breadcrumb__inner {
      color: #646464;
      font-family: Source Han Sans CN-Normal;
    }
    .el-breadcrumb__inner:hover {
      color: #2ebba3;
    }
    .is-link {
      font-weight: normal;
    }
    .is-link:hover {
      color: #2ebba3;
    }
    span:last-child {
      .el-breadcrumb__inner {
        color: #2ebba3;
      }
    }
  }
}
</style>
