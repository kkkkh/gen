import {FormKeyType} from './form'

export type BaseType = {
	type: FormKeyType
}

export type FormFeild = {
	field: string
	label: string
	required: boolean
} & BaseType

export type InputFeild = FormFeild

export type CheckboxFeild = {
	_message?: string
} & FormFeild

export type SelectFeild = {
	// _message?: string
} & FormFeild

export type FeildType = InputFeild & CheckboxFeild & SelectFeild

export type GenFunType = {
	[P in Exclude<FormKeyType, undefined>]: <T extends FeildType>(p: T) => string
}

export type InitFunType = {
	[P in Exclude<FormKeyType, undefined>]: () => Omit<FeildType, keyof FormFeild>
}
