<template>
  <!-- <div class="p-4 bg-gray-700 text-left relative" contenteditable readonly> -->
  <div class="p-4 bg-gray-700 text-left relative" contenteditable readonly>
    <el-button class="absolute right-0 top-0 mr-2 mt-2 z-10" size="small" type="primary" @click="copyHandle">copy</el-button>
    <code-eidt :value="code"></code-eidt>
  </div>
</template>
<script lang="ts">
export default {
  name: "CodePanel",
};
</script>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed } from "vue";
import CodeEidt from "@/components/form/codeEidt.vue";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const codeView = computed(() => props.code);
const copyHandle = () => {
  navigator.clipboard.writeText(codeView.value).then(() => {
    ElMessage({
      message: "copy success",
      type: "success",
    });
  });
};
</script>
