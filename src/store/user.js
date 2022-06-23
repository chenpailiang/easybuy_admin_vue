import { login, getPermissionsList } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from 'store'
import router from '@/router'
import { createRouter } from 'vue-router'

// 用户Info
const user = {
	namespaced: true,
	state: {
		token: '',
		userInfo: {},
		permissions: {},
	},
	mutations: {
		SET_TOKEN: (state, token) => (state.token = token),
		SET_USERINFO: (state, userInfo) => (state.userInfo = userInfo),
		SET_PERMISSIONS: (state, permissions) => (state.permissions = permissions),
	},
	actions: {
		//登录
		Login({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo)
					.then(res => {
						storage.set(ACCESS_TOKEN, res.token)
						storage.set('refresh', res.refresh)
						commit('SET_TOKEN', res.token)
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		// 获取权限信息
		getPermissionsList({ commit }) {
			return new Promise((resolve, reject) => {
				getPermissionsList()
					.then(res => {
						commit('SET_PERMISSIONS', res)
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		//登出
		LoginOut({ commit }) {
			commit('SET_PERMISSIONS', {})
			commit('SET_TOKEN', '')
			const options = router.options
			const _VueRouter = createRouter(options)
			router.matcher = _VueRouter.matcher
			storage.remove(ACCESS_TOKEN)
			storage.remove('refresh')
		},
	},
	getters: {
		userInfo: state => state.userInfo,
		permissions: state => state.permissions,
	},
}
export default user
