/*
 * Js Sdk wrapper
 *
 * detail doc please visit [js sdk](http://10.1.1.217/eh-engineering/eh-blogging/wikis/Zuolin-JS-SDK)
 *
 */

/**************************************************************
 * HOW TO USE
 *
 * import jssdk from './Jssdk'
 *
 * if (jssdk.ready()) {
 *   jssdk.pickImage({
 *     sourceType: 'album',
 *     success: (res) => {
 *       // do sth
 *     },
 *     cancel: () => {
 *       // do other thing
 *     }
 *   })
 * }
 **************************************************************/

let api = {};

// if jssdk is loaded
api.ready = () => !!window.ehopenapi;
// whether exist a function in sdk
api.exist = (func) => api.ready() && !!window.ehopenapi[func];

let apiFuncs = [
	'chooseImage',
	'pickImage',
	'uploadImage',

	'serviceAddressConfirm',
	'currentCommunity',
	'currentScene',

	'getLocation',

	'pay',

	'onBackPressed',
	'onBackPressedIntercept',

	'track',

	'hideNavbar',
	'showNavbar',
	'closeWindow',
	'hideMenu',
	'print',
	'qrParse',

	'configTitle',
	'configMenuList',
	'msgTo',
	'share',
	'router',
	'msgTo',

	'configNavigationBar',
	'closeWindowAndRouteTo'
];

for (let f of apiFuncs) {
	api[f] = (param) => {
		window.ehopenapi && window.ehopenapi[f] && window.ehopenapi[f](param);
	};
}

export default api;

export const LOCATION_ERROR_CODE = {
	0: '未知错误',
	1: '网络异常',
	2: 'key相关错误',
	3: '参数错误',
	4: '无定位权限',
	5: '数据解析错误',
};
