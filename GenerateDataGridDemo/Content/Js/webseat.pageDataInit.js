/***
*author :bond 熊建
*页Desc:面初始化的一些公共方法, 和webseat.EasyUi.js、webseta.core.js 
*Date:
*
**/
var pageInit = (function (init) {
     
})(window.pageInit || {});

 

//document readey init function 初始话运行的所有函数
+function (wj) {
    var datagridTimer;
    function windowResize() { //Not used
        //弹出窗口适应页面
        $(window).resize(function () {
            clearTimeout(datagridTimer);
            datagridTimer = setTimeout(function () {
                resizeOpenWindow();
                //resizeInnerPage();
            }, 100);
        });
    }

    //resize打开的window框 
    function resizeOpenWindow() { //Not used
        if (WebJs.Data.isOpen) {
            var $myWindow = $('#myWindow');
            if (!$myWindow || !$myWindow.find('iframe').length) {
                return;
            }
            $myWindow.window('resize', WebJs.HtmlUtils.getElementCenterPos($myWindow));
        }
    }

    //初始话输入框的提示值
    function initInput() {
        //初始话文本框的提示值
        $('input[init]').each(function () {
            var $this = $(this),
                val = $this.attr('init'),
                //是否支持HTML5,没有使用modernizr 库提供方法进行判断
                isSupportplaceholder = "placeholder" in document.createElement("input");
            if (isSupportplaceholder) {
                $this.attr('placeholder', val);
                return;
            }
            if ($this.attr('type') == 'password' || $this.get(0).type == 'password') {
                return;
            }
            var text = '', c1 = '#aaa', c2 = '#000';
            val && val.length && (text = val);
            $this.val(text).css('color', c1).focus(function () {
                $this.val() == text && $this.val('').css('color', c2);
            }).blur(function () {
                $this.val().length <= 0 && $this.val(text).css('color', c1);
            });
        });
    }

    //序列化表单为json数据 这个可以做成立即执行，我放到$() 里面去执行
    function serializeJson() {
        $.fn.serializeJson = function () {
            var serializeObj = {},
                array = this.serializeArray();
            $(array).each(function () {
                if (serializeObj[this.name]) { //已经有一个值
                    if ($.isArray(serializeObj[this.name])) {
                        serializeObj[this.name].push(this.value);
                    } else { //构建是个数组来存放，也可以做成逗号隔开的
                        serializeObj[this.name] = [serializeObj[this.name], this.value];
                    }
                } else {
                    serializeObj[this.name] = this.value;
                }
            });
            return serializeObj;
        };
    }

    //移除空的搜索节点
    function removeEmptySearchTag() {
        setTimeout(function () {
            var search = $('#Search');
            if ($('*', search).length <= 1 || !search.html()) {
                search.fadeOut(100);
            }
        }, 0);
    }

    wj.initPage = wj.initPage || {};

    //所有页面初始化
    wj.initPage = function () {
        initInput();
        windowResize();
        serializeJson();
        removeEmptySearchTag();
    };

    //首页初始化 showindex
    wj.indexPageInit = function () {
        WebJs.EasyUiExtend.extendEasyUi();
        WebJs.AdminIndex.InitIndex();
    };
}(WebJs || {});

//initPage
$(function () {
    WebJs.initPage();
});