import http from '@/utils/request'

export function login(data) {
	return http.post('/api/auth/login', data)
}
export function refreshToken(data) {
	return http.post('/api/auth/refresh', data)
}
export function getInfo(data) {
	return http.get('/api/menu/admin', data)
}
