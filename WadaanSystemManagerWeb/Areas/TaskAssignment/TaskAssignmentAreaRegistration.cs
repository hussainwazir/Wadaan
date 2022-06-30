using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.TaskAssignment
{
    public class TaskAssignmentAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "TaskAssignment";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "TaskAssignment_default",
                "TaskAssignment/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}