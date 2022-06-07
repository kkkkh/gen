import {FormKeyTypeNoUd} from './form'
import {
	BaseAttrsType,
	// InputAttrs,
	// CheckboxAttrs,
	// SelectAttrs,
	// RadioAttrs,
	// UploadAttrs,
	// InputNumberAttrs,
	// DatePickerAttrs,
} from './Attrs'
export type FormFeild<T, S> = {
	type: T
	field: string
	label: string
	_required: boolean
	_value: string
	_disabled?: boolean
	attrs: S
}

export type InputFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>

export type CheckboxFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>

export type SelectFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>

export type RadioFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>

export type UploadFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>
export type InputNumberFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>
export type DatePickerFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>
export type TimePickerFeild<T = FormKeyTypeNoUd> = FormFeild<T, BaseAttrsType>

export type FeildType<T = FormKeyTypeNoUd> =
	| InputFeild<T>
	| CheckboxFeild<T>
	| SelectFeild<T>
	| RadioFeild<T>
	| UploadFeild<T>
	| UploadFeild<T>
	| InputNumberFeild<T>
	| DatePickerFeild<T>
	| TimePickerFeild<T>

export type StoreFiledType<T = FormKeyTypeNoUd> = {
	input: InputFeild<T>
	checkbox: CheckboxFeild<T>
	select: SelectFeild<T>
	radio: RadioFeild<T>
	upload: UploadFeild<T>
	inputNumber: InputNumberFeild<T>
	datePicker: DatePickerFeild<T>
	timePicker: TimePickerFeild<T>
}

export type FormItemType = FeildType<FormKeyTypeNoUd>
export type FormListType = FeildType<FormKeyTypeNoUd>[]

export type GenComponentType = {
	[P in FormKeyTypeNoUd]: (p: StoreFiledType[P]) => string
}

export type InitDataType = {
	[P in FormKeyTypeNoUd]: () => BaseAttrsType
}
