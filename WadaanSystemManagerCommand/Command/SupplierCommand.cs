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
    #region ========================== SUPPLIER MODULE =================================

    [Command(Name = "Supplier_Select")]
    public class Supplier_SelectCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {


            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { Status = string.Empty }, v);

            var repository = Ioc.Resolve<IRepository>();
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Supplier_Select.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "Supplier_SelectByID")]
    public class Supplier_SelectByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { SupplierID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Supplier_SelectByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }
    [Command(Name = "Supplier_DeleteByID")]
    public class Supplier_DeleteByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { SupplierID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Supplier_DeleteByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                result = new { status = true, message = "Successfully deleted" };
            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Supplier_SelectDetailByID")]
    public class Supplier_SelectDetailByIDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { SupplierID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                return repository.GetMultiple<dynamic>(StoreProcedure.Supplier_SelectDetailByID.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
    }

    [Command(Name = "Supplier_Save")]
    public class Supplier_SaveCommand : CamelCommandBase
    {

        protected override object DoAction(object v)
        {
            SharedUploadImage sharedUploadImage = new SharedUploadImage();

            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new
            {


                SupplierID = Guid.Empty,
                FirstName = string.Empty,
                LastName = string.Empty,
                HomeAddress = string.Empty,
                Telephone = string.Empty,
                MobileNo = string.Empty,
                Fax = string.Empty,
                Email = string.Empty,
                SupplierType = string.Empty,
                BankAccountNo = string.Empty,
                PaymentMethod = string.Empty,
                PaymentTerm = string.Empty,
                CheckNo = string.Empty,
                CardNumber = string.Empty,
                CardHolderName = string.Empty,
                CardTransactionNo = string.Empty,
                CardType = string.Empty,
                //   SupplierMaterialtype = string.Empty,
                ContactPersonName = string.Empty,
                ContactPersonMobileNumber = string.Empty,
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
                var _response = repository.GetSingle<dynamic>(StoreProcedure.Supplier_Save.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
                if (model.UploadedFiles.Count > 0)
                {

                    for (int i = 0; i < model.UploadedFiles.Count; i++)
                    {
                        if (model.UploadedFiles[i].AttachmentType == "ProfilePicture")
                        {
                            sharedUploadImage.SaveProfileImages(
                                                            _response == null ? model.SupplierID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                        if (model.UploadedFiles[i].AttachmentType == "BusniessAttachments")
                        {
                            sharedUploadImage.SaveDynamicImages(
                                                            _response == null ? model.SupplierID : _response.Id,
                                                            model.UploadedFiles[i].AttachmentType,
                                                            model.UploadedFiles[i].CurrentFileName.ToString()
                                                            //model.UploadedFiles[i].CurrentFilePath.ToString()

                                                            );
                        }
                    }
                }
                return _response == null ? model.SupplierID : _response.Id;
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


    [Command(Name = "Supplier_ChangeStatus")]
    public class Supplier_ChangeStatusCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            object result = new { status = false, returnUrl = "#" };
            var model = base.MappedModel(new { SupplierID = Guid.Empty }, v);

            try
            {
                var repository = Ioc.Resolve<IRepository>();
                IDictionary<string, object> values = new Dictionary<string, object>();
                CommandParameters _params = new CommandParameters();

                values = _params.Get(model);
                repository.ExecuteProcedure(StoreProcedure.Supplier_ChangeStatus.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
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




