#region << Version Description >>
// ***********************************************************************
// Assembly         : GenerateDataGridDemo
// Author           : [熊建] 
// Created          : 2014-03-03
// Description		:
//
// Last Modified By : [熊建] 
// Last Modified On : 2014-03-03
// ***********************************************************************
// <copyright file="DataOptionsAttribute.cs" company="东方闻道-网席科技">
//     Copyright (c) WebSeat . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
#endregion


using System;

namespace GenerateDataGridDemo.Attributes
{
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true), Serializable]
    public class DataOptionsAttribute : Attribute
    {
        public DataOptionsAttribute()
        {
            Order = 100;
            Id = Options = string.Empty;
        }

        /// <summary>
        /// data-options
        /// </summary>
        public string Options { get; set; }

        /// <summary>
        /// 是否显示类属性上没有打标机的元素
        /// </summary>
        public bool IsShowNotAttr { get; set; }

        /// <summary>
        /// 显示顺序
        /// </summary>
        public short Order { get; set; }

        /// <summary>
        /// 直接映射到Id上  不过至于类上才有有 只给datagrid赋值ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 其他属性
        /// </summary>
        public string Property { get; set; }

     
    }
}