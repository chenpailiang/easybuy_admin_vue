import { dynamicRouters } from './dynamicRouters'

// 前端路由表
const constantRouterComponents = {
	BasicLayout: () => import('@/layouts/BasicLayout'),
	RouteView: () => import('@/layouts/RouteView'),
	...dynamicRouters,
}
// 根级菜单
const rootRouter = {
	key: '',
	name: 'index',
	path: '',
	component: 'BasicLayout',
	redirect: '/system/user',
	meta: {
		title: '易买超市后台管理系统',
	},
	children: [],
}
// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
	path: '/:pathMatch(.*)*',
	redirect: '/404',
}

/**
 * 动态生成菜单
 * @param navs
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = navs => {
	const menuNav = []
	const childrenNav = []
	// 后端数据, 根级树数组,  根级 PID
	listToTree(navs, childrenNav, 0)
	rootRouter.redirect = childrenNav[0].redirect
	rootRouter.children = childrenNav
	menuNav.push(rootRouter)
	const routers = generator(menuNav)
	routers.push(notFoundRouter)
	return routers
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
	return routerMap.map(item => {
		const { title, show, hideChildren, icon } = item.meta || {}
		const currentRouter = {
			// 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
			path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
			// 路由名称，建议唯一
			name: item.name || item.key || '',
			// 该路由对应页面的 组件 :方案1
			// component: constantRouterComponents[item.component || item.key],
			// 该路由对应页面的 组件 :方案2 (动态加载)
			component:
				constantRouterComponents[item.component || item.key] ||
				(() => import(`@/views/${item.component}`)),

			// meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
			meta: {
				title: title,
				icon: icon || undefined,
			},
		}
		// 是否设置了隐藏菜单
		if (show === false) {
			currentRouter.hidden = true
		}
		// 是否设置了隐藏子菜单
		if (hideChildren) {
			currentRouter.hideChildrenInMenu = true
		}
		// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
		if (!currentRouter.path.startsWith('http')) {
			currentRouter.path = currentRouter.path.replace('//', '/')
		}
		// 重定向
		item.redirect && (currentRouter.redirect = item.redirect)
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			// Recursion
			currentRouter.children = generator(item.children, currentRouter)
		}
		return currentRouter
	})
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
	list.forEach(item => {
		// 判断是否为父级菜单
		if (item.parentId === parentId) {
			const child = {
				...item,
				// key: item.key || item.name,
				children: [],
			}
			// 子菜单递归
			listToTree(list, child.children, item.id)
			// 删掉不存在 children 值的属性
			if (child.children.length <= 0) delete child.children
			// 加入到树中
			tree.push(child)
		}
	})
}

/* 
	根级路由
*/
const root = {
	path: '/',
	component: () => import('@/layouts/BasicLayout'),
	redirect: '/index/index',
	children: [
		{
			path: '/index/index',
			component: () => import('@/views/index/Index'),
		},
	],
}

/* 
	生成路由
*/
const generatorRouter = menus => {
	let menuList = menus.map(v => {
		let firstChild = menus.find(m => m.parentId === v.id)
		return {
			parentId: v.parentId,
			id: v.id,
			path: !firstChild ? v.symbol : `/${v.symbol}`,
			name: v.name,
			component:
				v.parentId === 0
					? constantRouterComponents['RouteView']
					: constantRouterComponents[v.symbol],
			redirect: !firstChild ? null : `/${v.symbol}/${firstChild.symbol}`,
			meta: {
				menuId: v.id,
				icon: v.icon,
				title: v.name
			},
		}
	})
	let result = []
	listToTree(menuList, result, 0)
	return result
}
export const generatorDynamicRouters = menus => {
	let dynamicRouters = generatorRouter(menus)
	let routers = root
	dynamicRouters.forEach(r => routers.children.push(r))

	return routers
}
