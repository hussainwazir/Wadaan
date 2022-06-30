
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

    // Save Button Function .
    $('#btnSave').on('click', function (e) {

        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateDesignation')) {

            $("#frmAddUpdateDesignation").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    clearform();

                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    window.location.href = '/Account/Account/ChartOfAccounts';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateDesignation").ajaxSubmit(options);

        }
        else return false;
    });

});

//KindoDatePiker For Module ExpiryDate.
 

var clearform = function () {
    $('#frmAddUpdateDesignation').trigger('reset');
}

$('.reset_btn').click(function () {
    $('#frmAddUpdateDesignation').trigger('reset');
});


//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------



function LoadAccount() { KendoGlobalAjax({ commandName: 'CategoryType_SelectDDL', values: '{}', CallBack: getLoadAccount }); }


//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------


function LoadCustomerDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {

        KendoGlobalAjax({ commandName: 'Account_SelectByID', values: { ID: id }, CallBack: loadAccountDataByID });

    }

}




