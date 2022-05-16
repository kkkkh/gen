import {FormKeyTypeNoUd} from './form'

export type FormFeild<T> = {
	type: T
	field: string
	label: string
	_required: boolean
	_value: string
	_disabled?: boolean
}

export type InputFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	//
}

export type CheckboxFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	_message?: string
	_option?: string
}

export type SelectFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	_option?: string
}

export type RadioFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	_option?: string
}
// export type TextareaFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
// 	_rows?: number
// 	_maxlength?: number
// }
export type UploadFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	_multiple?: boolean
	_limit?: number
	_accept?: string
	_size?: number
}
export type InputNumberFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	_min?: number
	_max?: number
	_step?: number
	_controlsPosition?: string
}
export type DatePickerFeild<T = FormKeyTypeNoUd> = FormFeild<T> & {
	//
}

export type FeildType<T = FormKeyTypeNoUd> =
	| InputFeild<T>
	| CheckboxFeild<T>
	| SelectFeild<T>
	| RadioFeild<T>
	// | TextareaFeild<T>
	| UploadFeild<T>
	| UploadFeild<T>
	| InputNumberFeild<T>
	| DatePickerFeild<T>

export type StoreFiledType<T = FormKeyTypeNoUd> = {
	input: InputFeild<T>
	checkbox: CheckboxFeild<T>
	select: SelectFeild<T>
	radio: RadioFeild<T>
	// textarea: TextareaFeild<T>
	upload: UploadFeild<T>
	inputNumber: InputNumberFeild<T>
	datePicker: DatePickerFeild<T>
}

// export type FormListType = Array<InputFeild | CheckboxFeild | SelectFeild>
export type FormItemType = FeildType<FormKeyTypeNoUd>
export type FormListType = FeildType<FormKeyTypeNoUd>[]

export type GenComponentType = {
	[P in FormKeyTypeNoUd]: (p: StoreFiledType[P]) => string
}

export type InitDataType = {
	// Omit去除某些key
	[P in FormKeyTypeNoUd]: () => Omit<StoreFiledType[P], keyof FormFeild<FormKeyTypeNoUd>>
}
