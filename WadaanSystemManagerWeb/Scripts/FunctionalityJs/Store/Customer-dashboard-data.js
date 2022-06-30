 

var userId = "";
var username = "";
var roleID = "";
var agentID = "";
var CustomerID = new URLSearchParams(window.location.search).get('customerID');
userId = window.localStorage.getItem("userId");
username = window.localStorage.getItem('userName');
roleID = window.localStorage.getItem("RoleId");
 
var $grid = "Transcationgrid";
$(document).ready(function () {
    
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
   
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    GetStoreDashboardCustomerInfoSotreId(userId);
    GetStoreDashboardDebitCreditbySotreId(userId);
    GetStoreDashboardDebitCreditbyDayMonthYearSotreId(userId);
    GetStoreDashboardMonthWiseDebitCreditBySotreId(userId);
    GetStoreDashboardCustomerWiseDebitCreditBySotreId(userId);
  // GetCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId(userId);
    LoadTransactionKendo();
 
});

 


function GetCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId(userId) {
    KendoGlobalAjaxAsync({
        commandName: 'CustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId', values: { userId: userId, Year: $("#YearWiseddl").val(), CustomerID: CustomerID }, CallBack: loadCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId
    });

}
var loadCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId = function (d) {
  
    drawChart(JSON.parse(d.Value));
      
 
}

//-----------------------------------------------   AGENT AREA Start-------------------------------------------------------

var loadStoreDashboardCustomerInfoStoreId = function (d) {
  
    $('.c-total-Customer-CustomerName').text(JSON.parse(d.Value).customerName);       
    $('.c-total-Active-Customer-MobileNo').text(JSON.parse(d.Value).customerMobileNo);       
    $('.c-total-In-Active-Customer-CustomerAddress').text(JSON.parse(d.Value).customerAddress);     
    
    
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
       
        for (var i = 0; i <= JSON.parse(d.Value).length-1; i++) {
            
            var FinalLoan = parseFloat(JSON.parse(d.Value)[i].credit) - parseFloat(JSON.parse(d.Value)[i].debit);
                  $('#monthwiseData').append('<tr> <td> <a>' + JSON.parse(d.Value)[i]["monthName"] + '</a> </td> <td>' + JSON.parse(d.Value)[i]["credit"] + '</td> <td>' + JSON.parse(d.Value)[i]["debit"] + '</td> <td>' + FinalLoan+'</td> </tr>');
              
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


function GetStoreDashboardCustomerInfoSotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetStoreDashboardCustomerInfoByStoreId', values: { userId: userId, CustomerID: CustomerID }, CallBack: loadStoreDashboardCustomerInfoStoreId });

}
function GetStoreDashboardDebitCreditbySotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetCustomerStoreDashboardDebitCreditbySotreId', values: { userId: userId, CustomerID: CustomerID }, CallBack: loadStoreDashboardDebitCreditbySotreId });

} 
function GetStoreDashboardDebitCreditbyDayMonthYearSotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetCustomerStoreDashboardDebitCreditbyDayMonthYearSotreId', values: { userId: userId, CustomerID: CustomerID }, CallBack: loadGetStoreDashboardDebitCreditbyDayMonthYearSotreId });

} 
function GetStoreDashboardMonthWiseDebitCreditBySotreId(userId) {
    KendoGlobalAjax({
        commandName: 'CustomerDashboardMonthWiseDetailDebitCreditbySotreId', values: { userId: userId, Year: $("#YearWiseddl").val(), CustomerID: CustomerID}, CallBack: loadStoreDashboardMonthWiseDebitCreditBySotreId
    });

} 
function GetStoreDashboardCustomerWiseDebitCreditBySotreId(userId) {
    KendoGlobalAjax({
        commandName: 'CustomerDashboardCustomerWiseDetailDebitCreditbySotreId', values: { userId: userId, CustomerID: CustomerID }, CallBack: loadStoreDashboardCustomerWiseDebitCreditBySotreId
    });

}
$("#btnSearch").click(function () {
    LoadTransactionKendo();
});
$("#YearWiseddl").change(function () {
    $('#monthwiseData').html(''); $('#monthwisefootData').html(''); 
    GetStoreDashboardMonthWiseDebitCreditBySotreId(userId, CustomerID);
});

function LoadTransactionKendo() {
    KendoGlobalAjax({ commandName: 'CustomerDashboardDetailDebitCreditbySotreId', values: { UserID: userId, CustomerID: CustomerID, StartDate: $("#StartDate").val(), EndDate: $("#EndDate").val()}, CallBack: loadTransaction });
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
       // { field: "customerName", title: "Name", width: "13%" },
        { field: "transactionType", title: "transactionType", hidden: true },
   
        {
            field: "transactionTypeName", title: "Type", width: "10%",
            template: "#  if (transactionTypeName == 'Credit' ) { # <label class='pcoded-badge label label-success'>#=transactionTypeName#</label># }else if (transactionTypeName == 'Debit') {#<label class='pcoded-badge label label-danger'>#=transactionTypeName#</label>#} #"

        },
        { field: "amountPaid", title: "Amount", width: "12%" },
        { field: "paiddate", title: "Paid Date", width: "10%" },
        { field: "createdDate", title: "Created Date", width: "15%" },
        { field: "reason", title: "Reason", width: "25%" } ,
        {
            field: "attachedFile", title: "Attached File", width: "10%" ,
            template: "#  if (attachedFile == '' ) { # <label class='pcoded-badge label label-danger'>No File Attached</label># }else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= attachedFile #' class='viewbutton'>Download</a>#} #"

            
        }
         ];

    BindkendoGrid($grid, 50, colModel, _data);
};