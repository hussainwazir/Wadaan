

var userId = "";
var username = "";
var roleID = "";
var agentID = "";

var MemberID = '';
var full_url = document.URL;
var url_array = full_url.split('=');                        //Split 
MemberID = url_array[url_array.length - 1];               //Get ID
//var CustomerID = new URLSearchParams(window.location.search).get('customerID');
//$("#Name").val(sessionStorage.getItem('memberName'));
var $grid = "Transcationgrid";
$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem('userId');
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
   // GetStoreDashboardCustomerInfoSotreId(userId);
    //GetStoreDashboardDebitCreditbySotreId(userId);
    GetCustomerDashboardDonationbyDayMonthYearDonationById(userId);
    GetDashboardMonthWiseDonationById();
   // GetStoreDashboardCustomerWiseDebitCreditBySotreId(userId);
    // GetCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId(userId);
    LoadTransactionKendo();
    LoadMembershipBioDataByID();
});




function GetCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId(userId) {
    KendoGlobalAjaxAsync({
        commandName: 'CustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId', values: { userId: userId, Year: $("#YearWiseddl").val(), MemberID: MemberID }, CallBack: loadCustomerBarchartStoreDashboardMonthWiseDebitCreditbyStoreId
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

var loadGetCustomerDashboardDonationbyDayMonthYearDonationById = function (d) {

    $('.c-totalAmount-count').text(JSON.parse(d.Value).totalAmount);
    $('.c-curentMonthAmount-count').text(JSON.parse(d.Value).curentMonthAmount);
    $('.c-curentYearAmount-count').text(JSON.parse(d.Value).curentYearAmount);


}
var loadGetDashboardMonthWiseDonationById = function (d) {


    setTimeout(function () {

        for (var i = 0; i <= JSON.parse(d.Value).length - 1; i++) {

            //var FinalLoan = parseFloat(JSON.parse(d.Value)[i].credit) - parseFloat(JSON.parse(d.Value)[i].debit);
            $('#monthwiseData').append('<tr> <td> <a>' + JSON.parse(d.Value)[i]["year"] + '</a> </td><td> <a>' + JSON.parse(d.Value)[i]["monthName"] + '</a> </td> <td>' + JSON.parse(d.Value)[i]["donation"] + '</td> </tr>');

        }



    }, 100);

    var donations = JSON.parse(d.Value).reduce(function (_this, val) {
        return _this + val.donation
    }, 0);



    var FinalLoan = donations
    $('#monthwisefootData').append('<tr > <td>Total:</td> <td></td> <td>' + FinalLoan + '</td> </tr>');



}
var loadStoreDashboardCustomerWiseDebitCreditBySotreId = function (d) {


    setTimeout(function () {

        for (var i = 0; i <= JSON.parse(d.Value).length; i++) {

            var FinalLoan = parseFloat(JSON.parse(d.Value)[i].credit) - parseFloat(JSON.parse(d.Value)[i].debit);
            $('#CustomerwiseData').append('<tr> <td> <a>' + JSON.parse(d.Value)[i]["customerName"] + '</a> </td> <td>' + JSON.parse(d.Value)[i]["credit"] + '</td> <td>' + JSON.parse(d.Value)[i]["debit"] + '</td> <td>' + FinalLoan + '</td> </tr>');


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
    KendoGlobalAjax({ commandName: 'GetStoreDashboardCustomerInfoByStoreId', values: { userId: userId, MemberID: MemberID }, CallBack: loadStoreDashboardCustomerInfoStoreId });

}
function GetStoreDashboardDebitCreditbySotreId(userId) {
    KendoGlobalAjax({ commandName: 'GetCustomerStoreDashboardDebitCreditbySotreId', values: { userId: userId, MemberID: MemberID }, CallBack: loadStoreDashboardDebitCreditbySotreId });

}
function GetCustomerDashboardDonationbyDayMonthYearDonationById(userId) {
    KendoGlobalAjax({ commandName: 'GetCustomerDashboardDonationbyDayMonthYearDonationById', values: { MemberShipID: MemberID }, CallBack: loadGetCustomerDashboardDonationbyDayMonthYearDonationById });

}
function GetDashboardMonthWiseDonationById() {
    KendoGlobalAjax({
        commandName: 'GetDashboardMonthWiseDonationById', values: { UserID: MemberID, Year: $("#YearWiseddl").val() }, CallBack: loadGetDashboardMonthWiseDonationById
    });

}
function GetStoreDashboardCustomerWiseDebitCreditBySotreId(userId) {
    KendoGlobalAjax({
        commandName: 'CustomerDashboardCustomerWiseDetailDebitCreditbySotreId', values: { userId: userId, MemberID: MemberID }, CallBack: loadStoreDashboardCustomerWiseDebitCreditBySotreId
    });

}
$("#btnSearch").click(function () {
    LoadTransactionKendo();
});
$("#YearWiseddl").change(function () {
    $('#monthwiseData').html('');
    $('#monthwisefootData').html('');
     GetDashboardMonthWiseDonationById();
});

function LoadTransactionKendo() {
   
    KendoGlobalAjax({

        commandName: 'LoadTransactionById', values: {
            UserID: userId,
            MemberShipID: MemberID,
            StartDate: $("#StartDate").val(),
            EndDate: $("#EndDate").val()
        }, CallBack: loadTransaction
    });
}
function LoadMembershipBioDataByID() {
    KendoGlobalAjax({ commandName: 'LoadMemberBioDataById', values: { UserID: userId, MemberShipID: MemberID, }, CallBack: loadMembershipBioDataByID });
}


var loadMembershipBioDataByID = function (d) {
   
    setTimeout(function () {  getNameFromAjaxSuccessByID(JSON.parse(d.Value)[0].name); }, 1000);
     
    $('.c-total-Customer-CustomerName').text(JSON.parse(d.Value)[0].name);
    $('.c-total-Active-Customer-MobileNo').text(JSON.parse(d.Value)[0].mobileNo);
    $('.c-CustomerAddress').text(JSON.parse(d.Value)[0].residentialAddress);
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
        { field: "donationID", title: "donationID", hidden: true },
        { field: "memberShipID", title: "MemberShipID", hidden: true },
        //  { field: "customerName", title: "Customer Name", width: "10%",},
        //   { field: "donationType", title: "Type", width: "10%", },
        // { field: "customerName", title: "Name", width: "13%" },
        //{ field: "transactionType", title: "transactionType", hidden: true },

        //{
        //    field: "transactionTypeName", title: "Type", width: "10%",
        //    template: "#  if (transactionTypeName == 'Credit' ) { # <label class='pcoded-badge label label-success'>#=transactionTypeName#</label># }else if (transactionTypeName == 'Debit') {#<label class='pcoded-badge label label-danger'>#=transactionTypeName#</label>#} #"

        //},
        //  { field: "aSpaiddate", title: "aSpaiddate", width: "12%" },
        { field: "amountPaid", title: "Amount", width: "12%" },
        { field: "paiddate", title: "Paid Date", width: "10%" },
        //  { field: "createdDate", title: "Created Date", width: "15%" },
        { field: "reason", title: "Remarks", width: "25%" },
        {
            field: "attachedFile", title: "Attached File", width: "10%",
            //template: " <a style='font-size:20px;cursor: pointer;' onClick= OpenPrintFN(this) title='Print Slip' ><span class='fa fa-print'></span></a>  #  if (attachedFile == '' ) { # <label class='pcoded-badge label label-danger'>No File Attached</label># }else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= attachedFile #' class='viewbutton'>Download</a>#} #"
            template: " <a style='font-size:20px;cursor: pointer;' target='_blank' href='/Home/MemberPrintSlip?#=donationID#' title='Print Slip' ><span class='fa fa-print'></span></a>  #  if (attachedFile == '' ) { # <label class='pcoded-badge label label-danger'>No File Attached</label># }else {#<a title='Click to Download attached document' target='_blank' href='../../Temp/#= attachedFile #' class='viewbutton'>Download</a>#} #"


        }
    ];

    BindkendoGrid($grid, 50, colModel, _data);
};
function OpenPrintFN(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.open('/Home/MemberPrintSlip?' + dataItem.donationID + '', '_blank');

}
