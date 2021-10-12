<template>
	<div class="app-container">
		<router-view></router-view>
	</div>
</template>
<script>
import { debounce } from '@/utils'
import { loadFromLocal } from '@/utils/localStorage'
export default {
	name: 'App',
	data() {
		return {}
	},
	mounted() {
		const resizeFn = this.debounceResize()
		window.addEventListener('resize', resizeFn, false)
		this.$on('hook:beforeDestroy', () => {
			window.removeEventListener('resize', resizeFn, false)
		})
	},
	methods: {
		debounceResize() {
			return debounce(() => {
				if (document.documentElement.clientWidth <= 768) {
					this.$store.dispatch('setCollapse', { vale: true, save: false })
				} else if (document.documentElement.clientWidth > 992) {
					this.$store.dispatch('setCollapse', {
						value: !!loadFromLocal('APP_ASIDE_CLOSE'),
						save: true,
					})
				}
			}, 300)
		},
	},
}
</script>
<style lang="scss">
@import './style/layout.scss';
.app-container {
	width: 100%;
	height: 100%;
}
</style>
