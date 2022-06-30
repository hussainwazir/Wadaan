
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadSupplierDetails();

});

function LoadSupplierDetails() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID


    KendoGlobalAjax({ commandName: 'Supplier_SelectDetailByID', values: { SupplierID: id }, CallBack: loadSupplierDetailsByID });



}
var loadSupplierDetailsByID = function (d) {

  
    setTimeout(function () {


        $('.UserName').text(JSON.parse(d.Value)[0]['firstName']);
        $('.firstName').text(JSON.parse(d.Value)[0]["firstName"]);
        $('.lastName').text(JSON.parse(d.Value)[0]["lastName"]);
        $('.telephone').text(JSON.parse(d.Value)[0]["telephone"]);
        $('.mobile').text(JSON.parse(d.Value)[0]["mobileNo"]);
        $('.fax').text(JSON.parse(d.Value)[0]["fax"]);
        $('.emailAddress').text(JSON.parse(d.Value)[0]["email"]);
        $('.supplierType').text(JSON.parse(d.Value)[0]["supplierType"]);
        $('.bankAccountNumber').text(JSON.parse(d.Value)[0]["bankAccountNo"]);
        $('.paymentTerm').text(JSON.parse(d.Value)[0]["paymentTerm"]);

        $('.contactPersonName').text(JSON.parse(d.Value)[0]["contactPersonName"]);
        $('.contactPersonMobileNumber').text(JSON.parse(d.Value)[0]["contactPersonMobileNumber"]);

        if (JSON.parse(d.Value)[0]["imgPath"] != null) {
            $('.SupplierImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
        }

    }, 50);

}


//--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------


function fnLoadImage(e) {

    window.location.href = "/'" + e.src + "'", '_blank';
}

function fnLoadImageByID(e) {

    //  $('#modal-open-project-for-floor-plan-image').addClass('md-show');
    var full_url = e.src;
    var url_array = full_url.split('Temp/'); //Split 
    var imagePath = url_array[url_array.length - 1];

    $('.load-image-by-click').attr('src', '../../Temp/' + imagePath);

}

function fnloadRefferenceAttahcmentsImageInModal(e) {

    $('#modal-open-employee-attachment-images').addClass('md-show');
    var full_url = e.src;
    var url_array = full_url.split('Temp/'); //Split 
    var imagePath = url_array[url_array.length - 1];

    $('.load-image-by-click').attr('src', '../../Temp/' + imagePath);

}
