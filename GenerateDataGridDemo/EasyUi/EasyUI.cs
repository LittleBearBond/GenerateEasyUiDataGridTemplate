#region << Version Description >>
// ***********************************************************************
// Assembly         : GenerateDataGridDemo
// Author           : [熊建] 
// Created          : 2014-03-03
// Description		:
//
// Last Modified By : LittleBear
// Last Modified On : 2014-03-03
// ***********************************************************************
// <copyright file="EasyUI.cs" company="东方闻道-网席科技">
//     Copyright (c) WebSeat . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
#endregion
 

using System.Collections.Generic;

namespace GenerateDataGridDemo.EasyUi
{
    /// <summary>
    /// easyui中的datagrid
    /// </summary>
    public class DataGrid
    {
        /// <summary>
        /// 总数
        /// </summary>
        // ReSharper disable once InconsistentNaming
        public int total;
        /// <summary>
        /// 行数据集
        /// </summary>
        // ReSharper disable once InconsistentNaming
        public dynamic rows;
    }

    /// <summary>
    /// easyui中的tree
    /// </summary>
    public class TreeGrid
    {
        /// <summary>
        /// 行数据集
        /// </summary>
        // ReSharper disable once InconsistentNaming
        public dynamic rows;
    }

    /// <summary>
    /// 树形列表控件对应的对象
    /// </summary>
    public class SystemTree
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string id;
        /// <summary>
        /// 显示内容
        /// </summary>
        public string text;
        /// <summary>
        /// 图标
        /// </summary>
        public string iconCls;
        /// <summary>
        /// 是否被选中，checked为C#关键字，所以前面加@
        /// </summary>
        public bool @checked = false;
        /// <summary>
        /// 当前是展开还是收缩的状态
        /// </summary>
        public string state;
        /// <summary>
        /// 子节点集合
        /// </summary>
        public List<SystemTree> children = new List<SystemTree>();
    }

    /// <summary>
    /// 列表中的按钮导航
    /// </summary>
    public class Toolbar
    {
        /// <summary>
        /// 显示的文本
        /// </summary>
        public string text;
        /// <summary>
        /// 图标
        /// </summary>
        public string iconCls;
        /// <summary>
        /// 处理方法
        /// </summary>
        public string handler;
    }

    public class ComboTree
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string id;
        /// <summary>
        /// 显示内容
        /// </summary>
        public string text;

        /// <summary>
        /// 子节点集合
        /// </summary>
        public List<ComboTree> children = new List<ComboTree>();
    }

     
}

