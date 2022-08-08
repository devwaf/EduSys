<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

const dialogVisible = ref(false);
const yy=ref('40%')
import { defineProps } from "vue";
const { prop, column,isEdit,width} = defineProps({
  isEdit: {
    type: Boolean,
    require: true,
  },
  column: {
    type: String,
    require: true,
  },
  width:{
     type: String,
    require: true,
  }
});
yy.value=width
const handleClose = (done: () => void) => {
   done();

};
</script>

<template>
  <div>
    <el-dialog
      v-model="isEdit"
      :title="column"
      :width="yy"
      :before-close="handleClose"
    >
      <div class="dialog-main">
        <slot name="dialog"></slot>
      </div>

      <span class="dialog-footer">
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
  // min-width: 40%;
  .el-dialog__header {
    padding: 10px;
    margin: 0;
    text-align: left;
    background-color: #f5f5f5;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .footer {
    text-align: right;
  }
  .el-dialog__close {
    margin-right: 20px;
    margin-bottom: 10px;
  }
  // .dialog-footer {
  // :deep(.el-button:hover) {
  //  background-color: #2ebba3;
  //  opacity: 0.2;
  //   //
  // }
  // }
}
</style>