import axios from 'axios'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const request = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 20 * 1000,
	maxBodyLength: 5 * 1024 * 1024,
	withCredentials: true,
})
request.interceptors.request.use(
	config => {
		let token = storage.get(ACCESS_TOKEN)
		if (token) {
			config.headers['ACCESS_TOKEN'] = token
		}
	},
	err => Promise.reject(error)
)
const http = {
	get(url, params) {
		return new Promise((resolve, reject) => {
			request
				.get(url, { params })
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			request
				.post(url, JSON.stringify(data))
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
	put(url, data) {
		return new Promise((resolve, reject) => {
			request
				.put(url, JSON.stringify(data))
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
	delete(url, params) {
		return new Promise((resolve, reject) => {
			request
				.delete(url, { params })
				.then(res => resolve(res))
				.catch(err => reject(err))
		})
	},
}
export default http
