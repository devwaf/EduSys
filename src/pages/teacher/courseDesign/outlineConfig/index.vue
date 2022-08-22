<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import CustomSelect from "@/components/customSelect/customSelect.vue";
import Table from "../components/table.vue";
import { subItem, subItemTabel, reach, reachTable } from "@/utils/teacher";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ref, reactive, watch } from "vue";
import Dialog from "../../../../components/Dialog/index.vue";
import Requirement from "./components/requirement.vue";
import { usePageStoreOutLineConfig } from "../../../../store/teacher/outLineConfig";
import { usePageRequirement } from "../../../../store/teacher/addRequirement.ts";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
// import { AnySrvRecord } from "dns";
const _requirement = usePageRequirement();

const { targetList } = storeToRefs(_requirement);
let dialogVisible = ref(false);
let column = ref("");
const score = ref("分");
let subItemTabelOptions = subItemTabel;
let subItemList = reactive(subItem);
let percentage = ref("%");
let reachTabel = reactive(reach);
let reachTableOptions = reachTable;
const yy = ref("950px");
_requirement.GetAllGraduationRequirement();
const addTarget = () => {
  column.value = "毕业要求表";
  _requirement.GetAllGraduationRequirement();
  dialogVisible.value = !dialogVisible.value;
};
const outLineConfig = usePageStoreOutLineConfig();
const {
  addOutLineConfig,
  subentryList,
  // targetList,
  contrastList,
  quotaList,
  disabled,
  outlineId,
  assessmentList,
  forbidden,
} = storeToRefs(outLineConfig);

let router = useRouter();
let route = useRoute();

// 新建大纲
const changeName = () => {
  outLineConfig.getAddOutline();
};

// 添加评审项目
const addReview = () => {
  if (disabled.value) {
    console.log(disabled.value, 13436567);
    const text = "请先创建大纲名称";
    outLineConfig.Message(text);
  } else {
    outLineConfig.getAddReview();
  }
};
//修改评审
const determineReview = (item: any) => {
  // console.log(item, "yyyyyy");

  outLineConfig.UpdateScoreAchievement(item);
};

// 添加指标
const addTargetHandler = (id: any) => {
  console.log(id, "xxxxx");
  outLineConfig.AddAchievementTarget(id);
};

// 修改指标
const achieveTargetHandler = (item: any, id: string) => {
  // if(item.)
  console.log(item, id, "指标");
  if (item.target !== "" && item.score !== 0) {
    outLineConfig.UpdateAchievementTarget(item, id);
  }
};

// 删除指标
const delAchieveTarget = (id: string, row: string) => {
  console.log(id, row, "删除的id");
  outLineConfig.DeleteAchievementTarget(id, row);
};

// 添加对照表
const addAssessment = () => {
  if (disabled.value) {
    const text = "请先创建大纲";
    outLineConfig.Message(text);
  } else {
    outLineConfig.AddDesignObjective();
  }
};

// 删除课设目标
const delAssessment = (id: string) => {
  // console.log(id, "2324543");
  outLineConfig.DeleteDesignObjective(id);
};

// 修改
const assessmentHandler = (item: any, i: string, value: any, index: any) => {
  // console.log(item, 88888);
  if (item.name == "") return;
  if (item.graduationRequirementId == "") return;
  if (item.degreeSupport == "") return;
  // if (item.gredeProportion == "") return;
  // console.log(value,'9999999');
  // console.log(index,'下标');

  outLineConfig.UpdateDesignObjective(item);
  console.log(item, "wwwwwww");
};
const addMentHandler = (item: any, i: string, value: any, index: any) => {
  outLineConfig.getMentHandler(item, i, value, index);
};

const list = ref();
const completeAssessment = () => {
  outLineConfig.AddDesignObjective();
};

//下拉框
const changeHandler = (val: String, num: String) => {
  console.log(val, "下拉框");
};

// 检查是否填写完整
const inspect = () => {
  if (disabled.value) {
    const text = "请先创建大纲名称";
    outLineConfig.Message(text);
  } else {
    outLineConfig.CheckDesignOutLine();
  }
};
const addSubscript = (id: any, val: any) => {
  console.log(id, val, 21325465);

  outLineConfig.getAddSubscript(id, val);
};
// 删除考核环节
const delSubscript = (id: string, val: string, index: string, i: any) => {
  console.log(id, 9999);
  console.log(val, 888888);
  console.log(index, 111111111);
  outLineConfig.delSubscript(id, val, index);
};
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
// 监听当前路由变化
watch(
  () => router.currentRoute.value,
  () => {
    outLineConfig.leavePage(router.currentRoute.value.path);
  }
);
</script>

<template>
  <div id="cRForm">
    <div class="choice">
      <p>课设大纲命名：</p>
      <el-input
        v-model="addOutLineConfig.name"
        @change="changeName"
        placeholder="请填写课设大纲名称"
      />
    </div>
    <div class="box">
      <div class="title">1.课设成绩组成比例</div>
      <!-- <p style="margin-botton: 20px">1.课设成绩组成比例</p> -->

      <div class="achievement-subItem" style="width: 96%">
        <span style="line-height: 200px; width: 100px"> 分项成绩表：</span>
        <div class="subItem">
          <CustomTable :data="subentryList" border style="width: 100%">
            <template #default>
              <el-table-column label="评审项目" align="center">
                <template #default="scope">
                  <el-input
                    v-model="scope.row.name"
                    @change="determineReview(scope.row)"
                  ></el-input>
                  <span>{{ scope.row.weight }}{{ percentage }}</span>
                </template>
              </el-table-column>
              <el-table-column label="指标" align="center">
                <template #default="scope">
                  <ul>
                    <li
                      class="target-box"
                      v-for="(item, index) in scope.row.achieveTarget"
                      :key="index"
                    >
                      <el-input
                        @change="achieveTargetHandler(item, scope.row.id)"
                        v-model="item.target"
                      ></el-input>
                    </li>
                    <li
                      class="target-box-add"
                      @click="addTargetHandler(scope.row.id)"
                    >
                      添加
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column label="满分" align="center" width="100px">
                <template #default="scope">
                  <ul>
                    <li
                      class="target-box"
                      v-for="item in scope.row.achieveTarget"
                      :key="item"
                    >
                      <el-input
                        v-model="item.score"
                        @change="achieveTargetHandler(item, scope.row.id)"
                      ></el-input>
                    </li>
                    <li class="target-box-add"></li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100px">
                <template #default="scope">
                  <ul>
                    <li
                      class="target-box"
                      v-for="item in scope.row.achieveTarget"
                      :key="item"
                    >
                      <svg
                        class="icon del-icon"
                        aria-hidden="true"
                        @click="delAchieveTarget(item.id, scope.row.id)"
                      >
                        <use xlink:href="#icon-shanchu" />
                      </svg>
                    </li>
                    <li class="target-box-add"></li>
                  </ul>
                </template>
              </el-table-column>
            </template>
          </CustomTable>
          <el-button class="addReview" @click="addReview">
            添加评审项目</el-button
          >
        </div>
      </div>
    </div>
    <div class="box assessment-box">
      <div class="title">2.课设目标达成考核方式及成绩评定对照表</div>
      <!-- <p>2.课设目标达成考核方式及成绩评定对照表</p> -->
      <div class="achievement">
        <CustomTable
          :data="contrastList"
          border
          :summary-method="getSummaries"
          show-summary
          align="center"
          style="width: 100%"
        >
          <template #default>
            <el-table-column label="课程目标" align="center">
              <template #default="scope">
                <el-input
                  v-model="scope.row.name"
                  @change="assessmentHandler(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="课程目标内容" align="center">
              <template #default="scope">
                <el-input
                  v-model="scope.row.degreeSupport"
                  @change="assessmentHandler(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="支撑毕业要求"
              align="center"
              min-width="100px"
            >
              <template #header>
                支撑毕业要求

                <el-button @click="addTarget" class="addTarget"
                  ><el-icon><CirclePlus /></el-icon>&nbsp;新增指标
                </el-button>
              </template>
              <template #default="scope">
                <el-cascader
                  :options="targetList"
                  :show-all-levels="false"
                  v-model="scope.row.graduationRequirementId"
                  :props="{
                    checkStrictly: true,
                    emitPath: false,
                  }"
                  clearable
                  @change="assessmentHandler(scope.row)"
                >
                  <template #default="{ data }">
                    <el-tooltip
                      :disabled="data.label.length < 12"
                      class="item"
                      effect="dark"
                      :content="data.label"
                      placement="top"
                    >
                      <span @click="setInterval">{{ data.label }}</span>
                    </el-tooltip>
                  </template>
                </el-cascader>
                <!-- <el-select
                  v-model="scope.row.graduationRequirementId"
                  class="m-2"
                  placeholder="请选择"
                  @change="assessmentHandler(scope.row)"
                >
                  <el-option
                    v-for="item in targetList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
              </template>
            </el-table-column>

            <el-table-column label="考核环节" width="500px">
              <template #default="scope">
                <ul>
                  <li
                    class="assess-box"
                    v-for="item in scope.row.scoreRate"
                    :key="item"
                  >
                    <div class="review">{{ item.name }}</div>
                    <div class="review-list">
                      <ul>
                        <li
                          class="review-list-box"
                          v-for="(i, index) in item.achieveTarget"
                          :key="index"
                        >
                          <div class="list-box">
                            <el-select
                              v-model="i.target"
                              class="m-2"
                              placeholder="请选择"
                              @change="
                                addMentHandler(
                                  scope.row,
                                  item.id,
                                  i.target,
                                  index
                                )
                              "
                            >
                              <el-option
                                v-for="e in quotaList"
                                :disabled="e.disabled"
                                :key="e.value"
                                :label="e.label"
                                :value="e.label"
                              />
                            </el-select>
                          </div>
                          <div class="list-grade">
                            <span> {{ i.score }} {{ score }} </span>
                          </div>
                          <div class="list-del">
                            <svg
                              @click="
                                delSubscript(scope.row.id, item.id, index, i)
                              "
                              class="icon del-icon del-scoreRate"
                              aria-hidden="true"
                            >
                              <use xlink:href="#icon-shanchu" />
                            </svg>
                          </div>
                        </li>

                        <li class="review-list-box">
                          <button
                            class="addReviewButton"
                            @click="addSubscript(item.id, scope.row.id)"
                          >
                            添加
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </template>
            </el-table-column>

            <el-table-column label="成绩比例(100%)">
              <template #default="scope">
                <span>
                  {{ scope.row.gredeProportion }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <svg
                  class="icon del-icon"
                  aria-hidden="true"
                  @click="delAssessment(scope.row.id)"
                >
                  <use xlink:href="#icon-shanchu" />
                </svg>
              </template>
            </el-table-column>
          </template>
        </CustomTable>
        <button class="addAssessment" @click="addAssessment">
          添加课程目标
        </button>
      </div>
    </div>

    <div class="box">
      <button @click="inspect" class="complete">确认</button>
    </div>
    <Dialog :isEdit="dialogVisible" :column="column" :width="yy">
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
          style="background-color: #2ebba3; color: #fff"
          >确认</el-button
        >
      </template> -->
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
#cRForm {
  padding-top: 30px;
  height: 94vh;
  overflow: auto;
  background-color: #fff;
}
:deep(.el-input__wrapper) {
  margin: 0 20px;
}
:deep(.el-table th.el-table__cell > .cell) {
  color: #646464 !important;
}
.choice {
  display: flex;
  align-items: center;
  padding-left: 30px;
  height: 30px;

  p {
    width: 120px;
  }
  :deep(.el-input) {
    width: 250px;
  }
}
:deep(.el-input__inner) {
  text-align: center;
}
.box {
  padding: 20px;
  width: 95%;
  text-align: right;
  // background-color: pink;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #646464;
    line-height: 36px;
    background: #f5f5f5;
    padding-left: 10px;
    border-left: 6px solid #646464;
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .addAssessment {
    width: 100%;
    text-align: center;
    background-color: transparent;
    line-height: 50px;
    color: #2ebba3;
    border: 1px solid #ebeef5;
    border-top: 0;
  }
  .achievement-subItem {
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: 90%;
    // background-color: pink;
    .report,
    .defence {
      display: flex;
      width: 100%;
    }
    .subItem {
      flex: 1;
    }
    .report-left {
      padding: 10px;
      border: 1px solid #000;
    }
  }
}
ul {
  width: 100%;
}
.target-box {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  .del {
    width: 100%;
    height: 30px;
  }
  .del-icon {
    width: 20px;
    height: 20px;
    color: red;
  }
}
li:last-child {
  border: 0;
}
.target-box-add {
  height: 40px;
  width: 100%;
  color: #2ebba3;
  text-align: center;
  line-height: 40px;
}
.assessment-box {
  .achievement {
    width: 96%;
    // background-color: skyblue;
    // background-color: #fff;
  }
}
.subItem {
  width: 80%;
  :deep(.el-table) {
  }
  .addReview {
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
.assess-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
  .review {
    width: 120px;
    text-align: center;
  }
  .review-list {
    flex: 1;
    .review-list-box {
      display: flex;
      width: 100%;
      text-align: center;
      border-left: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      div {
        // line-height: 30px;
        text-align: center;
      }
      :deep(.el-input__wrapper) {
        margin: 5px 8px;
        box-shadow: 0 0 0 0;
      }
      .list-box {
        flex: 8;
        padding-top: 5px;
        padding-bottom: 5px;
        border-right: 1px solid #ebeef5;
      }
      .list-grade {
        flex: 4;
        padding-top: 14px;
        padding-bottom: 5px;
      }
      .list-del {
        flex: 2;
        padding-top: 5px;
        padding-bottom: 8px;
        border-left: 1px solid #ebeef5;
      }
    }
    li:last-child {
      border-bottom: 0;
    }
    .addReviewButton {
      line-height: 40px;
      width: 100%;
      background-color: transparent;
      text-align: center;
      color: #2ebba3;
    }
  }
}
:deep(.el-table) {
  .el-table__header {
    .el-table__cell {
      padding: 10px;
    }
  }
}
:deep(.el-table .cell) {
  padding: 0 !important;
}
// :deep(.el-radio){
//   width: 50px;
// }
:deep(.el-table .el-table__cell) {
  padding: 0;
}

:deep(.yiyi .el-table .cell) {
  padding: 0;
  width: 50px;
  height: 50px;
}
.el-button:not(.is-text, .is-link, .el-button--text) {
  color: #2ebba3;
}
.complete {
  text-align: right;

  padding: 5px 12px;
  color: #fff;
  background: #2ebba3;
}
.del-icon {
  width: 24px;
  height: 24px;
}
.del-scoreRate {
  // margin: 20px  16px;
  margin-top: 10px;
}
.addTarget {
  color: #2ebba3;
  border: 0;
}
</style>
<style lang="scss">
:deep(.el-cascader-panel .el-radio) {
  width: 100%;
  height: 100%;
  // z-index: 100000;
  position: absolute;
  top: 10px;
  right: -10px;
 border: 5px  solid  #000;
  
}
.el-cascader-panel .el-radio__input {
 background-color: pink;
border: 1px  solid  #606061;
border-radius: 50%;
}
.el-cascader-panel .el-cascader-node__postfix {
  top: 10px;
}
</style>