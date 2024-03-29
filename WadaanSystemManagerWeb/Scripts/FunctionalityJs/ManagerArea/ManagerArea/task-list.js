﻿
var userId = "";
var username = "";
var roleID = "";
var Status = "";

var $grid = "task-grid";
var $grid1 = "task-grid-in-active-tasks";
var $grid2 = "all-tasks-grid";

var IsCreateTask = localStorage.getItem('IsCreateTask');
var IsReadTask = localStorage.getItem('IsReadTask');
var IsUpdatedTask = localStorage.getItem('IsUpdatedTask');
var IsDeleteTask = localStorage.getItem('IsDeleteTask');
var IsReadTaskDetail = localStorage.getItem('IsReadTaskDetail');


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    if (IsCreateTask == 'false') {
        $('#btn-add-new-task').hide();
    }
    LoadtaskKendo();

});

// ------------------------------------------------------------ Active Tasks Start  --------------------------------------------------------------------
function LoadtaskKendo() {
    Status = 'Active'
    KendoGlobalAjax({ commandName: 'Task_Select', values: { Status: Status }, CallBack: fnloadActiveTaskData });
}
var fnloadActiveTaskData = function (d) {

    KendoGridActiveTasks(JSON.parse(d.Value));

}
var KendoGridActiveTasks = function (_data) {

    var record = 0;

    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 180, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadTaskDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a>  # } else  {# #=taskTitle# #}#",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "mileStoneID", title: "Milestone", width: 170, filterable: true, hidden: true },
        { field: "projectID", title: "Project", width: 150, filterable: true },
        { field: "assigneeID", title: "Assign To", width: 150, filterable: true, },
        { field: "issueTypeId", title: "Issue Type", width: 170, filterable: true, hidden: true },
        { field: "issueStatusID", title: "Task Status", width: 150, filterable: true },
        { field: "reportedBy", title: "Reported By", width: 170, filterable: true, hidden: true },
        { field: "reportedDate", title: "Reported Date", width: 150, filterable: true },
        { field: "issuePriority", title: "Priority", width: 150, filterable: true },
        { field: "dueDate", title: "Due Date", width: 150, filterable: true },
        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            template: "# if (IsUpdatedTask == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' <span class='fa fa-edit'></span></a>   # } if (IsDeleteTask == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'<span class='fa fa-trash'></span></a> #}   #",
            //template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'><span class='fa fa-trash'></span></a>"
        }];

    BindkendoGrid($grid, 50, colModel, _data);
};
// ------------------------------------------------------   Active Task Grid END -------------------------------------------------------------------------



// ------------------------------------------------------------ In Active Tasks Start  --------------------------------------------------------------------
function LoadInActivetaskKendo() {
    Status = 'InActive'
    KendoGlobalAjax({ commandName: 'Task_Select', values: { Status: Status }, CallBack: fnloadInActiveTaskData });
}
var fnloadInActiveTaskData = function (d) {

    KendoGridInActiveTasks(JSON.parse(d.Value));

}
var KendoGridInActiveTasks = function (_data) {

    var record = 0;

    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 180, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadTaskDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a>  # } else  {# #=taskTitle# #}#",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "mileStoneID", title: "Milestone", width: 170, filterable: true, hidden: true },
        { field: "projectID", title: "Project", width: 150, filterable: true },
        { field: "assigneeID", title: "Assign To", width: 150, filterable: true, },
        { field: "issueTypeId", title: "Issue Type", width: 170, filterable: true, hidden: true },
        { field: "issueStatusID", title: "Task Status", width: 150, filterable: true },
        { field: "reportedBy", title: "Reported By", width: 170, filterable: true, hidden: true },
        { field: "reportedDate", title: "Reported Date", width: 150, filterable: true },
        { field: "issuePriority", title: "Priority", width: 150, filterable: true },
        { field: "dueDate", title: "Due Date", width: 150, filterable: true },
        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //template: "# if (IsUpdatedTask == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteTask == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'<span class='fa fa-trash'></span></a> #}   #",
            // template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'><span class='fa fa-trash'></span></a>"
            template: "# if (IsUpdatedTask == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>  # }   #",
        }];

    BindkendoGrid($grid1, 50, colModel, _data);
};
// ------------------------------------------------------  In Active Task Grid END ------------------------------------------------------------------------


// ------------------------------------------------------------ All Tasks Start  --------------------------------------------------------------------
function LoadAlltaskKendo() {
    Status = 'All'
    KendoGlobalAjax({ commandName: 'Task_Select', values: { Status: Status }, CallBack: fnloadAllTaskData });
}
var fnloadAllTaskData = function (d) {

    KendoGridAllTasks(JSON.parse(d.Value));

}
var KendoGridAllTasks = function (_data) {

    var record = 0;

    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 180, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadTaskDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a>  # } else  {# #=taskTitle# #}#",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "mileStoneID", title: "Milestone", width: 170, filterable: true, hidden: true },
        { field: "projectID", title: "Project", width: 150, filterable: true },
        { field: "assigneeID", title: "Assign To", width: 150, filterable: true, },
        { field: "issueTypeId", title: "Issue Type", width: 170, filterable: true, hidden: true },
        { field: "issueStatusID", title: "Task Status", width: 150, filterable: true },
        { field: "reportedBy", title: "Reported By", width: 170, filterable: true, hidden: true },
        { field: "reportedDate", title: "Reported Date", width: 150, filterable: true },
        { field: "issuePriority", title: "Priority", width: 150, filterable: true },
        { field: "dueDate", title: "Due Date", width: 150, filterable: true },
        //{
        //    field: "", width: 170,
        //    title: "Action",
        //    //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
        //    //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
        //    //template: "# if (IsUpdatedTask == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteTask == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'<span class='fa fa-trash'></span></a> #}   #",
        //    template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'><span class='fa fa-trash'></span></a>"
        //}
    ];

    BindkendoGrid($grid2, 50, colModel, _data);
};
// ------------------------------------------------------  All Task Grid END ------------------------------------------------------------------------


$('#active-tasks').on('click', function () {
    LoadtaskKendo();

});
$('#in-active-tasks').on('click', function () {
    LoadInActivetaskKendo();

});
$('#all-tasks').on('click', function () {
    LoadAlltaskKendo();

});


function ChangeStatus(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid1).data("kendoGrid");
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
            KendoGlobalAjax({ commandName: 'Task_ChangeStatusToActive', values: "{TaskID:'" + dataItem.taskId + "'}", CallBack: '' });
            setTimeout(function () {
                LoadInActivetaskKendo();

            }, 50);

            swal.fire('Updated', '', 'success');
            LoadInActiveContractorAjax();
            LoadContractorKendo();
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });


}


var LoadStatusWiseTasks = function (d) {
    var selectedStatus = $('#ddl-task-status').val();
    KendoGlobalAjax({ commandName: 'Task_LoadStatusWiseTasks', values: "{Status:'" + selectedStatus + "'}", CallBack: fnloadAllTaskData });

}


function LoadRecordByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MTaskDetail?taskID=' + dataItem.taskId + '';
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MTaskSave?taskID=' + dataItem.taskId + '';
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
            KendoGlobalAjax({ commandName: 'Task_DeleteByID', values: "{TaskID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadtaskKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}




$('#btn-add-update-employee').click(function () {
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MTaskList', '';
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