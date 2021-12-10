import {FormFeild} from './../types/field'
import {FormKeyType} from '../types/form'
import {FormConfig} from '../types/config'

export const defaultConfig: FormConfig = {
	ref: 'elForm',
	model: 'form',
	rules: 'rules',
	class: 'gen-form',
	_labelWidth: 100,
	_scriptType: 'vue2x',
}

export const getField = (): FormFeild<FormKeyType> => ({
	type: undefined,
	field: '',
	label: '',
	_required: false,
	_value: '',
})
