<template>
    <transition :name="`slide-${this.placement}`">
        <div
            :class="[{ 'has-mask': hasMask }, posClass]"
            class="pos-layout"
            v-clickoutside.special="_onClickoutSide"
            v-if="value"
        >
            <slot></slot>
        </div>
    </transition>
</template>
<script>
import clickoutside from '@/directives/clickoutside'
export default {
    name: 'rj-drawer',
    props: {
        hasMask: {
            type: Boolean,
            default: true
        },
        value: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: 'right'
        }
    },
    data() {
        return {}
    },
    mounted() {
        // this.$root.$el.appendChild(this.$mount().$el)
    },
    beforeDestory() {
        // this.$root.$el.removeChild(this.$el)
    },
    directives: {
        clickoutside
    },
    computed: {
        posClass() {
            return `pos-${this.placement}`
        }
    },
    methods: {
        _onClickoutSide() {
            this.$emit('input', !this.value)
        }
    }
}
</script>
<style lang="scss" scoped>
.pos-layout {
    position: fixed;
    background: darken(#fbfbfb, 3%);
    box-shadow: 0 0 10px #b7b7b7;
    z-index: 999;
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    &.pos-left {
        top: 0;
        bottom: 0;
        left: 0;
    }
    &.pos-right {
        top: 0;
        bottom: 0;
        right: 0;
    }
    &.has-mask {
    }
}
.slide-right-leave-active {
    animation: toRight 0.3s backwards;
}

.slide-right-enter-active {
    animation: toLeft 0.3s forwards;
}

@keyframes toRight {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    to {
        transform: translate3d(100%, 0, 0);
        opacity: 0.5;
    }
}

@keyframes toLeft {
    from {
        transform: translate3d(100%, 0, 0);
        opacity: 0.5;
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
</style>
