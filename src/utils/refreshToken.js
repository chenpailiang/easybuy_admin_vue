import { refreshToken } from '@/api/login'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

class RefreshToken {
	constructor() {
		this.refreshPromise = undefined
	}
	apiRefreshToken() {
		if (!this.refreshPromise) {
			let token = storage.get(ACCESS_TOKEN)
			let refresh = storage.get('refresh')
			refreshToken({ token, refresh }).then(res => {
				token = res.token
				refresh = res.refresh
			})
			storage.set(ACCESS_TOKEN, token)
			storage.set('refresh', refresh)
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
