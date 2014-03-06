using System.Web.Optimization;

namespace GenerateDataGridDemo.App_Start
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region JS

            //jquery
            bundles.Add(new ScriptBundle("~/bundles/base").Include(
                "~/Scripts/jquery-{version}.js" //"~/Scripts/jquery-1.10.2.js" //
                ));

            /*bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));*/
            //validate
            bundles.Add(new ScriptBundle("~/bundles/validate").Include(
                "~/Scripts/jquery.unobtrusive*",
                "~/Scripts/jquery.validate*"
                ));
            //knockout
            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/knockout-{version}.js"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            //bootstrap
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js"));

            //artDialog
            //bundles.Add(new ScriptBundle("~/Scripts/artDialog/js").IncludeDirectory(
            //    "~/Scripts/artDialog", "a*"));

            //Jquery tools
            bundles.Add(new ScriptBundle("~/bundles/jquerytools").Include(
                "~/Scripts/jquery.json.js",
                "~/Scripts/jquery.form.js",
                "~/Scripts/jquery.cookie.js"
                ));

            /*//Jquery Ui
                bundles.Add(new ScriptBundle("~/Scripts/JqueryUi/ui/js").Include(
                    "~/Scripts/JqueryUi/ui/jquery.ui.core.js",
                    "~/Scripts/JqueryUi/ui/jquery.ui.datepicker.js",
                    "~/Scripts/JqueryUi/ui/i18n/jquery.ui.datepicker-zh-CN.js"
                    ));*/

            //My Js
            bundles.Add(new ScriptBundle("~/bundles/mycomjs").Include(
                "~/Content/Js/webseat.core.js",
                "~/Content/Js/webseat.common.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/myJs").Include(
                "~/Content/Js/webseat.AdminIndex.js",
                "~/Content/Js/webseat.SearceForm.js",
                "~/Content/Js/webseat.EasyUiExtend.js",
                "~/Content/Js/webseat.EasyUi.js",
                "~/Content/Js/webseat.Form.js",
                "~/Content/Js/webseat.pageDataInit.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/myJs/inputSuggest").Include(
                "~/Content/Js/inputSuggest.js"
                ));

            #endregion

            #region CSS

            //bootstrap
            bundles.Add(new StyleBundle("~/Content/bootstrap/css").Include(
                //"~/Content/site.css",
                "~/Content/bootstrap/bootstrap.css",
                "~/Content/bootstrap/bootstrap-theme.css"));

            //EasyUI原始主题
           /* bundles.Add(new StyleBundle("~/Scripts/EasyUI/themes/" + SiteConfig.EasyUITheme + "/css").Include(
                "~/Scripts/EasyUI/themes/" + SiteConfig.EasyUITheme + "/easyui.css"
                ));*/
            bundles.Add(new StyleBundle("~/Scripts/EasyUI/themes/bootstrap/css").Include(
                "~/Scripts/EasyUI/themes/bootstrap/easyui.css"
                ));

            bundles.Add(new StyleBundle("~/Scripts/EasyUI/themes/iconcss").Include(
                "~/Scripts/EasyUI/themes/icon.css",
                "~/Scripts/EasyUI/themes/myicon.css"
                ));

            // 
            bundles.Add(new StyleBundle("~/Content/mycss").Include(
                "~/Content/Css/Style.css"
                ));

            

            bundles.Add(new StyleBundle("~/Content/Site").Include(
                "~/Content/Site.css"
                ));

            bundles.Add(new StyleBundle("~/Scripts/artDialog/skins/css").Include(
                "~/Scripts/artDialog/skins/default.css"
                ));
 

            #endregion
        }
    }
}