type VueParserType = 'vue'
type BabelParserType = 'babel'
export type ParserType = VueParserType | BabelParserType
export type ParseHandleType = {
	[P in ParserType]: (p: string) => string
}
