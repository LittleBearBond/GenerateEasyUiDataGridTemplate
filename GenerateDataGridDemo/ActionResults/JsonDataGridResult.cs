#region << 版 本 注 释 >>

/*
 * ========================================================================
 * Copyright(c) 2012-2014 成都网席科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 返回easyui datagrid指定类型的json 
 *  
 * 作者：[熊建]   时间：2013/11/28
 * 文件名：JsonDataGridResult
 * 版本：V1.0.0
 * 
 * 修改者：           时间：               
 * 修改说明：
 * ========================================================================
*/

#endregion

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using GenerateDataGridDemo.EasyUi;

namespace GenerateDataGridDemo.ActionResults
{

    //自己也继承JsonResult方法  重写ExecuteResult方法
    public class JsonDataGridResult : JsonResult
    {
        public JsonDataGridResult(dynamic obj)
        {
            JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            Data = new DataGrid
            {
                rows = obj == null ? null : obj.Items,
                total = obj == null ? 0 : (int)obj.TotalCount
            };
        }

        #region Temp Methods

        public JsonDataGridResult(IEnumerable<object> obj)
        {
            JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            Data = new DataGrid
            {
                rows = obj,
                total = obj == null ? 0 : obj.Count()
            };
        }
        public JsonDataGridResult(IEnumerable<object> obj, int total)
        {
            JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            Data = new DataGrid
            {
                rows = obj,
                total = total
            };
        }
        public JsonDataGridResult(IEnumerable<object> obj, long total)
        {
            JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            Data = new DataGrid
            {
                rows = obj,
                total = (int)total
            };
        }
        #endregion
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }
            //这个不要了
            /*if (JsonRequestBehavior == JsonRequestBehavior.DenyGet &&
                String.Equals(context.HttpContext.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException(WebCoreMessages.JsonRequest_GetNotAllowed);
            }*/
            HttpResponseBase response = context.HttpContext.Response;
            response.ContentType = !String.IsNullOrEmpty(ContentType) ? ContentType : "application/json";
            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }
            if (Data != null)
            {
                var serializer = new JavaScriptSerializer();
                if (MaxJsonLength.HasValue)
                {
                    serializer.MaxJsonLength = MaxJsonLength.Value;
                }
                if (RecursionLimit.HasValue)
                {
                    serializer.RecursionLimit = RecursionLimit.Value;
                }
                response.Write(serializer.Serialize(Data));
            }
        }
    }

}