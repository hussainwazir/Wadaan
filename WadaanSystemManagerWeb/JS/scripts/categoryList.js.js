
var $grid = "kendogridid";
$(document).ready(function () {
    LoadKendo();

    $('#btnSave').on('click', function (e) {

        if (!validateForm("frmIncomeCategory")) {
            return false;
        }

        $("#frmIncomeCategory").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                clearform();
                KendoGrid(JSON.parse(JSON.parse(response)));
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

var loadcategory = function (d) {
     
    KendoGrid(JSON.parse(d.Value));
}


var KendoGrid = function (_data) {
     

    var record = 0;

    var colModel = [
        {
            title: "#",
            template: "#= ++record #",
            width: 35
        },  
        { field: "id", title: "Id", hidden: true},
        { field: "name", title: "Name", width: "30%" },
        {
            title: "Action", field: "Status", width: 80,
            template: "<a onClick= EditDetail(this)  ><span class='fas fa-edit gridButton'></span></a> <a onClick= deleteincomeCategory('#=id#')  ><span class='fas fa-trash  gridButton'></span></a>"
                }]; 
       
    BindkendoGrid($grid,50,  colModel, _data);
};

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
function editDetailFormatter(cellvalue) {
    
    return "<span onclick=\"GlobalAjax({commandName:'getincomecategorybyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
}
 
function EditDetail(e) {  

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row); 
     
    clearform();
    $('#id').val(dataItem.id);

    $('#categoryName').val(dataItem.name);
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
            LoadKendo();
            clearform(); 
            $('#CategoryModel').modal('hide');

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

function LoadKendo() {
    KendoGlobalAjax({ commandName: 'listincomecategory', values: '{}', CallBack: loadcategory });
} 
 