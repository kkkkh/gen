import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// console.log('import.meta.env.VITE_APP_BASE_URL', import.meta.env)
// // console.log('process.env', process.env)
// // console.log('process.env.VITE_APP_BASE_URL', process.env.VITE_APP_BASE_URL)
// export default defineConfig({
// 	plugins: [vue()],
// 	// base: import.meta.env.VITE_APP_BASE_URL,
// })

export default ({mode}) => {
	return defineConfig({
		plugins: [vue()],
		base: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
	})
}
