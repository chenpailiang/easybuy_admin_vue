<template>
	<suspense>
		<router-view v-slot="{Component}">
			<component :is="Component" />
		</router-view>
	</suspense>
</template>

<script setup>
</script>

<style scoped>
</style>