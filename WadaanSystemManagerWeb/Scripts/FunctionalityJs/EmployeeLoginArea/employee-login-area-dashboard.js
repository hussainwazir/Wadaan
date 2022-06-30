
var userId = "";
var username = "";
var roleID = "";



var $grid = "load-status-wise-tasks";

$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    LoadTotalNoOfProject();
    LoadTotalNoOfTask();
    // LoadComments();
    getUserName();
    LoadStatusWiseTasks();
    LoadTotalTasksStatusWise();
    LoadTotalUnseenTask();
    // LoadKendoDates();
    // LoadPermissionAgainstRole();

});




function LoadPermissionAgainstRole() {

    KendoGlobalAjax({ commandName: 'Permissions_SelectRoleBase', values: { RoleID: roleID }, CallBack: fnLoadPermissionAgainstRole });
}
var fnLoadPermissionAgainstRole = function (d) {
  
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

        
        if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "List Task" && JSON.parse(d.Value)[i].isRead == true) {
            $('#Task-Menu').show();

            return
        } else {
            $('#Task-Menu').hide();

        }
    }
}


function LoadKendoDates() {
    $("#date-picker-for-search").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"],
        change: function () {
            LoadTaskOfCurrentDay();
        }
    });
}
function LoadTotalNoOfProject() {
    KendoGlobalAjax({ commandName: 'Project_SelectAllAgainstEmployee', values: { UserID: userId }, CallBack: fnLoadTotalNoOfProjectEmployee });
}
var fnLoadTotalNoOfProjectEmployee = function (d) {

    $('#total-num-of-project-employee-involved').text('( ' + JSON.parse(d.Value)[0].totalProject + ' )' + ' ' + 'Projects');
}


function LoadTotalNoOfTask() {
    KendoGlobalAjax({ commandName: 'Task_SelectAllAgainstEmployee', values: { UserID: userId }, CallBack: fnLoadTotalNoOfTasksEmployee });
}
var fnLoadTotalNoOfTasksEmployee = function (d) {

    $('#total-task-assign-to-employee').text('( ' + JSON.parse(d.Value)[0].totalTasks + ' )' + ' ' + 'Tasks');
    if (JSON.parse(d.Value)[0].notSeenYet == '0') {
        $('#unseentasks').text('');
    } else {
        $('#unseentasks').text(JSON.parse(d.Value)[0].notSeenYet);
    }
   
    $('.loadNotification').append('<li> <a href="javascript:void(0)" class="link border-top"> <a class="dropdown-item" href=""> <i class="ti-list me-1 ms-1"></i> <h7 style="padding-left:5px" id="project-name"> <strong></strong> </h7> <h7 style="padding-left:5px" id="task-name"> <strong></strong> </h7> </a> </a> </li>')
}

function LoadTotalUnseenTask() {
    KendoGlobalAjax({ commandName: 'Task_SelectAllUnseenTaskDetail', values: { UserID: userId }, CallBack: fnLoadTotalUnseenTask });
}
var fnLoadTotalUnseenTask = function (d) {
   
    console.log(d);
    $('.loadNotification').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('.loadNotification').append('<li> <a href="javascript:void(0)" class="link border-top"> <a class="dropdown-item" href="/EmployeeArea/EmployeeArea/EATaskDetail?taskID=' + JSON.parse(d.Value)[i].taskId +' " > <i class="ti-list me-1 ms-1"></i> <h7 style="padding-left:5px" id="project-name"> <strong> ' + JSON.parse(d.Value)[i].projectName + ' </strong > </h7 > <br /> <h7 style="padding-left:30px" id="task-name"> ' + JSON.parse(d.Value)[i].taskTitle + ' </h7 > </a > </a > </li > ')
    }
   
}


function LoadTotalTasksStatusWise() {
    KendoGlobalAjax({ commandName: 'Task_LoadStatusWise', values: { UserID: userId }, CallBack: fnLoadTotalTasksStatusWise });
}
var fnLoadTotalTasksStatusWise = function (d) {

    $('#total-completed-tasks').text('( ' + JSON.parse(d.Value)[0].completedStatus + ' )' + ' ' + 'Completed Tasks ');
    $('#total-pending-tasks').text('( ' + JSON.parse(d.Value)[0].pendingStatus + ' )' + ' ' + ' Pending Tasks');
    $('#total-paused-tasks').text('( ' + JSON.parse(d.Value)[0].pausedStatus + ' )' + ' ' + 'Paused Tasks');
}

function LoadComments() {
    KendoGlobalAjax({ commandName: 'Comments_ShowAllOnClientProjectTask', values: { UserID: window.localStorage.getItem("userId") }, CallBack: fnLoadComments });
}
var fnLoadComments = function (d) {
    var fileExtension = "";
    $('#LoadAllComents').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('#LoadAllComents').append('<li class="media" style="list-style-type:none"> <div class="row"> <div class="col-sm-1" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <div class=""> <a href="#"><img class="media-object img-circle comment-img" src="/../../images/avatar-1.png" style="width:50px"></a> </div> </div> <div class="col-sm-9"> <div class="media-body media-right"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + ' ' + '</span> <span class="media-heading">' + JSON.parse(d.Value)[i]["projectName"] + '  -> ' + ' </span><span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["taskTitle"] + ' </span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p> <hr> </div> </div> </div></li>');
    }
}
function getUserName() {
    KendoGlobalAjax({ commandName: 'UserLogin_Name', values: { UserID: userId }, CallBack: fngetUserName });
}
var fngetUserName = function (d) {
    $('#login-user-name').text(' Welcome back ! ' + ' ' + JSON.parse(d.Value)[0].name);
}
function LoadStatusWiseTasks() {
    setTimeout(function () {
        KendoGlobalAjax({ commandName: 'Task_SelectStatusWise', values: { UserID: userId, SelectedStatus: $('#task-status').val() }, CallBack: fnLoadStatusWiseTasksTask });
    }, 100);
}
var fnLoadStatusWiseTasksTask = function (d) {
   
    KendoGrid(JSON.parse(d.Value));
}
var KendoGrid = function (_data) {
    
   
    var record = 0;
    var colModel = [
        { field: "projectID", title: "ProjectID", hidden: true, },
        { field: "taskId", title: "TaskId", hidden: true, },
        {
            field: "taskTitle", title: "Task",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;'  onClick= LoadRecordByTaskID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: false
        },
        {

            field: "projectName", title: "Project",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByProjectID(this)   title='Show Details'>#=projectName#</a> ",
            filterable: false

        },

        { field: "issueStatusID", title: "Status", filterable: false },
        { field: "assigneeID", title: "Employee", filterable: false, hidden: true },
        {
            width: 170,
            title: "Action",
            // attributes: { "class": "cellGreen" },
            //template: "   <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Stop Timer'><span class='fas fa-hand-paper'></span></a>"

            template: "# if (issueStatusID == 'NotStartedYet' ) {# <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a>  #}  else if (issueStatusID == 'InProgress' ) {#  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Pause Timer'><span class='fas fa-hand-paper'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= TaskCompleted(this)  title='Completed'><span class='far fa-check-circle'></span></a> #}    else if (issueStatusID == 'Pause' ) {# <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= TaskCompleted(this)  title='Completed'><span class='far fa-check-circle'></span></a>  #}  else if (issueStatusID == 'Completed' ) {# <span class='fa fa-check'></span> #}  else if (issueStatusID == 'Approved' ) {# <span class='fa fa-check'></span> #} else if (issueStatusID == 'Underreview' ) {#  #} else if (issueStatusID == 'Accepted' ) {#  #}  else if (issueStatusID == 'Rejected' ) {# <span class='fa fa-times'></span> #}   else if (issueStatusID == 'InProgress' ) {#  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Stop Timer'><span class='fas fa-hand-paper'></span></a> #}  else   { # <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Stop Timer'><span class='fas fa-hand-paper'></span></a># }  # "



        }
    ];
    BindkendoGrid($grid, 50, colModel, _data);
};
function StartTimer(e) {
 
    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    KendoGlobalAjax({
        commandName: 'Task_StartTime', values: {
            UserID: userId,
            TaskID: dataItem.taskId,
            ProjectID: dataItem.projectID,
            OldStatus: dataItem.issueStatusID,
            EmployeeID: dataItem.assigneeID,

        }, CallBack: fnStartTimer
    });
}
function fnStartTimer(d) {
    LoadStatusWiseTasks();

  
    if (JSON.parse(d.Value)[0].taskInProgress > '0') {

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'One Task is in progress Next Task Cannot be start..',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Timer is start',
            showConfirmButton: false,
            timer: 1500
        })
    }

   
}
function StopTimer(e) {

    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    KendoGlobalAjax({
        commandName: 'Task_StopTime', values: {
            UserID: userId,
            TaskID: dataItem.taskId,
            ProjectID: dataItem.projectID,
            OldStatus: dataItem.issueStatusID,
            EmployeeID: dataItem.assigneeID,

        }, CallBack: fnStopTimer
    });
}
function fnStopTimer() {
    LoadStatusWiseTasks();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Timer is Paused',
        showConfirmButton: false,
        timer: 1500
    })
}

function TaskCompleted(e) {

    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    KendoGlobalAjax({
        commandName: 'Task_Completed', values: {
            UserID: userId,
            TaskID: dataItem.taskId,
            ProjectID: dataItem.projectID,
            OldStatus: dataItem.issueStatusID,
            EmployeeID: dataItem.assigneeID,

        }, CallBack: fnTasKCompleted
    });
}
function fnTasKCompleted() {
    LoadStatusWiseTasks();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task Completed',
        showConfirmButton: false,
        timer: 1500
    })
}

function LoadRecordByTaskID(e) {

    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    //window.location.href = '/CLIENTAREA/ClientArea/CATaskDetail?taskID=' + dataItem.taskId + '';
    window.open('/EmployeeArea/EmployeeArea/EATaskDetail?taskID=' + dataItem.taskId + '', '_blank');
}