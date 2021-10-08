<template>
	<div class="app-container">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {}
	},
}
</script>
<style lang="scss" scoped>
.app-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	color: $baseFontColor;
	line-height: 1;
	// min-width: 768px;
}
</style>
