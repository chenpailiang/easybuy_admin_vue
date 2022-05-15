const RouteView = {
	name: 'RouteView',
	render: h => h('router-view')
  }

export const asyncRouterMap = [
	{
		path:'/',
		component:()=>import('@/layouts/BasicLayout'),
		name: 'index',
		children:[
			{

			}
		]
	}
]

// 基础路由
export const constantRouterMap = [
	{
		path: '/user',
		redirect: '/user/login',
		component: () => import('@/layouts/UserLayout'),
		children: [
			{
				path:'login',
                name: 'login',
				component: () => import('@/views/user/Login'),
			},
		],
	},
]
