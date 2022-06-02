<template>
    <el-drawer v-model="visible" title="config" :direction="direction">
        <el-form class="text-left" label-width="100px" size="mini" :model="configForm">
            <h3>name</h3>
            <el-form-item label="ref" prop="ref">
                <el-input v-model="configForm.ref" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="model" prop="model">
                <el-input v-model="configForm.model" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="rules" prop="rules">
                <el-input v-model="configForm.rules" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="class" prop="class">
                <el-input v-model="configForm.class" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="size" prop="size">
                <el-input v-model="configForm.size" placeholder clearable></el-input>
            </el-form-item>
            <h3>prop</h3>
            <el-form-item label="labelWidth" prop="_labelWidth">
                <el-input-number v-model="configForm.labelWidth" placeholder clearable></el-input-number>
            </el-form-item>
            <el-form-item label="script" prop="_scriptType">
                <el-select v-model="configForm._scriptType" clearable>
                    <el-option v-for="(item, index) in scriptOptions" :key="index" :value="item.value">{{ item.label }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="column" prop="_columns">
                <el-input-number v-model="configForm._columns" :min="1" :max="3" clearable />
            </el-form-item>
            <el-form-item label="globalDisabled" prop="_globalDisabled">
                <el-checkbox v-model="configForm._globalDisabled" />
            </el-form-item>
            <el-form-item label="components" prop="_components">
                <el-checkbox v-model="configForm._components" />
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { configHandle } from "@/hooks/form/configForm";
import { scriptOptions } from '@/data/options'

const direction = ref('ltr')
const { visible, show, close, configForm } = configHandle()

defineExpose({ show, close })
</script>
