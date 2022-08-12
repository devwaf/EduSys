<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import Card from "../../course/components/card.vue";
import { service } from "../../../../api/service";
import CustomSelect from "@/components/customSelect/customSelect.vue";
import { usePageCard } from "../../../../store/teacher/course/card";
import { useRouter, useRoute } from "vue-router";
import { usePageCurriculumInstall } from "../../../../store/teacher/courseDesign/coursedesignconfig";
import { storeToRefs } from "pinia";
const card = usePageCard();
const { selectedList } = storeToRefs(card);
const _usePageCurriculumInstall = usePageCurriculumInstall();
const { outlineSelect, curriculumInstallFormData, semesterList } = storeToRefs(
  _usePageCurriculumInstall
);

// 获取所有课设大纲
_usePageCurriculumInstall.GetAllDesignSelect();
// 获取所有课设学期
_usePageCurriculumInstall.GetTerm();
const ruleFormRef = ref();
let router = useRouter();

const cardId = ref();
// //添加班级弹窗显示
const addClass = () => {
  // 暂时
  let num = "课设";
  card.getyyy(num);
  cardId.value.open();
};

// 表单校验
const rules = reactive({
  classIds: [{ required: true, message: "请选择班级", trigger: "blur" }],
  name: [
    {
      required: true,
      message: "请填写课程名称",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "请填写课程类型",
      trigger: "change",
    },
  ],
  supervisor: [
    {
      required: true,
      message: "请填写课程负责人",
      trigger: "change",
    },
  ],
  outlineId: [
    {
      required: true,
      message: "请选择大纲",
      trigger: "change",
    },
  ],
  semester: [
    {
      required: true,
      message: "请选择开课学期",
      trigger: "change",
    },
  ],
  credit: [
    {
      required: true,
      message: "请填写课程学分",
      trigger: "change",
    },
  ],
  classDuration: [
    {
      required: true,
      message: "请填写课程总学时",
      trigger: "change",
    },
  ],
  textDuration: [
    {
      required: true,
      message: "请填写实验总学时",
      trigger: "change",
    },
  ],
});
// const change = (val: any) => {
//   console.log(val, "123435355546");
//   // _usePageCurriculumInstall.getOutlineName(val);
// };

// 开课学期
// const semesterList=reactive([
//   {
//   label:'2019年-2020年',
//   value:'2019年-2020年'
// },{
//   label:'2020年-2021年',
//   value:'2020年-2021年'
// },
// {
//   label:'2021年-2022年',
//   value:'2021年-2022年'
// }
// ])
// 发布
const release = () => {
  // console.log(11111111111111111);
  console.log(curriculumInstallFormData.value, "099999");

  _usePageCurriculumInstall.getClass();
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log("验证通过");
      _usePageCurriculumInstall.AddCourse();
    } else {
      console.log("error submit!");
      // console.log();
    }
  });
};
// 删除选中班级
const delClassHandler = (val: any) => {
  let n = "课设";
  card.getDelClassHandler(val, n);
};
// 监听当前路由变化
watch(
  () => router.currentRoute.value,
  () => {
    if (router.currentRoute.value.path !== "/coursedesign/outlineconfig") {
      ruleFormRef.value.resetFields();
    }
    _usePageCurriculumInstall.leavePage(router.currentRoute.value.path);
  }
);
</script>
<template>
  <div id="course">
    <div>
      <el-form
        :model="curriculumInstallFormData"
        :rules="rules"
        ref="ruleFormRef"
        label-width="140px"
        class="courseDesignForm"
      >
        <el-form-item label="课设名称：" prop="name">
          <el-input
            v-model="curriculumInstallFormData.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="课设类型：" prop="type">
          <el-input
            v-model="curriculumInstallFormData.type"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="课设负责人：" prop="supervisor">
          <el-input
            v-model="curriculumInstallFormData.supervisor"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择大纲：" prop="outlineId">
          <el-select
            v-model="curriculumInstallFormData.outlineId"
            placeholder="请选择课设大纲"
          >
            <el-option
              v-for="item in outlineSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开课学期：" prop="semester">
          <el-select
            v-model="curriculumInstallFormData.semester"
            placeholder="请选择开课日期"
          >
            <el-option
              v-for="item in semesterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="major">
          <el-form-item label="专业班级：" prop="classIds" class="class">
            <ul class="major-box">
              <li
                class="major-class-box"
                v-for="(item, index) in selectedList"
                :key="index"
              >
                <div class="major-class-box-li">{{ item.schoolYear }}{{ item.major }}{{ item.name }}</div>
                <svg
                  class="icon del-icon"
                  aria-hidden="true"
                  @click="delClassHandler(item.id)"
                >
                  <use xlink:href="#icon-shanchu" style="color: red" />
                </svg>
              </li>

              <li>
                <button
                  type="button"
                  @click.prevent="addClass"
                  class="choice-button"
                >
                  新建/选择
                </button>
              </li>
            </ul>
          </el-form-item>
        </div>

        <el-form-item label="课设学分：" prop="credit" class="inputNumber">
          <el-input-number
            v-model="curriculumInstallFormData.credit"
            :min="0"
          ></el-input-number>
          &nbsp;<span>学分</span>
        </el-form-item>
        <el-form-item
          label="课设总学时："
          prop="classDuration"
          class="inputNumber"
        >
          <el-input-number
            v-model="curriculumInstallFormData.classDuration"
            :min="0"
          ></el-input-number>
          &nbsp;<span>周</span>
        </el-form-item>
        <el-form-item
          label="实验总学时："
          prop="textDuration"
          class="inputNumber"
        >
          <el-input-number
            v-model="curriculumInstallFormData.textDuration"
            :min="0"
          ></el-input-number>
          &nbsp; <span>周</span>
        </el-form-item>
        <div>
          <el-button class="release" @click.prevent="release">发布</el-button>
        </div>
      </el-form>
    </div>

    <Card class="card" ref="cardId" :changeList="changeList"></Card>
  </div>
</template>
<style lang="scss" scoped>
.class {
  :deep(.el-button) {
    position: absolute;
    left: 220px;
    border-radius: 0;
    overflow: hidden;
  }
}
#course {
  position: relative;
  padding: 40px;
  // width: 100%;
  // min-height: 83vh;
  height: 94vh;
  background-color: #fff;
}
.card {
  position: absolute;
  top: 200px;
  right: 150px;
  z-index: 10000;
}
:deep(.el-form) {
  position: relative;
  margin: 70px auto;
  width: 1065px;
  display: flex;
  flex-wrap: wrap;
}

.major-class {
  display: flex;
  width: 1000px;
  .el-alert--success.is-light {
    color: #000;
    background-color: #f3f3f3;
  }
  .major-class-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background-color: #f3f3f3;
   

  }
  .icon {
    width: 24px;
    height: 24px;
    color: red;
    margin-left: 10px;
  }
}

:deep(.el-form-item) {
  width: 350px;
  margin-bottom: 40px;
}

:deep(.el-form-item__content) {
  width: 210px;
}
.release {
  position: absolute;
  bottom: -20px;
  // right: -0px;
  color: #fff;
  padding: 10px 30px;
  background-color: #2ebba3;
}
.major {
  width: 750px;
  .major-box {
    display: flex;
  }
  .choice-button {
    //  padding: 5px  20px;

    width: 100px;
    height: 35px;
    color: #fff;
    text-align: center;
    background: #479fec;
  }
  .major-class-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    min-width: 140px;
    padding: 2px 20px;
    text-align: center;
    // height: 30px;
    background-color: #f3f3f3;
        .major-class-box-li{
 overflow: hidden; /*内容超出后隐藏*/

    text-overflow: ellipsis; /* 超出内容显示为省略号 */

    white-space: nowrap; /* 文本不进行换行 */
    }
    .del-icon {
      margin-left: 10px;

      width: 20px;
      height: 20px;
    }
  }
}
</style>
