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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

let store = useStore()
let menus = computed(_ => store.getters['user/userInfo'].menus)
let menuList = ref([])
console.log(menus.value.forEach(v=>console.log(v)))
let listToTree = (list, tree, parentId) => {
	list.forEach(item => {
		// 判断是否为父级菜单
		if (item.parentId === parentId) {
			const child = {
				...item,
				key: item.key || item.name,
				children: [],
			}
			// 迭代 list， 找到当前菜单相符合的所有子菜单
			listToTree(list, child.children, item.id)
			// 删掉不存在 children 值的属性
			if (child.children.length <= 0) {
				delete child.children
			}
			// 加入到树中
			tree.push(child)
		}
	})
}
// listToTree(menus,menuList.value,0)
</script>

<style scoped>
.el-menu {
	border-right: none;
}
</style>