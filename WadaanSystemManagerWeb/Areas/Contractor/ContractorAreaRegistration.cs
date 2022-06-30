using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace WadaanSystemManager.Areas.Contractor
{
    public class ContractorAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Contractor";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Contractor_default",
                "Contractor/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}