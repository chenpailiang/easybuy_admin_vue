import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 'store'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { generatorDynamicRouters } from '@/router/generator-routers'
import { computed } from 'vue'

NProgress.configure({ showSpinner: false })

const defaultRoutePath = '/index/index'
const whiteList = ['login', 'register', 'registerResult']

export const setupBeforeEach = router => {
	router.beforeEach((to, from, next) => {
		NProgress.start()
		if (storage.get(ACCESS_TOKEN)) {
			let permissions = computed(_ => store.getters['user/permissions'])
			if (JSON.stringify(permissions.value) === '{}') {
				console.log(permissions.value)
				console.log('test')
				store.dispatch('user/getPermissionsList').then(res => {
					let routers = generatorDynamicRouters(res)
					router.addRoute(routers)
				})
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
