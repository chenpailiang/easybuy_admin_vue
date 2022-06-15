<template>
	<div>
		<h2>菜单管理</h2>

		<section>
			<span>菜单名称：</span>
			<el-input v-model="menuName" placeholder="请输入菜单名称" />
			<el-button type="primary" @click="searchMenu">查询</el-button>
		</section>

		<div class="op">
			<el-button type="primary" @click="show('新增模块')">新增模块</el-button>
			<Icon Icon="Refresh" :size="20" color="#409eff" @click="refresh" style="cursor: pointer;" />
		</div>

		<el-table v-if="menuList.length > 0" :data="menuList" row-key="id"
			:header-cell-style="{ background: '#f5f7fa', color: '#000000' }" border>
			<el-table-column prop="name" label="菜单名称" />
			<el-table-column prop="symbol" label="菜单编码" width="200" />
			<el-table-column prop="icon" label="图标" width="200" />
			<el-table-column prop="path" label="页面地址" />
			<el-table-column prop="funcs" label="功能项" />
			<el-table-column label="操作" align="center">
				<template #default="{ row: v }">
					<el-button v-if="v" type="primary" text size="small" @click="show('+子菜单')">+子菜单
					</el-button>
					<el-button type="primary" text size="small" @click="showFuc">+功能</el-button>
					<el-button type="primary" text size="small" @click="show('编辑菜单')">编辑</el-button>
					<el-button type="danger" text size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-empty v-else description="暂无数据" />

		<el-dialog v-model="menuDialog" :title="title" width="25%" @close="close">
			<MenuInfo :menuInfo="menuInfo" />
			<template #footer>
				<el-button @click="close">取消</el-button>
				<el-button type="primary" @click="sendOk">确定</el-button>
			</template>
		</el-dialog>

		<el-dialog v-model="fucDialog" title="功能项" width="25%">
			<FucInfo :fucInfo="fucInfo" />
			<template #footer>
				<el-button @click="fucDialog = false">取消</el-button>
				<el-button type="primary" @click="send">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import MenuInfo from './menu/MenuInfo'
import FucInfo from './menu/FucInfo'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMenuList } from '@/api/menu'
import { listToTree } from '@/utils/util'

// 菜单按钮
let menuList = ref([])
let funcs = ref()

// 查询菜单
let menuName = ref('')
let searchMenu = async _ => {
	menuList.value = []
	let { menus: s, funcs: v } = await getMenuList(menuName.value)
	if (menuName.value) menuList.value = s
	else listToTree(s, menuList.value, 0)
	funcs.value = v
	console.log('menu', menuList.value)
	console.log(funcs.value)
}

// 菜单模块的新增编辑
let menuInfo = ref({})
let menuDialog = ref(false)
let title = ref('')
let show = v => {
	menuDialog.value = true
	title.value = v
}
let close = _ => {
	menuInfo.value = {}
	menuDialog.value = false
}
let sendOk = _ => {
	menuDialog.value = false
}

// 功能新增编辑
let fucInfo = ref({})
let fucDialog = ref(false)
let showFuc = _ => (fucDialog.value = true)
let send = _ => {
	fucDialog.value = false
}

// 权限操作
let route = useRoute()
let showCheck = (menuId, btnId, expand = null) =>
	!!funcs.find(v => v.menuId == menuId && v.symbol == btnId) && !!expand

let refresh = _ => location.reload()
</script>

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