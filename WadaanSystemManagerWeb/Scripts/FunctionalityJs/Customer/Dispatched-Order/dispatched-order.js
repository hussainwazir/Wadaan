


var userId = "";
var username = "";
var roleID = "";

var $grid = "grid-dispatched";


$(document).ready(function () {

    //---------------------------------  MENU SELECTED LI COLOR CHANGE START----------------------------------------------------------------------------   
  
    
    $('li.active').removeClass('active');
    $('.DispatchedOrder').addClass('active');
    $('.DispatchedOrder >a').css('color', '#1ABC9C !important')
    //---------------------------------  MENU SELECTED LI COLOR CHANGE END ----------------------------------------------------------------------------   


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadDispatchedKendo();



});


function LoadDispatchedKendo() {
    KendoGlobalAjax({ commandName: 'DispatchedOrder_Select', values: {}, CallBack: loadDispatchedOrder });
}


var loadDispatchedOrder = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {


    var record = 0;


    var colModel = [
        { field: "customerOrderID", title: "CustomerOrderID", hidden: true },
        { field: "batchOrderID", title: "BatchOrderID", hidden: true },
        { field: "customerID", title: "CustomerID", hidden: true },
        {
            title: "#", width: 70,
            template: "<a  class='viewbutton' onClick= LoadRecordByID(this)  title='Show Details'>000#=++record#</a> ", attributes: { "class": "table-cell", style: "text-align: center; font-weight: bold;" }
        },
        {
            field: "firstName", width: 170, title: "Customer Name",

        },
        { field: "subject", title: "Subject", width: 170, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "status", title: "Status", width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "#  if (status == 'Dispatched' ) { #  <label class='label label-success'>#=status #</label>  #} else   { #  <label class='label label-warning'>#=status #</label>  #}  # "},
        {
            field: "orderDate", title: "OrderDate", width: 150, filterable: false,
            template: "  <label class='label label-success'>#=orderDate #</label>  "
     
        }
        //{
        //    field: "", width: 170, title: "Action",
        //    //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
        //    template: "   <a style='font-size:20px;' onClick= EditDetail(this) title='Edit Batch Order' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=batchOrderID#')  title='Delete BatchOrder'><span class='icofont icofont-ui-delete'></span></a>"

        //}
];
    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Customer/DispatchedOrderDetail?BatchID=' + dataItem.batchOrderID + '';
} 

var clearform = function () {

    $('.reset_btn').click();
}


function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Manufacturing/SaveBatchOrder?customerOrderID' + dataItem.batchOrderID + 'customerName' + dataItem.firstName + 'CustomerID' + 0 + '', '';

   // window.location.href = '/Manufacturing/SaveBatchOrder?BatchID=' + dataItem.BatchID + '';



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
            KendoGlobalAjax({ commandName: 'BatchOrder_DeleteByID', values: "{BatchOrderID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadDispatchedKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}



$('.reset_btn').click(function () {
    $('#frmAddUpdateBatch').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddUpdateBatch').trigger('reset');

});

$('#btn-add-update-Batch').click(function () {
    window.location.href = '/Manufacturing/SaveBatchOrder', '';

});


//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country"); }


