import {ParserType, ParseHandleType} from '@/types/format'
import prettier from 'https://unpkg.com/prettier@2.6.2/esm/standalone.mjs'
import parserHtml from 'https://unpkg.com/prettier@2.6.2/esm/parser-html.mjs'
import parserBabel from 'https://unpkg.com/prettier@2.6.2/esm/parser-babel.mjs'
import parserTs from 'https://unpkg.com/prettier@2.6.2/esm/parser-typescript.mjs'

export const prettierFormat = (code: string, parserType: ParserType = 'vue') => {
	return parserHandle[parserType](code)
}

const parserHandle: ParseHandleType = {
	vue: (code: string) => {
		return prettier.format(code, {
			parser: 'vue',
			plugins: [parserBabel, parserHtml, parserTs],
			arrowParens: 'avoid',
			bracketSameLine: true,
			bracketSpacing: false,
			embeddedLanguageFormatting: 'auto',
			htmlWhitespaceSensitivity: 'ignore',
			insertPragma: false,
			jsxSingleQuote: true,
			printWidth: 80,
			proseWrap: 'never',
			quoteProps: 'preserve',
			requirePragma: false,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			trailingComma: 'all',
			useTabs: false,
			vueIndentScriptAndStyle: true,
		})
	},
	babel: (code: string) => {
		return prettier.format(code, {
			parser: 'babel',
			plugins: [parserBabel],
			arrowParens: 'avoid',
			bracketSameLine: true,
			bracketSpacing: false,
			embeddedLanguageFormatting: 'auto',
			htmlWhitespaceSensitivity: 'ignore',
			insertPragma: false,
			jsxSingleQuote: true,
			printWidth: 80,
			proseWrap: 'never',
			quoteProps: 'preserve',
			requirePragma: false,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			trailingComma: 'all',
			useTabs: false,
			vueIndentScriptAndStyle: true,
		})
	},
}
