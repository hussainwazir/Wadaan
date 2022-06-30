
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
    $('.divAttachment').show();
});

function LoadCustomerKendo() {
    KendoGlobalAjax({ commandName: 'CustomerAgreement_Select', values: {}, CallBack: loadCustomerAgreement });
}

var loadCustomerAgreement = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [
        { field: "referenceID", title: "Reference ID", hidden: true },
        { field: "fullName", width: 170, title: "FullName", filterable: true },
        { field: "busesMounthlyAmount", width: 170, title: "Buses Monthly Amount", filterable: true },
        { field: "startDate", title: "Start Date", width: 170, filterable: true },
        { field: "endDate", width: 170, title: "End Date", filterable: true },


        {
            field: "", width: 170,
            title: "Action",

            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Customer Agreement' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=referenceID#')  title='Delete Customer Agreement'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>"

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {


    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/CustomerAgreement/Details?referenceID=' + dataItem.referenceID + '';
}

function EditDetail(e) {
    
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/CustomerAgreement/Save?referenceID=' + dataItem.referenceID + '';
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
            KendoGlobalAjax({ commandName: 'CustomerAgreement_Delete', values: "{ReferenceID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadCustomerKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}


$('#btn-add-update-customerAgreement').click(function () {
    window.location.href = '/CustomerAgreement/Save', '';


});

