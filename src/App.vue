<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
	<!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
	<div class="flex items-center">
		<div class="w-36 h-14 bg-gray-800 flex items-center justify-center">
			<span class="text-gray-100 text-2xl">gen</span>
		</div>
		<el-menu
			size="mini"
			:default-active="activeIndex"
			class="el-menu-demo flex-grow h-14"
			mode="horizontal"
			@select="handleSelect"
			:router="true">
			<el-menu-item index="form">form</el-menu-item>
			<el-menu-item index="table">table</el-menu-item>
		</el-menu>
	</div>
	<router-view></router-view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
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
	text-align: center;
	color: #2c3e50;
	/* margin-top: 60px; */
}
</style>
