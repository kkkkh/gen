import {FormKeyType} from './form'

export type OptionType<T> = {
	label: T
	value: string
}

export type FormOptionType = OptionType<Exclude<FormKeyType, undefined>>
