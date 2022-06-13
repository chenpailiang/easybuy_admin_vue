<template>
	<div>
		<h2>用户管理</h2>

		<section>
			<span>角色名称：</span>
			<el-input placeholder="请输入角色名称" />
			<span>用户名称：</span>
			<el-input placeholder="请输入用户名称" />
			<span>状态：</span>
			<el-select placeholder="请选择状态" />
			<el-button type="primary">查询</el-button>
		</section>

		<div class="op">
			<el-button type="primary">新增模块</el-button>
			<Icon Icon="Refresh" :size="20" color="#409eff" @click="refresh" style="cursor: pointer;" />
		</div>

		<el-table :data="users" row-key="id"
			:header-cell-style="{ background: '#f5f7fa', color: '#000000' }" border>
			<el-table-column prop="name" label="一级分类" />
			<el-table-column prop="symbol" label="二级分类" />
			<el-table-column prop="icon" label="角色名称" />
			<el-table-column prop="path" label="状态" />
			<el-table-column prop="funcs" label="创建人" />
			<el-table-column prop="funcs" label="创建时间" />
			<el-table-column prop="funcs" label="操作人" />
			<el-table-column prop="funcs" label="操作时间" />
			<el-table-column label="操作" align="center">
				<template #default>
					<el-button type="primary" text size="small">停用</el-button>
					<el-button type="primary" text size="small">修改</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { ref } from 'vue'

let users = []

let refresh = _ => location.reload()
</script>

<style scoped>
section {
	display: grid;
	grid: auto/ repeat(3, 5rem 10rem) 5rem;
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