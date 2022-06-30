


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

    KendoGlobalAjax({ commandName: 'CustomerOrder_DetailsByID', values: "{id:'" + id + "'}", CallBack: loadLoadCustomerOrderDetail });
    KendoGlobalAjax({ commandName: 'CustomerOrder_DocumentsByID', values: "{id:'" + id + "'}", CallBack: loadLoadCustomerOrderDocuments });
    KendoGlobalAjax({ commandName: 'CustomerOrderDetail_DetailsByID', values: "{id:'" + id + "'}", CallBack: loadCustomerOrderDetailsByID });
}
var loadLoadCustomerOrderDetail = function (d) {

    setTimeout(function () {

        $('#CustomerID').val(JSON.parse(d.Value)[0].customerID);
        $('.txt-created-date').text(JSON.parse(d.Value)[0].createdDate);
        $('.txt-subject').text(JSON.parse(d.Value)[0].subject);
        $('.txt-customer').text(JSON.parse(d.Value)[0].customerName);
        // $('.txt-description').text(JSON.parse(d.Value)[0].description);
        $('.txt-order-date').text(JSON.parse(d.Value)[0].orderDate);
        $('.txt-priority').text(JSON.parse(d.Value)[0].priority);
        $('.txt-status').text(JSON.parse(d.Value)[0].status);

        $(".txt-description").append(JSON.parse(d.Value)[0].description);


        //  $("#Dateofbirth").kendoDatePicker({ value: JSON.parse(d.Value)[0].dateofbirth, format: "dd/MM/yyyy" });
        //  $("#ExpiryDate").kendoDatePicker({ value: JSON.parse(d.Value)[0].expiryDate, format: "dd/MM/yyyy" });

        $('#dropdown4').val($.trim(JSON.parse(d.Value)[0].status)).text($.trim(JSON.parse(d.Value)[0].status)).trigger("change");

    }, 50);


}

var loadLoadCustomerOrderDocuments = function (d) {
    var fileExtension = "";

    $('.appendAttachment').empty();

    if (JSON.parse(d.Value).length == 0) {

        //    $('.appendAttachment').append('<img class="appendAttachment"  src="~/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png" style=" width:15%;" alt="" />')

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

var loadCustomerOrderDetailsByID = function (d) {


    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        var text = '';

        if (JSON.parse(d.Value)[i]["status"] == 'Approved') {

            text = '<label class="label label-success">' + JSON.parse(d.Value)[i]["status"] + '</label>';
        }

        else if (JSON.parse(d.Value)[i]["status"] == 'Pending') {
            text = '<label class="label label-danger">' + JSON.parse(d.Value)[i]["status"] + '</label>';

        }

        //$("#tbl-items-tbody-record").append('<tr>    <td data-id="' + JSON.parse(d.Value)[i]["storeItemID"] + '" data-customerOrderDetailID="' + JSON.parse(d.Value)[i]["customerOrderDetailID"] + '">' + JSON.parse(d.Value)[i]["itemName"] + '</td> <td> <input readonly type="text" class="form-control pname ItemUnit" name="ItemUnit" value="' + JSON.parse(d.Value)[i]["itemUnit"] + '"></td> <td> <input type="number" readonly min="0" class="form-control pname Quantity" name="Quantity" value="' + JSON.parse(d.Value)[i]["quantity"] + '"></td> <td> <input type="number" readonly min="0" class="form-control pname Price" name="Price" value="' + JSON.parse(d.Value)[i]["unitPrice"] + '"></td> <td> <input type="text" readonly  class="form-control pname " name="Status" value="' + JSON.parse(d.Value)[i]["status"] + '"></td>   </tr>');
        $("#tbl-items-tbody-record").append('<tr>    <td data-id="' + JSON.parse(d.Value)[i]["storeItemID"] + '" data-customerOrderDetailID="' + JSON.parse(d.Value)[i]["customerOrderDetailID"] + '">' + JSON.parse(d.Value)[i]["itemName"] + '</td>  <td>' + JSON.parse(d.Value)[i]["itemUnit"] + '</td><td>' + JSON.parse(d.Value)[i]["quantity"] + '</td> <td>' + text + '</td>  <td>' + JSON.parse(d.Value)[i]["modifyBy"] + '</td>  </tr>');

    }
}


//$('body').on('click', '.childValue', function (e) {

//    if ($(e.target).is('span')) {
//        var value = $(e.target).text();
//        alert(value);
//    }
//}); 

$('body').on('click', '.childValue', function (e) {

    if ($(e.target).is('span')) {
        var value = $(e.target).text();
        $('#dropdown4').val(value).text(value);
        $('.txt-status').text(value);
        KendoGlobalAjax({ commandName: 'CustomerOrder_StatusChangedByCustomer', values: { id: id, Status: value, UserID: userId }, CallBack: orderCompletedNotification });
    }
});


var orderCompletedNotification = function (d) {

    Swal.fire({ icon: 'success', title: 'Customer order updated...', showConfirmButton: false, timer: 1500 });
    LoadComments();

}

