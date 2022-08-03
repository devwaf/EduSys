<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import CustomSelect from "@/components/customSelect/customSelect.vue";
import { outline, outlineTable } from "@/utils/teacher.ts";

import { ref, reactive, toRefs } from "vue";

let outlineList = reactive(outline);
let outlineTableOptions = reactive(outlineTable);
const outlineName = ref("");

const formInline = reactive({
  courseName: "自动导入",
  subjectNum: "自动统计",
  sum: "100",
});
// 毕业要求

const outlineData1 = reactive([
  {
    percentage1: "25%",
    percentage2: "25%",
    percentage3: "25%",
    percentage4: "25%",
  },
  {
    percentage1: 1,
    percentage2: 2,
    percentage3: 2,
    percentage4: 2,
  },
]);
const outlineOptions1 = reactive([
  {
    label: "平时表现",
    prop: "percentage1",
  },
  {
    label: "平时作业",
    prop: "percentage2",
  },
  {
    label: "实验",
    prop: "percentage3",
  },
  {
    label: "期末考试",
    prop: "percentage4",
  },
]);
const outlineData2 = reactive([
  {
    target: "课程目标一",
    req: "",
    modeProportion: {
      performance: 5,
      task: 5,
      experiment: 10,
      finalExam: 15,
    },
    aproportion: "25",
  },
  {
    target: "课程目标二",
    req: "",
    modeProportion: {
      performance: 0,
      task: 5,
      experiment: 5,
      finalExam: 15,
    },
    aproportion: "20",
  },
]);
const outlineData3 = reactive([
  {
    name: "第一大题",
    type: "选择题",
    score: "20分",
    subtopi: [
      {
        subtopicNo: "1.1",
        subtopicScore: 2,
        target: "",
      },
      {
        subtopicNo: "1.2",
        subtopicScore: 2,
        target: "",
      },
    ],
  },
]);

const reqChange = (val) => {
  console.log(val);
};
</script>
<template>
  <div id="outline">
    <div class="outlineName">
      <span>课程大纲名称：</span>
      <el-input v-model="outlineName" placeholder="请输入大纲名称" />
    </div>
    <div class="tableBox">
      <div class="title">1.课程成绩组成比例</div>
      <div class="content">
        <div class="explain">成绩权重：</div>
        <CustomTable
          class="table1"
          :data="outlineData1"
          :options="outlineOptions1"
          border
          align="center"
          style="height: 150px"
        >
          <template #default>
            <el-table-column label="操作" width="140px" :rowspan="2">
            </el-table-column>
          </template>
        </CustomTable>
      </div>
    </div>

    <div class="tableBox">
      <div class="title">2.课程目标达成考核方式及成绩评定对照表</div>
      <div class="content">
        <CustomTable
          class="table2"
          :data="outlineData2"
          border
          align="center"
          style="width: 80%"
          show-summary
          sum-text="合计"
          :summary-method="getSummaries"
        >
          <template #default>
            <el-table-column label="课程目标" align="center">
              <template #default="scope">
                {{ scope.row.target }}
              </template>
            </el-table-column>
            <el-table-column label="支撑毕业要求" align="center">
              <template #default="scope">
                <CustomSelect
                  @change="reqChange"
                  v-model="scope.row.req"
                  :localdata="targetList"
                  placeholder="请选择毕业要求"
                ></CustomSelect>
              </template>
            </el-table-column>
            <el-table-column label="考核方式及比例" align="center">
              <el-table-column label="平时表现" align="center" width="100px">
                <template #default="scope">
                  {{ scope.row.modeProportion.performance }}
                </template>
              </el-table-column>
              <el-table-column label="平时作业" align="center" width="100px">
                <template #default="scope">
                  {{ scope.row.modeProportion.task }}
                </template>
              </el-table-column>
              <el-table-column label="实验" align="center" width="100px">
                <template #default="scope">
                  {{ scope.row.modeProportion.experiment }}
                </template>
              </el-table-column>
              <el-table-column label="期末考试" align="center" width="100px">
                <template #default="scope">
                  {{ scope.row.modeProportion.finalExam }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="成绩比例(100%)" align="center">
              <template #default="scope">
                {{ scope.row.aproportion }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80px">
              <i class="iconfont icon-tianxieicon"></i>
            </el-table-column>
          </template>
        </CustomTable>
      </div>
    </div>

    <div class="tableBox">
      <div class="title">3.考试配置</div>
      <div class="content">
        <el-form :inline="true" :model="formInline" class="formInline">
          <el-form-item label="课程名称：">
            <el-input v-model="formInline.courseName"></el-input>
          </el-form-item>
          <el-form-item label="试题数量：">
            <el-input v-model="formInline.subjectNum"></el-input>
            <span class="tail">题</span>
          </el-form-item>
          <el-form-item label="总分：">
            <el-input v-model="formInline.sum" class="sumIpt"></el-input>
            <span class="tail">分</span>
          </el-form-item>
        </el-form>

        <CustomTable
          class="table3"
          :data="outlineList"
          border
          :options="outlineTableOptions"
          align="center"
          style="width: 80%; margin-top: 20px"
        >
          <!-- <template #default>
            <el-table-column label="小题号" align="center">
              <template #default="scope">
								{{ scope.row.ti }}
							</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80px">
              <i class="iconfont icon-tianxieicon"></i>
            </el-table-column>
          </template> -->
          
           
          </template>
       
        </CustomTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#outline {
  width: 100%;
  height: 100vh;
  background-color: white;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  color: #646464;
  .outlineName {
    display: flex;
    justify-content: start;
    height: 56px;
    span {
      width: 116px;
      font-size: 16px;
      color: #646464;
      line-height: 56px;
    }
    :deep(.el-input) {
      width: 166px;
      height: 36px;
      background: #ffffff;
      margin: 10px 0;
    }
  }
  .tableBox {
    width: 100%;
    :deep(.el-table__cell) {
      background-color: #ffffff;
    }
    :deep(.cell) {
      text-align: center;
      font-size: 16px;
    }
    .title {
      font-size: 18px;
      font-weight: 500;
      line-height: 56px;
    }
    // 		.addData {
    // 			width: 42px;
    // 			line-height: 100px;
    // 			color: #2ebba3;
    // 			border: 1px solid #deeefc;
    // 			cursor: pointer;
    // 		}
    .content {
      font-size: 16px;
      .explain {
        line-height: 150px;
        float: left;
      }
      .table1 {
        width: 80%;
        :deep(.cell) {
          line-height: 33px;
        }
      }
      .table2 {
        width: 1176px;
      }
      .formInline {
        :deep(.el-form-item) {
          margin-right: 20px;
          margin-bottom: 0;
        }
        :deep(.el-form-item__label) {
          font-weight: normal;
          color: #646464;
        }
        :deep(.el-form-item__content) {
          position: relative;
          margin-right: 20px;

          :deep(.el-input) {
            width: 160px !important;
            float: left;

            :deep(.el-input__inner) {
              color: #646464;
              border-radius: 0px;
            }
          }

          .sumIpt {
            width: 60px !important;
            :deep(.el-input__inner) {
              padding: 0;
              text-align: center;
            }
          }

          .tail {
            position: absolute;
            right: -20px;
            color: #646464;
          }
        }
      }
    }
  }
}
</style>
