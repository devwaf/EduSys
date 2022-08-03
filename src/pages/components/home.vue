<script lang="ts" setup>
// import { home } from "../../utils/student";
import { reactive, defineProps } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { data } = defineProps({
  data: {
    type: Array,
    require: true,
  },
});
</script>

<template>
  <div >
    <ul>
      <li class="home-box" v-for="item in data" :key="item">
        <div class="title">
          <div>
            <svg class="icon home-icon" aria-hidden="true">
              <use :xlink:href="item.icon" />
            </svg>
          </div>
          <div class="gin">
            {{ item.title }}
          </div>
        </div>

        <div style="margin-top: 10px">
          <ul>
            <li
              class="title-li"
              v-for="yy in item.list"
              :key="yy"
              @click="router.push(yy.path)"
            >
              {{ yy.name }}
              <svg class="icon home-icon-min" aria-hidden="true">
                <use xlink:href="#icon-jiantouicon" />
              </svg>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
// .home-main{
// }
ul {
  display: flex;
  .home-box {
    margin-right: 80px;
    padding: 20px;
    border-radius: 20px;
    background-color: #fff;
  }
  .home-icon {
    width: 45px;
    height: 45px;
  }
  .home-icon-min {
    width: 40px;
    height: 10px;
  }
  .title {
    line-height: 45px;

    display: flex;
  }
  .gin {
    width: 200px;
    font-size: 20px;

    line-height: 45px;
    margin-left: 20px;
    flex: 1;
  }
  .title-li {
    color: #2ebba3;
    margin-right: 10px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
