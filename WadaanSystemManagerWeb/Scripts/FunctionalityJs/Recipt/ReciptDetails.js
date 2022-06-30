
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');     
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadEmployeeDetails();

});

//#Load Data through URL From the Database#
function LoadEmployeeDetails() {
    
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'Recipt_SelectByID', values: "{ReciptID:'" + id + "'}", CallBack: loadReciptDetailsByID });
    KendoGlobalAjax({ commandName: 'Images_SelectImagesByReciptID', values: "{ReciptID:'" + id + "'}", CallBack: loadReciptImagesByID });

    //-------------------#Images_SelectImagesByVehicleID in CompanyCommand Line Number 381 to 406 #--------------------

}
//#Load Vehicle Details by ID From the Database#
var loadReciptDetailsByID = function (d) {
 
    setTimeout(function () {
        
        $('.reciptID').text(JSON.parse(d.Value)[0]["reciptID"]);
        $('.txt-name').text(JSON.parse(d.Value)[0]["name"]);
        $('.dueAmount').text(JSON.parse(d.Value)[0]["dueAmount"]);
        $('.bName').text(JSON.parse(d.Value)[0]["bName"]);
        $('.paid').text(JSON.parse(d.Value)[0]["paid"]);
        $('.cash').text(JSON.parse(d.Value)[0]["cash"]);
        $('.month').text(JSON.parse(d.Value)[0]["month"]);
        $('.year').text(JSON.parse(d.Value)[0]["year"]);
        //#Change Vehicle Type Form Typee  #
    }, 50);
}

//#Load Employee Image by ID from the Database#
var loadReciptImagesByID = function (d) {

    setTimeout(function () {


        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        
            if (JSON.parse(d.Value)[i]["name"] == 'profileImage') {

                $('.reciptImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[i]["path"]);

            }
            else if (JSON.parse(d.Value)[i]["name"] == "paymentModes") {

                $('.paymentMode').append('<img class="img-fluid img-thumbnail  img-100 paymentModes" src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" alt="Profile-user">');
            }

        }
    }, 50);
}

function DownloadFile(fileName) {
    //Set the File URL.
    var url = "Files/" + fileName;

    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            var url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
};