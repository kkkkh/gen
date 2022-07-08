import {ScriptType} from './config'
export type CompileCodeType = {
	[P in ScriptType]: (code: string) => void
}
