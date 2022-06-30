var full_url = document.URL; // Get current url
var url_array = full_url.split('='); //Split 
var employeeIDFromURL = url_array[url_array.length - 1];//Get ID
$('#EmployeeID').val(employeeIDFromURL);
var userId = "";

 $(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.sessionStorage.getItem("userId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#userId").val(userId);
    


});

function LoadSalarySlipsKendo() {

    KendoGlobalAjax({ commandName: 'Payroll_employeeMonthWiseDetailReportByEmployeeId', values: { EmployeeID: employeeIDFromURL, PayrollYear: $('#SearchByYear :selected').val() }, CallBack: loadSalarySlipsData});
}
var loadSalarySlipsData = function (d) {
    KendoSalarySlipsGrid (JSON.parse(d.Value));
}
var KendoSalarySlipsGrid = function (_data) {

    var record = 0;

    var colModel = [
        { field: "recursiveID", title: "RecursiveID", hidden: true },
        { field: "payrollMonth", title: "PayrollMonth", width: 100, filterable: false },
        //{ field: "employeeID", title: "EmployeeID", hidden: true },
        { field: "nameofEmployee", title: "Employee", width: 100, filterable: false },
        { field: "basicSalary", title: "BasicSalary", width: 100, filterable: false },
        { field: "totaladdation", title: "Totaladdation", width: 100, filterable: false },
        { field: "totalDeduction", title: "TotalDeduction", width: 100, filterable: false },
        { field: "totalpayment", title: "Totalpayment", width: 100, filterable: false },

        //{
        //    field: "", width: 170,
        //    title: "Action",
        //    template: "  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=recursiveID#')  title='Delete'><span class='icofont icofont-ui-delete'></span></a> "

        //}
    ];

    BindkendoGrid("grid-salary-slips", 50, colModel, _data);
    //setTimeout(function () {

    //    var gridElement = $('#grid-salary-slips');
    //    var dropDown = gridElement.find("#loadDoctors").kendoDropDownList({
    //        dataTextField: "name",
    //        dataValueField: "id",
    //        autoBind: false,
    //        optionLabel: "All",
    //        dataSource: {

    //            severFiltering: true,
    //            data: _DoctorArray
    //        },
    //        change: function () {

    //            var value = this.value();
    //            if (value) {
    //                LoadPatientFeeRecord(value);
    //                //KendoGlobalAjax({ commandName: 'listTotalDoctorFee', values: { UserID: userId, StoreID: storeId, DoctorID: doctorCustomID }, CallBack: getLoadTotalDoctorFee });
    //                gridElement.data("kendoGrid").dataSource.filter({ field: "doctorID", operator: "eq", value: value });
    //            } else {
    //                LoadPatientFeeRecord('00000000-0000-0000-0000-000000000000');
    //                gridElement.data("kendoGrid").dataSource.filter({});
    //            }
    //        }
    //    });
    //}, 50);

};



$('#salarySlips-tab').click(function () {

    LoadSalarySlipsKendo();
});

 //$('#SearchByYear').click(function () {

 //   LoadSalarySlipsKendo();
//});
$('#SearchByYear').change(function () {

    LoadSalarySlipsKendo();
});

 