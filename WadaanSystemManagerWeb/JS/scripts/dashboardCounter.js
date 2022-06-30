$(function () {
    GlobalAjax({ commandName: 'dashboardCounter', values: '{}', CallBack: loadDashboardCounter });
});

var loadDashboardCounter = function (d) {
    var data = JSON.parse(d.Value);
    $('#todayExpense').text(data.todayExpense);
    $('#todayIncome').text(data.todayIncome);
    $('#todayProfit').text(data.todayProfit);
    $('#yesterdayProfit').text(data.yesterdayProfit);

    $('#thismonthincome').text(data.thisMonthIncome);
    $('#thismonthexpense').text(data.thisMonthExpense);
    $('#thismonthprofit').text(data.thisMonthProfit);
    $('#lastmonthprofit').text(data.lastMonthProfit);


    $('#thisyearincome').text(data.thisYearIncome);
    $('#thisyearexpense').text(data.thisYearExpense);
    $('#thisyearprofit').text(data.thisYearProfit);

    
}
