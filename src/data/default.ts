import {FormFeild} from './../types/field'
import {FormKeyType} from '../types/form'
import {FormConfig} from '../types/config'

export const defaultConfig: FormConfig = {
	ref: 'formComponent',
	model: 'form',
	rules: 'rules',
	class: '',
	size: 'mini',
	labelWidth: 100,
	_isBtn: true,
	_scriptType: 'vue2x',
	_columns: 1,
	_globalDisabled: false,
	_components: false,
}

export const getField = (): FormFeild<FormKeyType> => ({
	type: undefined,
	field: '',
	label: '',
	_required: false,
	_value: '',
	// _disabled: true,
})
