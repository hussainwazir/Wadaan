


var userId = "";
var username = "";
var roleID = "";
var agentID = "";
var _QualificationList = ": -- All --";
var _CountryList = ": -- All --";
var _ProvinceList = ": -- All --";
var _DistrictList = ": -- All --";
var _TribeList = ": -- All --";
var _SubTribeList = ": -- All --";
var $grid = "grid-member";
//$(window).on('load', function () {

//        //setTimeout($('#loading').hide(), 6000); //wait for page load PLUS two seconds.

//    });

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
    LoadmemberKendo();
    // LoadKendo();
    // LoadAgent();
    LoadCountry();
    LoadProvince('00000000-0000-0000-0000-000000000000');
    LoadDistrict();
    LoadTribe();
    LoadSubTribe();
    LoadQualification();

    function validatemember() {

        $('input,select').removeClass('error');
        var isFalse = false;
        if ($("#Name").val() == '') {
            $("#Name").addClass('error'); isFalse = true;
        }
        if ($("#FName").val() == '') {
            $("#FName").addClass('error'); isFalse = true;
        }
        if ($("#MobileNo").val() == '') {
            $("#MobileNo").addClass('error'); isFalse = true;
        }
        if ($("#ddlCountryName").val() == '00000000-0000-0000-0000-000000000000') {
            $("#ddlCountryName").addClass('error'); isFalse = true;
        }
        if ($("#ddlProvinceName").val() == '00000000-0000-0000-0000-000000000000') {
            $("#ddlProvinceName").addClass('error'); isFalse = true;
        }
        if ($("#ddlDistrictName").val() == '00000000-0000-0000-0000-000000000000') {
            $("#ddlDistrictName").addClass('error'); isFalse = true;
        }
        if ($("#ddlTribeName").val() == '00000000-0000-0000-0000-000000000000') {
            $("#ddlTribeName").addClass('error'); isFalse = true;
        }
        if ($("#ddlSubTribe").val() == '00000000-0000-0000-0000-000000000000') {
            $("#ddlSubTribe").addClass('error'); isFalse = true;
        }
        if ($("#ddlQualificationName").val() == '00000000-0000-0000-0000-000000000000') {
            $("#ddlQualificationName").addClass('error'); isFalse = true;
        }
        if ($("#PassportNo").val() == '') {
            $("#PassportNo").addClass('error'); isFalse = true;
        }
        if ($("#NIC").val() == '') {
            $("#NIC").addClass('error'); isFalse = true;
        }
        if ($("#Email").val() == '') {
            $("#Email").addClass('error'); isFalse = true;
        }
        if ($("#Profession").val() == '') {
            $("#Profession").addClass('error'); isFalse = true;
        }
        if ($("#Designation").val() == '') {
            $("#Designation").addClass('error'); isFalse = true;
        }
        if ($("#Organization").val() == '') {
            $("#Organization").addClass('error'); isFalse = true;
        }
        if ($("#ddlProvinceName").val() == '' || $("#ddlProvinceName").val() == null) {
            $("#ddlProvinceName").addClass('error'); isFalse = true;
        }
        if ($("#ddlDistrictName").val() == '' || $("#ddlDistrictName").val() == null) {
            $("#ddlDistrictName").addClass('error'); isFalse = true;
        }
        if ($("#ddlTribeName").val() == '' || $("#ddlTribeName").val() == null) {
            $("#ddlTribeName").addClass('error'); isFalse = true;
        }
        if ($("#ddlSubTribe").val() == '' || $("#ddlSubTribe").val() == null) {
            $("#ddlSubTribe").addClass('error'); isFalse = true;
        }
        if ($("#ResidentialAddress").val() == '') {
            $("#ResidentialAddress").addClass('error'); isFalse = true;
        } if ($("#Category").val() == '00000000-0000-0000-0000-000000000000') {
            $("#Category").addClass('error'); isFalse = true;
        }
        if (!($("#Email").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/))) {
            $("#Email").addClass('error');
            $("#Email").attr('title', 'Enter valid email');
            isFalse = true;
        }
        return isFalse;
    }
    $('#NIC').on('onkeypress', function (e) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    });
    $('#btnSave').on('click', function (e) {

        $("#UserID").val(userId);

        if (!validatemember()) {

            $("#frmAddmember").ajaxForm();


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
                    LoadmemberKendo();

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddmember").ajaxSubmit(options);

        }
        else return false;
    });
    $('#btn-add-ddl-record').on('click', function (e) {

        
        if ($("#DropDownTitle").val() == '') {
            $("#DropDownTitle").css('border-color', '#e74c3c');
        } else {
            $('#common-Modal').hide();

            if ($('#DDLName').val() == 'Country') {
                KendoGlobalAjax({ commandName: 'addCountryTitle', values: { Title: $('#DropDownTitle').val(), UserID: userId }, CallBack: '' });

                setTimeout(function () { LoadCountry(); $("#DropDownTitle").val(''); }, 100);
            } else if ($('#DDLName').val() == 'Province') {

                KendoGlobalAjax({ commandName: 'addProvinceTitle', values: { Title: $('#DropDownTitle').val(), UserID: userId, CountryID: $('#ddlCountryName :selected').val() }, CallBack: '' });
                $("#DropDownTitle").val('');
                setTimeout(function () { LoadProvince($("#ddlCountryName").val()); $("#DropDownTitle").val(''); }, 100);
            } else if ($('#DDLName').val() == 'District') {
                KendoGlobalAjax({ commandName: 'addDistrictTitle', values: { Title: $('#DropDownTitle').val(), UserID: userId }, CallBack: '' });

                setTimeout(function () { LoadDistrict($("#ddlProvinceName").val()); }, 100);
            } else if ($('#DDLName').val() == 'Tribe') {
                KendoGlobalAjax({ commandName: 'addTribeTitle', values: { Title: $('#DropDownTitle').val(), UserID: userId }, CallBack: '' });

                setTimeout(function () { LoadTribe($("#ddlDistrictName").val()); $("#DropDownTitle").val(''); }, 100);
            } else if ($('#DDLName').val() == 'SubTribe') {
                KendoGlobalAjax({ commandName: 'addSubTribeTitle', values: { Title: $('#DropDownTitle').val(), UserID: userId }, CallBack: '' });

                setTimeout(function () { LoadSubTribe($("#ddlTribeName").val()); $("#DropDownTitle").val(''); }, 100);

            }
        }

    });

});
function fncheck(name) {
    

        //if (name == 'Province') {
        //    if ($('#ddlCountryName :selected').val() == '00000000-0000-0000-0000-000000000000') {
        //        $('#common-Modal').addClass('hide').removeClass('show');
              
        //        $('#ddlCountryName').addClass('error');
               
        //        return false;
        //    } else {
        //       $('#ddlCountryName').removeClass('error');
        //        $('#common-Modal').addClass('show').removeClass('hide');
        //        $('#common-Modal').show();
               
        //    }
        //}
   
    $('#DropDownTitle').val('');
    $('#DDLName').val('');
    $('#DDLName').val(name);

}

var loadmember = function (d) {

    KendoGrid(JSON.parse(d.Value));
}


var KendoGrid = function (_data) {


    var record = 0;

    var colModel = [
        { field: "memberShipID", title: "memberShipID", hidden: true },
        {
            title: "#", template: "#= ++record #", width: 70,
        },

        {
            field: "name", width: 170,

            title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=memberShipID#' >#=name#</a>"
            template: "<a  class='viewbutton' onClick= LoadRecordByID(this)  title='Show Details'>#=name#</a> "

        },
        {
            field: "fName", title: "Father Name", width: 170
        },
        { field: "mobileNo", title: "Mobile No", width: 120 },

        { field: "createdDate", title: "Reg Date", width: 120 },
        { field: "email", title: "Email", width: 200 },
        { field: "nic", hidden: true, title: "NIC", width: 120 },
        { field: "countryID", hidden: true, title: "countryId", width: 120 },
        { field: "profession", hidden: true, title: "Profession", width: 120 },
        { field: "passportNo", hidden: true, title: "PassportNo", width: 120 },
        { field: "qualificationID", hidden: true, title: "QualificationID", width: 120 },
        { field: "countryName", title: "Country", width: 120 },
        { field: "provinceID", hidden: true, title: "provinceId", width: 120 },
        { field: "provinceName", title: "Province", width: 120 },
        { field: "districtID", hidden: true, title: "districtId", width: 120 },
        { field: "districtName", title: "District", width: 120 },
        { field: "tribeID", hidden: true, title: "tribeId", width: 120 },
        { field: "tribeName", title: "Tribe", width: 120 },
        { field: "subTribeID", hidden: true, title: "subTribeId", width: 120 },
        { field: "subTribeName", title: "Sub Tribe", width: 120 },
        { field: "categoryID", hidden: true, title: "CategoryID", width: 120 },
        { field: "categoryName", title: "CategoryName", width: 120 },
        { field: "rate", title: "Rate", width: 120 },
        { field: "organization", title: "Organization", width: 120, hidden: true, },
        { field: "designation", title: "Designation", width: 120, hidden: true, },
        { field: "membershipNumber", title: "membershipNumber", width: 120, hidden: true, },


        { field: "residentialAddress", title: "Address", width: 150 },


        {
            field: "", width: 170,
            title: "Action",
            //template: "<a style='font-size:20px;' onClick= EditDetail(this) title='Edit Sub Agent' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=subAgentID#')  title='Delete Sub Agent'><span class='icofont icofont-ui-delete'></span></a> "
            //   template: "#  if (signature == '' ) { # <label data-modal='modal-UploadSignature-member' onClick= Editsignature(this)  class='pcoded-badge label label-danger' style='cursor: pointer;'>No Signature</label># }else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= signature #' class='viewbutton'>Download</a>#} #<a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=memberShipID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"


            template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=memberShipID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    sessionStorage.setItem('memberName', dataItem.name);
    window.location.href = '/Home/memberDashboard?memberID=' + dataItem.memberShipID + '';
}

var clearform = function () {

    $('.reset_btn').click();
}
function editDetailFormatter(cellvalue) {

    return "<span onclick=\"KendoGlobalAjax({commandName:'getagentbyid',values:{id:'" + cellvalue + "'},CallBack:EditDetail})\"><i class=\"fas fa-edit gridButton\"><i></span>";
}
function OpenMembershipPrint(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.open('/Home/MembershipPrint?' + dataItem.memberShipID + '', '_blank');

}
function Editsignature(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    $('#btn-add-update-Signature').click();


    $('#MemberShipID').val(dataItem.memberShipID);

    $('#type').val('uploadmembersignature');

}

//function fnLoadSignautrePreview(imageValue) {

//    $('.ImagePreviewArea').show();
//    $('.showSignaturePreview').attr('src', imageValue)
//}
//function fnLoadImagePreview(imageValue) {

//    $('.ImagePreviewArea').show();
//    $('.showImagePreview').attr('src', imageValue)
//}
var provinceID = '';
var tribeID = '';
var districtID = '';
var subTribeID = '';
function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    clearform();

    $('input,select,textarea').removeClass('error');

    if (dataItem.memberShipID != '') {
        $('.ImagePreviewArea').show();
        if (dataItem.signature != "") {

            $('.showSignaturePreview').attr('src', '../../Temp/' + dataItem.signature)
        } else {
            $('.showSignaturePreview').attr('src', '../../Temp/' + 'xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png')
        }
        if (dataItem.picture != null) {
            $('.showImagePreview').attr('src', '../../Temp/' + dataItem.picture)
        } else {

            $('.showImagePreview').attr('src', '../../Temp/' + 'xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png')
        }

    } else {

        $('.ImagePreviewArea').hide();
    }

    $('.membershipNumber').show();

    $('#MembershipNumber').val(dataItem.membershipNumber);
    $('#MemberShipID').val(dataItem.memberShipID.trim());
    $('#Name').val(dataItem.name.trim());
    $('#Designation').val(dataItem.designation);
    $('#Organization').val(dataItem.organization);
    $('#MobileNo').val(dataItem.mobileNo.trim());
    $('#Email').val(dataItem.email.trim());
    $('#FName').val(dataItem.fName.trim());
    $('#NIC').val(dataItem.nic.trim());
    $('#Profession').val(dataItem.profession.trim());
    $('#PassportNo').val(dataItem.passportNo.trim());
    $('#ResidentialAddress').val(dataItem.residentialAddress.trim());

    $('#ddlQualificationName').val($.trim(dataItem.qualificationID)).trigger("change");
    $('#Category').val($.trim(dataItem.categoryID)).trigger("change");
    $('#ddlCountryName').val($.trim(dataItem.countryID)).trigger("change");
    provinceID = $.trim(dataItem.provinceID);
    tribeID = $.trim(dataItem.tribeID);
    subTribeID = $.trim(dataItem.subTribeID);
    districtID = $.trim(dataItem.districtID);
    //$('#ddlProvinceName').val($.trim(dataItem.provinceID)).trigger("change");
    //  $('#ddlDistrictName').val($.trim(dataItem.districtID)).trigger("change");
    // $('#ddlTribeName').val($.trim(dataItem.tribeID)).trigger("change");
    //$('#ddlSubTribe').val($.trim(dataItem.subTribeID)).trigger("change");
    // $('.uploadimage').hide();
    //   $('#type').val('Updatemember');
    loadDDLS(dataItem.countryID, provinceID, tribeID, subTribeID, districtID);
}
function loadDDLS(countryID, provinceID, tribeID, subTribeID, districtID) {
    $('#CountryID').val(countryID);
    $('#ProvinceID').val(provinceID);
    $('#DistrictID').val(districtID);
    $('#TribeID').val(tribeID);
    $('#SubTribeID').val(subTribeID);


    //LoadProvince(countryID);
    //LoadDistrict(provinceID);
    //LoadTribe(districtID)
    //LoadSubTribe(tribeID)

    setTimeout(function () {
        $('#ddlProvinceName').val(provinceID);
        $('#ddlDistrictName').val(districtID);
        $('#ddlTribeName').val(tribeID);
        $('#ddlSubTribe').val(subTribeID);
        $("#modal-add-update-member").addClass('md-show').removeClass('md-close');

    }, 250);

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

function LoadmemberKendo() {
    KendoGlobalAjax({ commandName: 'listMember', values: {}, CallBack: loadmember });
}


$('.reset_btn').click(function () {
    $('#frmAddmember').trigger('reset');
});
$('.btn_close').click(function () {
    $('#frmAddmember').trigger('reset');

});
$('#btn-add-update-member').click(function () {

    LoadMembershipNumberInitially();
    // $('.membershipNumber').hide();
    $('input,select,textarea').removeClass('error');
    $('.uploadimage').show();
    $('#type').val('addmember');
    $('#MemberShipID').val('00000000-0000-0000-0000-000000000000');
    $('.ImagePreviewArea').hide();
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
    var url = '/Home/AgentDetails?Id=' + id + '';
    var win = window.open(url, '_blank');
    win.focus();

}
//------------------CHECK CREDENTIAL END-------------------------------------------------------------


function LoadMembershipNumberInitially() {
    KendoGlobalAjax({ commandName: 'loadMembershipNoInitially', values: '{}', CallBack: getLoadMembershipNumberInitially });
}

var getLoadMembershipNumberInitially = function (d) {

    $('#MembershipNumber').val(JSON.parse(d.Value).membershipNumber);
}




var getLoadQualification = function (d) {
    _QualificationList += BindComboForDefault(JSON.parse(d.Value), $("#ddlQualificationName"), "Select Qualification");
}

function LoadQualification() {
    KendoGlobalAjax({ commandName: 'listQualification', values: '{}', CallBack: getLoadQualification });
}


var getLoadCountry = function (d) {
    _CountryList += BindComboForDefault(JSON.parse(d.Value), $("#ddlCountryName"), "Select Country");
}

function LoadCountry() {
    KendoGlobalAjax({ commandName: 'listCountry', values: '{}', CallBack: getLoadCountry });
}


var getLoadProvince = function (d) {
    _ProvinceList += BindComboForDefault(JSON.parse(d.Value), $("#ddlProvinceName"), "Select Province");
}

function LoadProvince(countryid) {
    KendoGlobalAjax({ commandName: 'listProvince', values: { countryid: countryid }, CallBack: getLoadProvince });
}
$("#ddlCountryName").change(function () {
    var id = this.value;
    $("#CountryID").val(id);
    if (id == 0)
        id = '00000000-0000-0000-0000-000000000000';
    LoadProvince(id);
});


var getLoadDistrict = function (d) {
    _DistrictList += BindComboForDefault(JSON.parse(d.Value), $("#ddlDistrictName"), "Select District");
}

function LoadDistrict(Provinceid) {
    KendoGlobalAjax({ commandName: 'listDistrict', values: { Provinceid: Provinceid }, CallBack: getLoadDistrict });
}
$("#ddlProvinceName").change(function () {
    var id = this.value; $("#ProvinceID").val(id);
    if (id == 0)
        id = '00000000-0000-0000-0000-000000000000';
    //  LoadDistrict(id);
});





var getLoadTribe = function (d) {
    _TribeList += BindComboForDefault(JSON.parse(d.Value), $("#ddlTribeName"), "Select Tribe");
}

function LoadTribe(Districtid) {
    KendoGlobalAjax({ commandName: 'listTrib', values: { Districtid: Districtid }, CallBack: getLoadTribe });
}
$("#ddlDistrictName").change(function () {
    var id = this.value; $("#DistrictID").val(id);
    if (id == 0)
        id = '00000000-0000-0000-0000-000000000000';
    // LoadTribe(id);
});

var getLoadSubTribe = function (d) {
    _SubTribeList += BindComboForDefault(JSON.parse(d.Value), $("#ddlSubTribe"), "Select Sub Tribe");
}

function LoadSubTribe(TribeID) {
    KendoGlobalAjax({ commandName: 'listSubTrib', values: { TribeID: TribeID }, CallBack: getLoadSubTribe });
}
$("#ddlTribeName").change(function () {
    var id = this.value; $("#TribeID").val(id);
    if (id == 0)
        id = '00000000-0000-0000-0000-000000000000';
    //  LoadSubTribe(id);
});

$("#ddlSubTribe").change(function () {
    var id = this.value; $("#SubTribeID").val(id);

}); $("#ddlQualificationName").change(function () {
    var id = this.value; $("#QualificationID").val(id);

});

$("#ddlGenderName").change(function () {
    var id = this.value;
    $("#Gender").val(id);

});

$(".btn_close").click(function () {

    $("#modal-add-update-member").addClass('md-close').removeClass('md-show');

});


//$('body').keypress(function (e) {
//    if (e.which === 13) {        
//        $("#btnSave").click();
//    }
//});

function fnGetCategoryName(customCategoryID) {
    if (customCategoryID.value != 0)
        KendoGlobalAjax({ commandName: 'listCategoryRate', values: { CategoryID: customCategoryID.value }, CallBack: getfnGetCategoryName });
}

var getfnGetCategoryName = function (d) {

    $('#Rate').val(JSON.parse(d.Value)[0].rate);

}


$("#NIC").on("keyup", function (e) {
    var i = event.keyCode;
    var checkMax = $('#NIC').val().length;

    if (parseInt(checkMax) > 13) {

        var strng = document.getElementById("NIC").value;
        var getNIC = $('#NIC').val().substring(0, strng.length - 1);
        $('#NIC').val(getNIC);
    }
});