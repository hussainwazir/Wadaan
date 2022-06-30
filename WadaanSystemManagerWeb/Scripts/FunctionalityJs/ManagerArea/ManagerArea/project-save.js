
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
    LoadProjectPriorityDDL();
    LoadKendoDates();
 
    // LOAD DDL'S
    LoadContractor();
    LoadClients();
    LoadProjectCategory();
  
    LoadContractTypeDDL();
    LoadProvinceDDL();
    LoadCityDDL();
    LoadNorthDDL();
    LoadEastDDL();
    LoadWestDDL();
    LoadSouthDDL();
    LoadResidentialPlotSizeDDL();
    LoadCommercialPlotSizeDDL();
    LoadSubStructureDDL();
    LoadSuperStructureDDL();
    LoadFinishingDDL();
    LoadSketchDDL();
    LoadSubmissionDrawingDDL();
    LoadArchitecturalDrawingDDL();
    LoadStructuralDrawingDDL();
    LoadElectricalDrawingDDL();
    LoadPlumbingDrawingDDL();
    LoadEstimationDDL();

    LoadProjectDataByID();
    $('#btnSave').on('click', function (e) {

        if ($('#ResidentialPlotSize').val() == '00000000-0000-0000-0000-000000000000' || $('#ResidentialPlotSize').val() == undefined) {
            $('#ResidentialPlotSize').val(0);
        } else {
            $("#CommercialPlotSize").val(0);
        }

        if ($("#CommercialPlotSize").val() == '00000000-0000-0000-0000-000000000000' || $("#CommercialPlotSize").val() == undefined) {
            $("#CommercialPlotSize").val(0);
        } else {
            $('#ResidentialPlotSize').val(0);
        }

       
        if (customvalidateForm('frmAddUpdateProject')) {

            //Button Loader
            var btn = document.getElementById('btnSave');
            btn.disabled = true;
            btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

            $("#frmAddUpdateProject").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //  LoadEmployeesKendo();
                    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MProjectList';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateProject").ajaxSubmit(options);

        }
        else {

            btn.disabled = true;
            btn.innerHTML = '<i class = "fa fa-save fa-save"></i> Save...';
            return false;
        }
    });

});
function LoadKendoDates() {
    $("#StartDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

}


$('.reset_btn').click(function () {
    $('#frmAddUpdateProject').trigger('reset');

});

$('.btn_close').click(function () {
    $('#frmAddUpdateProject').trigger('reset');

});

//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


function LoadContractor() {
    KendoGlobalAjax({ commandName: 'Contractor_SelectDDL', values: '{}', CallBack: fnGetLoadContractor });
}
var fnGetLoadContractor = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ContractorID"), "Select Contractor");
}

function LoadClients() {
    KendoGlobalAjax({ commandName: 'Client_SelectDDL', values: '{}', CallBack: fnGetLoadClient });
}
var fnGetLoadClient = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ClientID"), "Select Client");
}

function LoadProjectCategory() {
    KendoGlobalAjax({ commandName: 'ProjectCategory_SelectDDL', values: '{}', CallBack: fnLoadProjectCategory });
}
var fnLoadProjectCategory = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProjectCategory"), "Select Project Category");
}

function LoadProjectPriorityDDL() {
    KendoGlobalAjax({ commandName: 'Categor_PrioritySelectDD', values: '{}', CallBack: fnLoadProjectPriorityDDL });
}
var fnLoadProjectPriorityDDL = function (d) {
    alert('testing');
    BindComboForInt(JSON.parse(d.Value), $("#Priority"), "Select Priority 5");
}

function LoadContractTypeDDL() {
    KendoGlobalAjax({ commandName: 'ContractType_SelectDDL', values: '{}', CallBack: fnLoadContractTypeDDL });
}
var fnLoadContractTypeDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ContractType"), "Select Contract Type");
}



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
function LoadNorthDDL() {
    KendoGlobalAjax({ commandName: 'North_SelectDDL', values: '{}', CallBack: fnLoadNorthDDL });
}
var fnLoadNorthDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#North"), "Select North");
}


function LoadEastDDL() {
    KendoGlobalAjax({ commandName: 'East_SelectDDL', values: '{}', CallBack: fnLoadEastDDL });
}
var fnLoadEastDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#East"), "Select East");
}


function LoadWestDDL() {
    KendoGlobalAjax({ commandName: 'West_SelectDDL', values: '{}', CallBack: fnLoadWestDDL });
}
var fnLoadWestDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#West"), "Select West");
}


function LoadSouthDDL() {
    KendoGlobalAjax({ commandName: 'South_SelectDDL', values: '{}', CallBack: fnLoadSouthDDL });
}
var fnLoadSouthDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#South"), "Select South");
}


function LoadResidentialPlotSizeDDL() {
    KendoGlobalAjax({ commandName: 'ResidentialPlotSize_SelectDDL', values: '{}', CallBack: fnResidentialPlotSizeDDL });
}
var fnResidentialPlotSizeDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ResidentialPlotSize"), "Select Residential Plot Size");
}


function LoadCommercialPlotSizeDDL() {
    KendoGlobalAjax({ commandName: 'CommercialPlotSize_SelectDDL', values: '{}', CallBack: fnLoadCommercialPlotSize });
}
var fnLoadCommercialPlotSize = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CommercialPlotSize"), "Select Commercial Plot Size");
}


function LoadSubStructureDDL() {
    KendoGlobalAjax({ commandName: 'SubStructure_SelectDDL', values: '{}', CallBack: fnLoadSubStructureDDL });
}
var fnLoadSubStructureDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#SubStructure"), "Select Contract Type");
}

function LoadSuperStructureDDL() {
    KendoGlobalAjax({ commandName: 'SuperStructure_SelectDDL', values: '{}', CallBack: fnLoadSuperStructureDDL });
}
var fnLoadSuperStructureDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#SuperStructure"), "Select Super Structure");
}

function LoadFinishingDDL() {
    KendoGlobalAjax({ commandName: 'Finishing_SelectDDL', values: '{}', CallBack: fnLoadFinishingDDL });
}
var fnLoadFinishingDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#Finishing"), "Select Finishing");
}


function LoadSketchDDL() {
    KendoGlobalAjax({ commandName: 'Sketch_SelectDDL', values: '{}', CallBack: fnLoadSketchDDL });
}
var fnLoadSketchDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#Sketch"), "Select Sketch");
}

function LoadSubmissionDrawingDDL() {
    KendoGlobalAjax({ commandName: 'SubmissionDrawing_SelectDDL', values: '{}', CallBack: fnLoadSubmissionDrawingDDL });
}
var fnLoadSubmissionDrawingDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#SubmissionDrawing"), "Select Submission Drawing");
}

function LoadArchitecturalDrawingDDL() {
    KendoGlobalAjax({ commandName: 'ArchitecturalDrawing_SelectDDL', values: '{}', CallBack: fnLoadArchitecturalDrawingDDL });
}
var fnLoadArchitecturalDrawingDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ArchitecturalDrawing"), "Select Architectural Drawing");
}

function LoadStructuralDrawingDDL() {
    KendoGlobalAjax({ commandName: 'StructuralDrawing_SelectDDL', values: '{}', CallBack: fnLoadStructuralDrawingDDL });
}
var fnLoadStructuralDrawingDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#StructuralDrawing"), "Select Structural Drawing");
}


function LoadElectricalDrawingDDL() {
    KendoGlobalAjax({ commandName: 'ElectricalDrawing_SelectDDL', values: '{}', CallBack: fnLoadElectricalDrawingDDL });
}
var fnLoadElectricalDrawingDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ElectricalDrawing"), "Select Electrical Drawing");
}


function LoadPlumbingDrawingDDL() {
    KendoGlobalAjax({ commandName: 'PlumbingDrawing_SelectDDL', values: '{}', CallBack: fnLoadPlumbingDrawingDDL });
}
var fnLoadPlumbingDrawingDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#PlumbingDrawing"), "Select Plumbing Drawing");
}


function LoadEstimationDDL() {
    KendoGlobalAjax({ commandName: 'Estimation_SelectDDL', values: '{}', CallBack: fnLoadEstimationDDL });
}
var fnLoadEstimationDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#Estimation"), "Select Estimation");
}



//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------


//----------------------------- CATEGORY CHANGE FUNCTION START  ------------------------------------------------

function ShowHideControls() {

    var productcateogry = $("#ProjectCategory").val();


    if (productcateogry == '4') {
        $("#div-residential").show();
        $("#div-commercial").hide();

    } else {

        $("#div-residential").hide();
        $("#div-commercial").show();

    }


}
//----------------------------- CATEGORY CHANGE FUNCTION END  ------------------------------------------------


function LoadProjectDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Project_SelectByID', values: { ProjectID: id }, CallBack: loadProjectData });
    }

}
var loadProjectData = function (d) {


    setTimeout(function () {
        $('input,select,textarea').removeClass('error');

        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);
        $('#ProjectID').val(JSON.parse(d.Value)[0].projectID);
        $('#ProjectName').val(JSON.parse(d.Value)[0].projectName);
        $('#ClientID').val(JSON.parse(d.Value)[0].clientID).trigger('change');
        $('#ProjectCategory').val(JSON.parse(d.Value)[0].projectCategory).trigger('change');
        $('#Priority').val(JSON.parse(d.Value)[0].priority).trigger('change');
        $('#ContractType').val(JSON.parse(d.Value)[0].contractType).trigger('change');
        $('#PlotHouseNo').val(JSON.parse(d.Value)[0].plotHouseNo);
        $('#Street').val(JSON.parse(d.Value)[0].street);
        $('#TownSector').val(JSON.parse(d.Value)[0].townSector);
        $('#ProvinceID').val(JSON.parse(d.Value)[0].provinceID).trigger('change');
        $('#CityID').val(JSON.parse(d.Value)[0].cityID).trigger('change');
        $('#GPSCordinates').val(JSON.parse(d.Value)[0].gPSCordinates);
        $('#GoogleLocation').val(JSON.parse(d.Value)[0].googleLocation);
        $('#North').val(JSON.parse(d.Value)[0].north).trigger('change');
        $('#East').val(JSON.parse(d.Value)[0].east).trigger('change');
        $('#West').val(JSON.parse(d.Value)[0].west).trigger('change');
        $('#South').val(JSON.parse(d.Value)[0].south).trigger('change');
        $('#ResidentialPlotSize').val(JSON.parse(d.Value)[0].residentialPlotSize).trigger('change');
        $('#CommercialPlotSize').val(JSON.parse(d.Value)[0].commercialPlotSize).trigger('change');
        $('#ContractorID').val(JSON.parse(d.Value)[0].contractorID).trigger('change');
        $('#ConstructionStatus').val(JSON.parse(d.Value)[0].constructionStatus);
        $('#StartDate').val(JSON.parse(d.Value)[0].startDate);
        $('#SubStructure').val(JSON.parse(d.Value)[0].subStructure).trigger('change');
        $('#SuperStructure').val(JSON.parse(d.Value)[0].superStructure).trigger('change');
        $('#Finishing').val(JSON.parse(d.Value)[0].finishing).trigger('change');
        $('#Sketch').val(JSON.parse(d.Value)[0].sketch).trigger('change');

        $('#SubmissionDrawing').val(JSON.parse(d.Value)[0].submissionDrawing).trigger('change');
        $('#ArchitecturalDrawing').val(JSON.parse(d.Value)[0].architecturalDrawing).trigger('change');
        $('#StructuralDrawing').val(JSON.parse(d.Value)[0].structuralDrawing).trigger('change');
        $('#ElectricalDrawing').val(JSON.parse(d.Value)[0].electricalDrawing).trigger('change');
        $('#PlumbingDrawing').val(JSON.parse(d.Value)[0].plumbingDrawing).trigger('change');
        $('#Estimation').val(JSON.parse(d.Value)[0].estimation).trigger('change');

        $('#TypeOfSupervisionServices').val(JSON.parse(d.Value)[0].typeOfSupervisionServices);
        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);
} 