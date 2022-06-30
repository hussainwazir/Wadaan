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
    #region ========================== Account Select MODULE ==================================

    [Command(Name = "Account_Select")]
    public class Account_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.Account_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }

    #endregion

    #region  ==========================  Account Save MODULE  ==================================
    [Command(Name = "Account_Save")]
    public class Account_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                Id = 0,
                TaxID = 0,
                AccountTypeId = 0,
                Name = string.Empty,
                Code = string.Empty,
                Detail = string.Empty,
                ShowDashboardAsWatchlist = string.Empty,
                ShowInExpenseClaim = string.Empty,
                EnablePaymentToThisAccount = string.Empty,

                UploadedFiles = new List<FileUploadModel>()
                //Id = Guid.Empty,
                //TaxID = Guid.Empty,
                //AccountTypeId = Guid.Empty,
                //Name = string.Empty,
                //Code = string.Empty,
                //Detail = string.Empty,
                //ShowDashboardAsWatchlist = string.Empty,
                //ShowInExpenseClaim = string.Empty,
                //EnablePaymentToThisAccount = string.Empty,

                //UploadedFiles = new List<FileUploadModel>()

            }, v);


            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                // CommandParameters _params = new CommandParameters();
                // values = _params.Get(model);



                values.Add("@Id", model.Id);
                values.Add("@AccountTypeId", model.AccountTypeId);
                values.Add("@TaxID", model.TaxID);
                values.Add("@Name", model.Name);
                values.Add("@Code", model.Code);
                values.Add("@Detail", model.Detail);


                if (model.ShowDashboardAsWatchlist == null) { values.Add("@ShowDashboardAsWatchlist", 0); } else { values.Add("@ShowDashboardAsWatchlist", model.ShowDashboardAsWatchlist); }
                if (model.ShowInExpenseClaim == null) { values.Add("@ShowInExpenseClaim", 0); } else { values.Add("@ShowInExpenseClaim", model.ShowInExpenseClaim); }
                if (model.EnablePaymentToThisAccount == null) { values.Add("@EnablePaymentToThisAccount", 0); } else { values.Add("@EnablePaymentToThisAccount", model.ShowInExpenseClaim); }



                var _response = repository.GetSingle<dynamic>(StoreProcedure.Account_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);



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

    #endregion

    #region========================== TreeList MODULE ==================================
    [Command(Name = "Account_SelectForChildTreeByID")]
    public class Account_SelectForChildTreeByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Id = 0 }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
               return repository.GetMultiple<dynamic>(StoreProcedure.Account_SelectForChildTreeByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

}

#endregion
    #region========================== Account Details MODULE ==================================
    [Command(Name = "Account_SelectByID")]
    public class Account_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Id = 0 }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
               return repository.GetSingle<dynamic>(StoreProcedure.Account_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



#endregion
#region========================== Account Delete MODULE ==================================
[Command(Name = "Account_Delete")]
public class Account_DeleteCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { ID = 0 }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            repository.ExecuteProcedure(StoreProcedure.Account_Delete.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            result = new { status = true, message = "Successfully deleted" };
        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

 
#endregion
















