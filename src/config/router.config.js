export const asyncRouterMap = [
	{
		path: '/',
		component: () => import('@/layouts/BasicLayout'),
		redirect: '/index/index',
		children: [
			{
				path: '/index/index',
				component: () => import('@/views/index/Index'),
			},
			{
				path: '/system',
				redirect: '/system/user',
				component: () => import('@/layouts/RouteView'),
				children: [
					{
						path: 'user',
						component: () => import('@/views/system/UserManage'),
					},
					{
						path: 'menu',
						component: () => import('@/views/system/MenuManage'),
					},
					{
						path: 'roles',
						component: () => import('@/views/system/RolesManage'),
					},
				],
			},
			{
				path: '/goods',
				component: () => import('@/layouts/RouteView'),
				redirect: '/goods/goodsManage',
				children: [
					{
						path: 'goodsManage',
						component: () => import('@/views/goods/GoodsManage'),
					},
				],
			},
		],
	},
]

// 基础路由
export const constantRouterMap = [
	{
		path: '/user',
		redirect: '/user/login',
		component: () => import('@/layouts/UserLayout'),
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('@/views/user/Login'),
			},
		],
	},
	// 404路由
	{
		path: '/:pathMatch(.*)*',
		// path: '/:catchAll(.*)*'
		component: () => import('@/views/exception/403')
	},
]
