
var userId = "";
var username = "";
var roleID = "";

var $grid = "grid-Customer";
 
$(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
     
    LoadCustomerKendo();
   
});


function LoadCustomerKendo() {
    KendoGlobalAjax({ commandName: 'Customer_Select', values: {}, CallBack: loadCustomer });
}


var loadCustomer = function (d) {
    KendoGrid(JSON.parse(d.Value));

}
var KendoGrid = function (_data) {

    var record = 0;
    
    var colModel = [

        { field: "customerID", title: "CustomerID", hidden: true },
        { field: "fullName", title: "Full Name", width: 170, filterable: true },
        { field: "contactPersonOne", width: 170, title: "Contact Person 1", filterable: true },
        { field: "personContact1", width: 170, title: "Contact NO", filterable: true },
        { field: "contactPersonTwo", width: 170, title: "Contact Person 2", filterable: true },
        { field: "personContact2", width: 170, title: "Contact NO", filterable: true },
        { field: "contactPersonThree", width: 170, title: "Contact Person 3", filterable: true },
        { field: "personContact3", width: 170, title: "Contact NO", fitlerable: true},
        //{ field: "phone", title: "Phone", width: 170, filterable: true },
            //{ field: "mobileNo", title: "Mobile No", width: 170, filterable: true },
            //{ field: "trnNo", title: "TRN No", width: 170, filterable: true },
        { field: "email", title: "Email", width: 170, filterable: true },
        //{ field: "address", title: "Address", width: 170, filterable: true },
        //{ field: "poBox", title: "P.O.Box ", width: 170, filterable: true },
        { field: "type", title: "Type", width: 170, filterable: true },
        {
            field: "", width: 170,
            title: "Action",
            
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Customer' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=customerID#')  title='Delete Customer'><span class='icofont icofont-ui-delete'></span></a> <a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a> "

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
    
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Customer/Details?CustomerID=' + dataItem.customerID + '';
}
 
function EditDetail(e) {
     
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Customer/Save?CustomerID=' + dataItem.customerID + '';
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
            KendoGlobalAjax({ commandName: 'Customer_Delete', values: "{CustomerID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadCustomerKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}


$('#btn-add-update-customer').click(function () {
    window.location.href = '/Customer/Save', '';
 
});

 