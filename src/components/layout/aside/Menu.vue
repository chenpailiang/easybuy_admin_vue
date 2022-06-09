<template>
	<el-menu background-color="#001529" text-color="#fff" router>
		<template v-for="v in menus" :key="v.id">
			<template v-if="v.children">
				<el-sub-menu>
					<template #title>
						<Icon :Icon="v.icon" />
						<span>{{ v.title }}</span>
					</template>
					<el-menu-item v-for="(u, i) in v.children" :key="i" :index="`/${v.name}/${u.name}`">{{ u.title }}</el-menu-item>
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
import { ref } from 'vue'
import { getPermissionsList } from '@/api/login'
import { listToTree } from '@/utils/util'

let menus = ref([])
async function get() {
	let menus = (await getPermissionsList()).menus
	listToTree(menus, menus.value, 0)
	console.log(menus.value)
}
await get()
</script>

<style scoped>
.el-menu {
	border-right: none;
}
</style>