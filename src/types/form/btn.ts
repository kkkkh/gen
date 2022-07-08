type BtnType = {
	value: string
	type?: string
	methodName?: string
	isValidate: boolean
}
export type BtnListType = BtnType[]

export type BtnThemeType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | undefined
