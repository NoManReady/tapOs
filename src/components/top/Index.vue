<template>
	<div :class="classes" :style="styles" @click="_onBack">
		<slot>
			<i class="el-icon-upload2 fs20" title="返回顶部"></i>
		</slot>
	</div>
</template>
<script>
import { scrollTop } from '@/utils/tool'
const prefixCls = 'top'
export default {
	name: 'CommonTop',
	props: {
		height: {
			type: Number,
			default: 300,
		},
		bottom: {
			type: Number,
			default: 1.5,
		},
		right: {
			type: Number,
			default: 1.5,
		},
		duration: {
			type: Number,
			default: 1000,
		},
		container: {
			type: String,
			default: '.app-content',
		},
	},
	data() {
		return {
			backTop: false,
			target: null,
		}
	},
	mounted() {
		this.target = document.querySelector(this.container)
		this.target.addEventListener('scroll', this.handleScroll, false)
	},
	beforeDestroy() {
		this.target.removeEventListener('scroll', this.handleScroll, false)
	},
	computed: {
		classes() {
			return [
				`${prefixCls}`,
				{
					[`${prefixCls}-show`]: this.backTop,
				},
			]
		},
		styles() {
			return {
				bottom: `${this.bottom}em`,
				right: `${this.right}em`,
			}
		},
	},
	methods: {
		handleScroll() {
			this.backTop = this.target.scrollTop >= this.height
		},
		_onBack() {
			let _sTop = this.target.scrollTop
			scrollTop(this.target, _sTop, 0, this.duration, (d) => {
				this.$emit('on-scroll', d)
			}).then(() => {
				this.$emit('scroll-complete')
			})
			this.$emit('scroll-click')
		},
	},
}
</script>
<style lang="scss" scoped>
@import '~@/style/var/variable';
.top {
	position: fixed;
	background: $theme;
	color: #fff;
	text-align: center;
	cursor: pointer;
	border-radius: 50%;
	width: 3em;
	height: 3em;
	line-height: 3em;
	justify-content: center;
	align-items: center;
	display: none;
	z-index: 999;
	opacity: 0.7;
	transform: scale(0.9);
	transition: all 0.2s ease-in-out;
	&:hover {
		box-shadow: 0 0 4px $theme;
		opacity: 1;
		transform: scale(1);
	}
	&-show {
		display: block;
	}
}
</style>
