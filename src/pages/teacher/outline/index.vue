<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import CustomSelect from "@/components/customSelect/customSelect.vue";
import Dialog from "@/components/Dialog/index.vue";
import Requirement from "@/pages/teacher/courseDesign/outlineConfig/components/requirement.vue";
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import { usePageOutline } from "../../../store/teacher/outline/outline";
import { usePageRequirement } from "../../../store/teacher/addRequirement.ts";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
const _Alloutline = usePageOutline();
const _requirement = usePageRequirement();
const {
  outlineName,
  targetList,
  formationTable,
  outlineId,
  contrastList,
  courseList,
  weightDate,
  quantity,
  examination,
} = storeToRefs(_Alloutline);
let router = useRouter();
console.log(router.currentRoute.value.path, "000000000000000");

// 获取全部毕业要求
// _Alloutline.GetAllGraduationRequirement();
_Alloutline.GetOutline();

// .currentRoute.value.path
// 添加大纲
const AddOutline = () => {
  _Alloutline.getAddOutline();
};
// 获取大纲
const disabled = ref(false);
const reduceHandler = (value: any) => {
  // console.log(value, "ooooo");
  if (value.times == 0) {
    disabled.value = true;
    return;
  }
  value.times = value.times - 1;
  if (value.name !== "" && value.name !== null) {
    _Alloutline.UpdateScoreWeight(value);
  }
};
const addHandler = (value: any) => {
  value.times = value.times + 1;
  console.log(value, "ooooo");
  if (value.name !== "" && value.name !== null) {
    _Alloutline.UpdateScoreWeight(value);
  }
};
// 添加权重
const addWeight = () => {
  if (outlineId.value == undefined) {
    _Alloutline.addition();
  } else {
    _Alloutline.AddScoreWeight();
  }
};

// 修改权重
const explainHandler = (item: any) => {
  if (item.name !== "" && item.name !== null) {
    _Alloutline.UpdateScoreWeight(item);
  }
};
// 删除权重
const delWeight = (id: string, name: string) => {
  _Alloutline.DeleteScoreWeight(id);
};
// 毕业要求
let column = ref("");
let dialogVisible = ref(false);
const addTarget = () => {
  column.value = "毕业要求表";
   _requirement.GetAllGraduationRequirement();
  dialogVisible.value = !dialogVisible.value;
};

// 添加对照表
const addContrastHandler = () => {
  if (outlineId.value == undefined) {
    _Alloutline.addition();
  } else {
    _Alloutline.getAddContrast();
  }
};
// 修改对照表
const reqChange = (val: any) => {
  if (val.content == "" || val.name == "" || val.graduationRequirementId == "")
    return;
  _Alloutline.UpdateCourseObjective(val);
};
// 删除课程目标
const delTarget = (id: string) => {
  _Alloutline.DeleteCourseObjective(id);
};

// 权重配置
const ChangeCourse = (val: any) => {
  _Alloutline.UpdateSwDetail(val);
};
const score = ref("100");
// 添加大题
const addTopicHandler = () => {
  if (outlineId.value == undefined) {
    _Alloutline.addition();
  } else {
    _Alloutline.getTopic();
  }
};
// 大题修改
const examinationHandler = (row: any) => {
  if (
    row.titleNum == "" ||
    row.type == "" ||
    row.score == "" ||
    row.courseObjectiveId
  )
    return;
  _Alloutline.UpdateTestQuestion(row);
};
const edit = ref(false);
const TestQuestion = (val: any) => {
  console.log(val.courseObjectiveId);
  if (val.courseObjectiveId) {
    console.log(12345);
    _Alloutline.UpdateTestQuestion(val);
   
  }
  //  else{

  //    console.log(122435456);

  //  }

  //  _Alloutline.UpdateTestQuestion(val);
};
// 删除大题
const delTestQuestion = (id: string) => {
  _Alloutline.DeleteTestQuestion(id);
};

// 添加小题
const addSubtopicHandler = (id: any,val:any) => {
  console.log(edit.value,'sh;l;;;');
  console.log(val);
  
  if (val.courseObjectiveId) {
    ElMessage({
      message: "大题选择课程后禁止添加小题",
      type: "warning",
    });
    //  edit.value = true;
  } else {
    _Alloutline.getSubtopic(id);
  }
};
// 修改小题
const ChangeQuestion = (val: any,index:any) => {
  console.log(index,'000000');
  val.titleNum=index+1
  console.log(val,'000000');
  
  if (val.courseObjectiveId == "" || val.score == 0 || val.titleNum == "")
    return;
  _Alloutline.UpdateQuestion(val);
};
// 删除题
const delTopic = (id: string, row: any) => {
  _Alloutline.DeleteQuestion(id, row);
};
// 验证大纲
const completeHandler = () => {
  if (outlineId.value == undefined) {
    _Alloutline.addition();
  } else {
    _Alloutline.CheckOutline();
  }
};

// 监听当前路由变化
watch(
  () => router.currentRoute.value,
  () => {
    console.log(router.currentRoute.value.path, "路由变化了");
    _Alloutline.leavePage(router.currentRoute.value.path);
  }
);
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
          num += parseInt(prev.swDetailPower);
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
  <div id="outline">
    <Dialog :isEdit="dialogVisible" :column="column">
      <template #dialog>
        <Requirement></Requirement>
      </template>
      <!-- <template #footer>
        <el-button
          @click="dialogVisible = false"
          style="border: 1px solid #2ebba3; color: #2ebba3"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="dialogVisible = false"
          style="background-color: #2ebba3"
          >确认</el-button
        >
      </template> -->
    </Dialog>

    <div class="outlineName">
      <div>课程大纲名称：</div>
      <el-input
        @change="AddOutline"
        v-model="outlineName"
        placeholder="请输入大纲名称"
      />
    </div>
    <div class="tableBox">
      <div class="title">1.课程成绩组成比例</div>

      <div class="weight-mian">
        <div class="explain">成绩权重：</div>
        <table class="explain-table">
          <th
            class="performance"
            v-for="(item, index) in formationTable"
            :key="index"
          >
            <tr>
              <td>
                <el-input
                  v-model="item.name"
                  class="import table-import"
                  :disabled="item.name == '期末考试'"
                  @change="explainHandler(item)"
                />
              </td>
            </tr>
            <tr>
              <td>
                <el-input
                  v-model="item.power"
                  class="import"
                  @change="explainHandler(item)"
                />
              </td>
            </tr>
            <tr>
              <td class="input-number-td">
                <div class="input-number">
                  <button
                    class="button-icon"
                    @click.prevent="reduceHandler(item)"
                    :disabled="disabled"
                  >
                    <svg-icon icon="xia" class="svg-icon"></svg-icon>
                  </button>
                  <input
                    type="text"
                    name="text"
                    v-model="item.times"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    class="input-number-input"
                  />
                  <button class="button-icon" @click.prevent="addHandler(item)">
                    <svg-icon icon="shang" class="svg-icon"></svg-icon>
                  </button>
                </div>

                &nbsp;<span>次</span>
              </td>
            </tr>
            <tr>
              <td style="color: red">
                <el-button
                  @click="delWeight(item.id, item.name)"
                  class="delWeight"
                  :disabled="item.name == '期末考试'"
                >
                  <svg class="icon del-icon" aria-hidden="true">
                    <use xlink:href="#icon-shanchu" />
                  </svg>
                </el-button>
              </td>
            </tr>
          </th>
        </table>
        <el-button class="addTable1Data" @click="addWeight">添加</el-button>
      </div>
    </div>

    <div class="tableBox">
      <div class="title">2.课程目标达成考核方式及成绩评定对照表</div>

      <div class="contrast-table">
        <CustomTable
          id="table2"
          class="table2"
          :data="contrastList"
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column label="课程目标" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.name"
                @change="reqChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="课程目标内容" align="center">
            <template #default="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 10 }"
                v-model="scope.row.content"
                @change="reqChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="支撑毕业要求" align="center">
            <template #header>
              支撑毕业要求

              <el-button @click="addTarget" class="addTarget"
                ><el-icon><CirclePlus /></el-icon> &nbsp;新增指标
              </el-button>
            </template>
            <template #default="scope">
              <el-select
                v-model="scope.row.graduationRequirementId"
                class="m-2"
                placeholder="Select"
                @change="reqChange(scope.row)"
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
          <el-table-column label="操作" align="center" width="80px">
            <template #default="scope">
              <svg
                class="icon del-icon"
                aria-hidden="true"
                @click="delTarget(scope.row.id)"
              >
                <use xlink:href="#icon-shanchu" />
              </svg>
            </template>
          </el-table-column>
        </CustomTable>
        <button class="addContrast" @click="addContrastHandler">添加</button>
      </div>
    </div>

    <div class="tableBox">
      <div class="title">3.平时成绩权重配置</div>

      <div class="collocation-table">
        <CustomTable
          class="table3"
          :data="weightDate"
          border
          :summary-method="getSummaries"
          show-summary
          style="width: 85%"
        >
          <template #default>
            <el-table-column label="权重">
              <template #default="scope">
                {{ scope.row.scoreWeightName }}
              </template>
            </el-table-column>
            <el-table-column label="考核方式">
              <template #default="scope">
                <ul class="collocation-main">
                  <li
                    class="collocation-box"
                    v-for="(item, index) in scope.row.swDetails"
                    :key="index"
                  >
                    {{ item.swDetailName }}
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column label="比例%">
              <template #default="scope">
                <ul class="collocation-main">
                  <li
                    class="collocation-box"
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
                <ul class="collocation-main">
                  <li
                    class="collocation-box"
                    v-for="(item, index) in scope.row.swDetails"
                    :key="index"
                  >
                    <el-select
                      v-model="item.courseObjectiveId"
                      class="m-2"
                      placeholder="Select"
                      @change="ChangeCourse(item)"
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
    </div>
    <div class="tableBox subtopic">
      <div class="title">4.考试配置</div>
      <div class="subtopic-top">
        <div>
          <span>课程名称： </span>
          <div class="text">{{ outlineName }}</div>
          <!-- <el-input
            class="text"
            v-model=""
            :disabled="true"
          ></el-input> -->
        </div>
        <div>
          <span>试题数量： </span>
          <div class="text">{{ quantity }}</div>
          &nbsp;&nbsp; <span>题</span>
        </div>
        <div>
          <span>总分： </span>
          <div class="text">{{ score }}</div>
          &nbsp;&nbsp; <span>分</span>
        </div>
      </div>

      <div class="subtopic-tableBox">
        <CustomTable
          class="table3"
          :data="examination"
          border
          style="width: 100%; margin-top: 20px"
        >
          <template #default>
            <el-table-column label="题号">
              <template #default="scope">
                <el-input
                  v-model="scope.row.titleNum"
                  class="import"
                  @change="examinationHandler(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="题型">
              <template #default="scope">
                <el-input
                  v-model="scope.row.type"
                  class="import"
                  @change="examinationHandler(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="分值">
              <template #default="scope">
                <el-input
                  v-model="scope.row.score"
                  class="text import"
                  @change="examinationHandler(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="小题号">
              <template #default="scope">
                <ul class="subtopic-main">
                  <li
                    class="subtopic-box"
                    v-for="(item,index) in scope.row.question"
                    :key="index"
                  >
                    <!-- <el-input
                      v-model="index"
                      @change="ChangeQuestion(item)"
                    /> -->
                      {{index+1}}
                  </li>
                  <li class="add-Subtopic">
                    <div>
                      <el-button
                        class="addSubtopic"
                        @click="addSubtopicHandler(scope.row.id, scope.row)"
                       
                      >
                        <el-icon style="margin-right: 5px"
                          ><CirclePlus /></el-icon
                        >增加
                      </el-button>
                    </div>
                  </li>
                </ul>
              </template>
            </el-table-column>

            <el-table-column label="每小题分值" align="center">
              <template #default="scope">
                <ul class="subtopic-main">
                  <li
                    class="subtopic-box"
                    v-for="(item,index) in scope.row.question"
                    :key="index"
                  >
                    <el-input
                      v-model="item.score"
                      @change="ChangeQuestion(item,index)"
                    />
                  
                  </li>
                  <li class="add-Subtopic"></li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column label="课程目标" align="center" width="220px">
              <template #default="scope">
                <ul class="subtopic-main">
                  <li
                    class="subtopic-box"
                    v-for="(item,index) in scope.row.question"
                    :key="index"
                  >
                    <el-select
                      v-model="item.courseObjectiveId"
                      class="m-2"
                      placeholder="请选择课程目标"
                      @change="ChangeQuestion(item,index)"
                    >
                      <el-option
                        v-for="item in courseList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </li>
                  <li class="add-Subtopic">
                    <el-select
                      v-show="scope.row.question.length == 0"
                      v-model="scope.row.courseObjectiveId"
                      class="m-2"
                      placeholder="请选择课程目标"
                      @change="TestQuestion(scope.row)"
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
            <el-table-column label="操作" align="center"  width="120px">
              <template #default="scope">
                <ul class="subtopic-main">
                  <li
                    class="subtopic-box"
                    v-for="item in scope.row.question"
                    :key="item"
                  >
                    <svg
                      class="icon del-icon del-question"
                      aria-hidden="true"
                      @click="delTopic(item.id, scope.row.id)"
                    >
                      <use xlink:href="#icon-shanchu" />
                    </svg>
                  </li>
                  <li class="add-Subtopic">
                    <svg
                      v-show="scope.row.question.length == 0"
                      class="icon del-icon del-question"
                      aria-hidden="true"
                      @click="delTestQuestion(scope.row.id)"
                    >
                      <use xlink:href="#icon-shanchu" />
                    </svg>
                    <!-- -->
                    <!-- {{scope.row.question.length}} -->
                  </li>
                </ul>
              </template>
            </el-table-column>
          </template>
        </CustomTable>
        <button class="addContrast" @click="addTopicHandler">添加</button>
      </div>
    </div>
    <div class="next">
      <el-button @click="completeHandler">完成</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#outline {
  padding: 20px 30px 100px 30px;
  height: 88vh;
  overflow-y: auto;
  background-color: #fff;
  color: #646464;
  :deep(.el-input__inner) {
    text-align: center;
  }
  :deep(.el-table th.el-table__cell > .cell) {
    color: #646464 !important;
  }
  :deep(.el-input-number) {
    width: 120px;
  }
  // 大纲名称
  .outlineName {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    div {
      flex: 2;
      font-size: 16px;
      color: #646464;
      line-height: 56px;
    }
    :deep(.el-input) {
      flex: 3;
      height: 30px;

      margin: 10px 0;
    }
  }
  .tableBox {
    width: 90%;
    margin-top: 40px;
  }

  .title {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 500;
    line-height: 36px;
    background: #f5f5f5;
    padding-left: 10px;
    border-left: 6px solid #646464;
  }
  // 权重
  .weight-mian {
    display: flex;
    height: 230px;
    align-items: center;

    .explain-table {
      box-sizing: border-box;
      height: 230px;
      // background-color: pink;
      :deep(.el-input__wrapper) {
        margin: 10px 10px;
      }
      :deep(.el-input__inner) {
        height: 30px;
        text-align: center;
      }
      :deep(.el-input) {
        width: 90%;
        // height: 30px;
      }
      th {
        text-align: center;
        td {
          text-align: center;
          line-height: 50px;
          font-size: 16px;
          font-weight: normal;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          box-sizing: border-box;
          color: #646464;
          border: 1px solid #ebeef5;
          border-right: 0;
          input {
            text-align: center;
          }

          .delWeight {
            height: 20px;
            margin: 6px 0;
            text-align: center;
            border: 0;
          }
        }
        tr {
          text-align: center;
          .input-number-td {
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 0;
            border-bottom: 0;
            .input-number {
              margin: 10px 0;
              display: flex;
              width: 120px;
              height: 30px;
              box-sizing: border-box;
              .input-number-input {
                width: 50px;
                height: 30px;
                border-top: 1px solid #e2e2e2;
                border-bottom: 1px solid #e2e2e2;
              }

              .button-icon {
                width: 35px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #f1f1f1;
                .svg-icon {
                  width: 14px;
                  height: 14px;
                  margin-top: 7px;
                }
              }
            }
          }
        }
      }
    }
    .addTable1Data {
      width: 50px;
      height: 229px;
      box-sizing: border-box;
      text-align: center;
      line-height: 229px;
      color: #2ebba3;
      cursor: pointer;

      border: 1px solid #ebeef5;
    }
    .addTable1Data:hover {
      background-color: #f5f8f7;
    }
  }

  // 课程目标
  .contrast-table {
    width: 85%;
  }
  .addTarget {
    color: #2ebba3;
    border: 0;
  }

  // 权重配置
  .collocation-table {
    :deep(.el-table) {
      .el-table__row {
        .el-table__cell {
          padding: 0;

          .cell {
            padding: 0;
          }
        }
      }
    }
    .collocation-main {
      .collocation-box {
        height: 40px;
        line-height: 40px;
        // padding: 10px  20px;
        text-align: center;
        border-bottom: 1px solid #ebeef5;
      }

      li:last-child {
        border: 0;
      }
    }
  }

  .subtopic-top {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      .text {
        height: 25px;
        width: 150px;
        line-height: 25px;
        color: #646464;
        text-align: center;
        border: 1px solid #e4e7ed;
        background-color: #f5f7fa;
      }
    }
  }

  .subtopic-tableBox {
    width: 85%;

    :deep(.el-input__wrapper) {
      margin: 0 20px;
    }
    :deep(.el-table) {
      .el-table__row {
        .el-table__cell {
          padding: 0;

          .cell {
            padding: 0;
          }
        }
      }
    }
    .subtopic-main {
      .subtopic-box {
        height: 50px;
        line-height: 50px;
        text-align: center;
        // background: pink;
        border-bottom: 1px solid #ebeef5;
        .del-question {
          margin-top: 14px;
        }
      }
      li:last-child {
        border: 0;
      }
      .add-Subtopic {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        // line-height: 50px;
        //               .del-question {
        //   // margin-top: 10px;
        // }
        .addSubtopic {
          color: #2ebba3;
          font-size: 16px;
          border: 1px  solid #2ebba3;

          // background-color: #f5f5f5;
        }
      }
    }
  }

  .next {
    margin: 30px 60px 50px 0;
    text-align: right;
    .el-button {
      color: #fff;
      background: #2ebba3;
    }
  }

  .del-icon {
    width: 24px;
    height: 24px;
  }
  input {
    text-align: center;
    background-color: transparent;
  }
  .addContrast {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #2ebba3;
    background-color: transparent;
    border: 1px solid #ebeef5;
    border-top: 0;
  }
}
</style>
