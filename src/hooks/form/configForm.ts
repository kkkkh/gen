import {FormConfig, ConfigHandleType} from '@/types/index'
import {defaultConfig} from '@/data/index'
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
