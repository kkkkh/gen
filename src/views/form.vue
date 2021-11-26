<template>
  <div class="flex">
    <form-panel class="flex-1" v-model:code="code"></form-panel>
    <code-panel class="flex-1" v-model:code="code"></code-panel>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CodePanel from "./codePanel.vue";
import FormPanel from "./formPanel.vue";
// import { ref } from "vue";
defineExpose({
  CodePanel,
  FormPanel,
});
const code = ref("");
</script>
