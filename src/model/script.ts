import {BtnListType} from '@/types/btn'
import {GenScriptType, GenSetupItemType, SetupItemKeyType} from './../types/gen'
import {GenSetupType, GenSetupReType} from './../types/gen'
import {FormDataType, RulesTriggerEnum} from './../types/form'
import {SelectFeild, UploadFeild} from './../types/field'
import {select, checkbox} from '@/data/word'
import {configHandle} from '@/hooks/config'
const {configForm} = configHandle()

export const genScript: GenScriptType = {
	vue2x: (formList, btnList) => {
		const {values, vars} = genSetUp(formList)
		const {values: refValues, vars: refVars} = genRef()
		const {values: dValues, vars: dVars} = genDisabled()
		const {values: bValues, vars: bVars} = genBtnEventMethod(btnList)

		return `<script>
                import {defineComponent, reactive,ref} from '@vue/composition-api'
                export default defineComponent({
                    setup (props, ctx) {
						${refValues}
                        ${values}
						${dValues}
						${bValues}
                        return {
							${refVars}
							${vars}
							${dVars}
							${bVars}
                        }
                    }
                })
            </script>`
	},
	vue3x: (formList, btnList) => {
		const {values} = genSetUp(formList)
		const {values: refValues} = genRef()
		const {values: dValues} = genDisabled()
		const {values: bValues} = genBtnEventMethod(btnList)
		return `
		<script lang="ts">
			export default {
				name: 'gen-form',
			}
		</script>
		<script lang="ts" setup>
			import {reactive,ref} from 'vue'
			${refValues}
			${values}
			${dValues}
			${bValues}
        </script>`
	},
}
const genRef = () => {
	return {
		values: `const ${configForm.ref} = ref()`,
		vars: `${configForm.ref},`,
	}
}
const genValidate = () => {
	return `${configForm.ref}.value.validate((res)=>{
		if(res){
		}
	})`
}
const genBtnEventMethod = (btnList: BtnListType) => {
	let vars = ''
	let values = ''
	if (configForm._isBtn) {
		values = btnList
			.map((item, index) => {
				return `const ${item.eventMethodName} = () => {
					${index === 1 ? genValidate() : ''}
				}`
			})
			.join('\n')
		vars = btnList.map((item) => `${item.eventMethodName},`).join('\n')
	}
	return {
		vars,
		values,
	}
}
const genDisabled = () => {
	let vars = ''
	let values = ''
	if (configForm._globalDisabled) {
		values = `const disabled = ref(true)`
		vars = `disabled,`
	}
	return {
		vars,
		values,
	}
}
const genSetUp: GenSetupType = (formList) => {
	const keys = Object.keys(genSetUpItem) as SetupItemKeyType[]
	const val = keys.map((key: SetupItemKeyType) => genSetUpItem[key](formList))
	return val.reduce((pre, next) => {
		return {
			values: `${pre.values}\n${next.values}`,
			vars: `${pre.vars}\n${next.vars}`,
		}
	})
}
const genSetUpItem: GenSetupItemType = {
	genForm: (formList) => {
		const form: FormDataType = {}
		for (const val of formList) {
			form[val.field] = val._value
		}
		return {
			values: `const form = reactive( ${JSON.stringify(form)})`,
			vars: 'form,',
		}
	},
	genRules: (formList) => {
		const rules: FormDataType = {}
		for (const val of formList) {
			if (val._required) {
				rules[val.field] = [
					{required: val._required, message: `请输入${val.label}`, trigger: RulesTriggerEnum[val.type]},
				]
			}
		}
		return {
			values: `const rules = ${JSON.stringify(rules)}`,
			vars: 'rules,',
		}
	},
	genCheckbox(formList) {
		const checkboxs: SelectFeild[] = formList.filter((item) => item.type === 'checkbox')
		let checkboxOption: GenSetupReType[] = []
		if (checkboxs.length > 0) {
			checkboxOption = checkboxs.map((item) => {
				const option = item._option ? item._option.split(/\s+/) : checkbox
				const arr = option.map((val, index) => {
					return {
						label: val,
						value: index + 1,
					}
				})
				return {
					values: `const ${item.field}Options = ${JSON.stringify(arr)}`,
					vars: `${item.field}Options,`,
				}
			})
		}
		return {
			vars: checkboxOption.map((item) => item.vars).join('\n'),
			values: checkboxOption.map((item) => item.values).join('\n'),
		}
	},
	genSelect: (formList) => {
		const selects: SelectFeild[] = formList.filter((item) => item.type === 'select')
		let selectOption: GenSetupReType[] = []
		if (selects.length > 0) {
			selectOption = selects.map((item) => {
				const option = item._option ? item._option.split(/\s+/) : select
				const arr = option.map((val) => {
					return {
						label: val,
						value: val,
					}
				})
				return {
					values: `const ${item.field}Options = ${JSON.stringify(arr)}`,
					vars: `${item.field}Options,`,
				}
			})
		}
		return {
			vars: selectOption.map((item) => item.vars).join('\n'),
			values: selectOption.map((item) => item.values).join('\n'),
		}
	},
	genUpload: (formList) => {
		const uploads: UploadFeild[] = formList.filter((item) => item.type === 'upload')
		let uploadVar: GenSetupReType[] = []
		if (uploads.length > 0) {
			uploadVar = uploads.map((item) => {
				const fileList = `${item.field}FileList`
				const accept = `${item.field}Accept`
				const handleSuccess = `${item.field}HandleSuccess`
				const beforeUpload = `${item.field}BeforeUpload`
				const handleRemove = `${item.field}HandleRemove`
				return {
					values: `
							const ${fileList} = []
							const ${accept} = "${item._accept}"
							const ${handleSuccess} = (res, file,fileList)=>{
								form.${item.field} = res.data
							}
							const ${beforeUpload} = (file)=>{
								const files = file.name.split(".")
								const type = files.length > 0 ? files[files.length-1]:'*'
								const isType = ${item.field}Accept.includes(type);
								if (!isType) {
									this.$message.error('文件格式不正确');
								}
								const isSize = file.size / 1024 / 1024 < ${item._size};
								if (!isSize) {
								this.$message.error('文件大小不超过${item._size}MB!');
								}
								return isType && isSize;
							}
							const ${handleRemove} = (file,fileList)=>{
								form.${item.field} = ""
						}`,
					vars: `${fileList},\n${accept},\n${handleSuccess},\n${beforeUpload},\n${handleRemove},`,
				}
			})
		}
		return {
			values: uploadVar.map((item) => item.values).join('\n'),
			vars: uploadVar.map((item) => item.vars).join('\n'),
		}
	},
}
