<template>
	<el-dialog
		:center="true"
		:title="title"
		:visible.sync="visible"
		@closed="_onClosed"
		class="base-dialog-container"
		custom-class="base-dialog"
		v-bind="{...defOptions,...dialogOptions}"
		v-on="{...dialogEvents}"
	>
		<base-title-block :back-text="backText" :title="title" @on-back="_onBack" />
		<div class="base-dialog__content" v-loading="isLoading">
			<div ref="dialogRef"></div>
		</div>
	</el-dialog>
</template>
<script>
import { TitleBlock } from 'sc-gpx-vue-component-base'
export default {
	name: 'BaseDialog',
	components: {
		[TitleBlock.name]: TitleBlock,
	},
	props: {
		title: {
			type: String,
			default: 'Base-Dialog',
		},
		backText: {
			type: String,
			default: '返回',
		},
		dialogOptions: {
			type: Object,
			default: () => ({}),
		},
		dialogEvents: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			visible: false,
			isLoading: false,
			defOptions: Object.freeze({
				fullscreen: true,
				appendToBody: true,
				destroyOnClose: true,
			}),
		}
	},
	methods: {
		open() {
			this.visible = true
		},
		close() {
			this.visible = false
		},
		_onClosed() {
			this.$destroy()
		},
		_onBack() {
			if (this.dialogOptions.onBack && typeof this.dialogOptions.onBack === 'function') {
				this.dialogOptions.onBack()
			}
			this.visible = false
		},
		getDialog() {
			return this
		},
	},
}
</script>
<style lang="scss">
.base-dialog {
	padding: 0 5px 5px;
	background-color: #eff2f5;
	.el-dialog__header {
		display: none;
	}
	.el-dialog__body {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0;
	}
	&__content {
		flex: 1;
		overflow: auto;
		height: calc(100% - 54px);
		min-height: 0;
		background-color: #fff;
	}
}
</style>