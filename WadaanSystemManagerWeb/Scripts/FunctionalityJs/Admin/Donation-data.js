

var userId = "";
var username = "";
var roleID = "";
var agentID = "";

var MemberShipID = '';
var full_url = document.URL;
var url_array = full_url.split('=');                        //Split 
MemberShipID = url_array[url_array.length - 1]; 

 $(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
     userId = window.localStorage.getItem("userId");
     username = window.localStorage.getItem('userName');
     roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    $("#paiddate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"] //format also will be added to parseFormats

    });
   
    function validatemember() {

        $('input,select').removeClass('error');
        var isFalse = false;
        if ($("#Reason").val() == '') {
            $('#Reason').css('border', '1px solid #e74c3c');
            isFalse = true;
        }
        if ($("#AmountPaid").val() == '') {
            $('#AmountPaid').css('border', '1px solid #e74c3c');
            isFalse = true;
        }
        
        return isFalse;
    }
    $('#btnSave').on('click', function (e) {

        $("#MemberShipID").val(MemberShipID);
        
        if (!validatemember()) {

            $("#frmAddDonation").ajaxForm();


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
                    clearform();
                    $('#AmountPaid').css('border', '1px solid #e4e4e4');
                    $('#Reason').css('border', '1px solid #e4e4e4');
                    LoadTransactionKendo();
                    location.reload();
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddDonation").ajaxSubmit(options);
            clearform();
        }
        else return false;
    });
 
});
function getNameFromAjaxSuccessByID(getMemberName) {    
     $("#Name").val(getMemberName);
}
 var clearform = function () {
    
    
     $('.reset_donation_btn').click();
}
$('.reset_donation_btn').click(function () {
    $('#AmountPaid').val('');
    $('#paiddate').trigger('reset');
    //$('#filer_input_single').trigger('reset');
    $('#Reason').val('');
    $('#ImageID').val('');
});
 function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    clearform();

    $('#btn-add-update-member').click();


    $('#MemberShipID').val(dataItem.memberShipID.trim());
    $('#Name').val(dataItem.name.trim());
    $('#MobileNo').val(dataItem.mobileNo.trim());
    $('#Email').val(dataItem.email.trim());
    $('#ResidentialAddress').val(dataItem.residentialAddress.trim());
    $('#Category').val($.trim(dataItem.categoryID)).trigger("change");
    $('#ddlCountryName').val($.trim(dataItem.countryID)).trigger("change");
    provinceID = $.trim(dataItem.provinceID);
    tribeID = $.trim(dataItem.tribeID);
    subTribeID = $.trim(dataItem.subTribeID);
    districtID = $.trim(dataItem.subTribeID);
    //$('#ddlProvinceName').val($.trim(dataItem.provinceID)).trigger("change");
    //  $('#ddlDistrictName').val($.trim(dataItem.districtID)).trigger("change");
    // $('#ddlTribeName').val($.trim(dataItem.tribeID)).trigger("change");
    //$('#ddlSubTribe').val($.trim(dataItem.subTribeID)).trigger("change");
    $('.uploadimage').hide();
    $('#type').val('Updatemember');
    loadDDLS(provinceID, tribeID, subTribeID, districtID);
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
            KendoGlobalAjax({ commandName: 'deletememberById', values: "{MemberShipID:'" + id + "'}", CallBack: '' });

            LoadmemberKendo();

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

 
 $('.btn_close').click(function () {
    $('#frmAddUpdateAgent').trigger('reset');

});
 
//AmountPaid

$("#AmountPaid").on("keyup", function (e) { 
    var checkMIN = $('#AmountPaid').val();
    var val = checkMIN;
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
        //do something here

    } else {
        val = re1.exec(val);
        if (val) {
            $(this).val(val[0]); //field.value = val[0];
        } else {
            $(this).val("");
        }
    }

   
});