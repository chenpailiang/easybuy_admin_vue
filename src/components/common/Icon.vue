<template>
	<el-icon :size="size" :color="color">
		<component :is="Icon" ></component>
	</el-icon>
</template>

<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

let props = defineProps({ Icon: String, size:Number, color: String })
let Icon
for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
	if (props.Icon == key) Icon = component
}
</script>

<style scoped>
</style>