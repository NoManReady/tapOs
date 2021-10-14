/**
 *
 * 网络相关工具
 *
 */

function err(msg) {
	try {
		throw new Error(msg)
	} catch (e) {}
}

export const ipRegexp =
	/^((25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)$/

export const ipRangeRegxp =
	/^((25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\s*-\s*((25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)$/

export const portRangeRegxp =
	/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])\s*-\s*([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])$/

export const intRegexp = /^-?[1-9]\d*$/

export const positiveRegexp = /^\d+(?=\.{0,1}\d+$|$)/

export const macRegexp = /^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/

export const pwdRegexp = /^[0-9a-zA-Z<=>\[\]!@#$*\(\)\.]+$/

export const quoteRegexp = /[\'\"]/

export const chineseRegexp = /[\u4e00-\u9fa5]/

// 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
export const chineseTagRegexp =
	/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/

export const chineseFlagRegexp = /[\ufe30-\uffa0]/

// export const netSegment = /^((?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5]))\.){2}(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))(?:(?:\.(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))(\/(?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5]))))?|(\/(?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))\.(?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))))$/

export const netSegment =
	/^((25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\/([1-9]|[1-2][0-9]|30|31|32)$/

export const urlRegexp =
	/^((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?((([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:([1-9]?[0-9]|[1-9][0-9]{2}|[1-9][0-9]{3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5]))?((\/?)|(\/[\0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/

// 不包含http头的网址（域名） 或 IP
export const domainRegexp =
	/^(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?((([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:([1-9]?[0-9]|[1-9][0-9]{2}|[1-9][0-9]{3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5]))?((\/?)|(\/[\0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/

// 最少两种字符组成
export const pwdRegexp1 = /^(?![\d]+$)(?![a-zA-Z]+$)(?![@!#$%^&*]+$)[\da-zA-Z@!#$%^&*]{8,20}$/

export const hostnameRegexp = /^[\u4e00-\u9fa5a-zA-Z0-9\_\-\#\@]+$/
/**
 * 判断是否为简单ip格式
 *
 * @param {ipstr} IP字符串
 * @return {boolean} bool
 */
export const isIp = (ip) => {
	return ipRegexp.test(ip)
}

/*
 * 对输入的IP地址进行严格校验 ip
 * {Boolean} 返回true or false
 */
export const isStrictIP = (ip) => {
	let _isIp = isIp(ip)
	if (!_isIp) {
		return false
	}
	let _ipArr = ip.split('.')
	if (_ipArr[0] == 0 || _ipArr[0] == 127 || parseInt(_ipArr[0]) >= 224) {
		return false
	}
	return true
}

/**
 * 判断是否为url地址
 *
 * @param {urlstr} url字符串
 * @return {boolean} bool
 */
export const isUrl = (url) => {
	return urlRegexp.test(url)
}
// 判断域名
export const isDomain = (url) => {
	return domainRegexp.test(url)
}

/**
 * 判断是否为网段
 *
 * @param {ipstr} IP字符串
 * @return {boolean} bool
 */
export const isNetSeg = (str) => {
	let _ip = str.split(/\//)[0]

	return isStrictIP(_ip) && netSegment.test(str)
}

/**
 * 判断是否为网段(1.1.1.1-2.2.2.2格式)
 *
 * @param {ipstr} IP字符串
 * @return {boolean} bool
 */
export const isIpRange = (str) => {
	if (ipRangeRegxp.test(str)) {
		let sIp = str.split(/\s*-\s*/)[0]
		let eIp = str.split(/\s*-\s*/)[1]
		if (ipToLong(sIp) <= ipToLong(eIp)) return true
		return false
	} else {
		return false
	}
}
/**
 * 判断是否为端口范围(1-65535格式)
 *
 * @param {str} 端口范围字符串
 * @return {boolean} bool
 */
export const isPortRange = (str) => {
	if (portRangeRegxp.test(str)) {
		// let sPort = str.split(/\s*-\s*/)[0]
		// let ePort = str.split(/\s*-\s*/)[1]
		// if (+sPort <= +ePort) return true
		return true
	} else {
		return false
	}
}
/**
 * IP地址转换成整型
 *
 * @param {ipstr} IP字符串
 * @return {iplong} 返回整型
 *
 */
export const ipToLong = (ipstr) => {
	var iplong
	var ipArr = new Array()
	ipArr = ipstr.split('.')
	iplong = (ipArr[0] << 24) + (ipArr[1] << 16) + (ipArr[2] << 8) + parseInt(ipArr[3], 10)
	return iplong
}

/**
 * 整型转换成IP地址
 *
 * @param {iplong} 待转换的整数.
 * @return {String} 返回IP格式的地址
 *
 */
export const longToIp = (iplong) => {
	let ips = [
		parseInt((iplong >> 24) & 0xff),
		parseInt((iplong >> 16) & 0xff),
		parseInt((iplong >> 8) & 0xff),
		parseInt(iplong & 0xff),
	]
	return ips.join('.')
}
/**
 * 根据掩码位数转换成掩码整型
 *
 * @param {netCode} IP/netCode  范围1-32位
 * @return {iplong} 返回整型
 *
 */
export const netCodeToLong = (netCode = 24) => {
	if (netCode < 0 && netCode > 32) {
		return netCode
	}
	return parseInt('1'.repeat(netCode), 2) << (32 - netCode)
}

/**
 * 掩码转反掩码
 *
 * @param subnetMask 子网掩码
 * @return 反掩码
 */
export const inverseSubnetMask = (subnetMask) => {
	if (!subnetMask) {
		return ''
	}
	if (!isIp(subnetMask)) {
		return subnetMask
	}
	return subnetMask.replace(ipRegexp, function (all, p1, p2, p3, p4) {
		return [255 - p1, 255 - p2, 255 - p3, 255 - p4].join('.')
	})
}

/**
 * 获取IP的网段地址
 *
 * @param {String} ip IP地址如192.168.23.5
 * @param {String} mask 子网掩码地址 255.255.255.0
 * @return {String} 网络标识，如192.168.23.0
 */
export const getNetCode = (ip, mask) => {
	let ipNum = ipToLong(ip)
	let maskNum = ipToLong(mask)
	let netNum = ipNum & maskNum
	return longToIp(netNum)
}

// 获取网段
export const getNetCodeNum = (ip, mask) => {
	let _ipNum = ipToLong(ip)
	let _maskNum = ipToLong(mask)
	let _netCode = _ipNum & _maskNum
	return _netCode
}

/**
 * 根据目标ip生成掩码
 * @param {String} ip ip字符串
 */
export const getMaskByIp = (ip) => {
	let zeroNum = 4
	let ipArr = ip.split('.')
	let mask
	if (!isIp(ip)) {
		err('无效的IP格式')
	}
	for (let i = 3; i >= 0; i--) {
		if (ipArr[i] == 0) {
			zeroNum--
			continue
		}
		break
	}
	switch (zeroNum) {
		case 4:
			mask = '255.255.255.255'
			break
		case 3:
			mask = '255.255.255.0'
			break
		case 2:
			mask = '255.255.0.0'
			break
		case 1:
			mask = '255.0.0.0'
			break
		case 0:
			mask = '0.0.0.0'
			break
	}
	return mask
}

/**
 * 验证是否在两个值之间
 * @param {Int} num 验证值
 * @param {Int} min 最小值
 * @param {Int} max 最大值
 */
export const isBetween = (num, min, max) => {
	return num >= min && num <= max
}

/**
 * 校验是否为ip掩码格式
 * @param {Int} num 验证值
 * @param {Int} min 最小值
 * @param {Int} max 最大值
 */
export const isMask = (mask) => {
	var num = ipToLong(mask)
	num = ~num + 1
	// 判断是否为2^n
	return (num & (num - 1)) == 0 && isIp(mask)
}

/**
 * 校验是否为mac掩码格式
 * @param {Int} mask macmask
 */
export const isMacMask = (mask) => {
	let _isMac = macValidate(mask)
	return _isMac && /^1+0*$/.test(parseInt(mask.split(':').join(''), 16).toString(2))
}

/**
 * 验证2个IP是否同属一个网段
 * @param {String} ip1 ip1
 * @param {String} ip2 ip2
 * @param {String} mask 掩码
 */
export const inSameNet = (ip1, ip2, mask) => {
	let net1 = getNetCode(ip1, mask)
	let net2 = getNetCode(ip2, mask)
	return net1 === net2
}

/**
 * 验证IP 是否在某个网段内
 * @param {String} ip ip
 * @param {String} mask 掩码
 * @param {String} netCode 网段
 */
export const ipInSubnet = (ip, mask, netCode) => {
	let net = getNetCode(ip, mask)
	return net === netCode
}

/**
 * 获取网关地址
 * @param {String} ip ip
 * @param {String} mask 掩码
 */
export const getGateway = (ip, mask) => {
	if (mask === '255.255.255.255') {
		return ip
	}
	let ipNum = ipToLong(ip)
	let maskNum = ipToLong(mask)
	let netNum = ipNum & maskNum
	let gateNum = netNum + 1
	return longToIp(gateNum)
}

/**
 * 获取无类IP网段范围
 * @param {String} ip ip
 * @param {String} mask 掩码
 */
export const getClasslessIp = (ip) => {
	let s = {}
	ip = ip.split('/')
	let shift = 32 - parseInt(ip[1])
	s.start = longToIp(ipToLong(ip[0]) & ((0xffffffff >> shift) << shift))
	s.end = longToIp(ipToLong(ip[0]) | ~((0xffffffff >> shift) << shift))
	return s
}

/**
 * 判断Int型
 * @param {int} val val
 */
export const intValidate = (val) => {
	return val == '0' || intRegexp.test(val)
}

/**
 * 判断正数
 * @param {int} val val
 */
export const positiveValidate = (val) => {
	return positiveRegexp.test(val)
}

/**
 * 判断是否包含单双引号
 * @param {String} val val
 */
export const quoteValidate = (val) => {
	return quoteRegexp.test(val)
}

/**
 * 判断字符长度有效性
 * @param {String} val val
 * @param {Int} val maxSize
 */
export const lengthValidate = (val, min = 0, max = 32, flag = false, size = 3) => {
	let _count = val.split('').reduce((c, s) => {
		if (chineseRegexp.test(s)) {
			return c + size
		}
		if (flag && chineseTagRegexp.test(s)) {
			return c + size
		}
		return c + 1
	}, 0)
	return _count <= max && _count >= min
}

/**
 * 判断中文字符
 * @param {String} val val
 * @param {Int} val maxSize
 */
export const chineseValidate = (val, flag = false) => {
	if (flag) {
		return chineseRegexp.test(val) || chineseTagRegexp.test(val)
	}
	return chineseRegexp.test(val)
}

/**
 * 密码通用校验
 * @param {String} val val
 */
export const pwdValidate = (val) => {
	return pwdRegexp.test(val)
}

/**
 * 验证hostName
 * @param {String} val val
 */
export const hostNameValidate = (val) => {
	return hostnameRegexp.test(val)
}

/**
 * 判断MAC
 * @param {String} val val
 */
export const macValidate = (val) => {
	return macRegexp.test(val)
}

/**
 * 验证vlan
 * @param {vlanid} val
 * @param {是否多个格式} m
 */
export const vlanValidate = (val, m) => {
	let _message = 'VLAN ID的范围为1~4094'
	let _vlans = []
	if (!val) {
		return 'VLAN ID必填'
	}
	if (m) {
		let _splits = val.replace(/\s*/, '').split(',')
		let _allValid = _splits.every((sp) => {
			return /^[1-9]\d*$|^[1-9]\d*\-[1-9]\d*$/.test(sp)
		})
		if (!_allValid) {
			return '格式错误，VLAN ID范围如（3-5,100'
		}
		_splits.forEach((sp) => {
			let _match = sp.match(/(\d+)-(\d+)/)
			if (_match) {
				let _v1 = +_match[1]
				let _v2 = +_match[2]
				if (_v1 > _v2) {
					;[_v2, _v1] = [_v1, _v2]
				}
				_vlans.push(_v1, _v2)
			} else {
				_vlans.push(sp)
			}
		})
	} else {
		if (!/^[1-9]\d*$/.test(val)) {
			return '格式错误，请输入正整数'
		}
		_vlans = [val]
	}
	let _valid = _vlans.every((v) => {
		return isBetween(v, 1, 4094)
	})
	if (!_valid) {
		return _message
	}
	return true
}
/**
 * 名字是否重复
 * @param {arr} Array 检测数组里是否存在
 * @param {val} String 当前值
 * @param {olVal} String 旧值（正在编辑的值）
 */
export const existValidate = (arr, val, oldVal) => {
	if (/[\u4e00-\u9fa5]/.test(oldVal)) {
		return false
	}
	if (arr.filter((v) => v !== oldVal).includes(val)) {
		return true
	}
	return false
}
/**
 * 获取IP的开始地址
 *
 * @param {String} ip IP地址如192.168.23.5
 * @param {String} netMask 子网掩码地址 255.255.255.0
 */
export const getLowAddr = (ip, netMask) => {
	var lowAddr = ''
	var ipArray = new Array()
	var netMaskArray = new Array()
	// I参数不正确
	if (4 != ip.split('.').length || '' == netMask) {
		return ''
	}
	for (var i = 0; i < 4; i++) {
		ipArray[i] = ip.split('.')[i]
		netMaskArray[i] = netMask.split('.')[i]
		if (ipArray[i] > 255 || ipArray[i] < 0 || (netMaskArray[i] > 255 && netMaskArray[i] < 0)) {
			return ''
		}
		ipArray[i] = ipArray[i] & netMaskArray[i]
	}
	// 构造最小地址
	for (var i = 0; i < 4; i++) {
		if (i == 3) {
			ipArray[i] = ipArray[i] + 1
		}
		if ('' == lowAddr) {
			lowAddr += ipArray[i]
		} else {
			lowAddr += '.' + ipArray[i]
		}
	}
	return lowAddr
}
/**
 * 获取IP的结束地址
 *
 * @param {String} ip IP地址如192.168.23.5
 * @param {String} netMask 子网掩码地址 255.255.255.0
 */
export const getHighAddr = (ip, netMask) => {
	var lowAddr = getLowAddr(ip, netMask)
	var hostNumber = getHostNumber(netMask)
	if ('' == lowAddr || hostNumber == 0) {
		return ''
	}

	var lowAddrArray = new Array()
	for (var i = 0; i < 4; i++) {
		lowAddrArray[i] = lowAddr.split('.')[i]
		if (i == 3) {
			lowAddrArray[i] = Number(lowAddrArray[i] - 1)
		}
	}
	lowAddrArray[3] = lowAddrArray[3] + Number(hostNumber - 1)
	//alert(lowAddrArray[3]);
	if (lowAddrArray[3] > 255) {
		var k = parseInt(lowAddrArray[3] / 256)
		//alert(k);
		lowAddrArray[3] = lowAddrArray[3] % 256
		//alert(lowAddrArray[3]);
		lowAddrArray[2] = Number(lowAddrArray[2]) + Number(k)
		//alert(lowAddrArray[2]);
		if (lowAddrArray[2] > 255) {
			k = parseInt(lowAddrArray[2] / 256)
			lowAddrArray[2] = lowAddrArray[2] % 256
			lowAddrArray[1] = Number(lowAddrArray[1]) + Number(k)
			if (lowAddrArray[1] > 255) {
				k = parseInt(lowAddrArray[1] / 256)
				lowAddrArray[1] = lowAddrArray[1] % 256
				lowAddrArray[0] = Number(lowAddrArray[0]) + Number(k)
			}
		}
	}

	var highAddr = ''
	for (var i = 0; i < 4; i++) {
		if (i == 3) {
			lowAddrArray[i] = lowAddrArray[i] - 1
		}
		if ('' == highAddr) {
			highAddr = lowAddrArray[i]
		} else {
			highAddr += '.' + lowAddrArray[i]
		}
	}

	return highAddr
}

/**
 * 获取主机数
 * F
 * @param netMask
 * @returns {Number}
 */
export const getHostNumber = (netMask) => {
	var hostNumber = 0
	var netMaskArray = new Array()
	for (var i = 0; i < 4; i++) {
		netMaskArray[i] = netMask.split('.')[i]
		if (netMaskArray[i] < 255) {
			hostNumber = Math.pow(256, 3 - i) * (256 - netMaskArray[i])
			break
		}
	}

	return hostNumber
}
