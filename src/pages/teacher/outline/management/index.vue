<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import { reactive } from "vue";
import { service } from "../../../../api/service";
import { usePageOutlinemanagement } from "../../../../store/teacher/outlinemanagement";
import {usePageOutline} from  '../../../../store/teacher/outline/outline'
import {usePageStoreOutLineConfig} from '../../../../store/teacher/outLineConfig'
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
let router = useRouter();
const outlineManagement = usePageOutlinemanagement();
const _usePageOutline=usePageOutline()
const _usePageStoreOutLineConfig=usePageStoreOutLineConfig()
const { Outlinemanagementlist, courseDesignList } =
  storeToRefs(outlineManagement);

outlineManagement.GetAllCourseOutline();
outlineManagement.GetAllDesignOutline();

const managementOptions = [
  { label: "课程大纲名称", prop: "name" },
  { label: "创建时间", prop: "creationTime" },
];
const courseDesignOptions = [
  { label: "课设大纲名称", prop: "name" },
  { label: "创建时间", prop: "creationTime" },
];
// 课程修改
const editOutline = (row: any) => {
  // console.log(row,'啦啦啦啦啦');
  _usePageOutline.getID(row)
  router.push({
    name: "Addoutline",
    params: { id: row },
  });
};

// 课设大纲修改
const editCourseDesign = (row: any) => {
  console.log(row,'啦啦啦啦啦');
   _usePageStoreOutLineConfig.getID(row)
  router.push({
    name: "Outlineconfig",
    params: { id: row },
  });
};
const del = (row: any) => { 
  console.log(row);
};
// const to = () => {
//   const res = service({ path: "/app/Outline/GetAllCourseOutline" });
//   console.log(res, "ererer");
// };
const delOutline = (id: String) => {
  outlineManagement.DeleteCourse(id);
  console.log(id, "大纲id");
  outlineManagement.GetAllCourseOutline();
};
</script>

<template>
  <div id="outline">
    <CustomTable
      :data="Outlinemanagementlist"
      :options="managementOptions"
      border
      align="center"
      style="width: 740px"
    >
      <template #default>
        <el-table-column label="是否完整" width="130px">
          <template #default="scope">
            <span v-if="scope.row.isComplete">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <div class="operation">
              <span class="edit" @click="editOutline(scope.row.id)">修改</span>
              <span class="sep">|</span>
              <span class="del" @click="delOutline(scope.row.id)">删除</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </CustomTable>
    <CustomTable
      :data="courseDesignList"
      :options="courseDesignOptions"
      border
      align="center"
      style="width: 740px"
    >
      <template #default>
        <el-table-column label="是否完整" width="130px">
          <template #default="scope">
            <span v-if="scope.row.isComplete">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <div class="operation">
              <span class="edit" @click="editCourseDesign(scope.row.id)"
                >修改</span
              >
              <span class="sep">|</span>
              <span class="del" @click="delOutline(scope.row.id)">删除</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </CustomTable>
  </div>
</template>

<style lang="scss" scoped>
#outline {
  box-sizing: border-box;
  padding: 20px;
  // height: 100%;
  height: 92vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-color: #fff;
  :deep(.cell) {
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    color: #646464;
    overflow: hidden; /*内容超出后隐藏*/

    text-overflow: ellipsis; /* 超出内容显示为省略号 */

    white-space: nowrap; /* 文本不进行换行 */
  }
  .operation {
    display: flex;
    justify-content: space-between;
    span {
      text-align: center;
    }
    .edit,
    .del {
      width: 40%;
      cursor: pointer;
    }
    .edit {
      color: #2ebba3;
    }
    .del {
      color: #ee5f66;
    }
    .sep {
      width: 20%;
      color: #a4a4a4;
    }
  }
}
</style>
