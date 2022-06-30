
var userId = "";
var username = "";
var roleID = "";
var Status = "";

var $grid = "project-grid";
var $gridInActive = "in-active-project-grid";
var $gridALL = "all-projects-grid";



var IsCreateProject = localStorage.getItem('IsCreateProject');
var IsReadProject = localStorage.getItem('IsReadProject');
var IsUpdatedProject = localStorage.getItem('IsUpdatedProject');
var IsDeleteProject = localStorage.getItem('IsDeleteProject');
var IsReadProjectDetail = localStorage.getItem('IsReadProjectDetail');


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadProjectKendo();


});
// ----------------------------------------------------- Active Project Start   ---------------------------------------------------------
function LoadProjectKendo() {

    Status = 'Active';
    KendoGlobalAjax({ commandName: 'project_Select', values: { Status: Status }, CallBack: loadProjects });
}
var loadProjects = function (d) {
    KendoGrid(JSON.parse(d.Value));
}
var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [
        { title: "S/N", width: 40, template: "#= renderNumber() #" },
        { field: "projectKey", title: "Project ID", width: 100, filterable: true },
        { field: "projectID", title: "ProjectID", hidden: true, width: 200 },
        {
            field: "projectName", width: 180, title: "Project Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            //template: "# if (IsReadProjectDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a>  # } else  {# #=projectName# #}#",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "clientName", title: "Client Name", width: 140, filterable: true },
        { field: "priority", title: "Priority", width: 60, filterable: true },
        //, { field: "priority", title: "Priority", width: 180, filterable: true },

        {
            field: "projectStatus", width: 100, title: "Project Staus",
           
            template: "<span  class='#=projectStatuscode#'  >#=projectStatus#</span> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "totalTaskcount", title: "Total Tasks", width: 80, filterable: true },
        { field: "ttalActiveTaskcount", title: "Current Task#", width: 100, filterable: true },

        { field: "daysleft", title: "Days left", width: 70, filterable: true },
        { field: "accamluatedProgress", title: "Accamluated Progress", width: 100, filterable: true },
        { field: "progressStatus", title: "Progress Status", width: 100, filterable: true },
        { field: "plotHouseNo", title: "Plot House No#", width: 170, filterable: true, hidden: true },
        //{ field: "street", title: "Street", width: 150, filterable: true },
        //{ field: "townSector", title: "Town/Sector", width: 150, filterable: true },
        //{ field: "cityName", title: "City Name", width: 150, filterable: true },
        //{ field: "provinceName", title: "Province ", width: 150, filterable: true },
        { field: "gPSCordinates", title: "GPS Cordinates", width: 170, filterable: true, hidden: true },
        { field: "googleLocation", title: "Google Location", width: 170, filterable: true, hidden: true },
        //{ field: "constructionStatus", title: "Construction Status", width: 170, filterable: true },
        { field: "startDate", title: "StartDate", width: 170, filterable: true, hidden: true },
        { field: "projectAttachements", title: "ProjectAttachements", width: 170, filterable: true, hidden: true },
        { field: "contractorID", title: "ContractorID", width: 170, filterable: true, hidden: true },
        { field: "typeOfSupervisionServices", title: "TypeOfSupervisionServices", width: 170, filterable: true, hidden: true },
        {
            field: "", width: 200,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Project' ><span class='fa fa-edit'></span></a> "
                //+ " <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=projectID#')  title='Delete Project'><span class='fa fa-trash'></span> "
                + " <a style='font-size:20px;cursor:pointer;' onClick= AddNewTask('#=projectID#')   title='Add Task'><span class='fa  fa-plus'></span></a> "
                + " <button type='button' onclick='fnCompleteProject(this);' class='btn-sm btn btn-success text-white   waves-effect  f-w-600 d-inline-block'>Complete Project</button> ",
            //template: "# if (IsUpdatedProject == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Project' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteProject == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=projectID#')  title='Delete Project'<span class='fa fa-trash'></span></a> #}   #",


        }];

    BindkendoGrid2($grid, 50, colModel, _data);
};


// ----------------------------------------------------  Active Projects End--------------------------------------------------------

function fnCompleteProject(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    //dataItem.archiveId 

    swal.fire({
        title: 'Are you sure?',

        text: "You want to complete " + dataItem.projectName + " project ?",
        icon: 'question', showCancelButton: true, confirmButtonColor: '#5cb85c', cancelButtonColor: '#d9534f',
        buttons: {
            cancel: { text: "Cancel", value: null, visible: true, className: "btn btn-danger", closeModal: true },
            confirm: { text: "OK", value: true, visible: true, className: "btn btn-warning", closeModal: true }
        }
    }).then(function (restult) {

        if (restult.value) {
            
            //********************   AJAX START **********************
            KendoGlobalAjax({
                commandName: 'Project_UpdateStatusByID', values: {
                    ProjectID: dataItem.projectID,
                    UserID: window.localStorage.getItem("userId")
                }, CallBack: fnProjectResponse
            });

            //  }
            //********************   AJAX END **********************

        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}
    var fnProjectResponse = function (d) {
         
        if (JSON.parse(d.Value)[""] == "Task Remaining") {
            swal.fire({
                title: 'Cancelled',
                text: "",
                icon: 'question', showCancelButton: true, confirmButtonColor: '#5cb85c', cancelButtonColor: '#d9534f',
                buttons: {
                    cancel: { text: "Cancel", value: null, visible: true, className: "btn btn-danger", closeModal: true },
                    confirm: { text: "OK", value: true, visible: true, className: "btn btn-warning", closeModal: true }
                }
            })
        } else {

            LoadProjectKendo();
            swal.fire('Successfully completed...', '', 'success');
        }
    }



    // ----------------------------------------------------- In Active Project  Start ---------------------------------------------------------
    function LoadInActiveProjectKendo() {

        Status = 'InActive';
        KendoGlobalAjax({ commandName: 'project_Select', values: { Status: Status }, CallBack: loadInActiveProjects });
    }
    var loadInActiveProjects = function (d) {

        KendoGridInActive(JSON.parse(d.Value));

    }
    var KendoGridInActive = function (_data) {

        var record = 0;

        var colModel = [
            { field: "projectID", title: "ProjectID", hidden: true, width: 200 },
            {
                field: "projectName", width: 180, title: "ProjectName",
                //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
                template: "# if (IsReadProjectDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a>  # } else  {# #=projectName# #}#",
                //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a> ",
                filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            },
            { field: "clientName", title: "Client Name", width: 180, filterable: true },
            { field: "plotHouseNo", title: "Plot House No", width: 170, filterable: true, hidden: true },
            { field: "street", title: "Street", width: 150, filterable: true },
            { field: "townSector", title: "TownSector", width: 150, filterable: true },
            { field: "cityName", title: "City Name", width: 150, filterable: true },
            { field: "provinceName", title: "Province ", width: 150, filterable: true },
            { field: "gPSCordinates", title: "GPSCordinates", width: 170, filterable: true, hidden: true },
            { field: "googleLocation", title: "GoogleLocation", width: 170, filterable: true, hidden: true },
            { field: "constructionStatus", title: "ConstructionStatus", width: 170, filterable: true },
            { field: "startDate", title: "StartDate", width: 170, filterable: true, hidden: true },
            { field: "projectAttachements", title: "ProjectAttachements", width: 170, filterable: true, hidden: true },
            { field: "contractorID", title: "ContractorID", width: 170, filterable: true, hidden: true },
            { field: "typeOfSupervisionServices", title: "TypeOfSupervisionServices", width: 170, filterable: true, hidden: true },
            {
                field: "", width: 170,
                title: "Action",

                template: "  <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>   ",

            }];

        BindkendoGrid2($gridInActive, 50, colModel, _data);
    };

    function ChangeStatus(e) {

        var row = $(e).closest("tr");
        var grid = $("#" + $gridInActive).data("kendoGrid");
        var dataItem = grid.dataItem(row);

        swal.fire({
            title: 'Are you sure?',
            //text: "You won't be able to revert this!",
            text: "You want to Update Status!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#d9534f',
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-warning",
                    closeModal: true
                }
            }
        }).then(function (restult) {

            if (restult.value) {

                KendoGlobalAjax({ commandName: 'Project_ChangeStatus', values: "{ProjectID:'" + dataItem.projectID + "'}", CallBack: '' });
                setTimeout(function () {


                }, 50);

                swal.fire('Updated', '', 'success');

                LoadInActiveProjectKendo();
                LoadProjectKendo();

            } else {
                swal.fire("Cancelled", '', "error");

            }
        });


    }

    // ---------------------------------------------------- In Active Projects End --------------------------------------------------------



    // ----------------------------------------------------- All Project  Start ---------------------------------------------------------
    function LoadAllProjectKendo() {

        Status = 'All';
        KendoGlobalAjax({ commandName: 'project_Select', values: { Status: Status }, CallBack: loadAllProjects });

    }
    var loadAllProjects = function (d) {
        KendoGridAllProjects(JSON.parse(d.Value));

    }

    var KendoGridAllProjects = function (_data) {

        var record = 0;

        var colModel = [
            { field: "projectID", title: "ProjectID", hidden: true, width: 200 },
            {
                field: "projectName", width: 180, title: "ProjectName",
                //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
                template: "# if (IsReadProjectDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a>  # } else  {# #=projectName# #}#",
                //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a> ",
                filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            },
            { field: "clientName", title: "Client Name", width: 150, filterable: true },
            { field: "plotHouseNo", title: "Plot House No", width: 170, filterable: true, hidden: true },
            { field: "street", title: "Street", width: 150, filterable: true },
            { field: "townSector", title: "TownSector", width: 150, filterable: true },
            { field: "cityName", title: "City Name", width: 150, filterable: true },
            { field: "provinceName", title: "Province ", width: 150, filterable: true },
            { field: "gPSCordinates", title: "GPSCordinates", width: 170, filterable: true, hidden: true },
            { field: "googleLocation", title: "GoogleLocation", width: 170, filterable: true, hidden: true },
            { field: "constructionStatus", title: "ConstructionStatus", width: 170, filterable: true },
            { field: "startDate", title: "StartDate", width: 170, filterable: true, hidden: true },
            { field: "projectAttachements", title: "ProjectAttachements", width: 170, filterable: true, hidden: true },
            { field: "contractorID", title: "ContractorID", width: 170, filterable: true, hidden: true },
            { field: "typeOfSupervisionServices", title: "TypeOfSupervisionServices", width: 170, filterable: true, hidden: true },
            // {
            //field: "", width: 170,
            //title: "Action",


            //    //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //    //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //    template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Project' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=projectID#')  title='Delete Project'><span class='fa fa-trash'></span>  <a style='font-size:20px;cursor:pointer;' onClick= AddNewTask('#=projectID#')   title='Add Task'><span class='fa  fa-plus'></span></a>"
            //template: "# if (IsUpdatedProject == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Project' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteProject == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=projectID#')  title='Delete Project'<span class='fa fa-trash'></span></a> #}   #",


            //  }
        ];

        BindkendoGrid($gridALL, 50, colModel, _data);
    };

    // ---------------------------------------------------- All Projects --------------------------------------------------------



    $('#activeproject').on('click', function () {
        LoadProjectKendo();
    });
    $('#in-active-projects').on('click', function () {

        LoadInActiveProjectKendo();
    });
    $('#all-projects').on('click', function () {
        LoadAllProjectKendo();
    });



    var LoadProjectAgainstStatus = function (d) {
        var selectedStatus = $('#ddl-Project-Status').val();
        KendoGlobalAjax({ commandName: 'Project_LoadStatusWiseProjects', values: "{Status:'" + selectedStatus + "'}", CallBack: loadAllProjects });

    }


    function LoadRecordByID(e) {
        var row = $(e).closest("tr");
        var grid = $("#" + $grid).data("kendoGrid");
        var dataItem = grid.dataItem(row);
        window.location.href = '/Project/Project/ProjectDetail?projectID=' + dataItem.projectID + '';
    }

    function EditDetail(e) {

        var row = $(e).closest("tr");
        var grid = $("#" + $grid).data("kendoGrid");
        var dataItem = grid.dataItem(row);
        window.location.href = '/Project/Project/Save?projectID=' + dataItem.projectID + '';
    }


    function AddNewTask(id) {

        window.localStorage.setItem("ProjectID", id);
        window.location.href = '/Task/Task/Save';
    }



    var deleteRecordByID = function (id) {

        swal.fire({
            title: 'Are you sure?',
            //text: "You won't be able to revert this!",
            text: "You want to delete this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#d9534f',
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-warning",
                    closeModal: true
                }
            }
        }).then(function (restult) {

            if (restult.value) {
                KendoGlobalAjax({ commandName: 'Project_DeleteByID', values: "{ProjectID:'" + id + "'}", CallBack: '' });
                setTimeout(function () {

                    LoadProjectKendo();
                }, 50);

                swal.fire('Deleted', '', 'success');
            } else {
                swal.fire("Cancelled", '', "error");

            }
        });
    }

    $('#btn-add-update-employee').click(function () {
        window.location.href = '/Employee/Save', '';
        //window.open('/Customer/Save', '_blank');

    });



//function LoadKendoDates() {
//    $("#licenseExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]
//    }); $("#certificateExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]

//    });
//}
//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country"); }


//function LoadCountry() {
//    KendoGlobalAjax({ commandName: 'listCountry', values: '{}', CallBack: getLoadCountry });
//}

//var getLoadCountry = function (d) {
//    _CountryList += BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country");
//}