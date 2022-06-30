
var userId = "";
var username = "";
var roleID = "";

var $grid = "taskversion-grid";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    var FkTypeID = getUrlVars();
    $("#FkTypeID").val(FkTypeID);

    LoadtaskVersionKendo();

});


function LoadtaskVersionKendo() {
    KendoGlobalAjax({ commandName: 'TaskVersion_SelectByTaskID', values: { TaskID: $("#FkTypeID").val() }, CallBack: fnloadTaskVersionsData });
}


var fnloadTaskVersionsData = function (d) {


    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [

        { field: "taskVersionID", title: "TaskVersionID", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 120, title: "TaskTitle",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadTaskVersionRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "subject", title: "Subject", width: 100, filterable: true },
        { field: "description", title: "Description", width: 170, filterable: true, hidden: true },
        { field: "status", title: "Status", width: 100, filterable: true },
        { field: "versionDate", title: "VersionDate", width: 170, filterable: true },
        { field: "isActive", title: "isActive", width: 170, filterable: true, hidden: true },
        { field: "assigneeName", title: "AssigneeName", width: 170, filterable: true },
        { field: "tvno", title: "TVNO", width: 170, filterable: true, hidden: true },

        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task Version' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskVersionID#')  title='Delete Task Version'><span class='fa fa-trash'></span></a>"
        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadTaskVersionRecordByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Task/Task/TaskVersionDetail?taskVersionID=' + dataItem.taskVersionID + '';
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    //window.location.href = '/Task/Task/Save?taskID=' + dataItem.taskId + '';
    window.location.href = '/Task/Task/VersionSave?taskVersionID=' + dataItem.taskVersionID;
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