var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {

    ////---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    ////---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    var FkTypeID = getUrlVars();

    $("#FkTypeID").val(FkTypeID);
    LoadComments();

});





function LoadComments() {
   
    KendoGlobalAjax({ commandName: 'Comment_ByAreaID', values: { ByAreaID: $("#FkTypeID").val(), Areatype: $("#Areatype").val() }, CallBack: loadLoadComments });

}
//var loadLoadComments = function (d) {

//    setTimeout(function () {

//        $('#CustomerID').val(JSON.parse(d.Value)[0].customerID);
//        $('.txt-created-date').text(JSON.parse(d.Value)[0].createdDate);
//        $('.txt-subject').text(JSON.parse(d.Value)[0].subject);
//        $('.txt-customer').text(JSON.parse(d.Value)[0].customerName);
//        $('.txt-description').text(JSON.parse(d.Value)[0].description);
//        $('.txt-order-date').text(JSON.parse(d.Value)[0].orderDate);
//        $('.txt-priority').text(JSON.parse(d.Value)[0].priority);
//        $('.txt-status').text(JSON.parse(d.Value)[0].status);
//        $('#dropdown4').val($.trim(JSON.parse(d.Value)[0].status)).text($.trim(JSON.parse(d.Value)[0].status)).trigger("change");

//    }, 50);


//}

var loadLoadComments = function (d) {
    var fileExtension = "";

    $('#LoadAllCooments').html('');



    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

        //$('#LoadAllCooments').append('<li class="media"> <div class="media-left" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <a href="#"> <img class="media-object img-circle comment-img" src="/themes/assets/images/user.png" alt="Generic placeholder image"> </a> </div> <div class="media-body"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + ' </span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p > <hr> </div> </li >');
        $('#LoadAllCooments').append('<li class="media" style="list-style-type:none"> <div class="row"> <div class="col-sm-1" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <div class=""> <a href="#"><img class="media-object img-circle comment-img" src="/../../images/avatar-1.png" style="width:50px"></a> </div> </div> <div class="col-sm-9"> <div class="media-body media-right"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + '</span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p> <hr> </div> </div> </div></li>');
    }


}

//$('body').on('click', '.childValue', function (e) {

//    if ($(e.target).is('span')) {
//        var value = $(e.target).text();
//        alert(value);
//    }
//}); 
//$('#btn-save-comment').on('click', function (e) {

//    var txtComment = $('#txt-add-comment').val();
//    if (txtComment != null || txtComment != '') {

//        KendoGlobalAjax({
//            commandName: 'CustomerOrder_DetailsByID', values: {
//                txtComment: txtComment
//            }, CallBack: loadLoadComments
//        });

//    }

//}); 
//$('#btn-save-comment').on('click', function (e) {


//    if (validateForm('frmAddUpdateComment')) {

//        $("#frmAddUpdateComment").ajaxForm();


//        var options = {
//            success: function (response, statusText, jqXHR) {
//                clearform();
//                $('.btn_close').click();
//                Swal.fire({

//                    icon: 'success',
//                    title: 'Record saved successfully...',
//                    showConfirmButton: false,
//                    timer: 1500
//                });
//                LoadStoreKendo();

//            },
//            error: function (xhr, status, error) {
//                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
//                alert(errmsg);
//            }
//        };
//        $("#frmAddUpdateComment").ajaxSubmit(options);

//    }
//    else return false;
//});


$('#btn-save-comment').on('click', function (e) {
    
    e.preventDefault();

    if ($('#CommentDescription').val() != '') {
    if (validateForm('frmAddUpdateComment')) {
        var frm = $(this).closest("form");
        var frm_id = frm.attr("id");
        var frm_id_splitted = frm_id.split("_");
        var frm_id_splitted_2 = frm_id_splitted[2];

        var frm_serialized = frm.serialize();

        $.ajax({
            url: "/services/Xtreme/multipart",
            method: "POST",
            data: frm_serialized,
            success: function (response, statusText, jqXHR) {
                LoadComments();
                $('#CommentDescription').val('');
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        });
     }
    }
    else return false;
});