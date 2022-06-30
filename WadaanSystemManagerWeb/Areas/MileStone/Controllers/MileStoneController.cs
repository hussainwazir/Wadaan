using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.MileStone.Controllers
{
    public class MileStoneController : Controller
    {
        #region =========================== Dashboard =============================


        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult Save()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MileStoneDetail()
        {
            return View();
        }

        #endregion

        #region ============================ Profile Details ==============================

        public ActionResult Profile()
        { 
            return View("");
        }
        #endregion
    }
}