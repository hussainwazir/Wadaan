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
    [Command(Name = "Employee_Select")]
    public class Employee_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Status = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Employee_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }

    }

    [Command(Name = "Task_SelectCountByStatusForEmployee")]
    public class Task_SelectCountByStatusForEmployeeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            //var model = base.MappedModel(new { Status = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

               // values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectCountByStatusForEmployee.ToString(),  XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }

    }



    #endregion


    [Command(Name = "EmployeeTaskType_MultipleTaskTypeSave")]
    public class EmployeeTaskType_MultipleTaskTypeSaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                EmployeeTaskType_MultipleTaskTypeSave = new List<EmployeeTaskType_MultipleTaskTypeSave>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                var table = new KeyValuePair<string, DataTable>("dbo.EmployeeTaskType_MultipleTaskType", ExtentionMethodes.ToDataTable(model.EmployeeTaskType_MultipleTaskTypeSave));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@EmployeeTaskType_MultipleTaskTypeSave", table);

                return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.EmployeeTaskType_MultipleTaskTypeSave.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }






    [Command(Name = "EmployeeTaskType_SelectByEmployeeID")]
    public class EmployeeTaskType_SelectByEmployeeIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.EmployeeTaskType_SelectByEmployeeID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "MainDashboard_ForProject")]
    public class MainDashboard_ForProjectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

             
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboard_ForProject.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }

    }
    [Command(Name = "TaskType_SelectAll")]
    public class TaskType_SelectAllCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                return repository.GetMultiple<dynamic>(StoreProcedure.TaskType_SelectAll.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }

    }
    [Command(Name = "MainDashboard_ProjectTimelineChartData")]
    public class MainDashboard_ProjectTimelineChartDataCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" }; 

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters(); 
                return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboard_ProjectTimelineChartData.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }

    }

    #region ========================== In Active  Employee  =================================
    [Command(Name = "Employee_SelectInActive")]
    public class Employee_SelectActiveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Status = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Employee_SelectInActive.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion


    #region ============================ Employee Send Email ============================
    [Command(Name = "Employee_SentEmail")]
    public class Employee_SentEmailCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { SenderName = string.Empty, SenderSubject = string.Empty, SenderEmail = string.Empty, SenderMessage = string.Empty }, v);

            try
            {
                WadaanSystemManagerCommand.EmailService obj = new WadaanSystemManagerCommand.EmailService();
                obj.SendEmail(model.SenderName, model.SenderSubject, model.SenderEmail, model.SenderMessage);

                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                //values = _params.Get(model);
                //return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboardData.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }

            catch (Exception ex)

            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    #endregion


    #region ========================== Update Profile Save =============================
    [Command(Name = "UpdateProfile_Save")]
    public class UpdateProfile_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                EmployeeID = Guid.Empty,
                FirstName = string.Empty,
                LastName = string.Empty,
                MobilePhone = string.Empty,
                WhatsApp = string.Empty,
                CurHouseNo = string.Empty,
                CurStreetNo = string.Empty,
                Password = string.Empty,
                UserID = Guid.Empty,

                UploadedFiles = new List<FileUploadModel>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Employee_UpdateProfile.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                //if (model.UploadedFiles.Count > 0)
                //{

                //    for (int i = 0; i < model.UploadedFiles.Count; i++)
                //    {
                //        if (model.UploadedFiles[i].AttachmentType == "EmployeeProfilePicture")
                //        {
                //            sharedUploadImage.SaveProfileImages(
                //                                            _response == null ? model.EmployeeID : _response.Id,
                //                                            model.UploadedFiles[i].AttachmentType,
                //                                            model.UploadedFiles[i].CurrentFileName.ToString()
                //                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                //                                            );
                //        }
                //    }
                //}
                return _response == null ? model.EmployeeID : _response.Id;
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

    #region ========================== Update Profile ImageSave ========================
    [Command(Name = "UpdateProfileImage_Save")]
    public class UpdateProfileImage_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                FkGuidId = Guid.Empty,

                UploadedFiles = new List<FileUploadModel>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();

                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "ProfilePicture")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            model.FkGuidId,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }

                        else if (model.UploadedFiles[i].AttachmentType == "CVAttachment")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            model.FkGuidId,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }

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

    #region ============================= Employee Save ================================
    [Command(Name = "Employee_Save")]
    public class Employee_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                EmployeeID = Guid.Empty,
                UserName = string.Empty,  /* Added Today*/
                Prefix = string.Empty,
                FirstName = string.Empty,
                LastName = string.Empty,
                GivenName = string.Empty,
                MobilePhone = string.Empty,
                WhatsApp = string.Empty,
                EmailAddress = string.Empty,
                CurPostalAddress = string.Empty,
                CurHouseNo = string.Empty,
                CurStreetNo = string.Empty,
                CurTownSector = string.Empty,
                CurCityID = Guid.Empty,
                CurProvinceID = Guid.Empty,
                PerHouseNo = string.Empty,
                PerStreetNo = string.Empty,
                PerTownSector = string.Empty,
                PerCityID = Guid.Empty,
                PerProvinceID = Guid.Empty,
                DesignationID = Guid.Empty,
                EmployeeTypeID = Guid.Empty,

                //Requirement Attachement
                Password = string.Empty,
                UserID = Guid.Empty,
                Role = Guid.Empty,
                DateOfAppointmentFrom = "",
                DateOfAppointmentTo = "",

                PECPCATPNo = string.Empty,
                PIRegistrationDate = "",
                PIExpiryDate = "",
                EmployeeTaskType_MultipleTaskTypeSave = string.Empty,// new List<EmployeeTaskType_MultipleTaskTypeSave>(),
                UploadedFiles = new List<FileUploadModel>()
            }, v);

            try

            {
                var list = JsonConvert.DeserializeObject<List<EmployeeTaskType_MultipleTaskTypeSave>>(model.EmployeeTaskType_MultipleTaskTypeSave);
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);

                //New coded added by Shahid to add employee skills withing same request while creating employee rather than sending another request
                var tableParameter = new KeyValuePair<string, DataTable>("[dbo].[EmployeeTaskType_MultipleTaskType]", ExtentionMethodes.ToDataTable(list));
                var skillsList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                skillsList.Add("@EmployeeTaskType_MultipleTaskTypeSave", tableParameter);

                //var _response = repository.GetSingle<dynamic>(StoreProcedure.Employee_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                var _response = repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Employee_Save.ToString(), values, skillsList, XtremeFactory._factory, XtremeFactory.connectionString).FirstOrDefault();
                //if (1 == 1)
                //{
                //    var modelSkills = base.MappedModel(new
                //    {
                //        EmployeeTaskType_MultipleTaskTypeSave = new List<EmployeeTaskType_MultipleTaskTypeSave>()
                //    }, list);

                //    try
                //    {
                //        //var repository = Ioc.Resolve<IRepository>();
                //        IDictionary<string, object> valuesSkills = new Dictionary<string, object>();
                //        CommandParameters _paramsSkills = new CommandParameters();


                //        var tableParameter = new KeyValuePair<string, DataTable>("dbo.EmployeeTaskType_MultipleTaskType", ExtentionMethodes.ToDataTable(model.EmployeeTaskType_MultipleTaskTypeSave));
                //        var skillsList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                //        skillsList.Add("@EmployeeTaskType_MultipleTaskTypeSave", tableParameter);

                //        return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.EmployeeTaskType_MultipleTaskTypeSave.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


                //    }
                //    catch (Exception ex)
                //    {
                //        result = new { status = false, message = ex.Message };
                //    }
                //}
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "ProfilePicture")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            _response == null ? model.EmployeeID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                        else if (model.UploadedFiles[i].AttachmentType == "PECPCATPNoAttachment")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            _response == null ? model.EmployeeID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }
                return _response == null ? model.EmployeeID : _response.Id;
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

    #region ========================== Employee Delete By ID ===========================

    [Command(Name = "Employee_DeleteByID")]
    public class Employee_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { EmployeeID = Guid.Empty, ReasonOfDeletion = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Employee_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    //[Command(Name = "Customer_Save")]
    //public class Customer_DetailsByIDCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var repository = Ioc.Resolve<IRepository>();
    //        var model = base.MappedModel(new

    //        {
    //            CustomerID = Guid.Empty,
    //            FullName = String.Empty,
    //            ContactPerson = String.Empty,
    //            MobileNo = string.Empty,
    //            TRNNo = string.Empty,
    //            Email = String.Empty,
    //            Address = String.Empty,
    //            POBox = String.Empty,

    //        }, v);




    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();
    //        values = _params.Get(model);
    //        return repository.GetMultiple<dynamic>(StoreProcedure.Customer_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //    }
    //}

}
#endregion














[Command(Name = "Calender_Select_For_Dashboard_ByProjectID")]
public class Calender_Select_For_Dashboard_ByProjectIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { UserID = Guid.Empty, ProjectID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Calender_Select_For_Dashboard_ByProjectID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

[Command(Name = "MainDashboard_ProjectTimelineChartDataByProjectID")]
public class MainDashboard_ProjectTimelineChartDataByProjectIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new {  ProjectID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboard_ProjectTimelineChartDataByProjectID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}
[Command(Name = "MainDashboard_TimeLineChartForAllProject")]
public class MainDashboard_ProjectTimelineChartDataForAllProjectsCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

           
            return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboard_ProjectTimelineChartData.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "MainDashboardData_ByProjectID")]
public class MainDashboardData_ByProjectIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { UserID = Guid.Empty, ProjectID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboardData_ByProjectID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

[Command(Name = "Task_Select_For_Dashboard_ByProjectID")]
public class Task_Select_For_Dashboard_ByProjectIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { UserID = Guid.Empty, ProjectID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Task_Select_For_Dashboard_ByProjectID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

[Command(Name="MainDashboard_ForProject_ByProjectID")]
public class MainDashboard_ForProject_ByProjectIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { UserID = Guid.Empty, ProjectID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboard_ForProject_ByProjectID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "Project_Select_For_Dashboard_ByProjectID")]
public class Project_Select_For_Dashboard_ByProjectIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { UserID = Guid.Empty, ProjectID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Project_Select_For_Dashboard_ByProjectID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

[Command(Name = "MainDashboardData")]
public class MainDashboardDataCommand : CamelCommandBase
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
            return repository.GetMultiple<dynamic>(StoreProcedure.MainDashboardData.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "Employee_SelectByID")]
public class Employee_SelectByIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Employee_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "Task_SelectByEmployeeID")]
public class Task_SelectByEmployeeIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectByEmployeeID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "Employee_SelectDetailByID")]
public class Employee_SelectDetailByIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Employee_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "Employee_ChangeStatus")]
public class Contractor_ChangeStatusCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            repository.ExecuteProcedure(StoreProcedure.Employee_ChangeStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            result = new { status = true, message = "Successfully Updated" };
        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

[Command(Name = "ProfileData_SelectDetailByID")]
public class ProfileData_SelectDetailByIDCommand : CamelCommandBase
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
            return repository.GetMultiple<dynamic>(StoreProcedure.ProfileData_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


#region ============================== [EmployeeEducationMultipleDetails_Save_New] ==============================

[Command(Name = "EmployeeEducationMultipleDetails_Save_New")]
public class EmployeeEducationMultipleDetails_Save_NewCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };

        var model = base.MappedModel(new
        {
            BulkEmployeeEducationDetails = new List<BulkEmployeeEducationDetails>()
        }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();


            var table = new KeyValuePair<string, DataTable>("[dbo].[BulkEmployeeEducationDetails]", ExtentionMethodes.ToDataTable(model.BulkEmployeeEducationDetails));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@BulkEmployeeEducationDetails", table);

            return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.EmployeeEducationMultipleDetails_Save_New.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


#endregion


#region ============================== [EmployeeExperiencsMultipleDetails_Save_New] ==============================

[Command(Name = "EmployeeExperienceMultipleDetails_Save_New")]
public class EmployeeExperienceMultipleDetails_Save_NewCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };

        var model = base.MappedModel(new
        {
            BulkEmployeeExperiencesDetails = new List<BulkEmployeeExperiencesDetails>()
        }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();


            var table = new KeyValuePair<string, DataTable>("[dbo].[BulkEmployeeExperiencesDetails]", ExtentionMethodes.ToDataTable(model.BulkEmployeeExperiencesDetails));
            var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
            ProductList.Add("@BulkEmployeeExperiencesDetails", table);

            return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.EmployeeExperienceMultipleDetails_Save_New.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}

#endregion


#region ======================= Employee Education Retrieve ==============================================
[Command(Name = "EmployeeEducationDetail_SelectByEmployeeID")]
public class EmployeeEducationDetail_SelectByEmployeeIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.EmployeeEducationDetail_SelectByEmployeeID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}
#endregion ===============================================================================================


#region ======================= Employee Education Retrieve ==============================================
[Command(Name = "EmployeeExperiencesDetails_SelectByEmployeeID")]
public class EmployeeExperiencesDetails_SelectByEmployeeIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new { EmployeeID = Guid.Empty }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.EmployeeExperiencesDetails_SelectByEmployeeID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}
#endregion ===============================================================================================






#region  ========================== ServicesType  =============================




[Command(Name = "ServicesType_Select")]
public class ServicesType_SelectCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        try
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ServicesType_Select.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}



#endregion




#region  ========================== Services Type By ID  =============================




//[Command(Name = "ServicesType_SelectByIDs")]
//public class ServicesType_SelectByIDsCommand : CamelCommandBase
//{
//    protected override object DoAction(object v)
//    {
//        object result = new { status = false, returnUrl = "#" };
//        try
//        {
//            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ServicesType_SelectByIDs.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
//        }
//        catch (Exception ex)
//        {
//            result = new { status = false, message = ex.Message };
//        }
//        return result;
//    }
//}

[Command(Name = "ServicesType_SelectByIDs")]
public class ServicesType_SelectByIDsCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new
        {



            ContractType = string.Empty,
            ProjectCategory = string.Empty,
            ResidentialPlotSize = string.Empty,
            PlotSizeName = string.Empty,
            DraftType = string.Empty,


        }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.ServicesType_SelectByIDs.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


[Command(Name = "ServicesType_SaveByID")]
public class ServicesType_SaveByIDCommand : CamelCommandBase
{
    protected override object DoAction(object v)
    {
        object result = new { status = false, returnUrl = "#" };
        var model = base.MappedModel(new
        {

            ContractTypee = string.Empty,
            //ProjectCategory = string.Empty,
            //ResidentialPlotSize = string.Empty,
            //PlotSizeName = string.Empty,
            //DraftType = string.Empty,
            WorkingDays = string.Empty,


        }, v);

        try
        {
            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.ServicesType_SaveByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
        catch (Exception ex)
        {
            result = new { status = false, message = ex.Message };
        }
        return result;
    }
}


#endregion