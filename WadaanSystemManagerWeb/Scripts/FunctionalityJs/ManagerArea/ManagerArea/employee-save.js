
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

    LoadDesignation();
    LoadEmployeeDataByID();
    LoadEmployeeRole();
    LoadEmployeeType();
    LoadProvinceDDL();
    LoadCityDDL();
    LoadCurProvinceDDL();
    LoadCurCityDDL();
    LoadKendoDates();
    PopulateEmployeeEducationlGrid();
    PopulateEmployeeExperienceGrid();

    $('#btnSave').on('click', function (e) {


        if (customvalidateForm('frmAddUpdateEmployee')) {

            $("#frmAddUpdateEmployee").ajaxForm();

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
                   
                    employeeEducationInsertion(JSON.parse(JSON.parse(response)));
                    employeeExperienceInsertion(JSON.parse(JSON.parse(response)));

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateEmployee").ajaxSubmit(options);

        }
        else {

            btn.disabled = true;
            btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
            return false;
        }
    });

});
function LoadKendoDates() {
    $("#ToDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
 

    $("#FromDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

    $("#PIRegistrationDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

     $("#PIExpiryDate").kendoDatePicker({
         value: new Date(),
         format: "dd/MM/yyyy",
         parseFormats: ["MMMM yyyy"]
    });

    $("#DateOfAppointmentFrom").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
    $("#DateOfAppointmentTo").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
   

}



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
    $('#frmAddUpdateEmployee').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateEmployee').trigger('reset');

});



//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


function LoadDesignation() {
    KendoGlobalAjax({ commandName: 'Designation_SelectDDL', values: '{}', CallBack: fnGetLoadDesignation });
}
var fnGetLoadDesignation = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#DesignationID"), "Select Designation");
}

function LoadEmployeeType() {
    KendoGlobalAjax({ commandName: 'EmployeeType_SelectDDL', values: '{}', CallBack: fnGetEmployeeType });
}
var fnGetEmployeeType = function (d) {
  
    BindComboForDefault(JSON.parse(d.Value), $("#EmployeeTypeID"), "Select Employee");
}


function LoadEmployeeRole() { KendoGlobalAjax({ commandName: 'Roles_SelectDDL', values: '{}', CallBack: getLoadRole }); }
var getLoadRole = function (d) { ; BindComboForDefault(JSON.parse(d.Value), $("#Role"), "Select Role"); }

function LoadProvinceDDL() {
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadPermanentProvinceDDL });
}
var fnLoadPermanentProvinceDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#PerProvinceID"), "Select Province");
}

function LoadCityDDL() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadPermanentCityDDL });
}
var fnLoadPermanentCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#PerCityID"), "Select City");
}

function LoadCurProvinceDDL() {
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadCurProvinceDDL });
}
var fnLoadCurProvinceDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CurProvinceID"), "Select Province");
}

function LoadCurCityDDL() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadCurCityDDL });
}
var fnLoadCurCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CurCityID"), "Select City");
}



function PopulateEmployeeEducationlGrid() {
    var full_url = document.URL;             // Get current url
    var url_array = full_url.split('=');    //Split 
    id = url_array[url_array.length - 1];   //Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'EmployeeEducationDetail_SelectByEmployeeID', values: { EmployeeID: id }, CallBack: fnPopulateEmployeeEducationlGrid });
    }
}
var fnPopulateEmployeeEducationlGrid = function (d) {
    
   
    $('#tbl-employee-qualification-detail').append('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        //$("#tbl-employee-qualification-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="EducationLevel">' + JSON.parse(d.Value)[i].educationLevel + '</td><td style="text-align: left;" class="DegreeTitle">' + JSON.parse(d.Value)[i].degreeTitle + '</td><td style="text-align: left;" class="InstituteName">' + JSON.parse(d.Value)[i].instituteName + '</td><td style="text-align: left;" class="ObtainedTotalMarks">' + JSON.parse(d.Value)[i].obtainedTotalMarks + '</td><td style="text-align: left;" class="YearPassing">' + JSON.parse(d.Value)[i].passingYear + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left; "   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
        $("#tbl-employee-qualification-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="EducationLevel">' + JSON.parse(d.Value)[i].educationLevel + '</td><td style="text-align: left;" class="DegreeTitle">' + JSON.parse(d.Value)[i].degreeTitle + '</td><td style="text-align: left;" class="InstituteName">' + JSON.parse(d.Value)[i].instituteName + '</td><td style="text-align: left;" class="ObtainedTotalMarks">' + JSON.parse(d.Value)[i].obtainedTotalMarks + '</td><td style="text-align: left;" class="YearPassing">' + JSON.parse(d.Value)[i].passingYear + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
    };
}

function PopulateEmployeeExperienceGrid() {
    var full_url = document.URL;             // Get current url
    var url_array = full_url.split('=');    //Split 
    id = url_array[url_array.length - 1];   //Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'EmployeeExperiencesDetails_SelectByEmployeeID', values: { EmployeeID: id }, CallBack: fnPopulateEmployeeExperienceGrid });
    }
}
var fnPopulateEmployeeExperienceGrid = function (d) {
    
 
    $('#tbl-employee-experience-detail').append('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $("#tbl-employee-experience-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="JobTitle">' + JSON.parse(d.Value)[i].jobTitle + '</td><td style="text-align: left;" class="FromDate">' + JSON.parse(d.Value)[i].fromDate + '</td><td style="text-align: left;" class="ToDate">' + JSON.parse(d.Value)[i].toDate + '</td><td style="text-align: left;" class="EmployerName">' + JSON.parse(d.Value)[i].employerName + '</td><td style="text-align: left;" class="EmployerAddress">' + JSON.parse(d.Value)[i].employerAddress + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
    };
}



//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadEmployeeDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Employee_SelectByID', values: { EmployeeID: id }, CallBack: loadEmployeesDataByID });
    }
   
    var mangerEmployeeData = document.getElementById("UserName");
    mangerEmployeeData.disabled = true;
}
var loadEmployeesDataByID = function (d) {

    setTimeout(function () {
        $('input,select,textarea').removeClass('error');

        
        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);
        $('#EmployeeID').val(JSON.parse(d.Value)[0].employeeID);
        $('#UserName').val(JSON.parse(d.Value)[0].userName);
        $('#Prefix').val(JSON.parse(d.Value)[0].prefix);
        $('#FirstName').val(JSON.parse(d.Value)[0].firstName);
        $('#LastName').val(JSON.parse(d.Value)[0].lastName);
        $('#GivenName').val(JSON.parse(d.Value)[0].givenName);
        $('#MobilePhone').val(JSON.parse(d.Value)[0].mobilePhone);
        $('#WhatsApp').val(JSON.parse(d.Value)[0].whatsApp);
        $('#EmailAddress').val(JSON.parse(d.Value)[0].emailAddress);
        $('#CurPostalAddress').val(JSON.parse(d.Value)[0].curPostalAddress);
        $('#CurHouseNo').val(JSON.parse(d.Value)[0].curHouseNo);
        $('#CurStreetNo').val(JSON.parse(d.Value)[0].curStreetNo);
        $('#CurTownSector').val(JSON.parse(d.Value)[0].curTownSector);
        $('#CurCityID').val(JSON.parse(d.Value)[0].curCityID).trigger('change');;
        $('#CurProvinceID').val(JSON.parse(d.Value)[0].curProvinceID).trigger('change');;
        $('#perHouseNo').val(JSON.parse(d.Value)[0].perHouseNo);
        $('#perStreetNo').val(JSON.parse(d.Value)[0].perStreetNo);
        $('#perTownSector').val(JSON.parse(d.Value)[0].perTownSector);
        $('#PerCityID').val(JSON.parse(d.Value)[0].perCityID).trigger('change');;
        $('#PerProvinceID').val(JSON.parse(d.Value)[0].perProvinceID).trigger('change');;
        $('#DesignationID').val(JSON.parse(d.Value)[0].designationID).trigger('change');
        $('#EmployeeTypeID').val(JSON.parse(d.Value)[0].employeeTypeID).trigger('change');
        $('#Password').val(JSON.parse(d.Value)[0].password);
        $('#Role').val(JSON.parse(d.Value)[0].roleID).trigger('change');
        $('#DateOfAppointmentFrom').val(JSON.parse(d.Value)[0].dateOfAppointmentFrom);
        $('#DateOfAppointmentTo').val(JSON.parse(d.Value)[0].dateOfAppointmentTo);

        //Personal Information
       
        
        $('#PECPCATPNo').val(JSON.parse(d.Value)[0].pecpcatpNo);
        $('#PIRegistrationDate').val(JSON.parse(d.Value)[0].piRegistrationDate);
        $('#PIExpiryDate').val(JSON.parse(d.Value)[0].piExpiryDate);
      


        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);


}



$('#LastName').focusout(function () {
    $('#GivenName').val($('#Prefix').val() + ' ' + $('#FirstName').val() + ' ' + $('#LastName').val());
});

// ========================================= ADD FIELD DATA INTO ANOTHER FIELD ==================================================

$('#btn-add-row').click(function () {



    $("#tbl-items-tbody-record").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="EducationLevel"> <input type="hidden"  class="form-control pname" name="Level" value="' + $("#EducationLevel :selected").val() + '">' + $("#Level :selected").text() + '</td> <td style="text-align: left;" class="DegreeTitle">' + $("#DegreeTitle").val() + '</td><td style="text-align: left;" class="InstituteName">' + $("#InstituteName").val() + '</td><td style="text-align: left;" class="ObtainedTotalMarks">' + $("#ObtainedTotalMarks").val() + '</td> <td style="text-align: left;" class="YearPassing">' + $("#YearPassing").val() + '</td><td><button type="button" class="btn btn-danger btn-sm" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-Trash"></i></button></td>  </tr>');
    //$("#tbl-employee-experience-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;"><input type="hidden"  class="form-control pname" name="Level" value="' + $("#Level :selected").val() + '">' + $("#Level :selected").text() + '</td> <td style="text-align: left;" class="Color">' + $("#DegreeTitle").val() + '</td><td style="text-align: left;" class="Quantity">' + $("#InstituteName").val() + '</td><td style="text-align: left;" class="">' + $("#ObtainedTotalMarks").val() + '</td><td style="text-align: left;" class="UnitPrice">' + $("#YearPassing").val() + '</td><td><button type="button" class="btn btn-danger btn-sm" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-close">X</i></button></td>  </tr>');

   

    $('#EducationLevel').val('');
    $('#DegreeTitle').val('');
    $('#InstituteName').val('');
    $('#ObtainedTotalMarks').val('');
    $('#YearPassing').val('');



});

$('#btn-add-row-to-employee-education').click(function () {

  
    var isValid = true;
    if ($("#DegreeTitle").val() == '' || $("#DegreeTitle").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Degree title is missing!',
            footer: ''
        })
        isValid = false;
    }
    else if ($("#InstituteName").val() == '' || $("#InstituteName").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Institute name is missing!',
            footer: ''
        })
        isValid = false;
    }
    else if ($("#ObtainedTotalMarks").val() == '' || $("#ObtainedTotalMarks").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Obtained marks is missing!',
            footer: ''
        })
        isValid = false;
    }
    else if ($("#YearPassing").val() == '0' || $("#YearPassing").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Select passing year!',
            footer: ''
        })
        isValid = false;
    }
    if (isValid == true) {
        $("#tbl-employee-qualification-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="EducationLevel">' + $("#EducationLevel").val() + '</td><td style="text-align: left;" class="DegreeTitle">' + $("#DegreeTitle").val() + '</td><td style="text-align: left;" class="InstituteName">' + $("#InstituteName").val() + '</td><td style="text-align: left;" class="ObtainedTotalMarks">' + $("#ObtainedTotalMarks").val() + '</td><td style="text-align: left;" class="YearPassing">' + $("#YearPassing").val() + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left; "   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
        ClearControls();
    }
    
});

function ClearControls() {
    $('#EducationLevel').val('');
    $('#DegreeTitle').val('');
    $('#InstituteName').val('');
    $('#ObtainedTotalMarks').val('');
    //$('#YearPassing').val('yyyy');

}

$('#btn-add-row-to-employee-experience').click(function () {

    var isValid = true;
    if ($("#JobTitle").val() == '' || $("#JobTitle").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Job title is missing!',
            footer: ''
        })
        isValid = false;
    }
    else if ($("#EmployerName").val() == '' || $("#EmployerName").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Employer name is missing!',
            footer: ''
        })
        isValid = false;
    }
    else if ($("#EmployerAddress").val() == '' || $("#EmployerAddress").val() == undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Employer address is missing!',
            footer: ''
        })
        isValid = false;
    }

    if (isValid == true) {
        $("#tbl-employee-experience-detail").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="JobTitle">' + $("#JobTitle").val() + '</td><td style="text-align: left;" class="FromDate">' + $("#FromDate").val() + '</td><td style="text-align: left;" class="ToDate">' + $("#ToDate").val() + '</td><td style="text-align: left;" class="EmployerName">' + $("#EmployerName").val() + '</td><td style="text-align: left;" class="EmployerAddress">' + $("#EmployerAddress").val() + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
        ClearControlsEmployeeExperience();
    }
   
});

function ClearControlsEmployeeExperience() {
    $('#JobTitle').val('');
    // $('#FromDate').val('');
    //  $('#ToDate').val('');
    $('#EmployerName').val('');
    $('#EmployerAddress').val('');
}

function employeeEducationInsertion(EmployeeID) {
    var myarray = [];
 
    $("#tbl-employee-qualification-detail tr").each(function (i, el) {
        var saveData = {
            EmployeeID: EmployeeID,
            EducationLevel: el.children[0].textContent,
            DegreeTitle: el.children[1].textContent,
            InstituteName: el.children[2].textContent,
            ObtainedTotalMarks: el.children[3].textContent,
            PassingYear: el.children[4].textContent,
            UserId: userId,
        }
        myarray.push(saveData);
        //////////////////////

    });
    KendoGlobalAjax({ commandName: 'EmployeeEducationMultipleDetails_Save_New', values: { BulkEmployeeEducationDetails: myarray }, CallBack: showSuccessMessage });

}

function employeeExperienceInsertion(EmployeeID) {
    var myarray = [];
    $("#tbl-employee-experience-detail tr").each(function (i, el) {
   
    var saveData = {
        EmployeeID: EmployeeID,
        JobTitle: el.children[0].textContent, // $('#JobTitle').val(),
        FromDate: el.children[1].textContent, //$('#FromDate').val(),
        ToDate:   el.children[2].textContent, //$('#ToDate').val(),
        EmployerName: el.children[3].textContent, //$('#EmployerName').val(),
        EmployerAddress: el.children[4].textContent, //$('#EmployerAddress').val(),
        UserId: userId,

    }
    myarray.push(saveData);
    });
    KendoGlobalAjax({ commandName: 'EmployeeExperienceMultipleDetails_Save_New', values: { BulkEmployeeExperiencesDetails: myarray }, CallBack: showSuccessMessage });

}

//function deleteRow(d)
//{
//    $(".btn btn-danger btn-sm").removeClass("myClass noClass").addClass("yourClass");
//}


function deleteRow(e) { $(e).closest("tr").remove(); }

var showSuccessMessage = function (d) {

    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MEmployeeList';

}