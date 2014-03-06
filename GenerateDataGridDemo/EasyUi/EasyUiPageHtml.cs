 

namespace GenerateDataGridDemo.EasyUi
{
    public class EasyUiPageHtml
    {
        public static string FormateOperate(string name = "操作", string dataoptions = "")
        {
            if (string.IsNullOrWhiteSpace(dataoptions))
            {
                dataoptions = "field:'" + name + "',align:'center',formatter:formatOperate";
            }
            return "<th data-options=\"" + dataoptions + "\">" + name + "</th>";
        }

        public static string FirstCheckBox(string fileId = "Id")
        {
            return "<th data-options=\"field:'" + fileId + "',checkbox:true\"></th>";
        }
    }
}
