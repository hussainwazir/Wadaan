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
using WadaanSystemManagerCommand.Model;
using APFManagerCommand;
using System.Data;

namespace WadaanSystemManagerCommand.Command
{
 

    [Command(Name = "Designation_Save")]
    public class Designation_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                EmployeeID = Guid.Empty,
                UserID = Guid.Empty,
                Name = string.Empty
            
            }, v);


            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Designation_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                
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

    [Command(Name = "DesignationMultipleDetails_Save_New")]
    public class DesignationMultipleDetails_Save_NewCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                BulkDesignationDetails = new List<BulkEmployeeEducationDetails>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                var table = new KeyValuePair<string, DataTable>("[dbo].[BulkDesignationDetails]", ExtentionMethodes.ToDataTable(model.BulkDesignationDetails));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@BulkDesignationDetails", table);

                return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.EmployeeEducationMultipleDetails_Save_New.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
}


















