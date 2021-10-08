import Vue from 'vue'
import router from '@/router'
import store from '@/store'

/**
 * 获取组件vue实例
 * @param {Object} ctorObj 组件构造对象
 * @param {Object} props 组件初始化props
 */
const getInstance = (ctorObj, props = {}) => {

	const _instance = new Vue({
		...ctorObj,
		store,
		router,
		propsData: props,
	})
	return _instance
}

/**
 * 根据组件路径获取vue组件实例
 * @param {String} path 组件路径，相对与views路径
 * @param {Object} props 组件初始化props
 */
const getRenderComp = (path, props) => {
	return new Promise(async (r) => {
		const importComp = await import(/* webpackChunkName: "dialogManager/RenderComp" */`${process.env.VUE_APP_DYNAMIC_COMP_DIR}/${path}.vue`)
		const importInstance = getInstance({ ...importComp.default, __is_dialog__: true }, props)
		r(importInstance)
	})
}

/**
 * 根据组件路径获取dialog组件实例
 * @param {String} path 组件路径，相对与base/dialogManager路径
 * @param {Object} props 组件初始化props
 */
const getRenderDialog = (path, props) => {
	return new Promise(async (r) => {
		const importComp = await import(/* webpackChunkName: "dialogManager/RenderDialog" */`${process.env.VUE_APP_DYNAMIC_DIALOG_DIR}/${path}.vue`)
		const importInstance = getInstance({ ...importComp.default }, props)
		r(importInstance)
	})
}

// dialog管理类
class Dialog {
	constructor(data) {
		const { type = 'BaseDialog', ...props } = data
		this.comp = null
		this._renderDialogPromise = getRenderDialog(type, props).then((dialog) => {
			this.vm = dialog
			this.vm.$watch('$route', (to, from) => {
				if (to.name !== from.name) {
					this.triggerEvents('close')
				}
			})
			// dialog关闭触发
			this._onHook('beforeDestroy', () => {
				this.triggerEvents('close')
			})
			this.vm.$mount()
			return dialog
		})
		this.events = []
	}
	/**
	 * dialog  hook事件注册
	 * @param {String} eventName hook名称
	 * @param {Function} cb 回调
	 */
	_onHook(eventName, cb) {
		return new Promise(async r => {
			const _vm = await this._renderDialogPromise
			_vm.$on(`hook:${eventName}`, async () => {
				if (cb) {
					await cb(_vm)
				}
				r()
			})
		})
	}
	/**
	 * 注册挂载组件事件，用于调用方与业务方通信
	 * @param {String} key 事件key值，会拼装成`dialog:key`
	 * @param {Function} callback 事件回调事件
	 */
	registerEvents(key, callback) {
		if (!this.comp) {
			return
		}
		this.comp.$on(`dialog:${key}`, callback)
		const _unregisterFn = () => {
			this.comp.$off(`dialog: ${key}`, callback)
		}
		this.events.push(_unregisterFn)
		return _unregisterFn
	}
	/**
	 * 触发挂载组件事件
	 * @param {String} key 事件key值，会拼装成`dialog:key`
	 */
	triggerEvents(key) {
		if (!this.comp) {
			return
		}
		this.comp.$emit(`dialog:${key}`)
	}
	/**
	 * 打开dialog
	 */
	open() {
		return this._renderDialogPromise.then(dialog => {
			dialog.open()
			return dialog
		})
	}
	/**
	 * 清空注册事件
	 */
	clearEvents() {
		this.events.forEach(event => event())
	}
	/**
	 * 关闭dialog
	 */
	close() {
		this.clearEvents()
		this.vm.close()
	}
	/**
	 * 挂载业务组件
	 * @param {Promise<Vue>} getCompPromise 挂载的业务组件promise
	 */
	appendComp(getCompPromise) {
		return new Promise(async (r) => {
			this.vm.isLoading = true
			this.comp = await getCompPromise
			this.comp.$mount(this.vm.$refs.dialogRef)
			// this.comp.$parent = this.vm
			this.vm.$children.push(this.comp)
			this.vm.isLoading = false
			this._onHook('beforeDestroy', () => {
				this.comp.$destroy()
			})
			r(this.comp)
		})
	}
}

// dialog管理器
class DialogManager {
	constructor() {
		// 暂时没用
		this.max = 99
		this.managers = {}
	}
	/**
	 * 创建dialog
	 */
	async createDialog(path, props) {
		let _dialog = this.managers[path]
		if (_dialog) {
			this.closeDialog(path, _dialog)
			// 等待组件销毁，否则会出现事件注册与销毁错乱
			await _dialog._onHook('beforeDestroy')
		}
		_dialog = new Dialog(props)
		_dialog._onHook('beforeDestroy', () => {
			delete this.managers[path]
		})
		this.managers[path] = _dialog
		await _dialog.open()
		return _dialog
	}
	/**
	 * 根据path获取dialog
	 * @param {Number} path vue组件路径
	 */
	getDialog(path) {
		return this.managers[path]
	}
	/**
	 * 关闭dialog
	 * @param {Dialog} dialog dialog实例
	 */
	closeDialog(key, dialog) {
		delete this.managers[key]
		dialog.close()
	}
	/**
	 * 打开dialog
	 * @param {Number} path vue组件路径
	 */
	openDialog(path) {
		const _dialog = this.managers[path]
		if (_dialog) {
			_dialog.open()
		}
	}
	/**
	 * 清空dialog
	 */
	clear() {
		for (const key in this.managers) {
			this.managers[key].$destroy()
		}
		this.managers = {}
	}
}

const dialogManager = new DialogManager()

export default (path, props, dialogProps) => {
	return new Promise(async (r) => {
		const dialog = await dialogManager.createDialog(path, dialogProps)
		dialog.appendComp(getRenderComp(path, props)).then(() => {
			dialog.registerEvents('close', dialog.close.bind(dialog))
			r(dialog)
		})
	})
}
