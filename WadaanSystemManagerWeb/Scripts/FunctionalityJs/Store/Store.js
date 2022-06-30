

var userId = "";
var username = "";
var roleID = "";
var agentID = "";
var _AgentList = ": -- All --";
var $grid = "grid-agent";
$(document).ready(function () {

 
//---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    
//---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    $("#Age").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats

    });
    LoadStoreKendo();
   // LoadKendo();
   // LoadAgent();


    function validateStore() {

        $('input').removeClass('error');
        var isFalse = false;
        if ($("#StoreName").val() == '') {
            $("#StoreName").addClass('error'); isFalse = true;
        }  
        return isFalse;
    }
    $('#btnSave').on('click', function (e) {
         
         
        if (!validateStore()) {

            $("#frmAddStore").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    clearform();
                    $('.btn_close').click();
                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('.uploadimage').show();
                    $('#type').val('addStore');
                    LoadStoreKendo();
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddStore").ajaxSubmit(options);
            clearform();
        }
        else return false;
    });


});

var loadStore = function (d) {

    KendoGrid(JSON.parse(d.Value));
}


var KendoGrid = function (_data) {


    var record = 0;

    var colModel = [
        {
            title: "#", template: "#= ++record #", width: "1%"
        },
      //  { field: "storeLog", title: "Store Log", template: "<img src='../../Temp/#= storeLog #' style='width:50%' />", width: "8%" },
        { field: "storeID", title: "StoreID", hidden: true },
        { field: "storeName", title: "Store Name", width: "10%" },
        { field: "createdDate", title: "CreatedDate", width: "10%" },
        { field: "storeAddress", title: "StoreAddress", width: "50%" },
        { field: "storeDescription", title: "StoreDescription",   hidden: true },
       
        {
            field: "", width: 80,
            title: "Action",
            //template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Sub Agent' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=subAgentID#')  title='Delete Sub Agent'><span class='icofont icofont-ui-delete'></span></a> "
            template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Store' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=storeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a> <a href=javascript:getRecordByID('#=storeID#') style='font-size:20px;color:black;' /*onClick= getRecordByID('#=agentID#')*/  title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>"
        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

 

var clearform = function () {
    $('.uploadimage').show();
    $('input[type=text],textarea').val('');
   // $('.reset_btn').trigger('reset');
}
function editDetailFormatter(cellvalue) {

    return "<span onclick=\"KendoGlobalAjax({commandName:'getagentbyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    clearform();

    $('#btn-add-update-store').click();

    
    $('#StoreID').val(dataItem.storeID.trim());
    $('#StoreName').val(dataItem.storeName.trim());
    $('#StoreDescription').val(dataItem.storeDescription.trim());
    $('#StoreAddress').val(dataItem.storeAddress.trim());
    $('.uploadimage').hide();
    $('#type').val('UpdateStore');

   

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
            KendoGlobalAjax({ commandName: 'deleteStoreById', values: "{id:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadStoreKendo();
            }, 100);


            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

function LoadStoreKendo() {
    KendoGlobalAjax({ commandName: 'listStore', values: { UserID: $('#UserID').val() }, CallBack: loadStore });
}


$('.reset_btn').click(function () {
    document.getElementById("filer_input_single").value = null;
});
$('.btn_close').click(function () {
    $('#frmAddUpdateAgent').trigger('reset');
    document.getElementById("filer_input_single").value = null;
});
$('#btn-add-update-store').click(function () {
    $('.uploadimage').show();
    $('#type').val('addStore');
     
    document.getElementById("filer_input_single").value = null;
    clearform();
    $('#Username').prop('disabled', false);
    $('#Password').prop('disabled', false);
});
  

function LoadCredentialData() {
    KendoGlobalAjax({ commandName: 'checkCredential', values: $('#Username').val(), CallBack: loadCredentialData });
}
 
var loadCredentialData = function (d) {

    if ($('#Aciton').val() == 'Insert') {

        if (JSON.parse(d.Value) != null) {
            if (this.values == JSON.parse(d.Value)["username"]) {
                $('#Username').val('');
                document.getElementById("Username").placeholder = JSON.parse(d.Value)["username"] + " already exists.Try another...";
                $('#Username').css('border-color', 'red');
            } else {
                $('#Username').css('border-color', '#d9d9d9');
            }
        } else {
            $('#Username').css('border-color', '#d9d9d9');
        }
    }
}

//-------------------------- CHECK CREDENTIAL END-------------------------------------------------------------
function getRecordByID(id) {
    
   // window.location.href = '/Home/AgentDetails?Id=' + id + '';
    var url= '/Home/AgentDetails?Id=' + id + '';
  var win =   window.open(url, '_blank');
    win.focus();
    
}
//------------------CHECK CREDENTIAL END-------------------------------------------------------------

  

var loadAgent = function (d) {
    _AgentList += BindCombo(JSON.parse(d.Value), $("#roleID"));
}

function LoadAgent() {
    KendoGlobalAjax({ commandName: 'listagentbyrole', values: '{}', CallBack: loadAgent });
}


