import {FormFeild} from './../types/field'
import {FormKeyType} from '../types/form'
import {FormConfig} from '../types/config'

export const defaultConfig: FormConfig = {
	ref: 'genElForm',
	model: 'form',
	rules: 'rules',
	class: 'gen-el-form',
	_labelWidth: 100,
	_scriptType: 'vue2x',
	_columns: 1,
}

export const getField = (): FormFeild<FormKeyType> => ({
	type: undefined,
	field: '',
	label: '',
	_required: false,
	_value: '',
})
