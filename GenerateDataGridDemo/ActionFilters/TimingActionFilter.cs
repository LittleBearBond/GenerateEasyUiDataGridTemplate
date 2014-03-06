using System.Diagnostics;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace GenerateDataGridDemo.ActionFilters
{
    public class TimingActionFilter : ActionFilterAttribute
    {
        private const string Key = "__action_duration__";
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            //if (SkipLogging(actionContext))
            //{
            //    return;
            //}
            var stopWatch = new Stopwatch();
            actionContext.Request.Properties[Key] = stopWatch;
            stopWatch.Start();
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (!actionExecutedContext.Request.Properties.ContainsKey(Key))
            {
                return;
            }

            var stopWatch = actionExecutedContext.Request.Properties[Key] as Stopwatch;
            if (stopWatch != null)
            {
                stopWatch.Stop();
                var actionName = actionExecutedContext.ActionContext.ActionDescriptor.ActionName;
                var controllerName = actionExecutedContext.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                Debug.Print("[Execution of{0}- {1} took {2}.]", controllerName, actionName, stopWatch.Elapsed);
            }

        }

        /*private static bool SkipLogging(HttpActionContext actionContext)
        {
            return actionContext.ActionDescriptor.GetCustomAttributes<NoLogAttribute>().Any() || 
                    actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<NoLogAttribute>().Any();
        }*/

    }

   /* [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true)]
    public class NoLogAttribute : Attribute
    {

    }*/
}