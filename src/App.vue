<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
	<!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
	<div class="flex items-center bg-gray-900">
		<div class="w-44 h-14 bg-gray-800 flex items-center justify-center px-4">
			<img class="mr-3" src="@/assets/svg/logo.svg" />
			<span class="text-gray-100 text-2xl">gen code</span>
		</div>
		<el-menu size="mini" :default-active="activeIndex" class="el-menu-demo flex-grow h-14" mode="horizontal"
			@select="handleSelect" :router="true">
			<el-menu-item index="/form">form</el-menu-item>
			<el-sub-menu index="/table">
				<template #title>table</template>
				<el-menu-item index="/table/data">data</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="/graphql">graphql</el-menu-item>
		</el-menu>
	</div>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeIndex = ref('form')
const handleSelect = (key: string) => {
	console.log(key)
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	/* margin-top: 60px; */
}
</style>
