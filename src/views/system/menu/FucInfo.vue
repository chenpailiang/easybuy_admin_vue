<template>
	<el-form :model="menuInfo" label-width="80px">
		<el-form-item label="菜单名称">
			{{'系统管理'}}
		</el-form-item>
		<el-form-item label="功能名称">
			<el-input v-model="fucInfo.name" placeholder="请输入名称" />
		</el-form-item>
		<el-form-item label="编码">
			<el-input v-model="fucInfo.code" placeholder="请输入编码" />
		</el-form-item>
		<el-form-item label="权限值">
			<el-input v-model="fucInfo.sort" placeholder="请输入权限值" />
		</el-form-item>
		<el-form-item label="说明">
			<el-input v-model="fucInfo.info" placeholder="请输入说明" />
		</el-form-item>
	</el-form>
</template>

<script setup>
defineProps({
	fucInfo: Object,
})
</script>

<style scoped>
.el-form {
	display: grid;
	grid: auto / 20rem;
	justify-content: center;
}
</style>