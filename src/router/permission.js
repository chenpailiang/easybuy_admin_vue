import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import storage from 'store'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const defaultRoutePath = '/dashboard/workplace'
const whiteList = ['login', 'register', 'registerResult'] // 不进行拦截的路由名称集合

export const setupBeforeEach = router => {
	router.beforeEach((to, from, next) => {
		NProgress.start() // start progress bar

		if (storage.get(ACCESS_TOKEN)) {
		} else {
			if (whiteList.includes(to.name)) {
				// 在免登录白名单，直接进入
				next()
			} else {
				console.log(to)
				next({ path: '/user/login', query: { redirect: to.fullPath } })
				NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
			}
		}
	})
}
export const setupAfterEach = router => {
	router.afterEach(() => {
		NProgress.done()
	})
}
