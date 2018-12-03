const formatTime = date => {
  date = parseInt(date)
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  date = [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return date
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isSameDay = (d1, d2) => {
  return d1.toLocaleDateString() === d2.toLocaleDateString();
}

const isSameYear = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear();
}

/**
 * 根据时间自适应显示的方式
 * 同一天只显示小时:分钟
 * 同一年显示 月-日 小时:分钟
 * 不同年显示 年-月-日 时:分
 * @param value 时间戳或者 标准格式时间(yyyy-MM-dd HH:mm) 
 */
const formatTimeLocal = value => {
  var timestamp = parseInt(value);
  if (isNaN(timestamp)) {
    timestamp = value.replace(/-/g, '/');
  }
  let date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let today = new Date();

  let timeF = [hour, minute].map(formatNumber).join(":");
  if (isSameDay(date, today)) {
    return timeF;
  }
  if (isSameYear(date, today)) {
    return [month, day].map(formatNumber).join("-") + '  ' + timeF;
  }
  //return [year, month, day].map(formatNumber).join("-") + '' + timeF;
  return [year, month, day].map(formatNumber).join("-");
}

/**
 * 不做筛选
 * 时间戳或者 标准格式时间(yyyy-MM-dd HH:mm)
 */
const formatTimestamp = value => {
  var timestamp = parseInt(value);
  if (isNaN(timestamp)) {
    timestamp = value.replace(/-/g, '/');
  }
  let date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let timeF = [hour, minute].map(formatNumber).join(":");
  return [year, month, day].map(formatNumber).join("-") + ' ' + timeF;
}

/**
 * 卡券
 * 时间戳或者 标准格式时间(yyyy.MM.dd)
 */
const formatTimestampCard = value => {
  var timestamp = parseInt(value);
  if (isNaN(timestamp)) {
    timestamp = value.replace(/-/g, '/');
  }
  let date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let timeF = [hour, minute].map(formatNumber).join(":");
  return [year, month, day].map(formatNumber).join(".");
}

/**
 * 抽奖活动
 * 时间戳或者 标准格式时间(yyyy年MM月dd日)
 */
const formatTimestampAct = value => {
  var timestamp = parseInt(value);
  if (isNaN(timestamp)) {
    timestamp = value.replace(/-/g, '/');
  }
  let date = new Date(timestamp);
  const year = date.getFullYear()+'年';
  const month = date.getMonth() + 1+'月';
  const day = date.getDate()+'日';
  const hour = date.getHours();
  const minute = date.getMinutes();

  let timeF = [hour, minute].map(formatNumber).join(":");
  return [year, month, day].map(formatNumber).join("");
}

/**
 * 将时间戳转换为日期字符串
 */
const formatTimestampToDate = timestamp => {
  if(!timestamp){
    return '';
  }
  let time = Number.parseInt(timestamp);
  if (isNaN(time)) {
    throw new Error('formatTimestampToDate()出错,参数类型不是时间戳');
  }
  let date = new Date();
  date.setTime(timestamp);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year,month,day].map(formatNumber).join('-');
}

/**
 * 将数组分组
 * @param array 要分组的数组
 * @param subGroupLength 分组的长度
 */
const splitArray = function (array, subGroupLength) {
  let index = 0
  let newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}

/**
 * 获取系统可使用窗口高度
 * @returns {*}
 */
function getSystemInfoSync() {
  return wx.getSystemInfoSync()
}

// 公共方法
function tools(){
  return {
    // 设置本地储存
    setLocal: (name, value, type) => {
      if(typeof(name)=='number'){
        name=name+""
      }
      var curTime = new Date().getTime();
      if (!type || type == 2) { //默认设置-之前存在则使用创建时间
        var data = wx.getStorageSync(name);
        if (!data || data == "null") {
          wx.setStorageSync(name, {
            data: value,
            time: curTime
          })
        } else {
          var setTime = data.time;
          wx.setStorageSync(name, {
            data: value,
            time: setTime
          })
        }
      } else if (type == 1) { //type:1重新创建
        wx.setStorageSync(name, {
          data: value,
          time: curTime
        })
      }
    },

    //获取本地储存
    getLocal: (name, exp) => {
      if(typeof(name)=='number'){
        name=name+""
      }
      var data = wx.getStorageSync(name);
      if (!exp) {
        var exp = 1000 * 60 * 60 * 24 * 3;  //缓存存储时间 3天
      }
      if (data && new Date().getTime() - data.time > exp) {
        wx.removeStorageSync(name)
        console.log('信息已过期');
        return null;
      } else {
        var dataObjDatatoJson = !data ? null : data.data;
        return dataObjDatatoJson;
      }
    },

    //移除本地存储
    removeLocal: (name) => {
      wx.removeStorageSync(name);
    },

    // 首页推荐标签颜色匹配
    matchColor(hotcontents){
      var content_sign=hotcontents.content_sign
      var content_type=hotcontents.content_type
      var sign=hotcontents.sign
      var match=[
        {'text':'教育','color':'#4577dc'},
        {'text':'学堂','color':'#4577dc'},
        {'text':'课程','color':'#4577dc'},
        {'text':'策略','color':'#cdae48'},  
        {'text':'问股','color':'#ff6d1f'},
        {'text':'提示','color':'#ffa018'},
        {'text':'资讯','color':'#e83030'},
      ]
      var content,text
      if(content_type==4){
        content={'text':'问股','color':'#ff6d1f'}
      }else {
        for(var i in match){
          text=match[i].text
          if(text==sign){
            content=match[i]
            return content
          }
        }
      }  
      return content
    },
    //获取时间戳时差
    getTimeGap(start,end){
      var utc=end-start
      if(utc<0)return '00:00:00'
      var hours=parseInt(utc/(60*60*1000))
      hours=hours>9?hours:('0'+hours)
      var min=parseInt((utc-hours*60*60*1000)/(60*1000))
      min=min>9?min:('0'+min)
      var sec=parseInt((utc-hours*60*60*1000-min*60*1000)/(1000))
      sec=sec>9?sec:('0'+sec)
      return hours+':'+min+':'+sec
    },
    // 活动匹配路由
    getRouteByData(data){
      let pos,list = {}
      if(!data||data.length == 0)return list
      let temData = {
        '1':'pages/tabBar/index',
        '2':'pages/tabBar/bigMan',
        '3':'pages/tabBar/note',
        '4':'pages/tabBar/consult',
        '5':'pages/tabBar/userCenter',
        '6':'subPages/content/pages/bigManCourse',
        '7':'subPages/content/pages/report',
      }
      let pages = getCurrentPages()
      let currentPage = pages[pages.length - 1]
      let {route, options} = currentPage
      for(var i in data){
        pos = data[i].pos
        if(temData[pos] == route){
          list = data[i]
          return list
          break
        }
      }
      return list
    },

  }
}

//正则类
function regular() {
  return {
    //电话号码
    isPhone: function (phone) {
      var pattern = /^1[3,4,5,6,7,8,9]\d{9}$/;
      return pattern.test(phone);
    },
    //固定电话
    isTelPhone:function(telPhone){
      return /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/.test(telPhone);
    },
    //邮件
    isEmail: function (email) {
      var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
      return pattern.test(email);
    },
    //姓名
    isName: function (val) {
      var pattern = /^[\u4e00-\u9fa5a-zA-Z]{2,10}$/;
      return pattern.test(val);
    },
    //邮编
    isZip: function (val) {
      var pattern = /^[0-9]\d{5}$/;
      return pattern.test(val);
    },
    //身份证
    issfz: function (val) {
      var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return pattern.test(val);
    },
    //数字
    isNum: function (val) {
      var pattern = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
      return pattern.test(val);
    },
    //匹配中英文
    isChAndEn: function (val) {
      var pattern = /[a-zA-Z\u4e00-\u9fa5]+/g;
      return !pattern.test(val);
    }
  }
}

module.exports = {
  formatTime: formatTime,
  spiltArray: splitArray,
  getSystemInfoSync: getSystemInfoSync,
  regular: regular,
  formatTimeLocal: formatTimeLocal,
  formatTimestampToDate: formatTimestampToDate,
  tools: tools,
  formatTimestamp: formatTimestamp,
  formatTimestampCard: formatTimestampCard,
  formatTimestampAct: formatTimestampAct
}
