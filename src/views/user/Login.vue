<template>
	<div class="main">
		<el-form :model="form" :rules="rules" ref="refForm">
			<el-form-item prop="phone">
				<el-input v-model="form.phone" :prefix-icon="Iphone" placeholder="手机号" />
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input v-model="form.pwd" :prefix-icon="Lock" placeholder="密码" />
			</el-form-item>
			<el-button type="primary" @click="login" style="width: 20rem">登录</el-button>
		</el-form>
	</div>
</template>

<script setup>
import { Iphone, Lock } from '@element-plus/icons-vue'
import { phoneCheck } from '@/utils/rule'
import { reactive, ref } from 'vue'

let form = reactive({ phone: '', pwd: '' })
let refForm = ref()
let rules = reactive({
	phone: [{ validator: phoneCheck, trigger: 'blur' }],
	pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
let login = _ => {
	refForm.value.validate(async ok => {
		if (ok) {
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