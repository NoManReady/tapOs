<template>
	<base-layout class="admin-container">
		<router-view></router-view>
	</base-layout>
</template>

<script>
import BaseLayout from '@/layout/BaseLayout'
export default {
	name: 'Admin',
	components: {
		[BaseLayout.name]: BaseLayout,
	},
	data() {
		return {}
	},
	created() {
		this.$store.dispatch('system/getUserInfo')
	},
}
</script>
<style lang="scss" scoped>
.admin-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
