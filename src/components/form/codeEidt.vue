<template>
    <div class="code-edit">
        <textarea ref="codeEidt" :value="value"></textarea>
    </div>
</template>
<script setup lang="ts">
import CodeMirror from 'codemirror';
import emmet from '@emmetio/codemirror-plugin';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/vue/vue';
import { ref, watch, nextTick } from "vue";
emmet(CodeMirror);
const props = defineProps({
    value: {
        type: String,
        default: () => ''
    },
    options: {
        type: Object,
        default: () => ({})
    }
});
const codeEidt = ref();
const DEFAULT_OPTIONS = {
    // lineNumbers: true,
    // mode: 'text/x-vue',
    // theme: 'material',
    // tabSize: 2,
    mode: 'vue',
    theme: 'lucario',
    value: `<template></template>`,
    lineNumbers: true,
    tabSize: 2,
    autofocus: true,
    line: true,
    styleActiveLine: true,
    matchBrackets: true,
    extraKeys: {
        Tab: 'emmetExpandAbbreviation',
        Enter: 'emmetInsertLineBreak'
    }
}
const currentOptions = Object.assign({}, DEFAULT_OPTIONS, props.options)

const editor = ref()
// debugger
nextTick(() => {
    editor.value = CodeMirror.fromTextArea(codeEidt.value, currentOptions)
})
watch(() => props.value, (val: string) => {
    val !== editor.value.getValue() && editor.value.setValue(val)
})

</script>
<style lang="scss">
// @import "codemirror/lib/codemirror.css";
// @import "codemirror/theme/material.css";
.code-edit {
    width: 100%;
    height: 600px;
    line-height: 1.2em;
    overflow: auto;
    .CodeMirror {
        border: 1px solid black;
        height: 100%;
        line-height: 1.2rem;
    }
}
</style>