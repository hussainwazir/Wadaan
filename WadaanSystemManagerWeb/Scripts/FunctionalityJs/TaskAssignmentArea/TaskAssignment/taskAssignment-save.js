
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

    LoadEmployeesDDL();
    LoadProjectsDDL();
    LoadTasksDDL();
    LoadTaskAssignmentDataByID();
   

    $('#btnSave').on('click', function (e) {
       
        $("#Description").val(tinymce.get("Description").getContent({ format: "html" }));

        if (customvalidateForm('frmAddUpdateTaskAssignment')) {

            //ButtonLoader
            var key = document.getElementById("btnSave");
            key.disabled = true;
            key.innerHTML = '<i class = "fa fa - spinner fa - spin"></i> Please wait...';

            $("#frmAddUpdateTaskAssignment").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //  LoadEmployeesKendo();
                    window.location.href = '/TaskAssignment/TaskAssignment/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateTaskAssignment").ajaxSubmit(options);

        }
        else {

            btn.disabled = true;
            btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';
            return false;
        } 
    });

});
function LoadKendoDates() {
    $("#MeetingDate").kendoDatePicker({     
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
}





$('.reset_btn').click(function () {
    $('#frmAddUpdateTaskAssignment').trigger('reset'); 
});
$('.btn_close').click(function () {
    $('#frmAddUpdateTaskAssignment').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------
 
function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#EmployeeID"), "Select Employee");
}

function LoadProjectsDDL() {
    KendoGlobalAjax({ commandName: 'Project_SelectDDL', values: '{}', CallBack: fnLoadProjects });
}
var fnLoadProjects = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProjectID"), "Select Project");
}

function LoadTasksDDL() {
    KendoGlobalAjax({ commandName: 'Task_SelectDDL', values: '{}', CallBack: fnLoadTasks });
}
var fnLoadTasks = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#TaskId"), "Select Tasks");
}
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadTaskAssignmentDataByID() {
   
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'TaskAssignment_SelectByID', values: { TaskAssignmentID:id}, CallBack: loadTaskAssignementData });  
    }

}
var loadTaskAssignementData = function (d) {
  
 
    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
      
        $('#TaskAssignId').val(JSON.parse(d.Value)[0].taskAssignId);
        $('#Title').val(JSON.parse(d.Value)[0].title);
        $('#TaskId').val(JSON.parse(d.Value)[0].taskId).trigger('change');
        $('#EmployeeID').val(JSON.parse(d.Value)[0].employeeID).trigger('change');
        $('#ProjectID').val(JSON.parse(d.Value)[0].projectID).trigger('change');
        $('#Status').val(JSON.parse(d.Value)[0].status).trigger('change');
        $('#Remarks').val(JSON.parse(d.Value)[0].remarks);
        $('#Description').val(JSON.parse(d.Value)[0].description);
        
       // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);


} 