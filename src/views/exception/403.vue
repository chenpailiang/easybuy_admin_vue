<script setup>
import { useRouter } from 'vue-router'

let router = useRouter()
let back = _ => router.go(-1)
</script>

<template>
	<el-result icon="warning" title="403" sub-title="sorry,无权限访问">
		<template #extra>
			<el-button type="primary" @click="back">Back</el-button>
		</template>
	</el-result>
</template>


<style scoped>
</style>