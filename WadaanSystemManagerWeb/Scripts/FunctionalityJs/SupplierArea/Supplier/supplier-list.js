
var userId = "";
var username = "";
var roleID = "";

var status = 'Active';
var $grid = 'supplier-grid';
var $grid1 = 'in-active-supplier-grid';
var $grid2 = 'all-supplier-grid';

var IsCreateSupplier = localStorage.getItem('IsCreateSupplier');
var IsReadSupplier = localStorage.getItem('IsReadSupplier');
var IsUpdatedSupplier = localStorage.getItem('IsUpdatedSupplier');
var IsDeleteSupplier = localStorage.getItem('IsDeleteSupplier');
var IsReadSupplierDetail = localStorage.getItem('IsReadSupplierDetail');


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId); 

    if (IsCreateSupplier == 'false') {
        $('#btn-add-new-supplier').hide();
    }

    LoadSupplierKendo();

});

// ====================================== For Actice Supplier Record ===========================================
$("#active-supplier").on("click", function () {

    LoadSupplierKendo();
});



function LoadSupplierKendo()
{
    status = 'Active';
    KendoGlobalAjax({ commandName: "Supplier_Select", values: { Status: status }, CallBack: loadSupplier });
}

var loadSupplier = function (dd)
{
    KendoGridActive(JSON.parse(dd.Value));
}

 
var KendoGridActive = function (_dataa) {
   
    var record = 0;

    var colModel = [

        { field: "supplierID", title: "SupplierID", hidden: true, width: 200 },
        {
            field: "firstName", width: 190, title: "First Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            //template: "# if (IsReadSupplierDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a>  # } else  {# #=firstName# #}#",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
           
        { field: "lastName", title: "Last Name", width: 150, filterable: true },
        { field: "homeAddress", title: "Home Address", width: 170, filterable: true, hidden: true },
        { field: "telephone", title: "Telephone", width: 150, filterable: true },
        { field: "mobileNo", title: "Mobile", width: 150, filterable: true },
        { field: "fax", title: "Fax", width: 170, filterable: true, hidden: true },
        { field: "email", title: "Email Address", width: 150, filterable: true },
        { field: "supplierType", title: "Supplier Type", width: 150, filterable: true},
        { field: "bankAccountNo", title: "Bank Account Number", width: 170, filterable: true, hidden: true },
        { field: "paymentMethod", title: "Payment Method", width: 170, filterable: true, hidden: true },
        { field: "paymentTerm", title: "Payment Term", width: 170, filterable: true, hidden: true},
        { field: "contactPersonName", title: "Contact Person Name", width: 170, filterable: true, hidden: true },
        { field: "contactPersonMobileNumber", title: "Contact Person Mobile Number", width: 170, filterable: true, hidden: true},
           
        {
            field: "", width: 170,
            title: "Action",
           // template: "# if (IsUpdatedSupplier == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Supplier' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteSupplier == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=supplierID#')  title='Delete Supplier'<span class='fa fa-trash'></span></a> #}   #",
            template: " <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Supplier' <span class='fa fa-edit'></span></a>   <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=supplierID#')  title='Delete Supplier'<span class='fa fa-trash'></span></a> ",
        }];

    BindkendoGrid("supplier-grid", 50, colModel, _dataa);
};


// ====================================== For In-Actice Supplier Record ===========================================

$("#in-active-supplier").on('click', function () {
    loadinActiveSupplierRecord();
    KendoGlobalAjax({ commandName: 'Supplier_Select', values: { Status: status }, CallBack: '' });  
});

var loadinActiveSupplierRecord = function (d)
{
    status = "inActive";
    KendoGlobalAjax({ commandName: 'Supplier_Select', values: { Status: status }, CallBack: loadinActiveSupplierRecordfun });  

}

var loadinActiveSupplierRecordfun = function (d)
{
    
    KendoGridSupplierInActiveRecord(JSON.parse(d.Value));
}

var KendoGridSupplierInActiveRecord = function (_data)
{
   
    var record = 0;
    var colModel = [

        { field: "supplierID", title: "SupplierID", hidden: true, width: 200 },
        {
            field: "firstName", width: 190, title: "First Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
           // template: "# if (IsReadSupplierDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a>  # } else  {# #=firstName# #}#",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "lastName", title: "Last Name", width: 150, filterable: true },
        { field: "homeAddress", title: "Home Address", width: 170, filterable: true, hidden: true },
        { field: "telephone", title: "Telephone", width: 150, filterable: true },
        { field: "mobileNo", title: "Mobile", width: 150, filterable: true },
        { field: "fax", title: "Fax", width: 170, filterable: true, hidden: true },
        { field: "email", title: "Email Address", width: 150, filterable: true },
        { field: "supplierType", title: "Supplier Type", width: 150, filterable: true },
        { field: "bankAccountNo", title: "Bank Account Number", width: 170, filterable: true, hidden: true },
        { field: "paymentMethod", title: "Payment Method", width: 170, filterable: true, hidden: true },
        { field: "paymentTerm", title: "Payment Term", width: 170, filterable: true, hidden: true },
        { field: "contactPersonName", title: "Contact Person Name", width: 170, filterable: true, hidden: true },
        { field: "contactPersonMobileNumber", title: "Contact Person Mobile Number", width: 170, filterable: true, hidden: true },

        {
            field: "", width: 170,
            title: "Action",
            template: "# if (IsUpdatedSupplier == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>  # }   #",
            template: " <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a> ",
           // template: "# if (IsUpdatedSupplier == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Supplier' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteSupplier == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=supplierID#')  title='Delete Supplier'<span class='fa fa-trash'></span></a> #}   #",
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
            KendoGlobalAjax({ commandName: 'Supplier_ChangeStatus', values: "{SupplierID:'" + dataItem.supplierID + "'}", CallBack: '' });
            setTimeout(function () {
                loadinActiveSupplierRecord();

            }, 50);

            swal.fire('Updated', '', 'success');
            LoadInActiveContractorAjax();
            LoadContractorKendo();
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });


}


// ===================================================== All Supplier Record ==============================================


$("#all-supplier").on('click', function () {
    status = 'All';
    KendoGlobalAjax({ commandName: 'Supplier_Select', values: { status: status }, CallBack: loadAllSupplierRecordFun });

});

var loadAllSupplierRecordFun = function(d)
{
    KendoGridAllSupplier(JSON.parse(d.Value));
}

var KendoGridAllSupplier = function (_data)
{

    var record = 0;

    var colModel = [

        { field: "supplierID", title: "SupplierID", hidden: true, width: 200 },
        {
            field: "firstName", width: 190, title: "First Name",
            //template: "# if (IsReadSupplierDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a>  # } else  {# #=firstName# #}#",
           // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "lastName", title: "Last Name", width: 150, filterable: true },
        { field: "homeAddress", title: "Home Address", width: 170, filterable: true, hidden: true },
        { field: "telephone", title: "Telephone", width: 150, filterable: true },
        { field: "mobileNo", title: "Mobile", width: 150, filterable: true },
        { field: "fax", title: "Fax", width: 170, filterable: true, hidden: true },
        { field: "email", title: "Email Address", width: 150, filterable: true },
        { field: "supplierType", title: "Supplier Type", width: 150, filterable: true },
        { field: "bankAccountNo", title: "Bank Account Number", width: 170, filterable: true, hidden: true },
        { field: "paymentMethod", title: "Payment Method", width: 170, filterable: true, hidden: true },
        { field: "paymentTerm", title: "Payment Term", width: 170, filterable: true, hidden: true },
        { field: "contactPersonName", title: "Contact Person Name", width: 170, filterable: true, hidden: true },
        { field: "contactPersonMobileNumber", title: "Contact Person Mobile Number", width: 170, filterable: true, hidden: true },


        {
            field: "", width: 170,
            title: "Action",
            hidden: true,

            template: "# if (IsUpdatedSupplier == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Supplier' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteSupplier == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=supplierID#')  title='Delete Supplier'<span class='fa fa-trash'></span></a> #}   #",
        }];

    BindkendoGrid($grid2, 50, colModel, _data);
}

// ===================================================== All Supplier Record END==============================================


function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/S/Supplier/SupplierDetails?supplierID=' + dataItem.supplierID + '';
} 
function EditDetail(e) {
  
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/S/Supplier/Save?supplierID=' + dataItem.supplierID + '';
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
            KendoGlobalAjax({ commandName: 'Supplier_DeleteByID', values: "{SupplierID:'" + id + "'}", CallBack: '' });  
            setTimeout(function () {

                LoadSupplierKendo();

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

//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country"); }


//function LoadCountry() {
//    KendoGlobalAjax({ commandName: 'listCountry', values: '{}', CallBack: getLoadCountry });
//}

//var getLoadCountry = function (d) {
//    _CountryList += BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country");
//}