import { refreshToken } from '@/api/login'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

class RefreshToken {
	constructor() {
		this.refreshPromise = undefined
	}
	async apiRefreshToken() {
			let token = storage.get(ACCESS_TOKEN)
			let refresh = storage.get('refresh')
			let res =  await refreshToken({ token, refresh })
			token = res.token
			refresh = res.refresh
			this.refreshPromise = res
			storage.set(ACCESS_TOKEN, token)
			storage.set('refresh', refresh)
			return this.refreshPromise
	}
}

export default new RefreshToken()
