import {FormListType, FormItemType, GenComponentType} from './../types/field'
import {FormConfig} from '../types/config'
import {defaultConfig} from '../data/default'
import {radio} from '@/data/word'

export const genFormModel = (formConfig: FormConfig = defaultConfig, formList: FormListType) => {
	const formModel = `<template>
		<el-form
			ref="${formConfig.ref}"
			:model="${formConfig.model}"
			:rules="${formConfig.rules}"
			label-width="${formConfig._labelWidth}px"
			class="${formConfig.class}"
		>
			${genFormListModel(formList)}
		</el-form>
	</template>`
	return formModel
}
const genFormListModel = (formlist: FormListType) => {
	return formlist
		.map((item) => {
			const type = item.type
			return formItemModelGen(item, genComponent[type](item))
		})
		.join('')
}
export const formItemModelGen = (formItem: FormItemType, genTypeVal: string) => {
	const formModel = `<el-form-item label="${formItem.label}" prop="${formItem.field}">
      ${genTypeVal}
    </el-form-item>`
	return formModel
}
export const genComponent: GenComponentType = {
	input: (val) => {
		const inputModel = `<el-input v-model="form.${val.field}" placeholder="请输入${val.label}" clearable />`
		return inputModel
	},
	select: (val) => {
		const inputModel = `<el-select v-model="form.${val.field}" placeholder="请选择${val.label}" clearable >
		<el-option
			v-for="item in ${val.field}Options"
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
	radio: (val) => {
		const option = val._option ? val._option.split(/\s+/) : radio
		const str = option.map((val, index) => `<el-radio :label="${index}">${val}</el-radio>`).join('')
		const inputModel = `<el-radio-group v-model="form.${val.field}">${str}</el-radio-group>`
		return inputModel
	},
	textarea: (val) => {
		const inputModel = `<el-input type="textarea" :row="${val._rows}" v-model="form.${val.field}" placeholder="请输入${val.label}" clearable :maxlength="${val._maxlength}" />`
		return inputModel
	},
	upload: (val) => {
		const inputModel = `<el-upload
		action="/posts/"
		:on-success="${val.field}HandleSuccess"
		:before-upload="${val.field}BeforeUpload"
		:on-remove="${val.field}HandleRemove"
		:multiple="${val._multiple}"
		:limit="${val._multiple ? val._limit : 1}"
		:file-list="${val.field}FileList"
		:accept="${val.field}Accept">
		<el-button size="mini" type="primary">点击上传</el-button>
		<div slot="tip" class="el-upload__tip">只能上传${val._accept}格式文件，且不超过${val._size}MB</div>
	  </el-upload>`
		return inputModel
	},
}