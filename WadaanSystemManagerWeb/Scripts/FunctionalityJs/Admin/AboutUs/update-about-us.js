
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
    LoadEmployeeDataByID();

});



function LoadEmployeeDataByID() { KendoGlobalAjax({ commandName: 'AboutUs_Select', values: {}, CallBack: loadEmployeesDataByID }); }
var loadEmployeesDataByID = function (d) {

    setTimeout(function () {

        $('#AboutUsId').val(JSON.parse(d.Value)[0].aboutUsId);
        $('#OurVision').val(JSON.parse(d.Value)[0].ourVision);
        $('#OurMission').val(JSON.parse(d.Value)[0].ourMission);
        $('#OurStories').val(JSON.parse(d.Value)[0].ourStories);
        $('#OurQualities').val(JSON.parse(d.Value)[0].ourQualities);
        $('#AboutUs').val(JSON.parse(d.Value)[0].description);


    }, 50);


}






$('#btnSave').on('click', function (e) {


    if (customvalidateForm('frmAddUpdateAboutUs')) {
        $("#frmAddUpdateAboutUs").ajaxForm();
        //ButtonLoader
        var btn = document.getElementById('btnSave');
        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        var options = {
            success: function (response, statusText, jqXHR) {
                Swal.fire({
                    icon: 'success',
                    title: 'Record saved successfully...',
                    showConfirmButton: false,
                    timer: 1500
                });
                location.reload();
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateAboutUs").ajaxSubmit(options);
    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
        return false;
    }
});


