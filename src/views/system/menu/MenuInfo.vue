<script setup>
import { ref } from 'vue'

defineProps({
	menuInfo: Object,
})

let menuForm = ref()
defineExpose({
	menuForm,
})
</script>

<template>
	<el-form :model="menuInfo" ref="menuForm" label-width="80px">
		<el-form-item v-if="menuInfo.parentMenu" label="上级菜单">
			{{ menuInfo.parentMenu }}
		</el-form-item>
		<el-form-item label="菜单名称">
			<el-input v-model="menuInfo.name" placeholder="请输入名称" />
		</el-form-item>
		<el-form-item label="编码">
			<el-input v-model="menuInfo.symbol" placeholder="请输入编码" />
		</el-form-item>
		<el-form-item label="图标">
			<el-input v-model="menuInfo.icon" placeholder="请输入图标" />
		</el-form-item>
		<el-form-item label="排序">
			<el-input v-model="menuInfo.sort" placeholder="请输入排序" />
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