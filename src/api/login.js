import http from '@/utils/request'

export function login(data) {
	return http.post('/api/auth/login', data)
}
export function refreshToken(data) {
	return http.post('/api/auth/refresh', data)
}
// 获取菜单
export function getInfo(data) {
	return http.get('/api/menu', data, 140)
}
