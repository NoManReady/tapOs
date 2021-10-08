<template>
	<div @keyup.enter="_onAccountLogin" class="login-container">
		<div class="login-wrap animated bounceInDown">
			<div class="login-left hidden-sm-and-down">
				<!-- <img :src="imgUrl" alt class="img" /> -->
			</div>
			<div class="login-border">
				<div class="title">Tap登录</div>
				<div class="login-main">
					<el-form
						:model="loginForm"
						:rules="loginRules"
						class="login-form"
						label-position="top"
						label-width="0"
						ref="loginForm"
						status-icon
					>
						<el-form-item class="mt20" prop="userCode">
							<el-input
								@change="loginForm.userCode = loginForm.userCode.trim()"
								@keyup.enter.native="_onAccountLogin"
								auto-complete="off"
								placeholder="请输入用户名"
								v-model="loginForm.userCode"
							>
								<i class="isaas-leader-line" slot="prefix"></i>
							</el-input>
						</el-form-item>
						<el-form-item prop="passwd">
							<el-input
								@keyup.enter.native="_onAccountLogin"
								auto-complete="off"
								placeholder="请输入密码"
								v-model="loginForm.passwd"
							>
								<i class="isaas-lock" slot="prefix"></i>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button
								@click.native.prevent="_onAccountLogin"
								class="login-submit"
								type="primary"
								>登录</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { setAccessToken, clearAllCookie } from '@/config'
import { login } from '@/api/modules/login'
import Cookie from 'cookies-js'
export default {
	name: 'Login',
	data() {
		return {
			loginForm: {
				userCode: '',
				passwd: '',
			},
			loginRules: {
				userCode: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
			},
		}
	},
	methods: {
		// 登录action
		_onAccountLogin() {
			this.$refs.loginForm.validate(async (valid) => {
				if (valid) {
					try {
						const _result = await login(this.loginForm)
						clearAllCookie()
						setAccessToken(_result)
						this.$router.push({
							name: 'Admin',
						})
					} catch (error) {}
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	height: 100%;
	overflow: auto;
	margin: 0 auto;
	background: #edf1f3;
	animation: animate-cloud 20s linear infinite;
}

.login-wrap {
	display: flex;
	margin: -5% auto 0;
	box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
}

.login-left,
.login-border {
	position: relative;
	height: 420px;
}

.login-left {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	justify-content: center;
	flex-direction: column;
	background-color: $--color-primary;
	color: #fff;
	float: left;
	width: 300px;
	position: relative;
}

.login-left .img {
	width: 100%;
	height: 100%;
}

.login-border .title {
	text-align: center;
	color: $--color-primary;
	font-weight: 600;
	letter-spacing: 2px;
	font-size: 26px;
	padding: 45px 0;
}

.login-border {
	border-left: none;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	color: #fff;
	background-color: #fff;
	width: 450px;
}

.login-main {
	margin: 0 auto;
	width: 65%;
}

.login-submit {
	width: 100%;
	font-size: 16px;
	letter-spacing: 2px;
	padding: 0;
	font-weight: 300;
	cursor: pointer;
	margin-top: 30px;
	height: 40px;
	line-height: 40px;
	transition: 0.25s;
}

.login-form {
	i {
		color: #333;
	}

	.el-form-item__content {
		width: 100%;
	}

	.el-input {
		input {
			padding-bottom: 10px;
			text-indent: 5px;
			background: transparent;
			border: none;
			border-radius: 0;
			color: #333;
			border-bottom: 1px solid rgb(235, 237, 242);
		}

		.el-input__prefix {
			i {
				padding: 0 5px;
				font-size: 16px !important;
			}
		}
	}
}
// 工具按钮容器
.login-tool {
	text-align: right;
	margin-top: -20px;
}
</style>


