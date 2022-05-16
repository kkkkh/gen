import {FormKeyTypeNoUd} from '@/types/form'
import {ScriptType} from '@/types/config'

export type KeyMapType = {
	[P in FormKeyTypeNoUd]: string[]
}

export type ElementUIFromType = {
	[P in ScriptType]: string
}
