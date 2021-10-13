<template>
	<div class="admin">
		<app-header @select-item="selectItem"></app-header>
		<div class="app-main">
			<app-aside :menus="menus" :p-path="pPath" @select-item="selectItem"></app-aside>
			<div :style="contentStyl" class="app-content">
				<router-view :key="`${routerId}`"></router-view>
			</div>
			<common-top />
		</div>
	</div>
</template>
<script>
import { AppAside, AppHeader } from '@/layout'
import Top from '@/components/top/Index'
import { flatMenus } from '@/utils/menus'
export default {
	name: 'Admin',
	data() {
		return {
			routerId: Math.random(),
		}
	},
	components: {
		AppAside,
		AppHeader,
		[Top.name]: Top,
	},
	computed: {
		// 内容模块style
		contentStyl() {
			return this.$store.getters['app/collapse'] ? { left: '64px' } : { left: '180px' }
		},
		pPath() {
			return ['admin']
		},
		menus() {
			return this.$store.getters.adminMenus
		},
		flatMenus() {
			return flatMenus(this.menus, {}, this.pPath)
		},
	},
	methods: {
		// 菜单栏触发事件
		selectItem(menu) {
			let _routeName = `${menu.fullPath.join('/')}`
			if (_routeName === this.$route.name) {
				let _compName = this.pPath[this.pPath.length - 1]
				_compName = _compName.replace(/(\w)(\w+)/, (all, a, b) => `${a.toUpperCase()}${b}`)
				let _vm = this.getComponentByName(this.$parent, _compName) || this
				_vm.routerId = Math.random()
				_vm.$route.query.tab && (_vm.$route.query.tab = '0')
			} else {
				this.$router.push({
					name: _routeName,
					query: menu.query || {},
				})
			}
		},
		getComponentByName(parent, name) {
			for (let _child of parent.$children) {
				let _name = _child.$options.name
				if (_name === name) {
					return _child
				} else {
					let _comp = this.getComponentByName(_child, name)
					if (_comp) {
						return _comp
					}
				}
			}
			return null
		},
	},
}
</script>
<style lang="scss" scoped>
.admin {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}
</style>
