import {ScriptType} from '@/types/config'
export type CompileCodeType = {
	[P in ScriptType]: (code: string) => void
}
