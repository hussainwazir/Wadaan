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

    [Command(Name = "AboutUs_Select")]
    public class AboutUs_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.AboutUs_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "Service_Select")]
    public class Service_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                
                Name = string.Empty,
               
                UploadedFiles = new List<FileUploadModel>()
            }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Service_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
  
    [Command(Name = "Project_Select_For_Website")]
    public class Project_Select_For_WebsiteCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            object result = new { status = false, returnUrl = "#" };
            
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
           
            return repository.GetMultiple<dynamic>(StoreProcedure.Project_Select_For_Website.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    
    [Command(Name = "Project_Select_For_WebsiteByID")]
    public class Project_Select_For_WebsiteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);
            object result = new { status = false, returnUrl = "#" };

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
           
            return repository.GetMultiple<dynamic>(StoreProcedure.Project_Select_For_WebsiteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
      [Command(Name = "Project_Select_Attachments_For_WebsiteByID")]
    public class Project_Select_Attachments_For_WebsiteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);
            object result = new { status = false, returnUrl = "#" };

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
           
            return repository.GetMultiple<dynamic>(StoreProcedure.Project_Select_Attachments_For_WebsiteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    

}



