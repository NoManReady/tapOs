<template>
	<div class="app-header clearfix">
		<div class="tm fl">
			<div class="fl" v-if="collapse">
				<i class="tapos-r"></i>
			</div>
			<div class="header-logo fl" v-else><span>Tap OS</span></div>
			<div class="tm fl separation"></div>
		</div>
		<div class="tm fr">
			<ul class="nav-group clearfix">
				<li>
					<a class="nav-item" href="javascript:;" @click="logout">
						<el-tooltip content="返回到登录页面" effect="light" placement="bottom">
							<span>
								<i class="tapos-exit mr5"></i>
								<span class="vm">注销</span>
							</span>
						</el-tooltip>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { clearAllCookie } from '@/config'
export default {
	name: 'AppHeader',
	props: {
		title: {
			type: String,
			default: '',
		},
	},
	data() {
		return {}
	},
	computed: {
		// ...mapGetters(['userName']),
		logoUrl() {
			return ''
		},
		collapse() {
			return this.$store.getters['app/collapse']
		},
	},
	methods: {
		// 注销
		logout() {
			clearAllCookie()
			window.location = window.location.origin
		},
	},
}
</script>
<style lang="scss" scoped>
@import '~@/style/var/variable';
@import '~@/style/var/mixins';
.app-header {
	padding: 0 10px;
	.separation {
		border-left: 1px solid $border-main;
		height: 34px !important;
		margin-top: 15px;
		padding-right: 18px;
	}
	a {
		color: #fff;
	}
	.header-logo {
		width: $app-aside-width;
		height: 100%;
		margin-left: -10px;
		position: relative;
		text-align: center;
		overflow: hidden;
		i {
			display: inline-block;
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			// background-size: 280% 319%;
			// background-size: auto;
			background-position: 50% 49%;
			background-size: 120%;
		}
	}
	i {
		&.tapos-r {
			height: 64px;
			line-height: 64px;
			font-size: 54px;
			margin-left: -5px;
		}
	}
	.tm {
		@include text-middle($app-header-height);
	}
	.nav-group {
		& > li {
			float: left;
			margin-left: 14px;
		}
		.nav-item {
			cursor: pointer;
			display: inline-block;
			vertical-align: middle;
			text-align: center;
			&:hover {
				color: $--border-color-lighter;
			}
			[class^='tapos-'],
			[class*=' tapos-'] {
				vertical-align: middle;
				line-height: 1;
				font-size: 24px;
				& ~ span {
					margin-left: -4px;
					display: none;
				}
			}
		}
	}
	@media screen and (min-width: 992px) {
		.nav-group {
			.nav-item {
				[class^='tapos-'],
				[class*=' tapos-'] {
					font-size: 20px;
					& ~ span {
						display: inline;
					}
				}
			}
		}
	}
	.cursor-def {
		cursor: default !important;
	}
}
</style>
