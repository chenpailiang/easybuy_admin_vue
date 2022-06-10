import { login, getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from 'store'

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
						commit('SET_USERINFO', res)
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		//登出
		LoginOut({ commit }) {
			commit('SET_USERINFO', {})
			commit('SET_TOKEN', '')
			storage.remove(ACCESS_TOKEN)
			storage.remove('refresh')
		},
	},
	getters: {
		userInfo: state => state.userInfo,
	},
}
export default user
