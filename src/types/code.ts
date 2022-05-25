import {ScriptType} from '@/types/config'
export type TransformCodeType = {
	[P in ScriptType]: (code: string) => void
}
