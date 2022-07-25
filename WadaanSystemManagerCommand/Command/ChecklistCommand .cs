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

namespace WadaanSystemManagerCommand.Command
{
    #region ========================== CUSTOMER MODULE =================================

    [Command(Name = "CheckList_Select")]
    public class CheckList_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                
                return repository.GetMultiple<dynamic>(StoreProcedure.CheckList_Select.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "ViewChecklist_Select")]
    public class ViewChecklist_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { Staus = false, returnURL = "#" };
            var model = base.MappedModel(new { taskname = string.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);

                return repository.GetMultiple<dynamic>(StoreProcedure.ViewChecklist_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    

    #endregion 


    #region ======================= Check List Delete =======================
    [Command (Name = "CheckList_Delete")]

   public class CheckList_DeleteCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {

            object result = new { Staus = false, returnURL = "#" };
            var model = base.MappedModel(new { CheckListID = Guid.Empty }, v);

            try
            {

                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.CheckList_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch(Exception ex)
            {
                    result = new { status = false, message = ex.Message };
            }
            return result;

        }
    }

    #endregion

    #region ======================= CheckList Save =======================
    [Command(Name = "CheckList_Save")]
    public class CheckList_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {

                CheckListID = Guid.Empty,
                TaskName = string.Empty,
                TaskStatus = string.Empty,
                Description = string.Empty,
                ChecklistType = string.Empty,
                UserID = Guid.Empty

                //UploadedFiles = new List<FileUploadModel>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.CheckList_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                
                return _response == null ? model.CheckListID : _response.Id;
            }
            catch (Exception ex)
            {
                result = new
                {
                    status = false,
                    message = ex.Message
                };
            }
            return result;
        }
    }

    #endregion ==============================================


    #region ======================= CheckList Select By ID =======================

    [Command(Name = "CheckList_SelectById")]
    public class CheckList_SelectByIdCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { CheckListID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.CheckList_SelectById.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    #endregion


    //[Command(Name = "Contractor_SelectDetailByID")]
    //public class Contractor_SelectDetailByIDCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        object result = new { status = false, returnUrl = "#" };
    //        var model = base.MappedModel(new { ContractorID = Guid.Empty }, v);

    //        try
    //        {
    //            var repository = Ioc.Resolve<IRepository>();
    //            IDictionary<string, object> values = new Dictionary<string, object>();
    //            CommandParameters _params = new CommandParameters();

    //            values = _params.Get(model);
    //            return repository.GetMultiple<dynamic>(StoreProcedure.Contractor_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        }
    //        catch (Exception ex)
    //        {
    //            result = new { status = false, message = ex.Message };
    //        }
    //        return result;
    //    }
    //}


}








