using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.Client.Controllers
{
    public class ClientController : Controller
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
       
        public ActionResult ClientDetail()
        {
            return View();
        }

        #endregion

    }
}