import {FormKeyTypeNoUd} from './form'

export type ArrtsElType = Extract<FormKeyTypeNoUd, 'input' | 'checkbox' | 'inputNumber' | 'select'>

export type BaseAttrs<T = string> = {
	key: keyof T | string
	elType: ArrtsElType
	value: T[keyof T] | string | number | boolean
}

export type BaseAttrsType<T = string> = BaseAttrs<T>[] | null

export type InputAttrs = null

export type CheckboxAttrs = {
	option?: string
}

export type SelectAttrs = {
	option?: string
}
export type RadioAttrs = {
	option?: string
}
export type UploadAttrs = {
	multiple?: boolean
	limit?: number
	accept?: string
	size?: number
}
export type InputNumberAttrs = {
	min?: number
	max?: number
	step?: number
	controlsPosition?: string
}
export type DatePickerAttrs = null

// export type AttrsType = {
// 	input: InputAttrs
// 	checkbox: CheckboxAttrs
// 	select: SelectAttrs
// 	radio: RadioAttrs
// 	upload: UploadAttrs
// 	inputNumber: InputNumberAttrs
// 	datePicker: DatePickerAttrs
// }
