using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.Calender
{
    public class AccessControlAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "AccessControl";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "AccessControl_default",
                "AccessControl/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}