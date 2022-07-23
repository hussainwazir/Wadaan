public enum StoreProcedure
{

    #region ======================== DDL(s) SP'S============================

    Designation_SelectByIDDDL,
    AllowancesType_SelectDDL,
    Department_SelectDDL,
    Designation_SelectByDesiIDDDL,
    country_Select,
    Category_SelectDDL,
    SubCategory_SelectDDL,
    CategoryType_SelectForChildDDL,
    CategoryType_SelectDDL,
    TaxRate_SelectDDL,
    Designation_SelectDDL,
    EmployeeType_SelectDDL,
    Contractor_SelectDDL,
    Client_SelectDDL,
    Project_SelectDDL,
    ProjectCategory_SelectDDL,
    ContractType_SelectDDL,


    Province_SelectDDL,
    City_SelectDDL,
    North_SelectDDL,
    East_SelectDDL,
    West_SelectDDL,
    South_SelectDDL,
    ResidentialPlotSize_SelectDDL,
    CommercialPlotSize_SelectDDL,
    SubStructure_SelectDDL,
    SuperStructure_SelectDDL,
    Finishing_SelectDDL,
    Sketch_SelectDDL,
    SubmissionDrawing_SelectDDL,
    ArchitecturalDrawing_SelectDDL,
    StructuralDrawing_SelectDDL,
    ElectricalDrawing_SelectDDL,
    PlumbingDrawing_SelectDDL,
    Estimation_SelectDDL,



    #endregion

    #region ========================   Dashboard SP'S============================

    DashboardCounter_Select,

    #endregion

    #region =================== IMAGES SP'S ===========================================
    Image_Save,
    Image_Common_Save,
    Image_SaveSingleProfileImage,
    SaveProjectDocument,
    #endregion






    #region =============================== HR DESIGNATION SP'S =========================
    Designation_Save,
    Designation_Select,
    Designation_DeleteByID,
    #endregion


    #region =========================== Account  Module ==================
    Account_Save,
    Account_Select,
    Account_SelectByID,
    Account_Delete, Account_SelectForChildTreeByID,
    #endregion



    #region ================================== Login =====================================
    UserLogin_Select,
    Users_ChangePassword,
    #endregion

    #region ================================== EMPLOYEE And Dashboard SP'S =====================================
    Employee_SelectDDL,
    Employee_DeleteByID,
    Employee_SelectByID,
    Employee_Select,
    Employee_Save,
    Employee_SelectDetailByID,
    ProfileData_SelectDetailByID,
    Check_Unique_Credential,
    Employee_UpdateProfile,
    Task_SelectByEmployeeID,
    MainDashboardData,
    MainDashboardData_ByProjectID,
    Calender_Select_For_Dashboard_ByProjectID,
    MainDashboard_ProjectTimelineChartDataByProjectID,
    MainDashboard_ForProject_ByProjectID,
    Task_Select_For_Dashboard_ByProjectID,
    Project_Select_For_Dashboard_ByProjectID,
    Employee_SelectActive,
    Employee_SelectInActive,
    Employee_ChangeStatus,
    MainDashboard_ForProject,
    MainDashboard_ProjectTimelineChartData,
    MainDashboard_TimeLineChartForAllProject,
    TaskType_SelectAll,
    EmployeeTaskType_MultipleTaskTypeSave,
    EmployeeTaskType_SelectByEmployeeID,
    Task_SelectCountByStatusForEmployee,

    ServicesType_SaveByID,
    ServicesType_SelectByIDs,
    ServicesType_Select,

    #endregion

    #region ==================================  CLIENT SP'S ==============================
    Client_Select,
    Client_Save,
    Client_SelectByID,
    Client_DeleteByID,
    Client_SelectDetailByID,
    Project_Information_SelectByClientID,
    Client_ChangeStatus,
    #endregion

    #region ===================================  Contractor SP'S ====================
    Contractor_Save,
    Contractor_Select,
    Contractor_SelectByID,
    Contractor_DeleteByID,
    Contractor_SelectDetailByID,
    Contractor_ChangeStatus,
    #endregion

    #region ===================================  Project SP'S ====================
    Project_Save,
    Project_Select,
    Project_DeleteByID,
    Project_SelectByID,
    Project_SelectDetailByID,
    Task_SelectStatusWiseAgainstProject,
    ProjectStatusAndProgress_Update,
    Project_LoadStatusWiseProjects,
    Task_OverDueOfSelectedProject,
    Project_Select_For_Dashboard,
    Project_ChangeStatus,
    Project_UpdateStatusByID,
    Project_SelectProjectDocument,
    GetProjectTimeestimation,
    #endregion

    #region ================================ Meeting SP'S ==========================
    MeetingsWithClient_Save,
    Meeting_DeleteByID,
    Meeting_Select,
    Meeting_SelectByID,
    Client_selectByProjectID,
    #endregion

    #region ================================  Task SP'S ===============================
    Images_SelectImagesByTaskID,
    CategorType_IssueSelectDDL,
    Categor_IssueSelectDDL,
    Categor_PrioritySelectDDL,
    Task_Save,
    Task_Select,
    Questions_SelectDDL,
    Task_SelectByID,
    Task_DeleteByID,
    Task_SelectDetailByID,
    Task_EmployeeFollowersMultipleID_Save,
    Task_SelectDDL,
    Task_StatusChanaged,
    Task_SelectCurrentStatus,
    TaskVersion_Save,
    TaskVersion_SelectByTaskID,
    TaskVersion_SelectByID,
    TaskVersion_SelectDetailByID,
    TaskVersion_StatusChanaged,
    TaskVersion_SelectCurrentStatus,
    Task_AssigneeChange,
    Task_SelectAssignee,
    Task_SelectNotificationFollowers,
    Task_ChangeStatusToActive,
    Task_LoadStatusWiseTasks,
    Task_Select_from_Dashbaord,
    NotificationFollowers_DeleteByTaskID,
    Task_SelectDDL_ByProjectId,
    #endregion

    #region ================================  Task Assignment's ==================================
    TaskAssignment_Save,
    TaskAssignment_Select,
    TaskAssignment_SelectByID,
    TaskAssignment_DeleteByID,
    TaskAssignment_SelectDetailByID,
    TaskAssignment_StatusChanged,
    TaskAssignment_SelectCurrentStatus,
    #endregion


    #region ========================== ROLES SP'S ===========================

    Roles_SelectDDL,
    Roles_SelectDDLExceptAdmin,
    Roles_SelectDDLForAdmin,
    #endregion


    #region ========================== MileStone's SP'S ===========================

    Milestone_Save,
    MileStone_Select,
    MileStone_DeleteByID,
    MileStone_SelectByID,
    MileStone_SelectDetailByID,
    MileStoneSelectDDL,
    #endregion


    #region ==================================  SUPPLIER SP'S ==============================
    Supplier_Select,
    Supplier_Save,
    Supplier_SelectByID,
    Supplier_DeleteByID,
    Supplier_SelectDetailByID,
    Supplier_ChangeStatus,
    #endregion
    #region ======================= COMMENT'S SP'S ==========================
    Comment_Select,
    Comment_SelectByID,
    Comment_Save,
    Comment_DeleteByID,
    Comment_ByAreaID,
    #endregion

    #region  ======================  Calender Sp's ===================================
    Task_SelectTaskNames,
    Calender_Select,
    #endregion


    #region =============================== Bulk Employee Enteries ========================
    EmployeeEducationMultipleDetails_Save_New,
    EmployeeExperienceMultipleDetails_Save_New,
    EmployeeEducationDetail_SelectByEmployeeID,
    EmployeeExperiencesDetails_SelectByEmployeeID,
    #endregion

    #region ============================  Access Control (Permissions) ===================================
    AccessControlPermissionToRoleMultiple_Save_New,
    LoadPermissions_SelectByRoleID,
    LoadEmployeeModulePermissions_SelectByRoleID,
    LoadClientModulePermissions_SelectByRoleID,
    LoadSupplierModulePermissions_SelectByRoleID,
    LoadTaskModulePermissions_SelectByRoleID,
    LoadProjectModulePermissions_SelectByRoleID,
    LoadMeetingModulePermissions_SelectByRoleID,
    LoadContractorModulePermissions_SelectByRoleID,
    #endregion

    #region ==================== Client Login Area ===============================================

    project_Select_AgainstClient,
    Project_SelectAttachmentProjectID,
    TaskList_SelectByProjectID,
    Task_SelectByUserID,
    Project_SelectAllAgainstClient,
    Task_SelectAllAgainstClient,
    Comments_ShowAllOnClientProjectTask,
    UserLogin_Name,
    Task_SelectOfCurrentDay,
    Permissions_SelectRoleBase,

    #endregion




    #region ==================== Employee Login Area ===============================================

    Task_SelectAllAgainstEmployee,
    Project_UpdateImagesByID,
    Project_SelectAllAgainstEmployee,
    Task_SelectStatusWise,
    Task_StartTime,
    Task_StopTime,
    Task_Completed,
    Task_ListAssigneToEmployee,
    Task_taskHistoryDetail,
    Task_LoadStatusWise,
    project_Select_AgainstEmployee,
    TaskList_SelectByProjectIDAndUserID,
    Task_AssigneeChangeByEmployee,
    Employee_SelectDDLWithOutAdminAndManager,
    Task_SelectAllUnseenTaskDetail,
    Task_ChandIsSeenStatus,
    Task_StatusChanagedByEmployee,
    Task_GetAllInProgressTasks,
    Task_StatusWithOutInProgressEmployee,
    Task_TaskAttachmentAndChecklist_Save,
    Task_AddAttachementAgainstProgressHistory,
    Task_AddAttachementToNextTask,
    CheckList_GetDataAgainstTaskAndTaskStatus,
    #endregion


    #region ==================== Project Manager Login Area ===============================================

    Roles_SelectManagerDDL,
    AssignedEmpToManager_Select,
    AssignedEmployeeToManager_EmployeeMultipleIDs_Save,
    AssignedEmpToManager_SelectEmployeeByManagerID,
    AssignedEmployeeToManager_SelectManager,
    Employee_SelectWithOutManager,
    AssignedEmployeeToManager_DeleteByEmployeeID,
    Employee_ListAssignToManager,
    Manager_Dashboard,

    #endregion

    #region ================================  CheckList ============================================================
    CheckList_Delete,
    CheckList_Save,
    CheckList_SelectById,
    CheckList_Select, ViewChecklist_Select,

    #endregion

    #region ======================= Website'S SP'S ==========================
    AboutUs_Select,
    Service_Select,
    Project_Select_For_Website,
    Project_Select_For_WebsiteByID,
    Project_Select_Attachments_For_WebsiteByID,
    AboutUs_Save,

    #endregion

}