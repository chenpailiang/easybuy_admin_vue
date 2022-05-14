<template>
	<div class="main">
		<el-form>
			<el-tabs v-model="mode">
				<el-tab-pane label="密码登录" name="pwd">
					<el-form-item>
						<el-input :prefix-icon="Iphone" placeholder="手机号" />
					</el-form-item>
					<el-form-item>
						<el-input :prefix-icon="Lock" placeholder="密码" />
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="短信登录" name="code">
					<el-form-item>
						<el-input :prefix-icon="Iphone" placeholder="手机号" />
					</el-form-item>
					<el-form-item>
						<el-input :prefix-icon="Message" placeholder="验证码" />
					</el-form-item>
				</el-tab-pane>
			</el-tabs>
		</el-form>
	</div>
</template>

<script setup>
import { Iphone, Lock, Message } from '@element-plus/icons-vue'
import { ref } from 'vue'

let mode = ref('pwd')
</script>

<style scoped>
.el-form {
	width: 20rem;
	margin: 0 auto;
}
</style>