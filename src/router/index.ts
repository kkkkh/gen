import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/form',
	},
	{
		path: '/form',
		name: 'form',
		component: () => import(/* webpackChunkName: "form" */ '../views/form/form.vue'),
	},
	{
		path: '/table',
		name: 'table',
		component: () => import(/* webpackChunkName: "table" */ '../views/table/index.vue'),
		children: [
			{
				path: 'index',
				name: 'table-index',
				component: () => import(/* webpackChunkName: "table-index" */ '../views/table/table.vue'),
			},
			{
				path: 'data',
				name: 'table-data',
				component: () => import(/* webpackChunkName: "table-data" */ '../views/table/data.vue'),
			},
		],
	},
	{
		path: '/graphql',
		name: 'graphql',
		component: () => import(/* webpackChunkName: "graphql" */ '../views/graphql/index.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
