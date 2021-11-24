import {FormConfig, FormKeyType} from '../types/form'
import {FeildType, GenFunType} from '../types/field'
import {defaultConfig} from '../data/default'

export const formModelGen = (formConfig: FormConfig = defaultConfig, formList: FeildType[]) => {
	const formModel = `<el-form
    ref="${formConfig.ref}"
    :model="${formConfig.model}"
    :rules="${formConfig.rules}"
    label-width="${formConfig._labelWidth}"
    class="${formConfig.class}"
  >
    ${formListMap(formList)}
  </el-form>`
	return formModel
}
const formListMap = (formlist: FeildType[]) => {
	return formlist.map((item) => {
		const type = item.type as Exclude<FormKeyType, undefined>
		return formItemModelGen(item, gen[type](item))
	})
}
export const formItemModelGen = (formItem: FeildType, genTypeVal: string) => {
	const formModel = `<el-form-item label="${formItem.label}" prop="${formItem.field}">
      ${genTypeVal}
    </el-form-item>`
	return formModel
}
export const gen: GenFunType = {
	input: (val) => {
		const inputModel = `<el-input v-model="ruleForm.${val.field}" placeholder="请输入${val.label}" clearable />`
		return inputModel
	},
	select: (val) => {
		const inputModel = `<el-select v-model="ruleForm.${val.field}" placeholder="请选择${val.label}" clearable >
      <el-option
        v-for="item in ${val.label}Options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>`
		return inputModel
	},
	checkbox: (val) => {
		const inputModel = `<el-checkbox v-model="ruleForm.${val.field}">${val._message}</el-checkbox>`
		return inputModel
	},
}
