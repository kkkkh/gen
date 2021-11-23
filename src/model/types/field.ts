import {FormKeyType} from './form'

export type FormFeild = {
	type: FormKeyType
	field: string
	label: string
	required: boolean
}

export type GenFunType = {
	[P in FormKeyType]: <T extends FormFeild>(p: T) => string
}
