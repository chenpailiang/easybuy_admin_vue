<template>
	<article class="screen">
		<aside>1</aside>
		<main>
			<Header />
			<div class="content">
				<el-scrollbar>
					<suspense>
						<router-view />
					</suspense>
				</el-scrollbar>
			</div>
		</main>
	</article>
</template>

<script setup>
import Header from '@/components/layout/header/Header.vue'
</script>

<style scoped>
.screen {
	display: flex;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	align-items: stretch;
}
aside {
	width: 15.5rem;
	min-width: 15.5rem;
	background-color: rgb(249 250 251);
}
main {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
}
.content {
	box-sizing: border-box;
	flex: 1 1 0%;
	overflow: hidden;
	padding-left: 1.25rem;
}
</style>