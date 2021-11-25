import {FormConfig, FormKeyTypeNoUd} from '../types/form'
import {FeildType, GenFunType} from '../types/field'
import {defaultConfig} from '../data/default'
import {genScript} from './script'

export const formModelGen = (formConfig: FormConfig = defaultConfig, formList: FeildType<FormKeyTypeNoUd>[]) => {
	const formModel = `<template>
		<el-form
			ref="${formConfig.ref}"
			:model="${formConfig.model}"
			:rules="${formConfig.rules}"
			label-width="${formConfig._labelWidth}"
			class="${formConfig.class}"
		>
			${formListMap(formList)}
		</el-form>
	</template>
	${genScript.script2x(formList)}`
	return formModel
}
const formListMap = (formlist: FeildType<FormKeyTypeNoUd>[]) => {
	return formlist.map((item) => {
		const type = item.type
		return formItemModelGen(item, gen[type](item))
	})
}
export const formItemModelGen = (formItem: FeildType<FormKeyTypeNoUd>, genTypeVal: string) => {
	const formModel = `<el-form-item label="${formItem.label}" prop="${formItem.field}">
      ${genTypeVal}
    </el-form-item>`
	return formModel
}
export const gen: GenFunType = {
	input: (val) => {
		const inputModel = `<el-input v-model="form.${val.field}" placeholder="请输入${val.label}" clearable />`
		return inputModel
	},
	select: (val) => {
		const inputModel = `<el-select v-model="form.${val.field}" placeholder="请选择${val.label}" clearable >
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
		const inputModel = `<el-checkbox v-model="form.${val.field}">${val._message}</el-checkbox>`
		return inputModel
	},
}
