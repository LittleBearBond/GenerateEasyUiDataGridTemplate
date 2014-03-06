
/*
*Author  熊建
*webseat.EasyUi.js
*Date: 2014-02-20
*Desc EasyUI的一些扩展,依赖于 easyui
*/
WebJs.EasyUiExtend = (function () {
    //扩展EasyUI的验证
    function extendEasyUiValidate() {
        $.extend($.fn.validatebox.defaults.rules, {
            pattern: {
                validator: function (value, param) {
                    var re = new RegExp('' + param[0], 'gi');
                    return re.test(value);
                },
                message: '输入格式不正确'
            },
            maxLength: {
                validator: function (value, param) {
                    return value.trim().length <= param[0];
                },
                message: '最多只能输入{0}个字符'
            },
            list: {
                validator: function (value) {
                    return /^\d[\d|,?]*/gi.test(value);
                },
                message: '输入格式不对，数字之间都好隔开'
            },
            isId: {
                validator: function (value) {
                    return /^[1-9]\d*$/gi.test(value.trim()) && ((value | 0) > 0 && (value | 0) < 2e7);
                },
                message: 'Id必须是数字，类型为int'
            },
            led: {//Less than or equal date
                validator: function (value, param) {
                    var d1 = $.fn.datebox.defaults.parser(param[0]);
                    var d2 = $.fn.datebox.defaults.parser(value);
                    return d2 <= d1;
                },
                message: '当前日期必须小于等于 {0}'
            },
            ged: {//greater than or equal date
                validator: function (value, param) {
                    var d1 = $.fn.datebox.defaults.parser(param[0]);
                    var d2 = $.fn.datebox.defaults.parser(value);
                    return d2 >= d1;
                },
                message: '当前日期必须大于等于 {0}'
            },
            equalTo: {
                validator: function (value, param) {
                    return value == $(param[0]).val();
                },
                message: '两次输入的字符不一至'
            },
            number: {
                validator: function (value) {
                    return /^\d+$/.test(value);
                },
                message: '请输入数字'
            }
        });
    }
    //扩展View，当没有数据的时候显示提示信息
    function extendDatagridView() {
        return $.extend({}, $.fn.datagrid.defaults.view, {
            onAfterRender: function (target) {
                $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
                var opts = $(target).datagrid('options'),
                    vc = $(target).datagrid('getPanel').children('div.datagrid-view');
                vc.children('div.datagrid-empty').remove();
                if (!$(target).datagrid('getRows').length) {
                    var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || '没有符合筛选条件的数据').appendTo(vc);
                    d.css({ position: 'absolute', left: 0, top: 50, width: '100%', textAlign: 'center', fontSize: '14px' });
                }
            }
        });
    }
    // 对 datagrid 的一些扩展
    function extendEasyUi() {
        extendEasyUiValidate();
    }
    //采用jquery easyui loading css效果  
    var ajaxLoading = function (msg) {
        msg = msg || "正在处理，请稍候。。。";
        $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");
        $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
    },
            ajaxLoadEnd = function () {
                $(".datagrid-mask").remove();
                $(".datagrid-mask-msg").remove();
            };
    return {
        extendDatagridView: extendDatagridView,
        extendEasyUi: extendEasyUi,
        ajaxLoading: ajaxLoading,
        ajaxLoadEnd: ajaxLoadEnd
    };
})();