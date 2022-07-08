import {InitDataType} from '@/types/index'
import {ref} from 'vue'
export const initData: InitDataType = {
	input: () => {
		const hide = ref(true)
		return [
			{
				key: 'type',
				value: 'text',
				elType: 'select',
				tick: (val) => {
					hide.value = val === 'text'
				},
			},
			{
				key: 'rows',
				value: '2',
				elType: 'inputNumber',
				hide: () => hide.value,
			},
			{
				key: 'maxlength',
				value: '1000',
				elType: 'inputNumber',
				hide: () => hide.value,
			},
		]
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
	timePicker: () => {
		return null
	},
}
