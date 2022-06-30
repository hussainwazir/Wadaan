
var userId = "";
var username = "";
var roleID = "";

var $grid = "project-list-employee-involved";

$(document).ready(function () {
   
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
   
    LoadProjectKendo();
    LoadTotalUnseenTask();
});
function LoadTotalUnseenTask() {
    KendoGlobalAjax({ commandName: 'Task_SelectAllUnseenTaskDetail', values: { UserID: userId }, CallBack: fnLoadTotalUnseenTask });
}
var fnLoadTotalUnseenTask = function (d) {

    $('.loadNotification').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('.loadNotification').append('<li> <a href="javascript:void(0)" class="link border-top"> <a class="dropdown-item" href="/EmployeeArea/EmployeeArea/EATaskDetail?taskID=' + JSON.parse(d.Value)[i].taskId + ' " > <i class="ti-list me-1 ms-1"></i> <h7 style="padding-left:5px" id="project-name"> <strong> ' + JSON.parse(d.Value)[i].projectName + ' </strong > </h7 > <br /> <h7 style="padding-left:30px" id="task-name"> ' + JSON.parse(d.Value)[i].taskTitle + ' </h7 > </a > </a > </li > ')
    }

}

function LoadProjectKendo() {
    KendoGlobalAjax({ commandName: 'project_Select_AgainstEmployee', values: { UserID: userId }, CallBack: loadProjectsOfEmployee });  
}


var loadProjectsOfEmployee = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;

    var colModel = [

      

        { field: "projectID", title: "ProjectID", hidden: true, width: 200 },
        { field: "taskId", title: "TaskId", hidden: true, width: 200 },
        {
            field: "projectName", width: 250, title: "Project Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "priority", title: "Priority", width: 170, filterable: true },
        { field: "projectCategory", title: "Project Category", width: 170, filterable: true },
        { field: "contractType", title: "Contract Type", width: 170, filterable: true },
        
        { field: "plotHouseNo", title: "Plot House No", width: 170, filterable: true, hidden: true},
        { field: "street", title: "Street", width: 170, filterable: true },
        { field: "townSector", title: "Town/Sector", width: 170, filterable: true },
        { field: "cityName", title: "City Name", width: 170, filterable: true },
        { field: "provinceName", title: "Province ", width: 170, filterable: true },

        { field: "north", title: "North ", width: 170, filterable: true },
        { field: "east", title: "East ", width: 170, filterable: true },
        { field: "west", title: "West ", width: 170, filterable: true },
        { field: "south", title: "South ", width: 170, filterable: true },
       
        { field: "constructionStatus", title: "Construction Status", width: 170, filterable: true },
        { field: "startDate", title: "StartDate", width: 170, filterable: true, hidden: true },
        { field: "dueDate", title: "DueDate", width: 170, filterable: true,hidden:true },
       
 
    ];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/EmployeeArea/EmployeeArea/EAProjectTaskList?projectID=' + dataItem.projectID + '';
}

function EditDetail(e) {
    
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Project/Save?projectID=' + dataItem.projectID + '';
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