<template>
	<el-menu background-color="#001529" :default-active="currentKey" text-color="#fff" router>
		<template v-for="v in menus" :key="v.id">
			<template v-if="v.children">
				<el-sub-menu :index="`/${v.name}`">
					<template #title>
						<Icon :Icon="v.icon" />
						<span>{{ v.title }}</span>
					</template>
					<el-menu-item v-for="(u, i) in v.children" :key="i" :index="`/${v.name}/${u.name}`">
						{{ u.title }}</el-menu-item>
				</el-sub-menu>
			</template>
			<template v-else>
				<el-menu-item :index="`/${v.name}`">
					<Icon :Icon="v.icon" />
					<span>{{ v.title }}</span>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPermissionsList } from '@/api/login'
import { listToTree } from '@/utils/util'

let menus = [
	{
		name: 'system',
		title: '系统管理',
		icon: 'Setting',
		children: [
			{ name: 'menu', title: '菜单管理', icon: null },
			{ name: 'user', title: '用户管理', icon: null },
		],
	},
]
let route = useRoute()
let currentKey = ref(route.path)
watch(
	_ => route,
	v => (currentKey.value = v.path)
)

// let menus = ref([])
// async function get() {
// 	let menuList = (await getPermissionsList()).menus
// 	listToTree(menuList, menus.value, 0)
// }
// onMounted(async _ => await get())
</script>

<style scoped>
.el-menu {
	border-right: none;
}
</style>