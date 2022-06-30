
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadEmployeeDetails();

});

function LoadEmployeeDetails() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);
    KendoGlobalAjax({ commandName: 'CustomerAgreement_SelectByID', values: "{ReferenceID:'" + id + "'}", CallBack: loadCustomerAgreementDetailsByID });
    KendoGlobalAjax({ commandName: 'Images_SelectImagesByCustomerAgreementID', values: "{ReferenceID:'" + id + "'}", CallBack: loadCustomerAgreementImagesByID });
    

}
var loadCustomerAgreementDetailsByID = function (d) { //value Comes from database and store in d in the foam of JSON, after that we can use this data in js. 

    setTimeout(function () {                           // we can check the values in two methods, 1. Debugger 2. Console.log(text(JSON.parse(d.Value)
        
        $('.startDate').text(JSON.parse(d.Value)[0]["startDate"]);
        $('.txt-name').text(JSON.parse(d.Value)[0]["customerName"]);                    // Showing the data from database
        $('.busesMounthlyAmount').text(JSON.parse(d.Value)[0]["busesMounthlyAmount"]);
        $('.text-remarks').text(JSON.parse(d.Value)[0]["remarks"]);
        if (JSON.parse(d.Value)[0]["profileImage"] !=null)
        $('.employeImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["profileImage"]);
       

    }, 50);
}
var loadCustomerAgreementImagesByID = function (d) {

    setTimeout(function () {
        
     
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
         
            if (JSON.parse(d.Value)[i]["name"] == 'profileImage') {

                $('.customerAgreementImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);

            }
           
        }

  
        //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
        var fileExtension = "";

        $('.loadRefferenceAttahcments').empty();

        if (JSON.parse(d.Value).length == 0) {
            $('.loadRefferenceAttahcments').append('<img class="loadAllEmployeeAttachments"  src="/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png" style=" width:15%;" alt="" />');


        } else {

            for (var i = 0; i < JSON.parse(d.Value).length; i++) {

                if (JSON.parse(d.Value)[i].path.split('.')[1] == "docx" || JSON.parse(d.Value)[i].path.split('.')[1] == "doc" || JSON.parse(d.Value)[i].path.split('.')[1] == "docs") {
                    fileExtension = "icofont icofont-file-word f-28 text-muted";
                } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "pdf" || JSON.parse(d.Value)[i].path.split('.')[1] == "PDF") {

                    fileExtension = "icofont icofont-file-powerpoint f-28 text-muted";
                } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "xls" || JSON.parse(d.Value)[i].path.split('.')[1] == "xlsx") {

                    fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";
                }
                else if (JSON.parse(d.Value)[i].path.split('.')[1] == "jpg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPG" || JSON.parse(d.Value)[i].path.split('.')[1] == "jpeg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPEG" || JSON.parse(d.Value)[i].path.split('.')[1] == "png" || JSON.parse(d.Value)[i].path.split('.')[1] == "PNG") {
                    fileExtension = "ti-gallery f-28 text-muted";
                }
                $('.loadRefferenceAttahcments').append('<li class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["path"] + '</div><div class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li>')
            }
        }
        
    }, 50);
}


 
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