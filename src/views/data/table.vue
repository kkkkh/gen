<template>
    <div class>
        <el-form ref="elForm" :model="form" :rules="rules" type="mini" label-width="100px" class="demo-class">
            <el-form-item label="column-name" prop="name">
                <el-input v-model="form.name" placeholder="请输入name" clearable />
            </el-form-item>
            <el-form-item>
                <h2>gen cn-column</h2>
            </el-form-item>
            <el-form-item label="cn-label" prop="cnLabel">
                <el-input v-model="form.cnLabel" placeholder="请输入label" clearable type="textarea" :rows="6" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="genCnHandle">gen cn-label</el-button>
            </el-form-item>
            <el-form-item label="cn-column" prop="cnColumn">
                <el-input v-model="form.cnColumn" clearable type="textarea" :rows="6" />
            </el-form-item>
            <el-form-item>
                <h2>gen graphql-column</h2>
            </el-form-item>
            <el-form-item label="graphql-label" prop="graphqlLabel">
                <el-input v-model="form.graphqlLabel" placeholder="请输入label" clearable type="textarea" :rows="6" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="genGraphqlHandle">gen graphql-label</el-button>
            </el-form-item>
            <el-form-item label="graphql-column" prop="graphqlColumn">
                <el-input v-model="form.graphqlColumn" clearable type="textarea" :rows="6" />
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { prettierFormat } from "@/utils/format";
import { ref, reactive, computed } from "vue";
import { ColumnsType } from '@/types/table';
const form = reactive({
    name: '',
    cnLabel: '',
    cnColumn: '',
    width: 'auto',
    graphqlLabel: '',
    graphqlColumn: ''
});
const rules = {
    'cnLabel': [
        { 'required': true, 'message': '请输入label', 'trigger': 'blur' },
    ],
};
const propStr = "abcdefghigklmnopqrstuvwxyz"
const props = propStr.split("")
const columnName = computed(() => form.name ? form.name + 'Columns' : 'columns')
const genCnHandle = () => {
    const labels = form.cnLabel.split(/\s+/)
    const columns = labels.map((label, index) => {
        return {
            label,
            prop: props[index],
            width: form.width,
        }
    })
    form.cnColumn = getTemplateStr(columns)
}
const getTemplateStr = (columns: ColumnsType[]) => {
    const exportStr = `export const ${columnName.value} = ${JSON.stringify(columns)}`
    return prettierFormat(exportStr, 'babel')

}
const genGraphqlHandle = () => {
    // # 定时任务文件ID
    // taskFileId: ID!
    const code = form.graphqlLabel
    const fieldReg = /#\s*([a-zA-Z\u4E00-\u9FA5]+)\n\s*([a-zA-Z]+)/g
    let execRes;
    const filedColumns: ColumnsType[] = []
    while ((execRes = fieldReg.exec(code)) !== null) {
        // console.log(`Found ${execRes[0]}. Next starts at ${fieldReg.lastIndex}.`);
        console.log(`${[1]}`);
        filedColumns.push({
            label: execRes[1],
            prop: execRes[2],
            width: form.width,
        })
    }
    form.graphqlColumn = getTemplateStr(filedColumns)

}
</script>


