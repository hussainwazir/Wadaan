
var userId = "";
var username = "";
var roleID = "";

var $grid = "account-grid";

$(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadAccountKendo();

});
 function LoadAccountKendo() {
    KendoGlobalAjax({ commandName: 'Account_Select', values: {}, CallBack: loadAccount });
}

var loadAccount = function (d) {

    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;

    var colModel = [

        { field: "id", title: "account ID", hidden: true },
        { field: "code", title: "Code", width: 40, filterable: true },
        { field: "name", title: "Name", width: 100, filterable: true },
        { field: "accountCategoryTypeTitle", title: "Type", width: 100, filterable: true },
        { field: "taxRatetitle", title: "Tax Rate", width: 100, filterable: true },
        { field: "taxRate", title: "YTD", width: 50, filterable: true },
       
        {
            field: "", width: 50,
            title: "Action",
         //   template: " <a style='font-size:20px;cursor:pointer;' onClick= fnAddChildAccount(this)  title='Add Child Account'><span class='fa fa-plus'></span></a>   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Account' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=id#')  title='Delete Account'><span class='fa fa-trash'></span></a>"
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Account' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=id#')  title='Delete Account'><span class='fa fa-trash'></span></a>"
            //fa fa-eye
        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {


    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Account/Account/AccountDetail?Id=' + dataItem.id + '';

}
 
function fnAddChildAccount(e) {


    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Account/Account/AccountDetail?Id=' + dataItem.id + '';

}
 
function EditDetail(e) {
     
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Account/Account/AccountSave?Id=' + dataItem.id + '';

}


var deleteRecordByID = function (id) {

    swal.fire({
        title: 'Are you sure?',
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
            KendoGlobalAjax({ commandName: 'Account_Delete', values: {ID: id}, CallBack: '' });
            setTimeout(function () {

                LoadAccountKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

$('#btn-add-update-student').click(function () {
    window.location.href = '/Account/Account/AccountSave', '';


});


