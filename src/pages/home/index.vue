<script lang="ts" setup>
import Home from "../components/home.vue";
import SideList from "../components/sideList.vue";
import { home, side } from "../../utils/student";
import { reactive, ref } from "vue";
let homeList = reactive(home);
let sideLiST = reactive(side);
</script>

<template>
  <div class="student-main">
    <div class="main-left">
      <Home :data="homeList"></Home>
    </div>
    <div class="main-right">
      <SideList :data="sideLiST"></SideList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-scrollbar {
  --el-scrollbar-bg-color: black;
}
.student-main {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 70px);
  overflow-x: hidden;
}
.main-left {
  height: 120px;
  display: flex;
}
.curriculum-box {
  width: 200px;
  height: 100px;
  padding: 20px;
  margin-right: 30px;
  font-size: 18px;
  color: #57c8b5;
  border-radius: 20px;
  background-color: #e1e8e7;
}
.kesheicon {
  width: 30px;
  height: 30px;
  font-size: 32px;
}
.jiantouico {
  font-size: 18px;
  color: #000;
}
.main-right {
  position: absolute;
  top: 120px;
  right: 60px;
  bottom: 50px;
  height: 700px;
  overflow-y: auto;
  width: 300px;
  .main-li {
    position: relative;
    margin-bottom: 15px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 5px;
    border-left: 4px solid #ff7537;
    .main-li-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      width: 15px;
      height: 20px;
    }
  }
}
.main-right::-webkit-scrollbar {
	display: none !important;
}
.right {
  .el-icon {
    height: 2em;
    width: 2em;
  }
  .account:hover,
  .quit:hover {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    background-color: #1abc9c;
  }
}
</style>
