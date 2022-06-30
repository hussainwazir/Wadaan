
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {
    // fnAssignTypeToCustomer($('#CustomerTypeDDL :selected').val())
    $('.showHideRowOnChange').hide();
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    LoadKendoDates();
    LoadStudent();
   
    // Save Button Function 
    $('#btnSave').on('click', function (e) {
       
        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateRecipt')) {

            $("#frmAddUpdateRecipt").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    clearform();
                    $('.btn_close').click();
                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 800
                    });
                 //   LoadStudent();
                  location.reload();
                  //  $('#frmAddUpdateRecipt').trigger('reset');
                    //  window.location.href = '/Recipt/Index';

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateRecipt").ajaxSubmit(options);

        }
        else return false;
    });

});

//KindoDatePiker For Module ExpiryDate.
function LoadKendoDates() {


    $("#registrationExpiryDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

    $("#reciptDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

    $("#chequeDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    //$("#new").show();
    //$("#new").hide();
}



var clearform = function () { $('.reset_btn').click(); }

$('.reset_btn').click(function () {
    $('#frmAddUpdateRecipt').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateRecipt').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadDepartment() { KendoGlobalAjax({ commandName: 'listDepartmentDDL', values: '{}', CallBack: getLoadDepartment }); }
//var getLoadDepartment = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#DepartmentID"), "Select Department"); }


function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryId"), "Select Country"); }


function LoadStudent() { KendoGlobalAjax({ commandName: 'Students_SelectDDL', values: '{}', CallBack: getLoadStudents }); }
var getLoadStudents = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#students"), "Select Student");

   // $('#students').val(id);


}



//function LoadCustomer() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCustomer = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryId"), "Select Country"); }

//function LoadCompany() { KendoGlobalAjax({ commandName: 'Company_SelectDDL', values: '{}', CallBack: getLoadCompany}); }
//var getLoadCompany = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CompanyID"), "Select Company"); }

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadCustomerDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
  //  if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Recipt_SelectByID', values: "{ReciptID:'" + id + "'}", CallBack: loadReciptDataByID });
   // }

}

var loadReciptDataByID = function (d) {
 
    setTimeout(function () {

        $('input,select,textarea').removeClass('error');
        $('#reciptid').val(json.parse(d.value)[0].reciptid);
        $('#dueAmount').val(JSON.parse(d.Value)[0].dueAmount);
        $('#paid').val(JSON.parse(d.Value)[0].paid);//Change ModelNo to model 
        $('#month').val(JSON.parse(d.Value)[0].month);
        $('#year').val(JSON.parse(d.Value)[0].year);
        $('#reciptDate').val(JSON.parse(d.Value)[0].reciptDate); //Change drivername to driver 
        $('#cash').val(JSON.parse(d.Value)[0].cash);
        $('#cheque').val(JSON.parse(d.Value)[0].cheque);
        $('#bankName').val(JSON.parse(d.Value)[0].bankName);
        $('#chequeDate').val(JSON.parse(d.Value)[0].chequeDate);
        $('#chequeNo').val(JSON.parse(d.Value)[0].chequeNo);
        $('#person').val(JSON.parse(d.Value)[0].person);
        $('#chequeOwner').val(JSON.parse(d.Value)[0].chequeOwner);
        $('#paymentStatus').val(JSON.parse(d.Value)[0].PaymentStatus).trigger('change');
    }, 50);


}

/*  ******************** Function Used for the Hide and Unhide the Input Fileds **********************/




/*  ******************** USE THIS FUNCTION ON onfocusout AND onkeydown**********************/
//function fnAvoidNegavtiveNumber(Inputvalue) { //Inputvalue is input field value .
//    var num = Inputvalue.value.match(/^\d+$/);
//    if (num === null) {
//        Inputvalue.value = "";
//        false
//    }

//}


$('#paymentMade').on('change', function () {

    var selection = $(this).val();
    if (selection == "Cash") {
        $('.showHideRowOnChange').hide();
        $("#chequeNo").val('');
        $("#bankName").val('');
        $("#chequeDate").val('');
        $("#Cheque").val('');



    } else {
        $('.showHideRowOnChange').show();
        $("#chequeDate").kendoDatePicker({
            value: new Date(),
            format: "dd/MM/yyyy",
            parseFormats: ["MMMM yyyy"]
        });

        $("#Cash").val('');
        $("#chequeNo").val(selection);
     //   $("#chequeDate").val(selection);
        $("#bankName").val();

        // $("#Cheque").val(selection);

    }


});