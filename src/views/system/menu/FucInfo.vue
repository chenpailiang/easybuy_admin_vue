<script setup>
import { ref } from 'vue'
defineProps({
	fucInfo: Object,
})

let fucForm = ref()
defineExpose({
	fucForm
})
</script>

<template>
	<el-form :model="fucInfo" ref="fucForm" label-width="80px">
		<el-form-item label="菜单名称">
			{{ fucInfo.menuName }}
		</el-form-item>
		<el-form-item label="功能名称">
			<el-input v-model="fucInfo.name" placeholder="请输入名称" />
		</el-form-item>
		<el-form-item label="编码">
			<el-input v-model="fucInfo.symbol" placeholder="请输入编码" />
		</el-form-item>
		<el-form-item label="权限值">
			<el-input v-model="fucInfo.sort" placeholder="请输入权限值" />
		</el-form-item>
		<el-form-item label="说明">
			<el-input v-model="fucInfo.info" placeholder="请输入说明" />
		</el-form-item>
	</el-form>
</template>

<style scoped>
.el-form {
	display: grid;
	grid: auto / 25rem;
	justify-content: center;
}
</style>