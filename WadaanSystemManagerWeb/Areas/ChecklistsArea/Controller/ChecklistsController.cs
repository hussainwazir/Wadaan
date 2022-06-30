using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.ChecklistsArea
{
    public class ChecklistsController : Controller
    {
        #region =========================== Dashboard =============================

        public ActionResult Index()
        {
            return View("~/Areas/ChecklistsArea/Views/Checklist/Index.cshtml");
        }

        //    return View("~/Areas/ChecklistsArea/Views/Checklist/Save.cshtml");
       
       public ActionResult Save()
       {
            return View("~/Areas/ChecklistsArea/Views/Save.cshtml");
       }
        


        #endregion

    }
}
