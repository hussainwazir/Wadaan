﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.Project
{
    public class ProjectAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Project";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Project_default",
                "Project/{controller}/{action}/{id}",
                new { action = "Dashboard", id = UrlParameter.Optional }
            );
        }
    }
}