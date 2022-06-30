
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {
    
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadMeetingDetails();

});

function LoadMeetingDetails() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);
 
    KendoGlobalAjax({ commandName: 'Meeting_SelectDetailByID', values: { MeetingID: id }, CallBack: loadMeetingDetailsByID });
    KendoGlobalAjax({ commandName: 'Images_SelectImagesByTaskID', values: { Id: id }, CallBack: loadMeetingAttachementByMeetingID });


}


var loadMeetingDetailsByID = function (d) {
   
    setTimeout(function () {
        $('.UserName').text(JSON.parse(d.Value)[0]["meetingName"]);
        $('.meetingName').text(JSON.parse(d.Value)[0]["meetingName"]);
        $('.meetingDate').text(JSON.parse(d.Value)[0]["meetingDate"]);
        $('.meetingdiscussion').text(JSON.parse(d.Value)[0]["meetingDiscussion"]);
        $('.tabmeetingName').text(JSON.parse(d.Value)[0]["meetingName"]);
        $('.tabmeetingDate').text(JSON.parse(d.Value)[0]["meetingDate"]);
        $('.tabClientName').text(JSON.parse(d.Value)[0]["clientName"]);
        $('.tabEmployee').text(JSON.parse(d.Value)[0]["employeeName"]);
        $('.tabmeetingarrange').text(JSON.parse(d.Value)[0]["createdDate"]);
        $('.employeeImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["employeeImage"]);
        $('.clientImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["clientImage"]);
    }, 50);
}

var loadMeetingAttachementByMeetingID = function (d) {
 
    var fileExtension = "";

    $('.appendAttachment').empty();

    if (JSON.parse(d.Value).length == 0) {

        //    $('.appendAttachment').append('<img class="appendAttachment"  src="~/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png" style=" width:15%;" alt="" />')

    } else {
     
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            if (JSON.parse(d.Value)[i].path.split('.')[1] == "docx" || JSON.parse(d.Value)[i].path.split('.')[1] == "doc" || JSON.parse(d.Value)[i].path.split('.')[1] == "docs") {
                fileExtension = " icofont icofont-file-word f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "pdf" || JSON.parse(d.Value)[i].path.split('.')[1] == "PDF") {

                fileExtension = "icofont icofont-file-powerpoint f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "jpg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPG" || JSON.parse(d.Value)[i].path.split('.')[1] == "jpeg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPEG" || JSON.parse(d.Value)[i].path.split('.')[1] == "png" || JSON.parse(d.Value)[i].path.split('.')[1] == "PNG") {
                fileExtension = "ti-gallery f-28 text-muted";
            }
            $('.appendAttachment').append('<li  style="font-size:larger;" class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["name"] + '</div><div  style="margin-left: auto;" class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li><hr/>')
        }
    }

}

 