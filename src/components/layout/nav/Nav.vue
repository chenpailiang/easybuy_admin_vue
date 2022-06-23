<template>
	<nav>
		<TagView />
	</nav>
</template>

<script setup>
import TagView from './TagView'
</script>

<style scoped>
nav {
	display: flex;
	height: 2.5rem;
	background: #fff;
	-webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
</style>