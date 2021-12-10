import {ScriptType} from './../types/config'
import {FormOptionType, OptionType} from '../types/option'

export const typeOptions: FormOptionType[] = [
	{label: 'input', value: 'input'},
	{label: 'select', value: 'select'},
	{label: 'checkbox', value: 'checkbox'},
	{label: 'radio', value: 'radio'},
	{label: 'textarea', value: 'textarea'},
	{label: 'upload', value: 'upload'},
]

export const scriptOptions: OptionType<ScriptType>[] = [
	{label: 'vue2x', value: 'vue2x'},
	{label: 'vue3x', value: 'vue3x'},
]
