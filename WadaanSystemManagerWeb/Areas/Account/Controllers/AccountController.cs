using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WadaanSystemManager.Areas.Account.Controllers
{
    public class AccountController : Controller
    {
        #region =========================== Dashboard =============================


        public ActionResult Dashboard()
        {
            return View();
        }

        #endregion
        #region =========================== Account Chart Of Accounts =============================


        public ActionResult ChartOfAccounts()
        {
            return View();
        }
        public ActionResult AccountSave()
        {
            return View();
        }
        public ActionResult ChildAccountSave()
        {  
            return View("~/Areas/Account/Views/Account/ChildAccount/ChildAccountSave.cshtml");
           
        }
      

        #endregion 
        #region =========================== Account Detail =============================

        
         public ActionResult AccountDetail()
        {
            return View();
        }

        #endregion
        //#region =========================== Assets =============================


        //public ActionResult Assets()
        //{
        //    return View();
        //}
        //public ActionResult AssetSave()
        //{
        //    return View();
        //}

        //#endregion
        //#region =========================== Liabilities =============================

        //public ActionResult Liabilities()
        //{
        //    return View();
        //}
        //public ActionResult LiabilitySave()
        //{
        //    return View();
        //}
        //#endregion
        //#region =========================== Equity =============================

        //public ActionResult Equity()
        //{
        //    return View();
        //}
        //public ActionResult EquitySave()
        //{
        //    return View();
        //}

        //#endregion
        //#region =========================== Expenses =============================

        //public ActionResult Expenses()
        //{
        //    return View();
        //}
        //public ActionResult ExpensesSave()
        //{
        //    return View();
        //}

        //#endregion 
        //#region =========================== Revenue =============================

        //public ActionResult Revenue()
        //{
        //    return View();
        //}
        //public ActionResult RevenueSave()
        //{
        //    return View();
        //}

        //#endregion
        //#region =========================== Archive =============================

        //public ActionResult Archive()
        //{
        //    return View();
        //}
        //public ActionResult ArchiveSave()
        //{
        //    return View();
        //}


        //#endregion

    }
}