<template>
	<el-menu background-color="#001529" :default-active="currentKey" text-color="#fff">
		<template v-for="v in menus" :key="v.id">
			<template v-if="v.children">
				<el-sub-menu :index="`/${v.symbol}`">
					<template #title>
						<Icon :Icon="v.icon" />
						<span>{{ v.name }}</span>
					</template>
					<el-menu-item v-for="(u, i) in v.children" :key="i" :index="`/${v.symbol}/${u.symbol}`"
						@click="skip(`/${v.symbol}/${u.symbol}`, u.id)">
						{{ u.name }}</el-menu-item>
				</el-sub-menu>
			</template>
			<template v-else>
				<el-menu-item :index="`/${v.symbol}`" @click="skip(`/${v.symbol}`,v.id)">
					<Icon :Icon="v.icon" />
					<span>{{ v.name }}</span>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPermissionsList } from '@/api/login'
import { listToTree } from '@/utils/util'

let menus = [
	{
		symbol: 'system',
		name: '系统管理',
		icon: 'Setting',
		children: [
			{ symbol: 'menu', name: '菜单管理', icon: null },
			{ symbol: 'user', name: '用户管理', icon: null },
		],
	},
]
let route = useRoute()
let router = useRouter()
let currentKey = ref(route.path)
watch(
	_ => route,
	v => (currentKey.value = v.path)
)
let skip = (path, id) => {
	router.push({ path, meta: { menuId: id } })
}

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