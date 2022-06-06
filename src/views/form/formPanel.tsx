import { ref, defineComponent } from 'vue'
import { typeOptions, controlsPositionOptions } from '@/data/options'
import { initData } from '@/data/init'
import { getField } from '@/data/default'
import { genCode } from '@/hooks/form/genCode'
import { prettierFormat } from '@/utils/format'
import { configHandle, setConfigForm } from "@/hooks/form/configForm"
import { storageHandle } from '@/hooks/form/storage'

import { FeildType, FormListType } from '@/types/field'
import { FormKeyType } from '@/types/form'
import { StructureComType } from '@/types/structure'
import {BtnListType} from '@/types/btn'
import {StorageItemType} from '@/types/stroage'

import { ElForm, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons'
import BtnBar from '@/components/form/btnBar.vue'
import ToolBar from '@/components/form/toolBar.vue'
import StorageBar from '@/components/form/storageBar.vue'
export default defineComponent({
  emits: ['update:code'],
  components:{
    ToolBar,
    BtnBar,
    StorageBar,
  },
  setup(_props, { emit: emits }){
    const elFormRef = ref<typeof ElForm>()
    const ruleForm = ref<FeildType<FormKeyType>[]>([getField()])
    const delHandle = (index: number) => {
      ruleForm.value.splice(index, 1)
    }
    const { configForm } = configHandle()
    const viewCodeHandle = () => {
      const code = genCode(configForm, ruleForm.value as FormListType, btns.value)
      const formatCode = prettierFormat(code)
      emits('update:code', formatCode)
    }
    const { setStorage } = storageHandle('form')
    const genHandle = () => {
      elFormRef.value?.validate((valid: boolean) => {
        if (valid) {
          viewCodeHandle()
          setStorage({ configForm, ruleForm: ruleForm.value as FormListType })
        } else {
          ElMessage.error("error validate!!")
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
      const fArr = new Array(num).fill(getField()) 
      ruleForm.value.push(...fArr)
    }
    const updateStorage = (storageValue:StorageItemType)=>{
      ruleForm.value = storageValue.ruleForm
      setConfigForm(storageValue.configForm)
      viewCodeHandle()
    }
    const btns = ref([{ value: '取消', eventMethodName: 'cancel' }, { value: '保存', type: 'primary', eventMethodName: 'save' }])
    const options:{[name:string]:any[]} = {
      controlsPositionOptions
    }
    return ()=> {
      const structureCom:StructureComType = {
        input: (attrs)=>{
          return (
            <el-input v-model={attrs.value} clearable></el-input>
          )
        },
        checkbox: (attrs)=>{
          return (
            <el-checkbox v-model={attrs.value} clearable></el-checkbox>
          )
        },
        inputNumber(attrs){
          return (
            <el-input-number v-model={attrs.value} clearable max={100} min={0}></el-input-number>
          )
        },
        select(attrs){
          return (
            <el-select v-model={attrs.value} placeholder>
              {
                options[`${attrs.key as string}Options`].map(item =>
                  <el-option key={item.value} value={item.value}>{ item.label }</el-option>
                )
              }
            </el-select>
          )
        }
      }
      return (
        <div class="gen-form">
          <toolBar onAdd={addHandle} onGen={genHandle}/>
          <el-form class="px-2" ref={elFormRef} label-width="80px" size="mini" model={ruleForm}>
          {
            ruleForm.value.map((form,index) => 
              <div class="flex flex-col p-4 bg-gray-500 odd:bg-gray-900" key={index}>
                <div class="flex items-start">
                  <el-form-item label="label" prop="label">
                    <el-input v-model={form.label} clearable></el-input>
                  </el-form-item>
                  <el-form-item label="field" prop="field">
                    <el-input v-model={form.field} clearable></el-input>
                  </el-form-item>
                  <el-form-item label="type" prop={`${index}.type`} rules={[
                    {
                      required: true,
                      message: '请输入type',
                      trigger: 'change',
                    },
                  ]}>
                    <el-select v-model={form.type} clearable onChange={(type: any) => typeChange(type, index)}>
                      {
                        typeOptions.map(item =>
                        <el-option key={index} value={item.value}>{ item.label }</el-option>
                        )
                      }
                    </el-select>
                  </el-form-item>
                  {index !== 0?<el-button class="ml-4" type="danger" icon={Delete} onClick={()=>delHandle(index)}></el-button>:''}
                </div>
                <div class="flex flex-wrap">
                  <el-form-item label="_value" prop="_value">
                    <el-input v-model={form._value} clearable></el-input>
                  </el-form-item>
                  <el-form-item style="width:258px" label="_required" prop="_required">
                    <el-checkbox v-model={form._required} clearable></el-checkbox>
                  </el-form-item>
                  {form.type && form.attrs ? form.attrs.map((item)  => {
                    return <el-form-item label={item.key} prop={item.key}>
                      {
                        structureCom[item.elType](item)
                      }
                    </el-form-item>
                  }):null}
                </div>
              </div>
            )
          }
          </el-form>
          <btn-bar value={btns.value} onUpdate:value={(val:BtnListType)=> btns.value = val}></btn-bar>
          <storage-bar onUpdate={updateStorage}></storage-bar>
        </div>
      )
    }
  },
})