<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue";

import { usePageRequirement } from "../../../../../store/teacher/addRequirement.ts";
import { storeToRefs } from "pinia";

const exhibit = ref(true);
const subtopic = (id: any) => {
  exhibit.value = id;
};
// requirementList
const requirement = usePageRequirement();
const { graduationList, title, isInut, requirementList } =
  storeToRefs(requirement);
// 新增指标
const addSubtopic = (id: any) => {
  console.log(id, "888888");
  requirement.AddTarget(id);
};
const contentChange = (val: any, id: string) => {
  console.log(val, id, "7777777");
  requirement.UpdateTarget(val, id);
};
requirement.GetAllGraduationRequirement();
// 新增毕业要求
const addGraduation = () => {
  requirement.AddGraduationRequirement();
  // requirement.GetAllGraduationRequirement();
};
// 修改
const UpdateRequirement = (val: any) => {
  requirement.UpdateGraduationRequirement(val);
};

// 删除指标
const delTarget = (id: any) => {
  console.log(id, "8888888");
  requirement.DeleteTarget(id);
};
// 删除毕业要求
const delRequirement = (id: string) => {
  requirement.DeleteGraduationRequirement(id);
};
</script>

<template>
  <div class="requirement">
    <ul>
      <li class="list" v-for="(item, index) in requirementList" :key="index">
        <div class="top">
          <div>
            <el-input
              type="text"
              v-model="item.name"
              @change="UpdateRequirement(item)"
            />
            <!-- {{ item.name }} -->
          </div>
           <div class="del-requirement">
          <div class="icon-box" @click="subtopic(item.id)">
            <svg
              class="icon home-icon-min"
              aria-hidden="true"
              v-if="item.id == exhibit"
            >
              <use xlink:href="#icon-jiantouicon" />
            </svg>
            <svg
              class="icon home-icon-min"
              aria-hidden="true"
              style="width: 20px; height: 20px"
              v-else
            >
              <use xlink:href="#icon-Chevron-down" />
            </svg>
          </div>
           <div class="del">
             <svg class="icon del-icon" aria-hidden="true" @click="delRequirement(item.id)">
               <use xlink:href="#icon-shanchu" />
             </svg>
           </div>
           </div>
          
        </div>

        <ul v-if="item.id == exhibit">
          <li
            class="subtopic"
            v-for="(list, index) in item.target"
            :key="index"
          >
            <input
              type="text"
              v-model="list.name"
              class="text"
              @blur="contentChange(list, item.id)"
            />
            <el-input
              v-model="list.content"
              :autosize="{ minRows: 1, maxRows: 4 }"
              type="textarea"
              placeholder="请输入指标内容"
              @blur="contentChange(list, item.id)"
            />
            <div class="del">
              <svg class="icon del-icon" aria-hidden="true" @click="delTarget(list.id)">
                <use xlink:href="#icon-shanchu" />
              </svg>
            </div>
          </li>
          <!-- <li
            class="subtopic"
            v-for="(list, index) in item.target"
            :key="index"
          >
            <svg class="icon del-icon" aria-hidden="true">
              <use xlink:href="#icon-shanchu" />
            </svg>
          </li> -->
          <li class="subtopic">
            <button @click="addSubtopic(item.id)">新增指标</button>
          </li>
        </ul>
      </li>
      <li class="addGraduation">
        <button @click="addGraduation">添加毕业要求</button>
        <!-- <input
          type="text"
          placeholder="请输入毕业要求名称"
          v-show="isInut"
          v-model="title"
        /> -->
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.requirement {
  width: 100%;
  max-height: 500px;
  overflow: auto;
  //   background-color: pink;
  ul {
    width: 100%;
    height: 100%;
    li {
      margin-bottom: 2px;
    }
    .del-icon {
      width: 24px;
      height: 24px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 96%;
      height: 20px;
      line-height: 40px;
      padding: 10px;
      border: 1px solid #000;
      // :deep(.el-input__wrapper) {
      //   box-shadow: 0 0 0 0 ;
      // }
      :deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px #2ebba3;
      }
      .icon-box {
        width: 50px;
        height: 30px;
        line-height: 40px;
        text-align: center;
        // background-color: skyblue;
      }
      .icon {
        width: 16px;
        height: 16px;
      }
    }

         .del-requirement {
       display: flex;
       justify-content: space-between;
       align-items: center;
      
       // .icon {
       //   width: 20px;
       //   height: 20px;
       // }
     }
  .subtopic {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      //   width: 100%;
      //   height: 50px;
      background-color: #f7f4f8;

      .text {
        width: 70px;
        // line-height: 40px;
        text-align: center;
        margin-right: 10px;
        background-color: #fff;
        // background-color: transparent;
      }
      .textdiv {
        // flex: 1;
        width: 90%;
        min-height: 24px !important;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #fff;
        border: 1px solid #000;
      }
      .del{
        text-align: center;
        padding-top: 5px;
        width: 50px;
        // background-color: pink;
      }
    }
    button {
      // padding: 5px 20px;
      width: 150px;
      // height: 40px;
      text-align: center;
      color: #2ebba3;
      background-color: transparent;
      border: 1px solid #2ebba3;
    }
    .addGraduation {
      display: flex;

      height: 40px;
      // width: 300px;
      input {
        // margin-left: 5px;
        border: 1px solid #2ebba3;
        border-left: 0;
      }
    }
  }
}
</style>
