/*
*Author  xj
*  ([][+[]] + [])[+!![]] + ({} + [])[+!![]] + ([][+[]] + [])[!![] + !![]] + ([][+[]] + [])[!![] + !![] + !![]] + [] + (![] + [])[!![] + !![] + !![]]    nodes
*/
var WebJs = window.WebJs || WebJs || {};
//对话框 基于EasyUI
WebJs.Dialog = (function () {
    function handleCfg(cfg) {
        WebJs.Data.isOpen = true;//夹杂外部逻辑了
        cfg || (cfg = {});
        cfg.hasOwnProperty("title") || (cfg.title = 'Title' + (+new Date()));
        cfg.hasOwnProperty("modal") || (cfg.modal = true);
        cfg.hasOwnProperty("minimizable") || (cfg.minimizable = false);
        cfg.hasOwnProperty("maximizable") || (cfg.maximizable = true);
        cfg.hasOwnProperty("shadow") || (cfg.shadow = false);
        cfg.hasOwnProperty("cache") || (cfg.cache = false);
        cfg.inline = cfg.inline || true;
        cfg.closed = cfg.closed || false;
        cfg.collapsible = cfg.collapsible || true;
        cfg.resizable = cfg.resizable || true;
        cfg.height = cfg.height || 400;
        cfg.width = cfg.width || 680;
        //控制窗口大小， 当屏幕窗口较小的时候缩小窗口，否则设置为默认
        var wh = $(window).height(),
            ww = $(window).width(),
            height = cfg.height,//cfg.height < wh - 20 && wh > 420 ? 400 : wh - 20,
            width = cfg.width,//cfg.width < ww - 20 && ww > 700 ? 680 : ww - 20,
            left = width < ww - 20 ? (ww - width) / 2 : 10,
            top = height < wh - 20 ? (wh - height) / 2 : 10;
        cfg.height = height;
        cfg.width = width;
        cfg.left = cfg.left || left;
        cfg.top = cfg.top || top;
        return cfg;
    }
    var loadingMessage = '正在加载数据，请稍等片刻......';
    return {
        Tip: function (msg, cfg) {
            var opts = {
                title: '友情提示',
                msg: msg || 'No Msg',
                showType: 'fade',
                timeout: 1500,
                style: {
                    right: '',
                    bottom: ''
                },
                closable: false
            };
            cfg || (cfg = {});
            cfg.hasOwnProperty("title") && (opts.title = cfg.title);
            cfg.hasOwnProperty("width") && (opts.width = cfg.width);
            cfg.hasOwnProperty("timeout") && (opts.timeout = cfg.timeout);
            cfg.hasOwnProperty("showType") && (opts.showType = cfg.showType);
            $.messager.show(opts);
            return false;
        },
        //icon--error,question,info,warning
        //fn：当窗口关闭时触发的回调函数
        Alert: function (msg, icon, fn) {
            $.messager.alert("友情提示:", msg, icon || 'warning', fn);
        },
        //dialog
        AlertDialog: function (id, cfg) {
            var opts = {
                title: '提示框',
                width: 500,
                height: 400,
                cache: false,
                modal: true,
                maximizable: true,
                collapsible: true,
                resizable: true
            };
            cfg || (cfg = {});
            cfg.hasOwnProperty('title') && (opts.title = cfg.title);
            cfg.hasOwnProperty('width') && (opts.width = cfg.width);
            cfg.hasOwnProperty('height') && (opts.height = cfg.height);
            cfg.hasOwnProperty('href') && (opts.href = cfg.href);
            cfg.hasOwnProperty('toolbar') && (opts.toolbar = cfg.toolbar);
            cfg.hasOwnProperty('buttons') && (opts.buttons = cfg.buttons);
            $(id).dialog(opts);
        },
        Confirm: function (content, yes, no) {
            $.messager.confirm("友情提示:", content, function (r) {
                r ? yes() : (typeof no === 'function' && no());
            });
        },
        Content: function (content, cfg, id) {
            cfg = handleCfg(cfg);
            cfg.content = content;
            cfg.loadingMessage = loadingMessage;
            id = id || 'myWindow';
            var oldWindow = $('#' + id), dlg;
            if (oldWindow) {
                dlg = oldWindow;
            } else {
                dlg = $('<div id="' + id + '" class="easyui-window" closed="true"></div>');
                $('body').append(dlg);
            }
            dlg.window(cfg);
            dlg.window('open');
        },
        Open: function (url, cfg, id) {
            cfg = handleCfg(cfg);
            cfg.content = '<iframe scrolling="yes" frameborder="0" src="' + url + '" style="width:100%;height:98%"></iframe>';
            cfg.loadingMessage = loadingMessage;
            id || (id = 'myWindow');
            $('#' + id + '').window(cfg);
            var ieset = navigator.userAgent;
            if (~ieset.indexOf("MSIE 6.0") || ~ieset.indexOf("MSIE 7.0") || ~ieset.indexOf("MSIE 8.0") || ~ieset.indexOf("MSIE 9.0")) {
                setTimeout(function () { $('#' + id + '').window(cfg); }, 0);
            }
        },
        Close: function (id) {
            id || (id = 'myWindow');
            $('#' + id + '').window('close');
            WebJs.Data.isOpen = false;
        }
    };
})();
//ArtDialog对话框
WebJs.ArtDialog = {
    Tip: function (msg, cfg) {
        cfg || (cfg = {});
        //if (cfg.hasOwnProperty("type") == false) cfg.type = 'warn';
        cfg.hasOwnProperty("lock") || (cfg.fixed = false);
        cfg.hasOwnProperty("fixed") || (cfg.fixed = true);
        cfg.hasOwnProperty("time") || (cfg.time = 1500);
        cfg.hasOwnProperty("title") || (cfg.title = '提示');
        //cfg.content = '<div class="' + cfg.type + '"><img src="/content/image/icon/' + cfg.type + '.gif" class="tips_img">' + msg + "</div>";
        cfg.content = msg;
        return art.dialog(cfg);
    },
    Alert: function (msg, cfg) {
        cfg || (cfg = {});
        cfg.content = msg;
        cfg.hasOwnProperty("lock") || (cfg.lock = "true");
        cfg.hasOwnProperty("fixed") || (cfg.fixed = "true");
        cfg.hasOwnProperty("title") || (cfg.title = "友情提示:");
        return art.dialog(cfg);
    },
    Confirm: function (content, yes, no) {
        var cfg = {
            button: [{
                value: '确定',
                focus: true,
                callback: function () {
                    if (yes && typeof yes == 'function') {
                        yes();
                    }
                    return true;
                }
            }, {
                id: 'button-cancel',
                value: '取消',
                callback: function () {
                    if (no && typeof no == 'function') {
                        no();
                    }
                    return true;//return no&& typeof no == "function" && no(), true;
                }
            }]
        };
        cfg.content = content || 'load……';
        cfg.title = '友情提示';
        return art.dialog(cfg).lock();
    },
    Content: function (content, cfg) {
        cfg || (cfg = {});
        cfg.hasOwnProperty("lock") || (cfg.lock = "true");
        cfg.hasOwnProperty("fixed") || (cfg.fixed = "true");
        cfg.hasOwnProperty("title") || (cfg.title = "友情提示");
        return art.dialog(cfg).content(content);
    },
    Close: function (id) {
        if (id) {
            art.dialog.list(id).close();
        }
        else {
            var list = art.dialog.list;
            for (var i in list) {
                list[i].close();
            }
        }
    }
};

//Common
var com = WebJs.Common = (function (my) {
    var iframeId = '#downloadcsv',
        objInput = '#keyword', //default show input 
        ttm, //timer
        oScript; //页面script对象
    //创建script标签并且添加到页面上
    function appendScript() {
        oScript = document.createElement('script');
        //其中‘wd’是搜索的关键字，‘cb’是一个回调函数，该回调函数是我们取到数据要后执行的函数，oScript.src中cb=baidu即表示取到数据后执行baidu函数
        oScript.src = 'http://suggestion.baidu.com/su?wd=' + $(this).val() + '&p=3&cb=WebJs.Common.showBaiduData&from=superpage&t=' + (+new Date());
        document.body.appendChild(oScript);
    }
    my.createFrame = function (url, id, navText) { //创建Iframe
        id = id || 'iframe' + Math.random().toString().substring(2); //+new Date()||new Date().valueOf()
        return '<iframe id="iframe' + id + '" scrolling="auto" frameborder="0"  src="' + url + '"  parentText="' + navText + '" style="width:100%;height:100%;"></iframe>';
    };
    my.ShowErrors = function (rs, st, state) {
        var msg = '请求错误    ' + rs.status + ' ' + rs.responseText;
        rs.status == '401' && (msg += '错误码为401就是拒绝改请求，该请求授权没通过，你需要重新登录！');
        WebJs.Dialog.Content(msg);
    };
    my.ExportExcel = function (url, filename) {
        if (!$(iframeId).length) {
            $('body').append("<iframe id=\"" + iframeId + "\" style=\"display:none\"></iframe>");
        }
        var params = WebJs.Data.exportExcelParam;
        for (var p in params) {
            var v = params[p];
            if (Object.prototype.toString.apply(v) === '[object Function]') {
                v = v();
            }
            url = utils.SetUrlParam(p, v, url);
        }
        if (filename) url = utils.SetUrlParam('fileName', filename, url);
        $(iframeId).attr('src', url);
    };
    my.Download = function (guid) {
        var $dlf = $('#downloadfile');
        if (!$dlf.length) {
            $('body').append("<iframe id=\"downloadfile\" style=\"display:none\"></iframe>");
        }
        $dlf.attr('src', '/home/download?guid=' + guid);
    };
    /***抓取百度热词***/
    my.SmartTips = function (obj) {
        //观察html结构，最后生成的commbox其实在设置的文本框后面，设置的文本框会被隐藏
        var commbox = $(obj).next('span').find('input[type=text]:first');
        commbox.keyup(function () {
            var $this = $(this);
            clearTimeout(ttm);
            ttm = setTimeout(function () {
                if (oScript) {
                    $(oScript).remove();
                }
                appendScript.call($this);
            }, 500);
        });
    };
    my.showBaiduData = function (data) { //在 easyui的commbox中显示百度返回的数据
        if (data && data.s && data.s.length) {
            var items = $.map(data.s, function (item) {
                return { id: item, name: item }; // To Dic
            });
            $(objInput).combobox('loadData', items);
        }
    };
    return my;
})(WebJs.Common || {});

//项目里面调用的
var format = {
    formatTime: function (val) {
        if (!val) {
            return "无";
        }
        if (~val.indexOf('T')) {
            return val.replace('T', '   ');
        }
        return utils.str.toDateTime(val);
    },
    formatVal: function (val) {
        if (val == 0) { return val; }
        return !!val === false || utils.str.trim(val) == '' ? '无' : val;
    },
    formatIsFreeze: function (val, row) {
        var text = val ? '<span style="color:#f00">冻结</span>' : '活动';
        row.Id = row.Id || 0;
        return '<a href="javascript:void(0)" isfreeze=' + val + ' val=' + row.Id + '>' + text + ' </a>';
    },
    formateRate: function (val, num) {
        return val && utils.str.ParseFloatAndToFixed(num || 2) * 100;
    },
    formateRateNum: function (val) {//格式化百分率
        return !val ? 0 : utils.str.ParseFloatAndToFixed(2) * 100 + '%';
    }
};

//Uploadify 的整体配置
WebJs.Uploadify = WebJs.Uploadify || (function (wj) {
    var fileId = "uploadify",
        fileQueueId = 'fileQueue',
        defCfgs = {
            'swf': '/Scripts/uploadify/uploadify.swf',
            'uploader': '',
            'formData': {
                'ASPSESSID': '',
                'AUTHID': ""
            },
            'buttonText': '选择文件',
            'height': 25,
            'width': 80,
            'All Files': '*.*',
            //在浏览窗口底部的文件类型下拉菜单中显示的文本
            'fileTypeDesc': '文件描述',
            'fileTypeExts': '*.xls;',
            'fileObjName': 'Filedata',
            'fileSizeLimit': '5120KB',
            //设置是否自动上传，选择完成后自动上传，这里我并没有自动上传
            'auto': false,
            'multi': true,
            'queueID': fileQueueId,
            'simUploadLimit': 3, //并发上传数据
            'uploadLimit': 10,//最多选择10个
            /*当文件上传成功时触发
            * file – 文件对象
              data – 服务端输出返回的信息
              response – 有输出时为true,如果无响应为false，如果返回的是false,当超过successTimeout设置的时间后假定为true
              */
            'onUploadSuccess': function (file, data, response) {
                var len = $('#' + fileQueueId + ' > div').length;
                if (len > 1) {
                    $('#' + fileId).uploadify('upload');
                } else if (len == 1) {
                    setTimeout(function () { $('#' + fileId).uploadify('upload'); }, 1000);
                }
            },
            'onUploadComplete': function (file) { //每个文件上传完毕后无论成功与否都会触发。
            },
            'onUploadError': function (file, errorCode, errorMsg, errorString) { //文件上传出错时触发，参数由服务端程序返回。
                WebJs.Dialog.Alert(errorCode + ':' + errorMsg);
            },
            //开始上传时所执行的代码
            'onUploadStart': function (file) {
                WebJs.Dialog.Tip(file.name + 'start upload');
            },
            'onCancel': function (file) { //当点击文件队列中文件的关闭按钮或点击取消上传时触发，file参数为被取消上传的文件对象
            },
            'onClearQueue': function (queueItemCount) { //当调用函数cancel方法时触发，queueItemCount参数为被取消上传的文件数量。
            },
            'onSelect': function (file) { //选择文件后向队列中添加每个上传任务时都会触发。
            },
            'onFallback': function () { //当Uploadify初始化过程中检测到当前浏览器不支持flash时触发。
            },
            /*当文件浏览框关闭时触发，如果将此事件被重写，则当向队列添加文件上传出错时不会弹出错误消息提示。
            queueData对象包含如下属性：
            filesSelected 文件选择对话框中共选择了多少个文件
            filesQueued 已经向队列中添加了多少个文件
            filesReplaced 已经向队列中替换了多少个文件
            filesCancelled 取消了多少个文件 filesErrored 出错了多少个文件
             */
            'onDialogClose': function (queueData) {
            },
            /*处理上传队列的过程中会多次触发此事件，每当任务状态有更新时都会触发。
            file – 文件对象
            bytesUploaded – 已上传的字节数
            bytesTotal – 文件总字节数
            totalBytesUploaded – 当前任务队列中全部文件已上传的总字节数
            totalBytesTotal – 当前任务队列中全部文件的总字节数*/
            'onUploadProgress': function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            }
        };
    return function (uploadifyCfg, id) {
        id = id || fileId;
        if (!id.startsWith("#")) {
            id = '#' + id;
        }
        var cfgs = $.extend(defCfgs, uploadifyCfg || {});
        $(id).uploadify(cfgs);
    };
})(WebJs);

