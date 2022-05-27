import {CompileCodeType} from '@/types/code'
import {parseComponent} from 'vue-template-compiler'
import getImports from '@/utils/get-imports' //babel插件 获取imports集合
import importsCompiledHandle from '@/utils/compiled-import' //compile imports
import * as compiler from '@vue/compiler-sfc'
import {configHandle} from '@/hooks/config'
const {configForm} = configHandle()
export const compileCode: CompileCodeType = {
	vue2x: (source: string) => {
		const {template, script} = parseComponent(source)
		let compiled
		const imports: [] = []
		if (script) {
			try {
				compiled = window?.Babel.transform(script.content, {
					presets: ['env'],
					plugins: [[getImports, {imports}]],
				}).code
			} catch (e) {
				return `<pre style="color: red">${(e as Error).message}</pre>`
			}
		}
		const importsCompiled = importsCompiledHandle(imports)
		const scripts = [
			'<script src=//unpkg.com/vue@2.6.14/dist/vue.js></script>',
			'<script src=//unpkg.com/@vue/composition-api@1.4.9/dist/vue-composition-api.prod.js></script>',
			'<script src=//unpkg.com/element-ui@2.15.6/lib/index.js></script>',
			`<script>
          var exports = {};
          ${importsCompiled}
          ${compiled}
          var component = exports.default;
          component.template = component.template || ${JSON.stringify(template?.content)}
          new Vue(component).$mount('#app')
          <\/script>
        `,
		]
		const css = [
			'//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css',
			'//unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css',
		]
		const heads = css.map((val) => `<link rel="stylesheet" href="${val}">`)
		return {
			head: heads.join('\n'),
			body: '<div id="app"></div>' + scripts.join('\n'),
		}
	},
	vue3x: (source: string) => {
		const filename = 'gen'
		const {descriptor, errors} = compiler.parse(source, {filename})
		if (errors.length) throw new Error(errors.toString())
		// console.log(descriptor)
		function generateID() {
			return Math.random().toString(36).slice(2, 12)
		}
		const id = generateID()
		const templateOptions = {
			id,
			source: descriptor.template?.content as string,
			filename: descriptor.filename,
			scoped: false,
			slotted: descriptor.slotted,
			// compilerOptions: {
			//   // scopeId: undefined,
			//   // mode: 'module',
			// },
		}
		const script = compiler.compileScript(descriptor, templateOptions)
		const template = compiler.compileTemplate({...templateOptions})
		let cssInJS = ''
		if (descriptor.styles) {
			const styled = descriptor.styles.map((style) => {
				return compiler.compileStyle({
					id,
					source: style.content,
					scoped: style.scoped,
					filename: '',
					preprocessLang: 'scss',
				})
			})
			if (styled.length) {
				const cssCode = styled.map((s) => s.code).join('\n')
				cssInJS = `(function(){const el = document.createElement('style');
          el.innerHTML = \`${cssCode}\`;
          document.body.appendChild(el);}());`
			}
		}
		const moduleCode = `
        import script from '${getBlobURL(script.content)}';
        import {render} from '${getBlobURL(template.code)}';
        script.render = render;
        ${filename ? `script.__file = '${filename}'` : ''};
        ${cssInJS}
        export default script;
        `
		const url = getBlobURL(moduleCode)
		return importjsTemplete(url)
	},
}
const getBlobURL = (jsCode: string) => {
	const blob = new Blob([jsCode], {type: 'text/javascript'})
	const blobURL = URL.createObjectURL(blob)
	return blobURL
}
const importjsTemplete = (url: string) => {
	return `<!DOCTYPE html>
    <html lang="en-US">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>SystemJS Dynamic Import Example</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="//unpkg.com/element-plus@2.2.1/dist/index.css">
      <link rel="stylesheet" href="//unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css">
      <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3.2.36/dist/vue.esm-browser.js",
            "element-plus": "//unpkg.com/element-plus@2.2.1/dist/index.full.mjs"
          }
        }
      <\/script>
    <\/head>
    <body>
      <div id="app"><\/div>
      <script type="module">
        import { createApp } from "vue";
        ${configForm._components ? '' : 'import ElementPlus from "element-plus";'} 
        import App from '${url}';
        createApp(App)${configForm._components ? '' : '.use(ElementPlus, { size: "small" })'}.mount("#app");
      <\/script>
    <\/body>
    <\/html>`
}
