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



    [Command(Name = "Milestone_Save")]
    public class Milestone_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                MilestoneID = Guid.Empty,
                Name = string.Empty,  /* Added Today*/
                Description = string.Empty,
                Status = string.Empty,
                StartDate = string.Empty,
                EndDate = string.Empty,
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
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Milestone_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                //if (model.UploadedFiles.Count > 0)
                //{

                //    for (int i = 0; i < model.UploadedFiles.Count; i++)
                //    {
                //        if (model.UploadedFiles[i].AttachmentType == "EmployeeProfilePicture")
                //        {
                //            sharedUploadImage.SaveDynamicImages(
                //                                            _response == null ? model.MeetingID : _response.Id,
                //                                            model.UploadedFiles[i].AttachmentType,
                //                                            model.UploadedFiles[i].CurrentFileName.ToString()
                //                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                //                                            );
                //        }
                //    }
                //}
                //return _response == null ? model.MeetingID : _response.Id;
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

    [Command(Name = "MileStone_SelectDetailByID")]
    public class MileStone_SelectDetailByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { MileStoneID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.MileStone_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "MileStone_DeleteByID")]
    public class MileStone_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { MileStoneID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.MileStone_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
        //}

        [Command(Name = "MileStone_Select")]
        public class MileStone_SelectCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                var repository = Ioc.Resolve<IRepository>();

                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                return repository.GetMultiple<dynamic>(StoreProcedure.MileStone_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
        }

        [Command(Name = "MileStone_SelectByID")]
        public class MileStone_SelectByIDCommand : CamelCommandBase
        {
            protected override object DoAction(object v)
            {
                object result = new { status = false, returnUrl = "#" };
                var model = base.MappedModel(new { MileStoneID = Guid.Empty }, v);

                try
                {
                    var repository = Ioc.Resolve<IRepository>();
                    IDictionary<string, object> values = new Dictionary<string, object>();
                    CommandParameters _params = new CommandParameters();

                    values = _params.Get(model);
                    return repository.GetMultiple<dynamic>(StoreProcedure.MileStone_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

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





