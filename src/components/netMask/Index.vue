<template>
    <el-autocomplete
        :disabled="disabled"
        :fetch-suggestions="querySearch"
        :placeholder="type === 'ip' ? '255.255.255.0' : 'FF:FF:FF:FF:FF:00'"
        @select="onSelect"
        v-model="val"
    >
        <template slot-scope="props">
            <div class="name">{{ props.item.value }}</div>
        </template>
    </el-autocomplete>
</template>
<script>
import { Autocomplete } from 'element-ui'
export default {
    name: 'NetMaskInput',
    props: {
        value: String,
        disabled: Boolean,
        type: {
            type: String,
            default: 'ip'
        }
    },
    components: {
        [Autocomplete.name]: Autocomplete
    },
    data() {
        return {
            val: ''
        }
    },
    created() {
        this.val = this.value
    },
    watch: {
        value() {
            this.val = this.value
        },
        val(v) {
            this.$emit('input', v)
            this.$emit('blur', v)
        }
    },
    methods: {
        querySearch(queryString, cb) {
            let results = []
            if (this.type === 'ip') {
                results = this.sourceData || [
                    { value: '255.255.255.0' },
                    { value: '255.255.0.0' },
                    { value: '255.0.0.0' }
                ]
            } else {
                results = this.sourceData || [
                    { value: 'FF:FF:FF:FF:FF:FF' },
                    { value: 'FF:FF:FF:FF:FF:00' },
                    { value: 'FF:FF:FF:FF:00:00' },
                    { value: 'FF:FF:FF:00:00:00' }
                ]
            }
            cb(results)
        },
        onSelect(v) {
            this.$emit('select', v)
        }
    }
}
</script>
