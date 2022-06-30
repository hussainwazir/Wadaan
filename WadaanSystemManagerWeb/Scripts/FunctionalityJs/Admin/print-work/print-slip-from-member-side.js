

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


    LoadPrintSlipData();

});
//====================================== AJAX DATA LOAD START ================================================================
function LoadPrintSlipData() {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?'); //Split 
    var donationID = url_array[url_array.length - 1];//Get ID
  
   // KendoGlobalAjax({ commandName: 'getDonationPrintRecordFromMemberByID', values: { MemberShipID: memberShipID }, CallBack: loadSlipData });

    KendoGlobalAjax({ commandName: 'getDonationPrintRecordByID', values: { DonationID: donationID }, CallBack: loadSlipData });

}
var loadSlipData = function (d) {
 console.log (JSON.parse(d.Value))
    $('#txt-name').text(JSON.parse(d.Value).name)
    $('#txt-address').text(JSON.parse(d.Value).residentialAddress)
    $('#txt-donor-mobile-no').text(JSON.parse(d.Value).mobileNo)
    $('#txt-donation-type').text(JSON.parse(d.Value).donationType)
    $('.txt-donation-amount-in-figure').text(JSON.parse(d.Value).donationAmount)
    $('#txt-donation-purpose').text(JSON.parse(d.Value).donationRemarks)
    $('#txt-organization').text(JSON.parse(d.Value).organization)
    $('#txt-designation').text(JSON.parse(d.Value).designation)


    if (JSON.parse(d.Value).signature != "") {
        $('.signature').attr('src', '../../Temp/' + JSON.parse(d.Value).signature)
    }
}

//====================================== AJAX DATA LOAD END ================================================================


$('#btn-print').click(function () {
     PrintElem( ); 

   // window.print();
});


function PrintElem( ) {


    var contents = $("#div-print").html();
    var frame1 = $('<iframe />');
    frame1[0].name = "frame1";
    frame1.css({ "position": "absolute", "top": "-1000000px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
    frameDoc.document.open();
    //Create a new HTML document.
    frameDoc.document.write('<html><head><title>DIV Contents</title>');
    frameDoc.document.write('</head><body>');
    //Append the external CSS file.
    frameDoc.document.write('<link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />');
    frameDoc.document.write('<link href="/Content/Assets/css/PrintSlip.css" rel="stylesheet" type="text/css" />');
    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        frame1.remove();
    }, 500);

 

    return true;
}