<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import CustomSelect from "../../components/customSelect/customSelect.vue";
import CustomTable from "@/components/CustomTable/CustomTable.vue";
import DefaultPage from "@/components/defaultPage/defaultPage.vue";
import { usePageCurriculum } from "../../store/teacher/home/teacherCurriculum";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const _HomeCurriculum = usePageCurriculum();
const {
  curriculumList,
  outline,
  weightDate,
  semester,
  achievement,
  outlineName,
  courseName,
  evaluateTable,
  examinationTable,
  tableData,
  courseList,
  examinationForm,
  disabled,
  id,

  examine,
} = storeToRefs(_HomeCurriculum);
_HomeCurriculum.GetAllCourse();
const curriculumOptions = [
  { label: "课程名称", prop: "name" },
  { label: "课程类型", prop: "type" },
  { label: "课程负责人", prop: "supervisor" },
  { label: "课程大纲", prop: "outlineName" },
  { label: "学分", prop: "credit" },
  { label: "总学时", prop: "classDuration" },
  { label: "作业次数", prop: "homeWorkCount" },
  { label: "试验次数", prop: "textDuration" },
  { label: "试题数量", prop: "questionCount" },
];
const show = ref(true);
const valData = ref("");
const getRoute = () => {
  if (id.value == "") return;
  if (examine.value) return;

  valData.value = id.value;
  show.value = false;
  _HomeCurriculum.GetOutline(id.value);
  _HomeCurriculum.GetAllScoreWeight();
  _HomeCurriculum.GetAllCourseObjective();
  _HomeCurriculum.GetAllTestQuestion();
  _HomeCurriculum.GetAllSwDetail();
  _HomeCurriculum.GetCourse();
};

const yyy = getRoute();

// 选择课程
const change = (val: any) => {
  valData.value = val;
  _HomeCurriculum.GetOutline(val);
};
// 查看

const examineHanlder = () => {
  if (!disabled.value) {
    show.value = false;
    _HomeCurriculum.getExamineHanlder();
  } else {
    _HomeCurriculum.Message();
  }
};
// watch(
//   () => router.currentRoute.value,
//   () => {
//     // _Alloutline.leavePage(router.currentRoute.value.path);
//     console.log(router.currentRoute.value.path, "路由变化了");
//     _HomeCurriculum.getRoute(router.currentRoute.value.path, valData.value);
//   }
// );
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
    if (item.label == "比例%") {
      let gredes = data.map((d) => d.swDetails);
      console.log(gredes, "999999");
      let num = 0;
      let ll = gredes.map((i) => i);
      gredes.forEach((item) => {
        console.log(item, 7777777777);
        item.forEach((prev) => {
          console.log(prev.swDetailPower, "666666666666666");
          num += prev.swDetailPower;
          console.log(num);
          sums[index] = num;
        });
      });
    }
  });
  return sums;
};
</script>
<template>
  <div class="course">
    <div class="course-top">
      <div>
        <span>课程名称：</span>
        <el-select
          v-model="valData"
          class="m-2"
          placeholder="Select"
          @change="change"
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
          @click="router.push('/course/coursemanagement')"
        >
          新建课程
        </button>
      </div>
      <div>
        <span>课程大纲：</span>
        <span> {{ outlineName }} </span>
        <button
          type="primary"
          size="small"
          class="button"
          @click="router.push('/outline/addoutline')"
        >
          新建大纲
        </button>
      </div>
      <div>
        <span>开课学期：</span>
        <span> {{ courseName }} </span>
        <button
          size="small"
          type="primary"
          class="button button-box"
          @click="examineHanlder"
        >
          查看
        </button>
      </div>
    </div>

    <div class="main">
      <DefaultPage v-if="show" />
      <div class="surface" v-else>
        <div class="curriculum">
          <h3>1.课程信息</h3>
          <CustomTable
            :data="tableData"
            border
            style="width: 100%"
            :options="curriculumOptions"
          >
          </CustomTable>
        </div>
        <div class="curriculum">
          <h3>2.课程成绩组成比例</h3>

          <div class="achievement">
            <div class="achievement-text">成绩权重：</div>

            <table border="1" v-for="(item, index) in achievement" :key="index">
              <tr>
                <th>{{ item.name }}</th>
              </tr>
              <tr>
                <td>{{ item.power }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="curriculum">
          <h3>3.课程目标达成考核方式及成绩评定对照表</h3>
          <CustomTable :data="evaluateTable" border style="width: 80%">
            <template #default>
              <el-table-column label="课程目标" align="center">
                <template #default="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column label="课程内容" align="center">
                <template #default="scope">
                  <span class="text-left">
                    {{ scope.row.content }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="支撑毕业要求" align="center">
                <template #default="scope">
                  {{ scope.row.graduationRequirement }}
                </template>
              </el-table-column>
            </template>
          </CustomTable>
        </div>

        <div class="curriculum collocation">
          <h3>4.成绩权重配置</h3>

          <CustomTable
            class="table3"
            :data="weightDate"
            border
            :summary-method="getSummaries"
            show-summary
            style="width: 60%; margin-top: 20px"
          >
            <template #default>
              <el-table-column label="权重">
                <template #default="scope">
                  {{ scope.row.scoreWeightName }}
                </template>
              </el-table-column>
              <el-table-column label="考核方式">
                <template #default="scope">
                  <ul class="subtopic-main">
                    <li
                      class="subtopic-box"
                      v-for="(item, index) in scope.row.swDetails"
                      :key="index"
                    >
                      {{ item.swDetailName }}
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column label="比例%" sortable>
                <template #default="scope">
                  <ul class="subtopic-main">
                    <li
                      class="subtopic-box"
                      v-for="(item, index) in scope.row.swDetails"
                      :key="index"
                    >
                      {{ item.swDetailPower }}
                    </li>
                  </ul>
                </template>
              </el-table-column>

              <el-table-column label="课程目标" align="center">
                <template #default="scope">
                  <ul class="subtopic-main">
                    <li
                      class="subtopic-box"
                      v-for="(item, index) in scope.row.swDetails"
                      :key="index"
                    >
                      <el-select
                        v-model="item.courseObjectiveId"
                        class="m-2"
                        placeholder="Select"
                        @change="ChangeCourse(item)"
                        :disabled="true"
                      >
                        <el-option
                          v-for="item in courseList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </li>
                  </ul>
                </template>
              </el-table-column>
            </template>
          </CustomTable>
        </div>

        <div class="curriculum tab-container">
          <h3>5.考试配置</h3>

          <el-form :model="examinationForm" label-width="120px">
            <div class="examination-top">
              <el-form-item label="课程名称：">
                <el-input v-model="examinationForm.name" :disabled="true" />
              </el-form-item>
              <el-form-item label="试题数量：">
                <el-input v-model="examinationForm.quantity" :disabled="true" />
                &nbsp;&nbsp; <span>题</span>
              </el-form-item>
              <el-form-item label="总分：">
                <el-input v-model="examinationForm.score" :disabled="true" />
                &nbsp;&nbsp;<span>分</span>
              </el-form-item>
            </div>
            <CustomTable :data="examinationTable" border style="width: 95%">
              <template #default>
                <el-table-column label="题号" align="center">
                  <template #default="scope">
                    {{ scope.row.titleNum }}
                  </template>
                </el-table-column>
                <el-table-column label="题型" align="center">
                  <template #default="scope">
                    {{ scope.row.type }}
                  </template>
                </el-table-column>
                <el-table-column label="分值" align="center">
                  <template #default="scope">
                    {{ scope.row.score }}
                  </template>
                </el-table-column>
                <el-table-column label="小题号" align="center">
                  <template #default="scope">
                    <ul
                      class="tab-container-main"
                      v-for="(item, index) in scope.row.question"
                      :key="index"
                    >
                      <li class="examination-box">
                        {{ index + 1 }}
                        <!-- {{ item.titleNum }} -->
                      </li>
                    </ul>
                  </template>
                </el-table-column>
                <el-table-column label="每小题分值" align="center">
                  <template #default="scope">
                    <ul
                      class="tab-container-main"
                      v-for="item in scope.row.question"
                      :key="item"
                    >
                      <li class="examination-box">
                        {{ item.score }}
                      </li>
                    </ul>
                  </template>
                </el-table-column>
                <el-table-column label="课程目标" align="center">
                  <template #default="scope">
                    <ul
                      class="tab-container-main"
                      v-for="item in scope.row.question"
                      :key="item"
                    >
                      <li class="examination-box">
                        {{ item.courseObjectiveName }}
                      </li>
                    </ul>
                    <span v-show="scope.row.courseObjectiveId"
                      >{{ scope.row.courseObjectiveId }}
                    </span>
                  </template>
                </el-table-column>
              </template>
            </CustomTable>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course {
  .course-top {
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
      :deep(.el-button) {
        border-radius: 0 !important;
      }
      > button {
        margin-left: 20px;
        width: 104px;
        height: 40px;
        line-height: 42px;
        font-size: 14px;
        text-align: center;
        background: #479fec;
        color: #fff;
        // border-radius: 2px 2px 2px 2px;
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
}

.main {
  padding: 20px;
  // background-color: pink;
  :deep(.el-table th.el-table__cell > .cell) {
    color: #646464 !important;
  }
}
.surface {
  margin-top: 30px;
  padding: 20px;
  width: 90%;
  // height: 100%;
  border: 1px solid #d8d8d8;
  background: #fcfcfc;
}
.achievement {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  .achievement-text {
    width: 80px;
    font-size: 16px;
    color: #646464;
  }

  table {
    border-spacing: 0;
    color: #646464;
    border-collapse: collapse;
  }
  .achievement-table,
  td {
    width: 140px;
    height: 80px;
    border: 1px solid #ebeef5;
  }
  th {
    text-align: center;
    height: 40px;
    border: 1px solid #ebeef5;
    // background: #ebeef5;
  }
  td {
    text-align: center;
    height: 40px;
    border: 1px solid #ebeef5;
  }
}
.curriculum {
  margin-bottom: 30px;
  h3 {
    margin-bottom: 24px;
    font-size: 18px;
    color: #646464;
  }
}
.collocation,
.tab-container {
  :deep(.el-table) {
    .el-table__row {
      .el-table__cell {
        padding: 0;
        height: 40px;
      }
      .cell {
        padding: 0;
      }
    }
  }
}
.collocation {
  .subtopic-main {
    li:last-child {
      border-bottom: 0;
    }
  }
}
.text-left {
  display: inline-block;
  text-align: left;
}
.subtopic-main {
  width: 100%;
  height: 100%;
}
.subtopic-box {
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
}

.tab-container {
  .tab-container-main {
    width: 100%;
    height: 100%;

    // li:nth-child(1) {
    //   border-top: 0;
    // }
  }
}
.examination-box {
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
}
.examination-top {
  width: 70%;
  display: flex;
  // flex: 1;
  :deep(.el-form-item__content) {
    flex-wrap: nowrap;
  }
}
</style>
