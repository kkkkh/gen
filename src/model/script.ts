import {FeildType, GenScriptDataType} from './../types/field'
import {FormDataType, RulesTriggerEnum, FormKeyTypeNoUd} from './../types/form'
import {select} from '@/data/word'
export const genScript = {
	vue2x: (formList: FeildType<FormKeyTypeNoUd>[]) => {
		const formData = genFormData(formList)
		const rules = genRules(formList)
		const selectOption = genSelectOption(formList)
		const upload = genUpload(formList)
		return `<script>
                import {defineComponent, ref, reactive, computed} from '@vue/composition-api'
                export default defineComponent({
                    setup (props, ctx) {
                        const form = reactive(${formData})
                        const rules = ${rules} 
						${selectOption}
						${upload}
                        return {
                            form,
                        }
                    }
                })
            </script>`
	},
}

const genFormData: GenScriptDataType = (formList) => {
	const form: FormDataType = {}
	for (const val of formList) {
		form[val.field] = val._value
	}
	return JSON.stringify(form)
}
const genRules: GenScriptDataType = (formList) => {
	const rules: FormDataType = {}
	for (const val of formList) {
		if (val._required) {
			rules[val.field] = [{required: val._required, message: `请输入${val.label}`, trigger: RulesTriggerEnum[val.type]}]
		}
	}
	return JSON.stringify(rules)
}
const genSelectOption: GenScriptDataType = (formList) => {
	const selects = formList.filter((item) => item.type === 'select')
	let selectOption = ''
	if (selects.length > 0) {
		selectOption = selects
			.map((item) => {
				const option = item._option ? item._option.split(/\s+/) : select
				const arr = option.map((val, index) => {
					return {
						label: val,
						value: index,
					}
				})
				return `const ${item.field}Options = ${JSON.stringify(arr)}`
			})
			.join('\n')
	}
	return selectOption
}

const genUpload: GenScriptDataType = (formList) => {
	const uploads = formList.filter((item) => item.type === 'upload')
	let uploadVar = ''
	if (uploads.length > 0) {
		uploadVar = uploads
			.map((item) => {
				return `
				const ${item.field}FileList = []
				const ${item.field}Accept = ${item._accept}
				const ${item.field}HandleSuccess = (res, file,fileList)=>{
					form.${item.field} = res.data
				}
				const ${item.field}BeforeUpload = (file)=>{
					const isType = ${item.field}Accept.incldes(file.type);
					if (!isType) {
						this.$message.error('文件格式不正确');
					}
					const isSize = file.size / 1024 / 1024 < ${item._size};
					if (!isLt2M) {
					  this.$message.error('文件大小不超过${item._size}MB!');
					}
					return isType && isSize;
				}
				const ${item.field}HandleRemove = (file,fileList)=>{
					form.${item.field} = ""
				}
			`
			})
			.join('\n')
	}
	return uploadVar
}
