
var userId = "";
var username = "";
var roleID = "";

var $grid = "Accountgrid";
 
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

        { field: "Id", title: "account ID", hidden: true },
        { field: "name", title: "Name", width:170, filterable: true },
        { field: "firstOpeningBalance", title: "First Opening Balance", width: 170, filterable: true },
        { field: "associatedBankAccount", title: "Associated BankAccount", width: 170, filterable: true },
        { field: "associatedVATAccountId", title: "Associated VAT AccountId", width: 170, filterable: true },
        { field: "wellKnownName", title: "Well KnownName", width: 170, filterable: true },
        { field: "displayName", title: "Display Name", width: 170, filterable: true }, 
        {
            field: "", width: 170,
            title: "Action",           
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Account' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=Id#')  title='Delete Account'><span class='icofont icofont-ui-delete'></span></a> <a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a> </span></a>  <a style='cursor:pointer;font-size:20px;' onClick= LoadReceiptByID(this) title='View Account'><span class='ion-ios-list-outline'> " 

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {


    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

   window.location.href = '/Student/Detail?studentID=' + dataItem.studentID + '';

}
 
function LoadReceiptByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
  //  window.location.href = '/Recipt/Index?studentID=' + dataItem.studentID + '';  
    window.location.href = '/Recipt/Index?studentID=' + dataItem.studentID + 'feeMonthly=' + dataItem.feeMonthly + 'studentName=' + dataItem.name + '', '';
}
function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Student/Save?studentID=' + dataItem.studentID + '';

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
            KendoGlobalAjax({ commandName: 'Student_Delete', values: "{StudentID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadCustomerKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

$('#btn-add-update-student').click(function () {
    window.location.href = '/Student/Save', '';
   

});


 