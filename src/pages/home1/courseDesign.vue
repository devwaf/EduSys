<script lang="ts" setup>
import Select from "@/components/customSelect/customSelect.vue";
import CustomTable from "@/components/CustomTable/CustomTable.vue";
import DefaultPage from "@/components/defaultPage/defaultPage.vue";
import { usePageHomeCourseDesign } from "../../store/teacher/home/courseDesign";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const _HomeCourseDesign = usePageHomeCourseDesign();
const {
  courseDesignList,
  curriculumList,
  outlineName,
  courseName,
  information,
  evaluateTable,
  scorRateHeader,
  proportion,
  disabled,
  id,
  examine,
} = storeToRefs(_HomeCourseDesign);
_HomeCourseDesign.GetAllDesgin();

const show = ref(true);
const valData = ref("");
const getRoute = () => {
  if (id.value == "") return;
  if (examine.value) return;
  valData.value = id.value;
  show.value = false;
  _HomeCourseDesign.GetOutline(id.value);
  _HomeCourseDesign.GetCourse();
  _HomeCourseDesign.GetAllScoreAchievement();
  _HomeCourseDesign.GetAllDesignObjective();
};
// 如果点击了查找，则重新进入页面，获取数据
const getLookup = getRoute();
// 选中的课设

const changeHandler = (val: any) => {
  console.log(val, "888888");
  valData.value = val;
  _HomeCourseDesign.GetOutline(val);
};
// 查看
const examineHandler = () => {
  if (!disabled.value) {
    show.value = false;
    // 课设信息
    _HomeCourseDesign.getExamineHanlder();
  } else {
    _HomeCourseDesign.Message();
  }
};

//   课设名称
const informationOptions = [
  { label: "课设名称", prop: "name" },
  { label: "课设类型", prop: "type" },
  { label: "课设负责人", prop: "supervisor" },
  { label: "课设大纲", prop: "outlineName" },
  { label: "学分", prop: "credit" },
  { label: "总学时", prop: "classDuration" },
  { label: "作业次数", prop: "homeWorkCount" },
  { label: "试验次数", prop: "textDuration" },
  { label: "试题数量", prop: "questionCount" },
];

// // 合计
interface SummaryMethodProps {
  columns: Object[];
  data: Object[];
}
const getSummaries = (param: SummaryMethodProps) => {
  console.log(param);
  let { columns, data } = param;
  const sums: string[] = [];

  columns.forEach((item, index) => {
    if (index === 0) {
      sums[index] = "合计";
    }
    if (item.label == "成绩比例(100%)") {
      let gredes = data.map((d) => d.gredeProportion);
      console.log(gredes, "999999");
      sums[index] = gredes.reduce((prev, curr) => {
        return prev + curr;
      }, 0);
      
    }
  });
  return sums;
};
</script>
<template>
  <div>
    <div class="courseDesign-top">
      <div>
        <span>课设名称：</span>
        <el-select
          v-model="valData"
          class="m-2"
          placeholder="Select"
          @change="changeHandler"
        >
          <el-option
            v-for="item in curriculumList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <button
          type="primary"
          size="small"
          class="button"
          @click.prevent="router.push('/coursedesign/coursedesignconfig')"
          >新建课设</button
        >
      </div>
      <div>
        <span>课设大纲：</span>
        <span>{{ outlineName }}</span>
        <button
          type="primary"
          size="small"
          class="button"
          @click.prevent="router.push('/coursedesign/outlineconfig')"
          >新建大纲</button
        >
      </div>
      <div>
        <span>开课学期：</span>
        <span>{{ courseName }}</span>

        <button
          size="small"
          type="primary"
          class="button button-box"
          @click.prevent="examineHandler"
          >查看</button
        >
      </div>
    </div>

    <div class="main">
      <DefaultPage v-if="show" />
      <div class="surface" v-else>
        <div class="curriculum">
          <h3>1.课设信息</h3>
          <CustomTable
            :data="information"
            border
            align="center"
            style="width: 100%"
            :options="informationOptions"
          >
          </CustomTable>
        </div>
        <div class="curriculum achievement">
          <h3>2.课设成绩组成比例</h3>
          <CustomTable :data="proportion" border style="width: 60%">
            <template #default>
              <el-table-column label="评审项目" align="center">
                <template #default="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column label="指标">
                <template #default="scope">
                  <ul>
                    <li
                      class="quota-box"
                      v-for="(item, index) in scope.row.achieveTarget"
                      :key="index"
                    >
                      {{ item.target }}
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column label="满分" align="center" width="100px">
                <template #default="scope">
                  <ul>
                    <li
                      class="quota-box"
                      v-for="item in scope.row.achieveTarget"
                      :key="item"
                    >
                      {{ item.score }}
                    </li>
                  </ul>
                </template>
              </el-table-column>
            </template>
          </CustomTable>
        </div>
        <div class="curriculum">
          <h3>3.课设目标达成考核方式及成绩评定对照表</h3>
          <CustomTable
            :data="evaluateTable"
            :summary-method="getSummaries"
            show-summary
            border
            style="width: 85%"
          >
            <template #default>
              <el-table-column label="课程目标" align="center">
                <template #default="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column label="支撑毕业要求" align="center">
                <template #default="scope">
                  <el-select
                    v-model="scope.row.graduationRequirement"
                    class="m-2"
                    placeholder="Select"
                    :disabled="true"
                  >
                    <el-option
                      v-for="item in targetList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="考核环节" align="center">
                <el-table-column
                  align="center"
                  v-for="(item, j) in scorRateHeader"
                  :label="item"
                  :key="j + 1"
                >
                  <template #default="scope">
                    {{ scope.row.scoreRate[j].power }}
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column label="成绩比例(100%)" align="center">
                <template #default="scope">
                  {{ scope.row.gredeProportion }}
                </template>
              </el-table-column>
            </template>
          </CustomTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.courseDesign-top {
  display: flex;
  justify-content: space-between;
  width: 1400px;
  height: 36px;
  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 50px;
    margin-left: 10px;
    font-size: 16px;
    > button {
      margin-left: 20px;
      width: 104px;
      height: 40px;
      line-height: 42px;
      text-align: center;
      background: #479fec;
      font-size: 14px;
      color: #fff;
      border-radius: 2px 2px 2px 2px;
      opacity: 1;
    }
    .button-box {
      width: 72px;
      height: 40px;
      background: #2ebba3;
    }
    > span {
      font-size: 16px;
      color: #646464;
    }
  }
}
// .courseDesign-top {
//   display: flex;
//   justify-content: space-between;
//   width: 70%;
//   > div {
//     flex: 1;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-left: 20px;
//     font-size: 16px;
//     color: #646464;
//   }
// }

// :deep(.el-table th.el-table__cell>.cell) {
//   color: #646464 !important;
// }

.main {
  // margin: 10px;
  padding: 20px;
  // width: 95%;
  // background-color: pink;
  :deep(.el-table th.el-table__cell > .cell) {
    color: #646464 !important;
  }
  :deep(.el-table thead.is-group th.el-table__cell) {
    background-color: #fff;
  }
}
.surface {
  padding: 20px;
  width: 90%;
  border: 1px solid #d8d8d8;
  background: #fcfcfc;
}
.curriculum {
  margin-bottom: 40px;
  h3 {
    height: 60px;
    font-size: 18px;
  
  }
}
.achievement {
  :deep(.el-table) {
    .el-table__row {
      .el-table__cell {
        padding: 0;
      }
      .cell {
        padding: 0;
      }
    }
  }
  .quota-box {
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #ebeef5;
  }
  li:last-child {
    border: 0;
  }
}
</style>
