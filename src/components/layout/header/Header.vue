<template>
	<header>
		<AvatarDropdown />
	</header>
</template>

<script setup>
import { RefreshRight } from '@element-plus/icons-vue'
import AvatarDropdown from './AvatarDropdown'
</script>

<style scoped>
header {
	display: flex;
	height: 3.5rem;
	align-items: center;
	justify-content: flex-end;
	background: #fff;
	-webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
</style>