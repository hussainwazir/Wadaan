using WadaanSystemManagerCommand.Command;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using XtremeTech.Core;
using XtremeTech.FileUploader;
using XtremeTech.Repository;
using APFManagerCommand;
using System.Data;
using WadaanSystemManagerCommand.Model;

namespace WadaanSystemManagerCommand.Command
{


    #region ========================== Employee Select =================================
    [Command(Name = "Roles_SelectManagerDDL")]
    public class Roles_SelectManagerDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.Roles_SelectManagerDDL.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "AssignedEmpToManager_Select")]
    public class AssignedEmpToManager_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.AssignedEmpToManager_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }

    [Command(Name = "AssignedEmployeeToManager_EmployeeMultipleID_Save")]
    public class AssignedEmployeeToManager_EmployeeMultipleID_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                AssignedEmployeeToManager_EmployeeMultipleIDs = new List<AssignedEmployeeToManager_EmployeeMultipleIDs>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                var table = new KeyValuePair<string, DataTable>("[dbo].[AssignedEmployeeToManager_EmployeeMultipleIDs]", ExtentionMethodes.ToDataTable(model.AssignedEmployeeToManager_EmployeeMultipleIDs));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@AssignedEmployeeToManager_EmployeeMultipleIDs", table);

                return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.AssignedEmployeeToManager_EmployeeMultipleIDs_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    [Command(Name = "AssignedEmployeeToManager_SelectManager")]
    public class AssignedEmployeeToManager_SelectManagerCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.AssignedEmployeeToManager_SelectManager.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "AssignedEmpToManager_SelectEmployeeByManagerID")]
    public class AssignedEmpToManager_SelectEmployeeByManagerIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ManagerID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.AssignedEmpToManager_SelectEmployeeByManagerID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }




    [Command(Name = "Employee_SelectWithOutManager")]
    public class Employee_SelectWithOutManagerCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ManagerID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Employee_SelectWithOutManager.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }

            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "AssignedEmployeeToManager_DeleteByEmployeeID")]
    public class AssignedEmployeeToManager_DeleteByEmployeeIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new {EmployeeID = Guid.Empty, ManagerID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.AssignedEmployeeToManager_DeleteByEmployeeID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    [Command(Name = "Employee_ListAssignToManager")]
    public class Employee_ListAssignToManagerCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { UserID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Employee_ListAssignToManager.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Manager_Dashboard")]
    public class Manager_DashboardCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { UserID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Manager_Dashboard.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    #endregion


}