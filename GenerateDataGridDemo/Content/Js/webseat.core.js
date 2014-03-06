﻿/*
*Author  xj
*webseat.core.js
*/
var WebJs = window.WebJs || WebJs || {};
/******全局变量,存储全局变量var gData=******/
var gData = WebJs.Data = (function (gd) {
    return gd;
})(gData || {});
var utils = window.utils || {};
utils.str = utils.str || {};
utils.arr = utils.arr || {};
/**   
* 对Date的扩展，将 Date 转化为指定格式的String   
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符   
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
* eg:   
* utils.str.pattern(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
* utils.str.pattern(new Date(),"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04   
* utils.str.pattern(new Date(),"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04   
* utils.str.pattern(new Date(),"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04   
* utils.str.pattern(new Date(),"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
*/

utils.str.patternTime = function (str, fmt) {
    var o = {
        "M+": str.getMonth() + 1, //月份     
        "d+": str.getDate(), //日     
        "h+": str.getHours() % 12 === 0 ? 12 : str.getHours() % 12, //小时     
        "H+": str.getHours(), //小时     
        "m+": str.getMinutes(), //分     
        "s+": str.getSeconds(), //秒     
        "q+": Math.floor((str.getMonth() + 3) / 3), //季度     
        "S": str.getMilliseconds() //毫秒     
    },
        week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (str.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[str.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
utils.str.toDateTime = function (str, dateformat) {
    var date = new Date(parseInt(str.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
        currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    if (dateformat == "yyyy-mm-dd") {
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
};
utils.str.htmlEncode = function (str) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        //s = s.replace(/ /g, "&nbsp;");
        .replace(/'/g, "&apos;")
        .replace(/\"/g, "&quot;")
        .replace(/\\/g, "&#92;");
};
utils.str.htmlDecode = function (str) {
    return str.replace(/&amp;/g, "&")
         .replace(/&lt;/g, "<")
         .replace(/&gt;/g, ">")
    //s = s.replace(/&nbsp;/g, " ");
        .replace(/&#39;/g, "\'")
        .replace(/&quot;/g, "\"")
        .replace(/&#92;/g, '\\');
};
utils.str.cutStrings = function (str, length, hasEllipsis) {
    var newStr;
    if (str.length <= length)
        newStr = str;
    else
        newStr = str.substr(0, length);
    if (hasEllipsis) {
        newStr += "...";
    }
    return newStr;
};
utils.str.trim = function (val) {
    var str = this && this.toString();
    if (!val) {
        return str == '' ? str : str.replace(/(^\s*)/g, '').replace(/(\s*$)/g, '');
    }
    var s = new RegExp('^' + val + '*', 'g'), e = new RegExp(val + '*$', 'g');
    return str == '' ? str : str.replace(s, '').replace(e, '');
};
utils.str.ParseFloatAndToFixed = function (str, i) {
    return parseFloat(parseFloat(str).toFixed(i));
};
utils.str.isNullOrWhiteSpace = function (str) {
    // null、 ''、'   '、undefinded  →→return true
    return str == '' || str.trim() == '';
};
utils.str.startsWith = function (str, start, ignoreCase) { //start：欲判断字符， ignoreCase：是否忽略大小写
    if (str.isNullOrWhiteSpace()) {
        return false;
    }
    if (ignoreCase) {
        str = str.toLowerCase();
        start = start.toLowerCase();
    }
    return str.indexOf(start) == 0;
    //return s.isNullOrWhiteSpace() ? false : (ignoreCase && (s = s.toLowerCase(), start = start.toLowerCase()), s.substr(0, start.length) == start) ? true : false;
};
utils.str.endsWith = function (str, end, ignoreCase) { //end：欲判断字符， ignoreCase：是否忽略大小写
    if (str.isNullOrWhiteSpace()) {
        return false;
    }
    if (ignoreCase) {
        str = str.toLowerCase();
        end = end.toLowerCase();
    }
    if (str.substr(str.length - end.length) == end) { return true; }
    return false;
};
utils.str.contains = function (str, arg) {
    return !!~str.indexOf(arg);
};
utils.str.formatString = function () {
    for (var i = 1, len = arguments.length; i < len ; i++) {
        var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        arguments[0] = arguments[0].replace(exp, arguments[i]);
    }
    return arguments[0];
};
//数据中是否包括指定对象
utils.arr.contain = function (arr, fun) {
    for (var item in arr) {
        if (fun.constructor == Function) {
            if (fun(item)) return true;
        }
    }
    return false;
};
utils.arr.get = function (arr, fun) {
    for (var i in arr) {
        if (fun.constructor == Function) {
            if (fun(this[i])) return this[i];
        }
    }
    return null;
};
utils.arr.del = function (arr, n) { //n表示第几项，从0开始算起。
    //prototype为对象原型，注意这里为对象增加自定义方法的方法。
    if (n > arr.length - 1) {
        return arr;
    } else {
        //return  n < 0 ? this : this.slice(0, n).concat(this.slice(n + 1, this.length)); 
        var r = n < 0 ? arr : arr.splice(n, 1);//splice 先删除一段，再添加一段元素splice(开始，长度)  ，替换；//xj 
        return arr;
    }
    /*
　　　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
　　　　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
　　 　　　　　　组成的新数组，这中间，刚好少了第n项。
　　　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
　　*/
};
utils.arr.removeByValue = function (arr, val) {
    if (!val) {
        return arr;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return arr.del(i);
        }
    }
    return arr;
};
utils.arr.indexOf = function (arr, item, strict) { //strict：是否严格相等（===）
    var index = -1,
        length = arr.length;
    strict = strict ? true : false,
    i = 0;
    if (strict) {
        for (; i < length; i++) {
            if (arr[i] === item) {
                index = i;
                break;
            }
        }
    } else {
        for (i = 0; i < length; i++) {
            if (arr[i] == item) {
                index = i;
                break;
            }
        }
    }
    return index;
};
//ajax
utils.Ajax = function (url, data, callback, cfg) {
    cfg = (cfg || {});
    cfg.hasOwnProperty("async") || (cfg.async = "true");
    cfg.hasOwnProperty("type") || (cfg.type = "post");
    cfg.hasOwnProperty("cache") || (cfg.cache = true);
    cfg.hasOwnProperty("dataType") || (cfg.dataType = "json");//预期服务器返回的数据类型  xml, json, script, or html
    //if (!cfg.hasOwnProperty("contentType")) cfg.contentType = "application/json; charset=utf-8";//发送信息至服务器时内容编码类型。默认值是"application/x-www-form-urlencoded; 
    //cfg.hasOwnProperty("headers") || (cfg.headers = {
    //    "contentType": "application/json; charset=utf-8",
    //    "token": WebJs.Utils.GetCookie('Token') || "token"
    //});
    //if (cfg.hasOwnProperty("crossDomain")) {
    //url = url + (~(url.indexOf("?") >) ? "&" : "?") + "jsonpCallback=?";
    // }
    if (!callback) {
        callback = function () {
        };
    }
    //如果extend存在，证明加载了easyui的，如果不就没有加载easyui 相应的代码就不应该执行
    var extend = WebJs.EasyUiExtend;
    //声明opts 方便调试
    var opts = {
        type: cfg.type,
        url: url,
        async: cfg.async,
        data: data,
        cache: cfg.cache,
        timeout: 6e4,//60000
        //headers: cfg.headers,
        dataType: cfg.dataType,
        //contentType: cfg.contentType,
        beforeSend: cfg.hasOwnProperty("before") ? cfg.before : function () { },
        success: function (result, textStatus, jqXHR) {
            /*if (!!result) {
                try {
                    if (!!result.Type && result.Type == "string") {
                        result = result.Str;
                    }
                } catch (e) {
                }
            }*/
            extend && extend.ajaxLoadEnd();
            if (textStatus == 'success') {
                //setHeader(jqXHR);
                callback(result, jqXHR);
            } else {
                alert('服务端错误');
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrow) {
            extend && extend.ajaxLoadEnd();
            extend && WebJs.Common.ShowErrors(xmlHttpRequest, textStatus, errorThrow);
        }
    };
    extend && extend.ajaxLoading();
    $.ajax(opts);
};
//内部调用WebJs.Ajax，这里统一处理返回结果的状态
utils.AjaxHandle = function (url, data, callback, cfg) {
    WebJs.Ajax(url, data, function (result, jqXHR) {
        (result && result.Success)
            ? callback(result, jqXHR)
            : WebJs.Dialog.Content(result.Message);
    }, cfg);
};

utils.GetRandomUrl = function (url) { //为url添加随机数
    url = url || window.location.href;
    return ~url.indexOf("?") ? url + "&r=" + Math.random() : url + "?r=" + Math.random();
},
utils.Open = function (url) {
    window.open(url);
};
utils.RedirectTo = function (url) { //跳转页面
    window.location.href = url;
    window.event ? window.event.returnValue = false : event.preventDefault(); //for firefox 
};
utils.Cookie = function (cookieName, cookieValue, options) {
    options = options || { path: '/' };
    return $.cookie(cookieName, cookieValue, options);
};
utils.GetUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};
//解决上一个获取中文参数 encodeURI 乱码
utils.GetUrlParam2 = function (paras) {
    var url = location.href,
        paraString = url.substring(url.indexOf("?") + 1, url.length).split("&"),
        paraObj = {},
        j;
    for (var i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};
utils.SetUrlParam = function (name, value, url) {
    url = url ? url : window.location.href;
    var re = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "ig"),
        m = url.match(re);
    if (m) {
        return (url.replace(re, function ($0, $1, $2, $3) {
            if (value == undefined || value.isNullOrWhiteSpace()) {
                return $1 == '?' ? $1 : $3; //return ''; 20130910 xj 修正
            } else {
                return ($0.replace($2, value));
            }
        }));
    } else {
        if (value == undefined || value.toString().isNullOrWhiteSpace()) {
            return url;
        } else {
            if (url.indexOf('?') == -1)
                return (url + '?' + name + '=' + value);
            else
                return (url + '&' + name + '=' + value);
        }
    }
};
//设置标签获得焦点时键盘按下事件
utils.SetOnKeyUp = function (tag, opts) {
    opts = jQuery.extend({
        call: function () { return false; },
        params: -1
    }, opts || {});
    $(tag).on("focus", function () {
        this.keyup = function (e) {
            var keycode;
            if (navigator.appName == "Microsoft Internet Explorer") {
                keycode = event.keyCode;
            } else {
                keycode = e.which;
            }
            if (keycode == 13) {
                if (opts.params > 0)
                    opts.call(opts.params);
                else
                    opts.call();
            }
        };
    });
    $(tag).on("blur", function () {
        this.onkeyup = function () {
            return false;
        };
    });
};
utils.ClearForms = function (form) {
    var fr = form || 'body';
    $(':input', $(fr)).each(function () {
        var type = this.type,
            tag = this.tagName.toLowerCase();
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = "";
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};
utils.LoadJs = function (path, callback) {
    callback = !(typeof (callback) == "undefined") ? callback : function () {
    };
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera
        script.onload = function () {
            callback();
        };
    }
    script.src = path + ".js";
    oHead.appendChild(script);
};
utils.LoadCss = function (path) {
    if (!path) {
        throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var links = document.createElement('link');
    links.href = path + ".css";
    links.rel = 'stylesheet';
    links.type = 'text/css';
    head.appendChild(links);
};

//浏览器判断
utils.UsersBrowser = (function () {
    var ua = navigator.userAgent.toLowerCase(); //获取用户端信息
    function isIe() {
        var result = /msie/.test(ua) && !/opera/.test(ua); //匹配IE11以下 的IE浏览器
        // ReSharper disable once ExpressionIsAlwaysConst
        return result ? result : /trident/.test(ua);// For IE11
    }
    var info = {
        version: ua.match(/(?:firefox|opera|safari|chrome|msie|trident)[\/: ]([\d.]+)/)[1],
        ie: isIe(),
        op: /opera/.test(ua),  //匹配Opera浏览器
        sa: /version.*safari/.test(ua),  //匹配Safari浏览器
        ch: /chrome/.test(ua),  //匹配Chrome浏览器
        ff: /firefox/.test(ua) && !/webkit/.test(ua)  //匹配Firefox浏览器
    };
    return info;
}(WebJs));

//元素操作相关
utils.HtmlUtils = ((function () {
    function getElementPosition(e) {
        var x = 0, y = 0;
        while (e != null) {
            x += e.offsetLeft | 0;
            y += e.offsetTop | 0;
            e = e.offsetParent;
        }
        return { x: x, y: y };
    }
    function getViewPortSize(w) {
        w = w || window;
        if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };
        var d = w.document;
        if (document.compatMode == "CSS1Compat")
            return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
        return { w: d.body.clientWidth, h: d.body.clientHeight };
    }
    function getScrollOffsets(w) {
        w = w || window;
        if (w.pageXoffset != null) {
            return { x: w.pageXoffset, y: w.pageYoffset };
        }
        var d = w.document;
        if (document.compatMode == "CSS1Compat")
            return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };
        return { x: d.body.scrollLeft, y: d.body.scrollTop };
    }
    function getMousePos(event) {
        var e = event || window.event,
            scroll = getScrollOffsets(),
            x = e.pageX || e.clientX + scroll.x,
            y = e.pageY || e.clientY + scroll.y;
        return { 'x': x, 'y': y };
    }
    function getRect(element) {
        var rect = element.getBoundingClientRect();
        if (typeof rect.width === 'undefined') {
            return {
                width: rect.right - rect.left,
                height: rect.bottom - rect.top,
                top: rect.top,
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right
            };
        }
        return rect;
    }
    function getElementCenterPos(obj, cfg) {
        var $obj = $(obj);
        cfg = cfg || {};
        cfg.maxWidth = cfg.maxWidth || 900;
        cfg.maxHeight = cfg.maxHeight || 800;
        var ww = $obj.width(), //window width
                wh = $obj.height(),
                sch = $(window).height() | 0, //scree clientHeight
                scw = $(window).width() | 0,
                height = wh < sch - 20 && wh > cfg.maxWidth + 20 ? cfg.maxHeight : sch - 20,
                width = ww < scw - 20 && ww > cfg.maxHeight + 20 ? cfg.maxWidth : scw - 20;
        width = width >= cfg.maxWidth ? cfg.maxWidth : width;
        height = height >= cfg.maxHeight ? cfg.maxHeight : height;
        var left = width < scw - 20 ? (scw - width) / 2 : 10,
            top = height < sch - 20 ? (sch - height) / 2 : 10;
        return {
            width: width,
            height: height,
            left: left,
            top: top
        };
    }
    return {
        getElementPosition: getElementPosition,
        getViewPortSize: getViewPortSize,
        getScrollOffsets: getScrollOffsets,
        getMousePos: getMousePos,
        getRect: getRect,
        getElementCenterPos: getElementCenterPos
    };
})());

//验证 暂时没用  
utils.Regexp = {
    //email的判断
    Ismail: function (mail) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(mail);
        //  return (new RegExp(/^\w+((-\w+)|(\.\w+))*\-AT-[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail));
    },
    //验证身份证
    IsIdCardNo: function (num) {
        var factorArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        var error,
            varArray = [],
            lngProduct = 0,
            intCheckDigit,
            intStrLen = num.length,
            idNumber = num;
        if ((intStrLen != 15) && (intStrLen != 18)) {
            return false;
        }
        for (var i = 0; i < intStrLen; i++) {
            varArray[i] = idNumber.charAt(i);
            if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                return false;
            } else if (i < 17) {
                varArray[i] = varArray[i] * factorArr[i];
            }
        }
        if (intStrLen == 18) {
            var date8 = idNumber.substring(6, 14);
            // ReSharper disable UseOfImplicitGlobalInFunctionScope
            if (checkDate(date8) == false) {
                // ReSharper restore UseOfImplicitGlobalInFunctionScope
                return false;
            }
            for (i = 0; i < 17; i++) {
                lngProduct = lngProduct + varArray[i];
            }
            intCheckDigit = 12 - lngProduct % 11;
            switch (intCheckDigit) {
                case 10:
                    intCheckDigit = 'X';
                    break;
                case 11:
                    intCheckDigit = 0;
                    break;
                case 12:
                    intCheckDigit = 1;
                    break;
            }
            if (varArray[17].toUpperCase() != intCheckDigit) {
                return false;
            }
        } else {
            var date6 = idNumber.substring(6, 12);
            // ReSharper disable UseOfImplicitGlobalInFunctionScope
            if (checkDate(date6) == false) {
                // ReSharper restore UseOfImplicitGlobalInFunctionScope
                return false;
            }
        }
        return true;
    },
    //校验密码：只能输入6-15个字母、数字
    IsPasswd: function (s) {
        var patrn = /^[a-zA-Z0-9]{6,15}$/;
        return patrn.exec(s);
    },
    //校验手机号码：必须以数字开头
    IsMobile: function (s) {
        //00852验证香港区号
        var patrn = /^(13[0-9]|15[012356789]|18[0236789]|14[57]|00852)[0-9]{8}$/;
        return patrn.test(s);
    },
    //1-16个中文
    IsChinese: function (s) {
        var patrn = /^[a-zA-Z\u4E00-\u9FA5]{2,16}$/;
        return !!patrn.exec(s);
    },
    //检查email邮箱
    IsEmail: function (str) {
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        //var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    },
    //中英文数字下划线1-num个字符
    IsAccount: function (str, num) {
        var reg;
        if (num == 30)
            reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,30}$/;
        else if (num == 510)
            reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,510}$/;
        //var reg = /^[a-zA-Z0-9_]{6,16}$/;
        return reg.test(str);
    },
    //检查长度
    CheckLength: function checkLength(obj, maxlength) {
        if (obj.value.length > maxlength) {
            obj.value = obj.value.substring(0, maxlength);
        }
    },
    IsURL: function (strUrl) {
        var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
        return regular.test(strUrl);
    },
    //判断是否有列表中的危险字符
    IsValidReg: function (chars) {
        var re = /<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/;
        return re.test(chars) != true;
    }
};
