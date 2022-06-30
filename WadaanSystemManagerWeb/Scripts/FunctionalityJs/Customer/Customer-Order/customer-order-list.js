


var userId = "";
var username = "";
var roleID = "";

var $grid = "grid-Customer-order-list";


$(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    LoadCustomerOrderKendo();

});


function LoadCustomerOrderKendo() { KendoGlobalAjax({ commandName: 'CustomerOrder_Select', values: {}, CallBack: loadCustomerOrder }); }
var loadCustomerOrder = function (d) { KendoGrid(JSON.parse(d.Value)); }
var KendoGrid = function (_data) {


    var record = 0;

    var colModel = [
        { field: "customerOrderID", title: "CustomerOrderID", hidden: true },
        { field: "customerID", title: "CustomerID", hidden: true },
        {
            title: "#",width: 70,
            //template: "#= ++record #", width: 70,
            template: "<a  class='viewbutton' onClick= LoadRecordByID(this)  title='Show Details'>000#=++record#</a> ", attributes: { "class": "table-cell", style: "text-align: center; font-weight: bold;" }
        },
        {
            field: "customerName", width: 170, title: "Customer Name",
        //    template: "<a  class='viewbutton' onClick= LoadRecordByID(this)  title='Show Details'>#=customerName#</a> "

        },
        { field: "subject", title: "Subject", width: 170, hidden: false, filterable: false },
      //  { field: "description", title: "Description", width: 170, hidden: false, filterable: false },
        { field: "priority", title: "Priority", width: 170, hidden: false, filterable: false },
        { field: "status", title: "Status", width: 150, filterable: false ,
 template: "#  if (status == 'Pending' ) { #  <label class='label label-danger'>#=status #</label>  #} else if (status == 'Completed' ) { #  <label class='label label-success'>#=status #</label>  #} else   { #  <label class='label label-warning'>#=status #</label>  #}  # "
},
        { field: "orderDate", title: "OrderDate", width: 150, filterable: false },
        {
            field: "", width: 170, title: "Action",
        //    template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Order' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=customerOrderID#')  title='Delete Order'><span class='icofont icofont-ui-delete'></span></a><a style='font-size:20px;cursor:pointer;' onClick= createCustomerDetail(this)  title='Create Batch Order Detail'><span class='fa fa-plus-square'></span></a>"
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Order' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=customerOrderID#')  title='Delete Order'><span class='icofont icofont-ui-delete'></span></a>"

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Customer/OrderDetail?customerOrderID=' + dataItem.customerOrderID + '';
}


function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    window.location.href = '/Customer/SaveOrder?customerOrderID=' + dataItem.customerOrderID + '';



}

function createCustomerDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    window.location.href = '/Customer/SaveOrderDetail?customerOrderID=' + dataItem.customerOrderID + '';



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
            KendoGlobalAjax({ commandName: 'CustomerOrder_DeleteByID', values: "{CustomerOrderID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadCustomerOrderKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}


$('#btn-add-update-customer-order').click(function () {
    window.location.href = '/Customer/SaveOrder', '';


});
