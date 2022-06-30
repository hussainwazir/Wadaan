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
    #region ========================== Project MODULE =================================

    [Command(Name = "project_Select")]
    public class project_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { Status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Status = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;

        }
    }

    [Command(Name = "Project_Save")]
    public class Project_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                ProjectID = Guid.Empty,
                ProjectName = string.Empty,  /* Added Today*/
                ClientID = Guid.Empty,
                ProjectCategory = string.Empty,
                Priority = 0,
                ContractType = 0,
                PlotHouseNo = string.Empty,
                Street = string.Empty,
                TownSector = string.Empty,
                ProvinceID = Guid.Empty,
                CityID = Guid.Empty,
                categoryTypeName = string.Empty,
                PlotSizename = string.Empty,
                GPSCordinates = string.Empty,
                GoogleLocation = string.Empty,
                North = 0,
                East = 0,
                West = 0,
                South = 0,
                ResidentialPlotSize = 0,
                CommercialPlotSize = 0,

                ContractorID = Guid.Empty,

                ConstructionStatus = string.Empty,
                StartDate = string.Empty,
                SubStructure = 0,
                SuperStructure = 0,
                Finishing = 0,
                //Sketch = 0,
                //SubmissionDrawing = 0,
                //ArchitecturalDrawing = 0,
                //StructuralDrawing = 0,
                //ElectricalDrawing = 0,
                //PlumbingDrawing = 0,
                //Estimation = 0,
                // TypeOfSupervisionServices = string.Empty,
                UserID = Guid.Empty,

                UploadedFiles = new List<FileUploadModel>()
            }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values.Add("@ProjectID", model.ProjectID);
                values.Add("@ProjectName", model.ProjectName);
                values.Add("@ClientID", model.ClientID);
                values.Add("@ProjectCategory", model.ProjectCategory);
                values.Add("@Priority", model.Priority);
                values.Add("@ContractType", model.ContractType);
                values.Add("@PlotHouseNo", model.PlotHouseNo);
                values.Add("@Street", model.Street);
                values.Add("@TownSector", model.TownSector);
                values.Add("@ProvinceID", model.ProvinceID);
                values.Add("@CityID", model.CityID);
                values.Add("@GPSCordinates", model.GPSCordinates);
                values.Add("@GoogleLocation", model.GoogleLocation);
                values.Add("@North", model.North);
                values.Add("@East", model.East);
                values.Add("@West", model.West);
                values.Add("@South", model.South);
                values.Add("@PlotSizename", model.PlotSizename);
                values.Add("@categoryTypeName", model.categoryTypeName);
                //values.Add("@ResidentialPlotSize", model.ResidentialPlotSize);
                //values.Add("@CommercialPlotSize", model.CommercialPlotSize);
                values.Add("@ContractorID", model.ContractorID);
                values.Add("@ConstructionStatus", model.ConstructionStatus);
                values.Add("@StartDate", model.StartDate);
                values.Add("@SubStructure", model.SubStructure);
                values.Add("@SuperStructure", model.SuperStructure);
                values.Add("@Finishing", model.Finishing);



                if (model.ResidentialPlotSize == 0)
                {
                    values.Add("@ResidentialPlotSize", 0);
                }
                else
                {
                    values.Add("@ResidentialPlotSize", model.ResidentialPlotSize);

                }
                if (model.CommercialPlotSize == 0)
                {
                    values.Add("@CommercialPlotSize", 0);
                }
                else
                {
                    values.Add("@CommercialPlotSize", model.CommercialPlotSize);
                }







                //if (string.IsNullOrEmpty(model.CommercialPlotSize))
                //{
                //    values.Add("@CommercialPlotSize", "0");
                //}
                //else
                //{
                //    values.Add("@CommercialPlotSize", model.CommercialPlotSize);
                //}



                //if (string.IsNullOrEmpty(model.ResidentialPlotSize))
                //{
                //    values.Add("@ResidentialPlotSize", "0");
                //}
                //else
                //{
                //    values.Add("@ResidentialPlotSize", model.ResidentialPlotSize);
                //}

                values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Project_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "ProjectAttachements")
                        {
                            sharedUploadImage.SaveProjectDocument(
                                                            _response == null ? model.ProjectID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }
                return _response == null ? model.ProjectID : _response.Id;
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

    [Command(Name = "Project_UpdateImagesByID")]
    public class Project_UpdateImagesByIDCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                //   ImageID = Guid.Empty, 
                UploadedFiles = new List<FileUploadModel>()
            }, v);

            try
            {
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {

                        sharedUploadImage.Project_UpdateImagesByID(
                                                        model.UploadedFiles[i].AttachmentType,
                                                        model.UploadedFiles[i].OriginalFileName.ToString(),
                                                        model.UploadedFiles[i].CurrentFileName.ToString()
                                                        );

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






    [Command(Name = "Project_DeleteByID")]
    public class Project_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Project_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "ProjectStatusAndProgress_Update")]
    public class ProjectStatusAndProgress_UpdateCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty, ProjectStatus = string.Empty, ProjectProgress = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.ProjectStatusAndProgress_Update.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully Updated" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    [Command(Name = "GetProjectTimeestimation")]
    public class GetProjectTimeestimationCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { categoryTypeName = string.Empty, ContractType = string.Empty, PlotSizename = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.GetProjectTimeestimation.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }













    [Command(Name = "Project_LoadStatusWiseProjects")]
    public class Project_LoadStatusWiseProjectssCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_LoadStatusWiseProjects.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion

    [Command(Name = "Project_SelectByID")]
    public class Project_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Project_SelectDetailByID")]
    public class Project_SelectDetailByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    [Command(Name = "Project_SelectProjectDocument")]
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_SelectProjectDocument.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }



    [Command(Name = "Task_SelectStatusWiseAgainstProject")]
    public class Task_SelectStatusWiseAgainstProjectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty, SelectedStatus = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_SelectStatusWiseAgainstProject.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Task_OverDueOfSelectedProject")]
    public class Task_OverDueOfSelectedProjectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Task_OverDueOfSelectedProject.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Project_ChangeStatus")]
    public class Project_ChangeStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_ChangeStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }


    #region =================== PROJECT COMPLETION CALL ===========================
    [Command(Name = "Project_UpdateStatusByID")]
    public class Project_UpdateStatusByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ProjectID = Guid.Empty, UserID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(StoreProcedure.Project_UpdateStatusByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    #endregion
    #region ============================ Project Select For Dashboard ===================================

    [Command(Name = "Project_Select_For_Dashboard")]
    public class Project_Select_For_DashboardCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { Status = false, returnUrl = "#" };
            //    var model = base.MappedModel(new { Status = string.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                // values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_Select_For_Dashboard.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;

        }
    }

    #endregion


    #region =================== About Us Save ===========================
    [Command(Name = "AboutUs_Save")]
    public class AboutUs_SaveCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                AboutUsId = Guid.Empty,
                UserId = Guid.Empty,
                OurVision = string.Empty,
                Description = string.Empty,
                OurMission = string.Empty,
                OurStories = string.Empty,
                OurQualities = string.Empty,

            }, v);




            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                values = _params.Get(model);
                return repository.GetSingle<dynamic>(StoreProcedure.AboutUs_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "AboutUs_Select")]
    public class AboutUs_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { Status = false, returnUrl = "#" };
            try
            {
                return Ioc.Resolve<IRepository>().GetSingle<dynamic>(StoreProcedure.AboutUs_Select.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);

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
