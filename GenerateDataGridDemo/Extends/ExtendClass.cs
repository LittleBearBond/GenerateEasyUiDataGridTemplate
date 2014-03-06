#region << 版 本 注 释 >>

/*
 * ========================================================================
 * Copyright(c) 2012-2014 成都网席科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 网站一些扩展方法   
 *  
 * 作者：[熊建]   时间：2013/09/26
 * 文件名：ExtendClass
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
using System.Linq.Expressions;
using System.Reflection;
using System.Web.Mvc;
using GenerateDataGridDemo.EasyUi;
using GenerateDataGridDemo.Models;

namespace GenerateDataGridDemo.Extends
{
    public static class ExtendClass
    {
        /// <summary>
        /// HtmlHelper扩展方法
        /// </summary>
        /// <param name="html"></param>
        /// <param name="entity"></param>
        /// <param name="appendEnd">追加到后面的字符串</param>
        /// <param name="appendStart">追加到前面面的字符串</param>
        /// <returns></returns>
        public static MvcHtmlString CreateDataGridTemplate(this HtmlHelper html, Type entity, string appendEnd = "", string appendStart = "")
        {
            return new MvcHtmlString(GenerateDataGrid.GetDataGridTemplate(entity, appendEnd, appendStart));
        }

        public static IEnumerable<TEntity> OrderBy<TEntity>(this IEnumerable<TEntity> source, string orderByProperty, bool desc)
        {
            var command = desc ? "OrderByDescending" : "OrderBy";
            var type = typeof(TEntity); var property = type.GetProperty(orderByProperty);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new[] { type, property.PropertyType },
                source.AsQueryable().Expression, Expression.Quote(orderByExpression));
            return source.AsQueryable().Provider.CreateQuery<TEntity>(resultExpression);
        }

        public static IList<T> ToList<T>(this IQueryable<T> list, int pageIndex, int pageSize, IEnumerable<OrderBy> orderBy = null)
        {
            var strOrder = new[] { "OrderBy", "OrderByDescending" };
            if (orderBy != null)
                foreach (var order in orderBy)
                {
                    var param = Expression.Parameter(typeof(T), "c");
                    var property = typeof(T).GetProperty(order.Name);
                    var propertyAccessExpression = Expression.MakeMemberAccess(param, property);
                    var le = Expression.Lambda(propertyAccessExpression, param);
                    var type = typeof(T);
                    var resultExp = Expression.Call(typeof(Queryable),
                        (order.IsAsc ? strOrder[0] : strOrder[1]), new[] { type, property.PropertyType }, list.Expression,
                        Expression.Quote(le));
                    list = list.Provider.CreateQuery<T>(resultExp);
                    strOrder = new[] { "ThenBy", "ThenByDescending" };
                }
            if (pageIndex == 1 && pageSize == int.MaxValue)
            {
                return list.ToList();
            }
            return list.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        }
    }
}