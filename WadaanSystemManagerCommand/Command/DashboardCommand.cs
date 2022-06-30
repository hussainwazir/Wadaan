using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XtremeTech.Core;
using XtremeTech.Repository;

namespace WadaanSystemManagerCommand.Command
{
    [Command(Name = "dashboardCounter")]
    public class GetdashboardCounterCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { id = Guid.Empty }, v);
            /// Business Logic Here         
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                return repository.GetSingle<dynamic>(StoreProcedure.DashboardCounter_Select.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    
}
