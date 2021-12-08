import exp from 'constants'
import {FormKeyTypeNoUd} from './form'

export type FormFeild<T> = {
	type: T
	field: string
	label: string
	_required: boolean
	_value: string
}

export type InputFeild = {
	//
}

export type CheckboxFeild = {
	_message?: string
}

export type SelectFeild = {
	_option?: string
}

export type RadioFeild = {
	_option?: string
}
export type TextareaFeild = {
	_rows?: number
	_maxlength?: number
}
export type UoloadFeild = {
	_multiple?: boolean
	_limit?: number
	_accept?: string
	_size?: number
}

export type FeildType<T> = FormFeild<T> &
	InputFeild &
	CheckboxFeild &
	SelectFeild &
	RadioFeild &
	TextareaFeild &
	UoloadFeild

// export type FormListType = Array<InputFeild | CheckboxFeild | SelectFeild>

export type GenFunType = {
	[P in FormKeyTypeNoUd]: <T extends FeildType<FormKeyTypeNoUd>>(p: T) => string
}

export type InitFunType = {
	[P in FormKeyTypeNoUd]: () => Omit<FeildType<FormKeyTypeNoUd>, keyof FormFeild<FormKeyTypeNoUd>>
}

export type GenScriptDataType = (formList: FeildType<FormKeyTypeNoUd>[]) => string
