<script lang="ts" setup>
import CustomTable from "@/components/customTable/customTable.vue";
import CustomSelect from "@/components/customSelect/customSelect.vue";
import { ref, reactive, toRefs, onMounted, defineProps } from "vue";
const { data } = defineProps({
  data: {
    type: String,
    require: true,
  },
});
console.log(data,'yyyyyyyy');


// const id = ref(outlineId);
const outlineData3 = reactive([
 
]);
const targetList = reactive([
  {
    label: "课设目标1",
    value: "1",
  },
  {
    label: "课设目标2",
    value: "2",
  },
  {
    label: "课设目标3",
    value: "3",
  },
]);
// 新增题
const addHandler = () => {
    console.log(data,12325446);
  outlineData3.push({
    id: "2",
    titleNum: "",
    type: "",
    score: 0,
    subtopicList: [
      {
        titleNum: 0,
        score: 0,
        courseObjectivesId: "",
      },
    ],
  });
};
// 新增小题
const addSubtopic = (val) => {
  outlineData3.forEach((item) => {
    if (item.id == val) {
      item.subtopicList.push({
        titleNum: 0,
        score: 0,
        courseObjectivesId: "",
      });
    }
  });
  console.log(val, "yyyyyyyy");
  
};
const list = reactive([]);
const Handler = () => {
  outlineData3.forEach((item) => {
    list.push({
      outlineId: outlineId,
      titleNum: item.titleNum,
      type: item.type,
      score: item.score,
    });
  });
  console.log(list,'ppppppppppppp');
};
</script>

<template>
  <div style="widht: 100%">
    <CustomTable
      class="table3"
      :data="outlineData3"
      border
      style="width: 100%; margin-top: 20px"
    >
      <template #default>
        <el-table-column label="题号">
          <template #default="scope">
            <input v-model="scope.row.titleNum" />
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template #default="scope">
            <input v-model="scope.row.type" />
          </template>
        </el-table-column>
        <el-table-column label="分值">
          <template #default="scope">
            <input v-model="scope.row.score" />
          </template>
        </el-table-column>
        <el-table-column label="小题号">
          <template #default="scope">
            <ul class="subtopic-main">
              <li
                class="subtopic-box"
                v-for="item in scope.row.subtopicList"
                :key="item"
              >
                <div>
                  <input v-model="item.titleNum" class="text" />
                </div>
                <div>
                  <button
                    class="addSubtopic"
                    @click="addSubtopic(scope.row.id)"
                  >
                    <el-icon style="margin-right: 5px"><CirclePlus /></el-icon
                    >增加
                  </button>
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
                v-for="item in scope.row.subtopicList"
                :key="item"
              >
                <div>
                  <input v-model="item.score" class="text" />
                </div>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="课程目标" align="center">
          <template #default="scope">
            <ul class="subtopic-main">
              <li
                class="subtopic-box"
                v-for="item in scope.row.subtopicList"
                :key="item"
              >
                <div>
                  <CustomSelect
                    :localdata="targetList"
                    style="margin: 5px 0 5px 0"
                  ></CustomSelect>
                </div>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80px">
          <i class="iconfont icon-tianxieicon" style="color: red"></i>
        </el-table-column>
      </template>
    </CustomTable>
    <button class="add" @click="addHandler">添加</button>
    <div @click="Handler">确定</div>
  </div>
</template>

<style lang="scss" scoped>
.subtopic-box {
  padding: 8px 0;
  display: flex;
  height: 50px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
}

li:last-child {
  border: 0;
}
.text {
  margin: auto;
  //   margin: 5px;
  width: 70px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.addSubtopic {
  margin-top: 5px;
  color: #2ebba3;
  background-color: transparent;
}
.add {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #2ebba3;
  text-align: center;
  background-color: transparent;
  border: 1px solid #2ebba3;
}
</style>
