using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WadaanSystemManagerCommand.Model
{
    public class ProductIds
    {
        public Guid Id { get; set; }
    }


    public class Task_EmployeeFollowersMultipleIDs
    {


        public Task_EmployeeFollowersMultipleIDs() { }

        public Guid TaskID { get; set; }
        public Guid EmployeeID { get; set; }
        public Guid UserID { get; set; }
        public Guid ProjectID { get; set; }



    }

    public class AssignedEmployeeToManager_EmployeeMultipleIDs
    {
        public AssignedEmployeeToManager_EmployeeMultipleIDs() { }
        public Guid EmployeeID { get; set; }
        public Guid UserID { get; set; }
        public Guid ManagerID { get; set; }
    }

    public class EmployeeTaskType_MultipleTaskTypeSave
    {
        public EmployeeTaskType_MultipleTaskTypeSave() { }
        public Guid EmployeeID { get; set; }
        public Guid UserID { get; set; }
        public string TaskType { get; set; }
    }


    public class BulkEmployeeEducationDetails
    {


        public BulkEmployeeEducationDetails() { }

        public Guid EmployeeID { get; set; }
        public string EducationLevel { get; set; }
        public string DegreeTitle { get; set; }
        public string InstituteName { get; set; }
        public string ObtainedTotalMarks { get; set; }
        public string PassingYear { get; set; }
        public Guid UserId { get; set; }

    }

    public class BulkEmployeeExperiencesDetails
    {


        public BulkEmployeeExperiencesDetails() { }

        public Guid EmployeeID { get; set; }
        public string JobTitle { get; set; }
        public string EmployerName { get; set; }
        public string EmployerAddress { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public Guid UserId { get; set; }

    }


    public class BulkAssignPermissionsToRole
    {


        public BulkAssignPermissionsToRole() { }

        
        public string ModuleName { get; set; }
        public string FormName { get; set; }
        public bool isRead { get; set; }
        public bool isCreate { get; set; }
        public bool isUpdate { get; set; }
        public bool isDelete { get; set; }
        public Guid RoleId { get; set; }
    
        public Guid UserId { get; set; }

    }

    public class EmailTemplateDetailTesting
    {


        public EmailTemplateDetailTesting() { }


        public string SenderName { get; set; }
        public string SenderSubject { get; set; }
        public bool SenderEmail { get; set; }
        public bool SenderMessage { get; set; }
       

    }

    public class BulkDesignationDetail
    {


        public BulkDesignationDetail() { }

        public Guid DesignationID { get; set; }
        public string DesignationName { get; set; }
        public Guid UserId { get; set; }
        public bool IsActive { get; set; }


    }
}
 