/**
 * 路由跳转处理
 * @author caojie
 */
//根目录
const PageNav = {
  root: "/pages/tabBar/",
  activity: "/subPages/activity/pages/",
  content: "/subPages/content/pages/",
  user: "/subPages/user/pages/"
}
//页面链接配置
const PageIndex = {
  /*-----------主要模块--------*/
  root: {
    index: `index`,//首页
    bigManIndex: `bigMan`,//大咖首页
    questionIndex: `consult`,//问股首页\ 
    noteIndex: `note`,//笔记首页
    userCenter: `userCenter`,//个人中心

    questionStock:`consult`,
    note:'note',//vip个人中心中笔记
  },
  /**----------分包模块---------- */

  /** ----------活动------------- */
  activity: {
    guess: `guess`,//大盘预测
    live:'live',
    sign: 'sign',
    adOne:'adOne',
    adTwo:'adTwo',
    adThree:'adThree',
    adFour:'adFour',
    adFive:'adFive',
    userAction:'userAction',
    activityOne:'activityOne',
  },
  /** ----------内容---------------*/
  content: {
    bigManDetail: `detail/bigManDetail`,//大咖详情
    questionDetail: `detail/quesDetail`,//问股详情
    noteDetail: `detail/noteDetail`,//笔记详情 
    noteDetailSec: `detail/noteDetailSec`,//笔记详情 
    courseDetail: `detail/courseDetail`,//课程详情 
    seriesDetail:'detail/seriesDetail',//系列详情
    reportDetail:'detail/reportDetail',//研报详情
    courseIndex: `bigManCourse`,//大咖课程
    vip:`vip`,//vip专区
    report:'report',//研报  
    contact:'contact',//客服
    share:'share',  //分享

    course:`bigManCourse`,//vip个人中心中大咖课程
    seriesCourse:'bigManCourse',//vip个人中心中大咖课程
    cardExclusive:`vip`,//vip个人中心--vip专区
  },
  /**------------用户中心--------------- */
  user: {
    login: `login`,//登录
    aboutApp: `aboutApp`,//关于app
    bindPhone: `bindPhone`,//绑定手机号
    coinRecharge: `coinRecharge`,//大咖币补充
    coinRechargeLog: `coinRechargeLog`,//大咖币补充记录
    fxcp: `fxcp`,//风险测评
    identifyCode: `identifyCode`,//验证码验证
    incomeLog: `incomeLog`,//收支记录
    mobileLogin: `mobileLogin`,//手机登录
    mobileRegister: `mobileRegister`,//手机注册
    myNotice: `myNotice`,//我的关注
    payConfirmBook: `payConfirmBook`,//使用确认书
    userCheckIn: `userCheckIn`,//用户登记
    webview: `webview`,//webview
    web: `webview`,//webview
    recharge: `coinRecharge`,//大咖币补充
    vipCenter:'vipCenter',//vip个人中心,
    vipPayLog:'vipPayDetail',//vip补充记录
    myCard:'myCard',
    myCardUsed:'myCardUsed',
    setPassword:'setpassword',  //设置密码
  }
}
let routes = {};
for (let name in PageIndex) {
  for (let page in PageIndex[name]) {
    routes[page] = PageNav[name] + PageIndex[name][page]
  }
}

function parseUrl(url) {
  url=formatUrl(url)
  let index = url.indexOf('?');
  let path, queryString;
  if (index == -1) {
    path = url;
    queryString = '';
  } else {
    path = url.substring(0, index);
    queryString = url.substr(index);
  }
  let page = routes[path];
  if (!page) {
    throw '不支持的跳转链接:' + page;
  }
  return page + queryString;
}

function formatUrl(url){
  url=url.replace("jingu://","")
  return url
}

/** ---------暴露出去的api------ */

/**
 * 保留当前页面，跳转到应用内的某个页面，
 * 使用wx.navigateBack可以返回到原页面。
 */
function navigateTo(param) {
  param.url = parseUrl(param.url);
  wx.navigateTo(param);
}

/**
 * 
 *关闭当前页面，返回上一页面或多级页面。
 */
function navigateBack(param) {
  wx.navigateBack(param);
}

/**
 *关闭当前页面，跳转到应用内的某个页面。
 */
function redirectTo(param) {
  param.url = parseUrl(param.url);
  wx.redirectTo(param);
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 */
function switchTab(param) {
  param.url = parseUrl(param.url);
  wx.switchTab(param);
}

/**
 * 关闭所有页面，打开到应用内的某个页面。
 */
function reLaunch(param) {
  param.url = parseUrl(param.url);
  wx.reLaunch(param);
}

export { navigateTo, navigateBack, redirectTo, switchTab, reLaunch }

