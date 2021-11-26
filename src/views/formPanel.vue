<template>
  <div class="gen-form">
    <el-form class="demo-ruleForm" ref="elFormRef" label-width="80px" size="mini" :model="ruleForm">
      <div class="flex flex-col p-4 bg-gray-500 odd:bg-gray-900" v-for="(form, index) in ruleForm" :key="index">
        <div class="flex items-start">
          <el-form-item label="field" prop="field">
            <el-input v-model="form.field" clearable></el-input>
          </el-form-item>
          <el-form-item label="label" prop="label">
            <el-input v-model="form.label" clearable></el-input>
          </el-form-item>
          <el-form-item
            label="type"
            :prop="`${index}.type`"
            :rules="[
              {
                required: true,
                message: '请输入type',
                trigger: 'change',
              },
            ]"
          >
            <el-select v-model="form.type" clearable @change="(type) => typeChange(type, index)">
              <el-option v-for="(item, index) in typeOptions" :key="index" :value="item.value">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-button class="ml-4" v-if="index !== 0" type="danger" :icon="Delete" @click="delHandle(index)"></el-button>
        </div>
        <div class="flex">
          <el-form-item label="_value" prop="_value">
            <el-input v-model="form._value" clearable></el-input>
          </el-form-item>
          <el-form-item label="_required" prop="_required">
            <el-checkbox v-model="form._required" clearable></el-checkbox>
          </el-form-item>
          <el-form-item v-if="'_message' in form" label="_message" prop="_message">
            <el-input v-model="form._message" clearable></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div>
      <el-button @click="addHandle">add</el-button>
      <el-button @click="genHandle">gen</el-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'FormPanel',
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { typeOptions } from '../data/options'
import { formModelGen } from '../model/form'
import { FeildType } from '../types/field'
import { initData } from '../data/init'
import { FormKeyType, FormKeyTypeNoUd } from '../types/form'
import { ElForm } from 'element-plus'
import { getField } from '../data/default'
import { Delete } from '@element-plus/icons'
import prettier from '../lib/prettier/esm/standalone.mjs'
import parserHtml from '../lib/prettier/esm/parser-html.mjs'
import parserBabel from '../lib/prettier/esm/parser-babel.mjs'
const props = defineProps<{
  code: string
}>()
const emits = defineEmits(['update:code'])
const elFormRef = ref<typeof ElForm>()
const ruleForm = ref<FeildType<FormKeyType>[]>([getField()])
const delHandle = (index: number) => {
  ruleForm.value.splice(index, 1)
}
const genHandle = () => {
  elFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      const code = formModelGen(undefined, ruleForm.value as FeildType<FormKeyTypeNoUd>[])
      const formatCode = prettier.format(code, {
        parser: 'vue',
        plugins: [parserBabel, parserHtml],
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: false,
        embeddedLanguageFormatting: 'auto',
        htmlWhitespaceSensitivity: 'ignore',
        insertPragma: false,
        jsxSingleQuote: true,
        printWidth: 80,
        proseWrap: 'never',
        quoteProps: 'preserve',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
        vueIndentScriptAndStyle: true,
      })
      emits('update:code', formatCode)
    } else {
      console.log('error validate!!')
    }
  })
}

const saveBaseForm = <T, S extends keyof T>(dataForm: T, form: Pick<T, S>): Pick<T, S> => {
  for (const key in form) {
    form[key] = dataForm[key]
  }
  return { ...form }
}

const typeChange = (key: FormKeyType, index: number) => {
  const dataForm = saveBaseForm(ruleForm.value[index], getField()) // 保留基础值
  if (key) {
    const data = initData[key]() // type对应初始值
    ruleForm.value[index] = { ...dataForm, ...data }
  } else {
    ruleForm.value[index] = { ...dataForm }
  }
}
const addHandle = () => {
  ruleForm.value.push(getField())
}
</script>
