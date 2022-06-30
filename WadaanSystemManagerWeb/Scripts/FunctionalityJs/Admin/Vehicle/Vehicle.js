
var userId = "";
var username = "";
var roleID = "";

var $grid = "grid-Customer";
 
$(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadCustomerKendo();
   
});

function LoadCustomerKendo() {
    KendoGlobalAjax({ commandName: 'Vehicle_Select', values: {}, CallBack: loadVehicles });
}

var loadVehicles = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;
 
    var colModel = [
      
        { field: "vehicleID", title: "VehicleID", hidden: true },
        { field: "model", title: "Model", width: 170, filterable: true },
        { field: "vehicleType", width: 170, title: "Vehicle Type", filterable: true },
        { field: "platNo", width: 170, title: "Platform Number", filterable: true},
        { field: "driver", width: 170, title: "Driver", filterable: true },
        { field: "made", title: "Made", width: 170, filterable: true },
        { field: "ownership", title: "Ownership", width: 170, filterable: true },
    
       
        {
            field: "", width: 170,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Vehicle' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=vehicleID#')  title='Delete Vehicle'><span class='icofont icofont-ui-delete'></span></a> <a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a> "

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {


    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Vehicles/Detail?VehicleID=' + dataItem.vehicleID + '';
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Vehicles/Save?VehicleID=' + dataItem.vehicleID + '';
}


var deleteRecordByID = function (id) {

    swal.fire({
        title: 'Are you sure?',
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
            KendoGlobalAjax({ commandName: 'Vehicles_Delete', values: "{VehicleID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadCustomerKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

$('#btn-add-update-vehicle').click(function () {
    window.location.href = '/Vehicles/Save', '';
   

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
