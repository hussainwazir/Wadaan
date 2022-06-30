
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadStudentDetails();

});

//#Load Data through URL From the Database#
function LoadStudentDetails() {
   
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
 
    KendoGlobalAjax({ commandName: 'Student_SelectByID', values: "{StudentID:'" + id + "'}", CallBack: loadStudentDetailsByID });
    KendoGlobalAjax({ commandName: 'Images_SelectImagesByStudentID', values: "{StudentID:'" + id + "'}", CallBack: loadStudentImagesByID });

    //-------------------#Images_SelectImagesByStudentID in CompanyCommand Line Number 381 to 406 #--------------------
                    
}
//#Load Vehicle Details by ID From the Database#
var loadStudentDetailsByID = function (d) {
    
    setTimeout(function () {
 
        //$('.studentID').text(JSON.parse(d.Value)[0]["studentID"]);
        $('.name').text(JSON.parse(d.Value)[0]["name"]);
        $('.fName').text(JSON.parse(d.Value)[0]["fName"]);
        $('.fContactNo').text(JSON.parse(d.Value)[0]["fContactNo"]);
        $('.mName').text(JSON.parse(d.Value)[0]["mName"]);
        $('.mContactNo').text(JSON.parse(d.Value)[0]["mContactNo"]);
        $('.grade').text(JSON.parse(d.Value)[0]["grade"]);
        $('.section').text(JSON.parse(d.Value)[0]["section"]);
        $('.sGroup').text(JSON.parse(d.Value)[0]["sGroup"]);
    }, 50);
}

//#Load Employee Image by ID from the Database#
var loadStudentImagesByID = function (d) {

    //setTimeout(function () {


    //    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
    //        console.log(JSON.parse(d.Value));
    //        if (JSON.parse(d.Value)[i]["name"] == 'profileImage') {

    //            $('.studentImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);

    //        }
                       
    //    }
 
    setTimeout(function () {

        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            if (JSON.parse(d.Value)[i]["name"] == 'ProfileImage') {

                $('.employeImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);

            }
            else if (JSON.parse(d.Value)[i]["name"] == 'RegistrationForm') {

                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

            } 
            else {
                $('.employeImage').attr('src', '/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png');

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