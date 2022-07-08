import {FormListType, BtnListType, FormConfig} from '@/types/index'
import {defaultConfig} from '@/data/index'
import {genTemplate} from './genTemplate'
import {genScript} from './genScript'

export const genCode = (formConfig: FormConfig = defaultConfig, formList: FormListType, btnList: BtnListType) => {
	const htmlStr = genTemplate(formConfig, formList, btnList)
	const scriptStr = genScript[formConfig._scriptType](formList, btnList)
	return `${htmlStr}
            ${scriptStr}`
}
