
var userId = "";
var username = "";
var roleID = "";

var $grid = "task-list-of-employee-grid";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadtaskKendo();
    LoadTotalUnseenTask();

});

function LoadTotalUnseenTask() {
    KendoGlobalAjax({ commandName: 'Task_SelectAllUnseenTaskDetail', values: { UserID: userId }, CallBack: fnLoadTotalUnseenTask });
}
var fnLoadTotalUnseenTask = function (d) {

    $('.loadNotification').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('.loadNotification').append('<li> <a href="javascript:void(0)" class="link border-top"> <a class="dropdown-item" href="/EmployeeArea/EmployeeArea/EATaskDetail?taskID=' + JSON.parse(d.Value)[i].taskId + ' " > <i class="ti-list me-1 ms-1"></i> <h7 style="padding-left:5px" id="project-name"> <strong> ' + JSON.parse(d.Value)[i].projectName + ' </strong > </h7 > <br /> <h7 style="padding-left:30px" id="task-name"> ' + JSON.parse(d.Value)[i].taskTitle + ' </h7 > </a > </a > </li > ')
    }

}
function LoadtaskKendo() {
    KendoGlobalAjax({ commandName: 'Task_ListAssigneToEmployee', values: { UserID: userId }, CallBack: loadTaskData });  
}


var loadTaskData = function (d) {
     
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;

    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 190, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        
        { field: "projectID", title: "Project", width: 150, filterable: true  },
        { field: "assigneeID", title: "Assign To", width: 1570, filterable: true,hidden:true },
        { field: "issueTypeId", title: "Issue Type", width: 150, filterable: true },

        { field: "reportedDate", title: "Reported Date", width: 150, filterable: true },
        { field: "issuePriority", title: "Priority", width: 150, filterable: true },
        { field: "dueDate", title: "Due Date", width: 150, filterable: true },

        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //template: "# if (IsUpdatedTask == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteTask == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'<span class='fa fa-trash'></span></a> #}   #",
            //template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;margin-left:5px' onClick= deleteRecordByID('#=taskId#')  title='Delete Tasks'><span class='fa fa-trash'></span></a><a style='font-size: 20px; cursor: pointer; margin-left:10px'  title='Download Attachment'><span class='fa fa-download'></span></a>"
            template: "#  if (attachement != null) { # <a style='font-size:20px;cursor:pointer;' onClick= fnLoadImageInDiv('#=attachement#')  title='Download Attachment'><span class='fa fa-download'></span></a>  #}  else  { #   #}  # ",
            //template: "<a style='font-size:20px;cursor:pointer;' onClick= fnLoadImageInDiv('#=attachement#')  title='Download Attachment'><span class='fa fa-download'></span></a>",
        }

       ];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/EmployeeArea/EmployeeArea/EATaskDetail?taskID=' + dataItem.taskId + '';
}



 


$('#btn-add-update-employee').click(function () {
    window.location.href = '/Employee/Save', '';
    //window.open('/Customer/Save', '_blank');

});
function fnLoadImageInDiv(e) {

    if (e.split('.')[1] == 'jpg' || e.split('.')[1] == 'jpeg' || e.split('.')[1] == 'png') {
        $('.showImage').show();
        $('.showImage').empty('')
        $('.showImage').append("<img class='img-circle' src='../../Temp/" + e + "' style='width:100%' />")
        DownloadAttachment();
    } else {
        window.open('../../Temp/' + e, '_blank');
    }
}
function DownloadAttachment() {

    kendo.drawing.drawDOM($(".showImage"))
        .then(function (group) {
            // Render the result as a PDF file
            return kendo.drawing.exportPDF(group, {
                paperSize: "auto",
                margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
            });
        })
        .done(function (data) {
            // Save the PDF file

            kendo.saveAs({
                dataURI: data,
                fileName: "Attachment-downloaded.pdf",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
            });
            // setTimeout(window.close(), 200, '');
            $('.showImage').hide();
        });
}