using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.CEOAREA
{
    public class CEOAreaRegistration : AreaRegistration
    {

        public override string AreaName
        {
            get
            {
                return "CEOAREA";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CEOAREA_default",
                "CEOAREA/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}