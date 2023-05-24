
const setWeappShare = (opt = {}) => {
	if (typeof window.wx !== 'undefined' && window.wx.miniProgram && window.wx.miniProgram.getEnv) {
		window.wx.miniProgram.getEnv((res = {}) => {
			if (res.miniprogram) {
				window.wx.miniProgram.postMessage({
					data: {
						shareTitle: opt.title,
						shareImg: opt.imgUrl,
						accessControlType: '', //1 是登陆 2是认证
						disabled: opt.disabled || false, //禁用分享
						url: location.href, // 页面唯一标识，也是默认的转发的链接
						shareUrl: opt.shareUrl || '', // 自定义转发的链接，不传则取location.href
						type: 'weapp-share',
					},
				}, '*');
			}
		});
	}
};
export default setWeappShare;
