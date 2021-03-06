/* eslint-disable @typescript-eslint/ban-ts-comment */
import {FormListType, FormItemType, GenComponentType, BtnListType, FormConfig} from '@/types/index'
import {defaultConfig, radio} from '@/data/index'
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
		const click = item.methodName ? `@click="${item.methodName}"` : ''
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
		const attrs = Object.fromEntries(val?.attrs?.map((item) => [item.key, item.value]) || [])
		const textare =
			attrs.type === 'textarea' ? `type="${attrs.type}" :rows="${attrs.rows}" :maxlength="${attrs.maxlength}"` : ':'
		const input = `<el-input v-model="form.${val.field}" ${disabled} ${textare} placeholder="?????????${val.label}" clearable />`
		return input
	},
	select: (val) => {
		return `<el-select v-model="form.${val.field}" ${disabled} placeholder="?????????${val.label}" clearable >
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
		const _option = val?.attrs?.find((item) => item.key === 'option')
		const option = _option ? (_option.value as string).split(/\s+/) : radio
		const str = option.map((val, index) => `<el-radio :label="${index}">${val}</el-radio>`).join('')
		return `<el-radio-group v-model="form.${val.field}" ${disabled}>${str}</el-radio-group>`
	},
	// textarea: (val) => {
	// 	const inputModel = `<el-input type="textarea" :rows="${val._rows}" v-model="form.${val.field}" placeholder="?????????${val.label}" clearable :maxlength="${val._maxlength}" ${disabled}/>`
	// 	return inputModel
	// },
	upload: (val) => {
		const attrs = Object.fromEntries(val?.attrs?.map((item) => [item.key, item.value]) || [])
		return `<el-upload
		action="/posts/"
		:on-success="${val.field}HandleSuccess"
		:before-upload="${val.field}BeforeUpload"
		:on-remove="${val.field}HandleRemove"
		:multiple="${attrs.multiple}"
		:limit="${attrs.multiple ? attrs.limit : 1}"
		:file-list="${val.field}FileList"
		:accept="${val.field}Accept"
		${disabled}
		>
		<el-button size="mini" type="primary">????????????</el-button>
		<div slot="tip" class="el-upload__tip">????????????${attrs.accept}???????????????????????????${attrs.size}MB</div>
	  </el-upload>`
	},
	inputNumber: (val) => {
		const attrs = Object.fromEntries(val?.attrs?.map((item) => [item.key, item.value]) || [])
		return `<el-input-number
		v-model="form.${val.field}"
		:min="${attrs.min}"
		:max="${attrs.max}"
		:step="${attrs.step}"
		controls-position="${attrs.controlsPosition}"
		${disabled}
	  />`
	},
	datePicker: (val) => {
		return `<el-date-picker
		v-model="form.${val.field}"
		type="date"
		placeholder="?????????${val.label}"
		${disabled}>
		</el-date-picker>`
	},
	timePicker: (val) => {
		return `<el-time-picker
		v-model="form.${val.field}"
		placeholder="?????????${val.label}"
		${disabled}>
		</el-time-picker>`
	},
}
