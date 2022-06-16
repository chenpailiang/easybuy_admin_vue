import http from '@/utils/request'

// 查询菜单列表
export function getMenuList(data) {
	return http.get(`/api/menu/${data}`, '', 120)
}
// 新增菜单
export function addMenu(data) {
	return http.post('/api/menu', data, 121)
}
// 编辑菜单
export function editMenu(data) {
	return http.put('/api/menu', data, 122)
}
// 删除菜单
export function delMenu(data) {
	return http.delete(`/api/menu/${data}`, '', 123)
}
