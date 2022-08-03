<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import { reactive } from "vue";

const managementData = reactive([
  {
    name: "2021课程",
    date: "2021.09.10",
  },
  {
    name: "2021课程",
    date: "2021.09.10",
  },
  {
    name: "2021课程",
    date: "2021.09.10",
  },
  {
    name: "2021课程",
    date: "2021.09.10",
  },
]);
const edit = (row: any) => {
  console.log(row);
};
const del = (row: any) => {
  console.log(row);
};
</script>
<template>
  <div id="outline">
    <CustomTable
      :data="managementData"
      border
      align="center"
      style="width: 540px"
    >
      <template #default>
        <el-table-column label="课程名称" width="200px">
          <template #default="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="创建名称" width="200px">
          <template #default="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template #default="scope">
            <div class="operation">
              <span class="edit" @click="edit(scope.row)">修改</span>
              <span class="sep">|</span>
              <span class="del" @click="del(scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </CustomTable>
  </div>
</template>

<style lang="scss" scoped>
#outline {
  width: 100%;
  height: 88vh;
  box-sizing: border-box;
  // padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  :deep(.cell) {
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    color: #646464;
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
