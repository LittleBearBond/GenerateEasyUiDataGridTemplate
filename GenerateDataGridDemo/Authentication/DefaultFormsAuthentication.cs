 
using System;
using System.Web;
using System.Web.Security;

namespace GenerateDataGridDemo.Authentication
{
    /// <summary>
    /// Class DefaultFormsAuthentication
    /// </summary>
    public class DefaultFormsAuthentication : IFormsAuthentication
    {
        /// <summary>
        /// Sets the auth cookie.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="persistent">if set to <c>true</c> [persistent].</param>
        public void SetAuthCookie(string userName, bool persistent)
        {
            FormsAuthentication.SetAuthCookie(userName, persistent);
        }

        /// <summary>
        /// Signouts this instance.
        /// </summary>
        public void Signout()
        {
            FormsAuthentication.SignOut();
        }

        /// <summary>
        /// Sets the auth cookie.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        /// <param name="authenticationTicket">The authentication ticket.</param>
        /// <param name="expires">The expires.</param>
        public void SetAuthCookie(HttpContextBase httpContext, FormsAuthenticationTicket authenticationTicket, DateTime? expires = null)
        {
            var encryptedTicket = FormsAuthentication.Encrypt(authenticationTicket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            if (null != expires) cookie.Expires = expires.Value;
            httpContext.Response.Cookies.Add(cookie);

        }
        /// <summary>
        /// Sets the auth cookie.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        /// <param name="authenticationTicket">The authentication ticket.</param>
        /// <param name="expires">The expires.</param>
        public void SetAuthCookie(HttpContext httpContext, FormsAuthenticationTicket authenticationTicket, DateTime? expires = null)
        {
            var encryptedTicket = FormsAuthentication.Encrypt(authenticationTicket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            if (null != expires) cookie.Expires = expires.Value;
            httpContext.Response.Cookies.Add(cookie);
        }

        /// <summary>
        /// Calculates the cookie expiration date.
        /// </summary>
        /// <returns>DateTime.</returns>
        private static DateTime CalculateCookieExpirationDate()
        {
            return DateTime.Now.Add(FormsAuthentication.Timeout);
        }

        /// <summary>
        /// Decrypts the specified encrypted ticket.
        /// </summary>
        /// <param name="encryptedTicket">The encrypted ticket.</param>
        /// <returns>FormsAuthenticationTicket.</returns>
        public FormsAuthenticationTicket Decrypt(string encryptedTicket)
        {
            return FormsAuthentication.Decrypt(encryptedTicket);
        }
    }
}
