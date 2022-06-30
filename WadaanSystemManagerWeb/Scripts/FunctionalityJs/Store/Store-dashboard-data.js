 

var userId = "";
var username = "";
var roleID = "";
var agentID = "";


var $grid = "Transcationgrid";
$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    GetStoreDashboardCountbySotreId(userId);
    GetStoreDashboardDebitCreditbySotreId(userId);
    GetStoreDashboardDebitCreditbyDayMonthYearSotreId(userId);
    GetStoreDashboardMonthWiseDebitCreditBySotreId(userId);
    GetStoreDashboardCustomerWiseDebitCreditBySotreId(userId);
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

var loadStoreDashboardCountbySotreId = function (d) {
     
    $('.c-total-Customer-count').text(JSON.parse(d.Value).totalcustomerCount);       
    $('.c-total-Active-Customer-count').text(JSON.parse(d.Value).activeCustomerCount);       
    $('.c-total-In-Active-Customer-count').text(JSON.parse(d.Value).inActiveCustomerCount);     
    $('.c-totalStore-count').text(JSON.parse(d.Value).totalStore);      
    
}
var loadStoreDashboardDebitCreditbySotreId = function (d) {
    var Total = parseInt(JSON.parse(d.Value).credit) - parseInt(JSON.parse(d.Value).debit);
    $('.c-total-Debit-count').text(JSON.parse(d.Value).debit);
    $('.c-total-Credit-count').text(JSON.parse(d.Value).credit);
    $('.c-total-OverAllbalance-count').text(Total);
    
}

var loadGetStoreDashboardDebitCreditbyDayMonthYearSotreId = function (d) {
  
    $('.c-TodayAmount-count').text(JSON.parse(d.Value).todayAmount);

    $('.c-curentWeekAmount-count').text(JSON.parse(d.Value).curentWeekAmount);

    $('.c-curentMonthAmount-count').text(JSON.parse(d.Value).curentMonthAmount);

    $('.c-curentYearAmount-count').text(JSON.parse(d.Value).curentYearAmount);
 

}
var loadStoreDashboardMonthWiseDebitCreditBySotreId = function (d) {

    
    setTimeout(function () {
       
        for (var i = 0; i <= JSON.parse(d.Value).length; i++) {
          //  console.log(JSON.parse(d.Value)[i].monthName, JSON.parse(d.Value)[i].credit);
          
            var FinalLoan = parseFloat(JSON.parse(d.Value)[i].credit) - parseFloat(JSON.parse(d.Value)[i].debit);
               // $(".selectedate").text(parseFloat(JSON.parse(d.Value)[i]["year"]));
                $('#monthwiseData').append('<tr> <td> <a>' + JSON.parse(d.Value)[i]["monthName"] + '</a> </td> <td>' + JSON.parse(d.Value)[i]["credit"] + '</td> <td>' + JSON.parse(d.Value)[i]["debit"] + '</td> <td>' + FinalLoan+'</td> </tr>');
              //  $('.cClassifiedPropertyMainRow').append("<div style='cursor: pointer;' class='col-md-4 cPropertyClickable' > <a  href='/Home/SingleProperty?id=" + JSON.parse(d.Value)[i]["propertyID"] + "'><div class='card-box-a card-shadow'> <div class='img-box-a'><img   src='../../Temp/" + JSON.parse(d.Value)[i]["imageName"] + "' alt='' class='img-d img-fluid propertyImage' style='width:100%;height:400px;'> </div> <div class='card-overlay'> <div class='card-overlay-a-content'> <div class='card-header-a'> <h2 class='card-title-a propertyTitle'> <span> " + JSON.parse(d.Value)[i]["title"] + " </span> </h2> </div> <div class='card-body-a'> <div class='price-box d-flex'> <span class='price-a propertyPrice '>" + JSON.parse(d.Value)[i]["categoryTypeName"] + " | " + JSON.parse(d.Value)[i]["currencyType"] + " " + JSON.parse(d.Value)[i]["price"] + "</span> </div> <span class='link-a'> Click here to view <span class='ion-ios-arrow-forward'></span> </span> </div> <div class='card-footer-a'> <ul class='card-info d-flex justify-content-around'> <li> <h4 class='card-info-title'>Area</h4> <span class='propertyArea'>" + JSON.parse(d.Value)[i]["area"] + " </span> </li> <li> <h4 class='card-info-title'>Beds</h4> <span class='propertybedrooms'>" + JSON.parse(d.Value)[i]["bedroom"] + "</span> </li> <li> <h4 class='card-info-title'>Baths</h4> <span class='propertybathrooms'>" + JSON.parse(d.Value)[i]["bathroom"] + "</span> </li> <li> <h4 class='card-info-title'>Garages</h4> <span class='propertygarage'>" + JSON.parse(d.Value)[i]["garage"] + "</span> </li> </ul> </div> </div> </div> </div> <div style='display: flex;position: absolute;top: 0;'><div style='padding: 0 1.7rem;background-color: #c32a2a;color: #fff;font-weight: 700;text-transform: uppercase;' aria-label='super hot label'>super hot</div></div></a></div>");


        }


       
        }, 100);
   
    var credit = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.credit
    }, 0);

    var debit = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.debit
    }, 0);

    var FinalLoan = credit - debit;
    $('#monthwisefootData').append('<tr > <td>Total:</td> <td>' + credit + '</td> <td>' + debit + '</td> <td>' + FinalLoan + '</td> </tr>');

  

}
var loadStoreDashboardCustomerWiseDebitCreditBySotreId = function (d) {


    setTimeout(function () {

        for (var i = 0; i <= JSON.parse(d.Value).length; i++) {
          
            var FinalLoan = parseFloat(JSON.parse(d.Value)[i].credit) - parseFloat(JSON.parse(d.Value)[i].debit);
            $('#CustomerwiseData').append('<tr> <td> <a>' + JSON.parse(d.Value)[i]["fullName"] + '</a> </td> <td>' + JSON.parse(d.Value)[i]["credit"] + '</td> <td>' + JSON.parse(d.Value)[i]["debit"] + '</td> <td>' + FinalLoan + '</td> </tr>');
          

        }



    }, 100);

    var credit = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.credit
    }, 0);

    var debit = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.debit
    }, 0);

    var FinalLoan = credit - debit;
    $('#CustomerfootData').append('<tr > <td>Total:</td> <td>' + credit + '</td> <td>' + debit + '</td> <td>' + FinalLoan + '</td> </tr>');



}


function GetStoreDashboardCountbySotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetStoreDashboardCountbySotreId', values: "{userId:'" + userId + "'}", CallBack: loadStoreDashboardCountbySotreId });

}
function GetStoreDashboardDebitCreditbySotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetStoreDashboardDebitCreditbySotreId', values: "{userId:'" + userId + "'}", CallBack: loadStoreDashboardDebitCreditbySotreId });

} 
function GetStoreDashboardDebitCreditbyDayMonthYearSotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetStoreDashboardDebitCreditbyDayMonthYearSotreId', values: "{userId:'" + userId + "'}", CallBack: loadGetStoreDashboardDebitCreditbyDayMonthYearSotreId });

} 
function GetStoreDashboardMonthWiseDebitCreditBySotreId(userId) {
    KendoGlobalAjax({
        commandName: 'DashboardMonthWiseDetailDebitCreditbySotreId', values: { userId: userId, Year: $("#YearWiseddl").val() }, CallBack: loadStoreDashboardMonthWiseDebitCreditBySotreId
    });

} 
function GetStoreDashboardCustomerWiseDebitCreditBySotreId(userId) {
    KendoGlobalAjax({
        commandName: 'DashboardCustomerWiseDetailDebitCreditbySotreId', values: { userId: userId}, CallBack: loadStoreDashboardCustomerWiseDebitCreditBySotreId
    });

} 
$("#btnSearch").click(function () {
    LoadTransactionKendo();
});
$("#YearWiseddl").change(function () {
    $('#monthwiseData').html(''); $('#monthwisefootData').html(''); 
    GetStoreDashboardMonthWiseDebitCreditBySotreId(userId);
});

function LoadTransactionKendo() {
    KendoGlobalAjax({ commandName: 'DashboardDetailDebitCreditbySotreId', values: { UserID: userId, StartDate: $("#StartDate").val(), EndDate: $("#EndDate").val()}, CallBack: loadTransaction });
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
        //  { field: "TransactionLog", title: "Transaction Log", template: "<img src='../../Temp/#= TransactionLog #' style='width:50%' />", width: "8%" },
        { field: "transactionID", title: "transactionID", hidden: true }, { field: "customerID", title: "CustomerID", hidden: true }, { field: "aSpaiddate", title: "aSpaiddate", hidden: true },
        { field: "customerName", title: "Name", width: "13%" }, { field: "transactionType", title: "transactionType", hidden: true },
   
        {
            field: "transactionTypeName", title: "Type", width: "10%",
            template: "#  if (transactionTypeName == 'Credit' ) { # <label class='pcoded-badge label label-success'>#=transactionTypeName#</label># }else if (transactionTypeName == 'Debit') {#<label class='pcoded-badge label label-danger'>#=transactionTypeName#</label>#} #"

        },
        { field: "amountPaid", title: "Amount", width: "12%" },
        { field: "paiddate", title: "Paid Date", width: "10%" },
        { field: "createdDate", title: "Created Date", width: "15%" },
        { field: "reason", title: "Reason", width: "25%" } 

         ];

    BindkendoGrid($grid, 50, colModel, _data);
};