<template>
	<el-menu background-color="#001529" :default-active="currentKey" text-color="#fff" router>
		<template v-for="v in menus" :key="v.id">
			<template v-if="v.children">
				<el-sub-menu :index="`/${v.symbol}`">
					<template #title>
						<Icon :Icon="v.icon" />
						<span>{{ v.name }}</span>
					</template>
					<el-menu-item v-for="(u, i) in v.children" :key="i" :index="`/${v.symbol}/${u.symbol}`">
						{{ u.name }}</el-menu-item>
				</el-sub-menu>
			</template>
			<template v-else>
				<el-menu-item :index="`/${v.symbol}`">
					<Icon :Icon="v.icon" />
					<span>{{ v.name }}</span>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { listToTree } from '@/utils/util'

let route = useRoute()
let currentKey = ref(route.path)
watch(route, v => (currentKey.value = v.path))

let store = useStore()
let menuList = computed(_ => store.getters['user/permissions'].menus)
let menus = ref([])
async function get() {
	listToTree(menuList.value, menus.value, 0)
}
onMounted(async _ => await get())
</script>

<style scoped>
.el-menu {
	border-right: none;
}
</style>