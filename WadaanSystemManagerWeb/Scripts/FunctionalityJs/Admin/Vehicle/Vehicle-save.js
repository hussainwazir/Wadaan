
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {
    // fnAssignTypeToCustomer($('#CustomerTypeDDL :selected').val())

//---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

   
    LoadCustomerDataByID();
    LoadKendoDates();
 
// Save Button Function 
    $('#btnSave').on('click', function (e) {
   
        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateVehicle')) {

            $("#frmAddUpdateVehicle").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    clearform();
                    $('.btn_close').click();
                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //l
                    window.location.href = '/Vehicles/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateVehicle").ajaxSubmit(options);

        }
        else return false;
    });

});

//KindoDatePiker For Module ExpiryDate.
function LoadKendoDates() {

    $("#RegistrationCardExpiry").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

    $("#Dotpermitexpirydate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

    $("#TypeChangeCertificateExpiry").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

    $("#ColorExpiry").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

}

var clearform = function () { $('.reset_btn').click(); }

$('.reset_btn').click(function () {
    $('#frmAddUpdateVehicle').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateVehicle').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadDepartment() { KendoGlobalAjax({ commandName: 'listDepartmentDDL', values: '{}', CallBack: getLoadDepartment }); }
//var getLoadDepartment = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#DepartmentID"), "Select Department"); }


function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryId"), "Select Country"); }

//function LoadCustomer() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCustomer = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryId"), "Select Country"); }

//function LoadCompany() { KendoGlobalAjax({ commandName: 'Company_SelectDDL', values: '{}', CallBack: getLoadCompany}); }
//var getLoadCompany = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CompanyID"), "Select Company"); }

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadCustomerDataByID() {
    
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Vehicles_SelectByID', values: "{VehicleID:'" + id + "'}", CallBack: loadVehicleDataByID });
    }

}

var loadVehicleDataByID = function (d) {

    setTimeout(function () {
        
        $('input,select,textarea').removeClass('error');
        $('#vehicleID').val(JSON.parse(d.Value)[0].vehicleID);
        $('#platNo').val(JSON.parse(d.Value)[0].platNo);       
        $('#model').val(JSON.parse(d.Value)[0].model);//Change ModelNo to model 
        $('#driver').val(JSON.parse(d.Value)[0].driver); //Change drivername to driver 
        $('#ownership').val(JSON.parse(d.Value)[0].ownership); //Added Ownership Model Added
        $('#made').val(JSON.parse(d.Value)[0].made);  
        $('#registrationcard').val(JSON.parse(d.Value)[0].registrationCard);
        $('#typeChangeCertificate').val(JSON.parse(d.Value)[0].typeChangeCertificate);
        $('#vehicleType').val(JSON.parse(d.Value)[0].type).trigger('change'); 

    }, 50);


}

/*  ******************** USE THIS FUNCTION ON onfocusout AND onkeydown**********************/
function fnAvoidNegavtiveNumber(Inputvalue)
{ //Inputvalue is input field value .
    var num = Inputvalue.value.match(/^\d+$/);
    if (num === null)
    {
        Inputvalue.value = "";
        false
    }

}

