import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import storage from 'store'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { navs } from '@/config/router.config'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const defaultRoutePath = '/dashboard/workplace'
const whiteList = ['login', 'register', 'registerResult'] // 不进行拦截的路由名称集合

export const setupBeforeEach = router => {
	router.beforeEach((to, from, next) => {
		NProgress.start() // start progress bar
		if (storage.get(ACCESS_TOKEN)) {
			if (JSON.stringify(store.state.user.userInfo) == '{}') {
				store.dispatch('user/GetInfo').then(res=>{
					console.log(res)
				})
				// store.dispatch('permission/GenerateRoutes', navs).then(_ => {
				// 	let routers = store.getters['permission/addRouters']
				// 	routers.forEach(r => router.addRoute(r))
				// })
				// 请求带有 redirect 重定向时，登录自动重定向到该地址
				// const redirect = decodeURIComponent(from.query.redirect || to.path)
				// console.log(redirect)
				// if (to.path === redirect) {
				// 	next({ ...to, replace: true })
				// } else {
				// 	// 跳转到目的路由
				// 	next({ path: redirect })
				// }
				next()
			} else next()
		} else {
			if (whiteList.includes(to.name)) {
				// 在免登录白名单，直接进入
				next()
			} else {
				next({ path: '/user/login', query: { redirect: to.fullPath } })
				NProgress.done()
			}
		}
	})
}
export const setupAfterEach = router => {
	router.afterEach(() => {
		NProgress.done()
	})
}
