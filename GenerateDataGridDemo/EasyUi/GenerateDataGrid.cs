#region << Version Description >>
// ***********************************************************************
// Assembly         : WebSeat.Web.Core
// Author           : [熊建] 
// Created          : 2013-11-28
// Description		:反射生成datagrid的模板
//
// Last Modified By : [熊建] 
// Last Modified On : 2014-02-18
// ***********************************************************************
// <copyright file="GenerateDataGrid.cs" company="东方闻道-网席科技">
//     Copyright (c) WebSeat . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
#endregion

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using GenerateDataGridDemo.Attributes;

namespace GenerateDataGridDemo.EasyUi
{
    public class GenerateDataGrid
    {

        public static IList<PropertyInfo> GetAllPropertyInfoList(Type entity)
        {
            return entity.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
        }

        public static string GetDataGridTemplate(Type entity, string appendEnd, string appendStart)
        {
            var sb = new StringBuilder();
            //先获取类的Attribute
            var entityCustomAttr = entity.GetCustomAttributes(typeof(DataOptionsAttribute), false).FirstOrDefault() as DataOptionsAttribute;

            #region 对实体的Attibute属性进行处理

            //是否显示没有 标记dataoptions的字段
            var isShowNotAttr = false;//默认不显示
            var options = string.Empty;
            var tableId = string.Empty;
            var tableProperty = string.Empty;
            //并没有处理可能发生的异常情况， 比如在Property 指定了id="xxx"  而又指定了id的值
            if (entityCustomAttr != null)
            {
                isShowNotAttr = entityCustomAttr.IsShowNotAttr;
                options = string.IsNullOrWhiteSpace(entityCustomAttr.Options) ? string.Empty : entityCustomAttr.Options;
                //默认ID为dt ,  假设在Property 中没有设置了Id，如果设置了这里没做处理
                tableId = string.IsNullOrWhiteSpace(entityCustomAttr.Id) ? "dt" : entityCustomAttr.Id;
                tableProperty = string.IsNullOrWhiteSpace(entityCustomAttr.Property) ? string.Empty : entityCustomAttr.Property;
            }

            #endregion

            //获取所有的Property
            var properties = GetAllPropertyInfoList(entity);
            //如果设置有不显示没有dataoptions标记的，值取出标记有dataoptions的字段 
            if (!isShowNotAttr)
            {
                properties = properties.Where(n => n.CustomAttributes.Any(a => a.AttributeType == typeof(DataOptionsAttribute))).ToList();
            }
            //没有打标记的也要取出来， 这里得到以字段name为key List<Attribute>为值的集合对象
            Dictionary<string, List<Attribute>> colDicOpts = properties.ToDictionary(
                property => property.Name,
                property =>
                {
                    var list = new List<Attribute>
                    {
                        property.GetCustomAttributes(typeof (DataOptionsAttribute), false).FirstOrDefault() as DataOptionsAttribute,
                        property.GetCustomAttributes(typeof (DisplayAttribute), false).FirstOrDefault() as DisplayAttribute
                    };
                    return list;
                });
            //在table上拼接 id    data-options  和 Property
            sb.AppendLine(string.Format("<table id=\"{0}\" class=\"easyui-datagrid\"  data-options=\"{1}\"  {2} > <thead> <tr>", tableId, options, tableProperty));
            //没有直接遍历加入数据  这里先取得所有数据，然后进行排序，得到th 列表
            var listThs = (from pro in properties
                           let custAttrs = colDicOpts.SingleOrDefault(n => n.Key == pro.Name)
                           select AppendTemplate(Template.DataGridTh, custAttrs, pro)).ToList();
            //1、添加到开始部分的 add start
            if (!string.IsNullOrWhiteSpace(appendStart)) { sb.AppendLine(appendStart); }
            //2、添加中间部分，先排序，得到显示顺序 add center
            listThs = listThs.OrderBy(n => n.Key).Select(n => n.Value).ToList();
            sb.AppendLine(string.Join("", listThs));
            //3、追加后面的字符串 add end
            if (!string.IsNullOrWhiteSpace(appendEnd)) { sb.AppendLine(appendEnd); }
            sb.AppendLine(@"</tr></thead></table>");
            return sb.ToString();
        }

        //dynamic 可用 KeyValuePair
        private static dynamic AppendTemplate(string template, KeyValuePair<string, List<Attribute>> attributes, PropertyInfo proinfo = null)
        {
            var displayName = attributes.Value.SingleOrDefault(n => n is DisplayAttribute) as DisplayAttribute;
            //设置字段显示的名称，直接设置 DisplayAttribute，这个大家肯定很熟悉的属性
            var str = Template.RegV.Replace(template, displayName != null ? displayName.Name : attributes.Key);

            //设置显示的字段field ，即是当前th显示哪个字段,例如field:'Id'
            str = Template.RegF.Replace(str, attributes.Key);

            //从该字段的CustomAttributes中取得DataOptionsAttribute
            var dataOptions = attributes.Value.SingleOrDefault(n => n is DataOptionsAttribute) as DataOptionsAttribute;

            //设置Property， 如果property和data-options有设置相同的对象 这里没做异常处理
            str = Template.RegP.Replace(str, dataOptions == null ? string.Empty : dataOptions.Property ?? "");

            //没有设置排序的这里默认设置一个值
            var order = dataOptions == null ? 100 : dataOptions.Order;

            //由于我自己的需要，我要对DateTime类型进行特殊处理
            if (proinfo != null && proinfo.PropertyType == typeof(DateTime))
            {
                //没有自定义属性的值
                if (dataOptions == null)
                {
                    //WebJs.Format.formatTime 自己的js时间格式化函数 这个一定程度上导致前后台耦合了
                    str = Template.RegD.Replace(str, "formatter:format.formatTime");//默认时间格式
                }
                else
                {
                    str = dataOptions.Options != null && dataOptions.Options.IndexOf("formatter", StringComparison.CurrentCultureIgnoreCase) >= 0 ?
                        //已经设置formatter
                        Template.RegD.Replace(str, dataOptions.Options) :
                        //默认设置formatter
                        Template.RegD.Replace(str, ((dataOptions.Options ?? "").TrimEnd(',') + ",formatter:format.formatTime").TrimStart(','));
                }
            }
            else
            {
                //替换data-option 的值, 如果为空就直接替换为空 
                if (dataOptions == null)
                {
                    str = Template.RegDi.Replace(str, string.Empty);
                }
                else
                {
                    var opt = (dataOptions.Options ?? "");
                    //默认设置起格式化
                    var replaceStr = opt.IndexOf("formatter", StringComparison.CurrentCultureIgnoreCase) >= 0 ? opt : opt.TrimEnd(',') + ",formatter:format.formatVal";
                    str = Template.RegD.Replace(str, replaceStr.TrimStart(','));
                }
            }
            //返回拼接后的字符串和显示的顺序
            return new { Value = str, Key = order };
        }
    }
}