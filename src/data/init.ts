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
	select: () => ({}),
}
