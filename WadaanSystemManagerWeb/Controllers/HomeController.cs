using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Controllers
{
    public class HomeController : Controller
    {

        #region ======================== Home Module ==================================
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        #endregion

        #region ======================== Forget Password ==============================
        public ActionResult ForgotPassword()
        {
            return View("~/Views/Home/ForgotPassword.cshtml");
        }


        #endregion

        #region ======================= CONTACTUS =====================================
        public ActionResult ContactUs()
        {
            return View("~/Views/Home/ContactUs.cshtml");
        }
        #endregion

        #region ======================= SERVICES ======================================
        public ActionResult Services(string title)
        {
            ViewBag.serviceTitle = title;
            return View("~/Views/Home/Services.cshtml");
        }

        [ActionName("architecture-services")]
        public ActionResult ArchitectureServices()
        {
            return View("~/Views/Home/Services/architecture-services.cshtml");
        }
        [ActionName("interior-design-services")]
        public ActionResult InteriorDesignServices()
        {
            return View("~/Views/Home/Services/interior-design-services.cshtml");
        }

        public ActionResult construction()
        {
            return View("~/Views/Home/Services/construction.cshtml");
        }

        #endregion

        #region ============================== Blog ===================================
        public ActionResult Blog()
        {
            return View();
        }
        #endregion

        #region ============================== HOME ===================================
        public ActionResult PrivacyPolicy()
        {
            return View();
        }

        #endregion

        #region=============================== PROJECTS DETAILS AREA  ================
        [ActionName("portfolio")]
        public ActionResult ProjectDetails()
        {

            return View("~/Views/Home/Projects/ProjectDetails.cshtml");

        }
        #endregion

        #region=============================== PROJECTS AREA COMMERCIAL ==============
        public ActionResult Commercial()
        {

            return View("~/Views/Home/Projects/Commercial.cshtml");

        }
        public ActionResult CommercialDetails()
        {

            return View("~/Views/Home/Projects/CommercialProjectDetails.cshtml");

        }
        #endregion

        #region ============================== PROJECTS AREA RESEDENTIALS =============

        public ActionResult Residential()
        {
            return View("~/Views/Home/Projects/Residential.cshtml");
        }
        public ActionResult ResidentialProjectDetails()
        {

            return View("~/Views/Home/Projects/ResidentialProjectDetails.cshtml");

        }

        public ActionResult ProjectDetail()
        {

            return View("~/Views/Home/Projects/ProjectDetailsFromBanner.cshtml");

        }
        #endregion

        #region ============================== DESING =================================

        public ActionResult Design()
        {
            return View();
        }


        #endregion

        #region ============================== CATEGORY ===============================

        public ActionResult Architecture()
        {
            return View();
        }

        public ActionResult InteriorDesigning()
        {
            return View();
        }

        public ActionResult Uncategorized()
        {
            return View();
        }



        #endregion

        #region ============================== CATEGORIES =====================================

        public ActionResult InteriorDesign()
        {
            return View();
        }

        public ActionResult InteriorDesignPage2()
        {
            return View();
        }
        public ActionResult InteriorDesignPage3()
        {
            return View();
        }
        public ActionResult InteriorDesignPage4()
        {
            return View();
        }
        public ActionResult InteriorDesignPage5()
        {
            return View();
        }


        #endregion

        #region ============================== Best Residential Architects =====================================

        public ActionResult BestResidentialArchitects()
        {
            return View();
        }

        public ActionResult BestResidentialArchitectsPage2()
        {
            return View();
        }
        public ActionResult BestResidentialArchitectsPage3()
        {
            return View();
        }
        public ActionResult BestResidentialArchitectsPage4()
        {
            return View();
        }
        public ActionResult BestResidentialArchitectsPage5()
        {
            return View();
        }

        #endregion

        #region ============================== DESIGN MAGZINE STORIES=====================================

        public ActionResult MagzineDesign()
        {
            return View();
        }

        #endregion

        #region ============================== ART=====================================

        public ActionResult Art()
        {
            return View();
        }

        #endregion

        #region ============================== PAGE NOT FOUND =====================================

        public ActionResult PageNotFound()
        {
            return View();
        }

        #endregion



    }
}