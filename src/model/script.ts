import {FeildType} from './../types/field'
import {FormDataType, RulesTriggerEnum, FormKeyTypeNoUd} from './../types/form'

export const genScript = {
	script2x: (formList: FeildType<FormKeyTypeNoUd>[]) => {
		const formData = genFormData(formList)
		const rules = genRules(formList)
		return `<script>
                import {defineComponent, ref, reactive, computed} from '@vue/composition-api'
                export default defineComponent({
                    setup (props, ctx) {
                        const form = reactive(${formData})
                        const rules = ${rules}
                        return {
                            form,
                        }
                    }
                })
            </script>`
	},
}
const genFormData = (formList: FeildType<FormKeyTypeNoUd>[]) => {
	const form: FormDataType = {}
	for (const val of formList) {
		form[val.field] = val._value
	}
	return JSON.stringify(form, undefined, ' ')
}
const genRules = (formList: FeildType<FormKeyTypeNoUd>[]) => {
	const rules: FormDataType = {}
	for (const val of formList) {
		const _required = val._required
		if (_required) {
			rules[val.field] = [
				{
					required: true,
					message: `请输入${val.label}`,
					trigger: RulesTriggerEnum[val.type],
				},
			]
		}
	}
	return JSON.stringify(rules, undefined, ' ')
}
