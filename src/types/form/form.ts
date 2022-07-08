export type InputType = 'input'
export type SelectType = 'select'
export type CheckboxType = 'checkbox'
export type RadioType = 'radio'
// export type TextareaType = 'textarea'
export type UploadType = 'upload'
export type InputNumberType = 'inputNumber'
export type DatePickerType = 'datePicker'
export type TimePickerType = 'timePicker'

export type FormKeyType =
	| undefined
	| InputType
	| SelectType
	| CheckboxType
	| RadioType
	| UploadType
	| InputNumberType
	| DatePickerType
	| TimePickerType

export type FormKeyTypeNoUd = Exclude<FormKeyType, undefined>

export type FormDataType = {[name: string]: unknown}

export enum RulesTriggerEnum {
	input = 'blur',
	select = 'change',
	checkbox = 'change',
	radio = 'change',
	upload = 'change',
	inputNumber = 'change',
	datePicker = 'change',
	timePicker = 'change',
}
