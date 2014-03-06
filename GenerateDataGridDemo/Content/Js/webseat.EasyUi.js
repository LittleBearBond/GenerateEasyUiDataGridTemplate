/*
*Author  熊建
*webseat.EasyUi.js
*Date: 2014-02-13
*/
var easyui = {};
easyui.dg = {};

easyui.dg = (function () {
    //datagrid的默认配置
    var defaultOpts = {
        rownumbers: true, singleSelect: false,
        pagination: true, striped: true,
        fit: true,
        //remoteSort: false,//不通过远程排序
        border: false, method: 'post',
        toolbar: "#Search", idField: 'Id',
        pageSize: 20, pageNumber: 1,
        emptyMsg: '没有符合筛选条件的数据',//自定义扩展属性
        view: WebJs.EasyUiExtend.extendDatagridView(),//自定义扩展
        onLoadError: WebJs.Common.ShowErrors
    },
        loadTimmer,
        loadTime = 0, //多少毫秒加载一次
        dtId = '#dt';
    /*
    *   检测datagrid中是否有checkbox 
    *   如果有的话就应该设置多选，反之就设置为单选
    */
    function datagridIsExisitCheck(selector) {
        var $dg = getObj.getDg(selector);
        var chk = $('>thead>tr th[data-options*=checkbox]', $dg);
        return chk.length === 0;
    }

    //获取相关数据
    var getObj = {
        getDg: function (id) {
            id = id || dtId;//取得datagrid的Id  默认为 dt, 
            return $(id);// 如果页面有两个datagrid 加缓存就悲催了----objDg || (objDg = $(id), objDg);
        }
    };

    return {
        //加载datagrid的数据
        LoadData: function (url, opts, selector) {
            loadTimmer && clearTimeout(loadTimmer);
            var defaults = $.extend(defaultOpts, opts || {});
            url && (defaults.url = url);
            defaults.singleSelect = datagridIsExisitCheck(selector);
            loadTimmer = setTimeout(function () {
                //可以对datagrid进行缓存，一个页面有多个datagrid这个就不行了
                getObj.getDg(selector).datagrid(defaults);
            }, loadTime);
        },
        //搜索 ，向服务器传递搜索参数，并且重新加载datagrid的数据
        Search: function (url, searchForm, cfg) {
            loadTimmer && clearTimeout(loadTimmer);
            cfg = cfg || {};
            cfg.onBeforeSearch && $.isFunction(cfg.onBeforeSearch) && cfg.onBeforeSearch();
            var def = $.extend(defaultOpts, cfg);
            /********验证 Start***************/
            //不传直值，或者传表单选择器，接默认序列化搜索表单对象
            if (!searchForm || typeof searchForm == 'string') {
                //当parma不为空 认为是传入一个form的选择器
                var form = searchForm ? $(searchForm) : $('#SearchForm');
                if (!form.form('validate')) { return; }
                def.queryParams = form.serializeJson();
            } else {
                def.queryParams = searchForm;
            }
            def.page = this.GetDgPageSize(); //搜索的时候页数和当前用户设置页数一致
            /***********验证  End************/
            if (url) { def.url = url; }
            def.singleSelect = datagridIsExisitCheck(cfg.id);
            loadTimmer = setTimeout(function () {
                getObj.getDg(cfg.id).datagrid(def).load();
                gData.exportExcelParam = def.queryParams;//给搜索对象赋值
            }, loadTime);
        },
        //刷新datagrid,重新加载当前页的数据
        RefreshDataGrid: function (id) {
            var $tid = getObj.getDg(id);
            $tid.datagrid('reload');
            $tid.datagrid("unselectAll");
        },
        //选中datagrid的单条记录
        SelectRecord: function (id, dtid) {
            getObj.getDg(dtid).datagrid('selectRecord', '' + id + '');
        },
        //获得datagrid选中数据的Id， 参数Id 和可以可以不传，不穿采用默认的参数做处理
        GetSelectionIds: function (id, key) {
            var rows = getObj.getDg(id).datagrid('getSelections'),
                ids = [];
            key = key || "Id";
            for (var i = 0, len = rows.length; i < len; i++) {
                rows[i][key] && (ids.push(rows[i][key]));
            }
            return ids.join(',');
        },
        //获取当前选中的所有数据
        GetSelections: function (id) {
            return getObj.getDg(id).datagrid('getSelections');
        },
        //获取当前datagrid的pagesize
        GetDgPageSize: function (id) {
            var pager = getObj.getDg(id).datagrid('getPager');
            if (!pager || !pager.length) {
                return 10;
            }
            var options = pager.pagination('options');
            if (!options) {
                return 10;
            }
            return options.pageSize;
        }
    };
})();

//JQuery EasyUi datebox
WebJs.JqEasyUiDate = function (startTime, endTime) {
    var vt = 'validType';
    function getDate(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    function setData(obj, date, isStart) {
        obj = $(obj);
        var selDate = getDate(date),
            validType = isStart ? "led[\'" + selDate + "\']" : "ged[\'" + selDate + "\']",
            validateBox = obj.next('span').find('input:first'),
            d0 = $.data(obj[0], 'combo'),
            d1 = $.data(obj[0], 'datebox'),
            d2 = $.data(validateBox[0], 'validatebox');
        obj.attr(vt, validType);
        //修改easyui里面 combo datebox validatebox内部保存的相关参数，才能起到验证效果，
        //原因是控件开始初始化的时候就保存了相关验证规则，后期更改验证规则控件不会重新更新之前保存的验证规则
        d0 && (d0.options.validType = validType, $.data(obj[0], 'combo', d0));
        d1 && (d1.options.validType = validType, $.data(obj[0], 'datebox', d1));
        d2 && (d2.options.validType = validType, $.data(validateBox[0], 'validatebox', d2));
    }
    if (startTime) {
        $(startTime).datebox({
            onSelect: function (date) {
                endTime && setData(endTime, date);
            }
        });
    }
    if (endTime) {
        $(endTime).datebox({
            onSelect: function (date) {
                startTime && setData(startTime, date, true);
            }
        });
    }
};

//Datepicker  JQuery Ui
/* WebJs.JqUiDatepicker = function (startTime, endTime) {
   //依赖于jquery.ui.datepicker-zh-CN.js
     var opts = {
           showMonthAfterYear: true, // 月在年之后显示
           changeMonth: true,   // 允许选择月份
           changeYear: true,   // 允许选择年份
           dateFormat: format,
           dayNamesMin: dayNames,
           monthNames: monthNames, 
           onSelect: function () { return false; }
       };
       if (startTime) {
           opts.onSelect = function (dateText) {
               var arys = dateText.split('-');
               if (endTime) $(endTime).datepicker('option', 'minDate', new Date(arys[0], arys[1] - 1, arys[2]));
           };
           opts.el = 'd12';
           $(startTime).datepicker(opts).attr("readonly", "readonly");
       }
       if (endTime) {
           opts.onSelect = function (dateText) {
               var arys = dateText.split('-');
               if (startTime) $(startTime).datepicker('option', 'maxDate', new Date(arys[0], arys[1] - 1, arys[2]));
           };
           $(endTime).datepicker(opts).attr("readonly", "readonly");
       }
};*/