import * as utils from './ruleUtils'

function validate(valid, rule, cb) {
	if (valid) {
		cb()
	} else {
		cb(new Error(rule.message))
	}
}
/**
 * 判断是否为掩码
 * @param {String} mask 掩码字符串
 */
export const maskValidator = (rule, mask, cb) => {
	if (mask === '') {
		return cb()
	}
	rule.message = rule.message || '请输入有效的子网掩码'
	var num = utils.ipToLong(mask)
	num = ~num + 1
	// 判断是否为2^n
	validate((num & (num - 1)) == 0 && utils.isIp(mask), rule, cb)
}
/**
 * 判断是否为有效掩码
 * @param {String} mask 掩码字符串
 */
export const maskUsedValidator = (rule, mask, cb) => {
	if (mask === '') {
		return cb()
	}
	let _after = /(25[3-5])$/.test(mask.split('.')[3])
	let _begin = mask === '0.0.0.0'
	let _valid = !_after && !_begin
	if (!rule.message && !_valid) {
		if (_begin) {
			rule.message = '子网掩码不能为0.0.0.0'
		}
		if (_after) {
			rule.message = '子网掩码不能为255.255.255.255 或 255.255.255.254'
		}
	}
	validate(_valid, rule, cb)
}

/**
 * 验证网段、掩码是否匹配
 * @param {String} net 网段
 * @param {String} mask 掩码
 */
export const matchValidator = (net, mask) => {
	net = utils.ipToLong(net)
	mask = utils.ipToLong(mask)
	if ((net & ~mask) == 0) {
		return true
	}
	return false
}

/**
 * 验证vlanid是否有效
 * @param {Int} vlanid vlanid
 */
export const vlanidOldValidator = (rule, vlanid, cb) => {
	if (vlanid === '' || vlanid === undefined) {
		return cb()
	}

	rule.message = rule.message || 'VLAN ID的范围为2~232和234~4090'
	let _valid = utils.isBetween(vlanid, 2, 232) || utils.isBetween(vlanid, 234, 4090)

	if (_valid) {
		rule.message = '请输入整数'
		return intValidator(rule, vlanid, cb)
	}
	validate(_valid, rule, cb)
}

/**
 * 验证ip是否有效
 * @param {String} ip ip字符串
 */
export const ipValidator = (rule, ip, cb) => {
	if (ip === '') {
		return cb()
	}
	rule.message = rule.message || '请输入有效的IP地址'
	let _valid = utils.isIp(ip)
	validate(_valid, rule, cb)
}

/**
 * 验证ip是否有效(严格校验)
 * @param {String} ip ip字符串
 */
export const strictIpValidator = (rule, ip, cb) => {
	if (ip === '') {
		return cb()
	}
	rule.message = rule.message || '请输入有效的IP地址'
	let _valid = utils.isStrictIP(ip)
	validate(_valid, rule, cb)
}

/**
 * 验证url是否有效
 * @param {String} url url字符串
 */
export const urlValidator = (rule, url, cb) => {
	if (url === '') {
		return cb()
	}
	rule.message = rule.message || '请输入有效的网址'
	let _valid = utils.isUrl(url)
	validate(_valid, rule, cb)
}

/**
 * 验证dns是否有效
 * max:最多个数
 * message:错误提示信息
 * @param {String} dns dns
 */
export const dnsValidator = (rule, dns, cb) => {
	if (dns === '') {
		cb()
	} else {
		rule.message = rule.message || '格式：114.114.114.114，多个以空格隔开'
		let _max = rule.max || 5
		let _dns = dns
			.replace(/^\s*|\s*$/g, '')
			.replace(/\s+/g, ' ')
			.split(/\s+/)
		if (_dns.length > _max) {
			rule.message = `最多支持${_max}个地址`
			validate(false, rule, cb)
		} else {
			let _dnsSet = new Set(_dns)
			if (_dns.length !== _dnsSet.size) {
				rule.message = '输入的地址存在重复'
				validate(false, rule, cb)
			}
		}
		let _valid = _dns.every((d) => {
			return utils.isIp(d)
		})
		validate(_valid, rule, cb)
	}
}

/**
 * 验证域名是否有效
 * @param {String} url url字符串
 */
export const domainValidator = (rule, url, cb) => {
	if (url === '') {
		return cb()
	}
	rule.message = rule.message || '请输入有效的域名或IP地址'
	let _valid = utils.isDomain(url)
	validate(_valid, rule, cb)
}
/**
 * 验证网段是否有效
 * @param {String} net net字符串
 */
export const netValidate = (rule, net, cb) => {
	if (net === '') {
		return cb()
	}
	rule.message = rule.message || '请输入有效的网段'
	let _valid = utils.isNetSeg(net)
	validate(_valid, rule, cb)
}

/**
 * 验证起始地址是否有效
 * @param {String} ip ip字符串
 */
export const starValidate = (rule, star, cb) => {
	if (star === '') {
		return cb()
	}
	rule.message = rule.message || '数值必须在2~254之间'
	let _star = utils.isBetween(star, 2, 254)
	validate(_star, rule, cb)
}

/**
 * 验证端口是否有效
 * @param {String} port port
 */
export const portValidate = (rule, port, cb) => {
	if (port === '') {
		return cb()
	}
	let _valid = utils.isBetween(port, 1, 65535)
	rule.message = rule.message || '请输入有效的端口号（1-65535）'
	validate(_valid, rule, cb)
}

/**
 * 验证整数
 * @param {Int} val val
 */
export const intValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.intValidate(val)
	rule.message = rule.message || '格式错误，请输入正整数'
	validate(_valid, rule, cb)
}

/**
 * 验证mac地址
 * @param {String} val val
 */
export const macValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.macValidate(val)
	rule.message = rule.message || '格式：00:11:22:33:44:55'
	validate(_valid, rule, cb)
}

/**
 * 验证名称不可包含单双引号
 * @param {String} val val
 */
export const quoteValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.quoteValidate(val)
	rule.message = rule.message || '名称不可包含英文单引号，双引号'
	validate(!_valid, rule, cb)
}

/**
 * 数字、字母、下划线、中划线、@、&、空格
 * @param {String} val val
 */
export const wifiNameValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = /^[\d\w_\-@&\s\u4e00-\u9fa5]+$/g.test(val)
	rule.message = rule.message || '字母、数字、下划线、中划线、@、&、空格、中文'
	validate(_valid, rule, cb)
}

/**
 * 非中文有效性
 * @param {String} val val
 */
export const chineseValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.chineseValidate(val, rule.flag)
	rule.message = rule.message || '名称不可包含中文' + (rule.flag ? '（包含中文字符）' : '')
	validate(!_valid, rule, cb)
}

/**
 * 非中文标点符号有效性
 * @param {String} val val
 */
export const chineseTagValidator = (rule, val, cb) => {
	if (!val || val === '') {
		return cb()
	}
	let _valid = utils.chineseTagRegexp.test(val)
	rule.message = rule.message || '名称不可包含中文标点符号'
	validate(!_valid, rule, cb)
}

/**
 * ssid名称有效性
 * @param {String} val val
 */
export const ssidNameValidator = (rule, val, cb) => {
	if (!val || val === '') {
		return cb()
	}
	let _size = rule.size || 32
	let _hasWhite = /\s+/.test(val)
	let _valid = utils.lengthValidate(val, 0, _hasWhite ? _size - 2 : _size, 3)
	rule.message = rule.message || `名称不能超过${_size}个字符（单个中文占3个字符）`
	validate(_valid, rule, cb)
}

/**
 * 名称长度有效性
 * @param {String} val val
 */
export const nameLengthValidator = (rule, val, cb) => {
	if (!val || val === '') {
		cb()
	} else {
		let _min = rule.min || 0
		let _max = rule.max || rule.size || 32
		let _flag = rule.flag || false
		let _size = rule.c_size || 3
		let _valid = utils.lengthValidate(val, _min, _max, _flag, _size)
		let _msg = ''
		if (_min) {
			_msg = `字符长度${_min}-${_max}（单个中文占${_size}个字符）`
		} else {
			_msg = `名称不能超过${_max}个字符（单个中文占${_size}个字符）`
		}
		rule.message = rule.message || _msg
		validate(_valid, rule, cb)
	}
}

/**
 * 验证mtu
 * @param {String} val val
 */
export const mtuValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.isBetween(val, 576, 1500)
	rule.message = rule.message || 'MTU介于576~1500'
	validate(_valid, rule, cb)
}

/**
 * 验证通用密码
 * @param {String} val val
 */
export const passwdValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.pwdValidate(val)
	rule.message = rule.message || '仅限字母、数字和<=>[]!@#$*().符号'
	validate(_valid, rule, cb)
}
// web管理密码
export const webPasswdValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = false
	if (/[\u4E00-\u9FA5\uFF00-\uFFFF? ]/.test(val)) {
		rule.message = '不能包含中文、全角字符、问号和空格'
	} else if (/^[0-9]+$/.test(val)) {
		rule.message = '不能全数字'
	} else if (/^[a-z|A-Z]+$/.test(val)) {
		rule.message = '不能全字母'
	} else if (/^\S*admin\S*$/.test(val)) {
		rule.message = '不能包含admin'
	} else {
		_valid = true
	}
	validate(_valid, rule, cb)
}

/**
 * 验证hostName
 * @param {String} val val
 */
export const hostNameValidator = (rule, val, cb) => {
	if (val === '') {
		return cb()
	}
	let _valid = utils.hostNameValidate(val)
	rule.message = rule.message || '限中文,英文字母，数字，下划线，-，#或@'
	validate(_valid, rule, cb)
}

/**
 * 数字范围通用验证
 * @param {String} val val
 */
export const rangeValidator = (rule, value, cb) => {
	if (value === '') {
		return cb()
	}
	let _valid = utils.isBetween(value, rule.min || 0, rule.max || Infinity)
	rule.message = rule.message || `取值范围 ：${rule.min}~${rule.max}`
	if (!rule.isFloat && _valid) {
		rule.message = '请输入整数'
		return intValidator(rule, value, cb)
	}
	validate(_valid, rule, cb)
}

/**
 * 数字范围通用验证
 * message:错误提示信息
 * isFloat:是否可以浮点数
 * @param {String} val val
 */
export const rangeHexValidator = (rule, value, cb) => {
	if (value === '') {
		cb()
	} else {
		if (!/^[\da-f]+$/.test(value)) {
			rule.message = '请输入正确的十六进制数'
			validate(false, rule, cb)
		}
		let _valid = utils.isBetween(
			parseInt(value, 16),
			parseInt(rule.min, 16),
			parseInt(rule.max, 16)
		)
		rule.message = rule.message || `取值范围 0x${rule.min}~0x${rule.max}`
		validate(_valid, rule, cb)
	}
}

/**
 * 验证mac地址(严格匹配)
 * @param {String} val val
 */
export const macStrictValidator = (rule, val, cb) => {
	if (val === '') {
		cb()
	} else {
		let _valid = utils.macValidate(val)
		rule.message = rule.message || '格式：00:11:22:33:44:55'
		if (!_valid) {
			return validate(false, rule, cb)
		}
		if (val === '00:00:00:00:00:00' || val.toLowerCase() === 'ff:ff:ff:ff:ff:ff') {
			rule.message = '无效的MAC地址（不能为全0或则全f）'
			return validate(false, rule, cb)
		}
		// 组播mac
		if (parseInt(val.split(':')[0], 16) % 2 === 1) {
			rule.message = 'MAC地址不能为组播地址'
			return validate(false, rule, cb)
		}
		validate(true, rule, cb)
	}
}

/**
 * 验证vlanid是否有效
 * message:错误提示信息
 * @param {Int} vlanid vlanid
 */
export const vlanidValidator = (rule, vlanid, cb) => {
	if (vlanid === '') {
		cb()
	} else {
		let _mes = rule.m ? 'VLAN范围如（3-5,100）' : 'VLAN ID的范围为1~4094'
		rule.message = rule.message || _mes
		let _valid = utils.vlanValidate(vlanid, rule.m)
		validate(typeof _valid === 'boolean', rule, cb)
	}
}
