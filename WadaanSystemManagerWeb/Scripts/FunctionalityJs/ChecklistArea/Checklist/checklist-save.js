
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
    LoadChecklistDetailsByID();
   
  
    $('#btnSave').on('click', function (e) {
      
        
        if (customvalidateForm('frmAddUpdateChecklist')) {

          
            //Button Loader
            var btn = document.getElementById("btnSave");
            btn.disable = true;
            btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';


            $("#frmAddUpdateChecklist").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //  LoadEmployeesKendo();
                    window.location.href = '/ChecklistsArea/Checklists/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateChecklist").ajaxSubmit(options);
            
        }

        else {

            btn.disable = true;
            btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
            return false;
        } 
    });

});



$('.reset_btn').click(function () {
    $('#frmAddUpdateChecklist').trigger('reset'); 
});


$('.btn_close').click(function () {
    $('#frmAddUpdateChecklist').trigger('reset');

});



// For Updating the Existing Record in the Grid 
function LoadChecklistDetailsByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'CheckList_SelectById', values: { CheckListID: id }, CallBack: loadChecklistDetailsByID });
    }

   
    var loadChecklistDetailsByID = function (d) {

        setTimeout(function () {
     
            $('input,select,textarea').removeClass('error');

            $("#CheckListID").val(JSON.parse(d.Value)[0].checkListID);
            $("#TaskName").val(JSON.parse(d.Value)[0].taskName).trigger('change');
            $("#TaskStatus").val(JSON.parse(d.Value)[0].taskStatus).trigger('change');
            $("#Description").val(JSON.parse(d.Value)[0].description);


        }, 50);
    }


    $('.save_btn').click(function () {

        if ($("#TaskName").val() == "0") {

            $('span#select2-TaskName-container').css('border', '1px solid red').html("Select Status");
        }
        if ($("#TaskStatus").val() == "1") {

            $('span#select2-TaskStatus-container').css('border', '1px solid red').html("Select Task");

        }

    });
}