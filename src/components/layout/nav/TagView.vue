<template>
	<router-link v-for="(v, i) in views" :key="i" :to="v.path" class="tags-view-item"
		:class="isActive(v) && 'active'">
		{{ v.title }}
		<Icon Icon="Close" @click.prevent.stop="removeTag(v)" v-if="v.title !='首页'" />
	</router-link>
</template>

<script setup>
import Icon from '@/components/common/Icon'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

let store = useStore()
let route = useRoute()
let router = useRouter()
let views = computed(_ => store.state.tags.views)
let isActive = v => route.path == v.path
let toLastView = _ => {
	let v = views.value.at(-1)
	v && router.push(v.path)
}
let removeTag = v => {
	store.commit('tags/delViews', v)
	isActive(v) && toLastView()
}
watch(route, v => {
	store.commit('tags/addViews', { title: v.meta.title, path: v.path })
})

function get() {
	store.commit('tags/addViews', { title: route.meta.title, path: route.path })
}
onMounted(_ => get())
</script>

<style lang="less" scoped>
.tags-view-item {
	display: inline-block;
	position: relative;
	cursor: pointer;
	height: 26px;
	line-height: 26px;
	border: 1px solid #d8dce5;
	color: #495060;
	background: #fff;
	padding: 0 8px;
	font-size: 12px;
	margin-left: 5px;
	margin-top: 4px;
	text-decoration: none;
	&:first-of-type {
		margin-left: 15px;
	}
	&:last-of-type {
		margin-right: 15px;
	}
	&.active {
		background-color: rgba(36, 123, 255, 1);
		color: #fff;
		border-color: rgba(36, 123, 255, 1);
		&::before {
			content: '';
			background: #fff;
			display: inline-block;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			position: relative;
			margin-right: 2px;
		}
	}
}
</style>