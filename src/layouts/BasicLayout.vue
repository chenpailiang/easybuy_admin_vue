<template>
	<article class="screen">
		<aside>
			<Aside />
		</aside>
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
import Header from '@/components/layout/header/Header'
import Aside from '@/components/layout/aside/Aside'
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
	width: 18.26rem;
	min-width: 18.26rem;
	z-index: 10;
	background: #001529;
	min-height: 100vh;
    -webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
main {
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	height: 100%;
}
.content {
	box-sizing: border-box;
	flex: 1 1 0%;
	overflow: hidden;
	padding: 0 1.25rem;
	background-color: rgb(249 250 251);
}
</style>