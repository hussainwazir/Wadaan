
var userId = "";
var username = "";
var roleID = "";

var $grid = "taskversion-grid";

$(document).ready(function () {

 
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
   
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    var FkTypeID = getUrlVars();
    $("#FkTypeID").val(FkTypeID);
     
    LoadtaskVersionKendo();

});


function LoadtaskVersionKendo() {
    KendoGlobalAjax({ commandName: 'TaskVersion_SelectByTaskID', values: { TaskID: $("#FkTypeID").val()}, CallBack: fnloadTaskVersionsData }); 
}


var fnloadTaskVersionsData = function (d) {
   
    
    KendoGridtesting(JSON.parse(d.Value));

}

var KendoGridtesting = function (_data) {    
    
    var record = 0;

    var colModel = [
 
        { field: "parrentId", title: "ParrentId", hidden: true, width: 200 },
        { field: "taskProgressHistoryID", title: "TaskProgressHistoryID", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 120, title: "Sub Task Name ",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
           // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;'  href='/Task/Task/TaskDetail?taskID=#=taskId#' title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
       
      
        { field: "draft", title: "Draft", width: 200, filterable: true, encoded: false },
        { field: "checkList", title: "CheckList", width: 200, filterable: true, encoded: false,hidden:true },
        
        { field: "description", title: "Description", width: 100, filterable: true, encoded: false },
        { field: "assignBy", title: "Assign By", width: 100, filterable: true },
        { field: "assignTo", title: "Assign To", width: 100, filterable: true },
        { field: "totalestimation", title: "Duration", width: 100, filterable: true },
       
   
        { field: "issueStatusID", title: "Status", width: 100, filterable: true },
        { field: "reportedDate", title: "Start Date", width: 100, filterable: true },
        { field: "dueDate", title: "End Date", width: 100, filterable: true },
        { field: "planneddelayDateDiff", title: "Days Left", width: 100, filterable: true },
        { field: "plannedDateDiff", title: "Delay", width: 100, filterable: true },
       // { field: "attachment", title: "Attachment", width: 100, filterable: true },
        //{ field: "submittButton", title: "Submitted", width: 100, filterable: true },
        { field: "approvedNotApproved", title: "Approved/Not-Approved", width: 100, filterable: true,hidden:true },
        { field: "alarm", title: "Alarm", width: 100, filterable: true ,hidden:true},
        //{ field: "subject", title: "Subject", width: 100, filterable: true },
        //{ field: "description", title: "Description", width: 170, filterable: true, hidden:true },
        //{ field: "versionDate", title: "VersionDate", width: 170, filterable: true },
        //{ field: "isActive", title: "isActive", width: 170, filterable: true,hidden:true },
        //{ field: "assigneeName", title: "AssigneeName", width: 170, filterable: true },
        //{ field: "tvno", title: "TVNO", width: 170, filterable: true , hidden:true},
      
        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
              //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
           // template: "#  if (issueStatusID =='Approved' || attachement == null) { # <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task Version' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;margin-left:5px' onClick= deleteRecordByID('#=parrentId#')  title='Delete Task Version'><span class='fa fa-trash'></span></a>   #}  else  { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task Version' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;margin-left:5px' onClick= deleteRecordByID('#=parrentId#')  title='Delete Task Version'><span class='fa fa-trash'></span></a><a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= fnLoadImageInDiv(this)  title='Download Attachment'><span class='fa fa-download'></span></a>  #} # ",


            //template: "#  if (issueStatusID =='Approved' || attachement == null) { #   #}  else if(issueStatusID =='Completed' || issueStatusID =='Rejected')  { # <a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= fnLoadImageInDiv(this)  title='Download Attachment'><span class='fa fa-download'></span></a> <a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= ShowCheckListDetail(this)  title='CheckList Detail'><span class='fas fa-list'></span></a>  #} else  { # <a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= fnLoadImageInDiv(this)  title='Download Attachment'><span class='fa fa-download'></span></a>   #} # ",
            template: "#  if (issueStatusID =='Approved' || attachement == null || issueStatusID == 'ClientAccepted' ) { #   #}  else if(issueStatusID =='Completed' || issueStatusID =='Rejected')  { # <a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= fnLoadImageInDiv(this)  title='Download Attachment'><span class='fa fa-download'></span></a> <a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= ShowCheckListDetail(this)  title='CheckList Detail'><span class='fas fa-list'></span></a>  #} else  { # <a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= fnLoadImageInDiv(this)  title='Download Attachment'><span class='fa fa-download'></span></a>   #} # ",
            //template: "  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task Version' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;margin-left:5px' onClick= deleteRecordByID('#=parrentId#')  title='Delete Task Version'><span class='fa fa-trash'></span></a><a style='font-size:20px;cursor:pointer; margin-left:5px' onClick= fnLoadImageInDiv('#=attachement#')  title='Download Attachment'><span class='fa fa-download'></span></a>"
        }];

    BindkendoGrid('taskversion-grid', 50, colModel, _data);
};


function ShowCheckListDetail(e) {
    debugger;
    var row = $(e).closest("tr");
    var grid = $("#taskversion-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#div-show-checklist').html(dataItem.checkList);
    $('#div-desciption').html(dataItem.description)
    $('#checklist-and-description-modal').modal('show');
}
$('#btn-close-checklist-modal').click(function () {
    $('#checklist-and-description-modal').modal('hide');
})

function LoadTaskVersionRecordByID(e) {
 
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Task/Task/TaskVersionDetail?taskVersionID=' + dataItem.taskVersionID + '';
}

function EditDetail(e) {
 
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    //window.location.href = '/Task/Task/Save?taskID=' + dataItem.taskId + '';
    window.location.href = '/Task/Task/VersionSave?taskVersionID=' + dataItem.taskVersionID ;
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

function fnLoadImageInDiv(e) {
    debugger;
    var row = $(e).closest("tr");
    var grid = $("#taskversion-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
     if (dataItem.attachement.split('.')[1] == 'jpg' || dataItem.attachement.split('.')[1] == 'jpeg' || dataItem.attachement.split('.')[1] == 'png') {
            $('.showImage').show();
            $('.showImage').empty('')
            $('.showImage').append("<img class='img-circle' src='../../Temp/" + dataItem.attachement + "' style='width:100%' />")
         //   DownloadAttachment();
         window.open('../../Temp/' + dataItem.attachement, '_blank');
        } else {
            window.open('../../Temp/' + dataItem.attachement, '_blank');
        }
    ChangeStatusIntoProgress();
    debugger;
    LoadtaskVersionKendo();

    //    $('.showImage').show();
    //    $('.showImage').empty('')
    //    $('.showImage').append("<img class='img-circle' src='../../Temp/" + dataItem.attachement + "' style='width:100%' />")
    //DownloadAttachment();
    //if (dataItem.issueStatusID == 'NotStartedYet' || dataItem.issueStatusID == 'Rejected') {
        //$('.showImage').show();
        //$('.showImage').empty('')
        //$('.showImage').append("<img class='img-circle' src='../../Temp/" + dataItem.attachement + "' style='width:100%' />")
        //DownloadAttachment();
       //// ChangeStatusIntoProgress();
    //} else {
        //if (dataItem.attachement.split('.')[1] == 'jpg' || dataItem.attachement.split('.')[1] == 'jpeg' || dataItem.attachement.split('.')[1] == 'png') {
            //$('.showImage').show();
            //$('.showImage').empty('')
            //$('.showImage').append("<img class='img-circle' src='../../Temp/" + dataItem.attachement + "' style='width:100%' />")
            //DownloadAttachment();
        //} else {
            //window.open('../../Temp/' + dataItem.attachement, '_blank');
        //}
    //}

  
    
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