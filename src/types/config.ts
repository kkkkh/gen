import {Ref} from 'vue'
export type ScriptType = 'vue2x' | 'vue3x'

export interface FormConfig {
	ref: string
	model: string
	rules: string
	class: string
	size: string
	_isBtn: boolean
	_labelWidth: number
	_scriptType: ScriptType
	_columns: number
	_globalDisabled: boolean
}

export type ConfigHandleType = {
	show: () => void
	close: () => void
	visible: Ref<boolean>
	configForm: FormConfig
}
