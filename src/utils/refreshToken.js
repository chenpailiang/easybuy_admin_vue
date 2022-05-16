import { refreshToken } from '@/api/login'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

class RefreshToken {
	constructor() {
		this.refreshPromise = undefined
	}
	apiRefreshToken() {
		if (!this.refreshPromise) {
			let token
			refreshToken().then(res => {
				token = res.data.token
			})
			storage.set(ACCESS_TOKEN, token)
			this.refreshPromise = new Promise((resolve, reject) => {
				setTimeout(() => {
					this.refreshPromise = undefined
					resolve()
				}, 8000)
			})
		}
		return this.refreshPromise
	}
}

export default new RefreshToken()
