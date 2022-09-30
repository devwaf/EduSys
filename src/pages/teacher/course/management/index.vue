<script lang="ts" setup>
import { ref, reactive, watch, withCtx } from "vue";
import Card from "../components/card.vue";
import { service } from "../../../../api/service";
import CustomSelect from "@/components/customSelect/customSelect.vue";
import { usePageCoursemanagement } from "../../../../store/teacher/course/coursemanagement";
import { usePageCard } from "../../../../store/teacher/course/card";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const coursemanagement = usePageCoursemanagement();
const { outlineSelect, id, arrList, curriculumFormData, semesterList } =
  storeToRefs(coursemanagement);
const card = usePageCard();
const { curriculumSelectedList, classId } = storeToRefs(card);
coursemanagement.GetAllCourseOutlineSelect();
coursemanagement.GetAllTerm();
const ruleFormRef = ref();

let router = useRouter();
let classSelect = reactive([]);
// let courseDesignrules = {};
const cardId = ref();
//添加班级弹窗显示
const addClass = () => {
  let num = "课程";
  card.getyyy(num);
  cardId.value.open();
};

const choice = (value: string) => {
  if (value == "123") {
    console.log(33333);
   router.push('/outline/addoutline')
    return;
  }
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
// 发布

const release = async () => {
  coursemanagement.getClass();
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("通过");
      coursemanagement.AddCourse();
    } else {
      console.log("error submit!");
    }
  });

  // console.log(curriculumFormData, 222222222222222);
};

// 删除选中班级
const delClassHandler = (val: any) => {
  const n = "课程";
  card.getDelClassHandler(val, n);
};

// 监听当前路由变化
watch(
  () => router.currentRoute.value,
  () => {
    if (router.currentRoute.value.path !== "/course/coursemanagement") {
      ruleFormRef.value.resetFields();
    }
    coursemanagement.leavePage(router.currentRoute.value.path);
    // console.log(router.currentRoute.value.path,"路由变化了");
  }
);
</script>
<template>
  <div id="course">
    <el-form
      :model="curriculumFormData"
      :rules="rules"
      ref="ruleFormRef"
      label-width="140px"
      class="courseDesignForm"
    >
      <el-form-item label="课程名称：" prop="name">
        <el-input
          v-model="curriculumFormData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程类型：" prop="type">
        <el-input v-model="curriculumFormData.type" placeholder="请输入">
        </el-input>
      </el-form-item>
      <el-form-item label="课程负责人：" prop="supervisor">
        <el-input
          v-model="curriculumFormData.supervisor"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择大纲：" prop="outlineId">
        <el-select
          v-model="curriculumFormData.outlineId"
          placeholder="请选择课程大纲"
          @change="choice"
        >
          <el-option
            v-for="item in outlineSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :class="item.label == '创建大纲' ? 'choice' : ''"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开课学期：" prop="semester">
        <el-select
          v-model="curriculumFormData.semester"
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
        <el-form-item label="专业班级：" class="class" prop="classIds">
          <ul class="major-box">
            <li
              class="major-class-box"
              v-for="(item, index) in curriculumSelectedList"
              :key="index"
            >
              <div class="major-class-box-li">
                {{ item.schoolYear }}{{ item.major }}{{ item.name }}
              </div>
              <svg-icon
                icon="del"
                class="del-icon"
                @click="delClassHandler(item.id)"
              />
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

      <el-form-item label="课程学分：" prop="credit" class="inputNumber">
        <el-input-number
          v-model="curriculumFormData.credit"
          :min="0"
        ></el-input-number>
        &nbsp;<span>学分</span>
      </el-form-item>
      <el-form-item
        label="课程总学时："
        prop="classDuration"
        class="inputNumber"
      >
        <el-input-number
          v-model="curriculumFormData.classDuration"
          :min="0"
        ></el-input-number>
        &nbsp;<span>学时</span>
      </el-form-item>
      <el-form-item
        label="实验总学时："
        prop="textDuration"
        class="inputNumber"
      >
        <el-input-number
          v-model="curriculumFormData.textDuration"
          :min="0"
        ></el-input-number>

        &nbsp; <span>学时</span>
      </el-form-item>
      <div>
        <el-button class="release" @click.prevent="release">发布</el-button>
      </div>
    </el-form>

    <Card class="card" ref="cardId"></Card>
  </div>
</template>
<style lang="scss" scoped>
.class {
  :deep(.el-button) {
    position: absolute;
    left: 220px;
    border-radius: 0;
  }
}
#course {
  width: 100%;
  height: 94vh;
  overflow: auto;
  background-color: #fff;
  position: relative;
}
.choice {
  color: #2ebba3;
  background: #2ebba325;
}
.card {
  position: absolute;
  top: 200px;
  right: 150px;
  z-index: 10000;
}
:deep(.el-form) {
  position: relative;
  padding-top: 50px;
  width: 1065px;
  display: flex;
  flex-wrap: wrap;
  margin: 70px auto;
}

:deep(.el-form-item) {
  width: 350px;
  margin-bottom: 40px;
}

:deep(.el-form-item__content) {
  width: 210px;
}
:deep(.add) {
  left: 175px !important;
}
.release {
  position: absolute;
  bottom: -50px;
  color: #fff;
  padding: 10px 30px;
  font-size: 14px;
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
    font-size: 14px;
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
    .major-class-box-li {
      color: #646464;
      overflow: hidden; /*内容超出后隐藏*/

      text-overflow: ellipsis; /* 超出内容显示为省略号 */

      white-space: nowrap; /* 文本不进行换行 */
    }
    .del-icon {
      margin-left: 10px;

      width: 16px;
      height: 16px;
    }
  }
}
</style>
