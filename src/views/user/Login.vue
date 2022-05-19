<template>
	<div class="main">
		<el-form :model="form" :rules="rules" ref="refForm">
			<el-form-item prop="account">
				<el-input v-model="form.account" :prefix-icon="User" placeholder="用户名" />
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input v-model="form.pwd" :prefix-icon="Lock" placeholder="密码" />
			</el-form-item>
			<el-button type="primary" @click="login" style="width: 20rem">登录</el-button>
		</el-form>
	</div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

let form = reactive({ account: '', pwd: '' })
let refForm = ref()
let rules = reactive({
	account: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
	pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
let store = useStore()
let login = _ => {
	refForm.value.validate(async ok => {
		if (ok) {
			let res = await store.dispatch('user/Login',form)
			console.log(res)
		} else return
	})
}
</script>

<style scoped>
.el-form {
	width: 20rem;
	margin: 0 auto;
}
</style>