<template>
    <div class="port-icon">
        <slot name="before"></slot>
        <div
            :class="{ 'vm': direct === 'h', 'pointer': hover, 'disabled': disabled }"
            class="port-icon--main"
        >
            <i :class="colorMap[dot]" class="notice" v-if="dot"></i>
            <i :class="classArr" :style="iconStyl" class="icon"></i>
            <slot name="inner-icon">
                <div class="inner-icon" v-if="innerIcons.length">
                    <i
                        :class="[`tapos-${icon}`]"
                        :key="icon"
                        :style="innerIconStyl"
                        v-for="icon of innerIcons"
                    ></i>
                </div>
            </slot>
            <div class="sub-wrap">
                <slot name="sub-icon">
                    <template v-if="subIcons.length">
                        <i
                            :class="[`tapos-${icon}`]"
                            :key="icon"
                            :style="{ 'z-index': index, right: `${index * 60}%` }"
                            class="sub-icon"
                            v-for="(icon,index) of subIcons"
                        ></i>
                    </template>
                    <div
                        :style="{ 'z-index': subIcons.length, right: `${subIcons.length * 60}%` }"
                        class="sub-text"
                        v-if="text"
                    >
                        <span>{{ text }}</span>
                    </div>
                </slot>
            </div>
        </div>
        <slot name="after"></slot>
    </div>
</template>
<script>
const types = ['info', 'error', 'success', 'warning', 'closed']
export default {
    name: 'port-icon',
    props: {
        hover: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        direct: {
            type: String,
            default: 'v'
        },
        innerIcon: String | Array,
        subIcon: String | Array,
        text: String | Number,
        port: Object,
        label: String,
        rotate: {
            type: Boolean,
            default: false
        },
        type: {
            validator(v) {
                return types.indexOf(v) > -1
            },
            default: 'info'
        },
        icon: {
            type: String,
            default: 'electric'
        },
        size: {
            type: Number,
            default: 32
        },
        dot: {
            type: String | Boolean,
            default: false
        }
    },
    computed: {
        classArr() {
            let _clazz = []
            _clazz.push(`tapos-${this.icon}`)
            if (this.rotate) {
                _clazz.push('rotate')
            }
            _clazz.push(this.type)
            return _clazz
        },
        iconStyl() {
            return { 'font-size': `${this.size}px` }
        },
        innerIconStyl() {
            return { 'font-size': `${Math.max(this.size - 20, 12)}px` }
        },
        innerIcons() {
            if (typeof this.innerIcon === 'string') {
                return [this.innerIcon]
            }
            if (Array.isArray(this.innerIcon)) {
                return this.innerIcon
            }
            return []
        },
        subIcons() {
            if (typeof this.subIcon === 'string') {
                return [this.subIcon]
            }
            if (Array.isArray(this.subIcon)) {
                return this.subIcon
            }
            return []
        },
        subIconSize() {
            return this.text ? this.subIcons.length + 1 : this.subIcons.length
        }
    },
    data() {
        return {
            colorMap: {
                info: 'c-info',
                warning: 'c-warning',
                success: 'c-sunccess',
                error: 'c-error'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/style/var/variable";
@import "~@/style/var/mixins";
.port-icon {
    margin: auto;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    white-space: nowrap;
    .disabled {
        cursor: not-allowed;
        // cursor: default;
    }
    &--main {
        position: relative;
        text-align: center;
        line-height: 1;
        .icon {
            display: inline-block;
        }
        .notice {
            position: absolute;
            width: 4px;
            height: 4px;
            background: red;
            border-radius: 50%;
            right: 2px;
            top: 3px;
        }
        > .inner-icon,
        > .sub-wrap {
            position: absolute;
            transform-origin: center center;
            top: 50%;
            left: 50%;
            font-size: 12px;
            width: 1.4em;
            height: 1.4em;
            line-height: 1.4em;
        }
        > .inner-icon {
            color: #fff;
            transform: translate(-50%, -50%);
        }
        > .sub-wrap {
            & > [class^="sub-"] {
                display: block;
                background: currentColor;
                border-radius: 50%;
                border: 1px solid #fff;
                position: absolute;
                font-size: 12px;
                width: 100%;
                height: 100%;
            }
        }
    }
    /deep/ .port-icon--main {
        .info {
            color: #595959;
            & ~ .sub-wrap > [class^="sub-"] {
                background-color: #595959;
                color: #fff;
            }
        }
        .closed {
            color: #bfbfbf;
            & ~ .sub-wrap > [class^="sub-"] {
                background-color: #bfbfbf;
                color: #8c8c8c;
            }
            & ~ .inner-icon {
                color: #8c8c8c;
            }
        }
        .error {
            color: $--color-danger;
            & ~ .sub-wrap > [class^="sub-"] {
                background-color: $--color-danger;
                color: #fff;
            }
        }
        .good,
        .success {
            color: $--color-success;
            & ~ .sub-wrap > [class^="sub-"] {
                background-color: $--color-success;
                color: #fff;
            }
        }
        .normal,
        .warning {
            color: $--color-warning;
            & ~ .sub-wrap > [class^="sub-"] {
                background-color: $--color-warning;
                color: #fff;
            }
        }
        .rotate {
            transform: rotate(180deg);
        }
    }
}
</style>
