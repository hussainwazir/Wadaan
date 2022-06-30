
var userId = "";
var username = "";
var roleID = "";
var id = "";
$(document).ready(function () {
  
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    
    if (url_array[0] != id) {
        LoadTaskDetails(id);
        LoadEmployeesDDL();
    }
    //else {
    //    LoadTaskList();
    //}
    LoadEmployeesDDL();

    

});

function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
   
    BindComboForDefault(JSON.parse(d.Value), $("#AssignTo"), "Select Employee");
}
$('#btn-create-version').click(function () {

    window.location.href = '/Task/Task/VersionSave';
   
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

    var TaskStatus = $('#TaskStatus').val();
   
    
    KendoGlobalAjax({ commandName: 'Task_StatusChanaged', values: { TaskID: window.localStorage.getItem("id"), NewStatus: TaskStatus }, CallBack: '' });
    Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectCurrentStatus', values: { TaskID: window.localStorage.getItem("id") }, CallBack: fnGetTaskStatus }); }, 100);
}

var fnGetTaskStatus = function (d) {
   
   
    $('.taskstatus').text(JSON.parse(d.Value)[0]["issueStatusID"])
}

function ChangeAssignee() {
  
    var AssignTo = $('#AssignTo').val();
    KendoGlobalAjax({ commandName: 'Task_AssigneeChange', values: { TaskID: window.localStorage.getItem("id"), AssigneeID: AssignTo }, CallBack: '' });
    Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    setTimeout(function () { KendoGlobalAjax({ commandName: 'Task_SelectAssignee', values: { TaskID: window.localStorage.getItem("id") }, CallBack: fnGetTaskAssignee }); }, 100);
}

var fnGetTaskAssignee = function (d) {
   
    $('.assign').text(JSON.parse(d.Value)[0]["assignTo"])
}
 

function LoadTaskDetails(id) {
   
    
 
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

        $('#AssignTo').val(JSON.parse(d.Value)[0]["employeeID"]);
        $('#select2-AssignTo-container').text($('#AssignTo :selected').text());
        $('#TaskStatus').val(JSON.parse(d.Value)[0]["issueStatusID"]);
        $('#select2-TaskStatus-container').text($('#TaskStatus :selected').text());
        calculateRemmTime(JSON.parse(d.Value)[0]["timerTime"]);



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
            $('.appendAttachment').append('<li  style="font-size:larger;" class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["name"] + '</div><div  style="margin-left: auto;" class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li><hr/>')
        }
    }

}



//// -------------------------- LOAD ALL TASK IN CALENDAR FIRST TIME START -------------------------------------------------------
//function LoadTaskList() {
//    KendoGlobalAjax({ commandName: 'Calender_Select', values: {}, CallBack: fnLoadTaskListNames });
//}
//var fnLoadTaskListNames = function (d) {

//    var dbevents = [];
//    for (var i = 0; i < JSON.parse(d.Value).length; i++) {


//        dbevents.push({
//            id: JSON.parse(d.Value)[i].taskId,
//            title: JSON.parse(d.Value)[i].taskTitle,
//            start: JSON.parse(d.Value)[i].reportedDate,
//            end: JSON.parse(d.Value)[i].dueDate,
//            //  overlap: false,
//            //  rendering: "background",
//            color: '#d' + i * 9 + 'd' + i * 4 + 'd6',
//            constraint: 'businessHours'
//        });
//    }
    
//    console.log(dbevents);
//    $('#calendar').fullCalendar({
//        header: {
//            left: 'prev,next today',
//            center: 'title',
//            right: 'month,agendaWeek,agendaDay,listMonth'
//        },
//        defaultDate: new Date(),
//        navLinks: true, // can click day/week names to navigate views
//        businessHours: true, // display business hours
//        editable: true,
//        //  droppable: true, // this allows things to be dropped onto the calendar

//        //drop: function () {
//        //
//        //    // is the "remove after drop" checkbox checked?
//        //    if ($('#checkbox2').is(':checked')) {
//        //        // if so, remove the element from the "Draggable Events" list
//        //        $(this).remove();
//        //    }
//        //},
//        events: dbevents

//        , eventClick: function (info) {


//            LoadTaskDetails(info.id);
//            //  $('#FkTypeID').val(info.id);
//            $('#task-detail-modal').modal('show');


//        }
//    });


//}




//// -------------------------- LOAD ALL TASK IN CALENDAR FIRST TIME END -------------------------------------------------------