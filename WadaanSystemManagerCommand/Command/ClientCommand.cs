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
    #region ========================== CUSTOMER MODULE =================================

    [Command(Name = "Client_Select")]
    public class Client_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Status = string.Empty }, v);

            var repository = Ioc.Resolve<IRepository>();

            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);

            return repository.GetMultiple<dynamic>(StoreProcedure.Client_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "Client_SelectByID")]
    public class Client_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ClientID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();
                 values = _params.Get(model);

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Client_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Client_DeleteByID")]
    public class Client_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ClientID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Client_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Client_SelectDetailByID")]
    public class Client_SelectDetailByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ClientID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Client_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    
    [Command(Name = "Client_Save")]
    public class Client_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {
                ClientID = Guid.Empty,
                UserName = string.Empty,
                Password = string.Empty,
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
                CurCity = string.Empty,
                CurProvince = string.Empty,
                PerHouseNo = string.Empty,
                PerStreetNo = string.Empty,
                PerTownSector = string.Empty,
                PerCity = string.Empty,
                PerProvince = string.Empty,
                MaritalStatus = string.Empty,
                Occupation = string.Empty,
                DesignationID = Guid.Empty,
                Company = string.Empty,
                BPhone = string.Empty,
                BEmail = string.Empty,
                BPostalAddress = string.Empty,
                BOffice = string.Empty,
                BStreet = string.Empty,
                BTownSector = string.Empty,
                BCity = string.Empty,
                BProvince = string.Empty,
                BWebpage = string.Empty,
                KnowUsFromGoogle = string.Empty,
                KnowUsFromFacebook = string.Empty,
                KnowUsFromWebsite = string.Empty,
                KnowUsFromInstagram = string.Empty,
                KnowUsFromLinkdin = string.Empty,
                KnowUsFromTwitter = string.Empty,
                RefreeName = string.Empty,
                RefreePhoneNo = string.Empty,
                DispatchHouseNo = string.Empty,
                DispatchStreet = string.Empty,
                DispatchTownSector = string.Empty,
                DispatchCity = string.Empty,
                DispatchProvince = string.Empty,
                BillHouseNo = string.Empty,
                BillStreetNo = string.Empty,
                BillTownSector = string.Empty,
                BillCity = string.Empty,
                BillProvince = string.Empty,
                HobGardening = string.Empty,
                HobBookReading = string.Empty,
                HobMoviesAndSerials = string.Empty,
                HobCoocking = string.Empty,
                UserID = Guid.Empty,

                UploadedFiles = new List<FileUploadModel>()
            }, v);


            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                IDictionary<string, object> ImageValues = new Dictionary<string, object>();
                //  CommandParameters _params = new CommandParameters();
                values.Add("@ClientID", model.ClientID);
                values.Add("@UserName",model.UserName);
                values.Add("@Password", model.Password);
                values.Add("@Prefix", model.Prefix);
                values.Add("@FirstName", model.FirstName);
                values.Add("@LastName", model.LastName);
                values.Add("@GivenName", model.GivenName);
                values.Add("@MobilePhone", model.MobilePhone);
                values.Add("@WhatsApp", model.WhatsApp);
                values.Add("@EmailAddress", model.EmailAddress);
                values.Add("@CurPostalAddress", model.CurPostalAddress);
                values.Add("@CurHouseNo", model.CurHouseNo);
                values.Add("@CurStreetNo", model.CurStreetNo);
                values.Add("@CurTownSector", model.CurTownSector);
                values.Add("@CurCity", model.CurCity);
                values.Add("@CurProvince", model.CurProvince);
                values.Add("@PerHouseNo", model.PerHouseNo);
                values.Add("@PerStreetNo", model.PerStreetNo);
                values.Add("@PerTownSector", model.PerTownSector);
                values.Add("@PerCity", model.PerCity);
                values.Add("@PerProvince", model.PerProvince);
                values.Add("@MaritalStatus", model.MaritalStatus);
                values.Add("@Occupation", model.Occupation);
                values.Add("@DesignationID", model.DesignationID);
                values.Add("@Company", model.Company);
                values.Add("@BPhone", model.BPhone);
                values.Add("@BEmail", model.BEmail);
                values.Add("@BPostalAddress", model.BPostalAddress);
                values.Add("@BOffice", model.BOffice);
                values.Add("@BStreet", model.BStreet);
                values.Add("@BTownSector", model.BTownSector);
                values.Add("@BCity", model.BCity);
             
                values.Add("@BProvince", model.BProvince);
                values.Add("@BWebpage", model.BWebpage);
                if (string.IsNullOrEmpty(model.KnowUsFromGoogle))
                {
                    values.Add("@KnowUsFromGoogle", "0");
                }
                else
                {
                    values.Add("@KnowUsFromGoogle", "1");
                }
                if (string.IsNullOrEmpty(model.KnowUsFromFacebook))
                {
                    values.Add("@KnowUsFromFacebook", "0");
                }
                else
                {
                    values.Add("@KnowUsFromFacebook", "1");
                }
                if (string.IsNullOrEmpty(model.KnowUsFromWebsite))
                {
                    values.Add("@KnowUsFromWebsite", "0");
                }
                else
                {
                    values.Add("@KnowUsFromWebsite", "1");
                }
                if (string.IsNullOrEmpty(model.KnowUsFromInstagram))
                {
                    values.Add("@KnowUsFromInstagram", "0");
                }
                else
                {
                    values.Add("@KnowUsFromInstagram", "1");
                }

                if (string.IsNullOrEmpty(model.KnowUsFromLinkdin))
                {
                    values.Add("@KnowUsFromLinkdin", "0");
                }
                else
                {
                    values.Add("@KnowUsFromLinkdin", "1");
                }
                if (string.IsNullOrEmpty(model.KnowUsFromTwitter))
                {
                    values.Add("@KnowUsFromTwitter", "0");
                }
                else
                {
                    values.Add("@KnowUsFromTwitter", "1");
                }
                
                values.Add("@RefreeName", model.RefreeName);
                values.Add("@RefreePhoneNo", model.RefreePhoneNo);
                values.Add("@DispatchHouseNo", model.DispatchHouseNo);
                values.Add("@DispatchStreet", model.DispatchStreet);
                values.Add("@DispatchTownSector", model.DispatchTownSector);
                values.Add("@DispatchCity", model.DispatchCity);
                values.Add("@DispatchProvince", model.DispatchProvince);
                values.Add("@BillHouseNo", model.BillHouseNo);
                values.Add("@BillStreetNo", model.BillStreetNo);
                values.Add("@BillTownSector", model.BillTownSector);
                values.Add("@BillCity", model.BillCity);
                values.Add("@BillProvince", model.BillProvince);
                if (string.IsNullOrEmpty(model.HobGardening))
                {
                    values.Add("@HobGardening", "0");
                }
                else
                {
                    values.Add("@HobGardening", "1");
                }
                if (string.IsNullOrEmpty(model.HobBookReading))
                {
                    values.Add("@HobBookReading", "0");
                }
                else
                {
                    values.Add("@HobBookReading", "1");
                }
                if (string.IsNullOrEmpty(model.HobMoviesAndSerials))
                {
                    values.Add("@HobMoviesAndSerials", "0");
                }
                else
                {
                    values.Add("@HobMoviesAndSerials", "1");
                }
                if (string.IsNullOrEmpty(model.HobCoocking))
                {
                    values.Add("@HobCoocking", "0");
                }
                else
                {
                    values.Add("@HobCoocking", "1");
                }
               
                values.Add("@UserID", model.UserID);
                
                // values = _params.Get(model);
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Client_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "ProfilePicture")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            _response == null ? model.ClientID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                        if (model.UploadedFiles[i].AttachmentType == "BusniessAttachments")
                        {
                            sharedUploadImage.SaveDynamicImages(
                                                            _response == null ? model.ClientID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }
                return _response == null ? model.ClientID : _response.Id;
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


    [Command(Name = "Project_Information_SelectByClientID")]
    public class Task_SelectByEmployeeIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ClientID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Project_Information_SelectByClientID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Client_ChangeStatus")]
    public class Client_ChangeStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { ClientID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Client_ChangeStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully Updated" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
}







#endregion




