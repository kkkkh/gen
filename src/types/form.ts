export type InputType = 'input'
export type SelectType = 'select'
export type CheckboxType = 'checkbox'
export type RadioType = 'radio'
// export type TextareaType = 'textarea'
export type UploadType = 'upload'
export type InputNumber = 'inputNumber'
export type DatePicker = 'datePicker'

export type FormKeyType =
	| undefined
	| InputType
	| SelectType
	| CheckboxType
	| RadioType
	// | TextareaType
	| UploadType
	| InputNumber
	| DatePicker

export type FormKeyTypeNoUd = Exclude<FormKeyType, undefined>
//
export type FormDataType = {[name: string]: unknown}

export enum RulesTriggerEnum {
	input = 'blur',
	select = 'change',
	checkbox = 'change',
	radio = 'change',
	// textarea = 'blur',
	upload = 'change',
	inputNumber = 'change',
	datePicker = 'change',
}
