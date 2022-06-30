
var userId = "";
var username = "";
var roleID = "";
var status = "Active";

var $grid = "contractor-grid";
var $grid1 = "in-active-contractor-grid";
var $grid2 = "all-contractor-grid";

var IsCreateContractor = localStorage.getItem('IsCreateContractor');
var IsReadContractor = localStorage.getItem('IsReadContractor');
var IsUpdatedContractor = localStorage.getItem('IsUpdatedContractor');
var IsDeleteContractor = localStorage.getItem('IsDeleteContractor');
var IsReadContractorDetail = localStorage.getItem('IsReadContractorDetail');

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
   
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    if (IsCreateContractor == 'false') {

        $('#btn-add-contractor').hide();
    }

    LoadContractorKendo();
});



//-----------------------------------  Active Contractor Grid   ---------------------------------------------------------------------------------------

function LoadContractorKendo() {
    status = "Active";
    KendoGlobalAjax({ commandName: 'Contractor_Select', values: { status: status }, CallBack: loadContractor });
}
var loadContractor = function (d) {
    KendoGrid(JSON.parse(d.Value));

}
var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [



        { field: "contractorID", title: "ContractorID", hidden: true, width: 200 },

        {
            field: "contractorName", width: 180, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadContractorDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=contractorName#</a>  # } else  {# #=contractorName# #}#",

            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "conWhatsApp", title: "WhatsApp", width: 150, filterable: true },
        { field: "phoneNo", title: "Phone No", width: 150, filterable: true },
        { field: "conEmail", title: "Email", width: 170, filterable: true, hidden: true },
        { field: "houseNo", title: "House No", width: 150, filterable: true, },
        { field: "streetNo", title: "Street No", width: 170, filterable: true, hidden: true },
        { field: "townSector", title: "Town/Sector", width: 170, filterable: true, hidden: true },
        { field: "cityName", title: "City Name", width: 150, filterable: true },
        { field: "provinceName", title: "Province Name", width: 150, filterable: true },
        { field: "createdDate", title: "CreatedDate", width: 170, filterable: true, hidden: true },
        { field: "createdBy", title: "CreatedBy", width: 170, filterable: true, hidden: true },
        { field: "modifyDate", title: "ModifyDate", width: 170, filterable: true, hidden: true },
        { field: "modifyBy", title: "ModifyBy", width: 170, filterable: true, hidden: true },
        { field: "isActive", title: "IsActive", width: 170, filterable: true, hidden: true },
        {
            field: "", width: 170,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Contractor' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=contractorID#')  title='Delete Contractor'><span class='fa fa-trash'></span></a>"
            template: "# if (IsUpdatedContractor == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Contractor' <span class='fa fa-edit'></span></a>  # } if (IsDeleteContractor == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=contractorID#')  title='Delete Contractor'<span class='fa fa-trash'</span></a> #}   #",


        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------




//----------------------------------- In Active Contractor Grid   ---------------------------------------------------------------------------------------


$('#in-active-contractor').on('click', function () {
    LoadInActiveContractorAjax();
});
function LoadInActiveContractorAjax() {
    status = 'InActive';
    KendoGlobalAjax({ commandName: 'Contractor_Select', values: { status: status }, CallBack: loadInActiveContractor });
}
var loadInActiveContractor = function (d) {
    KendoGridInActiveContractor(JSON.parse(d.Value));

}
var KendoGridInActiveContractor = function (_data) {

    var record = 0;

    var colModel = [



        { field: "contractorID", title: "ContractorID", hidden: true, width: 200 },

        {
            field: "contractorName", width: 180, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadContractorDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=contractorName#</a>  # } else  {# #=contractorName# #}#",

            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "conWhatsApp", title: "WhatsApp", width: 150, filterable: true },
        { field: "phoneNo", title: "Phone No", width: 150, filterable: true },
        { field: "conEmail", title: "Email", width: 170, filterable: true, hidden: true },
        { field: "houseNo", title: "House No", width: 150, filterable: true, },
        { field: "streetNo", title: "Street No", width: 170, filterable: true, hidden: true },
        { field: "townSector", title: "Town/Sector", width: 170, filterable: true, hidden: true },
        { field: "cityName", title: "City Name", width: 150, filterable: true },
        { field: "provinceName", title: "Province Name", width: 150, filterable: true },
        { field: "createdDate", title: "CreatedDate", width: 170, filterable: true, hidden: true },
        { field: "createdBy", title: "CreatedBy", width: 170, filterable: true, hidden: true },
        { field: "modifyDate", title: "ModifyDate", width: 170, filterable: true, hidden: true },
        { field: "modifyBy", title: "ModifyBy", width: 170, filterable: true, hidden: true },
        { field: "isActive", title: "IsActive", width: 170, filterable: true, hidden: true },
        {
            field: "", width: 170,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Contractor' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=contractorID#')  title='Delete Contractor'><span class='fa fa-trash'></span></a>"
            template: "# if (IsUpdatedContractor == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>  # }   #",


        }];

    BindkendoGrid($grid1, 50, colModel, _data);
}; 
function ChangeStatus(e) {
    
    var row = $(e).closest("tr");
    var grid = $("#" + $grid1).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
        text: "You want to Update Status!",
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
            KendoGlobalAjax({ commandName: 'Contractor_ChangeStatus', values: "{ContractorID:'" + dataItem.contractorID + "'}", CallBack: '' });
            setTimeout(function () {

               
            }, 50);

            swal.fire('Updated', '', 'success');
            LoadInActiveContractorAjax();
            LoadContractorKendo();
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });


}

//-----------------------------------------------------------------------------------------------------------------------------------------------------




//-----------------------------------  All Contractor Grid   ---------------------------------------------------------------------------------------


$('#all-contractors').on('click', function () {
    status = 'All';
    KendoGlobalAjax({ commandName: 'Contractor_Select', values: { status: status }, CallBack: loadALLContractor });
});

var loadALLContractor = function (d) {
    KendoGridloadALLContractor(JSON.parse(d.Value));

}
var KendoGridloadALLContractor = function (_data) {

    var record = 0;

    var colModel = [



        { field: "contractorID", title: "ContractorID", hidden: true, width: 200 },

        {
            field: "contractorName", width: 180, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadContractorDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=contractorName#</a>  # } else  {# #=contractorName# #}#",

            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "conWhatsApp", title: "WhatsApp", width: 150, filterable: true },
        { field: "phoneNo", title: "Phone No", width: 150, filterable: true },
        { field: "conEmail", title: "Email", width: 170, filterable: true, hidden: true },
        { field: "houseNo", title: "House No", width: 150, filterable: true, },
        { field: "streetNo", title: "Street No", width: 170, filterable: true, hidden: true },
        { field: "townSector", title: "Town/Sector", width: 170, filterable: true, hidden: true },
        { field: "cityName", title: "City Name", width: 150, filterable: true },
        { field: "provinceName", title: "Province Name", width: 150, filterable: true },
        { field: "createdDate", title: "CreatedDate", width: 170, filterable: true, hidden: true },
        { field: "createdBy", title: "CreatedBy", width: 170, filterable: true, hidden: true },
        { field: "modifyDate", title: "ModifyDate", width: 170, filterable: true, hidden: true },
        { field: "modifyBy", title: "ModifyBy", width: 170, filterable: true, hidden: true },
        { field: "isActive", title: "IsActive", width: 170, filterable: true, hidden: true },
        {
            field: "", width: 170,
            title: "Action",
            hidden: true,

            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Contractor' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=contractorID#')  title='Delete Contractor'><span class='fa fa-trash'></span></a>"
           // template: "# if (IsUpdatedContractor == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Contractor' <span class='fa fa-edit'></span></a>  # } else if (IsDeleteContractor == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=contractorID#')  title='Delete Contractor'<span class='fa fa-trash'</span></a> #}   #",


        }];

    BindkendoGrid($grid2, 50, colModel, _data);
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------












function LoadRecordByID(e) {

     
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MContractorDetail?contractorID=' + dataItem.contractorID + '';
}

function EditDetail(e) {
  
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/MContractorSave?contractorID=' + dataItem.contractorID + '';
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
            KendoGlobalAjax({ commandName: 'Contractor_DeleteByID', values: "{ContractorID:'" + id + "'}", CallBack: '' });  
            setTimeout(function () {

                LoadContractorKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}


 
 
 
 