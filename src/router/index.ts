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
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "table" */ '../views/table.vue'),
	},
	{
		path: '/data/',
		name: 'data',
		redirect: '/data/table',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "data" */ '../views/data/index.vue'),
		children: [
			{
				path: 'table',
				name: 'data-table',
				component: () => import(/* webpackChunkName: "dataTable" */ '../views/data/table.vue'),
			},
			{
				path: 'graphql',
				name: 'data-graphql',
				component: () => import(/* webpackChunkName: "dataTable" */ '../views/data/graphql.vue'),
			},
		],
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
