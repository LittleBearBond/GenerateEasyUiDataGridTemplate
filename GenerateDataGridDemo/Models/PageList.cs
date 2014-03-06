using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GenerateDataGridDemo.Models
{
    public class PageList<T>
    {
        public PageList()
        {
            Items = new List<T>();
        }
        /// <summary>
        ///     当前页
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        ///     每页显示数量
        /// </summary>
        public int PageSize { get; set; }

        public IList<T> Items { get; set; }

        /// <summary>
        ///     总大小
        /// </summary>
        public int TotalCount { get; set; } 

        /// <summary>
        ///     当前页大小
        /// </summary>
        public int CurrentPageSize
        {
            get { return Items.Count; }
        }

        /// <summary>
        ///     总页数
        /// </summary>
        public int TotalPageCount
        {
            get { return (int)Math.Ceiling(TotalCount / (double)PageSize); }
        }
    }
}