var full_url = document.URL; // Get current url
var url_array = full_url.split('='); //Split 
var employeeIDFromURL = url_array[url_array.length - 1];//Get ID
$('#EmployeeID').val(employeeIDFromURL);
var userId = "";

var $grid = "grid-recursive-addition-deduction";
$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.sessionStorage.getItem("userId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#userId").val(userId);
    // LoadRecursiveAdditionDeductionKendo();



    $('#btnSetting').on('click', function (e) {


        if (validateForm('frmAddRecursiveAdditionDeduction')) {

            $("#frmAddRecursiveAdditionDeduction").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    clearRecursiveAdditionDeduction();
                    $('.btn_close').click();
                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1000
                    });

                    clearRecursiveAdditionDeduction();
                    setTimeout(function () {
                        LoadRecursiveAdditionDeductionKendo();
                    }, 50);

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddRecursiveAdditionDeduction").ajaxSubmit(options);

        }

        else return false;
    });

});

function LoadRecursiveAdditionDeductionKendo() {

    KendoGlobalAjax({ commandName: 'RecursiveAdditionDeduction_SelectbyEmployeeId', values: { EmployeeID: employeeIDFromURL }, CallBack: loadRecursiveAdditionDeduction });
}
var loadRecursiveAdditionDeduction = function (d) {
    KendoGrid(JSON.parse(d.Value));
}
var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [
        { field: "recursiveID", title: "RecursiveID", hidden: true },
        { field: "employeeID", title: "EmployeeID", hidden: true },
        { field: "nameofEmployee", title: "Employee", width: 100, filterable: false },
        { field: "name", title: "Name", width: 100, filterable: false },
        { field: "recursiveType", title: "Type", width: 100, filterable: false },
        { field: "amount", title: "Amount", width: 100, filterable: false },

        {
            field: "", width: 170,
            title: "Action",
            template: "  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=recursiveID#')  title='Delete'><span class='icofont icofont-ui-delete'></span></a> "

        }];

    BindkendoGrid($grid, 50, colModel, _data);
    //setTimeout(function () {

    //    var gridElement = $('#grid-recursive-addition-deduction');
    //    var dropDown = gridElement.find("#loadDoctors").kendoDropDownList({
    //        dataTextField: "name",
    //        dataValueField: "id",
    //        autoBind: false,
    //        optionLabel: "All",
    //        dataSource: {

    //            severFiltering: true,
    //            data: _DoctorArray
    //        },
    //        change: function () {

    //            var value = this.value();
    //            if (value) {
    //                LoadPatientFeeRecord(value);
    //                //KendoGlobalAjax({ commandName: 'listTotalDoctorFee', values: { UserID: userId, StoreID: storeId, DoctorID: doctorCustomID }, CallBack: getLoadTotalDoctorFee });
    //                gridElement.data("kendoGrid").dataSource.filter({ field: "doctorID", operator: "eq", value: value });
    //            } else {
    //                LoadPatientFeeRecord('00000000-0000-0000-0000-000000000000');
    //                gridElement.data("kendoGrid").dataSource.filter({});
    //            }
    //        }
    //    });
    //}, 50);

};


var clearRecursiveAdditionDeduction = function () {
    $('#frmAddRecursiveAdditionDeduction').trigger('reset');
    $('.reset_btn').click();
}

function EditDetail(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    clearRecursiveAdditionDeduction();


    $('input,select,textarea').removeClass('error');

    $('#RecursiveID').val(dataItem.recursiveID.trim());
    $('#Amount').val(dataItem.amount);
    $('#EmployeeID').val(dataItem.employeeID.trim());
    $('#Name').val(dataItem.name);


    $('#RecursiveType').val(dataItem.recursiveType).trigger("change");


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
            KendoGlobalAjax({ commandName: 'RecursiveAdditionDeduction_deleteByID', values: { RecursiveID: id }, CallBack: '' });

            setTimeout(function () {
                LoadRecursiveAdditionDeductionKendo();
            }, 50);
            swal.fire('Deleted', '', 'success');

        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}



$('.reset_btn').click(function () {
    $('#frmAddRecursiveAdditionDeduction').trigger('reset');
    $('#Name').focus();

});
$('.btn_close').click(function () {
    $('#frmAddRecursiveAdditionDeduction').trigger('reset');

});
$('#settings1-tab').click(function () {

    LoadRecursiveAdditionDeductionKendo();
});