/// <reference types="vite/client" />
/// <reference types="vue-template-compiler" />
/// <reference types="babel__standalone" />

declare module '*.vue' {
	import {DefineComponent} from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module '*.mjs' {
	type format = () => string
	export default {format}
}

declare module 'vue-template-compiler/browser' {
	export function parseComponent(file: string, options?: SFCParserOptions): SFCDescriptor
}

interface Window {
	Babel: babel
}
