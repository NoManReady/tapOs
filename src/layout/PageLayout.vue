<template>
	<div :class="{'is-hide-view':!isPageOpen,'no-padding':reviewFullscreen,'no-toolbar':!showToolBar}" class="page-layout">
		<div class="page-layout-inner">
			<!-- closestPdfLayout.openFlag===2表示最小化 -->
			<div :class="{'no-border':!isPageOpen}" class="page-tool-bar flex is-between" v-if="showToolBar&&showHeader">
				<div class="left">
					<template v-if="showFullscreenIcon">
						<toggle-icon :toggle-key="toggleKey" />
					</template>
					<template v-if="hasPdfAndVisible">
						<el-button @click="_onMaxView" size="small">最大化</el-button>
						<el-button @click="_onMinView" size="small">最小化</el-button>
						<el-button @click="_onDefaultView" size="small">默认大小</el-button>
					</template>
					<slot :disabled="viewComponent.reviewComponent==='readonly'" name="toolLeft"></slot>
				</div>
				<div class="right">
					<div class="dynamic-button-container">
						<el-button
							:disabled="button.disabled"
							:key="button.bizCode"
							:loading="button.isLoading"
							:type="button.type"
							@click="_onEmitButtonClick(button)"
							size="small"
							v-for="button of businessButtons"
						>
							<i :class="button.icon" class="vm mr5" v-if="button.icon"></i>
							<span class="vm">{{button.btnName}}</span>
						</el-button>
					</div>
					<slot :disabled="viewComponent.reviewComponent==='readonly'" name="toolRight"></slot>
				</div>
			</div>
			<div class="page-container">
				<slot :disabled="viewComponent.reviewComponent==='readonly'"></slot>
			</div>
		</div>
	</div>
</template>
<script>
import PageLayoutMixins from '@/mixins/PageLayoutMixins'
import ToggleIcon from './hallLayout/ToggleIcon'
import { getComponentByName } from '@/utils/tool'
export default {
	name: 'PageLayout',
	components: {
		[ToggleIcon.name]: ToggleIcon,
	},
	props: {
		showHeader: {
			type: Boolean,
			default: true,
		},
		showToggleKey: {
			type: Boolean,
			default: true,
		},
	},
	mixins: [PageLayoutMixins],
	computed: {
		// 获取最近的pdfLayout
		closestPdfLayout() {
			const _closestPdfLayout = getComponentByName(this.$parent, 'PdfLayout')
			return _closestPdfLayout || null
		},
		// 判断是否内嵌在pdf布局内（是：判断是否最大化page页，否默认最大化）
		isPageOpen() {
			if (this.closestPdfLayout) {
				return this.closestPdfLayout.openFlag !== 2
			} else {
				return true
			}
		},
		// 获取最近的innerLayout
		closestInnerLayout() {
			const _closestInnerLayout = getComponentByName(this.$parent, 'InnerLayout')
			return _closestInnerLayout || {}
		},
		// 全屏切换key
		toggleKey() {
			const _closestInnerLayout = this.closestInnerLayout
			return _closestInnerLayout.toggleKey || false
		},
		// 获取最近InnerLayout组件的buttons
		businessButtons() {
			const _closestInnerLayout = this.closestInnerLayout
			return _closestInnerLayout.businessButtons || []
		},
		// 事件命名空间
		namespace() {
			const _closestInnerLayout = this.closestInnerLayout
			return _closestInnerLayout.namespace || 'common'
		},
		// 组件布局配置
		viewComponent() {
			const _closestInnerLayout = this.closestInnerLayout
			return (
				_closestInnerLayout.viewComponent || {
					reviewComponent: 'readonly',
					noneComponent: 'hide',
					teamResultComponent: 'hide',
					pdfComponent: 'hide',
				}
			)
		},
		// reviewComponent是否全屏
		reviewFullscreen() {
			return (
				!this.closestPdfLayout ||
				(this.closestPdfLayout && this.closestPdfLayout.openFlag === 1)
			)
		},
		// 是否显示全屏框（满足条件：1、带有toggleKey且不存在pdfLayout；2、带有toggleKey且pdfLayout.viewHeightPercentage === 1--最大化）
		showFullscreenIcon() {
			return this.reviewFullscreen && !!this.toggleKey && this.showToggleKey
		},
		// 具有pdf展示器并展示
		hasPdfAndVisible() {
			return this.closestPdfLayout && this.closestPdfLayout.showPdf
		},
		// 是否显示toolbar
		showToolBar() {
			// 具有业务按钮、工具插槽、最大化功能、具有pdf展示器并展示
			return (
				this.businessButtons.length ||
				this.$slots.toolRight ||
				this.$slots.toolLeft ||
				this.hasPdfAndVisible ||
				this.showFullscreenIcon
			)
		},
	},
	methods: {
		// 	切换view
		_toggleOpen() {
			this.closestPdfLayout._toggleView()
		},
		// 最大化
		_onMaxView() {
			this.closestPdfLayout._maxView()
		},
		// 最小化
		_onMinView() {
			this.closestPdfLayout._minView()
		},
		// 恢复默认
		_onDefaultView() {
			this.closestPdfLayout._restoreView()
		},
		// 业务数据触发事件
		_onEmitButtonClick(button) {
			this.$bus.$emit(`business:${this.namespace}:${button.bizCode}`, {
				from: this,
				value: button,
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.page-layout {
	background-color: $baseBgColor;
	height: 100%;
	overflow: hidden;
	padding-top: 5px;
	&.no-padding {
		padding-top: 0;
	}
	&.no-toolbar {
		.page-container,
		.page-layout-inner {
			// padding: 0;
		}
	}
	&.is-hide-view {
		.page-layout-inner {
			justify-content: center;
		}
		.page-container {
			padding: 0;
			// display: none;
		}
		.page-tool-bar {
			margin-bottom: 0;
			padding: 0;
		}
	}
	&-inner {
		padding: $baseGutter;
		background-color: #fff;
		height: 100%;
		display: flex;
		flex-direction: column;
		.page-tool-bar {
			margin-bottom: 5px;
			min-height: 32px;
			padding: 0 0 5px 0;
			border-bottom: 1px solid $baseBgColor;
			&.no-border {
				border-bottom: none;
			}
		}
		.left,
		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			// float: left;
		}
		.left {
			// padding-left: 26px;
		}
	}
	.page-container {
		// padding: $baseGutter;
		flex: 1;
		min-height: 0;
		overflow: hidden;
		overflow-y: auto;
	}
}
::v-deep .expert-pull {
	display: block;
	margin-bottom: 10px;
	font-size: 18px;
	&:hover {
		color: $--color-primary;
	}
}
</style>