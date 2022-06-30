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
using System.Data;
using APFManagerCommand;
using WadaanSystemManagerCommand;

namespace WadaanSystemManagerCommand.Command
{
    public class TaskCommand
    {
        #region =========================== Task Select  ===========================================
        [Command(Name = "Task_Select")]
        public class Task_SelectCommand : CamelCommandBase
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
                    return repository.GetMultiple<dynamic>(StoreProcedure.Task_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }
        #endregion

        #region =========================== Task Load Status Wise Tasks ============================
        [Command(Name = "Task_LoadStatusWiseTasks")]
        public class Task_LoadStatusWiseTasksCommand : CamelCommandBase
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
                    return repository.GetMultiple<dynamic>(StoreProcedure.Task_LoadStatusWiseTasks.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }

        #endregion

        #region =========================== Task Save ==============================================
        [Command(Name = "Task_Save")]
        public class Task_SaveCommand : CamelCommandBase
        {

            protected override object DoAction(object v)
            {
                SharedUploadImage sharedUploadImage = new SharedUploadImage();

                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new
                {
                    TaskId = Guid.Empty,
                    TaskTitle = string.Empty,
                    Summary = string.Empty,  /* Added Today*/
                    Description = string.Empty,
                    ProjectID = Guid.Empty,
                    QAID = Guid.Empty,
                    AssigneeID = Guid.Empty,
                    IssueTypeId = string.Empty,
                    ReportedBy = Guid.Empty,
                    ReportedDate = string.Empty,
                    IssueStatusID = string.Empty,
                    IssuePriority = 0,
                    DueDate = string.Empty,
                    TotalEstimatedTime = string.Empty,
                    ResolvedID = Guid.Empty,
                    IssueKey = string.Empty,
                    SourceType = string.Empty,
                    TicketType = 0,
                    MilestoneID = Guid.Empty,
                    UserID = string.Empty,

                    UploadedFiles = new List<FileUploadModel>()
                }, v);


                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();

                    values = _params.Get(model);
                    var _response = repository.GetSingle<dynamic>(StoreProcedure.Task_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                    if (model.UploadedFiles.Count > 0)
                    {

                        for (int i = 0; i < model.UploadedFiles.Count; i++)
                        {
                            if (model.UploadedFiles[i].AttachmentType == "TaskAttachments")
                            {
                                sharedUploadImage.SaveDynamicImages(
                                                                _response == null ? model.TaskId : _response.Id,
                                                                model.UploadedFiles[i].AttachmentType,
                                                                model.UploadedFiles[i].CurrentFileName.ToString()
                                                                //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                                );
                            }
                        }
                    }
                    return _response == null ? model.TaskId : _response.Id;
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
    }
    #region =========================== Task Select By ID ======================================
    [Command(Name = "Task_EmployeeFollowersMultipleID_Save")]
    public class Task_EmployeeFollowersMultipleID_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };

            var model = base.MappedModel(new
            {
                Task_EmployeeFollowersMultipleIDs = new List<Task_EmployeeFollowersMultipleIDs>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();


                var table = new KeyValuePair<string, DataTable>("[dbo].[Task_EmployeeFollowersMultipleIDs]", ExtentionMethodes.ToDataTable(model.Task_EmployeeFollowersMultipleIDs));
                var ProductList = new Dictionary<string, KeyValuePair<string, DataTable>>();
                ProductList.Add("@Task_EmployeeFollowersMultipleIDs", table);

                return repository.GetMultipleWithTableValuParam<dynamic>(StoreProcedure.Task_EmployeeFollowersMultipleID_Save.ToString(), values, ProductList, XtremeFactory._factory, XtremeFactory.connectionString);


            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    #region =========================== Task Change Status To Active ===========================
    [Command(Name = "Task_ChangeStatusToActive")]
    public class Task_ChangeStatusToActiveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Task_ChangeStatusToActive.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully Updated" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion


    #region =========================== Task Delete By ID ===========================================

    [Command(Name = "Task_DeleteByID")]
    public class Task_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Task_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
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

    #region =========================== Task Select By ID ===========================================
    [Command(Name = "Task_SelectByID")]
    public class Task_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    #region =========================== Task Select Detail By ID ====================================

    [Command(Name = "Task_SelectDetailByID")]
    public class Task_SelectDetailByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    #region =========================== Task Status Chanaged ========================================
    [Command(Name = "Task_StatusChanaged")]
    public class Task_StatusChanagedCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty, NewStatus = string.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_StatusChanaged.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    #region =========================== Task Select Current Status ==================================
    [Command(Name = "Task_SelectCurrentStatus")]
    public class Task_SelectCurrentStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectCurrentStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    #region =========================== Task Assignee Change ========================================

    [Command(Name = "Task_AssigneeChange")]
    public class Task_AssigneeChangeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty, AssigneeID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_AssigneeChange.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    #region =========================== Task Version ================================================
    [Command(Name = "Task_SelectAssignee")]
    public class Task_SelectAssigneeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectAssignee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion


    #region =========================== Task Select Notification Followers ==========================
    [Command(Name = "Task_SelectNotificationFollowers")]
    public class Task_SelectNotificationFollowersCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectNotificationFollowers.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion

    #region =========================== Task Version ================================================

    [Command(Name = "TaskVersion_Save")]
    public class TaskVersion_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                TaskVersionID = Guid.Empty,
                TaskId = Guid.Empty,
                Subject = string.Empty,  /* Added Today*/
                Description = string.Empty,
                Status = string.Empty,
                AssigneeID = Guid.Empty,
                VersionDate = string.Empty,
                UserID = string.Empty,

                UploadedFiles = new List<FileUploadModel>()
            }, v);


            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.TaskVersion_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "TaskVersionFile")
                        {
                            sharedUploadImage.SaveDynamicImages(
                                                            _response == null ? model.TaskId : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                        if (model.UploadedFiles[i].AttachmentType == "TaskVersionImage")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            _response == null ? model.TaskId : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }
                return _response == null ? model.TaskId : _response.Id;
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

    #region ========================== Task Version Select By Task ID ===============================
    [Command(Name = "TaskVersion_SelectByTaskID")]
    public class TaskVersion_SelectByTaskIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                //return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskVersion_SelectByTaskID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;

        }
    }

    #endregion

    #region ========================== Task Version Select By ID ====================================

    [Command(Name = "TaskVersion_SelectByID")]
    public class TaskVersion_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskVersionID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskVersion_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;

        }
    }

    #endregion

    #region ========================== Task Version Select Detail By ID =============================
    [Command(Name = "TaskVersion_SelectDetailByID")]
    public class TaskVersion_SelectDetailByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskVersionID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskVersion_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;

        }
    }

    #endregion

    #region ========================== Task Version StatusChanaged ==================================
    [Command(Name = "TaskVersion_StatusChanaged")]
    public class TaskVersion_StatusChanagedCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskVersionID = Guid.Empty, NewStatus = string.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskVersion_StatusChanaged.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion

    #region ========================== Task Version Select Current Status ===========================
    [Command(Name = "TaskVersion_SelectCurrentStatus")]
    public class TaskVersion_SelectCurrentStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskVersionID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskVersion_SelectCurrentStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion



    [Command(Name = "NotificationFollowers_DeleteByTaskID")]
    public class NotificationFollowers_DeleteByTaskIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.NotificationFollowers_DeleteByTaskID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }








    #region =========================== Task Select For Dashboard  ===========================================
    [Command(Name = "Task_Select_from_Dashbaord")]
    public class Task_Select_from_DashbaordCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            // var model = base.MappedModel(new { Status = string.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                // values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_Select_from_Dashbaord.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Task_SelectDDL_ByProjectId")]
    public class Task_SelectDDL_ByProjectIdCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectDDL_ByProjectId.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

        }
    }
    #endregion


}