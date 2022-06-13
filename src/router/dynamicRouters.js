export const dynamicRouters = {
	RouteView: _=> import('@/layouts/RouteView'),
	user: _ => import('@/views/system/UserManage'),
	menu: _ => import('@/views/system/MenuManage'),
    role: _=> import('@/views/system/RolesManage'),
	goods: _ => import('@/views/goods/GoodsManage')
}
