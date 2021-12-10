<template>
    <div class="flex">
        <div class="text-left">
            <h2>gen column data</h2>
            <el-form ref="elForm" :model="form" :rules="rules" type="mini" label-width="100px" class="demo-class">
                <el-form-item label="name" prop="name">
                    <el-input v-model="form.name" placeholder="请输入name" clearable />
                </el-form-item>
                <!-- <el-form-item label="number" prop="number">
                    <el-input v-model="form.number" placeholder="请输入number" clearable />
                </el-form-item>-->
                <el-form-item label="label" prop="label">
                    <el-input v-model="form.label" placeholder="请输入label" clearable />
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="genHandle">gen</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { prettierFormat } from "@/utils/format";
import { ref, reactive, computed } from "vue";

const form = reactive({ name: '', 'label': '', 'number': '', width: 'auto' });
const rules = {
    'label': [
        { 'required': true, 'message': '请输入label', 'trigger': 'blur' },
    ],
    // 'number': [
    //     { 'required': true, 'message': '请输入number', 'trigger': 'blur' },
    // ],
};
const propStr = "abcdefghigklmnopqrstuvwxyz"
const props = propStr.split("")
const genHandle = () => {
    const labels = form.label.split(/\s+/)
    const columns = labels.map((label, index) => {
        return {
            label,
            prop: props[index],
            width: form.width,
        }
    })
    const columnName = computed(() => form.name ? form.name + 'Columns' : 'columns')
    const exportStr = `export const ${columnName.value} = ${JSON.stringify(columns)}`
    console.log(prettierFormat(exportStr, 'babel'))
}
</script>


