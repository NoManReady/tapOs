<template>
	<div :class="{'pager-always-bottom':pagerAlwaysBottom}" class="base-pager">
		<div class="base-pager-inner">
			<div class="pager-tool-bar" v-show="$slots.toolLeft||$slots.toolRight">
				<div class="left">
					<slot name="toolLeft"></slot>
				</div>
				<div class="right">
					<slot name="toolRight"></slot>
				</div>
			</div>
			<div class="pager-container">
				<template v-if="isError">
					<slot :error="errorStack" name="error"></slot>
				</template>
				<template v-else>
					<template v-if="showDefaultEmpty&&total===0&&!isFirst">
						<slot name="empty">
							<base-not-data v-loading="isLoading" :pos="emptyPos" :text="emptyText" class="mt20" />
						</slot>
					</template>
					<template v-else>
						<slot
							:columns="columnList"
							:data="data"
							:is-error="isError"
							:is-first="isFirst"
							:isLoading="isLoading"
							:object="object"
							:page-model="{...pageModel,total}"
							:records="records"
						></slot>
					</template>
				</template>
			</div>
			<slot :page-model="pageModel" :total="total" name="pager">
				<el-pagination
					:current-page="pageModel.pageNum"
					:hide-on-single-page="hideOnSinglePage"
					:layout="layout"
					:next-text="nextText"
					:page-size="pageModel.pageSize"
					:page-sizes="sizes"
					:pager-count="5"
					:prev-text="prevText"
					:total="total"
					@current-change="_onCurrentChange"
					@size-change="_onSizeChange"
					class="base-pager-pager"
					v-if="total>0"
				></el-pagination>
			</slot>
		</div>
	</div>
</template>
<script>
import { Pagination } from 'element-ui'
import NotData from '../NotData'
export default {
	name: 'BasePager',
	components: {
		[Pagination.name]: Pagination,
		[NotData.name]: NotData,
	},
	props: {
		// 分页器页码选择组
		sizes: {
			type: Array,
			default: () => [5, 10, 15],
		},
		// 基础查询条件（跟pageModel整合）
		model: {
			type: Object,
			default: () => ({}),
		},
		// 查询接口
		request: {
			type: Function,
			required: true,
		},
		// 查询参数
		query: {
			type: Object,
			default: () => ({}),
		},
		// 分页器布局器
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper',
		},
		// 文本
		nextText: {
			type: String,
			default: '下一页',
		},
		// 文本
		prevText: {
			type: String,
			default: '上一页',
		},
		// 只有一页时是否显示分页器
		hideOnSinglePage: {
			type: Boolean,
			default: false,
		},
		// 无数据时是否显示提示
		showDefaultEmpty: {
			type: Boolean,
			default: false,
		},
		// 无数据显示文本
		emptyText: {
			type: String,
			default: '暂无数据',
		},
		emptyPos: {
			type: String,
			default: 'V',
		},
		// 分页器是否沉底
		pagerAlwaysBottom: {
			type: Boolean,
			default: false,
		},
		// 是否初始化加载
		initFetch: {
			type: Boolean,
			default: true,
		},
		// 刷新key
		redoKey: {
			default: '',
		},
	},
	data() {
		return {
			pageModel: {
				pageNum: 1,
				pageSize: this.sizes[0] || 10,
			},
			// 是否第一次加载
			isFirst: true,
			// 接口是否报错
			isError: false,
			errorStack: null,
			// 接口加载loading
			isLoading: false,
			// 数据总条数
			total: 0,
			//分页数据（object-->easyReport使用；records-->正常接口使用；data，columnList-->动态表格使用）
			object: null,
			records: [],
			data: [],
			columnList: [],
		}
	},
	created() {
		this.pageModel = { ...this.pageModel, ...this.model }
		if (this.initFetch) {
			this._getRecords()
		}
	},
	watch: {
		redoKey() {
			this.fresh()
		},
	},
	methods: {
		async _getRecords() {
			await this.$nextTick()
			try {
				this.isLoading = true
				const _result = await this.request({ ...this.pageModel, ...this.query })
				const { records = [], total = 0, data = [], columnList = [], object } = _result
				this.data = data
				this.records = records
				this.columnList = columnList
				this.total = total
				this.object = object
				if (this.isFirst) {
					this.isFirst = false
					this.$emit('first-loaded', { records, data, columnList, total, object })
				}
				this.$emit('on-loaded', { records, data, columnList, total, object })
				this.isError = false
				this.errorStack = null
			} catch (error) {
				this.$error(error)
				this.isError = true
				this.errorStack = Object.freeze(error)
				this.$emit('on-error', { error })
			}
			this.isLoading = false
		},
		_onCurrentChange(page) {
			this.pageModel.pageNum = page
			this._getRecords()
		},
		_onSizeChange(size) {
			this.pageModel.pageSize = size
			this._getRecords()
		},
		async fresh(reset) {
			if (reset) {
				this.pageModel.pageNum = 1
			}
			await this._getRecords()
		},
	},
}
</script>
<style lang="scss" scoped>
$baseBgColor: #e9ecf0 !default;
$baseGutter: 5px !default;
.base-pager {
	background-color: $baseBgColor;
	&.pager-always-bottom {
		flex: 1;
		height: 100%;
	}
	&-pager {
		text-align: right;
		margin-top: 10px;
		::v-deep {
			.el-pagination__total,
			.el-pagination__sizes {
				float: left;
			}
		}
	}
	&-inner {
		padding: $baseGutter;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.pager-container {
		flex: 1;
		min-height: 0;
		overflow: hidden;
		overflow-y: auto;
	}
}
</style>