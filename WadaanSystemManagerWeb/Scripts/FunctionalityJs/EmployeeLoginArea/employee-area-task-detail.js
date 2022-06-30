
var userId = "";
var username = "";
var roleID = "";
var $grid = "task-detail-historty-grid";
$(document).ready(function () {
   
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
   
    LoadTaskDetails();
    //LoadEmployeesDDL();
    LoadtaskHistoryKendo();
    LoadEmployeesDDL();
    ChandIsSeenStatus();
    LoadTotalUnseenTask();
});


function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDLWithOutAdminAndManager', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {

    BindComboForDefault(JSON.parse(d.Value), $("#AssignTo"), "Select Employee");
}

function ChandIsSeenStatus() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Task_ChandIsSeenStatus', values: { TaskID : id }, CallBack: '' });
}
 

function ChangeAssignee() {

    var AssignTo = $('#AssignTo').val();
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Task_AssigneeChangeByEmployee', values: { TaskID: id, AssigneeID: userId, AssignedTo: AssignTo }, CallBack: fnChangeAssignee  });
   
    setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectAssignee', values: { TaskID: id }, CallBack: fnGetTaskAssignee }); }, 100);
}


var fnChangeAssignee = function (d) {
    
    if (JSON.parse(d.Value).length > 0) {
        if (JSON.parse(d.Value)[0].cannotAssign == '0') {
            Swal.fire({ icon: 'info', text: 'Task is already in Progress...', showConfirmButton: false, timer: 1500 });
        }
    } else {
        Swal.fire({ icon: 'success', text: 'Assignee changed successfully...', showConfirmButton: false, timer: 1500 });
    }

    
}

var fnGetTaskAssignee = function (d) {

    $('.assign').text(JSON.parse(d.Value)[0]["assignTo"])
}

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

function LoadTotalUnseenTask() {
    KendoGlobalAjax({ commandName: 'Task_SelectAllUnseenTaskDetail', values: { UserID: userId }, CallBack: fnLoadTotalUnseenTask });
}
var fnLoadTotalUnseenTask = function (d) {
   
    $('.loadNotification').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('.loadNotification').append('<li> <a href="javascript:void(0)" class="link border-top"> <a class="dropdown-item" href="/EmployeeArea/EmployeeArea/EATaskDetail?taskID=' + JSON.parse(d.Value)[i].taskId + ' " > <i class="ti-list me-1 ms-1"></i> <h7 style="padding-left:5px" id="project-name"> <strong> ' + JSON.parse(d.Value)[i].projectName + ' </strong > </h7 > <br /> <h7 style="padding-left:30px" id="task-name"> ' + JSON.parse(d.Value)[i].taskTitle + ' </h7 > </a > </a > </li > ')
    }

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
        $('#TaskStatus').val(JSON.parse(d.Value)[0]["issueStatusID"]);
        $('.taskstatus').text(JSON.parse(d.Value)[0]["issueStatusID"]);

        if (JSON.parse(d.Value)[0]["issueStatusID"] != 'Completed') {
            calculateRemmTime(JSON.parse(d.Value)[0]["timerTime"]);
        }


      
    }, 50);
}



function ChangeStatusOfTaskByEmployee() {
  
    KendoGlobalAjax({ commandName: 'Task_GetAllInProgressTasks', values: { UserID: userId }, CallBack: fnCheckWhetherInProgressTaskExists });
 
  //  setTimeout(function () { window.location.reload() }, 1000);
    

}


function GetDataForCheckList() {
    var selectedStatus = $('#TaskStatus').val();
    var TaskName = $('.taskName').text();
    KendoGlobalAjax({ commandName: 'CheckList_GetDataAgainstTaskAndTaskStatus', values: { TaskStatus : selectedStatus, TaskName: TaskName }, CallBack: fnPopulateCheckBoxDiv });
}

function fnPopulateCheckBoxDiv(d) {
   
    var html = '',divId = 'checkBox', labelText = '';
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        divId = 'checkBox'
        divId = (divId + i);
        labelText = JSON.parse(d.Value)[i]['checkBoxText'];
        var labelTextInQuote = "'" + labelText + "'";
        divId = "'" + divId + "'";
        if (i == 0) {
            //html = '<input type="checkbox" class="checklistItems" onclick="clickFunction1(this);"> <label for="">' + JSON.parse(d.Value)[i]['checkBoxText'] + ' </label > <br>'
            html = '<div id=' + divId +'><input type="checkbox" onclick="clickFunction(this.checked,' + divId + ',' + labelTextInQuote + ');"> <label for=""> ' + labelText+'  </label></div>';
        } else {
           // html = html + '<input type="checkbox" class="checklistItems"> <label for="">' + JSON.parse(d.Value)[i]['checkBoxText'] + ' </label > <br>';
            html = html + '<div id=' + divId + '><input type="checkbox" onclick="clickFunction(this.checked,' + divId + ',' + labelTextInQuote + ');"> <label for=""> ' + labelText + '  </label></div>';
        }
    }
    var RejectedDivHtml = '<div class="card"><div class="card-header"> CheckList for Rejected </div><div class="card-body border"> <div class="row"> <div class="col-md-6">' + html + '</div></div></div></div> ';
    var CompletedDivHtml = '<div class="card"><div class="card-header"> CheckList for Completed </div><div class="card-body border"> <div class="row"> <div class="col-md-6">' + html + '</div></div></div></div> ';
    if ($('#TaskStatus').val() == 'Rejected') {
        $('#div-rejected').html(RejectedDivHtml);
    } else {
        $('#div-completed').html(CompletedDivHtml);
    }
  
}

var fnCheckWhetherInProgressTaskExists = function (d) {
 
    var selectedStatus = $('#TaskStatus').val();
    if (selectedStatus == 'Completed') {
        GetDataForCheckList();
        $('#div-rejected').hide();
        $('#div-completed').show();
        $('#employee-task-progress').modal('show');
    }
    else if (selectedStatus == 'Rejected') {

        $('#div-completed').hide();

        GetDataForCheckList();
        $('#div-rejected').show();
        $('#employee-task-progress').modal('show');
    }
    else if (selectedStatus == 'Approved') {
        
        changeTaskStatus();
        //fnAddAttachmentOfCompleteToNextTask();
    }
    else if (selectedStatus == 'InProgress') {
   
        if (JSON.parse(d.Value)[0].inProgressTask > 0) {
            swal.fire({
                title: 'One Task is in Progress',
                text: "Do you want to stop that and Start this one",
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

                    var TaskStatus = $('#TaskStatus').val();
                    var full_url = document.URL; // Get current url
                    var url_array = full_url.split('='); //Split 
                    id = url_array[url_array.length - 1];//Get ID
                    KendoGlobalAjax({ commandName: 'Task_StatusChanagedByEmployee', values: { TaskID: id, NewStatus: TaskStatus, UserID: userId }, CallBack: fnChangeStatusOfTaskByEmployee });
                    //setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectCurrentStatus', values: { TaskID: id }, CallBack: fnGetTaskStatus }); }, 100);
                   // AddAttachmentWithTasks();
                } else {
                    swal.fire("Cancelled", '', "error");

                }
            });
        } else {
            var TaskStatus = $('#TaskStatus').val();
            var full_url = document.URL; // Get current url
            var url_array = full_url.split('='); //Split 
            id = url_array[url_array.length - 1];//Get ID
            KendoGlobalAjax({ commandName: 'Task_StatusChanagedByEmployee', values: { TaskID: id, NewStatus: TaskStatus, UserID: userId }, CallBack: fnChangeStatusOfTaskByEmployee });
           
            //setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectCurrentStatus', values: { TaskID: id }, CallBack: fnGetTaskStatus }); }, 100);
        }
    } else {
       
        changeTaskStatus();
    }
}


function changeTaskStatus() {
    
    var TaskStatus = $('#TaskStatus').val();
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Task_StatusWithOutInProgressEmployee', values: { TaskID: id, NewStatus: TaskStatus, UserID: userId }, CallBack: fnChangeStatusOfTaskByEmployee });
    setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectCurrentStatus', values: { TaskID: id }, CallBack: fnGetTaskStatus }); }, 100);
   // window.location.reload();
}



var fnChangeStatusOfTaskByEmployee = function (d) {

    Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    AddAttachmentWithInProgressTasks();
}
var fnGetTaskStatus = function (d) {


    $('.taskstatus').text(JSON.parse(d.Value)[0]["issueStatusID"])
}


function AddAttachmentWithInProgressTasks() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Task_AddAttachementAgainstProgressHistory', values: { UserID: userId, Status: $('#TaskStatus').val(), TaskID: id }, CallBack: fnAddAttachmentOfCompleteToNextTask });

}

function fnAddAttachmentOfCompleteToNextTask() {
 
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({
        commandName: 'Task_AddAttachementToNextTask', values: { UserID: userId, TaskID: id }, CallBack:  fnShowSuccessAlert
    });
 
}

function fnShowSuccessAlert() {
    Swal.fire({ icon: 'success', text: 'Task has been completed successfully...', showConfirmButton: false, timer: 2500 });
    LoadtaskVersionKendo();
    
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
            $('.appendAttachment').append('<li  style="font-size:larger;" class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a  onclick="ChangeStatusIntoProgress()"  target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["name"] + '</div><div  style="margin-left: auto;" class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li><hr/>')
        }
    }

}


function ChangeStatusIntoProgress() {
 
    var TaskStatus = $('.taskstatus').text();
    if (TaskStatus == 'InProgress') {
        Swal.fire({ icon: 'info', text: 'This task is already in progress...', showConfirmButton: false, timer: 2500 });
    } else {
        $('#TaskStatus option:selected').val('InProgress');
        ChangeStatusOfTaskByEmployee();
       
    }

   

}


function LoadtaskHistoryKendo() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'Task_taskHistoryDetail', values: { TaskID: id }, CallBack: fnloadTaskData });
}


var fnloadTaskData = function (d) {

    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
     
    var record = 0;

    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },
        //{
        //    field: "taskTitle", width: 250, title: "Name",
           
        //    filterable: false,
        //    //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
        //   // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
        //    //filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        //},

        { field: "description", title: "Reason", width: 250, filterable: false , hidden:false},
        { field: "oldStatus", title: "Old Status", width: 170, filterable: false , hidden:true},
        { field: "taskStatus", title: "Current Status", width: 170, filterable: false },
        { field: "createdDate", title: "Date", width: 170, filterable: false },
        { field: "createdTime", title: "Time", width: 170, filterable: false },
    
        
       
    ];

    BindkendoGrid($grid, 50, colModel, _data);
};

$('#btnSaveAttachmentAndList').on('click', function (e) {
    debugger;
    var TaskStatus = $('#TaskStatus').val();
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID

    $('#UserID').val(userId);
    $('#TaskID').val(id);
    if (TaskStatus == 'Completed') {
        $('#CheckList').val($('#div-completed').html());
    } else if (TaskStatus == 'Rejected') {
        $('#CheckList').val($('#div-rejected').html());
    }


  
    $('#NewStatus').val($('#TaskStatus').val());
    if (customvalidateForm('frmAddUpdateTaskProgress')) {

        $("#frmAddUpdateTaskProgress").ajaxForm();

        //ButtonLoader
        var btn = document.getElementById('btnSave');
        // btn.disabled = true;
        // btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

        var options = {
            success: function (response, statusText, jqXHR) {
                fnAddAttachmentOfCompleteToNextTask();
                $('#employee-task-progress').modal('hide');
              
               // var checklistAndDescription = $('#div-completed-html').html();
                //KendoGlobalAjax({ commandName: 'Task_TaskStatusAndChecklists_Save', values: { TaskID: id, NewStatus: TaskStatus, UserID: userId, CheckList: checklistAndDescription }, CallBack: fnChangeStatusOfTaskByEmployee });
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateTaskProgress").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
        return false;
    }

});


$('#btn-close-modal').click(function () {

    $('#employee-task-progress').modal('hide');

})










//$('#btnSaveAttachmentAndList').on('click', function (e) {

//    var TaskStatus = $('#TaskStatus').val();
//    var full_url = document.URL; // Get current url
//    var url_array = full_url.split('='); //Split 
//    id = url_array[url_array.length - 1];//Get ID

//    $('#TaskID').val(id);
//    if (customvalidateForm('frmAddUpdateTaskProgress')) {

//        $("#frmAddUpdateTaskProgress").ajaxForm();

//        //ButtonLoader
//        var btn = document.getElementById('btnSave');
//        // btn.disabled = true;
//        // btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

//        var options = {
//            success: function (response, statusText, jqXHR) {

//                var TaskStatus = $('#TaskStatus').val();
//                var full_url = document.URL; // Get current url
//                var url_array = full_url.split('='); //Split 
//                id = url_array[url_array.length - 1];//Get ID
//                var checklistAndDescription = $('#div-completed-html').html();
//                KendoGlobalAjax({ commandName: 'Task_TaskStatusAndChecklists_Save', values: { TaskID: id, NewStatus: TaskStatus, UserID: userId, CheckList: checklistAndDescription }, CallBack: fnChangeStatusOfTaskByEmployee });
//            },
//            error: function (xhr, status, error) {
//                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
//                alert(errmsg);
//            }
//        };
//        $("#frmAddUpdateTaskProgress").ajaxSubmit(options);

//    }
//    else {

//        btn.disabled = true;
//        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
//        return false;
//    }

//});

$('.checklistItems').click(function () {
    alert('testing');
    $(this).attr('checked', 'checked');
});
//function clickFunction1(e){
//    alert('clicked');
//}
function clickFunction(inputType, id, text) {
    
    var divId = "'" + id + "'";
    var labelText = "'" + text + "'";
    if (inputType == true) {
        $('#' + id).html('<input type="checkbox" checked="checked" onclick="clickFunction(this.checked,' + divId + ',' + labelText + ');"> <label for=""> ' + text + ' </label> ');
    }
    else {
        $('#' + id).html('<input type="checkbox"  onclick="clickFunction(this.checked,' + divId + ',' + labelText + ');"> <label for=""> ' + text + ' </label>');
    }
}