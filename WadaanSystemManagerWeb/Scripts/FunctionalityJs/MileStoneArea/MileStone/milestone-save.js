
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

 
    LoadMileStoneDataByID();
 
      LoadKendoDates();

    $('#btnSave').on('click', function (e) {
      
        $("#Description").val(tinymce.get("Description").getContent({ format: "html" }));
        if (customvalidateForm('frmAddUpdateMileStone')) {

            $("#frmAddUpdateMileStone").ajaxForm();

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
                    //  LoadEmployeesKendo();
                    window.location.href = '/MileStone/MileStone/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateMileStone").ajaxSubmit(options);

        }
        else {

            btn.disabled = true;
            btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
            return false;
        } 
    });

});
function LoadKendoDates() {
    $("#StartDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
      $("#EndDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    
}






$('.reset_btn').click(function () {
    $('#frmAddUpdateMileStone').trigger('reset'); 
});
$('.btn_close').click(function () {
    $('#frmAddUpdateMileStone').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------
 


//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadMileStoneDataByID() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'MileStone_SelectByID', values: { MileStoneID:id}, CallBack: loadMileStoneDataByID });  
    }

}
var loadMileStoneDataByID = function (d) {
    
    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
        
      
        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);
        $('#MilestoneID').val(JSON.parse(d.Value)[0].milestoneID);
        $('#Name').val(JSON.parse(d.Value)[0].name);
        $('#Description').val(JSON.parse(d.Value)[0].description);   
        $('#StartDate').val(JSON.parse(d.Value)[0].startDate);   
        $('#EndDate').val(JSON.parse(d.Value)[0].endDate);   
        $('#Status').val(JSON.parse(d.Value)[0].status).trigger('change');
     
    }, 50);


}

