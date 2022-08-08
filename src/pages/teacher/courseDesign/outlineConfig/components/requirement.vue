<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue";

import { usePageRequirement } from "../../../../../store/teacher/addRequirement.ts";
import { storeToRefs } from "pinia";
import { el } from "element-plus/lib/locale";

// const exhibit = ref(true);
// const subtopic = (id: any) => {
//   exhibit.value = id;
// };
// requirementList
const requirement = usePageRequirement();
const {
  graduationList,
  addGraduationList,
  title,
  isInut,
  requirementList,
  list,
  showTitleList,
  tabsId,
  headline,
  number
} = storeToRefs(requirement);
// const text = ref(`${"毕业要求"}${requirementList.value.length}`);
// text.value = `${"毕业要求"}${requirementList.value.length}`;
// const contentChange = (val: any, id: string) => {
//   console.log(val, id, "7777777");
//   requirement.UpdateTarget(val, id);
// };
requirement.GetAllGraduationRequirement();
// // 新增毕业要求
// const addGraduation = () => {
//   requirement.AddGraduationRequirement();
//   // requirement.GetAllGraduationRequirement();
// };
// // 修改
// const UpdateRequirement = (val: any) => {
//   requirement.UpdateGraduationRequirement(val);
// };

// // 删除指标
// const delTarget = (id: any) => {
//   console.log(id, "8888888");
//   requirement.DeleteTarget(id);
// };
// // 删除毕业要求
// const delRequirement = (id: string) => {
//   requirement.DeleteGraduationRequirement(id);
// };

// const showTitleList = list.value;
// const tabsId = ref(0);
const show = ref(false);
const ii = reactive({});
const detailsRequirement = (index: string, item: string) => {
  // 高亮
  tabsId.value = item.id;
  console.log(index);

  // 要求详情
  let _tmp = JSON.stringify(item);
  console.log(item, "指标");

  graduationList.value = JSON.parse(_tmp);

  // 编辑
  addGraduationList.value = item;
  title.value = `${"编辑"}${item.name}`;
  // 标题
  // title.value = item.name;
  console.log(addGraduationList.value, "6666666666");
  // 编辑or添加
  show.value = true;

  // 上一个
  if (index == "0") {
    if (requirementList.value[0].id == showTitleList.value[index].id) {
      return false;
    } else {
      let vid = showTitleList.value[0].id;

      // tabsId.value = tabsId.value + 1;
      requirementList.value.forEach((v, i) => {
        if (vid == v.id) {
          //删除最后一个tabs
          showTitleList.value.splice(6, 1);
          showTitleList.value.unshift(requirementList.value[i - 1]);
          // console.log(showTitleList, "8888888888888");
          tabsId.value = showTitleList.value[0].id;
          // // 要求详情
          console.log(i - 1, v, "3rrrr");

          let _tmp = JSON.stringify(requirementList.value[i - 1]);
          graduationList.value = JSON.parse(_tmp);
          console.log(graduationList.value, "yttrer");

          // // 编辑
          addGraduationList.value = requirementList.value[i - 1];
          title.value = `${"编辑"}${requirementList.value[i - 1].name}`;
          // title.value = requirementList.value[i - 1].name;
          // console.log(index, item, "99997777tttt");
        }
      });
    }
  }
  // 下一个
  if (index == "6") {
    if (
      requirementList.value[requirementList.value.length - 1].id ==
      showTitleList.value[6].id
    ) {
      return false;
    } else {
      let vid = showTitleList.value[6].id;
      requirementList.value.forEach((v, i) => {
        if (vid == v.id) {
          showTitleList.value.splice(0, 1);
          showTitleList.value.push(requirementList.value[i + 1]);
          // tabsId.value = tabsId.value - 1;
          tabsId.value = showTitleList.value[6].id;

          let _tmp = JSON.stringify(requirementList.value[i + 1]);
          graduationList.value = JSON.parse(_tmp);

          // // 编辑
          addGraduationList.value = requirementList.value[i + 1];
          title.value = `${"编辑"}${requirementList.value[i + 1].name}`;
          // title.value = requirementList.value[i + 1].name;
        }
      });
    }
  }
};

// 新增要求
const requireHanlder = () => {
  if (!show.value) {
    requirement.AddGraduationRequirement();
  }
};

// 新增指标
const addSubtopic = (id: any) => {
  console.log(id, "888888");
  requirement.AddTarget(show.value);
};
// 添加or修改
const addRequirement = () => {
  if (show.value) {
    requirement.UpdateGraduationRequirement(
      addGraduationList.value,
      graduationList.value
    );
    requirement.GetAllGraduationRequirement();
  } else {
    requirement.GetAddRequirement();
  }
};

// 编辑要求

// 返回添加
const returnHandler = () => {
  show.value = false;
  addGraduationList.value.id = "";
  addGraduationList.value.require = "";
  addGraduationList.value.target = [];
  title.value = `${"毕业要求"}${requirementList.value.length+1}`;
  // title.value = text.value;
};
// 删除
const delRequirement = () => {
  console.log();
  requirement.DeleteGraduationRequirement(
    addGraduationList.value,
    showTitleList
  );
};
</script>

<template>
  <div class="requirement">
    <!-- 添加 -->
    <div class="add-requirement">
      <div class="title">
        <svg-icon
          icon="return"
          class="title-icon"
          v-show="show"
          @click="returnHandler"
        ></svg-icon>
        <span class="title-text">{{ title }}</span>
      </div>

      <ul class="add-requirement-main">
        <li class="add-requirement-content">
          <div class="title-content">标题：</div>
          <div>
            <el-input
              class="content-input"
              placeholder="请输入内容"
              @change="requireHanlder"
              v-model="addGraduationList.require"
            ></el-input>
          </div>
        </li>

        <li
          class="add-requirement-content"
          v-for="(i, index) in addGraduationList.target"
          :key="index"
        >
          <div class="title-content">{{i.name}}：</div>
          <div>
            <el-input
              class="content-input"
              placeholder="请输入内容"
              v-model="i.content"
            ></el-input>
          </div>
        </li>
      </ul>
      <div class="operation-requirement">
        <div>
          <el-button class="add-quota" @click="addSubtopic">添加指标</el-button>
        </div>
        <div>
          <el-button class="del-requirement" @click="delRequirement"
            >删除</el-button
          >
          <el-button class="increase" @click="addRequirement">添加</el-button>
        </div>
      </div>
    </div>

    <div class="requirement-list">
      <!-- 要求 -->
      <ul>
        <li
          class="requirement-list-top"
          v-for="(item, index) in showTitleList"
          :key="index"
          :class="tabsId == item.id ? 'issue-item-active' : ''"
          @click="detailsRequirement(index, item)"
        >
          <button>
            {{ item.name }}
          </button>
        </li>
      </ul>
      <!-- 详情 -->
      <div class="requirement-list-content">
        <ul>
          <li class="requirement-list-li">
            <div class="requirement-list-li-title">标题</div>
            <div class="requirement-list-li-content">
              {{ graduationList.require }}
            </div>
          </li>
          <li
            class="requirement-list-li"
            v-for="(i, index) in graduationList.target"
            :key="index"
          >
            <div class="requirement-list-li-title">{{ i.name }}</div>
            <div class="requirement-list-li-content">
              {{ i.content }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.requirement {
  width: 100%;
  max-height: 750px;
  overflow: auto;
  margin: 0;
  .add-requirement {
    padding: 20px;
    width: 100%;
    // height: 374px;
    background: #f9f9f9;
    box-sizing: border-box;
    .add-requirement-title {
      width: 100%;
      display: flex;
      align-items: center;
      .title-content {
        width: 80px;
        color: #646464;
        text-align: center;
      }
      .content-input {
        height: 36px;
        // width: 100%;
        width: 720px;
      }
    }
    .title {
      display: flex;
      align-items: center;
      // padding: 15px;
      margin-bottom: 15px;
      width: 100%;
      font-weight: 500;
      color: #646464;
      font-size: 18px;
      text-align: center;
      // background-color: #000;
      .title-icon {
        width: 18px;
        height: 18px;
        // margin-left: 20px;
      }
      .title-text {
        margin-left: 45%;
        // text-align: left;
      }
    }
    .add-requirement-main {
      // margin: 20px 0;

      width: 100%;
      max-height: 210px;
      overflow-y: auto;
      // height: 200px;
      // background-color: pink;
      .add-requirement-content {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        width: 100%;
        height: 36px;

        // background-color: skyblue;
        .title-content {
          width: 80px;
          color: #646464;
          text-align: center;
        }
        .content-input {
          height: 36px;
          // width: 100%;
          width: 720px;
        }
      }
    }
    :deep(.el-input__wrapper) {
      margin: 0;

      .el-input__inner {
        text-align: left;
      }
    }
    .add-requirement-main::-webkit-scrollbar {
      display: none !important;
    }
  }
  .operation-requirement {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #f9f9f9;
    padding: 0 20px;
    padding-right: 20px;
    height: 32px;

    .add-quota {
      width: 96px;
      color: #fff;
      background-color: #489fec;
    }
    .del-requirement {
      width: 68px;
      // color: #2ebba3;
      color:#EE5F66 ;
      border: 1px  solid  #EE5F66 ;
    }
    .increase {
      width: 68px;
      color: #fff;
      background: #2ebba3;
    }
  }
  .requirement-list {
    margin-top: 30px;
    padding: 20px;
    width: 100%;
    height: 285px;
    box-sizing: border-box;
    background: #f9f9f9;
    ul {
      // display: flex;
      width: 100%;

      .requirement-list-top {
        float: left;
        width: 114px;
        height: 40px;
        // background-color: pink;
        line-height: 36px;
        text-align: center;
        white-space: nowrap;
        overflow-x: hidden;
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
        border-left: 1px solid #d8d8d8;

        button {
          color: #a4a4a4;

          background-color: transparent;
        }
      }

      li:last-child {
        border-right: 1px solid #d8d8d8;
      }
      .issue-item-active {
        background-color: #2ebba4;
        button {
          color: #fff;
        }
      }
    }

    .requirement-list-content {
      width: 800px;
      height: 200px;
      overflow-y: auto;
      ul {
        margin-top: 15px;
        .requirement-list-li {
          display: flex;
          height: 46px;
          border-right: 1px solid #707070;
          border-left: 1px solid #707070;
          border-top: 1px solid #707070;
          .requirement-list-li-title {
            width: 100px;
            line-height: 46px;
            text-align: center;
            background: #d8d8d8;

            border-right: 1px solid #707070;
          }
          .requirement-list-li-content {
            flex: 1;
            padding: 0 20px;
            line-height: 46px;
            overflow: hidden; /*内容超出后隐藏*/
            text-overflow: ellipsis; /* 超出内容显示为省略号 */
            white-space: nowrap; /* 文本不进行换行 */
          }
        }
        li:last-child {
          border-bottom: 1px solid #707070;
        }
      }
    }
    .requirement-list-content::-webkit-scrollbar {
      display: none !important;
    }
    // }
  }
  // ul {
  //   width: 100%;
  //   height: 100%;
  //   li {
  //     margin-bottom: 2px;
  //   }
  //   .del-icon {
  //     width: 24px;
  //     height: 24px;
  //   }
  //   .top {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     width: 96%;
  //     height: 20px;
  //     line-height: 40px;
  //     padding: 10px;
  //     border: 1px solid #000;
  //     // :deep(.el-input__wrapper) {
  //     //   box-shadow: 0 0 0 0 ;
  //     // }
  //     :deep(.el-input__wrapper.is-focus) {
  //       box-shadow: 0 0 0 1px #2ebba3;
  //     }
  //     .icon-box {
  //       width: 50px;
  //       height: 30px;
  //       line-height: 40px;
  //       text-align: center;
  //       // background-color: skyblue;
  //     }
  //     .icon {
  //       width: 16px;
  //       height: 16px;
  //     }
  //   }

  //        .del-requirement {
  //      display: flex;
  //      justify-content: space-between;
  //      align-items: center;

  //      // .icon {
  //      //   width: 20px;
  //      //   height: 20px;
  //      // }
  //    }
  // .subtopic {
  //     display: flex;
  //     justify-content: space-between;
  //     padding: 10px;
  //     //   width: 100%;
  //     //   height: 50px;
  //     background-color: #f7f4f8;

  //     .text {
  //       width: 70px;
  //       // line-height: 40px;
  //       text-align: center;
  //       margin-right: 10px;
  //       background-color: #fff;
  //       // background-color: transparent;
  //     }
  //     .textdiv {
  //       // flex: 1;
  //       width: 90%;
  //       min-height: 24px !important;
  //       border-radius: 5px;
  //       padding: 5px 10px;
  //       background-color: #fff;
  //       border: 1px solid #000;
  //     }
  //     .del{
  //       text-align: center;
  //       padding-top: 5px;
  //       width: 50px;
  //       // background-color: pink;
  //     }
  //   }
  //   button {
  //     // padding: 5px 20px;
  //     width: 150px;
  //     // height: 40px;
  //     text-align: center;
  //     color: #2ebba3;
  //     background-color: transparent;
  //     border: 1px solid #2ebba3;
  //   }
  //   .addGraduation {
  //     display: flex;

  //     height: 40px;
  //     // width: 300px;
  //     input {
  //       // margin-left: 5px;
  //       border: 1px solid #2ebba3;
  //       border-left: 0;
  //     }
  //   }
  // }
}
</style>
