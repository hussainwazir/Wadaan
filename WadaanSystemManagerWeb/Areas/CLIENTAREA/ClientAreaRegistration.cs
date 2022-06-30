using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.CLIENTAREA
{
    public class ClientAreaRegistration : AreaRegistration
    {

        public override string AreaName
        {
            get
            {
                return "CLIENTAREA";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CLIENTAREA_default",
                "CLIENTAREA/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}