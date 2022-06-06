import { login, getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from 'store'
import router from '@/router'
import { createRouter } from 'vue-router'

const user = {
	namespaced: true,
	state: {
		token: '',
		userInfo: {},
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
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
		// 获取用户信息
		GetInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getInfo()
					.then(res => {
						commit('SET_USERINFO', res.data)
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		//登出
		LoginOut({ commit }) {
			commit('SET_USERINFO', {})
			commit('SET_TOKEN', '')
			const options = router.options
			const _VueRouter = createRouter(options)
			router.matcher = _VueRouter.matcher
			storage.remove(ACCESS_TOKEN)
			storage.remove('refresh')
		},
	},
}
export default user
