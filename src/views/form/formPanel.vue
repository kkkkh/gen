<template>
  <div class="gen-form">
    <!-- config -->
    <tool-bar @add="addHandle" @gen="genHandle"></tool-bar>
    <!-- form -->
    <el-form class="px-2" ref="elFormRef" label-width="80px" size="mini" :model="ruleForm">
      <div class="flex flex-col p-4 bg-gray-500 odd:bg-gray-900" v-for="(form, index) in ruleForm" :key="index">
        <div class="flex items-start">
          <el-form-item label="label" prop="label">
            <el-input v-model="form.label" clearable></el-input>
          </el-form-item>
          <el-form-item label="field" prop="field">
            <el-input v-model="form.field" clearable></el-input>
          </el-form-item>
          <el-form-item label="type" :prop="`${index}.type`" :rules="[
            {
              required: true,
              message: '请输入type',
              trigger: 'change',
            },
          ]">
            <el-select v-model="form.type" clearable @change="(type: any) => typeChange(type, index)">
              <el-option v-for="(item, index) in typeOptions" :key="index" :value="item.value">{{ item.label }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-button class="ml-4" v-if="index !== 0" type="danger" :icon="Delete" @click="delHandle(index)"></el-button>
        </div>
        <div class="flex flex-wrap">
          <el-form-item label="_value" prop="_value">
            <el-input v-model="form._value" clearable></el-input>
          </el-form-item>
          <el-form-item style="width:258px" label="_required" prop="_required">
            <el-checkbox v-model="form._required" clearable></el-checkbox>
          </el-form-item>
          <div v-if="form.attrs">
            <el-form-item v-if="'_message' in form.attrs" label="_message" prop="_message">
              <el-input v-model="form.attrs._message" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="'_option' in form.attrs" label="_option" prop="_option">
              <el-input v-model="form.attrs._option" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="'_rows' in form" label="_rows" prop="_rows">
            <el-input-number v-model="form._rows" clearable></el-input-number>
          </el-form-item>
          <el-form-item v-if="'_maxlength' in form" label="_maxlength" prop="_maxlength">
            <el-input-number v-model="form._maxlength" clearable></el-input-number>
          </el-form-item> -->
            <el-form-item v-if="'_size' in form.attrs" label="_size(MB)" prop="_size">
              <el-input-number v-model="form.attrs._size" clearable :max="100" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item v-if="'_accept' in form.attrs" label="_accept" prop="_accept">
              <el-input v-model="form.attrs._accept"></el-input>
            </el-form-item>
            <el-form-item v-if="'_multiple' in form.attrs" label="_multiple" prop="_multiple">
              <el-checkbox v-model="form.attrs._multiple"></el-checkbox>
            </el-form-item>
            <el-form-item v-if="'_multiple' in form.attrs && form.attrs._multiple" label="_limit" prop="_limit">
              <el-input-number v-model="form.attrs._limit" clearable :max="100" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item v-if="'_min' in form.attrs" label="_min" prop="_min">
              <el-input-number v-model="form.attrs._min" clearable :max="100" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item v-if="'_max' in form.attrs" label="_max" prop="_max">
              <el-input-number v-model="form.attrs._max" clearable :max="1000000" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item v-if="'_step' in form.attrs" label="_step" prop="_step">
              <el-input-number v-model="form.attrs._step" clearable :max="1000" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item v-if="'_controlsPosition' in form.attrs" label="_controlsPosition" prop="_controlsPosition">
              <el-select v-model="form.attrs._controlsPosition" placeholder>
                <el-option v-for="item in controlsPositionOptions" :key="item.value" :value="item.value">{{ item.label
                }}
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <!-- btn -->
    <btn-config v-model:value="btns"></btn-config>
    <!-- store -->
    <div class="flex m-2 items-center flex-wrap">
      <span class="text-xs" v-if="storage.length">storage：</span>
      <div class="relative mx-2 my-1" v-for="(item, index) in storage" :key="index">
        <el-icon class="absolute z-10 right-0 top-0 -mr-2 -mt-1 cursor-pointer text-red-600 hover:text-red-500"
          @click="deleteStorage(item.label, index)">
          <circle-close-filled />
        </el-icon>
        <el-button @click="viewStorage(index)">{{ item.label }}</el-button>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { ref, defineComponent } from 'vue'
import { typeOptions, controlsPositionOptions } from '@/data/options'
import { genTemplete } from '@/model/templete'
import { FeildType, FormListType } from '@/types/field'
import { initData } from '@/data/init'
import { FormKeyType } from '@/types/form'
import { ElForm, ElMessage } from 'element-plus'
import { getField } from '@/data/default'
import { Delete, CircleCloseFilled } from '@element-plus/icons'
import { prettierFormat } from '@/utils/format'
import { configHandle, setConfigForm } from "@/hooks/config"
import { storageHandle } from '@/hooks/storage'
import BtnConfig from '@/components/form/btnConfig.vue'
import ToolBar from '@/components/form/toolBar.vue'

export default defineComponent({
  name: 'FormPanel',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  components: {
    ToolBar,
    BtnConfig,
    CircleCloseFilled,
  },
  emits: ['update:code'],
  setup(_props, { emit: emits }) {
    const elFormRef = ref<typeof ElForm>()
    const ruleForm = ref<FeildType<FormKeyType>[]>([getField()])
    const delHandle = (index: number) => {
      ruleForm.value.splice(index, 1)
    }
    const { configForm } = configHandle()
    const { storage, setStorage, getStorage, deleteStorage } = storageHandle('form')

    const viewStorage = (index: number) => {
      const storageValue = getStorage(index)
      ruleForm.value = storageValue.ruleForm
      setConfigForm(storageValue.configForm)
      viewCodeHandle()
    }
    const viewCodeHandle = () => {
      // debugger
      const code = genTemplete(configForm, ruleForm.value as FormListType, btns.value)
      const formatCode = prettierFormat(code)
      emits('update:code', formatCode)
    }
    const genHandle = () => {
      elFormRef.value?.validate((valid: boolean) => {
        if (valid) {
          viewCodeHandle()
          setStorage({ configForm, ruleForm: ruleForm.value as FormListType })
        } else {
          ElMessage.error("error validate!!")
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
        ruleForm.value[index] = { ...dataForm, attrs: data }
      } else {
        ruleForm.value[index] = { ...dataForm }
      }
    }
    const addHandle = (num: number) => {
      for (let i = 0; i < num; i++) {
        ruleForm.value.push(getField())
      }
    }
    const btns = ref([{ value: '取消', eventMethodName: 'cancel' }, { value: '保存', type: 'primary', eventMethodName: 'save' }])
    return {
      ref,
      defineComponent,
      typeOptions,
      controlsPositionOptions,
      genTemplete,
      initData,
      ElForm,
      ElMessage,
      getField,
      Delete,
      CircleCloseFilled,
      prettierFormat,
      configHandle,
      setConfigForm,
      storageHandle,
      BtnConfig,
      elFormRef,
      ruleForm,
      delHandle,
      configForm,
      storage,
      setStorage,
      getStorage,
      deleteStorage,
      viewStorage,
      viewCodeHandle,
      genHandle,
      saveBaseForm,
      typeChange,
      addHandle,
      btns,
    };
  },
});
</script>
<style>
.el-form-item__content {
  width: 178px;
  @apply text-left;
}
</style>