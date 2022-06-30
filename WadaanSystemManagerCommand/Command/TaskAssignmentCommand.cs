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



    [Command(Name = "TaskAssignment_Save")]
    public class TaskAssignment_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                TaskAssignId = Guid.Empty,
                Title = string.Empty,  /* Added Today*/
                Description = string.Empty,
                TaskId = Guid.Empty,
                EmployeeID = Guid.Empty,
                ProjectID = Guid.Empty,
                Status = string.Empty,
                Remarks = string.Empty,
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
                var _response = repository.GetSingle<dynamic>(StoreProcedure.TaskAssignment_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "TaskAssignAttachments")
                        {
                            sharedUploadImage.SaveDynamicImages(
                                                            _response == null ? model.TaskAssignId : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }
                return _response == null ? model.TaskAssignId : _response.Id;
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
        //}

        [Command(Name = "Images_SelectImagesByTaskID")]
        public class Images_SelectImagesByTaskIDCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { Id = Guid.Empty }, v);

                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();

                    values = _params.Get(model);
                    return repository.GetMultiple<dynamic>(StoreProcedure.Images_SelectImagesByTaskID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }

        [Command(Name = "TaskAssignment_DeleteByID")]
        public class TaskAssignment_DeleteByIDCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { TaskAssignId = Guid.Empty }, v);

                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();
                    values = _params.Get(model);
                    repository.ExecuteProcedure(StoreProcedure.TaskAssignment_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                    result = new { status = true, message = "Successfully deleted" };
                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }

        [Command(Name = "TaskAssignment_Select")]
        public class Meeting_SelectCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                var repository = Ioc.Resolve<IRepository>();

                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                return repository.GetMultiple<dynamic>(StoreProcedure.TaskAssignment_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
        }

        [Command(Name = "TaskAssignment_SelectByID")]
        public class TaskAssignment_SelectByIDCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { TaskAssignmentID = Guid.Empty }, v);

                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();

                    values = _params.Get(model);
                    return repository.GetMultiple<dynamic>(StoreProcedure.TaskAssignment_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }


        [Command(Name = "TaskAssignment_SelectDetailByID")]
        public class TaskAssignment_SelectDetailByIDCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { TaskAssignmentID = Guid.Empty }, v);

                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();

                    values = _params.Get(model);
                    return repository.GetMultiple<dynamic>(StoreProcedure.TaskAssignment_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }


        [Command(Name = "TaskAssignment_StatusChanged")]
        public class TaskAssignment_StatusChangedCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { TaskAssignID = Guid.Empty, NewStatus = string.Empty }, v);
                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();
                    values = _params.Get(model);
                    return repository.GetMultiple<dynamic>(StoreProcedure.TaskAssignment_StatusChanged.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }


        [Command(Name = "TaskAssignment_SelectCurrentStatus")]
        public class TaskAssignment_SelectCurrentStatusCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { TaskAssignID = Guid.Empty }, v);
                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();
                    values = _params.Get(model);
                    return repository.GetMultiple<dynamic>(StoreProcedure.TaskAssignment_SelectCurrentStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                }
                catch (Exception ex)
                {
                    result = new { status = false, message = ex.Message };
                }
                return result;
            }
        }
    }
}





