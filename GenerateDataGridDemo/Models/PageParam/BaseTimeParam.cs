using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GenerateDataGridDemo.EasyUi;

namespace GenerateDataGridDemo.Models.PageParam
{
    public class BaseTimeParam : EasyUIPagerParamModel
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}