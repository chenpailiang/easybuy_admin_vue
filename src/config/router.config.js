const RouteView = {
	name: 'RouteView',
	render: h => h('router-view'),
}

export const asyncRouterMap = [
	{
		path: '/',
		component: () => import('@/layouts/BasicLayout'),
		name: 'index',
		// children:[
		// 	{

		// 	}
		// ]
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
]

// 菜单表
export const navs = [
	{
		name: 'system',
		parentId: 0,
		id: 1,
		meta: {
			icon: 'Setting',
			title: '系统管理',
			show: true,
		},
		component: 'RouteView',
		redirect: '/system/user',
	},
	{
		name: 'user',
		parentId: 1,
		id: 2,
		meta: {
			title: '用户管理',
			show: true,
		},
		component: 'UserManage',
		path: '/system/user',
	},
	{
		name: 'menu',
		parentId: 1,
		id: 3,
		meta: {
			title: '菜单管理',
			show: true,
		},
		component: 'MenuManage',
		path: '/system/menu',
	},
	{
		name: 'roles',
		parentId: 1,
		id: 4,
		meta: {
			title: '角色管理',
			show: true,
		},
		path: '/system/roles',
	},
	{
		name: 'goods',
		parentId: 0,
		id: 5,
		meta: {
			icon: 'Menu',
			title: '商品管理',
			hideChildren: true
		},
		redirect: '/goods/goodsManage',
		component: 'RouteView',
	},
	{
		name: 'goodsManage',
		parentId: 5,
		id: 6,
		meta: {
			title: '商品管理',
			show: false,
		},
		path: '/goods/goodsManage'
	},
]
