import {FormListType, FormItemType, GenComponentType} from './../types/field'
import {BtnListType} from '@/types/btn'
import {FormConfig} from '../types/config'
import {defaultConfig} from '../data/default'
import {radio, checkbox} from '@/data/word'
let disabled = ''
export const genFormModel = (formConfig: FormConfig = defaultConfig, formList: FormListType, btnList: BtnListType) => {
	disabled = genDisbale(formConfig._globalDisabled)
	const formItem = genFormListModel(formList, formConfig._columns)
	const btnModel = formConfig._isBtn ? genFormBtn(btnList) : ''
	const formModel = `<template>
		<el-form
			ref="${formConfig.ref}"
			:model="${formConfig.model}"
			:rules="${formConfig.rules}"
			size="${formConfig.size}"
			label-width="${formConfig.labelWidth}px"
			class="${formConfig.class}"
		>
			${formItem}
			${btnModel}
		</el-form>
	</template>`
	return formModel
}
const genFormBtn = (btnList: BtnListType) => {
	const btn = btnList.map((item, index) => {
		const type = item.type ? `type='${item.type}'` : ''
		const click = item.eventMethodName ? `@click="${item.eventMethodName}"` : ''
		return `<el-button ${type} ${click}>${item.value}</el-button>`
	})
	const btnModel = `<el-form-item label-width="0px">
	<div class="flex justify-center w-full">${btn.join('')} </div>
	</el-form-item>`
	return btnModel
}
const genFormListModel = (formlist: FormListType, columns = 1) => {
	const list = formlist.map((item) => {
		const type = item.type
		return formItemModelGen(item, genComponent[type](item))
	})
	return columns > 1 ? setColumnTemplate(list, columns) : list.join('')
}

const setColumnTemplate = (list: string[], columns = 1) => {
	return list
		.map((item, index) => {
			const pos = index + 1
			let column = `<div class="flex-1">${item}</div>`
			if (pos % columns === 1) {
				column = `<div class="flex">${column}`
			}
			if (pos % columns === 0 || pos === list.length) {
				column = `${column}</div>`
			}
			return column
		})
		.join('')
}

export const formItemModelGen = (formItem: FormItemType, genTypeVal: string) => {
	const formModel = `<el-form-item label="${formItem.label}" prop="${formItem.field}">
      ${genTypeVal}
    </el-form-item>`

	return formModel
}

const genDisbale = (disabled: boolean) => {
	return disabled ? `:disabled="disabled"` : ''
}
export const genComponent: GenComponentType = {
	input: (val) => {
		const inputModel = `<el-input v-model="form.${val.field}" ${disabled} placeholder="请输入${val.label}" clearable />`
		return inputModel
	},
	select: (val) => {
		const inputModel = `<el-select v-model="form.${val.field}" ${disabled} placeholder="请选择${val.label}" clearable >
		<el-option
			v-for="item in ${val.field}Options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
		</el-select>`
		return inputModel
	},
	checkbox: (val) => {
		const inputModel = `<el-checkbox-group v-model="form.${val.field}" ${disabled}>
		<el-checkbox
			v-for="item in ${val.field}Options"
			:key="item.value"
			:label="item.value"
		>
			{{item.label}}
		</el-checkbox>
		</el-checkbox-group>`
		return inputModel
		// const inputModel = `<el-checkbox v-model="form.${val.field}">${val._message}</el-checkbox>`
		// return inputModel
	},
	radio: (val) => {
		const option = val?._option ? val._option.split(/\s+/) : radio
		const str = option.map((val, index) => `<el-radio :label="${index}">${val}</el-radio>`).join('')
		const inputModel = `<el-radio-group v-model="form.${val.field}" ${disabled}>${str}</el-radio-group>`
		return inputModel
	},
	// textarea: (val) => {
	// 	const inputModel = `<el-input type="textarea" :rows="${val._rows}" v-model="form.${val.field}" placeholder="请输入${val.label}" clearable :maxlength="${val._maxlength}" ${disabled}/>`
	// 	return inputModel
	// },
	upload: (val) => {
		const inputModel = `<el-upload
		action="/posts/"
		:on-success="${val.field}HandleSuccess"
		:before-upload="${val.field}BeforeUpload"
		:on-remove="${val.field}HandleRemove"
		:multiple="${val._multiple}"
		:limit="${val._multiple ? val._limit : 1}"
		:file-list="${val.field}FileList"
		:accept="${val.field}Accept"
		${disabled}
		>
		<el-button size="mini" type="primary">点击上传</el-button>
		<div slot="tip" class="el-upload__tip">只能上传${val._accept}格式文件，且不超过${val._size}MB</div>
	  </el-upload>`
		return inputModel
	},
	inputNumber: (val) => {
		const inputModel = `<el-input-number
		v-model="form.${val.field}"
		:min="${val._min}"
		:max="${val._max}"
		:step="${val._step}"
		controls-position="${val._controlsPosition}"
		${disabled}
	  />`
		return inputModel
	},
	datePicker: (val) => {
		return `<el-date-picker
		v-model="form.${val.field}"
		type="date"
		placeholder="请选择${val.label}"
		${disabled}>
		</el-date-picker>`
	},
}
