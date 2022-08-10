
var userId = "";
var username = "";
var roleID = "";
var Status = "";
var SelectedEmployeeID = "";

var $grid = "designation-grid";
var $grid12 = "designation-grid-in-active";
//var $grid12 = "employee-grid-in-active";
var $grid13 = "designation-grid-all";
var $grid14 = "employee-grid-all-for-email";



var IsReadEmployeeDetail = localStorage.getItem('IsReadEmployeeDetail');
var IsUpdateEmployeeDetail = localStorage.getItem('IsUpdateEmployeeDetail');
var IsDeleteEmployee = localStorage.getItem('IsDeleteEmployee');
var IsCreateEmployee = localStorage.getItem('IsCreateEmployee');



$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadDesignationKendo();

});


$('#btn-send-email').click(function () {

    window.localStorage.setItem("EmailIt", "1");
    window.open('/Employee/Employee/EmployeePrint', '_blank')
});
function LoadDesignationKendo() {

    Status = 'Active'
    KendoGlobalAjax({ commandName: 'Designation_SelectList', values: { Status: Status }, CallBack: loadDesignation });
}


var loadDesignation = function (d) {


    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    var record = 0;
    var record = 0;

    var colModel = [


        { title: "S/N", width: 40, template: "#= renderNumber() #" },
        { field: "name", title: "Designation",   width: 200 },
        { field: "Status", title: "Status", width: 200 },
        {
            field: "", width: 170,
            title: "Action",
            template: " <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Designation' ><span class='fa fa-edit'></span></a> "

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};


$('#active-desgnation').on('click', function () {

    LoadDesignationKendo();
});

$('#in-active-desgnation').on('click', function () {

    LoadInActiveDesigationKendo();
});

$('#all-desgnation').on('click', function () {

    LoadAllDesignationKendo();
});



 


function LoadInActiveDesigationKendo() {

    Status = 'InActive'

    KendoGlobalAjax({ commandName: 'Designation_SelectList', values: { Status: Status }, CallBack: fnLoadInActiveDesignation });
}
var fnLoadInActiveDesignation = function (d) {



    KendoGrid2(JSON.parse(d.Value));

}
var KendoGrid2 = function (_data) {

    var record = 0;
    var record = 0;

    var colModel = [
        { title: "S/N", width: 40, template: "#= renderNumber() #" },
        { field: "name", title: "Designation",   width: 200 },
        { field: "Status", title: "Status", width: 200 },
        {
            field: "", width: 170,
            title: "Action",
            // template: "# if (IsUpdateEmployeeDetail == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>  # }   #",
            template: " <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>"
        }];

    BindkendoGrid($grid12, 50, colModel, _data);
};

function ChangeStatus(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid12).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    swal.fire({
        title: 'Are you sure?',
        text: "You want to Update Status!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        buttons: {
            cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {

        if (restult.value) {
            KendoGlobalAjax({ commandName: 'Employee_ChangeStatus', values: "{EmployeeID:'" + dataItem.employeeID + "'}", CallBack: '' });
            setTimeout(function () {

                LoadInActiveDesigationKendo();
            }, 50);

            swal.fire('Updated', '', 'success');

            LoadInActiveDesigationKendo();
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });


}

 


function LoadAllDesignationKendo() {

    Status = 'All'

    KendoGlobalAjax({ commandName: 'Designation_SelectList', values: { Status: Status }, CallBack: fnLoadInAllEmployee });
}
var fnLoadInAllEmployee = function (d) {

    KendoGrid3(JSON.parse(d.Value));
}
var KendoGrid3 = function (_data) {

    var record = 0;
    var record = 0;

    var colModel = [
        { title: "S/N", width: 40, template: "#= renderNumber() #" },
        { field: "name", title: "Designation",  width: 200 },
        { field: "Status", title: "Status", width: 200 },
    ];

    BindkendoGrid2($grid13, 50, colModel, _data);
};


function whatsapp_btn(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var employeeName, city, employeejobtype, address, designation = '';
    employeeName = dataItem.prefix + '.' + dataItem.firstName + " " + dataItem.lastName;
    designation = dataItem.designationName;
    employeejobtype = dataItem.employeeTypeName;
    city = dataItem.cityName;
    address = dataItem.curHouseNo + ' ' + dataItem.curPostalAddress;



    // var creatingMsg = currentTitle + "\r\n\r\n" + "|PLEASE CLICK ON BELOW LINK TO CHECK COMPLETE DETAILS|\r\n\r\n"
    var creatingMsg = '*====' + 'EMPLOYE DETAIL' + "====*\r\n\r\n" +
        'Employee:' + employeeName + "\r\n" +
        'Designation:' + designation + "\r\n" +
        'Job Type:' + employeejobtype + "\r\n" +
        'City:' + city + "\r\n" +
        'Address:' + address + "\r\n";
    var whatsappMessage = window.encodeURIComponent(creatingMsg)

    window.open('https://wa.me/?text=' + whatsappMessage, '_blank');
}
function LoadRecordByID(e) {


    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Employee/Employee/EmployeeDetail?employeeID=' + dataItem.employeeID + '';
}


function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Designation/Designation/Save?DesignationID=' + dataItem.employeeID + '';
}


function EmployeePrint(e) {

    var row = $(e).closest('tr');
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Employee/Employee/EmployeePrint?employeeID=' + dataItem.employeeID + '';


}

function ShareEmail(e) {


    var row = $(e).closest('tr');
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);



    var EmployeeName = dataItem.firstName;
    var UserName = dataItem.userName;
    var designation = dataItem.designationName
    var EmployeeEmail = dataItem.emailAddress;
    var Subject = 'This is Employee Detail';
    var taskTitle = dataItem.taskTitle;
    var taskStatus = dataItem.taskStatus;
    var dueDate = dataItem.dueDate;
    SelectedEmployeeID = dataItem.employeeID;
    //var EmailMessage = "<div class='row'><h1> Welcome Dear : " + EmployeeName + "!</h1><h2> This is a Notification Email From <strong>Wadaan</strong></h2><h3>Employee Information</h3></br><h5>UserName : " + UserName + " </h5><br /><h5>Designation : " + designation + " </h5> <br /></div >";


    var creatingMsg = '*====' + 'EMPLOYE TASK DETAIL' + "====*\r\n\r\n" +

        'Task Title:' + taskTitle + "\r\n" +
        'Task Status:' + taskStatus + "\r\n" +
        'Subject:' + 'This is Assign Task Details' + "\r\n";
    'Employee Email:' + + taskStatus + dueDate + "\r\n";


    //'Job Type:' + employeejobtype + "\r\n" +
    //'City:' + city + "\r\n" +
    //'Address:' + address + "\r\n";

    var whatsappMessage = window.encodeURIComponent(creatingMsg)

    LoadTaskAssignToEmployeeEmail();

    Swal.fire({

        title: 'Do you want to Send the Email?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Send`,
        denyButtonText: `Don't Send`,

    }).then((result) => {
        var EmailMessage = $('#designation-grid-all-for-email').html();
        //  var EmailMessage = $('#body-print-all').html();
        //   console.log(EmailMessage);
        KendoGlobalAjax({ commandName: 'Employee_SentEmail', values: { SenderName: EmployeeName, SenderSubject: Subject, SenderEmail: EmployeeEmail, SenderMessage: EmailMessage } });

        /* Read more about isConfirmed, isDenied below */
        if (result.value == true) {
            Swal.fire('Send!', '', 'success')
        } else {
            Swal.fire('<p>Changes are not saved </p>', '', 'info')
        }
    });


}
var deleteRecordByID = function (id) {
    swal.fire({
        title: 'Are you sure?',
        text: "Reason of Deletion",
        input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        buttons: {
            cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {


        if (restult.value) {
            KendoGlobalAjax({ commandName: 'Employee_DeleteByID', values: "{EmployeeID:'" + id + "',ReasonOfDeletion: '" + restult.value + "'}", CallBack: '' });
            setTimeout(function () {

                LoadDesignationKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

function LoadTaskAssignToEmployeeEmail() {

    KendoGlobalAjax({ commandName: 'Task_SelectByEmployeeID', values: { EmployeeID: SelectedEmployeeID }, CallBack: loadAssignTaskToEmployeeEmail });

}

var loadAssignTaskToEmployeeEmail = function (d) {
    KendoGridEmail(JSON.parse(d.Value));
}

var KendoGridEmail = function (_data) {


    var colModel = [

        { field: "taskTitle", title: "Task Title", width: 80, filterable: true },
        { field: "taskStatus", title: "Task Status", width: 140, filterable: true },
        { field: "dueDate", title: "Due Date", width: 120, filterable: true },
    ];

    BindkendoGrid($grid14, 50, colModel, _data);
};


$('#btn-add-update-employee').click(function () {
    window.location.href = '/Employee/Save', '';
    //window.open('/Customer/Save', '_blank');

});

//function LoadKendoDates() {
//    $("#licenseExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]
//    }); $("#certificateExpiryDate").kendoDatePicker({
//        value: new Date(),
//        format: "dd/MM/yyyy",
//        parseFormats: ["MMMM yyyy"]

//    });
//}
//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------


//function LoadCountry() { KendoGlobalAjax({ commandName: 'listCountryDDL', values: '{}', CallBack: getLoadCountry }); }
//var getLoadCountry = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country"); }


//function LoadCountry() {
//    KendoGlobalAjax({ commandName: 'listCountry', values: '{}', CallBack: getLoadCountry });
//}

//var getLoadCountry = function (d) {
//    _CountryList += BindComboForDefault(JSON.parse(d.Value), $("#CountryID"), "Select Country");
//}