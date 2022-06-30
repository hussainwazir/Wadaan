
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
   
    LoadTaskDetails();
    LoadEmployeesDDL();

});

function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
   
    BindComboForDefault(JSON.parse(d.Value), $("#AssignTo"), "Select Employee");
}
$('#btn-create-version').click(function () {

    window.location.href = '/Task/Task/VersionSave?taskID=' + id;
   
});
 

function calculateRemmTime(dueDate) {

    // Set the date we're counting down to
    var countDownDate = new Date(dueDate).getTime();
    //var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("remmTime").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("remmTime").innerHTML = "EXPIRED";
        }
    }, 1000);
}


function ChangeStatusOfTask() {
    debugger;
    var TaskStatus = $('#TaskStatus').val();
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Task_StatusChanaged', values: { TaskID: id, NewStatus: TaskStatus }, CallBack: fnInCompleteStatusExists });
   // Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectCurrentStatus', values: { TaskID: id }, CallBack: fnGetTaskStatus }); }, 100);

    if (TaskStatus == 'Rejected') {
        window.location.href = "/Task/Task/VersionSave?taskID=" + id , '';
    }
}


var fnInCompleteStatusExists = function (d) {
 
    if (JSON.parse(d.Value)[0]["exist"] == 'TaskVersionExistsWithIncompleteStatus') {
        Swal.fire({ icon: 'error', text: 'Tasks version exists in pending status', showConfirmButton: false, timer: 2500 });
    } else {
        Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    }

   


}
var fnGetTaskStatus = function (d) {
   
   
    $('.taskstatus').text(JSON.parse(d.Value)[0]["issueStatusID"])
}


function ChangeAssignee() {

    var AssignTo = $('#AssignTo').val();
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Task_AssigneeChange', values: { TaskID: id, AssigneeID: AssignTo }, CallBack: '' });
    Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectAssignee', values: { TaskID: id }, CallBack: fnGetTaskAssignee }); }, 100);
}

var fnGetTaskAssignee = function (d) {
   
    $('.assign').text(JSON.parse(d.Value)[0]["assignTo"])
}
 

function LoadTaskDetails() {
  
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);

    KendoGlobalAjax({ commandName: 'Task_SelectDetailByID', values: { TaskID: id }, CallBack: loadTasksDetailByID });
   
    KendoGlobalAjax({ commandName: 'Images_SelectImagesByTaskID', values: { Id: id }, CallBack: loadTaskAttachementByTaskID });


}

var loadTasksDetailByID = function (d) {
    setTimeout(function () {
        
   
        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        $('.taskName').text(JSON.parse(d.Value)[0]["taskTitle"]);
        $('.milestone').text(JSON.parse(d.Value)[0]["milestoneID"]);
        $('.project').text(JSON.parse(d.Value)[0]["projectID"]);
        $('.assign').text(JSON.parse(d.Value)[0]["assigneeID"]);
        $('.IssueType').text(JSON.parse(d.Value)[0]["issueTypeId"]);
        $('.reportedDate').text(JSON.parse(d.Value)[0]["reportedDate"]);
        $('.priority').text(JSON.parse(d.Value)[0]["issuePriority"]);
        $('.dueDate').text(JSON.parse(d.Value)[0]["dueDate"]);
        $('#task-description').append(JSON.parse(d.Value)[0]["description"]);
        $('#task-summary').append(JSON.parse(d.Value)[0]["summary"]);
        $('#AssignTo').val(JSON.parse(d.Value)[0]["employeeID"]);
        $('#select2-AssignTo-container').text($('#AssignTo :selected').text());
       $('#TaskStatus').val(JSON.parse(d.Value)[0]["issueStatusID"]);
        $('#select2-TaskStatus-container').text($('#TaskStatus :selected').text());
        $('.taskstatus').text(JSON.parse(d.Value)[0]["issueStatusID"]);
        $('.ppStartDate').text(JSON.parse(d.Value)[0]["reportedDate"]);
        $('.pEndDate').text(JSON.parse(d.Value)[0]["dueDate"]);
        $('.pdayLeft').text(JSON.parse(d.Value)[0]["planneddelayDateDiff"]);
        $('.pDelay').text(JSON.parse(d.Value)[0]["plannedDateDiff"]);
        

        $('.AStartDate').text(JSON.parse(d.Value)[0]["eTStartDate"]);
        $('.AEndDate').text(JSON.parse(d.Value)[0]["eTEndDate"]);
        $('.ADelay').text(JSON.parse(d.Value)[0]["actualdelayDateDiff"]);
        $('.AdayLeft').text(JSON.parse(d.Value)[0]["actualDateDiff"]);

        $('.pDuration').text(JSON.parse(d.Value)[0]["totalestimation"]);
        
        if (JSON.parse(d.Value)[0]["issueStatusID"] != 'Completed') {
          
            calculateRemmTime(JSON.parse(d.Value)[0]["timerTime"]);
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
var loadTaskAttachementByTaskID = function (d) {
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
            $('.appendAttachment').append('<li  style="font-size:larger;" class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a onclick="ChangeStatusIntoProgress()" target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["name"] + '</div><div  style="margin-left: auto;" class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li><hr/>')
        }
    }

}

function ChangeStatusIntoProgress() {
    
    $('#TaskStatus option:selected').val('InProgress');
    ChangeStatusOfTask();

}
 