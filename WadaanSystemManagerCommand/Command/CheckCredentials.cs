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

   
    [Command(Name = "Check_Unique_Credential")]
    public class Check_Unique_CredentialCommand : CamelCommandBase
    {
        protected override object DoAction(object username)
        {
            object result = new { status = false, returnUrl = "#" };
            
            /// Business Logic Here         
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();              
                values.Add("@Username", username);
                return repository.GetSingle<dynamic>(StoreProcedure.Check_Unique_Credential.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

   
}
