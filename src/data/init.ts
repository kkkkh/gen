import {InitDataType} from './../types/field'

export const initData: InitDataType = {
	input: () => {
		return null
	},
	checkbox: () => {
		return {
			_option: '',
			// _message: '',
		}
	},
	select: () => ({_option: ''}),
	radio: () => ({
		_option: '',
	}),
	// textarea: () => ({
	// 	_rows: 2,
	// 	_maxlength: 1000,
	// }),
	upload: () => ({
		_multiple: false,
		_limit: 1,
		_accept: '.png,.jpg,.rar,.zip,.doc,.docx,.pdf,.xls,.xlsx',
		_size: 1,
	}),
	inputNumber: () => ({
		_max: 100000,
		_min: 0,
		_step: 1,
		_controlsPosition: 'right',
	}),
	datePicker: () => {
		return null
	},
}
