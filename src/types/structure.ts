import {ArrtsElType, BaseAttrs} from './Attrs'

export type StructureComType = {
	[K in ArrtsElType]: (form: BaseAttrs) => JSX.Element
}
