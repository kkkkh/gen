<template>
    <div class="flex w-full justify-between px-2 py-1">
        <el-tooltip effect="dark" content="form config" placement="top-start">
            <el-button type="primary" size="mini" @click="show">config</el-button>
        </el-tooltip>
        <slot></slot>
    </div>
    <el-drawer v-model="visible" title="config" :direction="direction">
        <el-form class="text-left" label-width="80px" size="mini" :model="configForm">
            <h3>name</h3>
            <el-form-item label="ref" prop="ref">
                <el-input v-model="configForm.ref" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="model" prop="model">
                <el-input v-model="configForm.model" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="rules" prop="rules">
                <el-input v-model="configForm.model" placeholder clearable></el-input>
            </el-form-item>
            <el-form-item label="class" prop="class">
                <el-input v-model="configForm.class" placeholder clearable></el-input>
            </el-form-item>
            <h3>prop</h3>
            <el-form-item label="labelWidth" prop="_labelWidth">
                <el-input-number v-model="configForm._labelWidth" placeholder clearable></el-input-number>
            </el-form-item>
            <el-form-item label="script" prop="_scriptType">
                <el-select v-model="configForm._scriptType" clearable>
                    <el-option v-for="(item, index) in scriptOptions" :key="index" :value="item.value">{{ item.label }}</el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { configHandle } from "@/hooks/config";
import { scriptOptions } from '../data/options'

const direction = ref('rtl')

const { visible, show, close, configForm } = configHandle()
</script>
