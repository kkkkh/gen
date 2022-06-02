<template>
    <div class="toolbar">
        <div :class="{
            'flex w-full justify-end p-2': true,
            'toolbar-fixed': isFixed
        }" ref="tooBar">
            <el-tooltip effect="dark" content="form config" placement="top-start">
                <el-button type="primary" size="mini" @click="show">config</el-button>
            </el-tooltip>
            <div class="ml-3">
                <el-popover v-model:visible="add.visible" placement="bottom" :width="160">
                    <el-input-number v-model="add.number"></el-input-number>
                    <div class="flex justify-between mt-2">
                        <el-button size="small" text @click="close">cancel</el-button>
                        <el-button size="small" type="primary" @click="addHandle">ok</el-button>
                    </div>
                    <template #reference>
                        <el-button @click="add.visible = true">add</el-button>
                    </template>
                </el-popover>
                <el-tooltip effect="dark" content="gen 生成" placement="top-start">
                    <el-button @click="genHandle">gen</el-button>
                </el-tooltip>
            </div>
            <config-form-drawer ref="configFormDrawer"></config-form-drawer>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import ConfigFormDrawer from '@/components/form/configFormDrawer.vue'
import { scrollHandle } from "@/hooks/tool/scroll";
// drawer
const configFormDrawer = ref();
const show = () => {
    configFormDrawer.value?.show()
}
// add
const emits = defineEmits(['add', 'gen'])
const add = reactive({
    visible: false,
    number: 1,
})
const addHandle = () => {
    emits("add", add.number)
    close()
}
const close = () => {
    add.number = 1
    add.visible = false
}
// gen
const genHandle = () => {
    emits("gen")
}
// scroll
const isFixed = ref(false)
const tooBar = ref()
onMounted(() => {
    const offsetTop = tooBar.value.offsetTop
    scrollHandle((scrollTop: number) => {
        isFixed.value = scrollTop > offsetTop
    })
})
</script>
<style>
.toolbar {
    height: 44px;
}

.toolbar-fixed {
    @apply fixed left-0 top-0 z-50;
    width: 50%;
}
</style>
