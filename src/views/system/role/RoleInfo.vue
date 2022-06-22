<script setup>
import { ref } from 'vue'

defineProps({
	roleInfo: Object,
})

let roleForm = ref()

defineExpose({
    roleForm
})
</script>

<template>
	<el-form :model="roleInfo" ref="roleForm" label-width="80px">
		<el-form-item label="角色名称">
			<el-input v-model="roleInfo.name" placeholder="请输入用户名称" />
		</el-form-item>
		<el-form-item label="状态">
			<el-select v-model="roleInfo.state" placeholder="请选择状态" />
		</el-form-item>
		<el-form-item label="备注">
			<el-input v-model="roleInfo.remark" autosize type="textarea" placeholder="请输入备注" />
		</el-form-item>
	</el-form>
</template>

<style scoped>
</style>