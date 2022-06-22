<script setup>
import Icon from '@/components/common/Icon'
import MenuInfo from './menu/MenuInfo'
import FucInfo from './menu/FucInfo'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { listToTree } from '@/utils/util'
import { getMenuList, addMenu, editMenu, delMenu } from '@/api/menu'

// 菜单按钮
let menuList = ref([])
let funcs = ref()

// 查询菜单
let menuName = ref('')
let loading = ref(false)
let searchMenu = async _ => {
	menuList.value = []
	loading.value = true
	let { menus: v1, funcs: v2 } = await getMenuList(menuName.value)
	loading.value = false
	if (menuName.value) menuList.value = v1
	else listToTree(v1, menuList.value, 0)
	funcs.value = v2
}

// 菜单模块的新增编辑
let menuInfo = ref({})
let menuDialog = ref(false)
let title = ref('')
let show = (name, v, hasChildren) => {
	menuDialog.value = true
	title.value = name
	if (!hasChildren && v) menuInfo.value = JSON.parse(JSON.stringify(v))
	else {
		menuInfo.value.parentMenu = v?.name ? v.name : ''
		menuInfo.value.parentId = v?.id ? v.id : 0
	}
}
let menuClose = _ => {
	menuDialog.value = false
	menuInfo.value = {}
}
let sendMenu = async _ => {
	try {
		menuInfo.value.id ? await editMenu(menuInfo.value) : await addMenu(menuInfo.value)
		ElMessage({ message: '操作成功', type: 'success' })
		menuClose()
		searchMenu()
	} catch {
		ElMessage({ message: '操作失败', type: 'error' })
	}
}
let deleteMenu = async v => {
	try {
		await delMenu(v.id)
		searchMenu()
		ElMessage({ message: '删除成功', type: 'success' })
	} catch {
		ElMessage({ message: '删除失败', type: 'error' })
	}
}

// 功能新增编辑
let fucInfo = ref({})
let fucDialog = ref(false)
let showFuc = _ => (fucDialog.value = true)
let funcClose = _ => {
	fucInfo.value = {}
	fucDialog.value = false
}
let sendFunc = _ => {
	fucDialog.value = false
}

// 权限操作
let store = useStore()
let fucs = computed(_ => store.getters['user/permissions'].funcs)
let showCheck = (menuId, btnId, expand = null) =>
	!!fucs.value.find(v => v.menuId == menuId && v.symbol == btnId) && !!expand

let refresh = _ => location.reload()
</script>

<template>
	<h2>菜单管理</h2>

	<section v-if="showCheck($route.meta.menuId, 'Search', $route.meta.isPage)">
		<span>菜单名称：</span>
		<el-input v-model="menuName" placeholder="请输入菜单名称" />
		<el-button type="primary" @click="searchMenu">查询</el-button>
	</section>

	<div v-if="menuList.length > 0">
		<div class="op">
			<el-button type="primary" @click="show('新增模块')">新增模块</el-button>
			<Icon Icon="Refresh" :size="20" color="#409eff" @click="refresh" style="cursor: pointer;" />
		</div>

		<el-table :data="menuList" v-loading="loading" row-key="id"
			:header-cell-style="{ background: '#f5f7fa', color: '#000000' }" border>
			<el-table-column prop="name" label="菜单名称" />
			<el-table-column prop="symbol" label="菜单编码" width="200" />
			<el-table-column prop="icon" label="图标" width="200" />
			<el-table-column label="功能项">
				<template #default="{ row: v }">
					<el-button v-for="(k, i) in funcs.filter(s => s.menuId == v.id)" :key="i">{{ k.name }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template #default="{ row: v }">
					<el-button type="primary" text size="small" @click="show('+子菜单', v, 1)">+子菜单
					</el-button>
					<el-button type="primary" text size="small" @click="showFuc">+功能</el-button>
					<el-button type="primary" text size="small" @click="show('编辑菜单', v)">编辑</el-button>
					<el-popconfirm title="确定删除该菜单?" confirmButtonText="是" cancelButtonText="否"
						@confirm="deleteMenu(v)">
						<template #reference>
							<el-button type="danger" text size="small">删除
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<el-empty v-else description="暂无数据" />

	<el-dialog v-model="menuDialog" :title="title" width="25%" @close="menuClose">
		<MenuInfo :menuInfo="menuInfo" />
		<template #footer>
			<el-button @click="menuClose">取消</el-button>
			<el-button type="primary" @click="sendMenu">确定</el-button>
		</template>
	</el-dialog>

	<el-dialog v-model="fucDialog" title="功能项" width="25%" @close="funcClose">
		<FucInfo :fucInfo="fucInfo" />
		<template #footer>
			<el-button @click="funcClose">取消</el-button>
			<el-button type="primary" @click="sendFunc">确定</el-button>
		</template>
	</el-dialog>
</template>

<style scoped>
section {
	display: grid;
	grid: auto / 5rem 15rem 5rem;
	align-items: center;
	gap: 0 1rem;
	margin-bottom: 1rem;
}
.op {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}
</style>