
var userId = "";
var username = "";
var roleID = "";


var $grid = "assign-task-to-employee-grid";

$(document).ready(function () {
  
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadEmployeeDetails();
    LoadTaskAssignToEmployeeKendo();
});

function LoadEmployeeDetails() {
 
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);
 
    KendoGlobalAjax({ commandName: 'Employee_SelectByID', values: { EmployeeID: id }, CallBack: loadEmployeeDetailsByID });
   // KendoGlobalAjax({ commandName: 'Images_SelectImagesByEmployeeID', values: "{EmployeeID:'" + id + "'}", CallBack: loadEmployeeImagesByID });


}
var loadEmployeeDetailsByID = function (d) {
 
   
    setTimeout(function () {
      
        $('.UserName').text(JSON.parse(d.Value)[0]["firstName"] +' '+ JSON.parse(d.Value)[0]["lastName"]);
        $('.firstName').text(JSON.parse(d.Value)[0]["firstName"]);
        $('.lastName').text(JSON.parse(d.Value)[0]["lastName"]);
        $('.phoneNo').text(JSON.parse(d.Value)[0]["mobilePhone"]);
        $('.whatsApp').text(JSON.parse(d.Value)[0]["whatsApp"]);
        $('.Address').text(JSON.parse(d.Value)[0]["curPostalAddress"]);
        $('.Role').text(JSON.parse(d.Value)[0]["roleName"]);
        $('.houseNo').text(JSON.parse(d.Value)[0]["perHouseNo"]);
        $('.streetNo').text(JSON.parse(d.Value)[0]["perStreetNo"]);
        $('.townSector').text(JSON.parse(d.Value)[0]["perTownSector"]);
        $('.province').text(JSON.parse(d.Value)[0]["perProvince"]);
        $('.city').text(JSON.parse(d.Value)[0]["perCity"]);
        $('.EducationLevel').text(JSON.parse(d.Value)[0]["educationLevel"]);
        $('.DegreeTitle').text(JSON.parse(d.Value)[0]["degreeTitle"]);
        $('.ObtainedTotalMarks').text(JSON.parse(d.Value)[0]["obtainedTotalMarks"]);
        $('.PassingYear').text(JSON.parse(d.Value)[0]["passingYear"]);
        $('.InstituteName').text(JSON.parse(d.Value)[0]["instituteName"]);
        $('.JobTitle').text(JSON.parse(d.Value)[0]["jobTitle"]);
        $('.EmployerName').text(JSON.parse(d.Value)[0]["employerName"]);
        $('.EmployerAddress').text(JSON.parse(d.Value)[0]["employerAddress"]);
        $('.FromDate').text(JSON.parse(d.Value)[0]["fromDate"]);
        $('.ToDate').text(JSON.parse(d.Value)[0]["toDate"]);
       
        $('.PECPCATPNo').text(JSON.parse(d.Value)[0]["pecpcatpNo"]);
        $('.PIRegistrationDate').text(JSON.parse(d.Value)[0]["PIRegistrationDate"]);
        $('.PIExpiryDate').text(JSON.parse(d.Value)[0]["PIExpiryDate"]);
       
        $('.DOAppointmentFrom').text(JSON.parse(d.Value)[0]["dateOfAppointmentFrom"]);
        $('.DOAppointmentTo').text(JSON.parse(d.Value)[0]["dateOfAppointmentTo"]);

        
 
        //$('#CustomerImges').append(

       
        if (JSON.parse(d.Value)[0]["imgPath"] != null) {

        $('.employeImage2').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
        }
        
        
    }, 50);
}


function LoadTaskAssignToEmployeeKendo() {
  
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'Task_SelectByEmployeeID', values: { EmployeeID : id}, CallBack: loadAssignTaskToEmployee });
}

var loadAssignTaskToEmployee = function (d) {
    KendoGrid(JSON.parse(d.Value));
}

var KendoGrid = function (_data) {
    
    

    var colModel = [

        { field: "taskTitle", title: "Task Title", width: 80, filterable: true },
        { field: "taskStatus", title: "Task Status", width: 140, filterable: true },
        { field: "dueDate", title: "Due Date", width: 120, filterable: true },
    ];
    BindkendoGrid($grid, 50, colModel, _data);
};


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
//update Image of Profile model Hide & Show
$('#btn-update-profile').click(function () {

    loadProfileData();
});

$('#btn-close-modal').click(function () {
    $('#profile-update-modal').modal('hide');
});





//update Image of Profile
$('#btnUploadImage').click(function () {

    if (customvalidateForm('frmAddUpdateProfileImage')) {

        $("#frmAddUpdateProfileImage").ajaxForm();

        //ButtonLoader
        var btn = document.getElementById('btnSave');
        // btn.disabled = true;
        // btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

        var options = {
            success: function (response, statusText, jqXHR) {

                Swal.fire({
                    icon: 'success',
                    title: 'Record saved successfully...',
                    showConfirmButton: false,
                    timer: 1500
                });
                $('#profile-update-modal').modal('hide');
                window.location.reload();
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateProfileImage").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
        return false;
    }

});

$('#btn-close-image-modal').click(function () {
    $('#small-Modal').modal('hide');
});
$('#btn-open-image-modal').click(function () {
    fnLoadImageModal();
});
function fnLoadImageModal() {

    $('#small-Modal').modal('show');
    //$('#small-Modal').addClass('md-close').removeClass('md-show');

}
 