/*#region << Version comment>>

/*
 * ========================================================================
 * Copyright(c) 2012-2014 成都网席科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * Desc WEB UI端相关的公共方法或者扩展方法
 *  
 * Author：[熊建]   时间：2014/01/02
 * FileName：WebExtension.cs
 * Version：V1.0.0
 * 
 * Modified by：           Time：               
 * Modify the description：
 * ========================================================================
#1#

#endregion
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using WebSeat.Core;
using WebSeat.Core.Exceptions;
using WebSeat.FlipCourse.Util.Result;
using WebSeat.Web.Core.ActionResult;
using WebSeat.Web.Core.Helpers;

namespace WebSeat.Web.Core.Extends
{
    /// <summary>
    ///     Class WebExtension
    /// </summary>
    public static class WebExtension
    {
        public static string GetMessage(this Exception ex)
        {
            return ex.InnerException != null ? ex.InnerException.GetMessage() : ex.Message;
        }

        /// <summary>
        ///     To the message.
        /// </summary>
        /// <param name="code">The code.</param>
        /// <returns>System.String.</returns>
        public static string ToMessage(this InvokCode code)
        {
            //return InvokeResultResource.ResourceManager.GetString(code.ToString());
            return "";
        }
        /// <summary>
        /// 调用方法读取数据 并且 把 HandleResult<TGResult/>转换成 ClientResult<TResult/>
        /// </summary>
        /// <typeparam name="TGResult"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="fun"></param>
        /// <returns></returns>
        public static ClientResult<TResult> Invoke<TGResult, TResult>(Func<HandleResult<TGResult>> fun)
        {
            var result = new ClientResult<TResult> { Success = true };
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            try
            {
                HandleResult<TGResult> data = fun();
                result.Success = data.Success;
                result.Message = data.Message;
                result.Result = Mapper.Map<TGResult, TResult>(data.Result);
            }
            catch (WebSeatException ex)
            {
                result.Success = false;
                result.Message = string.Format("{0}({1})", ex.Code.ToMessage(), ex.Description);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.GetMessage();
                LogHelper.Error(ex);
            }
            finally
            {
                stopWatch.Stop();
                var time = stopWatch.ElapsedMilliseconds;
                if (time > 3000)
                {
#if DEBUG
                    LogHelper.Error(new Exception(),
                        string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name, time));
#endif
                }
                else
                {
                    LogHelper.Log(string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name, time));
                }
            }
            return result;
        }

        /// <summary>
        /// 调用方法  返回ClientResult<TResult/> 但是没有对Result进行映射转换
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="fun"></param>
        /// <returns></returns>
        public static ClientResult<TResult> Invoke<TResult>(Func<HandleResult<TResult>> fun)
        {
            var result = new ClientResult<TResult> { Success = true };
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            try
            {
                HandleResult<TResult> data = fun();
                result.Success = data.Success;
                result.Message = data.Message;
                result.Result = data.Result;
            }
            catch (WebSeatException ex)
            {
                result.Success = false;
                result.Message = string.Format("{0}({1})", ex.Code.ToMessage(), ex.Description);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.GetMessage();
                LogHelper.Error(ex);
            }
            finally
            {
                stopWatch.Stop();
                var time = stopWatch.ElapsedMilliseconds;
                if (time > 3000)
                {
#if DEBUG
                    LogHelper.Error(new Exception(),
                        string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name, time));
#endif
                }
                else
                {
                    LogHelper.Log(string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name, time));
                }
            }
            return result;
        }

        #region 和我们现在的项目无关
        /#1#// <summary>
        ///     Invokes the specified fun.
        /// </summary>
        /// <typeparam name="TResult">The type of the T result.</typeparam>
        /// <param name="fun">The fun.</param>
        /// <returns>InvokeWebResult{``0}.</returns>
        public static InvokeWebResult<TResult> Invoke<TResult>(Func<InvokeResult<TResult>> fun)
        {
            var result = new InvokeWebResult<TResult>();
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            try
            {
                InvokeResult<TResult> data = fun();
                string message = data.Message;
#if DEBUG
                if (null != data.Description)
                {
                    message = string.Format("{0}:{1}", data.Message, data.Description);
                }
#endif
                result.Success = data.Success;
                result.Message = message;
                result.Data = data.Data;
            }
            catch (WebSeatException ex)
            {
                result.Success = false;
                result.Message = string.Format("{0}({1})", ex.Code.ToMessage(), ex.Description);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.GetMessage();
                LogHelper.Error(ex);
            }
            finally
            {
                stopWatch.Stop();
                var time = stopWatch.ElapsedMilliseconds;
                if (time > 3000)
                {
#if DEBUG
                    LogHelper.Error(new Exception(),
                        string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name,
                            time));
#endif
                }
                else
                {
                    LogHelper.Log(string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name,
                        time));
                }
            }
            return result;
        }

        /// <summary>
        ///     Invokes the specified fun.
        /// </summary>
        /// <typeparam name="TResult">The type of the T result.</typeparam>
        /// <param name="fun">The fun.</param>
        /// <returns>InvokeWebResult{``0}.</returns>
        public static async Task<InvokeWebResult<TResult>> InvokeAsync<TResult>(Func<Task<InvokeResult<TResult>>> fun)
        {
            var result = new InvokeWebResult<TResult>();
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            try
            {
                InvokeResult<TResult> data = await fun();
                string message = data.Message;
#if DEBUG
                if (null != data.Description)
                {
                    message = string.Format("{0}:{1}", data.Message, data.Description);
                }
#endif
                result.Success = data.Success;
                result.Message = message;
                result.Data = data.Data;
            }
            catch (WebSeatException ex)
            {
                result.Message = string.Format("{0}({1})", ex.Code.ToMessage(), ex.Description);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.GetMessage();
                LogHelper.Error(ex);
            }
            finally
            {
                stopWatch.Stop();
                double time = stopWatch.ElapsedMilliseconds;
                if (time > 3000)
                {
#if DEBUG
                    LogHelper.Error(new Exception(),
                        string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name,
                            time));
#endif
                }
                else
                {
                    LogHelper.Log(string.Format("调用方法:{0}.{1},  执行时间：{2}毫秒", fun.Method.DeclaringType, fun.Method.Name,
                        time));
                }
            }
            return result;
        }
        #1#
        #endregion

        public static JsonPResult Jsonp(Controller controller, object data)
        {
            var result = new JsonPResult
            {
                Data = data,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return result;
        }

        public static Exception Exception(this HtmlHelper htmlhelper)
        {
            var exception = htmlhelper.ViewContext.Controller.ViewData["Exception"] as Exception;
            return exception;
        }

        /// <summary>
        ///     从一个Cookie中读取值并转成指定的类型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cookie"></param>
        /// <returns></returns>
        public static T ConverTo<T>(this HttpCookie cookie)
        {
            return cookie == null ? default(T) : (T)Convert.ChangeType(cookie.Value, typeof(T));
        }

        /// <summary>
        ///     从一个Cookie中读取【JSON字符串】值并反序列化成一个对象，用于读取复杂对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cookie"></param>
        /// <returns></returns>
        public static T FromJson<T>(this HttpCookie cookie)
        {
            return null == cookie ? default(T) : cookie.Value.FromJson<T>();
        }


        /// <summary>
        ///     将一个对象写入到Cookie
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="name"></param>
        /// <param name="expries"></param>
        public static void WriteCookie(this object obj, string name, DateTime? expries)
        {
            if (obj == null)
                throw new ArgumentNullException("obj");
            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            var cookie = new HttpCookie(name, obj.ToString());
            if (expries.HasValue)
                cookie.Expires = expries.Value;
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        /// <summary>
        ///     删除指定的Cookie
        /// </summary>
        /// <param name="name"></param>
        public static void DeleteCookie(string name)
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("name");
            var cookie = new HttpCookie(name) { Expires = new DateTime(1991, 1, 1) };
            // 删除Cookie，其实就是设置一个【过期的日期】
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}*/