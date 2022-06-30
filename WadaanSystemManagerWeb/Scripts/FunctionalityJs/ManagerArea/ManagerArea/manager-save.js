
var userId = "";
var username = "";
var roleID = "";

var $grid = "assign-employee-to-manager";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
 
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    //LoadEmployeDDL();
   
    loadManagerDDL();
    LoadManagerKendo();
    //LoadAssignedEmployeeKendo();
    

});






$('.reset_btn').click(function () {
    $('#frmAddUpdateContractor').trigger('reset'); 
});
$('.btn_close').click(function () {
    $('#frmAddUpdateContractor').trigger('reset');

});

function loadtesting(e) {
    var selectedManagerID = $('#ManagerID').val();
    LoadEmployeDDL(selectedManagerID);
   
}

 


//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------
 
function loadManagerDDL() {
    KendoGlobalAjax({ commandName: 'Roles_SelectManagerDDL', values: '{}', CallBack: fnLoadManagerDDL });
}
var fnLoadManagerDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ManagerID"), "Select Manager");
}
 
function LoadEmployeDDL(selectedManagerID) {
    KendoGlobalAjax({ commandName: 'Employee_SelectWithOutManager', values: { ManagerID: selectedManagerID }, CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
    
    BindkendoMultiSelect(JSON.parse(d.Value), $("#AssignEmployeeToManagerddl"), "");
    var optional = $("#AssignEmployeeToManagerddl").kendoMultiSelect({ autoClose: false }).data("kendoMultiSelect");


}
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------

function EmployeeListInsertion() {
    var myarrayy = [];

    $("#AssignEmployeeToManagerddl :selected").map(function (i, el) {

        var saveData = {
            EmployeeID: $(el).val(),
            UserID: userId,
            ManagerID: $('#ManagerID :selected').val()
        }
        myarrayy.push(saveData);
       
    });
    KendoGlobalAjax({
        commandName: 'AssignedEmployeeToManager_EmployeeMultipleID_Save', values: { AssignedEmployeeToManager_EmployeeMultipleIDs: myarrayy }, CallBack: showSuccessMessage
    });

}
var showSuccessMessage = function (d) {

    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
 

}


$('#btnSave').on('click', function (e) {
   
    if ($('#ManagerID').val() == '00000000-0000-0000-0000-000000000000') {
        Swal.fire({
            icon: 'info',
            title: 'Please select manager first...',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }
    if ($('#AssignEmployeeToManagerddl').val().length == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Please select employees...',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    EmployeeListInsertion();
    setTimeout(function () { location.reload();}, 1000);
   
});


function LoadManagerKendo() {
    KendoGlobalAjax({ commandName: 'AssignedEmployeeToManager_SelectManager', values: {}, CallBack: fnloadManager });
}


var fnloadManager = function (d) { KendoGrid(JSON.parse(d.Value)); }



var KendoGrid = function (_data) {
    
    
    var record = 0;
    var customerColModel = [
        { field: "assignedEmpToManagerID", title: "AssignedEmpToManager", hidden: true },
        { field: "managerID", title: "ManagerID", hidden: true },
        { field: "managerName", width: 250, title: "Manager Name", },
        {
            field: "status", title: "Status", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "#    if (status == true ) { #  <label class='label label-success'> Active</label>  #} else   { #  <label class='label label-warning'>InActive</label>  #}  # "
        },
        { field: "createdDate", title: "Created Date", width: 150 },
    ];
    BindHeiraricalkendoGrid("assign-employee-to-manager", 50, customerColModel, _data);
};
var globalNestedGridE = '';
function loadChildGridData(e) {
    
    globalNestedGridE = e;
    KendoGlobalAjax({ commandName: 'AssignedEmpToManager_SelectEmployeeByManagerID', values: { ManagerID: e.data.managerID }, CallBack: loadChilddata });
}


var loadChilddata = function (d) {

   
    detailInitt(JSON.parse(d.Value));
}
function detailInitt(response) {
 
      
    var responNew = [];
    for (var i = 0; i < response.length; i++) {
        responNew.push(
            {
                "employeeID": response[i].employeeID,
                "managerID": response[i].managerID,
                "employeeName": response[i].employeeName,
                "createdDate": response[i].createdDate,
            });
    }
    

    $("<div id='Nextedgrid'/>").appendTo(globalNestedGridE.detailCell).kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Export To Exceel.xlsx"
        },
        dataSource: {
            data: responNew,

        },


        sortable: true,
       // detailInit: detailInitGrandChild,
        filterable: { mode: "row" },
        scrollable: false,
        selectable: true,

        columns: [
            { field: "employeeID", title: "Employee ID", width: "5%", filterable: false, hidden: true },
            { field: "managerID", title: "Manager ID", width: "5%", filterable: false, hidden: true },

            { field: "employeeName", title: "Employee Name", width: "5%", filterable: false },
            { field: "createdDate", title: "Created date", width: "10%", filterable: false },
            {
                field: "", width: '5%',
                title: "Action",
                template: " <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID(this) class='fa fa-trash'  title='Delete Employee'></span></a>"
            }

        ]
    });
    //globalNestedGridE.detailCell.css('background', 'lightcoral');

}


var deleteRecordByID = function (e) {



    var row = $(e).closest("tr");
    var grid = $("#" + 'Nextedgrid').data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var EmployeeID = dataItem.employeeID;
    var ManagerID = dataItem.managerID;

     
    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
        text: "You want to delete this employee!",
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
            KendoGlobalAjax({ commandName: 'AssignedEmployeeToManager_DeleteByEmployeeID', values: "{EmployeeID:'" + EmployeeID + "',ManagerID: '" + ManagerID + "'}", CallBack: '' });
            setTimeout(function () {

                LoadManagerKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
            setTimeout(function () { location.reload(); }, 1000);
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}



$('#collapse').click(function (e) {
    var grid = $("#assign-employee-to-manager").data("kendoGrid");
    $(".k-master-row").each(function (index) {
        grid.collapseRow(this);
    });
});