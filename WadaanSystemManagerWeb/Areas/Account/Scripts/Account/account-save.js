
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
    LoadCustomerDataByID();
    LoadKendoDates();
    LoadAccount();
    LoadTaxRate();
    // Save Button Function .

    $('#btnSave').on('click', function (e) {

        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateAccount')) {

            $("#frmAddUpdateAccount").ajaxForm();


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
            $("#frmAddUpdateAccount").ajaxSubmit(options);

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

var clearform = function () {
    $('#frmAddUpdateAccount').trigger('reset');
}

$('.reset_btn').click(function () {
    $('#frmAddUpdateAccount').trigger('reset');
});


//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------



function LoadAccount() { KendoGlobalAjax({ commandName: 'CategoryType_SelectDDL', values: '{}', CallBack: getLoadAccount }); }
var getLoadAccount = function (d) {
    $('#ddl-account').append('');
    var optiongroup = '';
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        optiongroup = JSON.parse(d.Value)[i].accountCategoryTitle;
        //if (optiongroup == JSON.parse(d.Value)[i].accountCategoryTitle) {
        //    $('#ddl-account').append('<option value="' + JSON.parse(d.Value)[i].categoryTypeID + '">' + JSON.parse(d.Value)[i].accountCategoryTypeTitle + '</option>                ')

        //} else {

        //}
            $('#ddl-account').append('<optgroup label="' + optiongroup + '"><option value="' + JSON.parse(d.Value)[i].categoryTypeID + '">' + JSON.parse(d.Value)[i].accountCategoryTypeTitle + '</option></optgroup>                ')
    }
    //BindComboForDefault(JSON.parse(d.Value), $("#CountryId"), "Select Country");
}

function LoadTaxRate() { KendoGlobalAjax({ commandName: 'TaxRate_SelectDDL', values: '{}', CallBack: getLoadTaxRate }); }
var getLoadTaxRate = function (d) {

    BindComboForDefault(JSON.parse(d.Value), $("#TaxID"), "Select Tax");
}

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadCustomerDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {

        KendoGlobalAjax({ commandName: 'Account_SelectByID', values: { ID: id }, CallBack: loadAccountDataByID });

    }

}

var loadAccountDataByID = function (d) {

    setTimeout(function () {

        $('input,select,textarea').removeClass('error');

        $('#Id').val(JSON.parse(d.Value).id);
        $('#Code').val(JSON.parse(d.Value).code);
        $('#Name').val(JSON.parse(d.Value).name);
        $('#Detail').val(JSON.parse(d.Value).detail);
        $('#TaxID').val(JSON.parse(d.Value).taxID).trigger('change');
        $('#ddl-account').val(JSON.parse(d.Value).accountTypeId).trigger('change');
        if (JSON.parse(d.Value).showDashboardAsWatchlist == true) {
            $('#ShowDashboardAsWatchlist').val(JSON.parse(d.Value).showDashboardAsWatchlist)
            $('#ShowDashboardAsWatchlist').prop('checked', true);
        } else {
            $('#ShowDashboardAsWatchlist').val('0')
            $('#ShowDashboardAsWatchlist').prop('checked', false);
        }
        if (JSON.parse(d.Value).showInExpenseClaim == true) {
            $('#ShowInExpenseClaim').val(JSON.parse(d.Value).showInExpenseClaim)
            $('#ShowInExpenseClaim').prop('checked', true);
        } else {
            $('#ShowInExpenseClaim').val('0')
            $('#ShowInExpenseClaim').prop('checked', false);
        }
        if (JSON.parse(d.Value).enablePaymentToThisAccount == true) {
            $('#EnablePaymentToThisAccount').val(JSON.parse(d.Value).enablePaymentToThisAccount)
            $('#EnablePaymentToThisAccount').prop('checked', true);
        } else {
            $('#EnablePaymentToThisAccount').val('0')
            $('#EnablePaymentToThisAccount').prop('checked', false);
        }



    }, 50);


}



function fnCheckBoxValue(e) {

    var chks = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < chks.length; i++) {

        //chks[i]["checked"] == e["checked"]
        if (chks[i]["checked"] == true) {
            chks[i].value = '1';
        } else {
            chks[i].value = '0';
        }
    }
}