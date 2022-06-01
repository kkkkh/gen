import {FormKeyTypeNoUd} from './form'
import {
	InputAttrs,
	CheckboxAttrs,
	SelectAttrs,
	RadioAttrs,
	UploadAttrs,
	InputNumberAttrs,
	DatePickerAttrs,
	AttrsType,
} from './Attrs'
export type FormFeild<T, S = object> = {
	type: T
	field: string
	label: string
	_required: boolean
	_value: string
	_disabled?: boolean
	attrs: S
}

export type InputFeild<T = FormKeyTypeNoUd> = FormFeild<T, InputAttrs>

export type CheckboxFeild<T = FormKeyTypeNoUd> = FormFeild<T, CheckboxAttrs>

export type SelectFeild<T = FormKeyTypeNoUd> = FormFeild<T, SelectAttrs>

export type RadioFeild<T = FormKeyTypeNoUd> = FormFeild<T, RadioAttrs>

export type UploadFeild<T = FormKeyTypeNoUd> = FormFeild<T, UploadAttrs>
export type InputNumberFeild<T = FormKeyTypeNoUd> = FormFeild<T, InputNumberAttrs>
export type DatePickerFeild<T = FormKeyTypeNoUd> = FormFeild<T, DatePickerAttrs>

export type FeildType<T = FormKeyTypeNoUd> =
	| InputFeild<T>
	| CheckboxFeild<T>
	| SelectFeild<T>
	| RadioFeild<T>
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
	[P in FormKeyTypeNoUd]: () => AttrsType[P]
}
