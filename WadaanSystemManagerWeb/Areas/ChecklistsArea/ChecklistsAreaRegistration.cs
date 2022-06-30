using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace WadaanSystemManager.Areas.ChecklistsArea
{
    public class ChecklistsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Checklists";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Checklists_default",
                "ChecklistsArea/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}