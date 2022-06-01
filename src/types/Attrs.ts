export type InputAttrs = null

export type CheckboxAttrs = {
	_message?: string
	_option?: string
}
export type SelectAttrs = {
	_option?: string
}
export type RadioAttrs = {
	_option?: string
}
export type UploadAttrs = {
	_multiple?: boolean
	_limit?: number
	_accept?: string
	_size?: number
}
export type InputNumberAttrs = {
	_min?: number
	_max?: number
	_step?: number
	_controlsPosition?: string
}
export type DatePickerAttrs = null

export type AttrsType = {
	input: InputAttrs
	checkbox: CheckboxAttrs
	select: SelectAttrs
	radio: RadioAttrs
	upload: UploadAttrs
	inputNumber: InputNumberAttrs
	datePicker: DatePickerAttrs
}
