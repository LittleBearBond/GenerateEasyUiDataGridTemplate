/*
*Author  熊建
*webseat.SearceForm.js
*Date:2014-02-13
*Desc: Form表单的一些封装  依赖于Jquery.from.js 和 webseat.EasyUi.js  webseta.core.js webseat.common.js
*/
//AjaxSubmitForm
; (function (wj) {
    wj.Form = wj.Form || {};
    var form = wj.Form;
    function showRequest(formData, jqForm, options) {
        WebJs.EasyUiExtend.ajaxLoading();
        return true;
    }
    function showResponse(responseText, statusText, options) {
        WebJs.EasyUiExtend.ajaxLoadEnd();
        if (statusText == 'success' && responseText && responseText.Success) {
            if (parent) {
                parent.WebJs.EasyUi.RefreshDataGrid();
                setTimeout(function () {
                    parent.WebJs.EasyUi.SelectRecord(responseText.Result);
                    parent.WebJs.Dialog.Close();
                }, 0);
            }
        } else {
            WebJs.Dialog.Content(responseText.Message + '<br/>' + $.toJSON(responseText.Result));
        }
        return true;
    }
    //Ajax提交form表单
    form.AjaxSubmitForm = function (objForm, url, cfg) {
        if (!url) {
            WebJs.ArtDialog.Alert('Url不能为空');
            return false;
        }
        var opts = {
            dataType: 'json',
            url: '',
            type: 'post',
            /*headers: {
                "contentType": "application/json; charset=utf-8",
                "token": WebJs.Utils.GetCookie('Token') || "token"
            },*/
            beforeSubmit: showRequest,  // pre-submit callback 
            success: showResponse, // post-submit callback 
            error: WebJs.Common.ShowErrors,//show error
            clearForm: false, // clear all form fields after successful submit 
            resetForm: false,        // reset the form after successful submit 
            // $.ajax options can be used here too, for example: 
            timeout: 60000//Timeout time
        };
        opts.url = url;
        cfg || (cfg = {});
        cfg.hasOwnProperty('header') && (opts.headers = cfg.header);
        cfg.hasOwnProperty('type') && (opts.type = cfg.type);
        opts.success = cfg.success || opts.success;
        cfg.hasOwnProperty('clearForm') && (opts.clearForm = cfg.clearForm);
        cfg.hasOwnProperty('resetForm') && (opts.resetForm = cfg.resetForm);
        opts.beforeSubmit = this.easyUiValidateForm(objForm);//opts.beforeSubmit || 
        if (objForm) {
            $(objForm).ajaxForm(opts);
        } else {
            return false;
        }
        return true;
    };
    //初始化页面数据 
    form.initPageFormData = function (url, data, selector, cb) {
        WebJs.Ajax(url, data, function (result) {
            if (result && result.Success) {
                selector && $(selector).form('load', result.Result || {});
                cb && $.isFunction(cb) && cb(result);//如果有回调函数 执行回调
            } else {
                WebJs.Dialog.Alert(result.Message);
            }
        });
    };

    form.easyUiValidateForm = function (formSelector) {
        return function () {
            if (formSelector && !$(formSelector).form('validate')) {
                return false;
            }
            return true;
        };
    };

    form.SuccessDefault = function (msg) {
        return function (data, statusText, options) {
            if (data && data.Success) {
                $(':hidden').each(function () { $(this).val(''); });
                WebJs.Dialog.Confirm(msg, function () {
                    parent && parent.WebJs.EasyUi.CloseTab();
                });
            } else {
                WebJs.Dialog.Content(data.Message);
            }
        };
    };

})(WebJs || {});