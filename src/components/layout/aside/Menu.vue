<template>
	<el-menu default-active="2" background-color="#001529" text-color="#fff">
			<el-sub-menu index="1">
				<template #title>
					<Icon Icon="Setting" />
					<span>系统管理</span>
				</template>
				<el-menu-item index="1-1">用户管理</el-menu-item>
				<el-menu-item index="1-2">菜单管理</el-menu-item>
				<el-menu-item index="1-3">角色管理</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="2">
				<Icon Icon="Menu" />
				<span>商品管理</span>
			</el-menu-item>
	</el-menu>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { computed } from 'vue'
import { useStore } from 'vuex'

let store = useStore()
let menus = computed(_ => store.getters['permission/addRouters'])
console.log(menus)
</script>

<style scoped>
.el-menu {
	border-right: none;
}
</style>