<template>
	<el-dialog
		:title="title"
		:visible.sync="visible"
		@closed="_onClosed"
		class="origin-dialog-container"
		custom-class="origin-dialog"
		v-bind="{...defOptions,...dialogOptions}"
	>
		<div class="origin-dialog__content" v-loading="isLoading">
			<div ref="dialogRef"></div>
		</div>
	</el-dialog>
</template>
<script>
export default {
	name: 'OriginDialog',
	components: {},
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
	},
	data() {
		return {
			visible: false,
			isLoading: false,
			defOptions: Object.freeze({
				fullscreen: false,
				appendToBody: true,
				destroyOnClose: true,
				lockScroll: true,
				closeOnPressEscape: false,
				closeOnClickModal: false,
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
		getDialog() {
			return this
		},
	},
}
</script>
<style lang="scss">
.origin-dialog {
	.dialog-footer {
		margin-top: 20px;
	}
	&__content {
		.scroll-content {
			max-height: 480px;
			overflow: auto;
		}
	}
}
</style>