import {ScriptType} from './../types/config'
import {FormOptionType, OptionType} from '../types/option'

export const typeOptions: FormOptionType[] = [
	{label: 'input', value: 'input'},
	{label: 'select', value: 'select'},
	{label: 'checkbox', value: 'checkbox'},
	{label: 'radio', value: 'radio'},
	{label: 'upload', value: 'upload'},
	{label: 'inputNumber', value: 'inputNumber'},
	{label: 'datePicker', value: 'datePicker'},
]

export const scriptOptions: OptionType<ScriptType>[] = [
	{label: 'vue2x', value: 'vue2x'},
	{label: 'vue3x', value: 'vue3x'},
]

export const controlsPositionOptions = [
	{label: '右侧', value: 'right'},
	{label: '正常', value: ''},
]
