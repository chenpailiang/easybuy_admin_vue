<template>
	<div>
		<h2>菜单管理</h2>

		<section>
			<span>菜单名称：</span>
			<el-input placeholder="请输入菜单名称" />
			<el-button type="primary">查询</el-button>
		</section>

		<div class="op">
			<el-button type="primary">新增模块</el-button>
			<Icon Icon="Refresh" :size="20" color="#409eff" @click="refresh" style="cursor: pointer;" />
		</div>

		<el-table :data="menus" row-key="id" :header-cell-style="{ background: '#f5f7fa', color:'#000000' }"
			border>
			<el-table-column prop="title" label="菜单" />
			<el-table-column prop="name" label="菜单编码" />
			<el-table-column prop="icon" label="图标" />
			<el-table-column prop="address" label="功能项" width="250" />
			<el-table-column label="操作" align="center" width="250">
				<template #default>
					<el-button type="primary" text size="small">+子菜单</el-button>
					<el-button type="primary" text size="small">+功能</el-button>
					<el-button type="primary" text size="small">编辑</el-button>
					<el-button type="danger" text size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script setup>
import Icon from '@/components/common/Icon'

const menus = [
	{
		id: 1,
		title: '系统管理',
		name: 'system',
		icon: 'Setting',
		children: [
			{ id: 3, title: '菜单管理', name: 'menu' },
			{ id: 4, title: '用户管理', name: 'user' },
		],
	},
	{
		id: 2,
		title: '商品管理',
		name: 'goods',
		icon: 'Menu',
	},
]

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