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
// <copyright file="EasyUIPagerParamModel.cs" company="东方闻道-网席科技">
//     Copyright (c) WebSeat . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
#endregion
 
namespace GenerateDataGridDemo.EasyUi
{
    public class EasyUIPagerParamModel
    {
        //sort, string order, int page = 1, int rows = 10
        // ReSharper disable InconsistentNaming
        public EasyUIPagerParamModel()
        {
            page = 1;
            rows = int.MaxValue;
        }

        /// <summary>
        /// 排序字段 srot Field
        /// </summary>
        public string sort { get; set; }

        // ReSharper disable once InconsistentNaming
        /// <summary>
        ///  升序还是降序 asc desc
        /// </summary>
        public string order { get; set; }

        // ReSharper disable once InconsistentNaming
        /// <summary>
        /// 当前页 pageindex
        /// </summary>
        public int page { get; set; }

        // ReSharper disable once InconsistentNaming
        /// <summary>
        /// 页数大小  pagesize
        /// </summary>
        public int rows { get; set; }

        /// <summary>
        /// key word
        /// </summary>
        public string KeyWord { get; set; }
    }
}