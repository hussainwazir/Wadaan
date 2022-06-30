


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

    LoadCustomerOrderDataByID();
    LoadKendoDates();
    LoadCustomer();
    LoadStore();
    setTimeout(function () {

        $('.tox-notification--warning').hide();
    }, 1500);
    //$('#btnSave').on('click', function (e) {

    //    $("#UserID").val('00000000-0000-0000-0000-000000000000');
    //    $("#Description").val(tinymce.get("Description").getContent({ format: "html" }));
    //    if (customvalidateForm('frmAddUpdateCustomerOrder')) {

    //        $("#frmAddUpdateCustomerOrder").ajaxForm();


    //        var options = {
    //            success: function (response, statusText, jqXHR) {

    //                Swal.fire({

    //                    icon: 'success',
    //                    title: 'Record saved successfully...',
    //                    showConfirmButton: false,
    //                    timer: 1500
    //                });
    //                //  LoadEmployeesKendo();
    //                window.location.href = '/Customer/OrderList';
    //            },
    //            error: function (xhr, status, error) {
    //                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
    //                alert(errmsg);
    //            }
    //        };
    //        $("#frmAddUpdateCustomerOrder").ajaxSubmit(options);

    //    }
    //    else return false;
    //});
    $('#btnSave').on('click', function (e) {
        
        $("#UserID").val(userId);
        $("#Description").val(tinymce.get("Description").getContent({ format: "html" }));
        if ($('#StoreIDddl').val() == '00000000-0000-0000-0000-000000000000' || $('#StoreIDddl').val().length == 0) {
            $('.k-multiselect').css('border', '1px solid red');
            return false
        } else {
            $('.k-multiselect').css('border', 'transparent');
        }
        if (customvalidateForm('frmAddUpdateCustomerOrder')) {


            $("#frmAddUpdateCustomerOrder").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                   
                    itemListInsertion(JSON.parse(JSON.parse(response)));

                    
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateCustomerOrder").ajaxSubmit(options);

        }
        else return false;
    });

});

function itemListInsertion(CustomerOrderID) {

    //var gridData = $("#tbl-items-tbody-record");
    //gridData.find('tr').each(function (i) {
    //    var $tds = $(this).find('td').attr('data-id');

    //    var orderItemData = {
    //        SupplierOrderDetailID: $(this).find('td').attr('data-supplierOrderDetailID') != '' ? $(this).find('td').attr('data-supplierOrderDetailID') :'00000000-0000-0000-0000-000000000000',
    //        SupplierOrderID: SupplierOrderID,
    //        ItemID: $(this).find('td').attr('data-id'),
    //        DamageItemCount: '0',
    //        ItemUnit: $(this).find('.ItemUnit').val(),
    //        Quantity: $(this).find('.Quantity').val(),  
    //        UnitPrice: $(this).find('.Price').val(),
    //        TotalPrice: 0,
    //        UserId: $('#UserID').val()
    //    }

    //  KendoGlobalAjax({ commandName: 'SupplierOrderDetail_Save', values: { data: JSON.stringify(orderItemData) }, CallBack: showSuccessMessage });

    //});



 
    $("#StoreIDddl :selected").map(function (i, el) {
        var saveData = {
            CustomerOrderID: CustomerOrderID,
            StoreID: $(el).val(),
            //  SupplierOrderDetailID: SupplierOrderDetailID.value,
            CustomerOrderMultipleRecordID:'00000000-0000-0000-0000-000000000000',// CustomerOrderMultipleRecordID.value,
            UserId: userId,
            CustomerID: $('#CustomerID :selected').val()
        }

       KendoGlobalAjax({ commandName: 'CustomerOrderMultipleDetails_Save', values: { data: JSON.stringify(saveData) }, CallBack: showSuccessMessage });
    });


    //var saveData = {
    //    SupplierOrderID: SupplierOrderID,
    //    StoreID: $('#StoreIDddl :selected').val(),
    //    //  SupplierOrderDetailID: SupplierOrderDetailID.value,
    //    SupplierOrderMultipleRecordID: SupplierOrderMultipleRecordID.value,
    //    UserId: userId,
    //    SupplierID: $('#SupplierID :selected').val()
    //}

    //KendoGlobalAjax({ commandName: 'SupplierOrderMultipleDetails_Save', values: { data: JSON.stringify(saveData) }, CallBack: showSuccessMessage });

}

var showSuccessMessage = function (d) {

    Swal.fire({

        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
    window.location.href = '/Customer/OrderList';

}


function LoadKendoDates() {
    $("#OrderDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]

    });
}


//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


function LoadCustomer() { KendoGlobalAjax({ commandName: 'Customer_SelectDDL', values: '{}', CallBack: getLoadCustomer }); }
var getLoadCustomer = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CustomerID"), "Select Customer"); }


function LoadStore() { KendoGlobalAjax({ commandName: 'listStoreDDL', values: '{}', CallBack: getLoadStore }); }
var getLoadStore = function (d) {

    BindkendoMultiSelect(JSON.parse(d.Value), $("#StoreIDddl"), "");

    //var required = $("#StoreIDddl").kendoMultiSelect().data("kendoMultiSelect");
    var optional = $("#StoreIDddl").kendoMultiSelect({
        autoClose: false
    }).data("kendoMultiSelect");

}

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadCustomerOrderDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'CustomerOrder_DetailsByID', values: "{id:'" + id + "'}", CallBack: loadCustomersDataByID });
    }

}
var loadCustomersDataByID = function (d) {

    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
        $('#CustomerOrderID').val(JSON.parse(d.Value)[0].customerOrderID);
        $('#Subject').val(JSON.parse(d.Value)[0].subject);

        $('#Status').val(JSON.parse(d.Value)[0].status);
        $("#OrderDate").kendoDatePicker({ value: JSON.parse(d.Value)[0].orderDate, format: "dd/MM/yyyy" });
        $('#CustomerID').val($.trim(JSON.parse(d.Value)[0].customerID)).trigger("change");
        $('#Priority').val($.trim(JSON.parse(d.Value)[0].priority)).trigger("change");
 
            $('#Description').val(JSON.parse(d.Value)[0].description);
        
        //    $('#Status').val($.trim(JSON.parse(d.Value)[0].status)).trigger("change");

    }, 50);


}
