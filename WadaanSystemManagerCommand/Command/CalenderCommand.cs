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


    [Command(Name = "Task_SelectTaskNames")]
    public class Task_SelectTaskNamesCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectTaskNames.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    [Command(Name = "Calender_Select")]
    public class Calender_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();

            return repository.GetMultiple<dynamic>(StoreProcedure.Calender_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }

    //[Command(Name = "MeetingsWithClient_Save")]
    //public class MeetingsWithClient_SaveCommand : CamelCommandBase
    //{

    //    protected override object DoAction(object v)
    //    {
    //        SharedUploadImage sharedUploadImage = new SharedUploadImage();

    //        object result = new { status = false, returnUrl = "#" };
    //        var model = base.MappedModel(new
    //        {
    //            MeetingID = Guid.Empty,
    //            MeetingName = string.Empty,  /* Added Today*/
    //            MeetingDate = string.Empty,
    //            MeetingDiscussion = string.Empty,
    //            ClientID = Guid.Empty,
    //            EmployeeID  = Guid.Empty,
    //            UserID = Guid.Empty,
    //            UploadedFiles = new List<FileUploadModel>()
    //        }, v);
    //        try
    //        {
    //            var repository = Ioc.Resolve<IRepository>();
    //            IDictionary<string, object> values = new Dictionary<string, object>();
    //            IDictionary<string, object> ImageValues = new Dictionary<string, object>();
    //            CommandParameters _params = new CommandParameters();

    //            values = _params.Get(model);
    //            var _response = repository.GetSingle<dynamic>(StoreProcedure.MeetingsWithClient_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
    //            //if (model.UploadedFiles.Count > 0)
    //            //{

    //            //    for (int i = 0; i < model.UploadedFiles.Count; i++)
    //            //    {
    //            //        if (model.UploadedFiles[i].AttachmentType == "EmployeeProfilePicture")
    //            //        {
    //            //            sharedUploadImage.SaveDynamicImages(
    //            //                                            _response == null ? model.MeetingID : _response.Id,
    //            //                                            model.UploadedFiles[i].AttachmentType,
    //            //                                            model.UploadedFiles[i].CurrentFileName.ToString()
    //            //                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

    //            //                                            );
    //            //        }
    //            //    }
    //            //}
    //            //return _response == null ? model.MeetingID : _response.Id;
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


    //[Command(Name = "Meeting_SelectDetailByID")]
    //public class Meeting_SelectDetailByIDCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        object result = new { status = false, returnUrl = "#" };
    //        var model = base.MappedModel(new { MeetingID = Guid.Empty }, v);

    //        try
    //        {
    //            var repository = Ioc.Resolve<IRepository>();
    //            IDictionary<string, object> values = new Dictionary<string, object>();
    //            CommandParameters _params = new CommandParameters();

    //            values = _params.Get(model);
    //            return repository.GetMultiple<dynamic>(StoreProcedure.Meeting_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        }
    //        catch (Exception ex)
    //        {
    //            result = new { status = false, message = ex.Message };
    //        }
    //        return result;
    //    }
    //}

    //[Command(Name = "Meeting_DeleteByID")]
    //public class Meeting_DeleteByIDCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        object result = new { status = false, returnUrl = "#" };
    //        var model = base.MappedModel(new { MeetingID = Guid.Empty }, v);

    //        try
    //        {
    //            var repository = Ioc.Resolve<IRepository>();
    //            IDictionary<string, object> values = new Dictionary<string, object>();
    //            CommandParameters _params = new CommandParameters();

    //            values = _params.Get(model);
    //            repository.ExecuteProcedure(StoreProcedure.Meeting_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
    //            result = new { status = true, message = "Successfully deleted" };
    //        }
    //        catch (Exception ex)
    //        {
    //            result = new { status = false, message = ex.Message };
    //        }
    //        return result;
    //    }
    //}

    //[Command(Name = "Meeting_Select")]
    //public class Meeting_SelectCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        var repository = Ioc.Resolve<IRepository>();

    //        IDictionary<string, object> values = new Dictionary<string, object>();
    //        CommandParameters _params = new CommandParameters();

    //        return repository.GetMultiple<dynamic>(StoreProcedure.Meeting_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
    //    }
    //}

    //[Command(Name = "Meeting_SelectByID")]
    //public class Meeting_SelectByIDCommand : CamelCommandBase
    //{
    //    protected override object DoAction(object v)
    //    {
    //        object result = new { status = false, returnUrl = "#" };
    //        var model = base.MappedModel(new { MeetingID = Guid.Empty }, v);

    //        try
    //        {
    //            var repository = Ioc.Resolve<IRepository>();
    //            IDictionary<string, object> values = new Dictionary<string, object>();
    //            CommandParameters _params = new CommandParameters();

    //            values = _params.Get(model);
    //            return repository.GetMultiple<dynamic>(StoreProcedure.Meeting_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

    //        }
    //        catch (Exception ex)
    //        {
    //            result = new { status = false, message = ex.Message };
    //        }
    //        return result;
    //    }
    //}
}





