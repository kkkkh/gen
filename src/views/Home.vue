<template>
	<div class="home">
		<el-form class="demo-ruleForm" ref="elForm" label-width="auto" size="small" :model="ruleForm" :rules="rules">
			<div class="flex flex-col" v-for="(form, index) in ruleForm" :key="index">
				<div class="flex">
					<el-form-item label="field" prop="field">
						<el-input v-model="form.field" clearable></el-input>
					</el-form-item>
					<el-form-item label="label" prop="label">
						<el-input v-model="form.label" clearable></el-input>
					</el-form-item>
					<el-form-item label="required" prop="required">
						<el-checkbox v-model="form.required" clearable></el-checkbox>
					</el-form-item>
					<el-form-item label="type" :prop="`${index}.type`">
						<el-select v-model="form.type" placeholder clearable @change="(type:any) => typeChange(type, index)">
							<el-option v-for="(item, index) in typeOptions" :key="index" :value="item.value">{{
								item.label
							}}</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flex">
					<el-form-item v-if="'_message' in form" label="_message" prop="_message">
						<el-input v-model="form._message" clearable></el-input>
					</el-form-item>
				</div>
			</div>
		</el-form>
		<div>
			<el-button @click="addHandle">add</el-button>
			<el-button @click="genHandle">gen</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {typeOptions} from '../data/options'
import {formModelGen} from '../model/form'
import {FeildType} from '../types/field'
import {initData} from '../data/init'
import {FormKeyType} from '../types/form'
import {ElForm} from 'element-plus'

// const elForm = ref<typeof ElForm>()
const ruleForm = ref<FeildType[]>([
	{
		type: undefined,
		field: '',
		label: '',
		required: false,
	},
])

const rules = {
	type: [{required: true, message: '请输入type', trigger: 'change'}],
}
const genHandle = () => {
	// elForm.validate((valid: boolean) => {
	// 	if (valid) {
	console.log(formModelGen(undefined, ruleForm.value))
	// } else {
	// 	console.log('error validate!!')
	// }
	// })
}

const saveBaseForm = <T, S extends keyof T>(dataForm: T, form: Pick<T, S>): Pick<T, S> => {
	for (const key in form) {
		form[key] = dataForm[key]
	}
	return {...form}
}
const typeChange = (key: Exclude<FormKeyType, undefined>, index: number) => {
	if (key in initData) {
		const data = initData[key]()
		const dataForm = saveBaseForm(ruleForm.value[index], {
			field: '',
			label: '',
			required: false,
			type: undefined,
		})
		ruleForm.value[index] = {...dataForm, ...data}
	}
}
const addHandle = () => {
	ruleForm.value.push({
		type: undefined,
		field: '',
		label: '',
		required: false,
	})
}
</script>
