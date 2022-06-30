
var userId = "";
var username = "";
var roleID = "";
var Status = "";
var SelectedServicesTypeID = "";

var $grid = "services-type-grid";



var IsReadServicesTypeDetail = localStorage.getItem('IsReadServicesTypeDetail');
var IsUpdateServicesTypeDetail = localStorage.getItem('IsUpdateServicesTypeDetail');
var IsDeleteServicesType = localStorage.getItem('IsDeleteServicesType');
var IsCreateServicesType = localStorage.getItem('IsCreateServicesType');



$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadServicesTypeKendo();
    LoadContractTypeDDL();
    LoadProjectCategory();
    LoadResidentialPlotSizeDDL();
    LoadCommercialPlotSizeDDL();

    $('#div-residential').hide();
    $('#div-commercial').hide();
});


$('#btn-send-email').click(function () {

    window.localStorage.setItem("EmailIt", "1");
    window.open('/ServicesType/ServicesType/ServicesTypePrint', '_blank')
});
function LoadServicesTypeKendo() {


    KendoGlobalAjax({ commandName: 'ServicesType_Select', values: {}, CallBack: loadServicesType });
}


var loadServicesType = function (d) { KendoGrid(JSON.parse(d.Value)); }

var KendoGrid = function (_data) {

    var colModel = [

        { field: "contractLookUpId", title: "ContractLookUpId", hidden: true, width: 200 },
        { field: "TaskTypeId", title: "Task TypeId", width: 170, filterable: true, hidden: true },

        {
            field: "contract", width: 140, title: "Contract",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },


        { field: "type", title: "Project Category", width: 170, filterable: true },
        { field: "plotSize", title: "Plot Size", width: 170, filterable: true },
        { field: "workingDays", title: "Total Estimation", width: 170, filterable: true },
        { field: "draftType", title: "Draft Type", width: 170, filterable: true },

        {
            field: "", width: 70, title: "Action",
            template: "  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit ServicesType' ><span class='fa fa-edit'></span></a> "

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};




//function ChangeStatus(e) {

//    var row = $(e).closest("tr");
//    var grid = $("#" + $grid12).data("kendoGrid");
//    var dataItem = grid.dataItem(row);

//    swal.fire({
//        title: 'Are you sure?',
//        text: "You want to Update Status!",
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        buttons: {
//            cancel: {
//                text: "Cancel",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "OK",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {

//        if (restult.value) {
//            KendoGlobalAjax({ commandName: 'ServicesType_ChangeStatus', values: "{ServicesTypeID:'" + dataItem.ServicesTypeID + "'}", CallBack: '' });
//            setTimeout(function () {

//                LoadInActiveServicesTypeKendo();
//            }, 50);

//            swal.fire('Updated', '', 'success');

//            LoadInActiveServicesTypeKendo();
//        } else {
//            swal.fire("Cancelled", '', "error");

//        }
//    });


//}



//function whatsapp_btn(e) {

//    var row = $(e).closest("tr");
//    var grid = $("#" + $grid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    var ServicesTypeName, city, ServicesTypejobtype, address, designation = '';
//    ServicesTypeName = dataItem.prefix + '.' + dataItem.firstName + " " + dataItem.lastName;
//    designation = dataItem.designationName;
//    ServicesTypejobtype = dataItem.ServicesTypeTypeName;
//    city = dataItem.cityName;
//    address = dataItem.curHouseNo + ' ' + dataItem.curPostalAddress;



//    // var creatingMsg = currentTitle + "\r\n\r\n" + "|PLEASE CLICK ON BELOW LINK TO CHECK COMPLETE DETAILS|\r\n\r\n"
//    var creatingMsg = '*====' + 'EMPLOYE DETAIL' + "====*\r\n\r\n" +
//        'ServicesType:' + ServicesTypeName + "\r\n" +
//        'Designation:' + designation + "\r\n" +
//        'Job Type:' + ServicesTypejobtype + "\r\n" +
//        'City:' + city + "\r\n" +
//        'Address:' + address + "\r\n";
//    var whatsappMessage = window.encodeURIComponent(creatingMsg)

//    window.open('https://wa.me/?text=' + whatsappMessage, '_blank');
//}
//function LoadRecordByID(e) {


//    var row = $(e).closest("tr");
//    var grid = $("#" + $grid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);

//    window.location.href = '/ServicesType/ServicesType/ServicesTypeDetail?ServicesTypeID=' + dataItem.ServicesTypeID + '';
//}


function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#update-modal').modal('show');

   // $('#ContractTypee').val(dataItem.contractLookUpId).trigger('change');
    $('#ContractTypee').val(dataItem.contractLookUpId);
    $('#ProjectCategoryy').val(dataItem.type);
    $('#CommercialPlotSizee').val(dataItem.plotSize);
    $('#ResidentialPlotSizee').val(dataItem.plotSize);
    $('#DraftTypee').val(dataItem.draftType);
 
    $('#WorkingDays').val(dataItem.workingDays);



}
function fnCloseModel() {
    $('#update-modal').modal('hide');
}

//--------------------------------------- DDL LOAD AREA ----------------------------------------------------
function LoadContractTypeDDL() {
    KendoGlobalAjax({ commandName: 'ContractType_SelectDDL', values: '{}', CallBack: fnLoadContractTypeDDL });
}
var fnLoadContractTypeDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ContractType"), "Select Contract Type");
    //BindComboForDefault(JSON.parse(d.Value), $("#ContractTypee"), "Select Contract Type");
}

function LoadProjectCategory() {
    KendoGlobalAjax({ commandName: 'ProjectCategory_SelectDDL', values: '{}', CallBack: fnLoadProjectCategory });
}
var fnLoadProjectCategory = function (d) {
    BindComboForInt(JSON.parse(d.Value), $("#ProjectCategory"), "Select Project Category");
    //BindComboForInt(JSON.parse(d.Value), $("#ProjectCategoryy"), "Select Project Category");
}

function LoadResidentialPlotSizeDDL() {
    KendoGlobalAjax({ commandName: 'ResidentialPlotSize_SelectDDL', values: '{}', CallBack: fnResidentialPlotSizeDDL });
}
var fnResidentialPlotSizeDDL = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ResidentialPlotSize"), "Select Residential Plot Size");
    //BindComboForDefault(JSON.parse(d.Value), $("#ResidentialPlotSizee"), "Select Residential Plot Size");
}

function LoadCommercialPlotSizeDDL() {
    KendoGlobalAjax({ commandName: 'CommercialPlotSize_SelectDDL', values: '{}', CallBack: fnLoadCommercialPlotSize });
}
var fnLoadCommercialPlotSize = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#CommercialPlotSize"), "Select Commercial Plot Size");
    //BindComboForDefault(JSON.parse(d.Value), $("#CommercialPlotSizee"), "Select Commercial Plot Size");
}




//--------------------------------------- DDL LOAD AREA ----------------------------------------------------



//Change event for Project Timeline Estimation
function GetProjectTimelineEstimationResidential() {

    //var ContractType = $('#ContractType option:selected').text();
    var ContractType = $('#ContractType').val();
    var ProjectCategory = $('#ProjectCategory option:selected').text();
    var PlotSizeName = $('#ResidentialPlotSize option:selected').text();

    KendoGlobalAjax({ commandName: 'GetProjectTimeestimation', values: { categoryTypeName: ProjectCategory, ContractType: ContractType, PlotSizename: PlotSizeName }, CallBack: fnGetProjectTimelineEstimationResidential });
}
var fnGetProjectTimelineEstimationResidential = function (d) {
    if (JSON.parse(d.Value)[0] == undefined) {

    } else {
        $('#lbl-project-time-line-estimation').text(JSON.parse(d.Value)[0].result + ' ' + 'Days');
    }
}


function GetProjectTimelineEstimationCommercial() {


    // var ContractType = $('#ContractType option:selected').text();
    var ContractType = $('#ContractType').val();
    var ProjectCategory = $('#ProjectCategory option:selected').text();
    var PlotSizeName = $('#CommercialPlotSize option:selected').text();
    KendoGlobalAjax({ commandName: 'GetProjectTimeestimation', values: { categoryTypeName: ProjectCategory, ContractType: ContractType, PlotSizename: PlotSizeName }, CallBack: fnGetProjectTimelineEstimationCommercial });
}
var fnGetProjectTimelineEstimationCommercial = function (d) {
    if (JSON.parse(d.Value)[0] == undefined) {

    } else {

        $('#lbl-project-time-line-estimation').text(JSON.parse(d.Value)[0].result + ' ' + 'Days');
    }
}




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




function fnLoadSearchData(e) {

    var ContractType = $('#ContractType').val();   //ID
    var ProjectCategory = $('#ProjectCategory option:selected').text();  //Residential
    var ResidentialPlotSize = $('#ResidentialPlotSize option:selected').text(); //01-05 Marla

    var PlotSizeName = $('#CommercialPlotSize option:selected').text();
    var DraftType = $('#DraftType option:selected').text();

    KendoGlobalAjax({
        commandName: 'ServicesType_SelectByIDs', values: {
            ContractType: ContractType,
            ProjectCategory: ProjectCategory,
            ResidentialPlotSize: ResidentialPlotSize,
            PlotSizeName: PlotSizeName != "Select Commercial Plot Size" ? PlotSizeName : ResidentialPlotSize,
            DraftType: DraftType

        }, CallBack: loadServicesType
    });
}




$('#btnSave').click(function () {
 
    if (customvalidateForm('frmAddUpdateModel')) {

        $("#frmAddUpdateModel").ajaxForm();

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
                $('#update-modal').modal('hide');
                LoadServicesTypeKendo();

                btn.disabled = false;
                btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save';
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmAddUpdateModel").ajaxSubmit(options);

    }
    else {

        btn.disabled = true;
        btn.innerHTML = '<i class = "fa fa - save fa - save"> </i> Save...';
        return false;
    }

});
