

var userId = "";
var username = "";
var roleID = "";
var agentID = "";
$(document).ready(function () {


    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

   
    LoadPrintData();

});
//====================================== AJAX DATA LOAD START ================================================================
function LoadPrintData() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?'); //Split 
    var memberShipID = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'MembershipPrintByID', values: { MemberShipID: memberShipID }, CallBack: loadDataForPrint });


}
var loadDataForPrint = function (d) {
    
    $('#txt-regno').text(JSON.parse(d.Value).membershipNumber)
    $('#txt-district').text(JSON.parse(d.Value).districtName)
    $('#txt-province').text(JSON.parse(d.Value).provinceName)
    $('#txt-country-name').text(JSON.parse(d.Value).countryName)

    $('#txt-name').text(JSON.parse(d.Value).name)
    $('#txt-fathername').text(JSON.parse(d.Value).fName)
    $('#txt-profession').text(JSON.parse(d.Value).profession)
    $('#txt-cnic').text(JSON.parse(d.Value).nic)
    $('#txt-passport-no').text(JSON.parse(d.Value).passportNo)
    $('#txt-tribe').text(JSON.parse(d.Value).tribeName)
    $('#txt-sub-tribe').text(JSON.parse(d.Value).subTribeName)
    $('#txt-contact-no').text(JSON.parse(d.Value).mobileNo)
    $('#txt-email').text(JSON.parse(d.Value).email)
 
    $('#txt-qualification').text(JSON.parse(d.Value).qualificationName)
    $('#txt-residential-address').text(JSON.parse(d.Value).residentialAddress)
   // $('#txt-membership-category').text(JSON.parse(d.Value).title + JSON.parse(d.Value).rateType + JSON.parse(d.Value).rate + JSON.parse(d.Value).memberShipYear)
    $('#txt-membership-category').text(JSON.parse(d.Value).categoryName+' ' + JSON.parse(d.Value).rateType +' '+ JSON.parse(d.Value).rate + ' ' + JSON.parse(d.Value).memberShipYear)
    //$('.signature').attr('src', '../../Temp/' + JSON.parse(JSON.parse(d.Value).signature)
    //memberImage
     
    if (JSON.parse(d.Value).signature != "") {
        $('.txt-signature').attr('src', '../../Temp/' + JSON.parse(d.Value).signature)
    }
    if (JSON.parse(d.Value).memberImage != "") {
        $('.memberImage').attr('src', '../../Temp/' + JSON.parse(d.Value).memberPicture)
    }
}

//====================================== AJAX DATA LOAD END ================================================================


//$('#btn-print').click(function () {
//    window.print();
   
//});
$('#btn-print').click(function () {
   // PrintElem();

     window.print();
});


function PrintElem() {


    var contents = $("#div-print").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
  //  frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>DIV Contents</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />');
    frameDoc.document.write('<link href="/Content/Assets/css/PrintMembership.css" rel="stylesheet" type="text/css" />');

    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);



  //  return true;
}