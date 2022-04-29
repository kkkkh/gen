import {BtnListType} from '@/types/btn'
import {FormListType} from './../types/field'
import {genScript} from './script'
import {FormConfig} from '../types/config'
import {defaultConfig} from '../data/default'
import {genFormModel} from './form'

export const genTemplete = (formConfig: FormConfig = defaultConfig, formList: FormListType, btnList: BtnListType) => {
	const htmlStr = genFormModel(formConfig, formList, btnList)
	const scriptStr = genScript[formConfig._scriptType](formList)
	return `${htmlStr}
            ${scriptStr}`
}
