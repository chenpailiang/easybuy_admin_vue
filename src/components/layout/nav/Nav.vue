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
	-webkit-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}
</style>