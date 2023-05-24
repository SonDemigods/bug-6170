/**
 * 根据传入的时间戳毫秒数和展示样式格式化时间
 * @param {number} date 基于1970年1月1日（世界标准时间）起的毫秒数
 * @param {string} fmtExp 需要展示的时间样式，如'yyyy-MM-dd hh:mm:ss' -> ‘2017-08-31 13:23:20’,默认为'yyyy-MM-dd hh:mm'
 */
export const filterDate = function (date, fmtExp = 'yyyy-MM-dd hh:mm') {
  date = new Date(date);
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmtExp)) {
    fmtExp = fmtExp.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmtExp)) {
      fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }

  return fmtExp;
};

/**
 * 比较两个日期是否在同一年同一月同一天
 * @param {number} date_01 基于1970年1月1日（世界标准时间）起的毫秒数
 * @param {number} date_02 基于1970年1月1日（世界标准时间）起的毫秒数
 */
export const compareDate = (date_01, date_02) => {
  let compareResult = false;

  date_01 = new Date(date_01);
  date_02 = new Date(date_02);

  if (date_01.getFullYear() === date_02.getFullYear()) {
    if (date_01.getMonth() === date_02.getMonth()) {
      if (date_01.getDate() === date_02.getDate()) {
        compareResult = true;
      }
    }
  }

  return compareResult;

};
/**
 * 转换日期显示格式
 * if 目标年份小于当前年份：YYYY-MM-DD

else if 日期跨度大于等于2：MM-DD

else if 日期跨度等于1：昨天

else if 时间间隔大于1小时：N小时前

else if 时间间隔大于1分钟：N分钟前

else if 时间间隔大于0秒：刚刚

else if 目标年份大于当前年份：YYYY-MM-DD

else if 日期跨度小于等于-2：MM-DD

else if 日期跨度等于-1：明天

else if 时间间隔小于-1小时：N小时后

else if 时间间隔小于-1分钟：N分钟后

else：即将
 */
export const getCommentTime = (createTime) => {
  let now = new Date(),
    time = now.getTime();

  let createDate = new Date(createTime),
    year = createDate.getFullYear(),
    month = createDate.getMonth() + 1,
    date = createDate.getDate(),
    hour = createDate.getHours(),
    minute = createDate.getMinutes(),
    nowYear = now.getFullYear(),
    nowMonth = now.getMonth() + 1,
    nowDate = now.getDate(),
    nowHour = now.getHours(),
    nowMinute = now.getMinutes();

  month = month < 10 ? '0' + month : month;
  let numMonth = Number(month);
  date = date < 10 ? '0' + date : date;
  let numdate = Number(date);
  hour = hour < 10 ? '0' + hour : hour;
  let numhour = Number(hour);
  minute = minute < 10 ? '0' + minute : minute;
  let numminute = Number(minute);
  nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
  let numnowMonth = Number(nowMonth);
  nowDate = nowDate < 10 ? '0' + nowDate : nowDate;
  let numnowDate = Number(nowDate);
  nowHour = nowHour < 10 ? '0' + nowHour : nowHour;
  let numnowHour = Number(nowHour);
  nowMinute = nowHour < 10 ? '0' + nowMinute : nowMinute;
  let numnowMinute = Number(nowMinute);

  if (nowYear == year && nowMonth === month) {
    if (numnowDate - numdate == 1) {
      return '昨天';
    } else if (numnowDate - numdate > 1) {
      return `${month}-${date}`;
    } else if (time < createTime) {
      if (numdate - numnowDate >= 2) {
        return `${month}-${date}`;
      } else if (numdate - numnowDate == 1) {
        return '明天';
      } else {
        if (numhour - numnowHour >= 1) {
          if (numhour - numnowHour == 1) {
            if ((numminute - numnowMinute) >= 0) {
              return `${numhour - numnowHour}小时后`;
            } else {
              return `${numminute + 60 - numnowMinute}分钟后`;
            }
          }
          return `${numhour - numnowHour}小时后`;
        } else {
          if (Math.abs(numminute - numnowMinute) > 1) {
            return `${Math.abs(60 - numminute)}分钟后`;
          }
          return '即将';
        }
      }
    } else { //一天内的采用这种
      if (time - createTime < (60 * 1000)) {
        return '刚刚';
      } else if (time - createTime > (60 * 1000) && time - createTime < (60 * 1000 * 60)) {
        let t = parseInt((time - createTime) / 60000);
        return `${t}分钟前`;
      } else if (time - createTime > (60 * 1000 * 60)) {
        let t = parseInt((time - createTime) / (60000 * 60));
        return `${t}小时前`;
      }
    }
  } else if (nowYear == year && nowMonth !== month) {
    return `${month}-${date}`;
  }

  return `${year}-${month}-${date}`;
};
