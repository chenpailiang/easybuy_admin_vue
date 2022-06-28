import http from '@/utils/request'

export function login(data) {
	return http.post('/api/auth/login', data)
}
export function refreshToken(data) {
	return http.post('/api/auth/refresh', data)
}
// 获取用户信息
export function getInfo(data) {
	return http.get('', data)
}
// 获取菜单按钮权限
export function getPermissionsList (data) {
	return http.get('/api/menu', data)
}
