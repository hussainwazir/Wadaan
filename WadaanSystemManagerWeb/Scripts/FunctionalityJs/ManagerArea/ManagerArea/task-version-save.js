
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    LoadKendoDates();
    LoadEmployeesDDL();
    LoadTasksDDL();
    LoadTaskVersionDataByID();
});
//--------------------------- CUSTOM BUTTON WORK FOR BULK INSERTION START ----------------------------
$('#btnSave').on('click', function (e) {

    $("#Description").val(tinymce.get("Description").getContent({ format: "html" }));

    if (customvalidateForm('frmAddUpdateVersion')) {

        //ButtonLoader
        var key = document.getElementById("btnSave");
        key.disabled = true;
        key.innerHTML = '<i class = "fa fa - spinner fa - spin"></i> Please wait...';

        $("#frmAddUpdateVersion").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                Swal.fire({
                    icon: 'success',
                    title: 'Record saved successfully...',
                    showConfirmButton: false,
                    timer: 1500
                });
                //  LoadEmployeesKendo();
                window.location.href = '/Task/Task/Index';
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateVersion").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        return false;
    }
});



//--------------------------- CUSTOM BUTTON WORK FOR BULK INSERTION START ----------------------------
function LoadKendoDates() {
    $("#VersionDate").kendoDatePicker({
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



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------




function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#AssigneeID"), "Select Employee");
    //  BindkendoMultiSelect(JSON.parse(d.Value), $("#NotificationFollowersddl"), "");
    //var optional = $("#NotificationFollowersddl").kendoMultiSelect({ autoClose: false }).data("kendoMultiSelect");
}
function LoadTasksDDL() {
    KendoGlobalAjax({ commandName: 'Task_SelectDDL', values: '{}', CallBack: fnLoadTasks });
}
var fnLoadTasks = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#TaskId"), "Select Tasks");
}
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadTaskVersionDataByID() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'TaskVersion_SelectByID', values: { TaskVersionID: id }, CallBack: fnloadTaskVersionData });
    }

}
var fnloadTaskVersionData = function (d) {

    setTimeout(function () {
        //$('input,select,textarea').removeClass('error');

        $('#TaskVersionID').val(JSON.parse(d.Value)[0].taskVersionID);
        $('#Subject').val(JSON.parse(d.Value)[0].subject).trigger('change');
        $('#TaskId').val(JSON.parse(d.Value)[0].taskId).trigger('change');;
        $('#AssigneeID').val(JSON.parse(d.Value)[0].assigneeID).trigger('change');;
        $('#AssigneeID').val(JSON.parse(d.Value)[0].assigneeID).trigger('change');;
        $('#Status').val(JSON.parse(d.Value)[0].status).trigger('change');;
        $('#VersionDate').val(JSON.parse(d.Value)[0].versionDate);
        $('#Description').val(JSON.parse(d.Value)[0].description);
        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);


}


//function LoadStore() { KendoGlobalAjax({ commandName: 'listStoreDDL', values: '{}', CallBack: getLoadStore }); }
//var getLoadStore = function (d) {

//    BindkendoMultiSelect(JSON.parse(d.Value), $("#NotificationFollowersddl"), "");


//    var optional = $("#NotificationFollowersddl").kendoMultiSelect({
//        autoClose: false
//    }).data("kendoMultiSelect");

//}

