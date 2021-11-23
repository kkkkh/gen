import {FormConfig} from './types/form'
import {FormFeild, GenFunType} from './types/field'
import {defaultConfig} from '../data/form'

export const formModelGen = (formConfig: FormConfig = defaultConfig, formList: FormFeild[]) => {
	const formModel = `
        <el-form
            ref="${formConfig.ref}"
            :model="${formConfig.model}"
            :rules="${formConfig.rules}"
            label-width="${formConfig._labelWidth}"
            class="${formConfig.class}"
        >
        ${formListMap(formList)}
        </el-form>
    `
	return formModel
}
const formListMap = (formlist: FormFeild[]) => {
	return formlist.map((item) => {
		return gen[item.type](item)
	})
}
export const gen: GenFunType = {
	input: (val) => {
		const inputModel = `
        <el-form-item label="${val.label}" prop="${val.field}">
          <el-input v-model="ruleForm.${val.field}" />
        </el-form-item>`
		return inputModel
	},
	select: (val) => {
		const inputModel = `
        <el-form-item label="${val.label}" prop="${val.field}">
          <el-input v-model="ruleForm.${val.field}" />
        </el-form-item>`
		return inputModel
	},
	checkbox: (val) => {
		const inputModel = `
        <el-form-item label="${val.label}" prop="${val.field}">
          <el-input v-model="ruleForm.${val.field}" />
        </el-form-item>`
		return inputModel
	},
}
