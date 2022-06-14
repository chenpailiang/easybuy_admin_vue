import { createRouter, createWebHistory } from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
import { setupBeforeEach, setupAfterEach } from './permission'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: constantRouterMap,
})
setupBeforeEach(router)
setupAfterEach(router)

export default router
