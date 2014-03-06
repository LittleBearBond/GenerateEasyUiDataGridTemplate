// ***********************************************************************
// Assembly         : WebSeat.Web.Core
// Author           : Tinkyo
// Created          : 05-29-2013
//
// Last Modified By : Tinkyo
// Last Modified On : 06-05-2013
// ***********************************************************************
// <copyright file="UserAuthenticationTicketBuilder.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Web.Security;
using WebSeat.Core.Extends;

namespace WebSeat.Web.Core.Authentication
{
    /// <summary>
    /// Class UserAuthenticationTicketBuilder
    /// </summary>
    public class UserAuthenticationTicketBuilder
    {
        /// <summary>
        /// Creates the authentication ticket.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="user">The user.</param>
        /// <returns>FormsAuthenticationTicket.</returns>
        public static FormsAuthenticationTicket CreateAuthenticationTicket(string name, UserCookie user)
        {
            var ticket = new FormsAuthenticationTicket(
                1,
                name,
                DateTime.Now,
                DateTime.Now.Add(FormsAuthentication.Timeout),
                false,
                user.ToJson());

            return ticket;
        }
    }
}
