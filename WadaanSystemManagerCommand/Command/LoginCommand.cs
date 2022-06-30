using System;
using System.Collections.Generic;
using System.Configuration;
using XtremeTech.Core;
using XtremeTech.Repository;

namespace WadaanSystemManagerCommand.Command
{
   [Command(Name = "login")]
    public class LoginCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { username = string.Empty, Password = string.Empty }, v);
            /// Business Logic Here         
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                values.Add("@Username", model.username);
                values.Add("@Password", model.Password);
                return repository.GetSingle<dynamic>(StoreProcedure.UserLogin_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
               // return repository.GetSingle<dynamic>(StoreProcedure.UserLogin_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                //result = new { status = true, _userName = retValue.username, _userID = retValue.ID, _employeeNo= retValue.EmployeeNo, _name= retValue.Name, message = "Success Command Call" };
            }
            catch(Exception ex)
            {
                result = new { status = false, message =ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "changepassword")]
    public class LogOutCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { hdId = string.Empty, oldPassword = string.Empty, newPassword = string.Empty }, v);
            /// Business Logic Here         
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                values.Add("@username", model.hdId);
                values.Add("@oldPassword", model.oldPassword);
                values.Add("@newPassword", model.newPassword);
                return repository.GetSingle<dynamic>(StoreProcedure.Users_ChangePassword.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

                //result = new { status = true, _userName = retValue.username, _userID = retValue.ID, _employeeNo= retValue.EmployeeNo, _name= retValue.Name, message = "Success Command Call" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
   

}
