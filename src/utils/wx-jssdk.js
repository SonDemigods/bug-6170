import callApi from './callApi.js';

export default {
  /**
   * 朋友圈 菜单列表
   */
  menuListTemplate: [
    'menuItem:share:appMessage',
    'menuItem:share:timeline',
    'menuItem:share:qq',
    'menuItem:share:weiboApp',
    'menuItem:favorite',
    'menuItem:share:facebook',
    'menuItem:share:QZone',
    'menuItem:editTag',
    'menuItem:delete',
    'menuItem:copyUrl',
    'menuItem:originPage',
    'menuItem:readMode',
    'menuItem:openWithQQBrowser',
    'menuItem:openWithSafari',
    'menuItem:share:email',
    'menuItem:share:brand'
  ],

  /**
   * 通过config接口注入微信权限验证配置
   * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
   * @param {*} params1 默认的注入配置参数对象，可支持调用接口返回的配置参数
   * @param {*} params2 支持外部传参配置
   * @return {promise} 返回promise对象
   */
  initWxJsSDK({debug = false, appId = '', timestamp = 0, nonceStr = '', signature = '', jsApiList = []} = {}, params = {}) {
    let config = {
      debug,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList
    };

    if (appId == '' || timestamp == 0 || nonceStr == '' || signature == '') {
      throw new Error('Missing parameter wx-jssdk-45');
    }

    Object.assign(config, {
      debug: false,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'hideMenuItems',
        'showMenuItems',
        'scanQRCode'
      ]
    });

    let has = Object.prototype.hasOwnProperty;
    if (!!has.call(params, 'jsApiList') && params['jsApiList'].length > 0) {
      config.jsApiList = [...new Set([...config.jsApiList, ...params['jsApiList']])];
    }

    return new Promise((resolve, reject) => {
      wx.config(config);
      wx.ready(() => {
        resolve();
      });
      wx.error((response) => {
        reject('wx.config失败:' + JSON.stringify(response));
      });
    });
  },

  /**
   * 获取微信jssdk权限注入时需要的appId,nonceStr,signature等参数信息并进行权限注入
   * @param {string} apiUrl 获取微信jssdk签名,默认地址'/wx/getSignature'
   * @param {object} params 自定义参数，可选
   * @return {promise} 返回promise对象
   */
  getWxSignature(apiUrl = '/wx/getSignature', {params = {}} = {}) {
    let requestparams = Object.assign({
      url: window.location.href.split('#')[0]
    }, params);

    return new Promise((resolve, reject) => {
      callApi({
        api: apiUrl,
        data: requestparams,
        success: (signatureParams) => {
          if (!window.wx) {
            reject('wx ubdefined');
            return;
          }

          this.initWxJsSDK(signatureParams).then(() => resolve());
        },
        error: (res) => {
          console.log(`getJsSDKError: ${JSON.stringify(res)}`);
          reject('getJsSDKError');
        }
      });
    });
  },

  /**
   * 设置微信分享
   */
  setWxShare({isShare = false, shareDetail = {}} = {}) {
    let shareMsg = {
      // 分享到朋友圈title
      titleCircle: '',
      // 分享给朋友title
      titleFriend: '',
      // 分享icon
      imgUrl: '',
      // 分享到朋友圈的描述
      desc: '',
      // 分享链接
      link: ''
    };
    let menuList = this.menuListTemplate;

    if (isShare) {
      return new Promise((resolve, reject) => {
        if (!window.wx) {
          reject('wx undefined');
          return;
        }

        for(let [key, value] of Object.entries(shareDetail)) {
          switch (key) {
            case 'title':
              shareMsg['titleCircle'] = shareMsg['titleFriend'] = value;
              break;
            case 'titleCircle':
              shareMsg['titleCircle'] = value;
              break;
            case 'titleFriend':
              shareMsg['titleFriend'] = value;
              break;
            case 'imgUrl':
              shareMsg['imgUrl'] = value;
              break;
            case 'desc':
              shareMsg['desc'] = value;
              break;
            case 'link':
              shareMsg['link'] = value;
              break;
            default:
              break;
          }
        }

        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: shareMsg.titleCircle,
          link: shareMsg.link,
          imgUrl: shareMsg.imgUrl,
          success() {
            resolve('sendTimeline');
          },
          cancel() {
            reject('sendTimeline');
          }
        });

        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: shareMsg.titleFriend,
          desc: shareMsg.desc,
          imgUrl: shareMsg.imgUrl,
          link: shareMsg.link,
          success() {
            resolve('sendAppMessage');
          },
          cancel() {
            reject('sendAppMessage');
          }
        });

        // 批量显示功能按钮
        wx.showMenuItems({ menuList });
      });
    } else {
      this.forbidenShare();
    }

  },

  /**
   * 禁止分享和相关操作
   */
  forbidenShare() {
    let menuList = this.menuListTemplate;

    if (!window.wx) {
      function onBridgeReady() {
        typeof WeixinJSBridge != "undefined" && WeixinJSBridge.call('hideOptionMenu');
      }

      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
      return;
    }

    // 批量隐藏功能按钮
    wx.hideMenuItems({ menuList });
  },

};

