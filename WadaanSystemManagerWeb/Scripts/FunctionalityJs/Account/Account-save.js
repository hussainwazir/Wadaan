
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
 
// Save Button Function .
   
    $('#btnSave').on('click', function (e) {
   
        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateStudent')) {

            $("#frmAddUpdateStudent").ajaxForm();


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
                    window.location.href = '/Student/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateStudent").ajaxSubmit(options);

        }
        else return false;
    });

});

//KindoDatePiker For Module ExpiryDate.
function LoadKendoDates() {

    $("#registrationCardExpiry").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

}

var clearform = function () { $('.reset_btn').click(); }

$('.reset_btn').click(function () {
    $('#frmAddUpdateStudent').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateStudent').trigger('reset');

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
        KendoGlobalAjax({ commandName: 'Student_SelectByID', values: "{StudentID:'" + id + "'}", CallBack: loadStudentDataByID });
    }

}

var loadStudentDataByID = function (d) {

    setTimeout(function () {
        
        $('input,select,textarea').removeClass('error');
        $('#studentID').val(JSON.parse(d.Value)[0].studentID);
        $('#name').val(JSON.parse(d.Value)[0].name);       
        $('#fname').val(JSON.parse(d.Value)[0].fName);            //Change ModelNo to model 
        $('#fContactNo').val(JSON.parse(d.Value)[0].fContactNo); //Change drivername to driver 
        $('#mname').val(JSON.parse(d.Value)[0].mName);          //Added Ownership Model Added
        $('#mContactNo').val(JSON.parse(d.Value)[0].mContactNo);  
        $('#grade').val(JSON.parse(d.Value)[0].grade);
        $('#section').val(JSON.parse(d.Value)[0].section);
        $('#sGroup').val(JSON.parse(d.Value)[0].sGroup);
        $('#feeMonthly').val(JSON.parse(d.Value)[0].feeMonthly);
        $('#Address').val(JSON.parse(d.Value)[0].address);     
      

    }, 50);


}


