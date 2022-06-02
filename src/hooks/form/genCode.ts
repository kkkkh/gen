import {BtnListType} from '@/types/btn'
import {FormListType} from '../../types/field'
import {genScript} from './genScript'
import {FormConfig} from '../../types/config'
import {defaultConfig} from '../../data/default'
import {genTemplate} from './genTemplate'

export const genCode = (formConfig: FormConfig = defaultConfig, formList: FormListType, btnList: BtnListType) => {
	const htmlStr = genTemplate(formConfig, formList, btnList)
	const scriptStr = genScript[formConfig._scriptType](formList, btnList)
	return `${htmlStr}
            ${scriptStr}`
}
