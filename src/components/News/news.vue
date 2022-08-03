<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const activeName = ref("first");
import { defineProps } from "vue";
const { prop } = defineProps({
  prop: {
    type: Array,
    require: true,
  },
});
</script>

<template>
  <div class="news-main">
    <div class="news-main-top">作业</div>
    <div class="task">
      <ul>
        <li
          v-for="(item, index) in prop.values"
          :key="index"
          @click="router.push(item.router)"
        >
          {{ item.message }}
          <div class="class">{{ item.message }}</div>
          <div class="time">{{ item.creationTime }}</div>
          <div class="correct">批改</div>
          <div class="number">{{ item.count }}</div>
        </li>
       
      </ul>
    </div>
    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="作业" name="first">
        
      </el-tab-pane> -->
    <!-- <el-tab-pane label="笔试/机试" name="second">
        <div class="task">
          <ul>
            <li v-for="(item, index) in  prop.values" :key="index" @click="router.push(item.router)">
              {{ item.message }}
            </li>
          </ul>
        </div>
      </el-tab-pane> -->
    <!-- </el-tabs> -->
    <div class="data">共{{ prop.values.length }}条通知</div>
  </div>
</template>

<style lang="scss" scoped>
.news-main {
  .news-main-top {
    height: 40px;

    line-height: 40px;
    font-weight: 500;
    color: #2ebba3;
    font-size: 14px;
    text-align: center;
    background-color: #f5f5f5;
   
  }
 
  .task {
    width: 100%;
    ul {
      width: 100%;
      max-height: 200px;
      overflow-y: auto;

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: #646464;
        height: 42px;
        line-height: 42px;
        border-top: 1px solid #f5f5f5;
        div {
          font-size: 14px;
          margin-right: 10px;
        }
        div:last-child {
          margin-right: 0;
        }
        .time {
        
          width: 75px;

          color: #a4a4a4;
         
        }
        .class {
          flex: 5;
          color: #646464;
          
        }
        .correct {
          width: 42px;
          color: #ff7537;
          font-weight: 500;
         
        }
        .number {
          width: 32px;
          height: 20px;
          color: #ee5f66;
          text-align: center;
          font-size: 12px;
          line-height: 20px;
          background: #fdebec;
          border-radius: 10px 10px 10px 10px;
          opacity: 1;
        }
      }
      li:last-child {
        border-bottom: 1px solid #f5f5f5;
      }
    }
  }
  ul::-webkit-scrollbar {
    display: none !important;
  }
  .data {
    line-height: 30px;
    color: #bcbebf;
    font-size: 12px;
    text-align: center;
    background: #f5f5f5;
  }
}
</style>
