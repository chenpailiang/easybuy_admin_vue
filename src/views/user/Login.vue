<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { timeFix } from '@/utils/util'

let form = reactive({ account: '', pwd: '' })
let loading = ref(false)
let refForm = ref()
let rules = reactive({
	account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
let store = useStore()
let router = useRouter()
let login = _ => {
	refForm.value.validate(async ok => {
		if (ok) {
			loading.value = true
			let res = await store.dispatch('user/Login', form)
			if (res.success) {
				loading.value = false
				router.push('/')
				setTimeout(_ => {
					ElNotification({
						title: '欢迎',
						message: `${timeFix()}，欢迎回来`,
						type: 'success',
					})
				})
			} else {
				loading.value = false
				ElNotification({ message: res.error, type: 'error' })
			}
		}
	})
}
</script>

<template>
	<div class="main">
		<el-form :model="form" :rules="rules" ref="refForm">
			<el-form-item prop="account">
				<el-input v-model="form.account" :prefix-icon="User" placeholder="用户名" />
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input v-model="form.pwd" :prefix-icon="Lock" placeholder="密码" type="password"
					show-password />
			</el-form-item>
			<el-button type="primary" @click="login" :loading="loading" style="width: 20rem">登录</el-button>
		</el-form>
	</div>
</template>

<style scoped>
.el-form {
	width: 20rem;
	margin: 0 auto;
}
</style>