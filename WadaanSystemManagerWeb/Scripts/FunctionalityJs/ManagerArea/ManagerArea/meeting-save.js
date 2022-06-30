
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
    LoadMeetingDataByID();
    LoadEmployeesDDL();
    LoadClientsDDL();
    LoadProjectsDDL();


    $('#btnSave').on('click', function (e) {
    
        if ($('#ProjectID').val() == '00000000-0000-0000-0000-000000000000') {

            Swal.fire({
                icon: 'error',
                title: 'please select project...',
                showConfirmButton: false,
                timer: 1500
            });
        } 
        else if ($('#ClientID').val() == '00000000-0000-0000-0000-000000000000') {

            Swal.fire({
                icon: 'error',
                title: 'please select client...',
                showConfirmButton: false,
                timer: 1500
            });
        }
        else if ($('#EmployeeID').val() == '00000000-0000-0000-0000-000000000000') {

            Swal.fire({
                icon: 'error',
                title: 'please select employee...',
                showConfirmButton: false,
                timer: 1500
            });
        }
        $("#MeetingDiscussion").val(tinymce.get("MeetingDiscussion").getContent({ format: "html" }));
        if (customvalidateForm('frmAddUpdateMeeting')) {

            //ButtonLoader
            var key = document.getElementById("btnSave");
            key.disabled = true;
            key.innerHTML = '<i class = "fa fa - spinner fa - spin"></i> Please wait...';

            $("#frmAddUpdateMeeting").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //  LoadEmployeesKendo();
                    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MMeetingList';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateMeeting").ajaxSubmit(options);

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
    $('#frmAddUpdateMeeting').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateMeeting').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------

function LoadEmployeesDDL() {
    KendoGlobalAjax({ commandName: 'Employee_SelectDDL', values: '{}', CallBack: fnLoadEmployees });
}
var fnLoadEmployees = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#EmployeeID"), "Select Employee");
}

function LoadClientsDDL() {
    KendoGlobalAjax({ commandName: 'Client_SelectDDL', values: '{}', CallBack: fnGetLoadClient });
}
var fnGetLoadClient = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ClientID"), "Select Client");
}



function LoadProjectsDDL() {
    KendoGlobalAjax({ commandName: 'Project_SelectDDL', values: '{}', CallBack: fnLoadProjects });
}
var fnLoadProjects = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProjectID"), "Select Project");
}
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadMeetingDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Meeting_SelectByID', values: { MeetingID: id }, CallBack: loadMeetingData });
    }

}
var loadMeetingData = function (d) {


    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
      
        $('#MeetingID').val(JSON.parse(d.Value)[0].meetingID);
        $('#MeetingName').val(JSON.parse(d.Value)[0].meetingName);
        $('#ClientID').val(JSON.parse(d.Value)[0].clientID).trigger('change');
        $('#EmployeeID').val(JSON.parse(d.Value)[0].employeeID).trigger('change');
        $('#ProjectID').val(JSON.parse(d.Value)[0].projectID).trigger('change');
        $('#MeetingDate').val(JSON.parse(d.Value)[0].meetingDate);
        $('#MeetingDiscussion').val(JSON.parse(d.Value)[0].meetingDiscussion);
        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);

}
 

function loadClientDDl() {
    var selectedProject = $('#ProjectID').val();
    KendoGlobalAjax({ commandName: 'Client_selectByProjectID', values: { ProjectID: selectedProject }, CallBack: loadProjectDDLAgainstProject });

   
}

var loadProjectDDLAgainstProject = function (d) {
 
        $('#ClientID').val(JSON.parse(d.Value)[0].clientID).trigger('change');
}



