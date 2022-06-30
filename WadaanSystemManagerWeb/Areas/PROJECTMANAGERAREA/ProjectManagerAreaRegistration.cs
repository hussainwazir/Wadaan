using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.PROJECTMANAGERAREA
{
    public class ProjectManagerAreaRegistration : AreaRegistration
    {

        public override string AreaName
        {
            get
            {
                return "ProjectManagerArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "ProjectManagerArea_default",
                "ProjectManagerArea/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}