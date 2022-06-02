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
		component: () => import(/* webpackChunkName: "dataTable" */ '../views/table/index.vue'),
		children: [
			{
				path: 'data',
				name: 'table-data',
				component: () => import(/* webpackChunkName: "dataTable" */ '../views/table/data.vue'),
			},
		],
	},
	{
		path: '/graphql',
		name: 'data-graphql',
		component: () => import(/* webpackChunkName: "dataTable" */ '../views/graphql/index.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
