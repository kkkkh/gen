import {checkbox} from '@/data/word'
import {OptionType} from '@/types/option'
import {FormKeyType, FormKeyTypeNoUd} from './form'
import {FeildType} from './field'
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
type StrMap = {
	input: '_message' | '_option' | '_accept'
	inputNumber: '_size' | '_limit' | '_min' | '_max' | '_step'
	checkbox: '_multiple'
	select: '_controlsPosition'
	radio: ''
	upload: ''
	datePicker: ''
}
type StrMap2 =
	| '_message'
	| '_option'
	| '_accept'
	| '_size'
	| '_limit'
	| '_min'
	| '_max'
	| '_step'
	| '_multiple'
	| '_controlsPosition'

// | Record<keyof InputAttrs, null>
// | Record<keyof CheckboxAttrs, InputType>
// | Record<keyof SelectAttrs, InputType>
// | Record<keyof RadioAttrs, InputType>
// | (Record<'_multiple', CheckboxType> &
// 		Record<'_size', InputNumber> &
// 		Record<'_accept', InputType> &
// 		Record<'_limit', InputNumber>)
// | (Record<keyof Pick<InputNumberAttrs, '_controlsPosition'>, SelectType> &
// 		Record<keyof Omit<InputNumberAttrs, '_controlsPosition'>, InputNumber>)
// | Record<keyof DatePickerAttrs, null>
export type StructureComType = {
	[K in keyof Pick<AttrsType, 'input' | 'checkbox' | 'inputNumber' | 'select'>]: (
		key: string,
		form: FeildType<FormKeyType>
	) => string | JSX.Element
}
export type StructureType = {
	[K in FormKeyTypeNoUd]: {[name: string]: keyof StructureComType}
	// [K in FormKeyTypeNoUd]: Record<keyof AttrsType[K], keyof StructureComType>
}

// const a = {
// 	type: "input",
// field: "input",
// label: "input",
// _required: "input",
// _value: "input",
// _disabled: "input",
// }
