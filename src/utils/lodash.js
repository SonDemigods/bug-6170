
function type (value) {
	var exp = toString.call(value);
	var exec = /^\[Object (\w+)\]/i.exec(exp);
	return exec ? exec[1].toLowerCase() : typeof value;
}
export function isPlainObject (value) {
	return type(value) == 'object';
}

export function isArray (value) {
	return type(value) == 'array';
}
export function isFunction (value) {
	return typeof value === 'function';
}
export function isBoolean (value) {
	return type(value) == 'boolean';
}
export function isElemNode (value) {
	return !!value && typeof value === 'object' && ([1, 9].indexOf(value.nodeType) >= 0);
}
//数组去重
export function unique (arr) {
	var newArr = [], len = arr.length, map = new Map();
	for (let i = 0; i < len; i++) {
		if (!map.get(arr[i])) {
			map.set(arr[i], 1);
			newArr.push(arr[i]);
		}
	}
	map.clear();
	return newArr;
}
//深度拷贝
export function cloneDeep (obj) {
	var newObj = {};
	function clone (newObj, obj) {
		Object.keys(obj).forEach((key) => {
			let value = obj[key];
			if (isArray(value)) {
				clone(newObj[key] = [], value);
			} else if (isPlainObject(value)) {
				clone(newObj[key] = {}, value);
			} else {
				newObj[key] = obj[key];
			}
		});
		return newObj;
	}
	return clone(newObj, obj);
}
//根据时间戳拿到时间对象
export function getObjByTimestamp (timestamp) {
	var d = new Date(timestamp);
	var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	return {
		y: d.getFullYear(),
		M: d.getMonth() + 1,
		d: d.getDate(),
		h: d.getHours(),
		m: d.getMinutes(),
		s: d.getSeconds(),
		w: d.getDay(),
		week: weeks[d.getDay()]
	};
}
//滚动 0-->400 200ms
export function ScrollTo (start, end, during = 500, cb) {
	var times = Math.ceil(during / (1000 / 60)); //运行的次数
	var piece = (end - start) / times;
	var pos = start;
	var fn = fn => setTimeout(fn, 1000 / 60);  //每一帧运行fn
	var scroll = () => {
		if (times <= 0) {
			return;
		}
		pos += piece;
		if (cb) {
			cb(pos);
		} else {
			window.scrollTo(0, pos);
		}

		times--;
		fn(scroll);
	};
	return fn(scroll);
}

export function getOffset (dom) {
	if (!dom) {
		return { left: 0, top: 0 };
	}
	var left = dom.offsetLeft;
	var top = dom.offsetTop;
	var parent = dom.offsetParent;
	while (parent && parent !== document) {
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return { left, top };
}
export function markUrl (url = location.href, obj) {
	return url + '?' + Object.keys(obj).map((key) => `${key}=${obj[key]}`).join('&');
}
export function queryUrl (key, url = location.href) {
	var reg = new RegExp('(?:\\?|&)' + key + '=([^?&#]+)');
	var exec = reg.exec(url);
	return exec && exec[1] || '';
}
export function getUrlQuery (search) {
	let query = {}, searchArray;
	if (typeof search !== 'string') {
		console.error('The type of getUrlQuery\'s param should be string!');
		return {};
	}
	if (search.indexOf('?') === 0) {
		search = search.substring(1);
	}

	searchArray = search.split('&');
	searchArray.forEach(item => {
		const arr = item.split('=');
		query[arr[0]] = decodeURIComponent(arr[1]);
	});

	return query;
}

export const browser = {
	versions: (function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1,
			presto: u.indexOf('Presto') > -1,
			webKit: u.indexOf('AppleWebKit') > -1,
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
			iPhone: u.indexOf('iPhone') > -1,
			iPad: u.indexOf('iPad') > -1,
			webApp: u.indexOf('Safari') == -1,
		};
	})(),
	language: (navigator.browserLanguage || navigator.language)
		.toLowerCase(),
};
//是否微信公众号浏览器打开
export function isWeiXin () {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	}
	return false;
}
//数字转中文
export function toChinesNum (num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九'];
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
  　　let strArr = temp.toString().split("").reverse();
  　　let newNum = "";
      if (temp > 9 && temp < 20) {
         return changeNum[temp]
      }
  　　for (var i = 0; i < strArr.length; i++) {
    　　newNum = (i == 0 && strArr[i] == 0
        ? ""
        : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ""
          : (changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum);
  　　}
   　 return newNum;
 }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {　　　　　　noWan = "0" + noWan;　　　 }
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
