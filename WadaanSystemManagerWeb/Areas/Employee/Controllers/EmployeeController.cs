using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.Employee.Controllers
{
    public class EmployeeController : Controller
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
        public ActionResult EmployeeDetail()
        {
            return View();
        }
        public ActionResult Profile()
        {
            return View();
        }
        #endregion

      
        #region ============================ Profile Details ==============================

        public ActionResult Profile22()
        {
            return View("~/Areas/Employee/Views/ProfileView/Profile.cshtml");
        }
        #endregion

        #region ========================= Employee Profile Print ================================

        public ActionResult EmployeePrint()
        {
            return View();
        }

        #endregion
        #region ============================ About Us ==============================

        public ActionResult AboutUs()
        {
            return View("~/Areas/Employee/Views/AboutUs/AboutUs.cshtml");
        }
        #endregion


        #region ========================= Service Type ================================

        public ActionResult ServiceType()
        {
            return View("~/Areas/Employee/Views/ServiceType/ServiceType.cshtml");
        }

        #endregion


    }
}