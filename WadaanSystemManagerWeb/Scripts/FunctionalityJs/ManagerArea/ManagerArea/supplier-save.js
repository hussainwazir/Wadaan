
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    $('#div-checkno').hide();
    $('#div-payment-type-card').hide();
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    // $("#UserID").val('7289F780-B63E-4BD7-84A9-86B9DB4AEDAA');

    LoadSupplierDetailByID();

     


});
$('#btnSave').on('click', function (e) {

    //Button Loader
    if (customvalidateForm('frmAddUpdateSupplier')) {

        $("#frmAddUpdateSupplier").ajaxForm();

        var btn = document.getElementById("btnSave");
        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

        var options = {
            success: function (response, statusText, jqXHR) {

                Swal.fire({
                    icon: 'success',
                    title: 'Record saved successfully...',
                    showConfirmButton: false,
                    timer: 1500
                });

                // LoadSupplierDetailByID();
                window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MSupplierList';
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateSupplier").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save '

    }

});
function LoadKendoDates() {
    //$("#passportExpiryDate").kendoDatePicker({     
    //    value: new Date(),
    //    format: "dd/MM/yyyy",
    //    parseFormats: ["MMMM yyyy"]
    //});

}

$('.reset_btn').click(function () {
    $('#frmAddUpdateSupplier').trigger('reset');
});

$('.btn_close').click(function () {
    $('#frmAddUpdateSupplier').trigger('reset');

});


function ShowHideControls() {

    var PaymentType = $('#PaymentMethod').val();
    if (PaymentType == '2') {
        $('#div-checkno').show();
        $('#div-payment-type-card').hide();
    }
    else if (PaymentType == '3') {
        $('#div-payment-type-card').show();
        $('#div-checkno').hide();
    } else {
        $('#div-payment-type-card').hide();
        $('#div-checkno').hide();
    }

}

//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadSupplierDetailByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID

    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Supplier_SelectByID', values: { SupplierID: id }, CallBack: loadSupplierDataByID });
    }

}


var loadSupplierDataByID = function (d) {

    setTimeout(function () {
        $('input,select,textarea').removeClass('error');


        $('#SupplierID').val(JSON.parse(d.Value)[0].supplierID);
        $('#FirstName').val(JSON.parse(d.Value)[0].firstName);
        $('#LastName').val(JSON.parse(d.Value)[0].lastName);
        $('#HomeAddress').val(JSON.parse(d.Value)[0].homeAddress);
        $('#MobileNo').val(JSON.parse(d.Value)[0].mobileNo);
        $('#Telephone').val(JSON.parse(d.Value)[0].telephone);
        $('#Email').val(JSON.parse(d.Value)[0].email);
        $('#SupplierAttachment').val(JSON.parse(d.Value)[0].supplierAttachment);
        $('#ContactPersonName').val(JSON.parse(d.Value)[0].contactPersonName);
        $('#ContactPersonMobileNumber').val(JSON.parse(d.Value)[0].contactPersonMobileNumber);
        $('#PaymentMethod').val(JSON.parse(d.Value)[0].paymentMethod).trigger('change');
        $('#SupplierType').val(JSON.parse(d.Value)[0].supplierType).trigger('change');
        $('#Fax').val(JSON.parse(d.Value)[0].fax);
        $('#PaymentTerm').val(JSON.parse(d.Value)[0].paymentTerm);/*.trigger('change');*/
        $('#BankAccountNo').val(JSON.parse(d.Value)[0].bankAccountNo);



        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);


}


