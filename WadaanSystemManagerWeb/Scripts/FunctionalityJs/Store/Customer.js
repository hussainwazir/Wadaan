







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
    KendoGlobalAjax({ commandName: 'WorkShop_Select', values: {}, CallBack: loadCustomer });
}


var loadCustomer = function (d) {
    KendoGrid(JSON.parse(d.Value));

}
var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [

        { field: "customerID", title: "CustomerID", hidden: true },
        {
            field: "", width: "13%" ,
            title: "Action",
            //template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Sub Agent' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=subAgentID#')  title='Delete Sub Agent'><span class='icofont icofont-ui-delete'></span></a> "
            template: "<a    title='View Customer' class='viewbutton' href='/Home/CustomerDashboard?customerID=#=customerID#' >#=fullName#</a>"
        },
        //{ field: "fullName", title: "Full Name", width: 170, filterable: true },
        { field: "contactPersonOne", width: 170, title: "Contact Person 1", filterable: true },
        { field: "personContact1", width: 170, title: "Contact NO", filterable: true },
        //{ field: "contactPersonTwo", width: 170, title: "Contact Person 2", filterable: true },
        //{ field: "personContact2", width: 170, title: "Contact NO", filterable: true },
        //{ field: "contactPersonThree", width: 170, title: "Contact Person 3", filterable: true },
        //{ field: "personContact3", width: 170, title: "Contact NO", fitlerable: true },
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



///////////////////////Old Code

//var userId = "";
//var username = "";
//var roleID = "";
//var agentID = "";
//var _AgentList = ": -- All --";
//var $grid = "grid-agent";
//$(document).ready(function () {

 
////---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
//     userId = window.sessionStorage.getItem("userId");
//     username = window.sessionStorage.getItem('userName');
//     roleID = window.sessionStorage.getItem("RoleId");
    
////---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
//    $("#UserID").val(userId);

//    $("#Age").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats

//    });
//    LoadCustomerKendo();
//   // LoadKendo();
//   // LoadAgent();


//    function validateCustomer() {

//        $('input').removeClass('error');
//        var isFalse = false;
//        if ($("#CustomerName").val() == '') {
//            $("#CustomerName").addClass('error'); isFalse = true;
//        }  
//        return isFalse;
//    }
//    $('#btnSave').on('click', function (e) {
         
         
//        if (!validateCustomer()) {

//            $("#frmAddCustomer").ajaxForm();


//            var options = {
//                success: function (response, statusText, jqXHR) {
//                    clearform();
//                    $('.btn_close').click();
//                    Swal.fire({

//                        icon: 'success',
//                        title: 'Record saved successfully...',
//                        showConfirmButton: false,
//                        timer: 1500
//                    });
//                    $('.uploadimage').show();
//                    $('#type').val('addCustomer');
//                    LoadCustomerKendo();
//                },
//                error: function (xhr, status, error) {
//                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
//                    alert(errmsg);
//                }
//            };
//            $("#frmAddCustomer").ajaxSubmit(options);
//            clearform();
//        }
//        else return false;
//    });


//});

//var loadCustomer = function (d) {

//    KendoGrid(JSON.parse(d.Value));
//}


//var KendoGrid = function (_data) {


//    var record = 0;

//    var colModel = [
//        {
//            title: "#", template: "#= ++record #", width: "2%"
//        },
//      //  { field: "CustomerLog", title: "Customer Log", template: "<img src='../../Temp/#= CustomerLog #' style='width:50%' />", width: "8%" },
//        { field: "customerID", title: "CustomerID", hidden: true },
//        {
//            field: "", width: "13%" ,
//            title: "Action",
//            //template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Sub Agent' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=subAgentID#')  title='Delete Sub Agent'><span class='icofont icofont-ui-delete'></span></a> "
//            template: "<a    title='View Customer' class='viewbutton' href='/Home/CustomerDashboard?customerID=#=customerID#' >#=customerName#</a>"
//        },
//        { field: "customerName", title: "Name",  hidden: true},
//        { field: "customerMobileNo", title: "MobileNo", width: "10%" },
//        { field: "customerEmail", title: "Email", width: "15%" },
//        { field: "createdDate", title: "CreatedDate", width: "10%" },
//       // { field: "amountPaid", title: "Amount Paid", width: "10%" },
        
//        { field: "customerAddress", title: "Address", width: "50%" },
 
       
//        {
//            field: "", width: 80,
//            title: "Action",
//            //template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Sub Agent' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=subAgentID#')  title='Delete Sub Agent'><span class='icofont icofont-ui-delete'></span></a> "
//            template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Customer' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=customerID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
//        }];

//    BindkendoGrid($grid, 50, colModel, _data);
//};

 

//var clearform = function () {
//    $('.uploadimage').show();
//    $('input[type=text],textarea').val('');
//   // $('.reset_btn').trigger('reset');
//}
//function editDetailFormatter(cellvalue) {

//    return "<span onclick=\"KendoGlobalAjax({commandName:'getagentbyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
//}

//function EditDetail(e) {

//    var row = $(e).closest("tr");
//    var grid = $("#" + $grid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    clearform();

//    $('#btn-add-update-Customer').click();

    
//    $('#CustomerID').val(dataItem.customerID.trim());
//    $('#CustomerName').val(dataItem.customerName.trim());
//    $('#CustomerMobileNo').val(dataItem.customerMobileNo.trim());
//    $('#CustomerEmail').val(dataItem.customerEmail.trim());
//    $('#CustomerAddress').val(dataItem.customerAddress.trim());
//    $('.uploadimage').hide();
//    $('#type').val('UpdateCustomer');

//}


//var deleteRecordByID = function (id) {

//    swal.fire({
//        title: 'Are you sure?',
//        //text: "You won't be able to revert this!",
//        text: "You want to delete this!",
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        buttons: {
//            cancel: {
//                text: "Cancel",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "OK",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {

//        if (restult.value) {
//            KendoGlobalAjax({ commandName: 'deleteCustomerById', values: "{id:'" + id + "'}", CallBack: '' });
//            setTimeout(function () {

//                LoadCustomerKendo();
//            }, 100);


//            swal.fire('Deleted', '', 'success');
//        } else {
//            swal.fire("Cancelled", '', "error");

//        }
//    });
//}

//function LoadCustomerKendo() {
//    KendoGlobalAjax({ commandName: 'listCustomer', values: { UserID: $('#UserID').val() }, CallBack: loadCustomer });
//}


//$('.reset_btn').click(function () {
    
//});
//$('.btn_close').click(function () {
//    $('#frmAddUpdateAgent').trigger('reset');
 
//});
//$('#btn-add-update-Customer').click(function () {
//    $('.uploadimage').show();
//    $('#type').val('addCustomer');
     
     
//    clearform();
//    $('#Username').prop('disabled', false);
//    $('#Password').prop('disabled', false);
//});
  

//function LoadCredentialData() {
//    KendoGlobalAjax({ commandName: 'checkCredential', values: $('#Username').val(), CallBack: loadCredentialData });
//}
 
//var loadCredentialData = function (d) {

//    if ($('#Aciton').val() == 'Insert') {

//        if (JSON.parse(d.Value) != null) {
//            if (this.values == JSON.parse(d.Value)["username"]) {
//                $('#Username').val('');
//                document.getElementById("Username").placeholder = JSON.parse(d.Value)["username"] + " already exists.Try another...";
//                $('#Username').css('border-color', 'red');
//            } else {
//                $('#Username').css('border-color', '#d9d9d9');
//            }
//        } else {
//            $('#Username').css('border-color', '#d9d9d9');
//        }
//    }
//}

////-------------------------- CHECK CREDENTIAL END-------------------------------------------------------------
//function getRecordByID(id) {
    
//   // window.location.href = '/Home/AgentDetails?Id=' + id + '';
//    var url= '/Home/AgentDetails?Id=' + id + '';
//  var win =   window.open(url, '_blank');
//    win.focus();
    
//}
////------------------CHECK CREDENTIAL END-------------------------------------------------------------

  

//var loadAgent = function (d) {
//    _AgentList += BindCombo(JSON.parse(d.Value), $("#roleID"));
//}

//function LoadAgent() {
//    KendoGlobalAjax({ commandName: 'listagentbyrole', values: '{}', CallBack: loadAgent });
//}


