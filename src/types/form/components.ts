import {FormKeyTypeNoUd} from './form'
import {ScriptType} from './config'

export type KeyMapType = {
	[P in FormKeyTypeNoUd]: string[]
}

export type ElementUIFromType = {
	[P in ScriptType]: string
}
