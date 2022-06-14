import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 'store'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { generatorDynamicRouters } from '@/router/generator-routers'

NProgress.configure({ showSpinner: false })

const defaultRoutePath = '/index/index'
const whiteList = ['login', 'register', 'registerResult']

// test
let menus = [
	{
		id: 1,
		parentId: 0,
		name: '系统管理',
		symbol: 'system',
		icon: 'Setting',
		sort: 1,
	},
	{
		id: 2,
		parentId: 1,
		name: '菜单管理',
		symbol: 'menu',
		icon: null,
		sort: 1,
	},
	{
		id: 3,
		parentId: 1,
		name: '用户管理',
		symbol: 'user',
		icon: null,
		sort: 1,
	},
]

export const setupBeforeEach = router => {
	router.beforeEach((to, from, next) => {
		NProgress.start()
		if (storage.get(ACCESS_TOKEN)) {
			if (JSON.stringify(store.state.user.permissions) == '{}') {
				// store.dispatch('user/getPermissionsList').then(res => {
				// 	let routers = generatorDynamicRouters(res.menus)
				// 	router.addRoute(routers)
				// })
				store.commit('user/SET_PERMISSIONS', { name: 'test' })
				let routers = generatorDynamicRouters(menus)
				router.addRoute(routers)
				const redirect = decodeURIComponent(from.query.redirect || to.path)
				if (to.path === redirect) next({ ...to, replace: true })
				else next({ path: redirect })
			} else next()
		} else {
			if (whiteList.includes(to.name)) next()
			else {
				next({ path: '/user/login', query: { redirect: to.fullPath } })
				NProgress.done()
			}
		}
	})
}
export const setupAfterEach = router => {
	router.afterEach(() => NProgress.done())
}
