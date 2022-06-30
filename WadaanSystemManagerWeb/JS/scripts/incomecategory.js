$(function () {
    GlobalAjax({ commandName: 'listincomecategory', values: '{}', CallBack: loadcategory });

    $('#btnSave').on('click', function (e) {
        // alert('hi');
        if (!validateForm("frmIncomeCategory")) {
            return false;
        }

        $("#frmIncomeCategory").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                clearform();
                Grid(JSON.parse(JSON.parse(response)));
                $('#CategoryModel').modal('hide');
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        };
        $("#frmIncomeCategory").ajaxSubmit(options);
        //clearform();
    });

});
function open_modal() {
    clearform();
    $('#CategoryModel').modal('show');
}



var clearform = function () {
    $('#id').val('00000000-0000-0000-0000-000000000000');
    $('input[type=text]').val('');
    $('input[type=text]').removeClass('invalid');
    $('#CategoryModel').modal('hide');
}
var loadcategory = function (d) {
    Grid(JSON.parse(d.Value));
}
var Grid = function (_data) {
    var $grid = $('#list');
    var colNames = ['Id', 'Name', '', ''];
    var colModel = [
        { name: 'id', jsonmap: 'id', align: "center", hidden: true, key: true },
        { name: 'name', jsonmap: 'name', align: "center", width: 100, searchoptions: { clearSearch: true } },
        { name: 'id', search: false, width: 30, align: "center", exportcol: false, formatter: editDetailFormatter },
        { name: 'id', search: false, width: 30, align: "center", exportcol: false, formatter: deleteFormatter }
    ];
    BindGurrido($grid, jQuery('#pager'), colNames, colModel, _data);
};



function editDetailFormatter(cellvalue, options, rowObject) {
    return "<span onclick=\"GlobalAjax({commandName:'getincomecategorybyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
}

function deleteFormatter(cellvalue, options, rowObject) {
    return "<span onclick=\"deleteincomeCategory('" + cellvalue + "')\"><i class=\"fas fa-trash  gridButton\"><i></span>";
}


function EditDetail(d) {
    var data = JSON.parse(d.Value);
    clearform();
    $('#id').val(data.id);

    $('#categoryName').val(data.name);
    $('#CategoryModel').modal();
}


var deleteincomeCategory = function (id) {
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
            GlobalAjax({ commandName: 'deleteincomecategoryById', values: "{id:'" + id + "'}", CallBack: '' });
            $("#list").jqGrid('delRowData', id);
            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}
