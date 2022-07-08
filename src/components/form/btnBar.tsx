
import { computed, PropType, defineComponent } from "vue";
import { Plus } from '@element-plus/icons-vue'
import { btnThemeList } from "@/data/index";
import { BtnListType } from "@/types/index";
export default defineComponent({
    components: {
        Plus,
    },
    props: {
        value: {
            type: Array as PropType<BtnListType>,
            required: true,
            default: () => [],
        },
    },
    emits: ['update:value'],
    setup(props, { emit: emits }) {
        const configValue = computed<BtnListType>({
            get() {
                return props.value
            },
            set(val) {
                emits('update:value', val)
            },
        })
        const add = () => {
            configValue.value = [...configValue.value, { value: '', methodName: '', type: 'default', isValidate: false }]
        }
        const validateChange = (index: number) => {
            configValue.value = configValue.value.map(item => {
                item.isValidate = false
                return item
            })
            configValue.value[index].isValidate = true
        }
        return () => {
            return (<div class="flex m-2 items-center">
                <span class="text-xs">btn：</span>
                <el-form class="flex flex-wrap" label-width="100px" size="mini" model={configValue}>
                    {configValue.value.map((item, index) => {
                        return (
                            <div>
                                <el-form-item label="name">
                                    <el-input v-model={item.value}></el-input>
                                </el-form-item>
                                <el-form-item label="type">
                                    <el-select v-model={item.type} clearable placeholder="">
                                        {btnThemeList.map(item => {
                                            return (<el-option
                                                key={item.value} label={item.label} value={item.value}></el-option>)
                                        })}
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="methodName">
                                    <el-input v-model={item.methodName}></el-input>
                                </el-form-item>
                                <el-form-item label="isValidate">
                                    <el-radio onChange={() => validateChange(index)} model-value={item.isValidate}
                                        label={true}>&nbsp;</el-radio>
                                </el-form-item>
                            </div>
                        )
                    })}
                </el-form>
                <el-button class="ml-2" type="primary" icon={Plus} circle onClick={add} />
            </div>)
        }
    },
});
