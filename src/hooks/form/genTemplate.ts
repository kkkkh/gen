/* eslint-disable @typescript-eslint/ban-ts-comment */
import {FormListType, FormItemType, GenComponentType, StoreFiledType} from '../../types/field'
import {BtnListType} from '@/types/btn'
import {FormConfig} from '../../types/config'
import {defaultConfig} from '../../data/default'
import {radio, checkbox} from '@/data/word'
let disabled = ''
export const genTemplate = (formConfig: FormConfig = defaultConfig, formList: FormListType, btnList: BtnListType) => {
	disabled = genDisbale(formConfig._globalDisabled)
	const formItemList = genFormList(formList, formConfig._columns)
	const btn = formConfig._isBtn ? genFormBtn(btnList) : ''
	return `<template>
		<el-form
			ref="${formConfig.ref}"
			:model="${formConfig.model}"
			:rules="${formConfig.rules}"
			size="${formConfig.size}"
			label-width="${formConfig.labelWidth}px"
			class="${formConfig.class}"
		>
			${formItemList}
			${btn}
		</el-form>
	</template>`
}
const genFormBtn = (btnList: BtnListType) => {
	const btn = btnList.map((item, index) => {
		const type = item.type ? `type='${item.type}'` : ''
		const click = item.eventMethodName ? `@click="${item.eventMethodName}"` : ''
		return `<el-button ${type} ${click}>${item.value}</el-button>`
	})
	return `<el-form-item label-width="0px">
	<div class="flex justify-center w-full">${btn.join('')} </div>
	</el-form-item>`
}
const genFormList = (formlist: FormListType, columns = 1) => {
	const list = formlist.map((item) => {
		const type = item.type
		// @ts-ignore
		return genFormItem(item, genComponent[type](item))
	})
	return columns > 1 ? setColumn(list, columns) : list.join('')
}

const setColumn = (list: string[], columns = 1) => {
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

export const genFormItem = (formItem: FormItemType, genTypeVal: string) => {
	const form = `<el-form-item label="${formItem.label}" prop="${formItem.field}">
      ${genTypeVal}
    </el-form-item>`

	return form
}

const genDisbale = (disabled: boolean) => {
	return disabled ? `:disabled="disabled"` : ''
}
export const genComponent: GenComponentType = {
	input: (val) => {
		const input = `<el-input v-model="form.${val.field}" ${disabled} placeholder="请输入${val.label}" clearable />`
		return input
	},
	select: (val) => {
		return `<el-select v-model="form.${val.field}" ${disabled} placeholder="请选择${val.label}" clearable >
		<el-option
			v-for="item in ${val.field}Options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
		</el-select>`
	},
	checkbox: (val) => {
		return `<el-checkbox-group v-model="form.${val.field}" ${disabled}>
		<el-checkbox
			v-for="item in ${val.field}Options"
			:key="item.value"
			:label="item.value"
		>
			{{item.label}}
		</el-checkbox>
		</el-checkbox-group>`
		// const inputModel = `<el-checkbox v-model="form.${val.field}">${val._message}</el-checkbox>`
		// return inputModel
	},
	radio: (val) => {
		const option = val?.attrs._option ? val.attrs._option.split(/\s+/) : radio
		const str = option.map((val, index) => `<el-radio :label="${index}">${val}</el-radio>`).join('')
		return `<el-radio-group v-model="form.${val.field}" ${disabled}>${str}</el-radio-group>`
	},
	// textarea: (val) => {
	// 	const inputModel = `<el-input type="textarea" :rows="${val._rows}" v-model="form.${val.field}" placeholder="请输入${val.label}" clearable :maxlength="${val._maxlength}" ${disabled}/>`
	// 	return inputModel
	// },
	upload: (val) => {
		return `<el-upload
		action="/posts/"
		:on-success="${val.field}HandleSuccess"
		:before-upload="${val.field}BeforeUpload"
		:on-remove="${val.field}HandleRemove"
		:multiple="${val.attrs._multiple}"
		:limit="${val.attrs._multiple ? val.attrs._limit : 1}"
		:file-list="${val.field}FileList"
		:accept="${val.field}Accept"
		${disabled}
		>
		<el-button size="mini" type="primary">点击上传</el-button>
		<div slot="tip" class="el-upload__tip">只能上传${val.attrs._accept}格式文件，且不超过${val.attrs._size}MB</div>
	  </el-upload>`
	},
	inputNumber: (val) => {
		return `<el-input-number
		v-model="form.${val.field}"
		:min="${val.attrs._min}"
		:max="${val.attrs._max}"
		:step="${val.attrs._step}"
		controls-position="${val.attrs._controlsPosition}"
		${disabled}
	  />`
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
