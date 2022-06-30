
var userId = "";
var username = "";
var roleID = "";



var $grid = "project-related-with-client-grid";

$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadClientDetails();

    LoadProjectInformationKendo();
});

function LoadClientDetails() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);

    KendoGlobalAjax({ commandName: 'Client_SelectDetailByID', values: { ClientID: id }, CallBack: loadClientDetailsByID });
    // KendoGlobalAjax({ commandName: 'Images_SelectImagesByEmployeeID', values: "{EmployeeID:'" + id + "'}", CallBack: loadEmployeeImagesByID });


}
var loadClientDetailsByID = function (d) {

    setTimeout(function () {


        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);

        $('.UserName').text(JSON.parse(d.Value)[0]["firstName"]);
        $('.firstName').text(JSON.parse(d.Value)[0]["firstName"]);
        $('.lastName').text(JSON.parse(d.Value)[0]["lastName"]);
        $('.phoneNo').text(JSON.parse(d.Value)[0]["mobilePhone"]);
        $('.whatsApp').text(JSON.parse(d.Value)[0]["whatsApp"]);
        $('.Address').text(JSON.parse(d.Value)[0]["curPostalAddress"]);

        //Residential Details Data 
        $('.emailAddress').text(JSON.parse(d.Value)[0]["emailAddress"]);
        $('.curPostalAddress').text(JSON.parse(d.Value)[0]["curPostalAddress"]);

        $('.houseNo').text(JSON.parse(d.Value)[0]["curHouseNo"]);
        $('.streetNo').text(JSON.parse(d.Value)[0]["curStreetNo"]);
        $('.townSector').text(JSON.parse(d.Value)[0]["curTownSector"]);
        //$('.Address').text(JSON.parse(d.Value)[0]["curPostalAddress"]);



        //$('#CustomerImges').append(

        $('.clientImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);


    }, 50);
}



function LoadProjectInformationKendo() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID

    KendoGlobalAjax({ commandName: 'Project_Information_SelectByClientID', values: { ClientID: id }, CallBack: fnLoadProjectInformationKendo });
}

var fnLoadProjectInformationKendo = function (d) {
    KendoGrid(JSON.parse(d.Value));
}

var KendoGrid = function (_data) {

    var colModel = [
        { field: "projectID", title: "ProjectID", width: 80, filterable: true, hidden: true },
        { field: "projectName", title: "Project Name", width: 140, filterable: true },
        { field: "contractorName", title: "Contractor Name", width: 120, filterable: true },
        { field: "plotHouseNo", title: "Plot HouseNo", width: 80, filterable: true },
        { field: "street", title: "Street", width: 140, filterable: true },
        { field: "townSector", title: "Town/Sector", width: 120, filterable: true },
        { field: "cityName", title: "City", width: 80, filterable: true },
        { field: "provinceName", title: "Province", width: 140, filterable: true },
    ];
    BindkendoGrid($grid, 50, colModel, _data);
};






function fnLoadImage(e) {

    window.location.href = "/'" + e.src + "'", '_blank';
}

function fnLoadImageByID(e) {

    //  $('#modal-open-project-for-floor-plan-image').addClass('md-show');
    var full_url = e.src;
    var url_array = full_url.split('Temp/'); //Split 
    var imagePath = url_array[url_array.length - 1];

    $('.load-image-by-click').attr('src', '../../Temp/' + imagePath);

}

function fnloadRefferenceAttahcmentsImageInModal(e) {

    $('#modal-open-employee-attachment-images').addClass('md-show');
    var full_url = e.src;
    var url_array = full_url.split('Temp/'); //Split 
    var imagePath = url_array[url_array.length - 1];

    $('.load-image-by-click').attr('src', '../../Temp/' + imagePath);

}
