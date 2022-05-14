<template>
	<div class="user-layout-wrapper">
		<div class="container">
			<div class="user-layout-content">
				<div class="header">
					<img src="@/assets/logo.svg" class="logo" alt="logo">
					<span class="title">容易购后台管理系统</span>
				</div>
				<router-view />
				<div class="footer">
					<div class="links">
						<a>帮助</a>
						<a>隐私</a>
						<a>条款</a>
					</div>
					<div class="copyright">
						Copyright &copy; 2022 容易购平台
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.user-layout-wrapper {
	width: 100vw;
	height: 100vh;
}
.container {
	width: 100%;
	min-height: 100%;
	background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
	background-size: 100%;
	position: relative;
}
.user-layout-content {
	padding: 5rem 0 1.5rem;
}
.header {
	text-align: center;
    margin-bottom: 2rem;
}
.logo {
	height: 44px;
	vertical-align: top;
	margin-right: 16px;
	border-style: none;
}
.title {
	font-size: 33px;
	color: rgba(0, 0, 0, 0.85);
	font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
	font-weight: 600;
	position: relative;
	top: 2px;
}

.footer {
	// position: absolute;
	width: 100%;
	bottom: 0;
	padding: 0 16px;
	margin: 48px 0 24px;
	text-align: center;

	.links {
		margin-bottom: 8px;
		font-size: 14px;
		a {
			color: rgba(0, 0, 0, 0.45);
			transition: all 0.3s;
			&:not(:last-child) {
				margin-right: 40px;
			}
		}
	}
	.copyright {
		color: rgba(0, 0, 0, 0.45);
		font-size: 14px;
	}
}
</style>