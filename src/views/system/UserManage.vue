<script setup>
import UserInfo from './user/UserInfo'
import UserColumn from './common/UserColumn'
import Icon from '@/components/common/Icon'
import { ref } from 'vue'

let users = ref([])

// 新增编辑用户
let userInfo = ref({})
let userDialog = ref(false)
let isAdd = ref(false)
let showEdit = v => {
	isAdd.value = false
	userDialog.value = true
	userInfo.value = JSON.parse(JSON.stringify(v))
}
let sendUser = _ => {}

let refresh = _ => location.reload()
</script>

<template>
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
		<el-button type="primary" @click="userDialog = true;isAdd = true">新增模块</el-button>
		<Icon Icon="Refresh" :size="20" color="#409eff" @click="refresh" style="cursor: pointer;" />
	</div>

	<el-table :data="users" row-key="id" :header-cell-style="{ background: '#f5f7fa', color: '#000000' }"
		border>
		<el-table-column prop="name" label="一级分类" />
		<el-table-column prop="symbol" label="二级分类" />
		<UserColumn />
		<el-table-column label="操作" align="center">
			<template #default="{ row: v }">
				<el-button type="danger" text size="small">停用</el-button>
				<el-button type="primary" text size="small">启用</el-button>
				<el-button type="primary" text size="small" @click="showEdit(v)">修改</el-button>
			</template>
		</el-table-column>
	</el-table>

	<el-dialog v-model="userDialog" :title="isAdd ? '新增用户' : '编辑用户'" width="25%">
		<UserInfo :userInfo="userInfo" />
		<template #footer>
			<el-button @click="userDialog = false">取消</el-button>
			<el-button type="primary" @click="sendUser">确定</el-button>
		</template>
	</el-dialog>
</template>

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