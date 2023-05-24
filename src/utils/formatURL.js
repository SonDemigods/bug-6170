/**
 * 将 URL 序列化为 location 对象形式返回
 * @param {*} url
 */
export const URL = (url = window.location.href) => {
  let a = document.createElement('a');

  // 处理 hash 形式的URL
  let index = url.indexOf('#');
  let params = url.indexOf('?');

  a.href = index > -1 ? url.slice(0, index) + url.slice(index + 2) : url;

  return {
    host: a.host,
    hostname: a.hostname,
    origin: a.origin,
    href: a.href,
    port: a.port,
    protocol: a.protocol,
    params: decodeURI(a.search).slice(1),
    paramsSerialize() {
      let paramsArray = this.params.split('&');
      let temp = {};
      // 处理无请求参数
      if (!this.params.length) return temp;
      for (let item of paramsArray) {
        let itemTemp = item.split('=');
        // 处理某一参数值为空
        temp[itemTemp[0]] = itemTemp[1] ? decodeURIComponent(itemTemp[1]) : '';
      }
      return temp;
    },
    search(query) {
      let regex = new RegExp('[\?|&|=]' + query + '=([^&#]*)');
      let results = regex.exec('?' + this.params);
      return results == null ? '' : decodeURIComponent(results[1]);
    }
  };
};
