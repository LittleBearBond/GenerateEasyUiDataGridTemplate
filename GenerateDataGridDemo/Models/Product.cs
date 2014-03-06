#region << Version Description >>
// ***********************************************************************
// Assembly         : GenerateDataGridDemo
// Author           : [熊建] 
// Created          : 2014-03-04
// Description		:
//
// Last Modified By : [LittleBear] 
// Last Modified On : 2014-03-05
// ***********************************************************************
// <copyright file="Product.cs" company="东方闻道-网席科技--2B">
//     Copyright (c) WebSeat . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
#endregion

using System;
using System.ComponentModel.DataAnnotations;
using GenerateDataGridDemo.Attributes;

namespace GenerateDataGridDemo.Models
{
    /// <summary>
    /// 
    /// </summary>
    [DataOptions(Options = "title:'商品列表'")]
    public class Product
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        [Display(Name = "名称")]
        [DataOptions(Order = 1)]
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "类别")]
        [DataOptions(Order = 2)]
        public string Category { get; set; }

        /// <summary>
        /// 价格
        /// </summary>
        [Display(Name = "价格")]
        [DataOptions(Order = 3, Options = "sortable:true")]
        public decimal Price { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Display(Name = "创建时间")]
        [DataOptions(Order = 4, Property = "sortable=true")]
        public DateTime CreateTime { get; set; }

    }
}