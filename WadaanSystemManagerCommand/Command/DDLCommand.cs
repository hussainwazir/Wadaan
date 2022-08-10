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
    

    #region ===================== LOAD DESIGNATION DDL =================================
    [Command(Name = "Designation_SelectDDL")]
    public class Designation_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Designation_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }

    [Command(Name = "Designation_SelectList")]
    public class Designation_SelectListCommand : CamelCommandBase
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
                return repository.GetMultiple<dynamic>(StoreProcedure.Designation_SelectList.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);

            }
            catch (Exception ex)
            {
                result = new { status = false, message = ex.Message };
            }
            return result;
        }
        //protected override object DoAction(object v)
        //{
        //    return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Designation_SelectList.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        //}
    }
    #endregion


    #region ===================== LOAD Employee DDL =================================
    [Command(Name = "Employee_SelectDDL")]
    public class Employee_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Employee_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Project DDL =================================
    [Command(Name = "Project_SelectDDL")]
    public class Project_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Project_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD Category DDL =================================
    [Command(Name = "Categor_IssueSelectDDL")]
    public class Categor_IssueSelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Categor_IssueSelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD Priority DDL =================================
    [Command(Name = "Categor_PrioritySelectDD")]
    public class Categor_PrioritySelectDDCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Categor_PrioritySelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD Category Type DDL =================================
    [Command(Name = "CategorType_IssueSelectDDL")]
    public class CategorType_IssueSelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.CategorType_IssueSelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Category Type DDL =================================
    [Command(Name = "Task_SelectDDL")]
    public class Task_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Task_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Contractor DDL =================================
    [Command(Name = "Contractor_SelectDDL")]
    public class Contractor_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Contractor_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Client DDL =================================
    [Command(Name = "Client_SelectDDL")]
    public class Client_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Client_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Project Category DDL =================================
    [Command(Name = "ProjectCategory_SelectDDL")]
    public class ProjectCategory_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ProjectCategory_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Contract Type DDL =================================
    [Command(Name = "ContractType_SelectDDL")]
    public class ContractType_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ContractType_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Province  DDL =================================
    [Command(Name = "Province_SelectDDL")]
    public class Province_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Province_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD City  DDL =================================
    [Command(Name = "City_SelectDDL")]
    public class City_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.City_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD North  DDL =================================
    [Command(Name = "North_SelectDDL")]
    public class North_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.North_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD East  DDL =================================
    [Command(Name = "East_SelectDDL")]
    public class East_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.East_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD West  DDL =================================
    [Command(Name = "West_SelectDDL")]
    public class West_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.West_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD West  DDL =================================
    [Command(Name = "South_SelectDDL")]
    public class South_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.South_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Residential Plot Size  DDL =================================
    [Command(Name = "ResidentialPlotSize_SelectDDL")]
    public class ResidentialPlotSize_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ResidentialPlotSize_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion


    #region ===================== LOAD Commercial  DDL =================================
    [Command(Name = "CommercialPlotSize_SelectDDL")]
    public class CommercialPlotSize_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.CommercialPlotSize_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Sub Structural DDL =================================
    [Command(Name = "SubStructure_SelectDDL")]
    public class SubStructure_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.SubStructure_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Super Structural DDL =================================
    [Command(Name = "SuperStructure_SelectDDL")]
    public class SuperStructure_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.SuperStructure_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Finishing  DDL =================================
    [Command(Name = "Finishing_SelectDDL")]
    public class Finishing_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Finishing_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Sketch DDL =================================
    [Command(Name = "Sketch_SelectDDL")]
    public class Sketch_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Sketch_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Submission Drawing DDL =================================
    [Command(Name = "SubmissionDrawing_SelectDDL")]
    public class SubmissionDrawing_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.SubmissionDrawing_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Architectural Drawing DDL =================================
    [Command(Name = "ArchitecturalDrawing_SelectDDL")]
    public class ArchitecturalDrawing_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ArchitecturalDrawing_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Structural Drawing DDL =================================
    [Command(Name = "StructuralDrawing_SelectDDL")]
    public class StructuralDrawing_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.StructuralDrawing_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Electrical Drawing DDL =================================
    [Command(Name = "ElectricalDrawing_SelectDDL")]
    public class ElectricalDrawing_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.ElectricalDrawing_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion


    #region ===================== LOAD Electrical Drawing DDL =================================
    [Command(Name = "PlumbingDrawing_SelectDDL")]
    public class PlumbingDrawing_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.PlumbingDrawing_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Electrical Drawing DDL =================================
    [Command(Name = "Estimation_SelectDDL")]
    public class Estimation_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Estimation_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion




    #region ===================== LOAD DESIGNATION DDL =================================
    [Command(Name = "EmployeeType_SelectDDL")]
    public class EmployeeType_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.EmployeeType_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD EMPLOYEES DDL =================================
    [Command(Name = "listEmployeesDDL")]
    public class listEmployeesDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Employee_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion


    #region ===================== LOAD DEPARTMENT DDL =================================
    [Command(Name = "listDepartmentDDL")]
    public class listDepartmentDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Department_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD DESIGNATION DDL =================================
    [Command(Name = "listDesignationByIDDDL")]
    public class listDesignationByIDDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            var model = base.MappedModel(new { DepartmentID = Guid.Empty }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Designation_SelectByIDDDL.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }


    [Command(Name = "listDesignationByDesiIDDDL")]
    public class listDesignationByDesiIDDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            var repository = Ioc.Resolve<IRepository>();
            var model = base.MappedModel(new { DesignationID = Guid.Empty }, v);
            IDictionary<string, object> values = new Dictionary<string, object>();
            CommandParameters _params = new CommandParameters();
            values = _params.Get(model);
            return repository.GetMultiple<dynamic>(StoreProcedure.Designation_SelectByDesiIDDDL.ToString(), values, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD Country DDL =================================

    [Command(Name = "listCountryDDL")]
    public class listCountryDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.country_Select.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    
    
    
    
    
    #region ===================== LOAD  Category DDL =================================

    [Command(Name = "listCategoryDDL")]
    public class listCategoryDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Category_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion 
    #region ===================== LOAD Sub Category DDL =================================

    [Command(Name = "listSubCategoryDDL")]
    public class listSubCategoryDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.SubCategory_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion 
    

    



    
     
    #region ===================== LOAD Account  DDL =================================
    [Command(Name = "CategoryType_SelectForChildDDL")]
    public class CategoryType_SelectForChildDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.CategoryType_SelectForChildDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Account  DDL =================================
    [Command(Name = "CategoryType_SelectDDL")]
    public class CategoryType_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.CategoryType_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD Account  DDL =================================
    [Command(Name = "TaxRate_SelectDDL")]
    public class TaxRate_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.TaxRate_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== Employee ROLE  DDL =================================
    [Command(Name = "Roles_SelectDDL")]
    public class Roles_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Roles_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== Employee ROLE  DDL =================================
    [Command(Name = "Roles_SelectDDLForAdmin")]
    public class Roles_SelectDDLForAdminCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Roles_SelectDDLForAdmin.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== Employee ROLE  DDL =================================
    [Command(Name = "Roles_SelectDDLExceptAdmin")]
    public class Roles_SelectDDLExceptAdminCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Roles_SelectDDLExceptAdmin.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
    #region ===================== LOAD MileStone DDL =================================
    [Command(Name = "MileStoneSelectDDL")]
    public class MileStoneSelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.MileStoneSelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion

    #region ===================== LOAD Qustions DDL =================================
    [Command(Name = "Questions_SelectDDL")]
    public class Questions_SelectDDLCommand : CamelCommandBase
    {
        protected override object DoAction(object v)
        {
            return Ioc.Resolve<IRepository>().GetMultiple<dynamic>(StoreProcedure.Questions_SelectDDL.ToString(), null, XtremeFactory._factory, XtremeFactory.connectionString);
        }
    }
    #endregion
}

