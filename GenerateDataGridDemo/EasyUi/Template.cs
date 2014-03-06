using System.Text.RegularExpressions;

namespace GenerateDataGridDemo.EasyUi
{
    public static class Template
    {
        public const string DataGridTh = "<th data-options=\"field:'{field}',align:'center',{d}\"  {property}> {v}</th>";
        /// <summary>
        /// \{v\} 显示的名称
        /// </summary>
        public static Regex RegV = new Regex(@"\{v\}");
        /// <summary>
        /// \{field\}  字段
        /// </summary>
        public static Regex RegF = new Regex(@"\{field\}");
        /// <summary>
        /// \{d\}  DataOptions
        /// </summary>
        public static Regex RegD = new Regex(@"\{d\}");
        /// <summary>
        /// ,\{d\}  DataOptions 有逗号，把逗号一起替换掉
        /// </summary>
        public static Regex RegDi = new Regex(@",\{d\}");
        /// <summary>
        /// Propertity
        /// </summary>
        public static Regex RegP = new Regex(@"\{property\}");
    }
}
