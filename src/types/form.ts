export interface FormConfig {
	ref: string
	model: string
	rules: string
	class: string
	_labelWidth: string
}

export type InputType = 'input'
export type SelectType = 'select'
export type CheckboxType = 'checkbox'

export type FormKeyType = InputType | SelectType | CheckboxType | undefined
export type FormKeyTypeNoUd = Exclude<FormKeyType, undefined>
//
export type FormDataType = {[name: string]: unknown}

export enum RulesTriggerEnum {
	input = 'blur',
	select = 'change',
	checkbox = 'change',
}
