type VariablesType = {
	local: string
	imported: string
}
type ImportsItemType = {
	variables: VariablesType[]
	module: string
}
export type ImportsType = ImportsItemType[]
