<script>
import { Menu, Submenu, MenuItem } from 'element-ui'
export default {
	name: 'AppAside',
	props: {
		menus: {
			default: [],
			type: Array,
		},
		mode: {
			default: 'vertical',
			type: String,
		},
		pPath: {
			default: () => [],
			type: Array,
		},
		trigger: {
			type: String,
			default: 'hover',
		},
	},
	data() {
		return {
			defaultActive: '',
			defaultOpeneds: [],
			unique: true,
		}
	},
	components: {
		[Menu.name]: Menu,
		[MenuItem.name]: MenuItem,
		[Submenu.name]: Submenu,
	},
	watch: {
		$route: {
			handler: '_setNavStatus',
			immediate: true,
		},
	},
	computed: {
		collapse() {
			return this.$store.getters.collapse
		},
		isVertical() {
			return this.mode === 'vertical'
		},
	},
	methods: {
		// 设置菜单状态
		_setNavStatus() {
			let _openeds = []
			let _curRouteName = 'Err404'
			let _matcheds = this.$route.matched || []
			for (let i = 0; i < _matcheds.length; i++) {
				let _routeOption = _matcheds[i]
				if (i === _matcheds.length - 1) {
					_openeds.push(..._routeOption.name.split('/'))
				}
				if (i === this.pPath.length) {
					_curRouteName = _routeOption.name
					break
				}
			}
			this.defaultActive = _curRouteName
			let _tempOpends = []
			_openeds.reduce((collect, path) => {
				let _prev = collect[collect.length - 1]
				let _p = _prev ? `${_prev}/${path}` : path
				collect.push(_p)
				return collect
			}, _tempOpends)
			this.defaultOpeneds = _tempOpends
		},
		// 生成菜单
		_generator(menus = []) {
			if (!(menus instanceof Array)) {
				menus = menus.children || []
			}
			let _filterMenu = menus.filter((menu) => !menu.hidden)
			return _filterMenu.map((menu, index) => {
				let _lab = menu.label
				let _iconCls = menu.icon + ' ' + (this.collapse ? 'fs26' : '')
				let _iconJsx = this.isVertical ? <i class={_iconCls} /> : null
				let _routeName = menu.fullPath.join('/')
				if (menu.children && menu.children.length && menu.showChilds) {
					return (
						<el-submenu index={_routeName}>
							<template slot="title">
								{_iconJsx}
								<span title={_lab}>{_lab}</span>
							</template>
							{this._generator(menu.children)}
						</el-submenu>
					)
				} else {
					return (
						<el-menu-item
							index={_routeName}
							onClick={this.onItemClick.bind(this, menu)}
						>
							{_iconJsx}
							<span slot="title" title={_lab}>
								{_lab}
							</span>
						</el-menu-item>
					)
				}
			})
		},
		// 菜单点击事件
		onItemClick(menu) {
			this.$emit('select-item', menu)
		},
		// 菜单选中事件（el带）
		selectItem(data) {
			// this.$emit('select-item', data)
		},
		// 菜单打开
		menuOpen(data) {
			this.$emit('menu-open', data)
		},
		// 菜单关闭
		menuClose(data) {
			this.$emit('menu-close', data)
		},
		// 菜单栏收起/展开
		onCollapse() {
			this.$store.dispatch('setCollapse', {
				value: !this.collapse,
				save: true,
			})
		},
	},
	render(h) {
		const _vm = this
		const _menus = this._generator(this.menus)
		const _props = {
			props: {
				'default-active': this.defaultActive,
				'default-openeds': this.isVertical ? this.defaultOpeneds : [],
				'unique-opened': this.unique,
				'menu-trigger': this.trigger,
				// 'active-text-color': '#0166FF',
				collapse: this.isVertical ? this.collapse : false,
				mode: this.mode,
			},
			class: {
				'aside-menu': this.isVertical,
			},
			on: {
				select(index, indexPath) {
					_vm.selectItem({ index, indexPath })
				},
				open(index, indexPath) {
					_vm.menuOpen({ index, indexPath })
				},
				close(index, indexPath) {
					_vm.menuClose({ index, indexPath })
				},
			},
		}
		let _asideStyl = null
		let _containerClass = [this.mode]
		if (this.mode === 'vertical') {
			_containerClass.push('app-aside')
			_asideStyl = { 'overflow-x': 'hidden' }
		} else {
			_containerClass.push('device-aside')
		}

		let _toggleJsx = null
		if (this.isVertical) {
			_toggleJsx = <i class="el-icon-d-arrow-right"></i>
			if (!this.collapse) {
				_toggleJsx = <i class="el-icon-d-arrow-left">收起</i>
			}
		}
		return (
			<div class={_containerClass.join(' ')} style={_asideStyl}>
				<el-menu {..._props}>{_menus}</el-menu>
				<div class="menu-toggle pointer" onClick={this.onCollapse}>
					{_toggleJsx}
				</div>
			</div>
		)
	},
}
</script>
<style lang="css" scoped>
</style>