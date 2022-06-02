<template>
  <!-- <div class="p-4 bg-gray-700 text-left relative" contenteditable readonly> -->
  <div class="code-panel bg-gray-700 text-left relative">
    <div class="p-2">
      <el-tabs v-model="active">
        <el-tab-pane label="code" name="code">
          <el-button class="absolute right-0 top-0 mr-2 mt-2 z-10" size="small" type="primary" @click="copyHandle">copy
          </el-button>
          <code-eidt :value="code"></code-eidt>
        </el-tab-pane>
        <el-tab-pane label="preview" name="preview">
          <div class="preview">
            <preview-panel :value="previewCode"></preview-panel>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CodePanel",
};
</script>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { watch, ref } from "vue";
import CodeEidt from "@/components/code/codeEidt.vue";
import PreviewPanel from "@/components/code/previewPanel.vue";
import { configHandle } from '@/hooks/form/configForm'
import { compileCode } from "@/hooks/code/compileCode";
const { configForm } = configHandle()
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});
const previewCode = ref()
watch(() => props.code, (val: string) => {
  previewCode.value = compileCode[configForm._scriptType](val)
})
const copyHandle = () => {
  navigator.clipboard.writeText(props.code).then(() => {
    ElMessage({
      message: "copy success",
      type: "success",
    });
  });
};
const active = ref("code")
</script>
<style lang="scss">
.code-panel {
  .preview {
    height: 600px;
  }
}
</style>
