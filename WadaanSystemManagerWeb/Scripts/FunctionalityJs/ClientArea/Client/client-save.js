
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

  
    LoadClientDetailByID();
    LoadDesignation();
    loadCurrProvinceDDL();
    loadCurrCityDDL();
    loadPerProvinceDDL();
    loadPerCityDDL();
    loadBussProvinceDDL();
    loadBusinessCityDDL();
    loadDepartureProvinceDDL();
    loadDepartureCityDDl();
    loadBillProvinceDDL();
    loadBillCityDDL();
  


});


$('#btnSave').on('click', function (e) {

    //Button Loader




    if (customvalidateForm('frmAddUpdateClient')) {

        $("#frmAddUpdateClient").ajaxForm();

        var btn = document.getElementById("btnSave");
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
                window.location.href = '/Client/Client/Index';
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateClient").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save '

    }

});
function LoadKendoDates() {
    //$("#passportExpiryDate").kendoDatePicker({     
    //    value: new Date(),
    //    format: "dd/MM/yyyy",
    //    parseFormats: ["MMMM yyyy"]
    //});
    
}


$('.reset_btn').click(function () {
    $('#frmAddUpdateClient').trigger('reset'); 
});

$('.btn_close').click(function () {
    $('#frmAddUpdateClient').trigger('reset');

});


$('.reset_btn').on('click', function () {
    
    $("#ClientID").trigger("reset");
});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------
 
//LoadDesignationDDL
function LoadDesignation()
{
    KendoGlobalAjax({ commandName: 'Designation_SelectDDL', values: '{}', CallBack: fnGetLoadDesignation });
}
var fnGetLoadDesignation = function (d)
{
    BindComboForDefault(JSON.parse(d.Value), $("#DesignationID"), "Select Designation");
}

//LoadCurrentProvinceDDL
function loadCurrProvinceDDL()
{
        KendoGlobalAjax({ commandName: "Province_SelectDDL", values: '{}', CallBack: funCurrLoadProvinceDDL });
}
var funCurrLoadProvinceDDL = function (d) {
        BindComboForDefault(JSON.parse(d.Value), $("#CurProvince"), "Select Province");
}

//LoadCurrentCityDDl
function loadCurrCityDDL()
{
        KendoGlobalAjax({ commandName: "City_SelectDDL", values: '{}', CallBack: fnCurrLoadCityDDL });
}
var fnCurrLoadCityDDL = function (d)
{
        BindComboForDefault(JSON.parse(d.Value), $("#CurCity"), "Select City");
}


//LoadPermanentProvinceDDL
function loadPerProvinceDDL()
{
    KendoGlobalAjax({ commandName: "Province_SelectDDL", values: '{}', CallBack: fnLoadPerProvinceDDL });
}
var fnLoadPerProvinceDDL = function (d)
{
    BindComboForDefault(JSON.parse(d.Value), $("#PerProvince"), "Select Province");
}

//LoadPermanentCityDDL
function loadPerCityDDL()
{
    KendoGlobalAjax({ commandName: "City_SelectDDL", values: '{}', CallBack: fnLoadPerCityDDL });
}
var fnLoadPerCityDDL = function (d)
{
    BindComboForDefault(JSON.parse(d.Value), $("#PerCity"), "Select City")
}

//LoadBussinessProvinceDDL
function loadBussProvinceDDL()
{
    KendoGlobalAjax({ commandName: "Province_SelectDDL", values: '{}', CallBack: fnLoadBussProvinceDDL });
}
var fnLoadBussProvinceDDL = function(d)
{
    BindComboForDefault(JSON.parse(d.Value), $("#BProvince"), "Select Province");
}


//LoadBusinessCityDDl
function loadBusinessCityDDL() {
    KendoGlobalAjax({commandName: "City_SelectDDL", values: '{}', CallBack: fnBusinessCityDDL});
}
var fnBusinessCityDDL = function (d)
{
    BindComboForDefault(JSON.parse(d.Value), $("#BCity"), "Select City");
}

//LoadDispatchProvinceDDL
function loadDepartureProvinceDDL()
{
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadDepProvinceDDL });
}
var fnLoadDepProvinceDDL = function (d)
{
    BindComboForDefault(JSON.parse(d.Value), $("#DispatchProvince"), "Select Province");
}

//LoadDispatchCityDDL

function loadDepartureCityDDl() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadDepCityDDL });
}
var fnLoadDepCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#DispatchCity"), "Select City");
}



//BillProvinceDDL
function loadBillProvinceDDL() {
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadBillProvinceDDL });
}
var fnLoadBillProvinceDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#BillProvince"), "Select Province");
}

//BillCityDDL
function loadBillCityDDL() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadBillCityDDL });
}

var fnLoadBillCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#BillCity"), "Select City");
}



//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadClientDetailByID() {
  
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Client_SelectByID', values: { ClientID: id }, CallBack: loadClientDataByID });  
    }

    //var clientUsername = document.getElementById("UserName");
    //clientUsername.disabled = true;

}


var loadClientDataByID = function (d) {

    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
       
   
        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);
        $('#ClientID').val(JSON.parse(d.Value)[0].clientID);
        $('#Prefix').val(JSON.parse(d.Value)[0].prefix);   
        $('#FirstName').val(JSON.parse(d.Value)[0].firstName);
        $('#LastName').val(JSON.parse(d.Value)[0].lastName);
        $('#GivenName').val(JSON.parse(d.Value)[0].givenName);
        $('#MobilePhone').val(JSON.parse(d.Value)[0].mobilePhone);
        $('#WhatsApp').val(JSON.parse(d.Value)[0].whatsApp);
        $('#emailAddress').val(JSON.parse(d.Value)[0].emailAddress);
        $('#curPostalAddress').val(JSON.parse(d.Value)[0].curPostalAddress);
        $('#CurHouseNo').val(JSON.parse(d.Value)[0].curHouseNo);
        $('#curStreetNo').val(JSON.parse(d.Value)[0].curStreetNo);
        $('#curTownSector').val(JSON.parse(d.Value)[0].curTownSector);
        $('#CurCity').val(JSON.parse(d.Value)[0].curCity).trigger('change');
        $('#CurProvince').val(JSON.parse(d.Value)[0].curProvince).trigger('change');
        $('#PerHouseNo').val(JSON.parse(d.Value)[0].perHouseNo);
        $('#PerStreetNo').val(JSON.parse(d.Value)[0].perStreetNo);
        $('#PerTownSector').val(JSON.parse(d.Value)[0].perTownSector);
        $('#PerCity').val(JSON.parse(d.Value)[0].perCity).trigger('change');
        $('#PerProvince').val(JSON.parse(d.Value)[0].perProvince).trigger('change');
        $('#MaritalStatus').val(JSON.parse(d.Value)[0].maritalStatus).trigger('change');
        $('#Occupation').val(JSON.parse(d.Value)[0].occupation);
        $('#DesignationID').val(JSON.parse(d.Value)[0].designationID).trigger('change');;
        $('#Company').val(JSON.parse(d.Value)[0].company);
        $('#BPhone').val(JSON.parse(d.Value)[0].bPhone);
        $('#BEmail').val(JSON.parse(d.Value)[0].bEmail);
        $('#BPostalAddress').val(JSON.parse(d.Value)[0].bPostalAddress);
        $('#BOffice').val(JSON.parse(d.Value)[0].bOffice);
        $('#BStreet').val(JSON.parse(d.Value)[0].bStreet);
        $('#BTownSector').val(JSON.parse(d.Value)[0].bTownSector);
        $('#BCity').val(JSON.parse(d.Value)[0].bCity).trigger('change');
        $('#BProvince').val(JSON.parse(d.Value)[0].bProvince).trigger('change');
        $('#BWebpage').val(JSON.parse(d.Value)[0].bWebpage);
       // $('#CurProvince').val(JSON.parse(d.Value)[0].curProvince);

        if (JSON.parse(d.Value)[0].knowUsFromGoogle) {
            $('#KnowUsFromGoogle').prop('checked', true);
            $('#KnowUsFromGoogle').val(1);
        } else {
            $('#KnowUsFromGoogle').prop('checked', false);
            $('#KnowUsFromGoogle').val(0);
        }
        if (JSON.parse(d.Value)[0].knowUsFromFacebook) {
            $('#KnowUsFromFacebook').prop('checked', true);
            $('#KnowUsFromFacebook').val(1);
        } else {
            $('#KnowUsFromFacebook').prop('checked', false);
            $('#KnowUsFromFacebook').val(0);
        }
        if (JSON.parse(d.Value)[0].knowUsFromInstagram) {
            $('#KnowUsFromInstagram').prop('checked', true);
            $('#KnowUsFromInstagram').val(1);
        } else {
            $('#KnowUsFromInstagram').prop('checked', false);
            $('#KnowUsFromInstagram').val(0);
        }
        if (JSON.parse(d.Value)[0].knowUsFromWebsite) {
            $('#KnowUsFromWebsite').prop('checked', true);
            $('#KnowUsFromWebsite').val(1);
        } else {
            $('#KnowUsFromWebsite').prop('checked', false);
            $('#KnowUsFromWebsite').val(0);
        }
        if (JSON.parse(d.Value)[0].knowUsFromLinkdin) {
            $('#KnowUsFromLinkdin').prop('checked', true);
            $('#KnowUsFromLinkdin').val(1);
        } else {
            $('#KnowUsFromLinkdin').prop('checked', false);
            $('#KnowUsFromLinkdin').val(0);
        }
        if (JSON.parse(d.Value)[0].knowUsFromTwitter) {
            $('#KnowUsFromTwitter').prop('checked', true);
            $('#KnowUsFromTwitter').val(1);
        } else {
            $('#KnowUsFromTwitter').prop('checked', false);
            $('#KnowUsFromTwitter').val(0);
        }
 
        $('#RefreeName').val(JSON.parse(d.Value)[0].refreeName) ;
        $('#RefreePhoneNo').val(JSON.parse(d.Value)[0].refreePhoneNo);
        $('#DispatchHouseNo').val(JSON.parse(d.Value)[0].dispatchHouseNo);
        $('#DispatchStreet').val(JSON.parse(d.Value)[0].dispatchStreet);
        $('#DispatchTownSector').val(JSON.parse(d.Value)[0].dispatchTownSector);
        $('#DispatchCity').val(JSON.parse(d.Value)[0].dispatchCity).trigger('change');;
        $('#DispatchProvince').val(JSON.parse(d.Value)[0].dispatchProvince).trigger('change');;
        $('#BillHouseNo').val(JSON.parse(d.Value)[0].billHouseNo);
        $('#BillStreetNo').val(JSON.parse(d.Value)[0].billStreetNo);
        $('#BillTownSector').val(JSON.parse(d.Value)[0].billTownSector);
        $('#BTownSector').val(JSON.parse(d.Value)[0].bTownSector);
        $('#BillCity').val(JSON.parse(d.Value)[0].billCity).trigger('change');;
        $('#BillProvince').val(JSON.parse(d.Value)[0].billProvince).trigger('change');;


        if (JSON.parse(d.Value)[0].hobGardening) {
            $('#HobGardening').prop('checked', true);
            $('#HobGardening').val(1);
        } else {
            $('#HobGardening').prop('checked', false);
            $('#HobGardening').val(0);
        }

        if (JSON.parse(d.Value)[0].hobBookReading) {
            $('#HobBookReading').prop('checked', true);
            $('#HobBookReading').val(1);
        } else {
            $('#HobBookReading').prop('checked', false);
            $('#HobBookReading').val(0);
        }
        if (JSON.parse(d.Value)[0].hobMoviesAndSerials) {
            $('#HobMoviesAndSerials').prop('checked', true);
            $('#HobMoviesAndSerials').val(1);
        } else {
            $('#HobMoviesAndSerials').prop('checked', false);
            $('#HobMoviesAndSerials').val(0);
        }
        if (JSON.parse(d.Value)[0].hobCoocking) {
            $('#HobCoocking').prop('checked', true);
            $('#HobCoocking').val(1);
        } else {
            $('#HobCoocking').prop('checked', false);
            $('#HobCoocking').val(0);
        }
       
        $('#UserName').val(JSON.parse(d.Value)[0].username);
        $('#Password').val(JSON.parse(d.Value)[0].password);
        $('#UserName').prop('disable', true);
       var clientUsername = document.getElementById("UserName");
    clientUsername.disabled = true;

       // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);


} 


function fnCheckUnitCheckboxes() {
   
    var checked = $("input[type=checkbox]:checked").length;
    var uncheckValue = $("input:checkbox:not(:checked)")

    if (checked > 0) {
        $("input[type=checkbox]:checked").val(1);
   //     for (var i = 0; i < uncheckValue.length; i++) {
        $("input:checkbox:not(:checked)").val('2');
        $("input:checkbox:not(:checked)")[0].innerHTML ='2';
            //$('#' + uncheckValue[i].name).val(0);
            //$("input:checkbox:not(:checked)")[i].value = '0';
            //$('#' + uncheckValue[i].name)[0].innerHTML = '0';
      //  }
    }

}


$('#LastName').focusout(function () {
    $('#GivenName').val($('#Prefix').val() + ' ' + $('#FirstName').val() + ' ' + $('#LastName').val());
});