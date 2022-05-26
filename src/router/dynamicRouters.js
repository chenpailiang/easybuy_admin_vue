export const dynamicRouters = {
	UserManage: _ => import('@/views/system/UserManage'),
	MenuManage: _ => import('@/views/system/MenuManage'),
    RolesManage: _=> import('@/views/system/RolesManage'),
	GoodsManage: _ => import('@/views/goods/GoodsManage')
}
