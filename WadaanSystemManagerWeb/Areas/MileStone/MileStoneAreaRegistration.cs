using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.MileStone
{
    public class MileStoneAreaRegistration : AreaRegistration
    {

        public override string AreaName
        {
            get
            {
                return "MileStone";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MileStone_default",
                "MileStone/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}