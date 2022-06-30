
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
    LoadContractortDetailByID();
    LoadProvinceDDL();
    LoadCityDDL();
   

    $('#btnSave').on('click', function (e) {
      
       

        if (customvalidateForm('frmAddUpdateContractor')) {

            //Button Loader
            var btn = document.getElementById("btnSave");
            btn.disable = true;
            btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

            $("#frmAddUpdateContractor").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //  LoadEmployeesKendo();
                    window.location.href = '/Contractor/Contractor/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateContractor").ajaxSubmit(options);

        }
        else {

            btn.disable = true;
            btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
            return false;
        } 
    });

});
function LoadKendoDates() {
    //$("#passportExpiryDate").kendoDatePicker({     
    //    value: new Date(),
    //    format: "dd/MM/yyyy",
    //    parseFormats: ["MMMM yyyy"]
    //});
    
}



//window.onbeforeunload = function () {
//    //all you can do is provide a message..
   
//    return "a";
//}


$('.reset_btn').click(function () {
    $('#frmAddUpdateContractor').trigger('reset'); 
});
$('.btn_close').click(function () {
    $('#frmAddUpdateContractor').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------
 
function LoadProvinceDDL() {
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadProvinceDDL });
}
var fnLoadProvinceDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProvinceID"), "Select Province");
}

function LoadCityDDL() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadCityDDL });
}
var fnLoadCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CityID"), "Select City");
}
 
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadContractortDetailByID() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Contractor_SelectByID', values: { ContractorID: id }, CallBack: loadContractorDataByID });  
    }

}
var loadContractorDataByID = function (d) {
    
   
    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
       
        
        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);
        $('#ContractorID').val(JSON.parse(d.Value)[0].contractorID);
        $('#ContractorName').val(JSON.parse(d.Value)[0].contractorName);   
        $('#ConWhatsApp').val(JSON.parse(d.Value)[0].conWhatsApp);
        $('#PhoneNo').val(JSON.parse(d.Value)[0].phoneNo);
        $('#ConEmail').val(JSON.parse(d.Value)[0].conEmail);
        $('#HouseNo').val(JSON.parse(d.Value)[0].houseNo);
        $('#StreetNo').val(JSON.parse(d.Value)[0].streetNo);
        $('#TownSector').val(JSON.parse(d.Value)[0].townSector);
        $('#CityID').val(JSON.parse(d.Value)[0].cityID);
        $('#ProvinceID').val(JSON.parse(d.Value)[0].provinceID);
      
     
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