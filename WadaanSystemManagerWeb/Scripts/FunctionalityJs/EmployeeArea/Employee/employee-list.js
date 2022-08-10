
var userId = "";
var username = "";
var roleID = "";
var Status = "";
var SelectedEmployeeID = "";

var $grid = "employee-grid";
var $grid12 = "employee-grid-in-active";
var $grid13 = "employee-grid-all";
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

    LoadEmployeeKendo();

});


$('#btn-send-email').click(function () {
    
    window.localStorage.setItem("EmailIt", "1");
    window.open('/Employee/Employee/EmployeePrint', '_blank')
});
function LoadEmployeeKendo() {
    
    Status = 'Active'
    KendoGlobalAjax({ commandName: 'Employee_Select', values: { Status: Status}, CallBack: loadEmployee });
}


var loadEmployee = function (d) {
  
 
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    var record = 0;
    var record = 0;

    var colModel = [


        { title: "S/N", width: 40, template: "#= renderNumber() #" },
        { field: "employeeID", title: "EmployeeID", hidden: true, width: 200 },
        { field: "empID", title: "EmployeeID", width: 200 },
     

        {
            field: "userName", width: 140, title: "User Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            //template: "# if (IsReadEmployeeDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a>  # } else   {# #=userName# #}#",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "prefix", title: "Prefix", width: 80, filterable: true , hidden:true },
        { field: "firstName", title: "First Name", width: 110, filterable: true, hidden: true },
        { field: "lastName", title: "Last Name", width: 90, filterable: true, hidden: true},
        { field: "givenName", title: "Full Name", width: 170, filterable: true },
        { field: "mobilePhone", title: "Mobile No#", width: 120, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 125, filterable: true  },
        { field: "emailAddress", title: "Email Address", width: 230, filterable: true, },
        { field: "curPostalAddress", title: "Current Postal Address", width: 170, filterable: true, hidden: true },
        { field: "curHouseNo", title: "Current House No#", width: 170, filterable: true, hidden: true },
        { field: "curStreetNo", title: "Current Street No#", width: 170, filterable: true, hidden: true },
        { field: "curTownSector", title: "Current Town Sector", width: 170, filterable: true, hidden: true },
        { field: "cityName", title: "Current City", width: 170, filterable: true, hidden: true },
        { field: "provinceName", title: "Currrent Province", width: 170, filterable: true, hidden: true },
        { field: "perHouseNo", title: "Permanent House No#", width: 170, filterable: true, hidden: true },
        { field: "perStreetNo", title: "permanent Street No#", width: 170, filterable: true, hidden: true },
        { field: "perTownSector", title: "permanent Town Sector", width: 170, filterable: true, hidden: true },
        { field: "perCity", title: "permanent City", width: 170, filterable: true, hidden: true },
        { field: "perProvince", title: "Permanent Province", width: 170, filterable: true, hidden: true },
        { field: "designationName", title: "Designation", width: 170, filterable: true, hidden: true },
        { field: "employeeTypeName", title: "Employee Type", width: 170, filterable: true, hidden: true },
        { field: "password", title: "Password", width: 170, filterable: true, hidden: true },
        { field: "userID", title: "UserID", width: 170, filterable: true, hidden: true },
        {
            field: "", width: 170,
            title: "Action",


            //template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            //template: "# if (IsUpdateEmployeeDetail == 'true') { # <a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='icofont icofont-phone'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  # } else if (IsDeleteEmployee =='true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a> #}   #",
            //template: "# if (IsUpdateEmployeeDetail == 'true') { # <a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='icofont icofont-phone'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  # } else if (IsDeleteEmployee =='false'){ # <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a> # }   #",
            //template: "# if (IsUpdateEmployeeDetail == 'true' ) { # <a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='fa fa-whatsapp'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  #}  else if (IsDeleteEmployee =='false' ) {# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a> #} # "

            //template: "# if (IsUpdateEmployeeDetail == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteEmployee =='false' ) {# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a> #} # "

            //template: "<a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='icofont icofont-phone'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a>"
			//template: "<a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='icofont icofont-phone'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
            template: "<a style='cursor:pointer; font-size:20px;' onClick= whatsapp_btn(this) title='Share Employee' ><span class='icofont icofont-phone'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <button type='button' class='btn btn-danger btn-sm text-white'   onclick=deleteRecordByID('#=employeeID#')> Deactivate</button>"

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};


$('#active-employee').on('click', function () {
   
    LoadEmployeeKendo();
});

$('#in-active-employee').on('click', function () {
   
  LoadInActiveEmployeeKendo();
});

$('#all-employee').on('click', function () {
   
    LoadAllEmployeeKendo();
});


















function LoadInActiveEmployeeKendo() {
  
    Status = 'InActive'
    
    KendoGlobalAjax({ commandName: 'Employee_Select', values: { Status: Status }, CallBack: fnLoadInActiveEmployee });
}
var fnLoadInActiveEmployee = function (d) {
   
   

    KendoGrid2(JSON.parse(d.Value));
  
}
var KendoGrid2 = function (_data) {

    var record = 0;
    var record = 0;

    var colModel = [
        { field: "employeeID", title: "EmployeeID", hidden: true, width: 200 },
        {
            field: "userName", width: 120, title: "UserName",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadEmployeeDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a>  # } else   {# #=userName# #}#",
            // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "prefix", title: "Prefix", width: 80, filterable: true,hidden:true },
        { field: "firstName", title: "First Name", width: 110, filterable: true, hidden: true },
          { field: "lastName", title: "Last Name", width: 110, filterable: true , hidden:true},
        { field: "givenName", title: "Full Name", width: 150, filterable: true  },
        { field: "mobilePhone", title: "Mobile Phone", width: 140, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 170, filterable: true, hidden: true },
        { field: "emailAddress", title: "Email Address", width: 200, filterable: true, },
        { field: "reasonForDeletion", title: "Reason For Deletion", width: 175, filterable: true, hidden: false },
        { field: "curPostalAddress", title: "CurPostalAddress", width: 170, filterable: true, hidden: true },
        { field: "curHouseNo", title: "Current HouseNo", width: 170, filterable: true, hidden: true },
        { field: "curStreetNo", title: "Current StreetNo", width: 170, filterable: true, hidden: true },
        { field: "curTownSector", title: "Current Town Sector", width: 170, filterable: true, hidden: true },
        { field: "cityName", title: "Current City", width: 170, filterable: true, hidden: true },
        { field: "provinceName", title: "Currrent Province", width: 170, filterable: true, hidden: true },
        { field: "perHouseNo", title: "PerHouseNo", width: 170, filterable: true, hidden: true },
        { field: "perStreetNo", title: "PerStreetNo", width: 170, filterable: true, hidden: true },
        { field: "perTownSector", title: "PerTownSector", width: 170, filterable: true, hidden: true },
        { field: "perCity", title: "PerCity", width: 170, filterable: true, hidden: true },
        { field: "perProvince", title: "PerProvince", width: 170, filterable: true, hidden: true },
        { field: "designationName", title: "Designation", width: 170, filterable: true, hidden: true },
        { field: "employeeTypeName", title: "Employee Type", width: 170, filterable: true, hidden: true },
        { field: "password", title: "Password", width: 170, filterable: true, hidden: true },
        { field: "userID", title: "UserID", width: 170, filterable: true, hidden: true },
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

                LoadInActiveEmployeeKendo();
            }, 50);

            swal.fire('Updated', '', 'success');
          
            LoadInActiveEmployeeKendo();
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });


}















function LoadAllEmployeeKendo() {

    Status = 'All'

    KendoGlobalAjax({ commandName: 'Employee_Select', values: { Status: Status }, CallBack: fnLoadInAllEmployee });
}
var fnLoadInAllEmployee = function (d) {

    KendoGrid3(JSON.parse(d.Value));
}
var KendoGrid3 = function (_data) {

    var record = 0;
    var record = 0;

    var colModel = [
        { title: "S/N", width: 40, template: "#= renderNumber() #" },
        { field: "employeeID", title: "EmployeeID", hidden: true, width: 200 },
        {
            field: "userName", width: 160, title: "UserName",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadEmployeeDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a>  # } else   {# #=userName# #}#",
            // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "prefix", title: "Prefix", width: 80, filterable: true, hidden: true},
        { field: "firstName", title: "First Name", width: 140, filterable: true, hidden: true },
        { field: "lastName", title: "Last Name", width: 120, filterable: true, hidden: true},
        { field: "givenName", title: "Given Name", width: 180, filterable: true },
        { field: "mobilePhone", title: "Mobile Phone", width: 140, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 170, filterable: true, hidden: true },
        { field: "emailAddress", title: "Email Address", width: 190, filterable: true, },
        { field: "curPostalAddress", title: "CurPostalAddress", width: 170, filterable: true, hidden: true },
        { field: "curHouseNo", title: "Current HouseNo", width: 170, filterable: true, hidden: true },
        { field: "curStreetNo", title: "Current StreetNo", width: 170, filterable: true, hidden: true },
        { field: "curTownSector", title: "Current Town Sector", width: 170, filterable: true, hidden: true },
        { field: "cityName", title: "Current City", width: 170, filterable: true, hidden: true },
        { field: "provinceName", title: "Currrent Province", width: 170, filterable: true, hidden: true },
        { field: "perHouseNo", title: "PerHouseNo", width: 170, filterable: true, hidden: true },
        { field: "perStreetNo", title: "PerStreetNo", width: 170, filterable: true, hidden: true },
        { field: "perTownSector", title: "PerTownSector", width: 170, filterable: true, hidden: true },
        { field: "perCity", title: "PerCity", width: 170, filterable: true, hidden: true },
        { field: "perProvince", title: "PerProvince", width: 170, filterable: true, hidden: true },
        { field: "designationName", title: "Designation", width: 170, filterable: true, hidden: true },
        { field: "employeeTypeName", title: "Employee Type", width: 170, filterable: true, hidden: true },
        { field: "password", title: "Password", width: 170, filterable: true, hidden: true },
        { field: "userID", title: "UserID", width: 170, filterable: true, hidden: true },
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
        'Employee:' +employeeName +"\r\n" +
        'Designation:'+ designation+"\r\n" +
        'Job Type:'+employeejobtype+"\r\n" +
        'City:'+city +"\r\n" +
        'Address:'+ address +"\r\n";
    var whatsappMessage = window.encodeURIComponent(creatingMsg)
        
    window.open('https://wa.me/?text=' + whatsappMessage , '_blank');
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
    window.location.href = '/Employee/Employee/Save?employeeID=' + dataItem.employeeID + '';
}


function EmployeePrint(e)
{
    
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
        var EmailMessage =  $('#employee-grid-all-for-email').html();
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

                LoadEmployeeKendo();
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