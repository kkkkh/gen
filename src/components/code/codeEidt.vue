<template>
    <codemirror v-model="code" placeholder="Code goes here..." :style="{ height: '600px' }" :autofocus="true"
        :indent-with-tab="true" :tabSize="2" :extensions="extensions" @ready="log('ready', $event)"
        @change="log('change', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
</template>
<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref, watch } from "vue";
const props = defineProps({
    value: {
        type: String,
        default: () => ''
    },
});
const code = ref('')
const extensions = [javascript(), html(), oneDark]
watch(() => props.value, (val: string) => {
    code.value = val
})
const log = (type: string, event: unknown) => {
    console.log(type, event)
}
</script>