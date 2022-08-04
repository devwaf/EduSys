<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import { reactive } from "vue";
import { service } from "../../../../api/service";
import { usePageAdministration } from "../../../../store/teacher/course/administration";
import { usePageCoursemanagement } from "../../../../store/teacher/course/coursemanagement";
import { usePageCurriculumInstall } from "../../../../store/teacher/courseDesign/coursedesignconfig";
import { usePageCard } from "../../../../store/teacher/course/card";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
let router = useRouter();
const _card = usePageCard();
const administration = usePageAdministration();
const coursemanagement = usePageCoursemanagement();
const _usePageCurriculumInstall = usePageCurriculumInstall();
const { administrationlist, curriculumList } = storeToRefs(administration);

administration.GetAllCourse();
administration.GetAllDesgin();

const managementData = reactive([]);
const Options = [
  { label: "课程名称", prop: "name" },
  { label: "创建时间", prop: "semester" },
];
const Options1 = [
  { label: "课设名称", prop: "name" },
  { label: "创建时间", prop: "semester" },
];
const edit = (row: any) => {
  console.log(row);
  router.push({
    name: "CourseManagement",
    params: { id: row },
  });
  coursemanagement.getId(row);
  _card.getId(row);
};

const curriculumListEdit = (row: any) => {
  console.log(row);
  router.push({
    name: "CourseDesignConfig",
    params: { id: row },
  });
  //  router.push(
  //   "/course/coursemanagement");
  _usePageCurriculumInstall.getId(row);
  _card.getId(row);
};
const delCurriculum = (id: any) => {
  administration.DeleteCourse(id);
  administration.GetAllDesgin();
};
const del = (id: any) => {
  administration.DeleteCourse(id);
  administration.GetAllCourse();
};
</script>
<template>
  <div id="outline">
    <CustomTable
      :data="administrationlist"
      :options="Options"
      border
      align="center"
      style="width: 740px"
    >
      <!-- -->
      <template #default>
        <el-table-column label="操作" width="140px">
          <template #default="scope">
            <div class="operation">
              <span class="edit" @click="edit(scope.row.id)">修改</span>
              <span class="sep">|</span>
              <span class="del" @click="del(scope.row.id)">删除</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </CustomTable>
    <CustomTable
      :data="curriculumList"
      :options="Options1"
      border
      align="center"
     style="width: 740px"
    >
      <template #default>
        <el-table-column label="操作" width="140px">
          <template #default="scope">
            <div class="operation">
              <span class="edit" @click="curriculumListEdit(scope.row.id)"
                >修改</span
              >
              <span class="sep">|</span>
              <span class="del" @click="delCurriculum(scope.row.id)">删除</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </CustomTable>
  </div>
</template>

<style lang="scss" scoped>
#outline {
  display: flex;
  justify-content: center;
  overflow: auto;
  padding: 20px;
  height: 92vh;
  padding-top: 80px;
  background-color: #fff;
  box-sizing: border-box;
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
      font-size: 16px;
      font-weight: 500;
      color: #ee5f66;
    }
    .sep {
      width: 20%;
      color: #a4a4a4;
    }
  }
}
</style>
