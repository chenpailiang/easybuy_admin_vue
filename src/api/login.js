import http from '@/utils/request'

export function login(data) {
	return http.post('/api/auth/login', data)
}