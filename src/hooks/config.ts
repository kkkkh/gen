import {FormConfig} from './../types/config'
import {defaultConfig} from './../data/default'
import {ConfigHandleType} from './../types/config'
import {ref, reactive} from 'vue'
let configForm = reactive<FormConfig>(defaultConfig)

export const configHandle = (): ConfigHandleType => {
	const visible = ref(false)
	return {
		configForm,
		visible,
		show: () => {
			visible.value = true
		},
		close: () => {
			visible.value = false
		},
	}
}

export const setConfigForm = (form: FormConfig) => {
	configForm = reactive(form)
}
