


var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    // $("#UserID").val(userId);

    LoadCustomerOrderDetail();

});





function LoadCustomerOrderDetail() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'BatchOrder_DetailsByID', values: "{id:'" + id + "'}", CallBack: loadLoadBatchOrderDetail });
    KendoGlobalAjax({ commandName: 'BatchOrder_DocumentsByID', values: "{id:'" + id + "'}", CallBack: loadLoadBatchOrderDocuments });
    KendoGlobalAjax({ commandName: 'BatchOrderDetail_DetailsByID', values: "{id:'" + id + "'}", CallBack: loadBatchOrderDetailsByID });
 }
var loadLoadBatchOrderDetail = function (d) {

    setTimeout(function () {
       
        $('#CustomerID').val(JSON.parse(d.Value)[0].customerID);
        $('.txt-created-date').text(JSON.parse(d.Value)[0].createdDate);
        $('.txt-subject').text(JSON.parse(d.Value)[0].subject);
        $('.txt-customer').text(JSON.parse(d.Value)[0].customerName);
        $('.txt-order-date').text(JSON.parse(d.Value)[0].orderDate);
        $('.txt-priority').text(JSON.parse(d.Value)[0].priority);
        $('.txt-status').text(JSON.parse(d.Value)[0].status);
        $(".txt-description").append(JSON.parse(d.Value)[0].description);         
        $('#dropdown4').val($.trim(JSON.parse(d.Value)[0].status)).text($.trim(JSON.parse(d.Value)[0].status)).trigger("change");
        if (JSON.parse(d.Value)[0].status == "Dispatched") {
            $("#tbl-items-tbody-record").find("input,button,textarea,select").attr("disabled", "disabled");
            $(".ddlStatus").find("input,button,textarea,select").attr("disabled", "disabled");
        }
        else {
            $("#tbl-items-tbody-record").find("input,button,textarea,select").attr("disabled", false);
            $(".ddlStatus").find("input,button,textarea,select").attr("disabled", false);
           
        }
    }, 50);


}

var loadLoadBatchOrderDocuments = function (d) {
    var fileExtension = "";

    $('.appendAttachment').empty();

    if (JSON.parse(d.Value).length == 0) {

 
    } else {

        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            if (JSON.parse(d.Value)[i].name.split('.')[1] == "docx" || JSON.parse(d.Value)[i].name.split('.')[1] == "doc" || JSON.parse(d.Value)[i].name.split('.')[1] == "docs") {
                fileExtension = "icofont icofont-file-word f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].name.split('.')[1] == "pdf" || JSON.parse(d.Value)[i].name.split('.')[1] == "PDF") {

                fileExtension = "icofont icofont-file-powerpoint f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].name.split('.')[1] == "jpg" || JSON.parse(d.Value)[i].name.split('.')[1] == "JPG" || JSON.parse(d.Value)[i].name.split('.')[1] == "jpeg" || JSON.parse(d.Value)[i].name.split('.')[1] == "JPEG" || JSON.parse(d.Value)[i].name.split('.')[1] == "png" || JSON.parse(d.Value)[i].name.split('.')[1] == "PNG") {
                fileExtension = "ti-gallery f-28 text-muted";
            }
            $('.appendAttachment').append('<li class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["name"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["name"] + '</div><div class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li>')
        }
    }

}

var loadBatchOrderDetailsByID = function (d) {

    $("#tbl-items-tbody-record").html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        var text = '';

        if (JSON.parse(d.Value)[i]["status"] == 'Approved') {

            text = '<label class="label label-success">' + JSON.parse(d.Value)[i]["status"] + '</label>';
        }

        else if (JSON.parse(d.Value)[i]["status"] == 'Pending') {
            text = '<label class="label label-danger">' + JSON.parse(d.Value)[i]["status"] + '</label>';

        } else {
            text = '<label class="label label-warning">' + JSON.parse(d.Value)[i]["status"] + '</label>';
        }

   //    $("#tbl-items-tbody-record").append('<tr>    <td data-id="' + JSON.parse(d.Value)[i]["storeItemID"] + '" data-customerOrderDetailID="' + JSON.parse(d.Value)[i]["customerOrderDetailID"] + '">' + JSON.parse(d.Value)[i]["itemName"] + '</td>  <td>' + JSON.parse(d.Value)[i]["itemUnit"] + '</td><td>' + JSON.parse(d.Value)[i]["quantity"] + '</td> <td>' + text + '</td>  <td>' + JSON.parse(d.Value)[i]["modifyBy"] + '</td>  </tr>');
        $("#tbl-items-tbody-record").append('<tr>    <td data-id="' + JSON.parse(d.Value)[i]["storeItemID"] + '">' + JSON.parse(d.Value)[i]["itemName"] + '</td> <td>  ' + JSON.parse(d.Value)[i]["itemUnit"] + ' </td> <td>' + JSON.parse(d.Value)[i]["customerOrderQty"] + '</td>  <td>' + JSON.parse(d.Value)[i]["quantity"] + '</td>   <td>' + text + '</td> <td>' + JSON.parse(d.Value)[i]["createdBy"] + '</td> </tr>');

    }
}


$('body').on('click', '.childValue', function (e) {
 
    if ($(e.target).is('span')) {
        var value = $(e.target).text();
        $('#dropdown4').val(value).text(value);
        $('.txt-status').text(value);
        KendoGlobalAjax({ commandName: 'BatchOrder_StatusChangedByManufactor', values: { id: id, Status: value, UserID: userId }, CallBack: orderCompletedNotification });
    }
});

var orderCompletedNotification = function (d) {

    Swal.fire({ icon: 'success', title: 'Order dispatched successfully...', showConfirmButton: false, timer: 1500 });
   // KendoGlobalAjax({ commandName: 'BatchOrder_DetailsByID', values: "{id:'" + id + "'}", CallBack: loadLoadBatchOrderDetail });
    location.reload();
    //LoadComments();

}

 
function fnUpdateItem(e) {
   
  
    var storeItemID = $(e).closest('tr').find('td').find('.storeItemID').val();
    var quantity = $(e).closest('tr').find('td').find('.Quantity').val();
    var batchOrderDetailID = $(e).closest('tr').find('td').find('.batchOrderDetailID').val();
    var customerOrderQty = $(e).closest('tr').find('td').find('.customerOrderQty').val();

    if (parseInt(customerOrderQty) > 0) {
        if (parseInt(customerOrderQty) >= parseInt(quantity)) {
            $(e).closest('tr').find('td').find('.customerOrderQty').val(parseInt(customerOrderQty) - parseInt(quantity));
            KendoGlobalAjax({ commandName: 'CustomerOrder_UpdateItemsByManufactor', values: { StoreItemID: storeItemID, UnitPrice: 0, Quantity: quantity, BatchOrderDetailID: batchOrderDetailID, UserID: userId }, CallBack: loadManufactorBatchOrderItemData });
        } else {
            swal.fire({
                title: 'Sorry?',

                text: "Selected quantity must be less then available quantity !",
                icon: 'error',
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
            });
        }
    } else {

        swal.fire({
            title: 'Sorry?',

            text: "Available quantity is must be greater then current quantity !",
            icon: 'error',
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
        });
    }

}
var loadManufactorBatchOrderItemData = function (d) {


    Swal.fire({

        icon: 'success',
        title: 'Record updated successfully...',
        showConfirmButton: false,
        timer: 500
    });
    KendoGlobalAjax({ commandName: 'BatchOrderDetail_DetailsByID', values: { id: id }, CallBack: loadBatchOrderDetailsByID });
    LoadComments();

}
/*
$('#SaveDispatchedOrder').click(function () {

    var isApproved = true;
    var checkTableValue = $('#tbl-items-tbody-record tr').each(function () {
        if ($(this).find('td').length != 0) {
            var $currText = $(this).find('td').eq(3).text();
            if ($currText == "Approved") {
                isApproved = true;
            } else {
                return isApproved = false;
            }
        }

    });
    if (isApproved != true) {
        alert('Updated Qty(s) is still pending');
    } else {
        window.location.href = '/Manufacturing/SaveBatchOrder?customerOrderID' + $('#customerOrderID').val() + 'customerName' + $('.txt-customer').text() + 'CustomerID' + $('#CustomerID').val() + '', '';
    }
});*/