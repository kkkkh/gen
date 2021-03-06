import {FormListType} from './field'
import {ScriptType} from './config'
// import {FormConfig} from '../types/config'
import {BtnListType} from './btn'
export type GenScriptType = {
	// [P in ScriptType]: (formList: FormListType) => string
	[P in ScriptType]: (formList: FormListType, btnList: BtnListType) => string
}

export type GenSetupReType = {vars: string; values: string}
export type GenSetupType = (formList: FormListType) => GenSetupReType

export type SetupFormType = 'genForm'
export type SetupRuleType = 'genRules'
export type SetupSelectType = 'genSelect'
export type SetupUploadType = 'genUpload'
export type SetupCheckboxType = 'genCheckbox'

export type SetupItemKeyType = SetupFormType | SetupRuleType | SetupSelectType | SetupUploadType | SetupCheckboxType
export type GenSetupItemType = {
	[K in SetupItemKeyType]: GenSetupType
}
