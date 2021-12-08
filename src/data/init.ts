import {InitFunType} from './../types/field'

export const initData: InitFunType = {
	input: () => {
		return {}
	},
	checkbox: () => {
		return {
			_message: '',
		}
	},
	select: () => ({_option: ''}),
	radio: () => ({
		_option: '',
	}),
	textarea: () => ({
		_rows: 2,
		_maxlength: 200,
	}),
	upload: () => ({
		_multiple: false,
		_limit: 1,
		_accept: '.png,.jpg,.rar,.zip,.doc,.docx,.pdf,.xls,.xlsx',
		_size: 1,
	}),
}
