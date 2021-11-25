<template>
	<div class="p-4 bg-gray-700 text-left relative" contenteditable readonly>
		<el-button
			:contenteditable="false"
			class="absolute right-0 top-0 mr-2 mt-2"
			size="small"
			type="primary"
			@click="copyHandle"
			>copy</el-button
		>
		<div id="code-main">
			<pre>{{ codeView }}</pre>
		</div>
	</div>
</template>
<script setup lang="ts">
import {ElMessage} from 'element-plus'
import {computed} from 'vue'
const props = defineProps<{
	code: string
}>()
const codeView = computed(() => props.code)
const copyHandle = () => {
	navigator.clipboard.writeText(codeView.value).then(() => {
		ElMessage({
			message: 'copy success',
			type: 'success',
		})
	})
}
</script>
