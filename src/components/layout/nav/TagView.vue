<template>
	<router-link v-for="(v, i) in views" :key="i">
		{{ v.name }}
		<Icon Icon="Close" @click="removeTag(v)" v-if="v.title !='首页'" />
	</router-link>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

let store = useStore()
let route = useRoute()
let router = useRouter()
let views = computed(_ => store.state.tags.views)
let isActive = v => route.path == v.path
let removeTag = v => {
	store.commit('tags/delViews', v)
	isActive(v) && toLastView()
}
let toLastView = _ => {
	let v = views.value.at(-1)
	v && router.push(v.path)
}

watch(
	_ => route,
	v => store.commit('tags/addViews', { title: v.meta.name, path: v.path })
)
</script>

<style scoped>
</style>