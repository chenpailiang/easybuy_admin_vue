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

	</div>
</template>

<script setup>
</script>

<style scoped>
section{
  display: grid;
  grid: auto/ repeat(3, 5rem 10rem) 5rem;
  align-items: center;
  gap: 0 1rem;
}
</style>