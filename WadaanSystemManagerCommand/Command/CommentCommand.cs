using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using WadaanSystemManagerCommand.Command;
using XtremeTech.Core;
using XtremeTech.FileUploader;
using XtremeTech.Repository;

namespace APFManagerCommand.Command
{

    [Command(Name = "Comment_Select")]
    public class Comment_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.Comment_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
 
     
       [Command(Name = "Comment_SelectByID")]
    public class Comment_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            var model = base.MappedModel(new { Id = Guid.Empty }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
             

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Comment_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    [Command(Name = "Comment_ByAreaID")]
    public class Comment_ByAreaIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            var model = base.MappedModel(new { ByAreaID = Guid.Empty, Areatype=string.Empty }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();


            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Comment_ByAreaID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    

    [Command(Name = "Comment_Save")]
    public class Comment_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        { 
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                CommentID = Guid.Empty,
                UserID = Guid.Empty,
                CommentDescription = string.Empty,
                Areatype = string.Empty,
                FkTypeID = Guid.Empty,
               UploadedFiles = new List<FileUploadModel>()
            }, v);


            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Comment_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
 
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
 
    [Command(Name = "Comment_DeleteByID")]
    public class Comment_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new {  StoreID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Comment_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

     
 
 
}



