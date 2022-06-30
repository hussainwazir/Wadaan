
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
    LoadKendoDatesForEmployeeSave();
    PopulateEmployeeEducationlGrid();
    PopulateEmployeeExperienceGrid();
    LoadTaskType();


    $('#btnSave').on('click', function (e) {

        var myarrayy = [];

        $("#taskType :selected").map(function (i, el) {

            var saveData = {
                TaskType: $(el).val(),
                UserID: userId,
                EmployeeID: '00000000-0000-0000-0000-000000000000'
            }
            myarrayy.push(saveData);
            

        });
        console.log(myarrayy);
        $('#EmployeeTaskType_MultipleTaskTypeSave').val(JSON.stringify(myarrayy));
        console.log($('#EmployeeTaskType_MultipleTaskTypeSave').val());
        //return;
        var btn = document.getElementById('btnSave');
        if (customvalidateForm('frmAddUpdateEmployee')) {
            $("#frmAddUpdateEmployee").ajaxForm();
            //ButtonLoader
           
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
                    /* Moved below function to same procedure Employee_Save
                    TaskTypeMultipleInsertion(JSON.parse(JSON.parse(response)));
                    */
                    window.location.href = '/Employee/Employee/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateEmployee").ajaxSubmit(options);
        }
        //else {

        //    btn.disabled = true;
        //    btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
        //    return false;
        //}
    });    
});



function LoadKendoDatesForEmployeeSave() {
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

function LoadTaskType() {
    KendoGlobalAjax({ commandName: 'TaskType_SelectAll', values: {}, CallBack: fnLoadTaskType });
}
var fnLoadTaskType = function (d) {

    BindkendoMultiSelect(JSON.parse(d.Value), $("#taskType"), "");
    var optional = $("#taskType").kendoMultiSelect({ autoClose: false }).data("kendoMultiSelect");


}
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
    // $('#DesignationID option:selected').text(JSON.parse(d.Value)[0].name);
}


function LoadEmployeeType() {
    KendoGlobalAjax({ commandName: 'EmployeeType_SelectDDL', values: '{}', CallBack: fnGetEmployeeType });

}
var fnGetEmployeeType = function (d) {

    BindComboForDefault(JSON.parse(d.Value), $("#EmployeeTypeID"), "Select Employee");
    // $('#EmployeeTypeID option:selected').text(JSON.parse(d.Value)[0].name);
}


function LoadEmployeeRole() { KendoGlobalAjax({ commandName: 'Roles_SelectDDL', values: '{}', CallBack: getLoadRole }); }
var getLoadRole = function (d) {
    ; BindComboForDefault(JSON.parse(d.Value), $("#Role"), "Select Role");
    // $('#Role option:selected').text(JSON.parse(d.Value)[0].name);
}

function LoadProvinceDDL() {
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadPermanentProvinceDDL });
}
var fnLoadPermanentProvinceDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#PerProvinceID"), "Select Province");
    //$('#PerProvinceID option:selected').text(JSON.parse(d.Value)[3].name);
}

function LoadCityDDL() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadPermanentCityDDL });
}
var fnLoadPermanentCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#PerCityID"), "Select City");
    // $('#PerCityID option:selected').text(JSON.parse(d.Value)[0].name);

}

function LoadCurProvinceDDL() {
    KendoGlobalAjax({ commandName: 'Province_SelectDDL', values: '{}', CallBack: fnLoadCurProvinceDDL });
}
var fnLoadCurProvinceDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CurProvinceID"), "Select Province");
    //$('#CurProvinceID option:selected').text(JSON.parse(d.Value)[3].name);
}

function LoadCurCityDDL() {
    KendoGlobalAjax({ commandName: 'City_SelectDDL', values: '{}', CallBack: fnLoadCurCityDDL });
}
var fnLoadCurCityDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CurCityID"), "Select City");
    // $('#CurCityID option:selected').text(JSON.parse(d.Value)[0].name);
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
        var rowData = JSON.stringify(JSON.parse(d.Value)[i]);
        
        $("#tbl-employee-experience-detail").append('<tr style="background: lightgoldenrodyellow;"><td class="td-row-data" hidden>'+rowData+'</td>   <td style="text-align: left;" class="JobTitle">' + JSON.parse(d.Value)[i].jobTitle + '</td><td style="text-align: left;" class="FromDate">' + JSON.parse(d.Value)[i].fromDate + '</td><td style="text-align: left;" class="ToDate">' + JSON.parse(d.Value)[i].toDate + '</td><td style="text-align: left;" class="EmployerName">' + JSON.parse(d.Value)[i].employerName + '</td><td style="text-align: left;" class="EmployerAddress">' + JSON.parse(d.Value)[i].employerAddress + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
        //$("#tbl-employee-experience-detail").append('<tr style="background: lightgoldenrodyellow;"><td class="td-row-data" hidden>'+rowData+'</td>   <td style="text-align: left;" class="JobTitle">' + JSON.parse(d.Value)[i].jobTitle + '</td><td style="text-align: left;" class="FromDate">' + JSON.parse(d.Value)[i].fromDate + '</td><td style="text-align: left;" class="ToDate">' + JSON.parse(d.Value)[i].toDate + '</td><td style="text-align: left;" class="EmployerName">' + JSON.parse(d.Value)[i].employerName + '</td><td style="text-align: left;" class="EmployerAddress">' + JSON.parse(d.Value)[i].employerAddress + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="editRow(this)"><i class="fa fa-edit"></i></button></td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
    };
}

function editRow(e) {
    var dataItem = JSON.parse($(e).closest('tr').find(".td-row-data").text());
    console.log(dataItem);
    
}

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadEmployeeDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Employee_SelectByID', values: { EmployeeID: id }, CallBack: loadEmployeesDataByID });
    }

    var employeeUsername = document.getElementById('UserName');
    employeeUsername.disable = true;

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
        LoadTaskTypeAgainstEmployee();


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




function TaskTypeMultipleInsertion(EmployeeId) {    
    var myarrayy = [];

    $("#taskType :selected").map(function (i, el) {

        var saveData = {
            TaskType: $(el).val(),
            UserID: userId,
            EmployeeID: EmployeeId
        }
        myarrayy.push(saveData);
        console.log(myarrayy);

    });
    KendoGlobalAjax({
        commandName: 'EmployeeTaskType_MultipleTaskTypeSave', values: { EmployeeTaskType_MultipleTaskTypeSave: myarrayy }, CallBack: showSuccessMessage
    });

}




function LoadTaskTypeAgainstEmployee() {
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'EmployeeTaskType_SelectByEmployeeID', values: "{EmployeeID:'" + id + "'}", CallBack: fnLoadTaskTypeAgainstEmployee });
    }
}

var fnLoadTaskTypeAgainstEmployee = function (d) {


    setTimeout(function () {

        var storeArray = [];
        $.each(JSON.parse(d.Value), function (key, value) { storeArray.push(value.id) });
        $("#taskType").data("kendoMultiSelect").value(storeArray);
    }, 300);


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
            ToDate: el.children[2].textContent, //$('#ToDate').val(),
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
    // window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MEmployeeList';

}
