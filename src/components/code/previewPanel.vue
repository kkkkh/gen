<template>
    <div ref="iframeDiv"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import createIframe from "@/hooks/code/iframe";
const iframeDiv = ref();
const iframe = ref();
const props = defineProps({
    value: {
        type: String || Object,
        default: ""
    }
})
watch(() => props.value, (val: string | { head: string; body: string }) => {
    iframe.value.setHTML(val);
})
onMounted(() => {
    const sandboxAttributes = [
        'allow-modals',
        'allow-forms',
        'allow-pointer-lock',
        'allow-popups',
        'allow-same-origin',
        'allow-scripts'
    ];
    iframe.value = createIframe(
        {
            el: iframeDiv.value,
            sandboxAttributes
        }
    )
})
</script>

