
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
    //LoadDepartment();
    //LoadCustomerDataByID();
    //LoadCountry();
    LoadKendoDates();
    // LoadCompany();
     
    $('#btnSave').on('click', function (e) {
       // $('#CustomerType').val($('#CustomerTypeDDL :selected').val());
        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateCustomer')) {

            $("#frmAddUpdateCustomer").ajaxForm();


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
                  
                    //LoadEmployeesKendo();
                    window.location.href = '/Customer/Index';  
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateCustomer").ajaxSubmit(options);

        }
        else return false;
    });

});
function LoadKendoDates() {
    $("#licenseExpiryDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    $("#certificateExpiryDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

}

var clearform = function () { $('.reset_btn').click(); }

$('.reset_btn').click(function () {
    $('#frmAddUpdateCustomer').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateCustomer').trigger('reset');

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
        KendoGlobalAjax({ commandName: 'Customer_SelectByID', values: "{CustomerID:'" + id + "'}", CallBack: loadCustomersDataByID });
    }

}
var loadCustomersDataByID = function (d) {

    setTimeout(function () {
       
        $('input,select,textarea').removeClass('error');
         

        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);
        $('#customerID').val(JSON.parse(d.Value)[0].customerID);
        $('#fullName').val(JSON.parse(d.Value)[0].fullName);       
        $('#contactPersonOne').val(JSON.parse(d.Value)[0].contactPersonOne);
        $('#contactPersonTwo').val(JSON.parse(d.Value)[0].contactPersonTwo);
        $('#contactPersonThree').val(JSON.parse(d.Value)[0].contactPersonThree);
        $('#personContact1').val(JSON.parse(d.Value)[0].personContact1);
        $('#personContact2').val(JSON.parse(d.Value)[0].personContact2);
        $('#personContact3').val(JSON.parse(d.Value)[0].personContact3);
        $('#mobileNo').val(JSON.parse(d.Value)[0].mobileNo);
        $('#phone').val(JSON.parse(d.Value)[0].phone);
        $('#trnNo').val(JSON.parse(d.Value)[0].trnNo);
        $('#email').val(JSON.parse(d.Value)[0].email);
        $('#address').val(JSON.parse(d.Value)[0].address);
        $('#poBox').val(JSON.parse(d.Value)[0].poBox);
        $('#typee').val(JSON.parse(d.Value)[0].type).trigger('change'); 


    }, 50);


}

function fnAssignTypeToCustomer(value) {
    setTimeout(function () {
        $('#CustomerType').val('');
        $('#CustomerType').val(value);
      
    }, 20);
    if (value == "Corporate") {
        $('.div-individual').show();
      
    } else {
        $('.div-individual').hide();
        $('#ContactPersonName').val('');
        $('#CorporatePersonTelephone').val('');
    }


}

function fnCheckValidEmail(e) {  
    validateEmail(e);
 
}