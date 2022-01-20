<template>
  <!-- <div class="p-4 bg-gray-700 text-left relative" contenteditable readonly> -->
  <div class="code-panel p-4 bg-gray-700 text-left relative">
    <el-tabs v-model="active">
      <el-tab-pane label="code" name="code">
        <el-button class="absolute right-0 top-0 mr-2 mt-2 z-10" size="small" type="primary" @click="copyHandle">copy</el-button>
        <code-eidt :value="code"></code-eidt>
      </el-tab-pane>
      <el-tab-pane label="preview" name="preview">
        <div class="preview">
          <preview :value="previewCode"></preview>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
export default {
  name: "CodePanel",
};
</script>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed, watch, ref } from "vue";
import CodeEidt from "@/components/form/codeEidt.vue";
import Preview from "@/components/form/preview.vue";
import { parseComponent } from "vue-template-compiler";
import getImports from "@/utils/get-imports.ts"
import importsCompiledHandle from '@/utils/compiled-import'
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});
const previewCode = ref()
watch(() => props.code, (val: string) => {
  transformCode(val)
})
const transformCode = (val: string) => {
  const { template, script } = parseComponent(val)
  let compiled;
  const imports: [] = [];
  if (script) {
    try {
      compiled = window?.Babel.transform(script.content, {
        presets: ["env"],
        plugins: [[getImports, { imports }]],
      }).code;
    } catch (e) {
      previewCode.value = `<pre style="color: red">${(e as Error).message}</pre>`;
      return;
    }
    // scriptContent = await getPkgs(compiled, imports, pkgs);
  }
  // const heads = styles.map(style => `<style>${style.content}</style>`)
  const importsCompiled = importsCompiledHandle(imports)
  const scripts = [
    // eslint-disable-next-line no-useless-escape
    '<script src=//unpkg.com/vue><\/script>',
    '<script src=//unpkg.com/@vue/composition-api><\/script>',
    '<script src=//unpkg.com/element-ui><\/script>',
    `<script>
      var exports = {};
      ${importsCompiled}
      ${compiled}
      var component = exports.default;
      component.template = component.template || ${JSON.stringify(template?.content)}
      new Vue(component).$mount('#app')
      <\/script>
    `
  ]
  const css = [
    '//unpkg.com/element-ui/lib/theme-chalk/index.css'
  ]
  const heads = css.map(val => `<link rel="stylesheet" href="${val}">`)
  previewCode.value = {
    head: heads.join("\n"),
    body: '<div id="app"></div>' + scripts.join("\n"),
  };
}
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
