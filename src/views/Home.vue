<template>
	<div class="home">
		<el-form class="demo-ruleForm" ref="elForm" label-width="auto" size="small" :model="ruleForm" :rules="rules">
			<div class="flex">
				<el-form-item label="type" prop="type">
					<el-select v-model="ruleForm.type" placeholder>
						<el-option v-for="(item, index) in typeOptions" :key="index" :value="item.value">{{
							item.label
						}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="field" prop="field">
					<el-input v-model="ruleForm.field"></el-input>
				</el-form-item>
				<el-form-item label="label" prop="label">
					<el-input v-model="ruleForm.label"></el-input>
				</el-form-item>
				<el-form-item label="required" prop="required">
					<el-checkbox v-model="ruleForm.required"></el-checkbox>
				</el-form-item>
			</div>
		</el-form>
		<el-button @click="genHandle">gen</el-button>
	</div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {typeOptions} from '../data/options'
import {formModelGen} from '../model/form'
import {FormFeild} from '../model/types/field'

const ruleForm = reactive<FormFeild>({
	type: 'input',
	field: '',
	label: '',
	required: false,
})

const rules = {}
const genHandle = () => {
	console.log(formModelGen(undefined, [ruleForm]))
}
</script>
