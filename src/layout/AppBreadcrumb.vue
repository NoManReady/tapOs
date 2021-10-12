<template>
	<el-breadcrumb class="app-breadcrumb" v-if="breadcrumbs.length">
		<el-breadcrumb-item :key="route.path" :to="route.to" v-for="route in breadcrumbs">{{
			route.label
		}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
export default {
	name: 'AppBreadcrumb',
	components: {
		[Breadcrumb.name]: Breadcrumb,
		[BreadcrumbItem.name]: BreadcrumbItem,
	},
	data() {
		return {
			breadcrumbs: [],
		}
	},
	watch: {
		$route: {
			handler(route) {
				let _matcheds = route.matched
				this.breadcrumbs = _matcheds.map((match) => {
					return {
						label: match.meta.label,
						to: {
							name: match.name,
							query: match.query,
							params: match.params,
						},
						path: match.path,
					}
				})
			},
			immediate: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.app-breadcrumb {
}
</style>
