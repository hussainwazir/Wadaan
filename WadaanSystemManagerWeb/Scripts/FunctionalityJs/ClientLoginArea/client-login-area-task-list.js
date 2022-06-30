
var userId = "";
var username = "";
var roleID = "";

var $grid = "task-list-client-projects-grid";
var IsReadTaskDetail = localStorage.getItem('IsReadTaskDetail');
$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadtaskKendo();

});


function LoadtaskKendo() {
    KendoGlobalAjax({ commandName: 'Task_SelectByUserID', values: { UserID: userId }, CallBack: loadTaskData });
}


var loadTaskData = function (d) {
    debugger;
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    console.log(_data);
    var record = 0;
    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 250, title: "Name",
            //template: "# if (IsReadTaskDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a>  # } else  {# #=taskTitle# #}#",
            template: "<a class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title = 'Show Details' >#=taskTitle#</a >",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "attachment", title: "Attachment", width: 170, filterable: true, hidden: true },
        { field: "mileStoneID", title: "Milestone", width: 170, filterable: true, hidden: true },
        { field: "projectID", title: "Project", width: 170, filterable: true },
        { field: "assigneeID", title: "Assign To", width: 170, filterable: true },
        { field: "issueTypeId", title: "Issue Type", width: 170, filterable: true },
        { field: "reportedBy", title: "Reported By", width: 170, filterable: true, hidden: true },
        { field: "reportedDate", title: "Reported Date", width: 170, filterable: true },
        { field: "issuePriority", title: "Priority", width: 170, filterable: true },
        { field: "dueDate", title: "Due Date", width: 170, filterable: true },
        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            // template: "<a style='font-size:20px;cursor:pointer;' onClick= fnLoadImageInDiv(this) title='Download Attachment' ><span class='fa fa-download'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= ChangeTaskStatusToAcceptedOrRejected('#=taskId#','Accepted') title='Accepted' ><span class='fas fa-check'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= ChangeTaskStatusToAcceptedOrRejected('#=taskId#','Rejected') title='Rejected' ><span class='fa fa-times'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= ShowCommentPopup()  title='Comments'><span class='fa fa-comments'></span></a>"

            template: "#  if (attachement == null  ) { # <a style='font-size:20px;cursor:pointer;' onClick= ChangeTaskStatusToAcceptedOrRejected('#=taskId#','Accepted') title='Accepted' ><span class='fas fa-check'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= ChangeTaskStatusToAcceptedOrRejected('#=taskId#','Rejected') title='Rejected' ><span class='fa fa-times'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= ShowCommentPopup()  title='Comments'><span class='fa fa-comments'></span></a>  #}  else  { # <a style='font-size:20px;cursor:pointer;' onClick= fnLoadImageInDiv(this) title='Download Attachment' ><span class='fa fa-download'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= ChangeTaskStatusToAcceptedOrRejected('#=taskId#','Accepted') title='Accepted' ><span class='fas fa-check'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= ChangeTaskStatusToAcceptedOrRejected('#=taskId#','Rejected') title='Rejected' ><span class='fa fa-times'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= ShowCommentPopup(this)  title='Comments'><span class='fa fa-comments'></span></a>   #} # ",
        }
    ];
    BindkendoGrid($grid, 50, colModel, _data);
};

var taskIdParameter = nulll;
function ChangeTaskStatusToAcceptedOrRejected(id, Status) {

    var SelectedStatus = '';
    if (Status == 'Accepted') {
        SelectedStatus = 'ClientAccepted';
    } else {
        SelectedStatus = 'ClientRejected';
    }
    taskIdParameter = id;
    KendoGlobalAjax({ commandName: 'Task_StatusWithOutInProgressEmployee', values: { TaskID: id, NewStatus: SelectedStatus, UserID: userId }, CallBack: fnAddAttachmentOfCompleteToNextTask });


    //setTimeout(function () { fnAddAttachmentOfCompleteToNextTask(id); }, 1000)
}

var fnChangeStatusOfTaskByClient = function (d) {

    // Swal.fire({ icon: 'success', text: 'Status changed successfully...', showConfirmButton: false, timer: 1500 });
    //AddAttachmentWithInProgressTasks();
}



//function AddAttachmentWithInProgressTasks(e) {
//    debugger;
//    var row = $(e).closest("tr");
//    var grid = $("#" + $grid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);

//    KendoGlobalAjax({ commandName: 'Task_AddAttachementAgainstProgressHistory', values: { UserID: userId, Status: 'ClientAccepted', TaskID: dataItem.taskId }, CallBack: fnAddAttachmentOfCompleteToNextTask });

//}

function fnAddAttachmentOfCompleteToNextTask(id) {


    //var full_url = document.URL; // Get current url
    //var url_array = full_url.split('='); //Split 
    //id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({
        commandName: 'Task_AddAttachementToNextTask', values: { UserID: userId, TaskID: taskIdParameter }, CallBack: fnShowSuccessAlert
    });

}

function fnShowSuccessAlert() {
    debugger;
    LoadtaskKendo();
    Swal.fire({ icon: 'success', text: 'Client accepted successfully...', showConfirmButton: false, timer: 1500 });

}



$('#btn-close-comment-modal').click(function () {

    $('#comment-modal').modal('hide');
})


function fnLoadImageInDiv(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    if (dataItem.attachement.split('.')[1] == 'jpg' || dataItem.attachement.split('.')[1] == 'jpeg' || dataItem.attachement.split('.')[1] == 'png') {
        $('.showImage').show();
        $('.showImage').empty('')
        $('.showImage').append("<img class='img-circle' src='../../Temp/" + e + "' style='width:100%' />")
        DownloadAttachment();
    } else {
        window.open('../../Temp/' + dataItem.attachement, '_blank');
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

function ShowCommentPopup(e) {

    debugger;
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    $('#FkTypeID').val(dataItem.taskId);
    $('#Areatype').val('ClientArea');
    $('#UserID').val(userId);
    LoadComments();



    $('#comment-modal').modal('show');
}








function LoadRecordByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/CLIENTAREA/ClientArea/CATaskDetail?taskID=' + dataItem.taskId + '';
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Task/Task/Save?taskID=' + dataItem.taskId + '';
}


var deleteRecordByID = function (id) {

    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
        text: "You want to delete this!",
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
            KendoGlobalAjax({ commandName: 'Task_DeleteByID', values: "{TaskID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadtaskKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}




$('#btn-add-update-employee').click(function () {
    window.location.href = '/Employee/Save', '';
    //window.open('/Customer/Save', '_blank');

});
//function LoadKendoDates() {
//    $("#licenseExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]
//    }); $("#certificateExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]

//    });
//}
//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country"); }


//function LoadCountry() {
//    KendoGlobalAjax({ commandName: 'listCountry', values: '{}', CallBack: getLoadCountry });
//}

//var getLoadCountry = function (d) {
//    _CountryList += BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country");
//}