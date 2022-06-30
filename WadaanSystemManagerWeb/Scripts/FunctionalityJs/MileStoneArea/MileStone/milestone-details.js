
var userId = "";
var username = "";
var roleID = "";

$(document).ready(function () {
    
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadMileStoneDetails();

});

function LoadMileStoneDetails() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);
 
    KendoGlobalAjax({ commandName: 'MileStone_SelectDetailByID', values: { MileStoneID: id }, CallBack: loadMileStoneDetailsByID });
   // KendoGlobalAjax({ commandName: 'Images_SelectImagesByEmployeeID', values: "{EmployeeID:'" + id + "'}", CallBack: loadEmployeeImagesByID });


}
var loadMileStoneDetailsByID = function (d) {

    
    setTimeout(function () {

        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        $('.UserName').text(JSON.parse(d.Value)[0]["name"]);
        $('.milestoneName').text(JSON.parse(d.Value)[0]["name"]);
        $('.status').text(JSON.parse(d.Value)[0]["status"]);
        $('.startDate').text(JSON.parse(d.Value)[0]["startDate"]);
        $('.endDate').text(JSON.parse(d.Value)[0]["endDate"]);
        $('.createdBy').text(JSON.parse(d.Value)[0]["createdDate"]);
        $('.createdDate').text(JSON.parse(d.Value)[0]["employeeName"]);
        $('#milestone-description').append(JSON.parse(d.Value)[0]["description"]);
       
       
         
       
        

    }, 50);
}


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
 