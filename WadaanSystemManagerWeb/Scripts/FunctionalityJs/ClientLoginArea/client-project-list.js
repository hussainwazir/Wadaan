
var userId = "";
var username = "";
var roleID = "";

var $grid = "project-of-client-grid";
var IsReadProjectDetail = localStorage.getItem('IsReadProjectDetail');

$(document).ready(function () {
   
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadProjectKendo();

});


function LoadProjectKendo() {
    KendoGlobalAjax({ commandName: 'project_Select_AgainstClient', values: { UserID: userId }, CallBack: loadProjectsOfLoginClient });  
}


var loadProjectsOfLoginClient = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;
 
    var colModel = [

      
  
        { field: "projectID", title: "ProjectID", hidden: true, width: 200 },

        {
            field: "projectName", width: 250, title: "Project Name",
            //template: "# if (IsReadProjectDetail == 'true') { # <a class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a>  # } else  {# #=projectName# #}#",
             template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=projectName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "clientName", title: "Client Name", width: 170, filterable: true },
        { field: "plotHouseNo", title: "Plot House No", width: 170, filterable: true, hidden: true},
        { field: "street", title: "Street", width: 170, filterable: true },
        { field: "townSector", title: "Town/Sector", width: 170, filterable: true },
        { field: "cityName", title: "City Name", width: 170, filterable: true },
        { field: "provinceName", title: "Province ", width: 170, filterable: true },
        { field: "gPSCordinates", title: "GPSCordinates", width: 170, filterable: true, hidden: true },
        { field: "googleLocation", title: "GoogleLocation", width: 170, filterable: true, hidden: true },
        { field: "constructionStatus", title: "Construction Status", width: 170, filterable: true },
        { field: "startDate", title: "StartDate", width: 170, filterable: true, hidden: true },
        { field: "projectAttachements", title: "ProjectAttachements", width: 170, filterable: true,hidden:true },
        { field: "contractorID", title: "ContractorID", width: 170, filterable: true, hidden: true },
        { field: "typeOfSupervisionServices", title: "TypeOfSupervisionServices", width: 170, filterable: true, hidden: true },
//        {
//            field: "", width: 170,
//            title: "Action",


//            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
////            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
//            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Project' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=projectID#')  title='Delete Project'><span class='fa fa-trash'></span></a>"


        //        }
    ];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/CLIENTAREA/ClientArea/ProjectDetail?projectID=' + dataItem.projectID + '';
}

function EditDetail(e) {
    
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Project/Save?projectID=' + dataItem.projectID + '';
}


var deleteRecordByID = function (id) {

    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
        text: "You want to delete this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        buttons: {
            cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {

        if (restult.value) {
            KendoGlobalAjax({ commandName: 'Project_DeleteByID', values: "{ProjectID:'" + id + "'}", CallBack: '' });  
            setTimeout(function () {

                LoadProjectKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

 


$('#btn-add-update-employee').click(function () {
    window.location.href = '/Employee/Save', '';
    //window.open('/Customer/Save', '_blank');

});
//function LoadKendoDates() {
//    $("#licenseExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]
//    }); $("#certificateExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]

//    });
//}
//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country"); }


//function LoadCountry() {
//    KendoGlobalAjax({ commandName: 'listCountry', values: '{}', CallBack: getLoadCountry });
//}

//var getLoadCountry = function (d) {
//    _CountryList += BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country");
//}