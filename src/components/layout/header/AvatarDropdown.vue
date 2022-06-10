<template>
	<div class="info">
		<el-avatar :size="25"
			src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
		<el-dropdown>
			<span class="el-dropdown-link">个人中心</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>
						<el-icon>
							<User />
						</el-icon>修改密码
					</el-dropdown-item>
					<el-dropdown-item @click="loginOut">
						<el-icon>
							<Promotion />
						</el-icon>退出
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup>
import { User, Promotion } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
let store = useStore()
let router = useRouter()
let loginOut = _ => {
	store.dispatch('user/LoginOut')
	router.push('/user/login')
}
</script>

<style scoped>
.info {
	display: flex;
	align-items: center;
	gap: 0 0.5rem;
}
.el-dropdown-link {
	cursor: pointer;
	color: var(---el-text-color-primary);
	display: flex;
	align-items: center;
}
</style>