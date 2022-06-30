jqGridGuriddo();
Select2Dropdown();
var _categoryList = ": -- All --";

$(function () {
    $.jgrid.defaults.styleUI = 'Bootstrap4';
    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.iconSet = 'fontAwesome';

    DatePickerSetting($('#dpexpenseDate'));

    $('.select2').select2({
        placeholder: 'Select'
    });
    GlobalAjax({ commandName: 'listexpensecategory', values: '{}', CallBack: loadCategory });

    GlobalAjax({ commandName: 'listexpense', values: '{}', CallBack: loadExpense });

    $('#btnSave').on('click', function (e) {
        // alert('hi');
        if (!validateForm("frmExpense")) {
            return false;
        }

        $("#frmExpense").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                clearform();
                Grid(JSON.parse(JSON.parse(response)));
                $('#ExpenseModel').modal('hide');
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmExpense").ajaxSubmit(options);
    });
});
function open_modal() {
    clearform();
    $('#ExpenseModel').modal('show');
}

var loadCategory = function (d) {
    _categoryList += BindCombo(JSON.parse(d.Value), $("#Category"));
}

var clearform = function () {
    $('#id').val('00000000-0000-0000-0000-000000000000');
    $('input[type=text]').val('');
    $('input[type=text]').removeClass('invalid');
    $('#ExpenseModel').modal('hide');
}
var loadExpense = function (d) {
    Grid(JSON.parse(d.Value));
}
var Grid = function (_data) {
    var dateSearch = {
        clearSearch: true,
        sopt: ['eq'],
        dataInit: function (e) {
            $(e).datepicker({
                format: 'dd/mm/yyyy',
                changeYear: true,
                changeMonth: true,
                showWeek: true
            })
                .change(function () {
                    $grid[0].triggerToolbar();
                });
        }
    };



    var $grid = $('#list');
    var colNames = ['Id', 'Name', 'Description', 'Amount', 'Date', 'Category', '', ''];
    var colModel = [
        { name: 'id', jsonmap: 'id', align: "center", hidden: true, key: true },
        { name: 'name', jsonmap: 'name', align: "center", width: 100, searchoptions: { clearSearch: true } },
        { name: 'description', jsonmap: 'description', align: "center", width: 100, searchoptions: { clearSearch: true } },
        { name: 'amount', jsonmap: 'amount', align: "center", width: 100 },
        {
            name: 'expenseDate', align: "center", editable: false, sortable: true, stype: 'text', width: 65,
            formatter: 'date',
            formatoptions: {
                newformat: 'd/m/Y',
            },
            sorttype: 'date',
            search: true,
            searchoptions: dateSearch
        },
        {
            name: 'category', jsonmap: 'category', align: "center", search: true, width: 70,
            stype: "select",
            searchoptions: {
                value: _categoryList,
                sopt: ['eq', 'cn']
            }
        },
        { name: 'id', search: false, width: 30, align: "center", exportcol: false, formatter: editDetailFormatter },
        { name: 'id', search: false, width: 30, align: "center", exportcol: false, formatter: deleteFormatter }
    ];
    BindGurrido($grid, jQuery('#pager'), colNames, colModel, _data);
};



function editDetailFormatter(cellvalue, options, rowObject) {
    return "<span onclick=\"GlobalAjax({commandName:'getexpensebyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
}

function deleteFormatter(cellvalue, options, rowObject) {
    return "<span onclick=\"deleteExpense('" + cellvalue + "')\"><i class=\"fas fa-trash  gridButton\"><i></span>";
}


function EditDetail(d) {
    //alert('hi');
    var data = JSON.parse(d.Value);
    clearform();
    $('#id').val(data.id);
    $('#name').val(data.name);
    $('#description').val(data.description);
    $('#amount').val(data.amount);
    $('#Category').val(data.categoryId).trigger("change");
    $('#expenseDate').val(dateFormat(data.expenseDate));
    $('#ExpenseModel').modal();
}


var deleteExpense = function (id) {
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
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
        //alert(id);
        if (restult.value) {
            GlobalAjax({ commandName: 'deleteexpenseById', values: "{id:'" + id + "'}", CallBack: '' });
            $("#list").jqGrid('delRowData', id);
            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}
