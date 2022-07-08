import {FormFeild, FormKeyType, FormConfig} from '@/types/index'

export const defaultConfig: FormConfig = {
	ref: 'formComponent',
	model: 'form',
	rules: 'rules',
	class: '',
	size: 'mini',
	labelWidth: 100,
	_isBtn: true,
	_scriptType: 'vue3x',
	_columns: 1,
	_globalDisabled: false,
	_components: false,
}

export const getField = (): FormFeild<FormKeyType, null> => ({
	type: undefined,
	field: '',
	label: '',
	_required: false,
	_value: '',
	attrs: null,
	// _disabled: true,
})
