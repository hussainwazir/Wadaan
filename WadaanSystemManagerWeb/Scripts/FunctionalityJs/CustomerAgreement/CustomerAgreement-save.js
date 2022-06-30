
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
    LoadCustomers();
   
    $('#btnSave').on('click', function (e) {
       
        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateCustomerAggrement')) {

            $("#frmAddUpdateCustomerAggrement").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //LoadEmployeesKendo();
                    window.location.href = '/CustomerAgreement/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateCustomerAggrement").ajaxSubmit(options);
        }
        else return false;
    });
});

function LoadKendoDates() {
   
    $("#agreementsCopy").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    $("#startDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    $("#enDDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
}

$('.reset_btn').click(function () {
    $('#frmAddUpdateCustomerAggrement').trigger('reset'); 
});

$('.btn_close').click(function () {
    $('#frmAddUpdateCustomerAggrement').trigger('reset');
});

//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadDepartment() { KendoGlobalAjax({ commandName: 'listDepartmentDDL', values: '{}', CallBack: getLoadDepartment }); }
//var getLoadDepartment = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#DepartmentID"), "Select Department"); }


function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryId"), "Select Country"); }


function LoadCustomers() { KendoGlobalAjax({ commandName: 'Customers_SelectDDL', values: '{}', CallBack: getLoadCustomers }); }
var getLoadCustomers = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#customer"), "Select Customer"); }

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------


function LoadCustomerDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'CustomerAgreement_SelectByID', values: "{referenceID:'" + id + "'}", CallBack: loadCustomerAgreementDataByID });  
    }
}
var loadCustomerAgreementDataByID = function (d) {
    $('.divAttachment').hide();
    setTimeout(function () {
 
        $('input,select,textarea').removeClass('error');
        $('#referenceID').val(JSON.parse(d.Value)[0].referenceID);
        $('#customer').val(JSON.parse(d.Value)[0].customer);
        $('#startDate').val(JSON.parse(d.Value)[0].startDate);
        $('#endDdate').val(JSON.parse(d.Value)[0].endDdate);
        $('#busesMounthlyAmount').val(JSON.parse(d.Value)[0].busesMounthlyAmount); 
       $('#remarks').val(JSON.parse(d.Value)[0].remarks);

    }, 50);


}