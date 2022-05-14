// 基础路由
export const constantRouterMap = [
	{
		path: '/user',
		redirect: '/user/login',
		component: () => import('@/layouts/UserLayouts'),
		children: [
			{
				path:'login',
                name: 'login',
				component: () => import('@/views/user/Login'),
			},
		],
	},
]
