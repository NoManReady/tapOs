<script>
export default {
    name: 'common-tabs',
    props: {
        tabs: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            tabValue: '0',
            randomKey: new Date().getTime()
        }
    },
    watch: {
        $route: {
            handler(v) {
                this.tabValue = v.query.tab || '0'
            },
            immediate: true
        }
    },
    methods: {
        _onTabClick(v) {
            // 点击强制刷新tab
            if (this.tabValue === v.name) {
                this.randomKey = new Date().getTime()
            } else {
                this.$router.push({ query: { tab: v.name } })
            }
        }
    },
    render(h, context) {
        let _vm = this
        const _props = {
            props: {
                value: this.tabValue
            },
            on: {
                'tab-click': _vm._onTabClick
            }
        }
        let _tab = this.tabs.find(tab => tab.value === this.tabValue)
        if (!_tab) {
            this.$router.push({ path: this.$route.path })
            return null
        }
        let _tabs = this.tabs.map(tab => {
            return (
                <el-tab-pane lazy={true} label={tab.label} name={tab.value}>
                    {tab.value === this.tabValue
                        ? h(tab.comp, { key: this.randomKey })
                        : null}
                </el-tab-pane>
            )
        })
        return <el-tabs {..._props}>{_tabs}</el-tabs>
    }
}
</script>
