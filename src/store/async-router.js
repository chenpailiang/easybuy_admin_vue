/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
	namespaced: true,
	state: {
		routers: constantRouterMap,
		addRouters: [],
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
		},
	},
  actions: {
		GenerateRoutes({ commit }, data) {
			return new Promise(resolve => {
				const { navs } = data
				const routers = generatorDynamicRouter(navs)
				commit('SET_ROUTERS', routers)
				resolve()
			})
		},
	},
}

export default permission
