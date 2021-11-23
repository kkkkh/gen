export interface FormConfig {
	ref: string
	model: string
	rules: string
	class: string
	_labelWidth: string
}

export type FormType = 'form'
export type InputType = 'input'
export type SelectType = 'select'
export type CheckboxType = 'checkbox'

export type FormKeyType = InputType | SelectType | CheckboxType
