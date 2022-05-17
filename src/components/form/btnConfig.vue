<template>
    <div class="flex m-2 items-center">
        <span class="text-xs">btns：</span>
        <el-select class="ml-2" v-for="(valItem, index) in configValue" :key="index" v-model="valItem.value" filterable
            allow-create default-first-option :reserve-keyword="false" placeholder="">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button class="ml-2" type="primary" :icon="Plus" circle @click="add" />
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { Plus } from '@element-plus/icons-vue'
const props = withDefaults(defineProps<{
    value: { value: string }[]
}>(), {
    value: () => [{ value: '取消' }, { value: '保存' }]
});
const emits = defineEmits(['update:value'])

const options = ref([
    { label: '取消', value: '取消' },
    { label: '保存', value: '保存' },
    { label: '提交', value: '提交' },
])
const configValue = computed<{ value: string }[]>({
    get() {
        return props.value
    },
    set(val) {
        emits('update:value', val)
    },
})
const add = () => {
    configValue.value = [...configValue.value, { value: '' }]
}
</script>
