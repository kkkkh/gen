import {FormFeild} from './../types/field'
import {FormConfig, FormKeyType} from '../types/form'

export const defaultConfig: FormConfig = {
	ref: 'elForm',
	model: 'form',
	rules: 'rules',
	class: 'demo-class',
	_labelWidth: '100px',
}

export const getField = (): FormFeild<FormKeyType> => ({
	type: undefined,
	field: '',
	label: '',
	_required: false,
	_value: '',
})
