
var userId = "";
var username = "";
var roleID = "";
var status = "Active";
var $grid = "checklist-grid"; 

var full_url = document.URL;           // Get current url
var url_array = full_url.split('=');  //Split 
id = decodeURI(url_array[url_array.length - 1]);//Get ID

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
   
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = decodeURI(url_array[url_array.length - 1]);//Get ID
    $("#TaskName").val(id).attr("selected", "selected");
    LoadChecklistkendo();
});


$('#btn-add-checklist').click(function () {
   
    $('#exampleModal').modal('show');
});

$("#btnClose").click(function () {

    $("#exampleModal").modal('hide');
});



//-----------------------------------  Active Contractor Grid   ---------------------------------------------------------------------------------------

function LoadChecklistkendo() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = decodeURI(url_array[url_array.length - 1]);//Get ID
    
    status = "Active";
    KendoGlobalAjax({ commandName: 'ViewChecklist_Select', values: { status: status, taskname: id }, CallBack: loadContractor });
}

var loadContractor = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [
    

        { field: "checkListID", title: "CheckList ID", hidden: true, width: 200 },

       
        { field: "taskName", title: "Task Name", width: 150, filterable: true },
        { field: "taskStatus", title: "Task Status", width: 150, filterable: true },
        { field: "description", title: "Description", width: 170, filterable: true, },

        { field: "createdDate", title: "CreatedDate", width: 170, filterable: true, hidden: true },
        { field: "createdBy", title: "CreatedBy", width: 170, filterable: true, hidden: true },
        { field: "modifyDate", title: "ModifyDate", width: 170, filterable: true, hidden: true },
        { field: "modifyBy", title: "ModifyBy", width: 170, filterable: true, hidden: true },
        { field: "isActive", title: "IsActive", width: 170, filterable: true, hidden: true },
        {
            field: "", width: 120,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Checklist' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=checkListID#')  title='Delete Checklist'><span class='fa fa-trash'></span></a>"
           // template: "# if (IsUpdatedContractor == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Contractor' <span class='fa fa-edit'></span></a>  # } else if (IsDeleteContractor == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=contractorID#')  title='Delete Contractor'<span class='fa fa-trash'</span></a> #}   #",


        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------




function EditDetail(e) {
   
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    console.log(dataItem.taskName);
    $("#TaskName").val(dataItem.taskName).attr("selected", "selected");
    $("#TaskStatus").val(dataItem.taskStatus).attr("selected", "selected");
    $("#Description").text(dataItem.description);
    $("#CheckListID").val(dataItem.checkListID);
    
    loadModal();
}

function loadModal() {
    $('#exampleModal').modal('show');

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
            KendoGlobalAjax({ commandName: 'CheckList_Delete', values: "{CheckListID:'" + id + "'}", CallBack: '' });  
            setTimeout(function () {

                LoadChecklistkendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}


 
 