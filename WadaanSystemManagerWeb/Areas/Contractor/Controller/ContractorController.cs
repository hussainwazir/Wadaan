using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.Contractor
{
    public class ContractorController : Controller
    {
        #region =========================== Dashboard =============================

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult Save()
        {
            return View();
        }
       
        public ActionResult ContractorDetail()
        {
            return View();
        }

        #endregion

    }
}