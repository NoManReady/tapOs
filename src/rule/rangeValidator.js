import { isIp, ipToLong, longToIp, isIpRange, isNetSeg, netCodeToLong } from '@/utils/rulesUtils'
// 获取ip范围
function getIpStartAndIpEnd(ipRange) {
	const _getRange = (ipLong = '', maskLong = '') => {
		if (is32Mask) {
			// 32位掩码特殊处理
			return {
				ipStart: ipLong & maskLong, //网段包含1-254,
				ipEnd: ipLong | ~maskLong, //网段包含1-254
			}
		}
		return {
			ipStart: (ipLong & maskLong) + 1, //网段包含1-254,
			ipEnd: (ipLong | ~maskLong) - 1, //网段包含1-254
		}
	}
	if (typeof ipRange === 'object') {
		// 对象{ipaddr, netmask}
		let _ipLong = ipToLong(ipRange.ipaddr || '')
		let _maskLong = ipToLong(ipRange.netmask || '255.255.255.0')
		let is32Mask = /\.255$/.test(ipRange.netmask)
		return _getRange(_ipLong, _maskLong, is32Mask)
	}
	if (ipRange.indexOf('/') !== -1) {
		// 1.1.1.1/24 掩码的范围格式
		const [ipaddr, netCode] = ipRange.split(/\s*\/\s*/)
		let _ipLong = ipToLong(ipaddr)
		let _maskLong = netCodeToLong(netCode)

		return _getRange(_ipLong, _maskLong, netCode == 32)
	} else if (isIp(ipRange) || isIpRange(ipRange)) {
		// 单个IP 或者 1.1.1.1-1.1.1.1.254 横杆的范围格式
		let _ips = ipRange.split(/\s*-\s*/)
		_ips[1] = _ips[1] || _ips[0]
		return {
			ipStart: ipToLong(_ips[0]),
			ipEnd: ipToLong(_ips[1]),
		}
	} else {
		return false // 格式错误
	}
}
// 判断ip范围是否重复覆盖
export const isExistIpRange = (ip, index, list) => {
	let _curIpRange = getIpStartAndIpEnd(ip)
	for (let i = 0; i < list.length; i++) {
		let _targetIp = list[i]
		if (i == index) {
			continue
		}
		let _targetIpRange = getIpStartAndIpEnd(_targetIp)
		if (_targetIpRange === false) {
			continue
		}
		if (
			_curIpRange.ipEnd < _targetIpRange.ipStart ||
			_curIpRange.ipStart > _targetIpRange.ipEnd
		) {
			continue
		}
		return true
	}
	return false
}
export const judgeIpRangeRules = (list, index) => {
	const isExistIp = (r, v, cb) => {
		if (isExistIpRange(v, index, list)) {
			return cb(new Error('IP已存在'))
		}
		cb()
	}
	const isLegalIp = (r, v, cb) => {
		if (!isIp(v) && !isIpRange(v)) {
			return cb(new Error('无效IP地址'))
		}
		cb()
	}
	return [
		{ required: true, message: 'IP地址不能为空' },
		{ validator: isLegalIp },
		{ validator: isExistIp },
	]
}

// 判断ip(地址或范围)是否在netList([{ipaddr,netmask}]的数组)包含的网段中
export const isIpInNet = (ip, netList = []) => {
	let _curIpRange = getIpStartAndIpEnd(ip)
	let _ipRangeList = netList.map((item) => getIpStartAndIpEnd(item))
	let isBelong = _ipRangeList.some((item) => {
		return _curIpRange.ipStart >= item.ipStart && _curIpRange.ipEnd <= item.ipEnd
	})
	return isBelong
}

export const ipNetValidate = (r, v, cb) => {
	if (v && !isNetSeg(v)) return cb(new Error('子网格式：192.168.110.0/24'))
	let _ip = v.split('/')
	let ip = longToIp(ipToLong(_ip[0]) & netCodeToLong(_ip[1]))
	if (_ip[0] !== ip) return cb(new Error('IP地址和子网掩码不在同一个网段'))
	cb()
}
