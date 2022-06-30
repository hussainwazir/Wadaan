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
    #region ========================== Employee Login Area =================================

    [Command(Name = "Task_SelectAllAgainstEmployee")]
    public class Task_SelectAllAgainstEmployeeCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectAllAgainstEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    [Command(Name = "Task_AssigneeChangeByEmployee")]
    public class Task_AssigneeChangeByEmployeeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty, AssigneeID = Guid.Empty,AssignedTo = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_AssigneeChangeByEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Project_SelectAllAgainstEmployee")]
    public class Project_SelectAllAgainstEmployeeCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_SelectAllAgainstEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #region ===================== LOAD EMPLOYEES DDL Without Manager and Admin =================================
    [Command(Name = "Employee_SelectDDLWithOutAdminAndManager")]
    public class Employee_SelectDDLWithOutAdminAndManagerLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Employee_SelectDDLWithOutAdminAndManager.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    [Command(Name = "Task_SelectStatusWise")]
    public class Task_SelectStatusWiseCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { UserID = Guid.Empty, SelectedStatus = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectStatusWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Task_StartTime")]
    public class Task_StartTimeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new {
                UserID = Guid.Empty,
                TaskID = Guid.Empty,
                ProjectID = Guid.Empty,
                OldStatus = string.Empty,
                EmployeeID = Guid.Empty,
            }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_StartTime.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Task_StopTime")]
    public class Task_StopTimeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                UserID = Guid.Empty,
                TaskID = Guid.Empty,
                ProjectID = Guid.Empty,
                OldStatus = string.Empty,
                EmployeeID = Guid.Empty,
            }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_StopTime.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Task_ChandIsSeenStatus")]
    public class Task_ChandIsSeenStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                TaskID = Guid.Empty,
            }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_ChandIsSeenStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    #region =========================== Task Status Chanaged ========================================
    [Command(Name = "Task_StatusChanagedByEmployee")]
    public class  Task_StatusChanagedByEmployeeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty, NewStatus = string.Empty ,UserID = Guid.Empty}, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_StatusChanagedByEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    [Command(Name = "Task_StatusWithOutInProgressEmployee")]
    public class Task_StatusWithOutInProgressEmployeeCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = Guid.Empty, NewStatus = string.Empty, UserID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_StatusWithOutInProgressEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion



    #region =========================== Get all In Progress Tasks ========================================
    [Command(Name = "Task_GetAllInProgressTasks")]
    public class Task_GetAllInProgressTasksCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_GetAllInProgressTasks.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Task_AddAttachementAgainstProgressHistory")]
    public class Task_AddAttachementAgainstProgressHistoryCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { UserID = Guid.Empty, Status= string.Empty, TaskID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_AddAttachementAgainstProgressHistory.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Task_AddAttachementToNextTask")]
    public class Task_AddAttachementToNextTaskCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { UserID = Guid.Empty,  TaskID = Guid.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_AddAttachementToNextTask.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "CheckList_GetDataAgainstTaskAndTaskStatus")]
    public class CheckList_GetDataAgainstTaskAndTaskStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskStatus = string.Empty, TaskName = string.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.CheckList_GetDataAgainstTaskAndTaskStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    [Command(Name = "Task_TaskStatusAndChecklists_Save")]
    public class Task_TaskStatusAndChecklists_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { TaskID = string.Empty, NewStatus = string.Empty, UserID = Guid.Empty, CheckList = string.Empty }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_StatusWithOutInProgressEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    #endregion

    //[Command(Name = "Task_TaskStatusAndChecklist_Save")]
    //public class Task_TaskStatusAndChecklist_SaveCommand : CamelCommandBase
    //{

    //    protected override object DoAction(object v)
    //    {
    //        SharedUploadImage sharedUploadImage = new SharedUploadImage();

    //        object result = new { status = false, returnUrl = "#" };
    //        var model = base.MappedModel(new
    //        {
    //            TaskID = Guid.Empty,
    //            UploadedFiles = new List<FileUploadModel>()
    //        }, v);

    //        try
    //        {
    //            var repository = Ioc.Resolve<IRepository>();
    //            IDictionary<string, object> values = new Dictionary<string, object>();
    //            IDictionary<string, object> ImageValues = new Dictionary<string, object>();

    //            if (model.UploadedFiles.Count > 0)
    //            {

    //                for (int i = 0; i < model.UploadedFiles.Count; i++)
    //                {
    //                    if (model.UploadedFiles[i].AttachmentType == "TaskAttachmentFile")
    //                    {
    //                        sharedUploadImage.SaveProjectDocument(
    //                                                        model.TaskID,
    //                                                        model.UploadedFiles[i].AttachmentType,
    //                                                        model.UploadedFiles[i].CurrentFileName.ToString()
    //                                                        //model.UploadedFiles[i].CurrentFilePath.ToString()

    //                                                        );
    //                    }


    //                }
    //            }

    //        }
    //        catch (Exception ex)
    //        {
    //            result = new
    //            {
    //                status = false,
    //                message = ex.Message
    //            };
    //        }
    //        return result;
    //    }
    //}

    [Command(Name = "Task_TaskStatusAndChecklist_Save")]
    public class Task_TaskStatusAndChecklist_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                TaskID = Guid.Empty,
                CheckList = string.Empty,
                Description = string.Empty,
                UserID = Guid.Empty,
                NewStatus = string.Empty,
                UploadedFiles = new List<FileUploadModel>()
            }, v);

            try
            {

                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Task_StatusWithOutInProgressEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
               

                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "TaskAttachmentFile")
                        {
                            sharedUploadImage.SaveProjectDocument(
                                                              
                                                            _response.Id,
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





    [Command(Name = "Task_Completed")]
    public class Task_CompletedCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                UserID = Guid.Empty,
                TaskID = Guid.Empty,
                ProjectID = Guid.Empty,
                OldStatus = string.Empty,
                EmployeeID = Guid.Empty,
            }, v);
            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_Completed.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Task_ListAssigneToEmployee")]
    public class Task_ListAssigneToEmployeeCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_ListAssigneToEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Task_taskHistoryDetail")]
    public class Task_taskHistoryDetailCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_taskHistoryDetail.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    [Command(Name = "Task_LoadStatusWise")]
    public class Task_LoadStatusWiseCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_LoadStatusWise.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }




    [Command(Name = "project_Select_AgainstEmployee")]
    public class project_Select_AgainstEmployeeCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.project_Select_AgainstEmployee.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Task_SelectAllUnseenTaskDetail")]
    public class Task_SelectAllUnseenTaskDetailCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectAllUnseenTaskDetail.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "TaskList_SelectByProjectIDAndUserID")]
    public class TaskList_SelectByProjectIDAndUserIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { UserID = Guid.Empty,ProjectID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskList_SelectByProjectIDAndUserID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion

}












