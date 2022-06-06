import {InitDataType} from './../types/field'

export const initData: InitDataType = {
	input: () => {
		return null
	},
	checkbox: () => {
		return [
			{
				key: 'option',
				value: '',
				elType: 'input',
			},
		]
	},
	select: () => {
		return [
			{
				key: 'option',
				value: '',
				elType: 'input',
			},
		]
	},
	radio: () => {
		return [
			{
				key: 'option',
				value: '',
				elType: 'input',
			},
		]
	},
	// textarea: () => ({
	// 	_rows: 2,
	// 	_maxlength: 1000,
	// }),
	upload: () => {
		return [
			{
				key: 'multiple',
				value: false,
				elType: 'checkbox',
			},
			{
				key: 'limit',
				value: 1,
				elType: 'inputNumber',
			},
			{
				key: 'accept',
				value: '.png,.jpg,.rar,.zip,.doc,.docx,.pdf,.xls,.xlsx',
				elType: 'input',
			},
			{
				key: 'size',
				value: 1,
				elType: 'inputNumber',
			},
		]
	},
	inputNumber: () => {
		return [
			{
				key: 'max',
				value: 100000,
				elType: 'inputNumber',
			},
			{
				key: 'min',
				value: 0,
				elType: 'inputNumber',
			},
			{
				key: 'step',
				value: 1,
				elType: 'inputNumber',
			},
			{
				key: 'step',
				value: 'right',
				elType: 'select',
			},
		]
	},
	datePicker: () => {
		return null
	},
}
