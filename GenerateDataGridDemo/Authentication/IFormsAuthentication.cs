 
using System;
using System.Web;
using System.Web.Security;

namespace GenerateDataGridDemo.Authentication
{
    /// <summary>
    /// Interface IFormsAuthentication
    /// </summary>
    public interface IFormsAuthentication
    {
        /// <summary>
        /// Signouts this instance.
        /// </summary>
        void Signout();
        /// <summary>
        /// Sets the auth cookie.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        /// <param name="authenticationTicket">The authentication ticket.</param>
        /// <param name="expires">The expires.</param>
        void SetAuthCookie(HttpContextBase httpContext, FormsAuthenticationTicket authenticationTicket, DateTime? expires = null);
        /// <summary>
        /// Sets the auth cookie.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        /// <param name="authenticationTicket">The authentication ticket.</param>
        /// <param name="expires">The expires.</param>
        void SetAuthCookie(HttpContext httpContext, FormsAuthenticationTicket authenticationTicket, DateTime? expires = null);
        /// <summary>
        /// Decrypts the specified encrypted ticket.
        /// </summary>
        /// <param name="encryptedTicket">The encrypted ticket.</param>
        /// <returns>FormsAuthenticationTicket.</returns>
        FormsAuthenticationTicket Decrypt(string encryptedTicket);
    }
}
