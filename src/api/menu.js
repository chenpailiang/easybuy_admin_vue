import http from '@/utils/request'

// 查询菜单列表
export function getMenuList(data) {
	return http.get(`/api/menu/${data}`, '', 120)
}
