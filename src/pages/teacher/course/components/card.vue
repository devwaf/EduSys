<script lang="ts" setup>
import { usePageCard } from "../../../../store/teacher/course/card";
import { storeToRefs } from "pinia";
import {
  ref,
  reactive,
  defineExpose,
  defineProps,
  defineEmits,
  toRefs,
} from "vue";

const card = usePageCard();
const { classList, name } = storeToRefs(card);
card.GetAllClasses();
// 添加
const addClass = () => {
  card.AddClasses();
};

// 删除
let del = (id: any) => {
  console.log(id);
  card.DeleteClasses(id);
};

let showCard = ref(false);
const list = reactive([]);

let close = () => {
  showCard.value = false;
};
const open = () => {
  showCard.value = true;
};
// 修改
const checkedHanlder = (val: any) => {
  if (val.schoolYear !== "" && val.major !== "" && val.name !== "") {
    card.UpdateClasses(val);
  }
};
// 添加班级
const selectedList = reactive([]);
const complete = () => {
  card.getAllSelected(name.value);
  close();
};
defineExpose({ open, complete });
</script>

<template>
  <div id="card" v-show="showCard">
    <div class="head">
      <span class="title">新建班级</span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="main">
      <div class="addClass" @click="addClass">
        <i class="iconfont icon-tianxieicon"></i> <span>添加</span>
      </div>
      <div class="content">
        <div class="title">
          <div>年级</div>
          <div class="major">专业</div>
          <div style="width: 60px">班级</div>
          <div>操作</div>
        </div>
        <div>
          <ul>
            <li
              class="checkboxItem"
              v-for="item in classList"
              :key="item.value"
            >
              <el-checkbox v-model="item.checked"></el-checkbox>
              <div class="box">
                <div style="width: 50px">
                  <input
                    type="text"
                    v-model="item.schoolYear"
                    style="width: 80%"
                    @change="checkedHanlder(item)"
                  />
                </div>

                <div style="flex: 1">
                  <input
                    type="text"
                    v-model="item.major"
                    style="width: 80%"
                    @change="checkedHanlder(item)"
                  />
                </div>
                <div style="width: 50px">
                  <input
                    type="text"
                    v-model="item.name"
                    style="width: 90%"
                    @change="checkedHanlder(item)"
                  />
                </div>
                <div
                  class="del"
                  @click="del(item.id)"
                  style="width: 60px; color: #EE5F66"
                >
                  <i class="iconfont icon-tianxieicon"></i> <span>删除</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn">
        <el-button class="cancel" @click="close">取消</el-button>
        <el-button class="complete" @click="complete">完成</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#card {
  width: 360px;
  height: 385px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.16);
  border: 1px solid #d8d8d8;
  font-size: 16px;
  color: #646464;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f5f5;
    box-sizing: border-box;
    .close {
      cursor: pointer;
    }
  }
  .main {
    padding: 10px 15px;
    width: 100%;
    .addClass {
      margin-bottom: 10px;
    }
    .content {
      box-sizing: border-box;
      width: 330px;
      border: 1px solid #d8d8d8;
      .title {
        display: flex;
        justify-content: start;
        margin-bottom: 5px;
        padding: 0 30px;
        width: 330px;
        height: 32px;
        box-sizing: border-box;
        border-bottom: 1px solid #d8d8d8;

        div:first-child {
          padding-left: 10px;
        }
        > div {
          width: 50px;
          line-height: 32px;
        }
        .major {
          flex: 1;
        }
      }
      ul {
        overflow: hidden;
        overflow-y: auto;
        height: 200px;
      }
      .checkboxItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        width: 310px;
        font-size: 14px;

        .box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 10px;
          div {
            margin-right: 10px;
          }
        }

        .del {
          cursor: pointer;
        }
      }
    }
    .btn {
      margin-top: 15px;
      width: 330px;
      text-align: right;
      :deep(.el-button) {
        border-radius: 0;
        border-color: #2ebba3;
      }
      .cancel {
        color: #2ebba3;
      }
      .cancel:hover {
        background-color: rgba(46, 187, 163, 0.1);
      }
      .complete {
        color: white;
        background-color: #2ebba3;
      }
    }
    input {
      text-align: center;
      border: 1px solid #D8D8D8;
    }
  }
}
</style>
