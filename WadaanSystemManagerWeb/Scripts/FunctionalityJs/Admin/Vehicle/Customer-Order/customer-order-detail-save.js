
$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");


    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    //// $("#UserID").val(userId);
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    var url_arrayForDetail = full_url.split('??');  //Split 
    id = url_array[1].split('??')[0];

   // SubCategoryKendo();
    LoadStore();
});
$('#StoreID').change(function () {
    SubCategoryKendo();
});
function SubCategoryKendo() {

    KendoGlobalAjax({ commandName: 'SubCategory_SelectByStoreID', values: { Id: $('#StoreID :selected').val(), CustomerOrderID: id }, CallBack: LoadSubCategoryData });
}

var LoadSubCategoryData = function (d) {
   
 
     if (JSON.parse(d.Value).length != 0) {
        if (JSON.parse(d.Value)[0][""] == "Already saved") {
            Swal.fire({
                text: 'Already saved.Try another...',
                icon: 'info',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonAriaLabel: 'Ok!',

            });
            KendoSubCategoryGrid([]);
        } else {

    KendoSubCategoryGrid(JSON.parse(d.Value));
         }
     } else {
         Swal.fire({
             text: 'No record exist.Try another...',
             icon: 'error',
             showCloseButton: true,
             focusConfirm: false,
             confirmButtonAriaLabel: 'Ok!',

         });
         KendoSubCategoryGrid([]);
     }
}


var KendoSubCategoryGrid = function (_data) {

    var record = 0;
    var colModel = [
        { field: "subCategoryID", title: "subCategoryID", hidden: true },
        { field: "categoryID", title: "CategoryID", hidden: true },

        {
            field: "subCategoryAutoNumber", title: "#", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }

            //  title: "#", template: "#= ++record #", width: 70,
        },
        // { field: "storeName", title: "Store", width: 170},
        { field: "categoryName", title: "Category", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "subCategoryName", title: "Item Name", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        //  { field: "itemUnit", title: "Unit", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }},
        //{ field: "quantity", title: "Quantity", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }},
        { field: "itemType", title: "Supplier Code", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "itemColor", title: "Item Color", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "itemMade", title: "Item Made", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "itemSize", title: "Item Size", width: 170, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },

        {
            field: "", width: 170,
            title: "Action",


            template: "   <a style='font-size:20px;cursor:pointer;' onClick= SaveOrderDetail(this) title='Save Order Detail Individually' ><span class='fa fa-save'></span></a> "

        }];
    // BindEditAblekendoGrid("grid-Customer-order-list", 50, colModel, _data);
    BindkendoGrid("grid-Customer-order-list", 50, colModel, _data);
};



//$("#btn-closed-receive-order").click(function () {
//    closedReceviedOrder();
//});
$("#btn-add-update-customer-order").click(function () {
    saveCustomerOrderDetail();
});
//function closedReceviedOrder(e) {


//    swal.fire({
//        title: 'Are you sure?',
//        //text: "You won't be able to revert this!",
//        text: "You want to close this order!",
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


//            KendoGlobalAjax({ commandName: 'SupplierOrder_ReceivedStatusChangedByStoreKeeper', values: { Id: id, Status: 'Received', UserID: userId }, CallBack: '' });

//            setTimeout(function () {
//                window.location.href = '/Store/SupplierReceivedOrders', '';
//            }, 50);

//            swal.fire('Closed successfully...', '', 'success');
//        } else {
//            swal.fire("Cancelled", '', "error");

//        }
//    });
//}



function saveCustomerOrderDetail(e) {

    var grid = $("#grid-Customer-order-list").data("kendoGrid");

    var receivedGrid = grid.dataSource._data;

      
    for (var i = 0; i < receivedGrid.length; i++) {


        var data = {


            CustomerOrderDetailID: '00000000-0000-0000-0000-000000000000',
            ItemID: receivedGrid[i].subCategoryID,
            CustomerOrderID: id,
            StoreID: $("#StoreID :selected").val(),
            UserId: window.localStorage.getItem("userId")
        }

        KendoGlobalAjax({ commandName: 'CustomerOrderDetail_Save', values: { data: JSON.stringify(data) }, CallBack: '' });

    }
   
   SubCategoryKendo();
    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
}

//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


function LoadStore() { KendoGlobalAjax({ commandName: 'listStoreDDL', values: '{}', CallBack: getLoadStore }); }
var getLoadStore = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#StoreID"), "Select Store"); }


//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------
function SaveOrderDetail(e) {
    var row = $(e).closest("tr");
    var grid = $("#grid-Customer-order-list").data("kendoGrid");
    var dataItem = grid.dataItem(row);
     
    var data = {


        CustomerOrderDetailID: '00000000-0000-0000-0000-000000000000',
        ItemID: dataItem.subCategoryID,
        CustomerOrderID: id,
        StoreID: $("#StoreID :selected").val(),
        UserId: window.localStorage.getItem("userId")



        //   Quantity: $("#grid-Customer-order-list .k-master-row:eq(" + i + ") td:eq(7)").html(),
    }

    KendoGlobalAjax({ commandName: 'CustomerOrderDetail_Save', values: { data: JSON.stringify(data) }, CallBack: '' });
    

    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 600
    });
    setTimeout(function () {

        SubCategoryKendo();
    }, 50);
}