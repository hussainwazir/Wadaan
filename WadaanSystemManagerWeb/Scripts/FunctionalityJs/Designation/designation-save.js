
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
 
 

    $('#btnSave').on('click', function (e) {
      
        var myarrayy = [];
 
        console.log(myarrayy);
        $('#DesignationMultipleDetails_Save_New').val(JSON.stringify(myarrayy));
        console.log($('#DesignationMultipleDetails_Save_New').val());
        //return;
        var btn = document.getElementById('btnSave');
        if (customvalidateForm('frmAddUpdateDesignation')) {
            $("#frmAddUpdateDesignation").ajaxForm();
            //ButtonLoader
            alert('HH');
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
                    DesignationInsertion(JSON.parse(JSON.parse(response)));
          
                  
                    window.location.href = '/Designation/Designation/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateDesignation").ajaxSubmit(options);
        }
 
    });
});



 


$('#UserName').focusout(function () {


    LoadCredentialData();

});


//<input type="text" class="form-control pname" id="Username" name="Username" placeholder="SheriMasood already exists.Try another..." style="border-color: rgb(217, 217, 217);">
//-------------------------- CHECK CREDENTIAL START-------------------------------------------------------------

 
 
function LoadCredentialData() {

    KendoGlobalAjax({ commandName: 'Check_Unique_Credential', values: $('#UserName').val(), CallBack: loadCredentialData });
}

var loadCredentialData = function (d) {



    if (JSON.parse(d.Value) != null) {

        if (this.values == JSON.parse(d.Value)["username"]) {
            $('#UserName').val('');
            document.getElementById("UserName").placeholder = JSON.parse(d.Value)["username"] + " already exists.Try another...";
            $('#UserName').css('border-color', 'red');
        } else { $('#UserName').css('border-color', '#d9d9d9'); }

    } else { $('#UserName').css('border-color', '#d9d9d9'); }

}

//-------------------------- CHECK CREDENTIAL END-------------------------------------------------------------
$('.reset_btn').click(function () {
    $('#frmAddUpdateDesignation').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateDesignation').trigger('reset');

});




 

function editRow(e) {
    var dataItem = JSON.parse($(e).closest('tr').find(".td-row-data").text());
    console.log(dataItem);

}

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




//function LoadDesignationDataByID() {

//    var full_url = document.URL;           // Get current url
//    var url_array = full_url.split('=');  //Split 
//    id = url_array[url_array.length - 1];//Get ID
//    if (id != url_array) {
//        KendoGlobalAjax({ commandName: 'Employee_SelectByID', values: { EmployeeID: id }, CallBack: loadDesignationDataByID });
//    }

//    var employeeUsername = document.getElementById('UserName');
//    employeeUsername.disable = true;

//}
 


$('#btn-add-row-to-designation').click(function () {


    var isValid = true;
    if ($("#Designation").val() == '' || $("#Designation").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Designation title is missing!',
            footer: ''
        })
        isValid = false;
    }


    
    if (isValid == true) {
    
        $("#tbl-designation-qualification-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="Designation">' + $("#Designation").val() + '</td><td style="text-align: left;" class="status">' + $('#status').is(":checked") + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left; "   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
        ClearControls();
    }

});

function ClearControls() {
    $('#Designation').val('');
 

}


function DesignationInsertion() {
    var myarray = [];

    $("#tbl-designation-qualification-detail tr").each(function (i, el) {
        var saveData = {
             
            Designation: el.children[0].textContent,
            status: el.children[1].textContent,       
            UserId: userId,
        }
        myarray.push(saveData);
        //////////////////////
        alert(myarray);
    });
    KendoGlobalAjax({ commandName: 'DesignationMultipleDetails_Save_New', values: { BulkDesignationDetails: myarray }, CallBack: showSuccessMessage });

}

function deleteRow(e) { $(e).closest("tr").remove(); }

var showSuccessMessage = function (d) {

    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
    // window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MEmployeeList';

}
