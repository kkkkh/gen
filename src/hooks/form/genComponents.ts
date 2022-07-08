import {FormListType, FormKeyTypeNoUd, KeyMapType, ElementUIFromType} from '@/types/index'
import {configHandle} from './configForm'

const {configForm} = configHandle()

const keyMap: KeyMapType = {
	input: ['Input'],
	select: ['Select', 'Option'],
	checkbox: ['Checkbox', 'CheckboxGroup'],
	radio: ['Radio', 'RadioGroup'],
	upload: ['Upload', 'Button'],
	inputNumber: ['InputNumber'],
	datePicker: ['DatePicker'],
	timePicker: ['TimePicker'],
}
const ElementUIFrom: ElementUIFromType = {
	vue2x: 'element-ui',
	vue3x: 'element-plus',
}
const getComponents = (types: FormKeyTypeNoUd[]) => {
	const eles: string[][] = [['Form', 'FormItem']]
	for (const type of types) {
		eles.push(keyMap[type])
	}
	return eles.flat()
}
export const genComponents = (formList: FormListType) => {
	let importComponents = ''
	let components = ''
	if (configForm._components) {
		const types = [...new Set(formList.map((item) => item.type))]
		const componentsNames = getComponents(types)
		if (configForm._isBtn) {
			componentsNames.push('Button')
		}
		const names = [...new Set(componentsNames)]
		const asNames = names.map((name) => (configForm._scriptType === 'vue3x' ? `El${name}` : `${name} as El${name}`))
		importComponents = `import {${asNames}} from '${ElementUIFrom[configForm._scriptType]}'`
		components = `components:{
			${names.map((name) => `El${name}`).join(',\n')}
		},`
	}
	return {
		importComponents,
		components,
	}
}
