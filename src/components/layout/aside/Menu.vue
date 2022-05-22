<template>
	<el-menu default-active="2" background-color="#001529" text-color="#fff">
		<el-sub-menu index="1">
			<template #title>
				<el-icon>
					<Setting />
				</el-icon>
				<span>系统管理</span>
			</template>
			<el-menu-item index="1-1">用户管理</el-menu-item>
			<el-menu-item index="1-2">菜单管理</el-menu-item>
			<el-menu-item index="1-3">角色管理</el-menu-item>
		</el-sub-menu>
		<el-menu-item index="2">
			<el-icon>
				<icon-menu />
			</el-icon>
			<span>商品管理</span>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu {
	border-right: none;
}
</style>