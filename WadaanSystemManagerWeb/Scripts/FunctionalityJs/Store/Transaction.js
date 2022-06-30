

var userId = "";
var username = "";
var roleID = "";
var agentID = "";
var _CustomerList = ": -- All --";

var $grid = "grid-agent";
$(document).ready(function () {

 
//---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    
//---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    $("#Age").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats

    });

    LoadTransactionKendo();
    LoadCustomerList();
    // LoadKendo();
   // LoadAgent();


    function validateTransaction() {

        $('input').removeClass('error');
        var isFalse = false;
        if ($("#AmountPaid").val() == '') {
            $("#AmountPaid").addClass('error'); isFalse = true;
        }  
        if ($("#AmountPaid").val()<=0) {
            $("#AmountPaid").addClass('error'); isFalse = true;
        } 
        return isFalse;
    }
    $('#btnSave').on('click', function (e) {
         
         
        if (!validateTransaction()) {
            $("#TransactionType").val($("#ddlTransactionType option:selected").val());
            $("#CustomerID").val($("#ddlCustomerName option:selected").val());
            $("#frmAddTransaction").ajaxForm();
           

            var options = {
                success: function (response, statusText, jqXHR) {
                    clearform();
                    $('.btn_close').click();
                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('.uploadimage').show();
                    $('#type').val('addTransaction');
                    LoadTransactionKendo();
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddTransaction").ajaxSubmit(options);
            clearform();
        }
        else return false;
    });


});

var loadTransaction = function (d) {

    KendoGrid(JSON.parse(d.Value));
}


var KendoGrid = function (_data) {


    var record = 0;

    var colModel = [
        {
            title: "#", template: "#= ++record #", width: "2%"
        },
      //  { field: "TransactionLog", title: "Transaction Log", template: "<img src='../../Temp/#= TransactionLog #' style='width:50%' />", width: "8%" },
        { field: "transactionID", title: "transactionID", hidden: true }, { field: "customerID", title: "CustomerID", hidden: true }, { field: "aSpaiddate", title: "aSpaiddate", hidden: true },
        { field: "customerName", title: "Name", width: "13%" }, { field: "transactionType", title: "transactionType", hidden: true },
        { field: "transactionTypeName", title: "Transaction", width: "10%" },
        { field: "amountPaid", title: "Amount", width: "15%" },
        { field: "paiddate", title: "Paid Date", width: "10%" },
        { field: "createdDate", title: "CreatedDate", width: "10%" },
        { field: "reason", title: "Reason", width: "50%" },
        
       
        {
            field: "", width: 80,
            title: "Action",
            //template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Sub Agent' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=subAgentID#')  title='Delete Sub Agent'><span class='icofont icofont-ui-delete'></span></a> "
            template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Transaction' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=transactionID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

 

var clearform = function () {
    $('.uploadimage').show();
    $('input[type=text],textarea').val('');
   // $('.reset_btn').trigger('reset');
}
function editDetailFormatter(cellvalue) {

    return "<span onclick=\"KendoGlobalAjax({commandName:'getagentbyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    clearform();

    $('#btn-add-update-Transaction').click();

    console.log(dataItem.transactionType.trim());
    $('#TransactionID').val(dataItem.transactionID.trim());
    $('#TransactionType').val(dataItem.transactionType.trim());
    $('#AmountPaid').val(dataItem.amountPaid);
    $('#Reason').val(dataItem.reason.trim());
    
    var startDate = $.datepicker.formatDate('yy-mm-dd', new Date(dataItem.aSpaiddate)); console.log(startDate);
    
    $('#paiddate').val(startDate);
    
    $('#ddlTransactionType option[value=' + dataItem.transactionType.trim().toUpperCase()+']').prop('selected', true);
    $('#ddlCustomerName option[value=' + dataItem.customerID.trim() + ']').prop('selected', true);

   $('.uploadimage').hide();
    $('#type').val('UpdateTransaction');

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
            KendoGlobalAjax({ commandName: 'deleteTransactionById', values: "{id:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadTransactionKendo();
            }, 100);


            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

function LoadTransactionKendo() {
    KendoGlobalAjax({ commandName: 'listTransaction', values: { UserID: $('#UserID').val() }, CallBack: loadTransaction });
}


$('.reset_btn').click(function () {
    
});
$('.btn_close').click(function () {
    $('#frmAddUpdateAgent').trigger('reset');
 
});
$('#btn-add-update-Transaction').click(function () {
    $('.uploadimage').show();
    $('#type').val('addTransaction');
     
     
    clearform();
    $('#Username').prop('disabled', false);
    $('#Password').prop('disabled', false);
});
  

function LoadCredentialData() {
    KendoGlobalAjax({ commandName: 'checkCredential', values: $('#Username').val(), CallBack: loadCredentialData });
}
 
var loadCredentialData = function (d) {

    if ($('#Aciton').val() == 'Insert') {

        if (JSON.parse(d.Value) != null) {
            if (this.values == JSON.parse(d.Value)["username"]) {
                $('#Username').val('');
                document.getElementById("Username").placeholder = JSON.parse(d.Value)["username"] + " already exists.Try another...";
                $('#Username').css('border-color', 'red');
            } else {
                $('#Username').css('border-color', '#d9d9d9');
            }
        } else {
            $('#Username').css('border-color', '#d9d9d9');
        }
    }
}

 
//------------------CHECK CREDENTIAL END-------------------------------------------------------------

  

var loadCustomer = function (d) {
    _CustomerList += BindCombo(JSON.parse(d.Value), $("#ddlCustomerName"));
}

function LoadCustomerList() {
    KendoGlobalAjax({ commandName: 'listCustomerByStoreAdmin', values: { userId: userId}, CallBack: loadCustomer });
}


