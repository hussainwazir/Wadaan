using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.EmployeeArea
{
    public class EmployeeAreaRegistration : AreaRegistration
    {

        public override string AreaName
        {
            get
            {
                return "EmployeeArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "EmployeeArea_default",
                "EmployeeArea/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}