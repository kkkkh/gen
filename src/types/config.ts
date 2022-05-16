import {Ref} from 'vue'
export type ScriptType = 'vue2x' | 'vue3x'

export interface FormConfig {
	ref: string
	model: string
	rules: string
	class: string
	size: string
	labelWidth: number
	_isBtn: boolean
	_scriptType: ScriptType
	_columns: number
	_globalDisabled: boolean
	_components: boolean
}

export type ConfigHandleType = {
	show: () => void
	close: () => void
	visible: Ref<boolean>
	configForm: FormConfig
}
