<script setup>
import {ref} from 'vue'

defineProps({
	userInfo: Object,
})

let userForm = ref()

defineExpose({
    userForm
})
</script>

<template>
	<el-form :model="userInfo" ref="userForm" label-width="80px">
		<el-form-item label="账号">
			<el-input v-model="userInfo.account" placeholder="请输入账号" />
		</el-form-item>
		<el-form-item label="用户名称">
			<el-input v-model="userInfo.name" placeholder="请输入用户名称" />
		</el-form-item>
		<el-form-item label="状态">
			<el-select v-model="userInfo.state" placeholder="请选择状态" />
		</el-form-item>
		<el-form-item label="备注">
			<el-input v-model="userInfo.remark" autosize type="textarea" placeholder="请输入备注" />
		</el-form-item>
	</el-form>
</template>

<style scoped>
</style>