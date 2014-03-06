using System;

namespace WebSeat.Web.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false), Serializable]
    public class ExcelColumnAttribute : Attribute
    {
        public string Name { get; set; }
        public int Order { get; set; }
    }
}
