
var userId = "";
var dueAmountFromAjax = 0;
var username = "";
var roleID = "";
var id = "";
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

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    var url_arrayForDetail = full_url.split('??');  //Split 
    id = url_array[1].split('feeMonthly')[0];// url_array[1].split('??')[0];
 
    $("#students").val(url_array[3].split('studentName')[0].replace(/%20/g, ' '));


    $('#StudentID').val(id);
    $("#feeMonthly").val(url_array[2].split('studentName')[0]);
    KendoGlobalAjax({ commandName: 'Recipt_SelectByStudentID', values: { StudentID: id }, CallBack: loadRecipt });
    LoadDueAmountByID();
    //  KendoGlobalAjax({ commandName: 'Recipt_DueAmount', values: { StudentID: id }, CallBack: loadRecipt }); // For DueAmount
    //KendoGlobalAjax({ commandName: 'Recipt_Select', values: {}, CallBack: loadRecipt });
}

var loadRecipt = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    // console.log(_data);
    var record = 0;
    var colModel = [

        { field: "reciptID", title: "Recipt ID", hidden: true },
        { field: "year", title: "Year", width: 170, filterable: true },
        { field: "month", width: 170, title: "Month", filterable: true },
        { field: "feeMonthlyDefault", width: 170, title: "Monthly Fee", filterable: true },
        { field: "paid", width: 170, title: "Paid Amount", filterable: true },
        { field: "dueAmount", title: "Due Amount", width: 170, filterable: true },
        { field: "paymentStatus", title: "Payment Status", width: 170, filterable: true },
        { field: "person", title: "Payer Name", width: 170, filterable: true },
        { field: "paymentMode", title: "Payment Mode", width: 170, filterable: true },

        {
            field: "attachedFile", width: 200,
            title: "Action",

            template: "  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=reciptID#')  title='Delete Receipt'><span class='icofont icofont-ui-delete'> </i ></a>  <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenReciptRecordPrint('#=reciptID#')  title='Print Receipt' ><span class='fa fa-print'></span></a> #  if (attachedFile ==null ) { # <label class='pcoded-badge label label-danger'>No File Attached</label># } else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= attachedFile #' class='viewbutton'>Download</a>#} # "
            //template: " <a style='font-size:20px;cursor: pointer;' target='_blank' href='/Home/MemberPrintSlip?#=donationID#' title='Print Slip' ><span class='fa fa-print'></span></a>  #  if (attachedFile == '' ) { # <label class='pcoded-badge label label-danger'>No File Attached</label># }else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= attachedFile #' class='viewbutton'>Download</a>#} #"

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Recipt/Detail?ReciptID=' + dataItem.reciptID + '';
}
function OpenReciptRecordPrint(e) {
    window.open('/Recipt/PrintReceipt?ReciptID=' + e + '', '_blank');

}

function OpenPrintFN(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid"); //Just For Demo
    var dataItem = grid.dataItem(row);

    window.open('/Recipt/PrintReceipt?ReciptID=' + e + '', '_blank');

}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#reciptid').val(dataItem.reciptid);
    $('#dueAmount').val(dataItem.dueAmount);
    $('#paid').val(dataItem.paid);
    $('#month').val(dataItem.month);
    $('#year').val(dataItem.year);
    $('#reciptDate').val(dataItem.reciptDate);
    //$('#cash').val(dataItem.cash);
    //$('#cheque').val(dataItem.cheque);
    $('#bankName').val(dataItem.bankName);
    $('#chequeDate').val(dataItem.chequeDate);
    $('#chequeNo').val(dataItem.chequeNo)
    $('#person').val(dataItem.person);
    $('#chequeOwner').val(dataItem.chequeowner);
    //$('#paymentMade').val(dataItem.paymentMade);
    $('#paymentMade').val(dataItem.paymentMade).trigger('change');
    $('#PaymentStatus').val(dataItem.PaymentStatus).trigger('change');

    // window.location.href = '/Recipt/Save?ReciptID=' + dataItem.reciptID + '';
}

//===============AjaxCall for DueAmount=================

function LoadDueAmountByID() {


    KendoGlobalAjax({ commandName: 'Recipt_DueAmount', values: { StudentID: id, Month: $('#month :selected').val(), year: $('#year :selected').val() }, CallBack: LoadDueAmount });

}


var LoadDueAmount = function (d) {
    
    setTimeout(function () {

        $('input,select,textarea').removeClass('error');
        if (JSON.parse(d.Value)[0].dueAmount > 0)
            $('#dueAmount').val("0");
        else
            $('#dueAmount').val("1");

        $('#dueAmount').val(JSON.parse(d.Value)[0].dueAmount);
        $("#students").val(JSON.parse(d.Value)[0].studentName);
        dueAmountFromAjax = JSON.parse(d.Value)[0].dueAmount;

    }, 50);
}

$('#paid').focusout(function () {

    var totalDueAmount = 0;
    var totalPaidDueAmount = 0;
    var totalCalculatedDueAmount = 0;
    var total = 0;
    var feeMonthly = parseInt($('#feeMonthly').val());
    var paid = parseInt($('#paid').val());
    var dueAmount = parseInt($('#dueAmount').val());
    total = paid - feeMonthly;// * (-1) ;
  

    if (dueAmount > 0) {
        totalPaidDueAmount = paid - dueAmount;
        $('#dueAmount').val(totalPaidDueAmount * (-1));
    }

    if (paid < feeMonthly && dueAmount <= 0) {

        if (total < 0 == true) {
            $('#dueAmount').val(total * (-1));
        }
    }

    if (paid == feeMonthly && dueAmount == 0) {
        $('#paymentStatus')[0].selectedIndex = 2
        $('#paymentStatus :selected').val('Complete');
    }
    else if (paid > feeMonthly && paid > dueAmount) {
        var totalMonthlyAndDueAmountForSWAL = parseInt(feeMonthly) + parseInt(dueAmount);
        Swal.fire({
            icon: 'error',
            text: 'Paid amount Rs:' + paid + ' must be less than Monthly Fee and Due Amount Rs:' + totalMonthlyAndDueAmountForSWAL,
            showConfirmButton: true

        });
        $('#paid').val('');
        $('#paid').focusout();
    }

    else {
        $('#paymentStatus')[0].selectedIndex = 1
        $('#paymentStatus :selected').val('Partial');
    }


    //if (paid < feeMonthly) {

    //    if (total < 0 == true) {
    //        $('#dueAmount').val(total * (-1));
    //    }
    //}
    //if (dueAmount > 0) {
    //    totalDueAmount = total - dueAmount
    //    if (totalDueAmount < 0 == true) { totalCalculatedDueAmount = totalDueAmount * (-1); } else { totalCalculatedDueAmount = 0; }
    //}

    //if (paid > feeMonthly + dueAmount) {
    //    dueAmount = dueAmountFromAjax;
    //    var totalMonthlyAndDueAmountForSWAL = parseInt(feeMonthly) + parseInt(dueAmount);
    //    Swal.fire({
    //        icon: 'error',

    //        text: 'Paid amount Rs:' + paid + ' must be less than Monthly Fee and Due Amount Rs:' + totalMonthlyAndDueAmountForSWAL,
    //        showConfirmButton: true

    //    });
    //    $('#dueAmount').val(totalMonthlyAndDueAmountForSWAL); 
    //    return false; 
    //} else if(totalCalculatedDueAmount > 0)
    //{

    //    $('#dueAmount').val(totalCalculatedDueAmount);
    //}

});


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
            KendoGlobalAjax({ commandName: 'Recipt_Delete', values: "{ReciptID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadCustomerKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

$('#btn-add-update-recipt').click(function () {
    window.location.href = '/Recipt/Save', '';


});

$('#PrintDiv').hide();

function fnLoadDueAmount() {

    LoadDueAmountByID();
}

