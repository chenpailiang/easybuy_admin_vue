import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 'store'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false })

const defaultRoutePath = '/index/index'
const whiteList = ['login', 'register', 'registerResult']

export const setupBeforeEach = router => {
	router.beforeEach((to, from, next) => {
		NProgress.start()
		next()
		// if (storage.get(ACCESS_TOKEN)) next()
		// else {
		// 	if (whiteList.includes(to.name)) next()
		// 	else {
		// 		next({ path: '/user/login', query: { redirect: to.fullPath } })
		// 		NProgress.done()
		// 	}
		// }
	})
}
export const setupAfterEach = router => {
	router.afterEach(() => NProgress.done())
}
