
var userId = "";
var username = "";
var roleID = "";
 
localStorage.setItem('IsReadTaskDetail', false);
localStorage.setItem('IsReadProjectDetail', false);
var $grid = "load-tasks-of-current-day-grid";

$(document).ready(function () {
  
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    LoadTotalNoOfProject();
    LoadTotalNoOfTask();
    LoadComments();
    getUserName();
    LoadTaskOfCurrentDay();
    LoadKendoDates();
 //   LoadPermissionAgainstRole();

});




function LoadPermissionAgainstRole() {

    KendoGlobalAjax({ commandName: 'Permissions_SelectRoleBase', values: { RoleID: roleID }, CallBack: fnLoadPermissionAgainstRole });
}
var fnLoadPermissionAgainstRole = function (d) {
    
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        
        if (JSON.parse(d.Value)[i].moduleName == "Project" && JSON.parse(d.Value)[i].formName == "List Project" && JSON.parse(d.Value)[i].isRead == true) {
            $('#Project-Menu').show();
        }
        if (JSON.parse(d.Value)[i].moduleName == "Project" && JSON.parse(d.Value)[i].formName == "Project Detail" && JSON.parse(d.Value)[i].isRead == true) {
           
            localStorage.setItem('IsReadProjectDetail', true);
        }
        if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "List Task" && JSON.parse(d.Value)[i].isRead == true) {
            $('#Task-Menu').show();
        } 
        if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "Task Detail" && JSON.parse(d.Value)[i].isRead == true) {
            IsReadTaskDetail = true;
            localStorage.setItem('IsReadTaskDetail', true);
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
    KendoGlobalAjax({ commandName: 'Project_SelectAllAgainstClient', values: { UserID: window.localStorage.getItem("userId") }, CallBack: fnLoadTotalNoOfProject });
}
var fnLoadTotalNoOfProject = function (d) {
    $('#total-number-of-projects').text('( ' + JSON.parse(d.Value)[0].totalProject + ' )' + ' ' + 'Project');
}
function LoadTotalNoOfTask() {
    KendoGlobalAjax({ commandName: 'Task_SelectAllAgainstClient', values: { UserID: window.localStorage.getItem("userId") }, CallBack: fnLoadTotalNoOfTasks });
}
var fnLoadTotalNoOfTasks = function (d) {
    $('#total-number-of-tasks').text('( ' + JSON.parse(d.Value)[0].taskID + ' )' + ' ' + 'Tasks');
}
function LoadComments() {
    KendoGlobalAjax({ commandName: 'Comments_ShowAllOnClientProjectTask', values: { UserID: window.localStorage.getItem("userId") }, CallBack: fnLoadComments });
}
var fnLoadComments = function (d) {


    var fileExtension = "";
    $('#LoadAllComents').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        var appenLI = '';
        var currentDate = new Date();
         
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        var dbDate = JSON.parse(d.Value)[i].cDate
        if (today == dbDate) {
            appenLI = '<li class="media" style="list-style-type:none"> <div class="row" > <div class="col-sm-1" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <div class=""> <a href="#"><img class="media-object img-circle comment-img" src="/../../images/avatar-1.png" style="width:50px"></a> </div> </div> <div class="col-sm-9"> <div class="media-body media-right" style="background-color:#69fd9d33"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + ' ' + '</span> <span class="media-heading">' + JSON.parse(d.Value)[i]["projectName"] + '  -> ' + ' </span><span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["taskTitle"] + ' </span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p> <hr> </div> </div> </div></li>'
        } else {
            appenLI = '<li class="media" style="list-style-type:none"> <div class="row"> <div class="col-sm-1" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <div class=""> <a href="#"><img class="media-object img-circle comment-img" src="/../../images/avatar-1.png" style="width:50px"></a> </div> </div> <div class="col-sm-9"> <div class="media-body media-right"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + ' ' + '</span> <span class="media-heading">' + JSON.parse(d.Value)[i]["projectName"] + '  -> ' + ' </span><span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["taskTitle"] + ' </span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p> <hr> </div> </div> </div></li>';
        }
        
        $('#LoadAllComents').append(appenLI);
    }
}
function getUserName() {
    KendoGlobalAjax({ commandName: 'UserLogin_Name', values: { UserID: userId }, CallBack: fngetUserName });
}
var fngetUserName = function (d) {
    $('#login-user-name').text(' Welcome back ! ' + ' ' + JSON.parse(d.Value)[0].name);
}
function LoadTaskOfCurrentDay() {
    setTimeout(function () {
        KendoGlobalAjax({ commandName: 'Task_SelectOfCurrentDay', values: { UserID: userId, CurrentDate: $('#date-picker-for-search').val() }, CallBack: fnLoadTaskOfCurrentDay });
    }, 100);
}
var fnLoadTaskOfCurrentDay = function (d) {
    KendoGrid(JSON.parse(d.Value));
}
var KendoGrid = function (_data) {
    var record = 0;
    var colModel = [
        { field: "projectID", title: "ProjectID", hidden: true, },
        { field: "taskId", title: "TaskId", hidden: true, },
        {

            field: "projectName", title: "Project",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByProjectID(this)   title='Show Details'>#=projectName#</a> ",
            filterable: false

        },
        {
            field: "taskTitle", title: "Task",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;'  onClick= LoadRecordByTaskID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: false
        },
        { field: "issueStatusID", title: "Status", filterable: false },
        { field: "createdDate", title: "Date", filterable: false },
    ];
    BindkendoGrid($grid, 50, colModel, _data);
};
function LoadRecordByProjectID(e) {

    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    //window.location.href = '/CLIENTAREA/ClientArea/ProjectDetail?projectID =' + dataItem.projectID + ' ';
    window.open('/CLIENTAREA/ClientArea/ProjectDetail?projectID=' + dataItem.projectID + '', '_blank');
}
function LoadRecordByTaskID(e) {

    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    //window.location.href = '/CLIENTAREA/ClientArea/CATaskDetail?taskID=' + dataItem.taskId + '';
    window.open('/CLIENTAREA/ClientArea/CATaskDetail?taskID=' + dataItem.taskId + '', '_blank');
}