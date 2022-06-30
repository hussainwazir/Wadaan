 

var userId = "";
var username = "";
var roleID = "";
var agentID = "";


var $grid = "Transcationgrid";
$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem('userId');
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    GetAllMemberDashboardCount(userId);
   // GetStoreDashboardDebitCreditbySotreId(userId);
    GetGetAllMemberDashboardDonationbyDayMonthYear(userId);
    GetDashboardDonationMonthWiseDetail(userId);
    GetDashboardMemberWiseDonation(userId);
    LoadTransactionKendo();
    /*
    loadAdminDashboardSubAgentAreabyUserID(userId);
    loadAdminDashboardAgentCustomerAreabyUserID(userId);
    loadAdminDashboardPropertyAreabyUserID(userId);
    loadAdminDashboardSalePropertyAreabyUserID(userId);
    loadAdminDashboardPurchasePropertyAreabyUserID(userId);
    loadAdminDashboardRentPropertyAreabyUserID(userId);
    loadAdminDashboardBuyerSellerAreabyUserID(userId);*/
});


//-----------------------------------------------   AGENT AREA Start-------------------------------------------------------

var loadGetAllMemberDashboardCount = function (d) {
     
    $('.c-total-Customer-count').text(JSON.parse(d.Value).totalMemberShiprCount);       
    $('.c-total-Active-Customer-count').text(JSON.parse(d.Value).activeMemberShiprCount);       
    $('.c-total-In-Active-Customer-count').text(JSON.parse(d.Value).inActiveMemberShiprCount);     
  
    
}
var loadStoreDashboardDebitCreditbySotreId = function (d) {
    var Total = parseInt(JSON.parse(d.Value).credit) - parseInt(JSON.parse(d.Value).debit);
    $('.c-total-Debit-count').text(JSON.parse(d.Value).debit);
    $('.c-total-Credit-count').text(JSON.parse(d.Value).credit);
    $('.c-total-OverAllbalance-count').text(Total);
    
}

var loadGetGetAllMemberDashboardDonationbyDayMonthYear = function (d) {
  
    $('.c-TodayAmount-count').text(JSON.parse(d.Value).todayAmount);

    $('.c-curentWeekAmount-count').text(JSON.parse(d.Value).curentWeekAmount);

    $('.c-curentMonthAmount-count').text(JSON.parse(d.Value).curentMonthAmount);

    $('.c-curentYearAmount-count').text(JSON.parse(d.Value).curentYearAmount);
 

}
var loadGetDashboardDonationMonthWiseDetail = function (d) {

    
    setTimeout(function () {
       
        for (var i = 0; i <= JSON.parse(d.Value).length; i++) {
          //  console.log(JSON.parse(d.Value)[i].monthName, JSON.parse(d.Value)[i].credit);
          
            var FinalLoan = parseFloat(JSON.parse(d.Value)[i].donation);
               // $(".selectedate").text(parseFloat(JSON.parse(d.Value)[i]["year"]));
            $('#monthwiseData').append('<tr> <td> <a >' + JSON.parse(d.Value)[i]["monthName"] + '</a> </td> <td>' + JSON.parse(d.Value)[i]["donation"] + '</td>   <td>' + FinalLoan+'</td> </tr>');
              //  $('.cClassifiedPropertyMainRow').append("<div style='cursor: pointer;' class='col-md-4 cPropertyClickable' > <a  href='/Home/SingleProperty?id=" + JSON.parse(d.Value)[i]["propertyID"] + "'><div class='card-box-a card-shadow'> <div class='img-box-a'><img   src='../../Temp/" + JSON.parse(d.Value)[i]["imageName"] + "' alt='' class='img-d img-fluid propertyImage' style='width:100%;height:400px;'> </div> <div class='card-overlay'> <div class='card-overlay-a-content'> <div class='card-header-a'> <h2 class='card-title-a propertyTitle'> <span> " + JSON.parse(d.Value)[i]["title"] + " </span> </h2> </div> <div class='card-body-a'> <div class='price-box d-flex'> <span class='price-a propertyPrice '>" + JSON.parse(d.Value)[i]["categoryTypeName"] + " | " + JSON.parse(d.Value)[i]["currencyType"] + " " + JSON.parse(d.Value)[i]["price"] + "</span> </div> <span class='link-a'> Click here to view <span class='ion-ios-arrow-forward'></span> </span> </div> <div class='card-footer-a'> <ul class='card-info d-flex justify-content-around'> <li> <h4 class='card-info-title'>Area</h4> <span class='propertyArea'>" + JSON.parse(d.Value)[i]["area"] + " </span> </li> <li> <h4 class='card-info-title'>Beds</h4> <span class='propertybedrooms'>" + JSON.parse(d.Value)[i]["bedroom"] + "</span> </li> <li> <h4 class='card-info-title'>Baths</h4> <span class='propertybathrooms'>" + JSON.parse(d.Value)[i]["bathroom"] + "</span> </li> <li> <h4 class='card-info-title'>Garages</h4> <span class='propertygarage'>" + JSON.parse(d.Value)[i]["garage"] + "</span> </li> </ul> </div> </div> </div> </div> <div style='display: flex;position: absolute;top: 0;'><div style='padding: 0 1.7rem;background-color: #c32a2a;color: #fff;font-weight: 700;text-transform: uppercase;' aria-label='super hot label'>super hot</div></div></a></div>");


        }


       
        }, 100);
   
    var donation = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.donation
    }, 0);

   

    var FinalLoan = donation;
    $('#monthwisefootData').append('<tr > <td>Total:</td> <td> </td> <td>' + donation + '</td> </tr>');

  

}
var loadGetDashboardMemberWiseDonation = function (d) {


    setTimeout(function () {

        for (var i = 0; i <= JSON.parse(d.Value).length; i++) {
          
            var FinalLoan = parseFloat(JSON.parse(d.Value)[i].donation);
            $('#CustomerwiseData').append('<tr> <td> <a href="/Home/memberDashboard?memberID=' + JSON.parse(d.Value)[i]["memberShipID"] + '">' + JSON.parse(d.Value)[i]["name"] + '</a> </td>  <td>' + JSON.parse(d.Value)[i]["donation"] + '</td> <td>' + FinalLoan + '</td> </tr>');
           
        }



    }, 100);

var donation = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.donation
    }, 0);

    

var FinalLoan = donation;
    $('#CustomerfootData').append('<tr > <td>Total:</td> <td ></td>  <td>' + FinalLoan + '</td> </tr>');



}


function GetAllMemberDashboardCount(userId) {
    KendoGlobalAjax({ commandName: 'GetAllMemberDashboardCount', values: {}, CallBack: loadGetAllMemberDashboardCount });

}
function GetStoreDashboardDebitCreditbySotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetStoreDashboardDebitCreditbySotreId', values: "{userId:'" + userId + "'}", CallBack: loadStoreDashboardDebitCreditbySotreId });

} 
function GetGetAllMemberDashboardDonationbyDayMonthYear(userId) {
    KendoGlobalAjax({ commandName: 'GetGetAllMemberDashboardDonationbyDayMonthYear', values: {}, CallBack: loadGetGetAllMemberDashboardDonationbyDayMonthYear });

} 
function GetDashboardDonationMonthWiseDetail(userId) {
    KendoGlobalAjax({
        commandName: 'DashboardDonationMonthWiseDetail', values: { Year: $("#YearWiseddl").val() }, CallBack: loadGetDashboardDonationMonthWiseDetail
    });

} 
function GetDashboardMemberWiseDonation(userId) {
    KendoGlobalAjax({
        commandName: 'GetDashboardMemberWiseDonation', values: {}, CallBack: loadGetDashboardMemberWiseDonation
    });

} 
$("#btnSearch").click(function () {
    LoadTransactionKendo();
});
$("#YearWiseddl").change(function () {
    $('#monthwiseData').html(''); $('#monthwisefootData').html(''); 
    GetDashboardDonationMonthWiseDetail(userId);
});

function LoadTransactionKendo() {
    KendoGlobalAjax({ commandName: 'AllMemberDonationDashboard', values: {  StartDate: $("#StartDate").val(), EndDate: $("#EndDate").val()}, CallBack: loadTransaction });
}

var loadTransaction = function (d) {

    KendoGrid(JSON.parse(d.Value));

}


var KendoGrid = function (_data) {


    var record = 0;

    var colModel = [
        {
            title: "#", template: "#= ++record #", width: "5%"
        },
       
        { field: "donationID", title: "donationID", hidden: true },
        { field: "memberShipID", title: "MemberShipID", hidden: true },
        
        { field: "customerName", title: "Name", width: "15%" },
        { field: "amountPaid", title: "Amount", width: "10%" },
        { field: "paiddate", title: "Paid Date", width: "10%" },
   
        { field: "reason", title: "Remarks", width: "30%" },
        {
            field: "attachedFile", title: "Attached File", width: "15%",
            template: " <a style='font-size:20px;cursor: pointer;' onClick= OpenPrintFN(this) title='Print Slip' ><span class='fa fa-print'></span></a>  #  if (attachedFile == '' ) { # <label class='pcoded-badge label label-danger'>No File Attached</label># }else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= attachedFile #' class='viewbutton'>Download</a>#} #"


        }
    ];

    BindkendoGrid($grid, 50, colModel, _data);
};
function OpenPrintFN(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
 
    window.open('/Home/PrintSlip?' + dataItem.donationID + '', '_blank');

}
