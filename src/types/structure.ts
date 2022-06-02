import {FormKeyType, FormKeyTypeNoUd} from './form'
import {FeildType} from './field'
import {AttrsType} from './Attrs'

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
