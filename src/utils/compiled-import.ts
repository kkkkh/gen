import {ImportsType} from '@/types/imports'

const globalVar: {[name: string]: string} = {
	'@vue/composition-api': 'VueCompositionAPI',
}
export default (imports: ImportsType): string => {
	return imports
		.map((item) => {
			// 将import导入文件 转为全局变量名称
			const moduleName = globalVar[item.module]
			let replacement = '\n'
			for (const variable of item.variables) {
				if (variable.imported === 'default') {
					replacement += `var ${variable.local} = ${moduleName}.default || ${moduleName};\n`
				} else {
					replacement += `var ${variable.local} = ${moduleName}.${variable.imported};\n`
				}
			}
			return replacement
		})
		.join('\n')
}
