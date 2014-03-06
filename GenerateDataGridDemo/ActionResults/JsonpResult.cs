 

using System;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace GenerateDataGridDemo.ActionResults
{
    public class JsonPResult : JsonResult
    {
        private const string JsonpCallbackName = "callback";
        private const string CallbackApplicationType = "application/json";

        /// <summary>
        /// Enables processing of the result of an action method by a custom type that inherits from the <see cref="T:System.Web.Mvc.ActionResult"/> class.
        /// </summary>
        /// <param name="context">The context within which the result is executed.</param>
        /// <exception cref="T:System.ArgumentNullException">The <paramref name="context"/> parameter is null.</exception>
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            if ((JsonRequestBehavior == JsonRequestBehavior.DenyGet) && String.Equals(context.HttpContext.Request.HttpMethod, "GET"))
            {
                throw new InvalidOperationException();
            }

            var response = context.HttpContext.Response;
            response.ContentType = !String.IsNullOrEmpty(ContentType) ? ContentType : CallbackApplicationType;

            if (ContentEncoding != null) response.ContentEncoding = ContentEncoding;

            if (Data == null) return;

            var request = context.HttpContext.Request;
            var serializer = new JavaScriptSerializer();

            var buffer = request[JsonpCallbackName] != null ? 
                String.Format("{0}({1})", request[JsonpCallbackName], serializer.Serialize(Data)) : 
                serializer.Serialize(Data);

            response.Write(buffer);
        }
    }
}
