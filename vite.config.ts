import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
		plugins: [
			vue(),
			alias({
				entries: [{find: /@\/(.*)/, replacement: '/src/$1'}],
			}),
			vueJsx(),
		],
		base: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
		define: {
			'process.env': {},
		},
		server: {
			port: 4000,
		},
	})
}
