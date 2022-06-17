import axios from 'axios'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import tokenServer from './refreshToken'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import router from '@/router'
const request = axios.create({
	baseURL: '/',
	timeout: 20 * 1000,
	maxBodyLength: 5 * 1024 * 1024,
	withCredentials: true,
	headers: {
		post: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		put: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
	},
})
request.interceptors.request.use(
	config => {
		let token = storage.get(ACCESS_TOKEN)
		if (token) config.headers['Authorization'] = `Bearer ${token}`
		return config
	},
	err => Promise.reject(error)
)
// 添加响应拦截器
request.interceptors.response.use(
	res => Promise.resolve(res.data),
	async error => {
		if (error.response.status == 401) {
			let res = await tokenServer.apiRefreshToken()
			if (res.success) return Promise.resolve(request(error.config))
			else {
				ElMessageBox.alert('登录已失效，请重新登录！', '提示', {
					confirmButtonText: '去登录',
					callback: () => {
						store.dispatch('user/LoginOut')
						router.push('user/login')
					},
				})
				return Promise.reject()
			}
		} else {
			ElMessage.error('服务器链接失败，请重试！')
			Promise.reject(error)
		}
	}
)
const http = {
	get(url, params, aid) {
		return new Promise((resolve, reject) => {
			request
				.get(url, { params, headers: { aid } })
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
	post(url, data, aid) {
		return new Promise((resolve, reject) => {
			request
				.post(url, JSON.stringify(data), { headers: { aid } })
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
	put(url, data, aid) {
		return new Promise((resolve, reject) => {
			request
				.put(url, JSON.stringify(data), { headers: { aid } })
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
	delete(url, params, aid) {
		return new Promise((resolve, reject) => {
			request
				.delete(url, { params, headers: { aid } })
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
}
export default http
