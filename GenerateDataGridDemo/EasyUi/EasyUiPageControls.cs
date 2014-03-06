
using System;
using System.Web.Mvc;

namespace GenerateDataGridDemo.EasyUi
{
    public class EasyUiPageControls
    {
        #region Private

        private const string LinkbuttonFormate = "<a href=\"javascript:\" class=\"{3}\" title=\"{0}\" data-options=\"{1}\" id=\"{2}\"  {4}>{0}</a>";

        private static MvcHtmlString CreateLinkButton(string name, string dataOptions, string id, string buttonType, string property)
        {
            return new MvcHtmlString(string.Format(LinkbuttonFormate, name, dataOptions, id, buttonType, property));
        }

        #endregion

        #region In SearchControls

        //private static readonly HtmlHelper Html = new HtmlHelper(null, null);  
        /// <summary>
        ///  搜索框
        /// </summary>
        /// <param name="startName"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static MvcHtmlString SearchTimeInput(string startName = " 注册日期起：", string end = "止")
        {
            var str = startName
                + "<input class=\"easyui-datebox\" name=\"StartTime\" id=\"StartTime\" style=\"width: 110px\" validtype=\"led['2188-01-01']\">"
                + end
                + "<input class=\"easyui-datebox\" name=\"EndTime\" id=\"EndTime\" style=\"width: 110px\" validtype=\"ged['1000-01-08']\">";
            return new MvcHtmlString(str);
        }

        /// <summary>
        /// 关键字
        /// </summary>
        /// <returns></returns>
        public static MvcHtmlString SearchKeyWordInput(string showName = "", string id = "KeyWord", string property = "", string type = "text")
        {
            property = property.IndexOf("style", StringComparison.CurrentCultureIgnoreCase) >= 0 ? property : property + "  style='width:100px'";
            return new MvcHtmlString(string.Format("{0}<input type=\"{3}\" name=\"{1}\" id=\"{1}\" {2}   />",
                    showName ?? "", id, property, type));
        }



        #endregion

        #region Add  Delete Modify  Forbid Rmove

        /// <summary>
        /// Search
        /// </summary>
        /// <returns></returns>
        public static MvcHtmlString SearchButton(string property = "", string name = "搜索", string id = "searchLoadList", string dataOptions = "")
        {
            if (string.IsNullOrWhiteSpace(dataOptions))
            {
                dataOptions = IconCls.Search;
            }
            return CreateLinkButton(name, dataOptions, id, "easyui-linkbutton", property);
        }


        #endregion
    }
}