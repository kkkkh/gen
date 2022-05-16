<template>
    <el-popover v-model:visible="visible" placement="bottom" :width="160">
        <el-input-number v-model="number"></el-input-number>
        <div class="flex justify-between mt-2">
            <el-button size="small" text @click="close">cancel</el-button>
            <el-button size="small" type="primary" @click="addHandle">ok</el-button>
        </div>
        <template #reference>
            <el-button @click="visible = true">add</el-button>
            <!-- <el-tooltip effect="dark" content="add 增加" placement="top-start">
                <el-button @click="visible = true">add</el-button>
            </el-tooltip> -->
        </template>
    </el-popover>
</template>
<script setup lang="ts">
import { ref } from "vue";
const visible = ref(false);
const number = ref(1);
const emits = defineEmits(['number'])
const addHandle = ()=>{
    emits("number",number.value)
    close()
}
const close = ()=>{
    number.value = 1
    visible.value = false
}
</script>
