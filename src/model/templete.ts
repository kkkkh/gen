import {FormListType} from './../types/field'
import {genScript} from './script'
import {FormConfig} from '../types/config'
import {defaultConfig} from '../data/default'
import {genFormModel} from './form'

export const genTemplete = (formConfig: FormConfig = defaultConfig, formList: FormListType) => {
	const htmlStr = genFormModel(formConfig, formList)
	const scriptStr = genScript[formConfig._scriptType](formList)
	return `${htmlStr}
            ${scriptStr}`
}
