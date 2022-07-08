import {ScriptType, BtnThemeType, FormOptionType, OptionType} from '@/types/index'
export const typeOptions: FormOptionType[] = [
	{label: 'input', value: 'input'},
	{label: 'select', value: 'select'},
	{label: 'checkbox', value: 'checkbox'},
	{label: 'radio', value: 'radio'},
	{label: 'upload', value: 'upload'},
	{label: 'inputNumber', value: 'inputNumber'},
	{label: 'datePicker', value: 'datePicker'},
	{label: 'timePicker', value: 'timePicker'},
]

export const scriptOptions: OptionType<ScriptType>[] = [
	{label: 'vue2x', value: 'vue2x'},
	{label: 'vue3x', value: 'vue3x'},
]

export const controlsPositionOptions = [
	{label: '右侧', value: 'right'},
	{label: '正常', value: ''},
]

export const inputTypeOptions = [
	{label: 'text', value: 'text'},
	{label: 'textarea', value: 'textarea'},
]

export const btnThemeList: OptionType<BtnThemeType>[] = [
	{label: 'primary', value: 'primary'},
	{label: 'success', value: 'success'},
	{label: 'info', value: 'info'},
	{label: 'warning', value: 'warning'},
	{label: 'danger', value: 'danger'},
]
