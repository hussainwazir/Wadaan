
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');     
    roleID = window.localStorage.getItem("RoleId");
    $("input").prop("readonly", true);
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
   

        LoadEmployeeDetails();
  

});
$('#btn-print').click(function () {
//   PrintElem();
      window.print();
});


function PrintElem() {


    var contents = $("#btn-print").html();
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

    frameDoc.document.write('<script src="~/Scripts/jquery-3.3.1.min.js"></script>');
    frameDoc.document.write('<link href="/Content/Assets/css/PrintMembership.css" rel="stylesheet" type="text/css" />');
    frameDoc.document.write('<link href="/Content/Assets/css/PrintMembership.css" rel="stylesheet" type="text/css" />');
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
//#Load Data through URL From the Database#
function LoadEmployeeDetails() {
   
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'Recipt_PrintByID', values: "{ReciptID:'" + id + "'}", CallBack: loadReciptDetailsByID });
  //  KendoGlobalAjax({ commandName: 'Images_SelectImagesByReciptID', values: "{ReciptID:'" + id + "'}", CallBack: loadReciptImagesByID });

    //-------------------#Images_SelectImagesByVehicleID in CompanyCommand Line Number 381 to 406 #--------------------
}
//#Load Vehicle Details by ID From the Database#
var loadReciptDetailsByID = function (d) {
    
    setTimeout(function () {
   
        //console.log('Without Parse :'+d.Value);
        //console.log('Parse :' + JSON.parse(d.Value)[0]);
         
        $('#name').val(JSON.parse(d.Value)[0]["studentName"]);
      //  $('#dueAmount').val(JSON.parse(d.Value)[0]["dueAmount"]);
        $('#paidamount').val(JSON.parse(d.Value)[0]["paid"]);
        $('#month').val(JSON.parse(d.Value)[0]["month"] +','+ JSON.parse(d.Value)[0]["year"]);
        $('#year').val(JSON.parse(d.Value)[0]["year"]);
        $('#paymentMode').val(JSON.parse(d.Value)[0]["paymentMode"] + ',' + JSON.parse(d.Value)[0]["chequeNo"]);
        $('#ReciptDate').val(JSON.parse(d.Value)[0]["reciptDate"]);
        $('.autoId').html(JSON.parse(d.Value)[0]["autoId"]);
        $('#autoId').val(JSON.parse(d.Value)[0]["autoId"]); 
        $('#dhs').val(JSON.parse(d.Value)[0]["paid"]);
        $('#being').val(JSON.parse(d.Value)[0]["person"]);
        $('#chequeOwner').val(JSON.parse(d.Value)[0]["chequeOwner"]);
        if (JSON.parse(d.Value)[0]["paymentMode"] == "Cheque") {
            $('#Bank').val(JSON.parse(d.Value)[0]["bankName"]); 
            $('#Being').val(JSON.parse(d.Value)[0]["user"]);
            $('#paymentmode').val( json.parse(d.value)[0]["chequeno"]);
             

            $(".Bank").show();
            $(".Being").show();
        } else {
            $(".Bank").hide();
            $(".Being").hide();
        }
     }, 50);
}

//#Load Employee Image by ID from the Database#
//var loadReciptImagesByID = function (d) {

//    setTimeout(function () {
//        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
//            console.log(JSON.parse(d.Value));
//            if (JSON.parse(d.Value)[i]["name"] == 'profileImage') {

//                $('.reciptImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);
//            }
//            else if (JSON.parse(d.Value)[i]["name"] == "paymentModes") {

//                $('.paymentMode').append('<img class="img-fluid img-thumbnail  img-100 paymentModes" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');
//            }

//        }
//    }, 50);
//}

//function DownloadFile(fileName) {
//    //Set the File URL.
//    var url = "Files/" + fileName;

//    //Create XMLHTTP Request.
//    var req = new XMLHttpRequest();
//    req.open("GET", url, true);
//    req.responseType = "blob";

//    req.onload = function () {
//        //Convert the Byte Data to BLOB object.
//        var blob = new Blob([req.response], { type: "application/octetstream" });

//        //Check the Browser type and download the File.
//        var isIE = false || !!document.documentMode;
//        if (isIE) {
//            window.navigator.msSaveBlob(blob, fileName);
//        } else {
//            var url = window.URL || window.webkitURL;
//            link = url.createObjectURL(blob);
//            var a = document.createElement("a");
//            a.setAttribute("download", fileName);
//            a.setAttribute("href", link);
//            document.body.appendChild(a);
//            a.click();
//            document.body.removeChild(a);
//        }
//    };
//    req.send();
//};