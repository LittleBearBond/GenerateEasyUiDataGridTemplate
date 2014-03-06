#region << 版 本 注 释 >>

/*
 * ========================================================================
 * Copyright(c) 2012-2014 成都网席科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 反射生成datagrid的模板
 *  
 * 作者：[熊建]   时间：2013/11/28
 * 文件名：GenerateDataGrid
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
using System.Reflection;
using System.Text;
using WebSeat.Web.Core.Extends;

namespace GenerateDataGridDemo.Extends
{
#pragma warning disable 693
    public class GenerateDataGrid<T>  
#pragma warning restore 693
    {
        #region Tools Methods

        public static IEnumerable<PropertyInfo> GetPropertyInfoList(T entity)
        {
            IEnumerable<PropertyInfo> propertitys =
                entity.GetType()
                    .GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase)
                    .Where(propertyInfo => propertyInfo.Name.ToLower() != "id"); //Id为主键，不能插入。写死了，这个可以做相应修改
            return propertitys;
        }

        public static IEnumerable<PropertyInfo> GetAllPropertyInfoList(T entity)
        {
            IEnumerable<PropertyInfo> propertitys =
                entity.GetType()
                    .GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
            return propertitys;
        }

        /// <summary>
        ///     text文本框输入
        /// </summary>
        /// <param name="proType"></param>
        /// <returns></returns>
        private static bool IsTxext(Type proType)
        {
            return proType == typeof (string) || proType == typeof (int) || proType == typeof (decimal) ||
                   proType == typeof (float) || proType == typeof (double) || proType == typeof (byte);
        }

        #endregion

        /// <summary>
        /// 生成Datagrid的模板
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static string GetDataGridTemplate(T entity)
        {
            var sb = new StringBuilder();
            sb.AppendLine("<table id=\"dt\" class=\"easyui-datagrid\">" +
                          "<thead>" +
                          "<tr>");
            foreach (PropertyInfo pro in GetAllPropertyInfoList(entity))
            {
                Type proType = pro.PropertyType;
                if (IsTxext(proType) || proType == typeof (bool))
                {
                    sb.AppendLine(Template.DataGridTable.Replace(Template.ReplaceStr, pro.Name));
                }
                else if (proType == typeof (DateTime))
                {
                    sb.AppendLine(Template.DataGridTableForrmat.Replace(Template.ReplaceStr, pro.Name));
                }
                else
                {
                    sb.AppendLine(Template.DataGridTable.Replace(Template.ReplaceStr, pro.Name));
                }
            }
            sb.AppendLine(@" </tr>
                                </thead>
                            </table>");
            return sb.ToString();
        }
  
    }
}