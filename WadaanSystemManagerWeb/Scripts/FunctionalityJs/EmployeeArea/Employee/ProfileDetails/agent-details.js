 

$(document).ready(function () {
    //--------------- RETRIEVE   AGENTS DETAILS DATA start----------------------------

   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    LoadUserDetail();
    //--------------- RETRIEVE   AGENTS DETAILS DATA End----------------------------
 
});
//$('#FkGuidId').val(window.localStorage.getItem("userId"));
$('#btn-update-profile').click(function () {

    loadProfileData();
});

$('#btn-close-modal').click(function () {
    $('#profile-update-modal').modal('hide');
});


function loadProfileData() {

    KendoGlobalAjax({ commandName: 'ProfileData_SelectDetailByID', values: { UserID: userId }, CallBack: fnLoadProfileData });
}

var fnLoadProfileData = function (d) {
   
     
    setTimeout(function () {

        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        //$('#EmployeeID').val(JSON.parse(d.value)[0]["employeeID"]);
        $('#ImageID').val(JSON.parse(d.Value)[0]["imageID"]);
        $('#FirstName').val(JSON.parse(d.Value)[0]["firstName"]);
        $('#LastName').val(JSON.parse(d.Value)[0]["lastName"]);
        $('#MobilePhone').val(JSON.parse(d.Value)[0]["mobilePhone"]);
        $('#WhatsApp').val(JSON.parse(d.Value)[0]["whatsApp"]);
        //$('.mobileNumber').text(JSON.parse(d.Value)[0]["mobilePhone"])
        //$('.email').text(JSON.parse(d.Value)[0]["emailAddress"]);
        $('#CurHouseNo').val(JSON.parse(d.Value)[0]["curHouseNo"]);
        $('#CurStreetNo').val(JSON.parse(d.Value)[0]["curStreetNo"]);
        //$('.City').text(JSON.parse(d.Value)[0]["curCity"]);
        //$('.Province').text(JSON.parse(d.Value)[0]["curProvince"]);
        //$('.Address').text(JSON.parse(d.Value)[0]["curPostalAddress"]);
        //$('.Designation').text(JSON.parse(d.Value)[0]["designationName"]);
        //$('.empType').text(JSON.parse(d.Value)[0]["employeeTypeName"]);
        ////$('#CustomerImges').append(
        $('#Password').val(JSON.parse(d.Value)[0]["password"]);
        $('#UserName').val(JSON.parse(d.Value)[0]["username"]);
        //$('.employeImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
        
        if (JSON.parse(d.Value)[0]["imgPath"] != null) {

        $('.ProfileImage2').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
        }

    }, 50);
    $('#profile-update-modal').modal('show');
}


$('#btnSave').click(function () {
    $('#EmployeeID').val(userId);
    if (customvalidateForm('frmAddUpdateProfile')) {

        $("#frmAddUpdateProfile").ajaxForm();

        //ButtonLoader
        var btn = document.getElementById('btnSave');
       // btn.disabled = true;
        //btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

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
        $("#frmAddUpdateProfile").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
        return false;
    }

});


// Update Image of Profile

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

function LoadUserDetail() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);
    KendoGlobalAjax({ commandName: 'ProfileData_SelectDetailByID', values: { UserID: userId }, CallBack: fnLoadUserDetailByID });
    // KendoGlobalAjax({ commandName: 'Images_SelectImagesByEmployeeID', values: "{EmployeeID:'" + id + "'}", CallBack: loadEmployeeImagesByID });
}

var fnLoadUserDetailByID = function (d) {
   
    setTimeout(function () {
   
        $('#FkGuidId').val(JSON.parse(d.Value)[0]["employeeID"]);
        $('#fullName').text(JSON.parse(d.Value)[0]["employeeName"]);
        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        $('#fullName').text(JSON.parse(d.Value)[0]["employeeName"]);
        $('#designation').text("Role:"+' '+ JSON.parse(d.Value)[0]["roleName"]);
        $('.firstName').text(JSON.parse(d.Value)[0]["firstName"]);
        $('.lastName').text(JSON.parse(d.Value)[0]["lastName"]);
        $('.phoneNo').text(JSON.parse(d.Value)[0]["mobilePhone"]);
        $('.whatsApp').text(JSON.parse(d.Value)[0]["whatsApp"]);
        $('.mobileNumber').text(JSON.parse(d.Value)[0]["mobilePhone"])
        $('.email').text(JSON.parse(d.Value)[0]["emailAddress"]);
        $('.houseNo').text(JSON.parse(d.Value)[0]["curHouseNo"]);
        $('.streetNo').text(JSON.parse(d.Value)[0]["curStreetNo"]);
        $('.City').text(JSON.parse(d.Value)[0]["curCity"]);
        $('.Province').text(JSON.parse(d.Value)[0]["curProvince"]);
        $('.Address').text(JSON.parse(d.Value)[0]["curPostalAddress"]);
        $('.Designation').text(JSON.parse(d.Value)[0]["designationName"]);
        $('.empType').text(JSON.parse(d.Value)[0]["employeeTypeName"]);
        ////$('#CustomerImges').append(
       
	  
        $('.txt-PECPCATPNo').text(JSON.parse(d.Value)[0]["pecpcatpNo"]);
        $('.txt-fromDate').text(JSON.parse(d.Value)[0]["fromDate"]);
        $('.txt-toDate').text(JSON.parse(d.Value)[0]["toDate"]);
	  
	  
	  
        if (JSON.parse(d.Value)[0]["imgPath"] != null) {

            $('.ProfileImage2').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
        }
        //$('.employeImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
     //   $('.ProfileImage2').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);

    }, 50);
}


////-----------------------------------------------   Agents Details Start-------------------------------------------------------

//var loadAgentDetails = function (d) {
//    setTimeout(function () {
//         $('#txt-sub-agent-name').text(JSON.parse(d.Value).name);
//        $('#txt-sub-agent-name-in-subcontact').text(JSON.parse(d.Value).name);
//        $('#txt-agent-fullname').text(JSON.parse(d.Value).name);
//        $('#txt-sub-agent-description').text(JSON.parse(d.Value).description.substring(0, 100));
//        $('#txt-long-description').text(JSON.parse(d.Value).description);
//        $('#txt-dob').text(JSON.parse(d.Value).age);
//        $('#txt-location').text(JSON.parse(d.Value).address);
//        $('#txt-contact-number').text(JSON.parse(d.Value).phoneNo);
//        $('#txt-gender').text(JSON.parse(d.Value).gender);
//        $('#txt-sub-agent-role').text(JSON.parse(d.Value).position);
//        $('#txt-email').text(JSON.parse(d.Value).email);
//        $('#txt-username').text(JSON.parse(d.Value).username);

//        //  $('#txt-days-counts').text(JSON.parse(d.Value)[0]["days"] + " days ago");
//        $('#txt-days-counts').text(JSON.parse(d.Value).days + " days ago");
//        $('.bigImg').attr('src', '../../Temp/' + JSON.parse(d.Value).imageName);
//        $('.sub-agent-img-in-contact-list').attr('src', '../../Temp/' + JSON.parse(d.Value).imageName);
//    }, 100);
//}
//function LoadAgentDetails(id) {

//    var full_url = document.URL; // Get current url
//    var url_array = full_url.split('='); //Split 
//    id = url_array[url_array.length - 1];//Get ID


//    KendoGlobalAjax({ commandName: 'getagentbyid', values: "{id:'" + id + "'}", CallBack: loadAgentDetails });

//}
 //-----------------------------------------------   Agent Details End-------------------------------------------------------

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

