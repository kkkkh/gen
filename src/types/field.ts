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
	// _message?: string
}

export type FeildType<T> = InputFeild & CheckboxFeild & SelectFeild & FormFeild<T>

// export type FormListType = Array<InputFeild | CheckboxFeild | SelectFeild>

export type GenFunType = {
	[P in FormKeyTypeNoUd]: <T extends FeildType<FormKeyTypeNoUd>>(p: T) => string
}

export type InitFunType = {
	[P in FormKeyTypeNoUd]: () => Omit<FeildType<FormKeyTypeNoUd>, keyof FormFeild<FormKeyTypeNoUd>>
}
