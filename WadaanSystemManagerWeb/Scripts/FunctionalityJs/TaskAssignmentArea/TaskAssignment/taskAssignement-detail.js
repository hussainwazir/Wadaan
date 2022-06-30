
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
   
    LoadTaskAssignmentDetails();

});

//$('body').on('select2','.taskStatus', function () {
//   
//    alert('');
//});
function fnChangeStatusOfTask(name) {
 

    var TaskStatus = $('#TaskStatus :selected').val();
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    KendoGlobalAjax({ commandName: 'TaskAssignment_StatusChanged', values: { TaskAssignID: id, NewStatus: TaskStatus }, CallBack: '' });

    setTimeout(function () { KendoGlobalAjax({ commandName: 'TaskAssignment_SelectCurrentStatus', values: { TaskAssignID: id }, CallBack: fnGetTaskAssignmentStatus }); }, 1000);


   
}

var fnGetTaskAssignmentStatus = function (d) {
    
    $('.taskstatus').text(JSON.parse(d.Value)[0]["taskStatus"])
}

 

 

function LoadTaskAssignmentDetails() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);

    KendoGlobalAjax({ commandName: 'TaskAssignment_SelectDetailByID', values: { TaskAssignmentID: id }, CallBack: loadTaskAssignmentDetailByID });
    KendoGlobalAjax({ commandName: 'Images_SelectImagesByTaskID', values: { Id: id }, CallBack: loadTaskAssignmentAttachementByTaskID });


}

var loadTaskAssignmentDetailByID = function (d) {
     
    setTimeout(function () {
        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        $('.taskName').text(JSON.parse(d.Value)[0]["taskName"]);
        $('.project').text(JSON.parse(d.Value)[0]["projectName"]);
        $('.assign').text(JSON.parse(d.Value)[0]["employeeName"]);
        $('#task-description').append(JSON.parse(d.Value)[0]["description"]);
        $('.taskstatus').text(JSON.parse(d.Value)[0]["status"]);
        $('#TaskStatus').val(JSON.parse(d.Value)[0].status);

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
var loadTaskAssignmentAttachementByTaskID = function (d) {
    var fileExtension = "",fileName="";

    $('.appendAttachment').empty();

    if (JSON.parse(d.Value).length == 0) {

        //    $('.appendAttachment').append('<img class="appendAttachment"  src="~/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png" style=" width:15%;" alt="" />')

    } else {
      
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            
            if (JSON.parse(d.Value)[i].path.split('.')[1] == "xls" || JSON.parse(d.Value)[i].path.split('.')[1] == "xlsx" ) {
                fileExtension = "  icofont icofont-file-excel f-28 text-muted";
                fileName = "Excel File Attachment";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "docx" || JSON.parse(d.Value)[i].path.split('.')[1] == "doc" || JSON.parse(d.Value)[i].path.split('.')[1] == "docs") {
                fileExtension = " icofont icofont-file-word f-28 text-muted";
                fileName = "Word File Attachment";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "pdf" || JSON.parse(d.Value)[i].path.split('.')[1] == "PDF") {
                fileName = "PDF File Attachment"
                fileExtension = "icofont icofont-file-powerpoint f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "jpg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPG" || JSON.parse(d.Value)[i].path.split('.')[1] == "jpeg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPEG" || JSON.parse(d.Value)[i].path.split('.')[1] == "png" || JSON.parse(d.Value)[i].path.split('.')[1] == "PNG") {
                fileName = "Image File Attachment"
                fileExtension = "ti-gallery f-28 text-muted";
            }
            $('.appendAttachment').append('<li  style="font-size:larger;" class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + fileName + '</div><div  style="margin-left: auto;" class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li><hr/>')
        }
    }

}
//var loadTaskAttachementByTaskID = function (d) {

//    setTimeout(function () {
//        console.log(d)

//        //    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

//        //        if (JSON.parse(d.Value)[i]["name"] == 'ProfileImage') {

//        //            $('.customerAgreementImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);

//        //        }
//        //        else {

//        //            $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');


//        //        }
//        //    }

//        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

//            if (JSON.parse(d.Value)[i]["name"] == 'ProfileImage') {

//                $('.employeImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);

//            }
//            else if (JSON.parse(d.Value)[i]["name"] == 'Passport') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            } else if (JSON.parse(d.Value)[i]["name"] == 'visaCertificate') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            }
//            else if (JSON.parse(d.Value)[i]["name"] == 'EmirateID') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            } else if (JSON.parse(d.Value)[i]["name"] == 'DrivingLicense') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            }
//            else if (JSON.parse(d.Value)[i]["name"] == 'SchoolPermit') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            } else if (JSON.parse(d.Value)[i]["name"] == 'EDCCertificate') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            }
//            else if (JSON.parse(d.Value)[i]["name"] == 'QCCCertificate') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            } else if (JSON.parse(d.Value)[i]["name"] == 'PermitMedical') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            }
//            else if (JSON.parse(d.Value)[i]["name"] == 'QCCCertificate') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            } else if (JSON.parse(d.Value)[i]["name"] == 'PermitMedical') {

//                $('.agreemnetCopy').append('<img class="img-fluid img-thumbnail   img-100 agreementCopies" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');

//            }

//            else {
//                $('.employeImage').attr('src', '/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png');

//            }


//        }
//    }, 50);

//}