
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    var ProjectID = window.localStorage.getItem("ProjectID");


    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   

    $("#UserID").val(userId);
    LoadKendoDates();
    LoadProjectsDDL();
    LoadEmployeesDDL();
    //LoadCatIssuesDDL();
    //LoadCatTypeIssuesDDL();
    LoadPriorityDDL();
    LoadMileStoneDDL();
    LoadQuestionsDDL();
    LoadReportedByDDL();
    LoadTaskDataByID();

    if (window.localStorage.getItem("ProjectID") != "") {
        setTimeout(function () {
            $('#ProjectID').val(window.localStorage.getItem("ProjectID"));
            $('#select2-ProjectID-container').text($('#ProjectID :selected').text());
            window.localStorage.setItem("ProjectID", '');

        }, 1000);
    }



});
//--------------------------- CUSTOM BUTTON WORK FOR BULK INSERTION START ----------------------------
$('#btnSave').on('click', function (e) {

    $("#UserID").val(userId);
    $("#Description").val(tinymce.get("Description").getContent({ format: "html" }));
    $("#Summary").val(tinymce.get("Summary").getContent({ format: "html" }));

    if ($('#NotificationFollowersddl').val() == '00000000-0000-0000-0000-000000000000' || $('#NotificationFollowersddl').val().length == 0) {
        $('.k-multiselect').css('border', '1px solid red');
        return false
    } else {
        $('.k-multiselect').css('border', 'transparent');
    }
    if (customvalidateForm('frmAddUpdateTask')) {

        var btn = document.getElementById('btnSave'); btn.disabled = true; btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

        $("#frmAddUpdateTask").ajaxForm();


        var options = {
            success: function (response, statusText, jqXHR) {
                DeleteNotificationFollowers();
                itemListInsertion(JSON.parse(JSON.parse(response)));


            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateTask").ajaxSubmit(options);

    }
    else return false;
});


function itemListInsertion(TaskID) {
    var myarray = [];

    $("#NotificationFollowersddl :selected").map(function (i, el) {

        var saveData = {
            TaskID: TaskID,
            EmployeeID: $(el).val(),
            UserID: userId,
            ProjectID: $('#ProjectID :selected').val()
        }
        myarray.push(saveData);


    });
    KendoGlobalAjax({
        commandName: 'Task_EmployeeFollowersMultipleID_Save', values: { Task_EmployeeFollowersMultipleIDs: myarray }, CallBack: showSuccessMessage
    });

}
var showSuccessMessage = function (d) {

    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MTaskList';

}

//--------------------------- CUSTOM BUTTON WORK FOR BULK INSERTION START ----------------------------




function LoadKendoDates() {
    $("#DueDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    $("#ReportedDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

}


$('.reset_btn').click(function () {
    $('#frmAddUpdateTask').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateTask').trigger('reset');

});

function EstimateTotalTime() {

    //There was an issue in kendo date picker therfore this procedure is followed
    var ReportedDate = $("#ReportedDate").val();
    var CurrentDay = ReportedDate.substr(0, 2);
    var month = ReportedDate.substr(3, 2);
    var year = ReportedDate.substr(6, 4);
    var RDate = month + '/' + CurrentDay + '/' + year;


    var DueDate = $("#DueDate").val();
    var DDay = DueDate.substr(0, 2);
    var Dmonth = DueDate.substr(3, 2);
    var Dyear = DueDate.substr(6, 4);
    var DDate = Dmonth + '/' + DDay + '/' + Dyear;


    var date1 = new Date(RDate);
    var date2 = new Date(DDate);


    if (date1 < date2) {
        const diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {


            var totalHours = diffDays * 24;
            var totalMinutes = totalHours * 60;
            var totalSeconds = totalMinutes * 60;



            $('#TotalEstimatedTime').val(diffDays + ' Days' + ' ' + totalHours + ' Hours');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Reported date is greater than Due Date!',
            footer: ''
        })
        $('#TotalEstimatedTime').val('');
    }

}

//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------

function LoadMilestoneDDL() {
    KendoGlobalAjax({ commandName: 'MileStone_SelectDDL', values: '{}', CallBack: fnLoadMilestoneDDL });
}
var fnLoadProjects = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#MilestoneID"), "Select MileStone");
}


function LoadProjectsDDL() {
    KendoGlobalAjax({ commandName: 'Project_SelectDDL', values: '{}', CallBack: fnLoadProjects });
}
var fnLoadProjects = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProjectID"), "Select Project");
}
function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#AssigneeID"), "Select Employee");
    BindkendoMultiSelect(JSON.parse(d.Value), $("#NotificationFollowersddl"), "");


    var optional = $("#NotificationFollowersddl").kendoMultiSelect({ autoClose: false }).data("kendoMultiSelect");


}


function LoadReportedByDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadReportedByDDL });
}
var fnLoadReportedByDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ReportedBy"), "Select Reported By");
}




function LoadCatIssuesDDL() {
    KendoGlobalAjax({ commandName: 'Categor_IssueSelectDDL', values: '{}', CallBack: fnLoadCatIssues });
}
var fnLoadCatIssues = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#IssueTypeId"), "Select Issue");
}

function LoadCatTypeIssuesDDL() {
    KendoGlobalAjax({ commandName: 'CategorType_IssueSelectDDL', values: '{}', CallBack: fnLoadCatTypeIssues });
}
var fnLoadCatTypeIssues = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#IssueStatusID"), "Select Issue Type");
}
function LoadPriorityDDL() {
    KendoGlobalAjax({ commandName: 'Categor_PrioritySelectDD', values: '{}', CallBack: fnLoadPriority });
}
var fnLoadPriority = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#IssuePriority"), "Select Priority");
}

function LoadMileStoneDDL() {
    KendoGlobalAjax({ commandName: 'MileStoneSelectDDL', values: '{}', CallBack: fnLoadMileStone });
}
var fnLoadMileStone = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#MilestoneID"), "Select MileStone");
}


function LoadQuestionsDDL() {
    KendoGlobalAjax({ commandName: 'Questions_SelectDDL', values: '{}', CallBack: fnLoadQuestionse });
}
var fnLoadQuestionse = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#QAID"), "Select Questions");
}
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadTaskDataByID() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Task_SelectByID', values: { TaskID: id }, CallBack: fnloadTaskData });
    }

}
var fnloadTaskData = function (d) {

    setTimeout(function () {
        //$('input,select,textarea').removeClass('error');
        $('#TaskId').val(JSON.parse(d.Value)[0].taskId);
        $('#MilestoneID').val(JSON.parse(d.Value)[0].milestoneID).trigger('change');
        $('#TaskTitle').val(JSON.parse(d.Value)[0].taskTitle);
        $('#ProjectID').val(JSON.parse(d.Value)[0].projectID).trigger('change');
        $('#QAID').val(JSON.parse(d.Value)[0].qAID).trigger('change');
        $('#AssigneeID').val(JSON.parse(d.Value)[0].assigneeID).trigger('change');
        $('#ReportedBy').val(JSON.parse(d.Value)[0].reportedBy).trigger('change');
        $('#ReportedDate').val(JSON.parse(d.Value)[0].reportedDate);
        $('#IssueTypeId').val(JSON.parse(d.Value)[0].issueTypeId).trigger('change');
        $('#IssueStatusID').val(JSON.parse(d.Value)[0].issueStatusID).trigger('change');
        $('#IssuePriority').val(JSON.parse(d.Value)[0].issuePriority).trigger('change');
        $('#IssueKey').val(JSON.parse(d.Value)[0].issueKey);
        $('#SourceType').val(JSON.parse(d.Value)[0].sourceType);
        $('#TicketType').val(JSON.parse(d.Value)[0].ticketType);
        $('#DueDate').val(JSON.parse(d.Value)[0].dueDate);
        $('#TotalEstimatedTime').val(JSON.parse(d.Value)[0].totalEstimatedTime);
        $('#Description').val(JSON.parse(d.Value)[0].description);
        $('#Summary').val(JSON.parse(d.Value)[0].summary);
        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
        LoadTaskFollowers();
    }, 50);
}


function LoadTaskFollowers() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Task_SelectNotificationFollowers', values: "{TaskID:'" + id + "'}", CallBack: fnLoadNotificationFollowers });
    }
}

var fnLoadNotificationFollowers = function (d) {
    console.log(d);

    setTimeout(function () {
        var storeArray = [];
        $.each(JSON.parse(d.Value), function (key, value) { storeArray.push(value.id) });
        $("#NotificationFollowersddl").data("kendoMultiSelect").value(storeArray);
    }, 200);
}


function DeleteNotificationFollowers() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'NotificationFollowers_DeleteByTaskID', values: "{TaskID:'" + id + "'}", CallBack: '' });
    }
}



