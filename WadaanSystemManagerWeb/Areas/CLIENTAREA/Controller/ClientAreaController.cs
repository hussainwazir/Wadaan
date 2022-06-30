using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.CLIENTAREA
{
    public class ClientAreaController : Controller
    {
        #region =========================== Dashboard =============================


        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult ProjectList()
        {
            return View();
        }

        public ActionResult ProjectDetail()
        {
            return View();
        }
        public ActionResult CATaskList()
        {
            return View();
        }
        public ActionResult CATaskDetail()
        {
            return View();
        }

        #endregion


    }
}