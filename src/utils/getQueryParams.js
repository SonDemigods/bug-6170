/**
 * 获取URL上的查询参数
 * 使用：getQueryParams()
 */
const getQueryParams = () => {
    const href = window.location.href;

    if (href === '') return {};

    let result = {},
        pos = [];

    // 获取所有?位置
    for (let i = 0; i < href.length; i++) {
        if (href[i] === '?') {
            pos.push(i);
        }
    }

    if (!pos.length) return {};

    // 获取所有查询参数
    for (let i = 0; i < pos.length; i++) {
        if (i < pos.length - 1) {
            result = Object.assign({}, result, splitParams(href.substring(pos[i], pos[i + 1])));
        }
        else {
            result = Object.assign({}, result, splitParams(href.substring(pos[i])));
        }
    }
    return result;
};

const splitParams = (str) => {
    let result = {};

    if (str === '') return {};

    // 第1个为?，截掉
    str = str.substring(1);

    // str后边可能有hash值，截掉（/#/，#/，/#三种形式）
    let pos = 0,
        hashPos = str.indexOf('#');

    if (hashPos > -1) {
        pos = hashPos;
        if (pos > 0 && str[pos - 1] === '/') {
            pos = pos - 1;
            str = str.substring(0, pos);
        }
    }

    let strArr = str.split('&');
    for (let i = 0; i < strArr.length; i++) {
        let temp = strArr[i].split('=');
        result[temp[0]] = temp[1] ? decodeURIComponent(temp[1].split('#')[0]) : '';
    }

    return result;
};

export default getQueryParams;
