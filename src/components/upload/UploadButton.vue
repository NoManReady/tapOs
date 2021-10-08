<template>
	<el-upload
		:action="uploadUrl"
		:before-upload="_onBeforeUpload"
		:data="uploadData"
		:disabled="!!percentage"
		:headers="headers"
		:multiple="multiple"
		:on-error="_onUploadError"
		:on-progress="_onUploadProgress"
		:on-success="_onUploadSuccess"
		:show-file-list="false"
		class="comp-upload-button"
		ref="upload"
	>
		<div slot="trigger">
			<slot :percentage="percentage">
				<el-button :disabled="!!percentage" :loading="!!percentage" :size="size" class="vm" plain>{{btnLabel}}</el-button>
			</slot>
		</div>
	</el-upload>
</template>
<script>
import { Upload } from 'element-ui'
import { accessToken } from '@/config'
export default {
	name: 'CompUploadButton',
	components: {
		[Upload.name]: Upload,
	},
	props: {
		accepts: {
			type: Array | String,
			default: '.doc,.docx,.html,.pdf,.jpg,.png,.gif,.jpeg',
		},
		size: {
			type: String,
			default: 'small',
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		optionData: {
			type: Object,
			default: () => ({}),
		},
		label: {
			type: String,
			default: '上传',
		},
		uploadUrl: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			uploadData: {
				...this.optionData,
			},
			percentage: 0,
		}
	},
	computed: {
		headers() {
			return {
				access_token: accessToken(),
			}
		},
		btnLabel() {
			if (this.percentage < 100 && this.percentage > 0) {
				return '上传中'
			}
			return this.label
		},
	},
	methods: {
		triggerUpload(uploadData, onStart = () => {}) {
			this.uploadData = { ...this.uploadData, ...uploadData }
			this.$el.querySelector('.el-upload__input').click()
			return new Promise((resolve, reject) => {
				this.$on('on-error', ({ file, response }) => {
					reject({ file, response })
				})
				this.$on('on-start', (file) => {
					onStart(file)
				})
				this.$on('on-success', ({ file, response }) => {
					resolve({ file, response })
				})
			})
		},
		//上传之前
		_onBeforeUpload(file) {
			this.$emit('on-start', file)
			return true
		},
		// 取消上传
		_onCancelUpload() {
			this.$refs.upload.abort()
			this.$refs.upload.clearFiles()
			this.$message({
				message: '上传已取消',
				type: 'warning',
			})
			this._setOk()
		},
		// 上传进度
		_onUploadProgress(event, file, fileList) {
			this.percentage = ~~event.percent
		},
		//上传完成触发事件
		async _onUploadSuccess(response, file, fileList) {
			if (response.success === false) {
				this.$refs.upload.clearFiles()
				// this.$message.error(response.message)
				this.$emit('on-error', { file, response })
			} else {
				this.$emit('on-success', { file, response })
			}
			this._setOk()
		},
		_setOk() {
			this.percentage = 100
			setTimeout(() => {
				this.percentage = 0
			}, 1000)
		},
		//文件上传失败调用
		_onUploadError(response, file, fileList) {
			this._setOk()
			let obj = JSON.parse(response.message)
			this.$message({
				message: obj.message,
				type: 'warning',
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.comp-upload-button {
}
</style>