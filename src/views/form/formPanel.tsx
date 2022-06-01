import { ref, defineComponent } from 'vue'
import { typeOptions, controlsPositionOptions } from '@/data/options'
import { genTemplete } from '@/model/templete'
import { FeildType, FormListType } from '@/types/field'
import { initData } from '@/data/init'
import { FormKeyType, FormKeyTypeNoUd } from '@/types/form'
import { ElForm, ElMessage } from 'element-plus'
import { getField } from '@/data/default'
import { Delete, CircleCloseFilled } from '@element-plus/icons'
import { prettierFormat } from '@/utils/format'
import { configHandle, setConfigForm } from "@/hooks/config"
import { storageHandle } from '@/hooks/storage'
import BtnConfig from '@/components/form/btnConfig.vue'
import ToolBar from '@/components/form/toolBar.vue'
import { StructureType,StructureComType } from '@/types/structure'
import {BtnListType} from '@/types/btn'
export default defineComponent({
  emits: ['update:code'],
  components:{
    ToolBar,
    BtnConfig,
    CircleCloseFilled,
  },
  setup(_props, { emit: emits }){
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
      debugger
      const dataForm = saveBaseForm(ruleForm.value[index], getField()) // 保留基础值
      if (key) {
        debugger
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
    const structure:StructureType = {
      input:{},
      checkbox:{
        _message:'input',
        _option:'input',
      },
      select:{
        _option:'input',
      },
      radio:{
        _option:'input',
      },
      upload:{
        _size:'inputNumber',
        _accept:'input',
        _multiple:'checkbox',
        _limit:'inputNumber',
      },
      inputNumber:{
        _min:'inputNumber',
        _max:'inputNumber',
        _step:'inputNumber',
        _controlsPosition:'select'
      },
      datePicker:{}
    }
    
    const options:{[name:string]:any[]} = {
      controlsPositionOptions
    }
    return ()=> {
      const structureCom:StructureComType = {
        input: (key,form)=>{
          return (
            <el-input v-model={form.attrs[key]} clearable></el-input>
          )
        },
        checkbox: (key,form)=>{
          return (
            <el-checkbox v-model={form.attrs[key]} clearable></el-checkbox>
          )
        },
        inputNumber(key,form){
          return (
            <el-input-number v-model={form.attrs[key]} clearable max={100} min={0}></el-input-number>
          )
        },
        select(key,form){
          return (
            <el-select v-model={form.attrs[key]} placeholder>
              {
                options[`${key.slice(1)}Options`].map(item =>
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
          <el-form class="px-2" ref="elFormRef" label-width="80px" size="mini" model={ruleForm}>
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
                  {index !== 0?<el-button class="ml-4" type="danger" icon={Delete} onClick={delHandle(index)}></el-button>:''}
                </div>
                <div class="flex flex-wrap">
                  <el-form-item label="_value" prop="_value">
                    <el-input v-model={form._value} clearable></el-input>
                  </el-form-item>
                  <el-form-item style="width:258px" label="_required" prop="_required">
                    <el-checkbox v-model={form._required} clearable></el-checkbox>
                  </el-form-item>
                  {form.type && form.attrs?Object.keys(form.attrs).map((fKey)  => {
                    const type = form.type as FormKeyTypeNoUd
                    const subStr = structure[type]
                    const strComName:keyof StructureComType = subStr[fKey]
                    return <el-form-item label={fKey} prop={fKey}>
                      {
                        structureCom[strComName](fKey, form)
                      }
                    </el-form-item>
                  }):null}
                </div>
              </div>
            )
          }
          </el-form>
          <btn-config value={btns.value} onUpdate:value={(val:BtnListType)=> btns.value = val}></btn-config>
          <div class="flex m-2 items-center flex-wrap">
            {storage.value.length?<span class="text-xs">storage：</span>:null}
            {
              storage.value.map((item,index) =>
                <div class="relative mx-2 my-1" key={index}>
                  <el-icon class="absolute z-10 right-0 top-0 -mr-2 -mt-1 cursor-pointer text-red-600 hover:text-red-500"
                  onClick={deleteStorage(item.label, index)}>
                    <circle-close-filled />
                  </el-icon>
                  <el-button onClick={viewStorage(index)}>{ item.label }</el-button>
                </div>
              )
            }
          </div>
        </div>
      )
    }
        
  },
})