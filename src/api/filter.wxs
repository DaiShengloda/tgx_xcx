// 字符串截取
var subString = function(value, length) {
    if (!value) {
        return "";
    }
    value = value.trim();
    if (value.length > length) {
        var first = value.toString().substring(0, length);
        value = first + "...";
    }
    return value;
}
 // 数字处理
var numberFormat = function(value) {
    value = parseInt(value);
    if (isNaN(value)) {
        return 0;
    }

    if (value >= 10000) {
        value = value + "";
        var len = value.length;
        value = value.slice(0, len - 3);
        return parseFloat(value / 10) + "万";
    } else {
        return value
    }
}
// 内容\n换成回车
var fmtContent = function(value) {
        value = value.split("\n").join("<br/>");
        return value;
}
// 过滤签到时间
var getQdDay = function(arry,day){
    var bool
    bool=(arry.indexOf(day)>-1)?true:false
    return bool;
}
module.exports = {
    subString: subString,
    numberFormat: numberFormat,
    fmtContent: fmtContent,
    getQdDay:getQdDay
}