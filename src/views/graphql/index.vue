<template>
    <el-form ref="genElForm" :model="form" :rules="rules" label-width="100px" class="gen-form">
        <el-form-item label="var-code" prop="varCode">
            <el-input type="textarea" :rows="6" v-model="form.varCode" placeholder="请输入var-code" clearable />
        </el-form-item>
        <el-form-item label="apiAlias" prop="apiAlias">
            <el-select v-model="form.apiAlias" placeholder="请选择apiAlias" clearable>
                <el-option v-for="item in apiAliasOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="ml-2" @click="genVarCodeValue">gen Var</el-button>
        </el-form-item>
        <el-form-item prop="varCodeValue">
            <el-input type="textarea" :rows="6" v-model="form.varCodeValue" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="field-code" prop="fieldCode">
            <el-input type="textarea" :rows="6" v-model="form.fieldCode" placeholder="请输入field-code" clearable />
        </el-form-item>
        <el-form-item>
            <el-button @click="genFieldCodeValue">gen Var</el-button>
        </el-form-item>
        <el-form-item prop="fieldCodeValue">
            <el-input type="textarea" :rows="6" v-model="form.fieldCodeValue" placeholder="请输入" clearable />
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
export default {
    name: 'gen-form',
}
</script>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ParamsType } from '@/types/graphql';
const genElForm = ref()

const form = reactive({
    "varCode": '',
    "varCodeValue": "",
    "fieldCode": '',
    "fieldCodeValue": "",
    apiAlias: "result"
})
const rules = {
    'varCode': [
        { 'required': true, 'message': '请输入var-code', 'trigger': 'blur' },
    ],
    'fieldCode': [
        { 'required': true, 'message': '请输入field-code', 'trigger': 'blur' },
    ],
}
const apiAliasOptions = [{ "label": "result", "value": "result" }]

const genVarCodeValue = () => {
    genElForm.value.validateField('varCode', (isValid: string) => {
        if (isValid === "") {
            const code = form.varCode;
            const typeStr = getTypeStr(code)
            form.varCodeValue = getApiWholeStr(code, typeStr)
        }
    })

}
const getTypeStr = (code: string) => {
    let typeStr = 'query/mutation'
    const typeReg = /extend\stype\s([a-zA-Z]+)\s/
    const typeRegRes = typeReg.exec(code)
    if (typeRegRes) {
        typeStr = typeRegRes[1].toLocaleLowerCase()
    }
    return typeStr
}
const getApiWholeStr = (code: string, typeStr: string) => {
    const apiStr = getApiStr(code)
    debugger
    return apiStr.map(item => `${typeStr} ${item}`).join("\n")
}

const getApiStr = (code: string): string[] => {
    // 获取 { } 之间的内容
    const contentReg = /{([\s\S]+)}/
    const conttentRes = contentReg.exec(code)
    if (conttentRes) {
        const contentrRes = conttentRes[1]
        // 进行分组
        const apiSplitReg = /\s*[\n\r]\s*/
        const groupRes = contentrRes.split(apiSplitReg)
        // 过滤注释 和 换行符
        const filtergReg = /^#/
        // 对每一组数据进行处理
        const apiArr = groupRes.filter(groupItem => !filtergReg.test(groupItem) && groupItem !== "").map(item => {
            debugger
            const apiNameStr = getApiNameStr(item)
            const apiParamsStr = getApiParamsStr(item)
            return getApiTemplate(apiNameStr, apiParamsStr)
        })
        return apiArr
    } else {
        return []
    }
}

const getApiTemplate = (name: string, { paramsVar, paramsValue }: ParamsType) => {
    return `${name}${paramsVar}{
        ${form.apiAlias}:${name}${paramsValue}{
            
        }
    }`
}

const getApiNameStr = (code: string) => {
    const paramsReg = /([a-zA-Z]+)\s*\(/
    const paramsRes = paramsReg.exec(code)
    if (paramsRes) {
        return paramsRes[1]
    } else {
        console.log(new Error("未找到Api Name"))
        return ""

    }
}
const getApiParamsStr = (code: string) => {
    const paramsReg = /\([\s\S]+\)/
    const paramsRes = paramsReg.exec(code)
    const params: ParamsType = {
        paramsVar: "",
        paramsValue: ""
    }
    if (paramsRes) {
        params.paramsVar = paramsRes[0].replace(/([a-zA-Z]+:)/g, "$$$1")
        params.paramsValue = paramsRes[0].replace(/([a-zA-Z]+)(:\s*)([a-zA-Z]+!?)(,?)/g, "$1$2$$$1$4")
    }
    return params
}

const genFieldCodeValue = () => {
    genElForm.value.validateField('fieldCode', (isValid: string) => {
        if (isValid === "") {
            const code = form.fieldCode;
            form.fieldCodeValue = getFildStr(code)
        }
    })
}
const getFildStr = (code: string): string => {
    const fieldReg = /:\s*[a-zA-Z]+!?/g
    const contentReg = /({[\s\S]+})/
    const conttentRes = contentReg.exec(code.replace(fieldReg, ""))
    return conttentRes ? conttentRes[1] : ""
}
</script>
