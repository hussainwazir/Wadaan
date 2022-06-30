using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.EmployeeArea
{
    public class EmployeeAreaController : Controller
    {
        #region =========================== Dashboard =============================


        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult EAProjectList()
        {
            return View();
        }
        public ActionResult EAProjectTaskList()
        {
            return View();
        }

        public ActionResult EAProjectDetail()
        {
            return View();
        }
        public ActionResult EATaskList()
        {
            return View();
        }
        public ActionResult EATaskDetail()
        {
            return View();
        }

        #endregion


    }
}