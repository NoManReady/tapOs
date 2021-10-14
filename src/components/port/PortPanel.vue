<template>
    <div class="port-panel">
        <div class="port-panel--header clearfix">
            <slot name="header">
                <div class="fl">
                    <port-icon
                        :hover="false"
                        :size="32"
                        class="vm"
                        direct="h"
                        icon="upport"
                        type="info"
                    >
                        <template #after>
                            <span class="label vm">可选端口</span>
                        </template>
                    </port-icon>
                    <port-icon
                        :hover="false"
                        :size="32"
                        class="vm ml5"
                        direct="h"
                        icon="upport"
                        type="closed"
                    >
                        <template #after>
                            <span class="label vm">不可选端口</span>
                        </template>
                    </port-icon>
                </div>
                <div class="fr port-type--bar">
                    <port-icon
                        :hover="false"
                        :size="32"
                        class="vm ml5"
                        direct="h"
                        icon="upport"
                        inner-icon="shanglian"
                        type="closed"
                    >
                        <template #after>
                            <span class="label vm">上联口</span>
                        </template>
                    </port-icon>
                    <port-icon
                        :hover="false"
                        :size="32"
                        class="vm ml5"
                        direct="h"
                        icon="upport"
                        type="closed"
                    >
                        <template #after>
                            <span class="label vm">电口</span>
                        </template>
                    </port-icon>
                    <port-icon
                        :hover="false"
                        :size="32"
                        class="vm ml5"
                        direct="h"
                        icon="guangkou"
                        type="closed"
                    >
                        <template #after>
                            <span class="label vm">光口</span>
                        </template>
                    </port-icon>
                </div>
            </slot>
        </div>
        <div :class="{ 'd3-box': show3d }">
            <div class="viewboard"></div>
            <div class="viewborder">
                <div :style="minHeightStyl" class="port-panel--body" ref="containerRef">
                    <table class="body-table">
                        <tbody>
                            <tr
                                :class="[`row_${index}`]"
                                :key="index"
                                v-for="(row,index) in renderPorts"
                            >
                                <td class="empty"></td>
                                <template v-for="p in row">
                                    <td :key="`${p.lpid}-${p.phyMediaType}`" v-if="p.empty"></td>
                                    <td
                                        :class="{ 'selected': p.selected }"
                                        :key="`${p.lpid}-${p.phyMediaType}`"
                                        @click="_onToggle(p, $event)"
                                        class="port-panel--item"
                                        v-else
                                    >
                                        <port-icon
                                            :data-index="p.lpid"
                                            :data-type="p.phyMediaType"
                                            :disabled="p.disabled"
                                            :icon="p.icon"
                                            :inner-icon="_getPortInnerIcon(p)"
                                            :rotate="index === 1"
                                            :sub-icon="_getPortSubIcon(p)"
                                            :text="p.ag"
                                            :type="p.disabled ? 'closed' : 'info'"
                                            class="vm"
                                            direct="v"
                                        >
                                            <template #before v-if="index === 0">
                                                <span
                                                    class="label"
                                                    v-show="p.lpid !== undefined"
                                                >{{ p.lpid + 1 }}</span>
                                            </template>
                                            <template #after v-if="index === 1">
                                                <span
                                                    class="label"
                                                    v-show="p.lpid !== undefined"
                                                >{{ p.lpid + 1 }}</span>
                                            </template>
                                        </port-icon>
                                    </td>
                                </template>
                                <td class="empty"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        :style="rangeStyl"
                        class="select-range--box"
                        ref="rangeRef"
                        v-show="mouseDownEffective && mouseMoveEffective"
                    ></div>
                </div>
            </div>
            <div class="viewboard-shadow"></div>
        </div>
        <div class="port-panel--footer clearfix">
            <slot name="footer">
                <div class="clearfix">
                    <div class="fl c-warning" v-if="mutilple">
                        <i18n path="port_panel.notice_desc" tag="span">
                            <strong place="n">注意：</strong>
                            <i place="t">可按住左键拖拽选取多个端口</i>
                        </i18n>
                    </div>
                    <div class="fr">
                        <el-button
                            :disabled="!enable"
                            @click.native="_onSelectAll"
                            style="padding:0;"
                            type="text"
                            v-if="mutilple"
                        >全选</el-button>
                        <el-button
                            :disabled="!enable"
                            @click.native="_onReverseAll"
                            style="padding:0;"
                            type="text"
                            v-if="mutilple"
                        >反选</el-button>
                        <el-button
                            :disabled="!enable"
                            @click.native="_onClear"
                            style="padding:0;"
                            type="text"
                        >取消选择</el-button>
                    </div>
                </div>
            </slot>
            <slot name="footer-tool"></slot>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PortIcon from './PortIcon'
import browser from '@/utils/browser'
export default {
    name: 'port-panel',
    components: {
        [PortIcon.name]: PortIcon
    },
    props: {
        // 选中值
        selecteds: {
            type: Array | String,
            default: () => []
        },
        // 是否可多选
        mutilple: {
            type: Boolean,
            default: false
        },
        // 是否开启勾选功能
        enable: {
            type: Boolean,
            default: true
        },
        // 最终返回值处理
        handleData: {
            type: Function,
            default: ids => ids.sort((a, b) => a - b)
        },
        // 禁用值
        disableds: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            begin: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
            rangeStyl: {},
            // 鼠标down是否有效
            mouseDownEffective: false,
            // 鼠标move是否有效
            mouseMoveEffective: false,
            tempSelectes: Object.freeze([]),
            panelPorts: Object.freeze(window.APP_CAPACITY_SW.port.panel_list)
        }
    },
    mounted() {
        if (this.enable && this.mutilple) {
            document.addEventListener('mousedown', this._onMousedown, false)
            document.addEventListener('mousemove', this._onMousemove, false)
            document.addEventListener('mouseup', this._onMouseup, false)
        }
    },
    beforeDestroy() {
        if (this.enable && this.mutilple) {
            document.removeEventListener('mousedown', this._onMousedown)
            document.removeEventListener('mousemove', this._onMousemove)
            document.removeEventListener('mouseup', this._onMouseup)
        }
    },
    watch: {
        mutilple(v) {
            if (this.enable && this.mutilple) {
                document.addEventListener('mousedown', this._onMousedown, false)
                document.addEventListener('mousemove', this._onMousemove, false)
                document.addEventListener('mouseup', this._onMouseup, false)
            } else {
                document.removeEventListener('mousedown', this._onMousedown)
                document.removeEventListener('mousemove', this._onMousemove)
                document.removeEventListener('mouseup', this._onMouseup)
            }
        }
    },
    computed: {
        ...mapGetters('switcher', ['logicPort', 'lagPortsMap', 'uplink']),
        // 选中的物理端口号
        realSelectes() {
            let _selectes = this.selecteds
            if (!this.mutilple) {
                _selectes = [this.selecteds]
            }
            return Object.freeze(this._getRealIds(_selectes))
        },
        // 禁用的物理端口号
        realDisableds() {
            return Object.freeze(this._getRealIds(this.disableds))
        },
        // 渲染端口数据格式（符合面板格式的数据，用于生成面板）
        renderPorts() {
            let _panelPort = this.panelPorts.map(row => {
                return row.map((port, index) => {
                    if (port) {
                        let _portItem =
                            this.logicPort.find(
                                p => p.ifname.toUpperCase() === port.ifname.toUpperCase()
                            ) || {}
                        // 判断是否选中
                        let _selected =
                            (this.realSelectes.includes(_portItem.lpid) ||
                                this.tempSelectes.includes(_portItem.lpid))
                        let _disabled =
                            this.realDisableds.includes(_portItem.lpid)
                        let _icon = port.media_type === 1 ? 'upport' : 'guangkou'
                        return {
                            ..._portItem,
                            selected: _selected,
                            disabled: _disabled,
                            icon: _icon,
                            phyMediaType: port.media_type
                        }
                    }
                    // 占位符
                    return { empty: true, span: 1, lpid: -index }
                })
            })
            return Object.freeze(_panelPort)
        },
        // 扁平化所有端口（包含占位符端口，用于查找数据）
        allPorts() {
            return Object.freeze(Array.prototype.concat.apply([], this.renderPorts))
        },
        minHeightStyl() {
            return {
                'min-height': `${this.panelPorts.length * 50 + 16}px`
            }
        },
        // 是否显示面板图
        show3d() {
            if (browser.versions.isIe) {
                return browser.versions.ieVersion > 9
            }
            return true
        }
    },
    methods: {
        // 获取端口内部icon名称
        _getPortInnerIcon(port) {
            let _innerIcon = []
            if (!port.disabled) {
                if (this.uplink.lpid.includes(port.lpid)) {
                    _innerIcon.push('shanglian')
                }
                if (port.exception) {
                    if (port.exception === 3) {
                        _innerIcon.push('refresh')
                    } else {
                        _innerIcon.push('notcertified')
                    }
                }
            }
            return _innerIcon
        },
        _getPortSubIcon(port) {
            let _subIcon = []
            if (!port.disabled) {
                if (port.poeUp) {
                    _subIcon.push('gongdian')
                }
                if (port.poeError) {
                    _subIcon.push('bugongdian')
                }
                if (port.block) {
                    _subIcon.push('zusai')
                }
            }
            return _subIcon
        },
        // 获取真实选中值
        _getRealIds(selectes) {
            return selectes
        },
        // 配置选中值
        _hookSelecteds(ids) {
            let _set = new Set([...ids])
            this.$emit('update:selecteds', this.handleData([..._set]))
        },
        // 全选
        _onSelectAll() {
            let _selecteds = this.logicPort
                .filter(p => !this.realDisableds.includes(p.lpid))
                .map(p => p.lpid)
            this._hookSelecteds(_selecteds)
        },
        // 反选
        _onReverseAll() {
            let _selecteds = this.logicPort
                .filter(
                    p =>
                        !this.realSelectes.includes(p.lpid) &&
                        !this.realDisableds.includes(p.lpid)
                )
                .map(p => p.lpid)
            this._hookSelecteds(_selecteds)
        },
        // 清空
        _onClear() {
            this._hookSelecteds([])
        },
        /**
         * 判断是否为同一个点
         */
        _isSamePoint() {
            return this.begin.x === this.end.x && this.begin.y === this.end.y
        },
        /**
         * 选中格切换
         */
        _onToggle(item, e) {
            if (!item.disabled && this._isSamePoint()) {
                if (!this.realDisableds.includes(item.lpid)) {
                    // 获取点击值（有agg则获取ag）
                    let _select = item.lpid
                    if (this.mutilple) {
                        let _selecteds = [...this.selecteds]
                        let _index = this.selecteds.findIndex(s => {
                            return s === _select
                        })
                        if (_index > -1) {
                            _selecteds.splice(_index, 1)
                        } else {
                            _selecteds.push(_select)
                        }
                        this._hookSelecteds(_selecteds)
                    } else {
                        this._hookSelecteds(_select)
                    }
                }
            }
        },
        /**
         * 判断元素的包含关系
         */
        _contains(refNode, childNode) {
            if (typeof refNode.contains == 'function') {
                return refNode.contains(childNode)
            } else if (typeof refNode.compareDocumentPosition == 'function') {
                return !!(refNode.compareDocumentPosition(childNode) & 16)
            } else {
                let _parentNode = childNode.parentNode
                do {
                    if (_parentNode === refNode) {
                        return true
                    } else {
                        _parentNode = _parentNode.parentNode
                    }
                } while (_parentNode !== null)
                return false
            }
        },
        /**
         * 滚动窗口距离(所有父层)
         */
        _getScrollContainerDistance() {
            let _parent = this.$parent
            let _parentContainer = _parent.$el || _parent
            let _scrollTop = 0
            let _scrollLeft = 0
            while (_parentContainer) {
                _scrollTop += _parentContainer.scrollTop || 0
                _scrollLeft += _parentContainer.scrollLeft || 0
                _parentContainer = _parentContainer.parentNode
            }
            return {
                _scrollTop,
                _scrollLeft
            }
        },
        /**
         * 获取点击点真实距离
         */
        _getScrollDistance(e) {
            let { _scrollTop, _scrollLeft } = this._getScrollContainerDistance()
            return {
                x: (e.clientX || e.touches[0].clientX) + _scrollLeft,
                y: (e.clientY || e.touches[0].clientY) + _scrollTop
            }
        },
        /**
         * 重置选框及mouse状态
         */
        _resetRangeState() {
            this.mouseDownEffective = false
            this.mouseMoveEffective = false
            // this.begin = this.end = { x: 0, y: 0 }
            this.tempSelectes = []
        },
        /**
         * 判断鼠标是否位于判断范围内
         */
        _hasInWrap(e) {
            let _target = e.target
            let _container = this.$refs.containerRef
            return this._contains(_container, _target)
        },
        /**
         * 鼠标点击mousedown
         */
        _onMousedown(e) {
            if (this._hasInWrap(e)) {
                this.mouseDownEffective = true
                this.mouseMoveEffective = false
                this.begin = this.end = this._getScrollDistance(e)
                this._setRangePosition(e)
            }
        },
        /**
         * 鼠标移动
         */
        _onMousemove(e) {
            if (this.mouseDownEffective && this._hasInWrap(e)) {
                this.end = this._getScrollDistance(e)
                if (!this._isSamePoint()) {
                    this.mouseMoveEffective = true
                }
                e.preventDefault()
                this._setRangePosition(e)
            } else {
                this._resetRangeState()
            }
        },
        /**
         * 鼠标结束
         */
        _onMouseup(e) {
            if (
                this._hasInWrap(e) &&
                this.mouseDownEffective &&
                this.mouseMoveEffective
            ) {
                this._hookSelecteds(
                    [...new Set([...this.tempSelectes, ...this.selecteds])].sort()
                )
            }
            this._resetRangeState()
        },
        /**
         * 设置选框的position
         */
        _setRangePosition(e) {
            let _rangeRef = this.$refs.rangeRef
            let _containerRef = this.$refs.containerRef
            let _opt = _containerRef.getBoundingClientRect()
            let { _scrollTop, _scrollLeft } = this._getScrollContainerDistance()
            let _left = 0
            let _top = 0
            if (this.end.x < this.begin.x) {
                _left = this.end.x - _opt.left - _scrollLeft + _containerRef.scrollLeft
            } else {
                _left =
                    this.begin.x - _opt.left - _scrollLeft + _containerRef.scrollLeft
            }
            if (this.end.y < this.begin.y) {
                _top = this.end.y - _opt.top - _scrollTop + _containerRef.scrollTop
            } else {
                _top = this.begin.y - _opt.top - _scrollTop + _containerRef.scrollTop
            }
            let _width = Math.abs(this.end.x - this.begin.x)
            let _height = Math.abs(this.end.y - this.begin.y)
            this.rangeStyl = {
                left: `${_left}px`,
                top: `${_top}px`,
                width: `${_width}px`,
                height: `${_height}px`
            }
            if (_height || _width) {
                this._setSelectedItem()
            }
        },
        /**
         * 设置选中单元格数据
         */
        _setSelectedItem(e) {
            let _containerRef = this.$refs.containerRef
            let _items = _containerRef.querySelectorAll('[data-index]')
            let { _scrollTop, _scrollLeft } = this._getScrollContainerDistance()
            // 确定选框横纵坐标范围（1比2小）
            let _bx1 = this.begin.x
            let _bx2 = this.end.x
            let _by1 = this.begin.y
            let _by2 = this.end.y
            if (_bx1 > _bx2) {
                ;[_bx1, _bx2] = [_bx2, _bx1]
            }
            if (_by1 > _by2) {
                ;[_by1, _by2] = [_by2, _by1]
            }
            // 过滤单元格
            let _filterItems = Array.from(_items).filter(td => {
                let _range = td.getBoundingClientRect()
                let _x1 = _range.left + _scrollLeft
                let _x2 = _x1 + _range.width
                let _y1 = _range.top + _scrollTop
                let _y2 = _y1 + _range.height
                if (_x2 < _bx1 || _x1 > _bx2 || _y2 < _by1 || _y1 > _by2) {
                    return false
                }
                return true
            })
            let _selecteds = []
            _filterItems.forEach(ite => {
                let _lpid = ite.getAttribute('data-index')
                let _type = ite.getAttribute('data-type')
                if (_lpid) {
                    _lpid = +_lpid
                    _type = +_type
                    let _item = this.allPorts.find(
                        p => p.lpid === _lpid && p.phyMediaType === _type
                    )
                    if (_item && !_item.disabled) {
                        _selecteds.push(_item.lpid)
                    }
                }
            })
            this.tempSelectes = Object.freeze(_selecteds)
        }
    }
}
</script>
