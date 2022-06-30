
var userId = "";
var username = "";
var roleID = "";

var $grid1 = 'employee-grid-print';


$(document).ready(function () {

    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
   
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    LoadEmployeeKendoForPrint();
    

    if (window.localStorage.getItem("EmailIt") == "1") {
        window.localStorage.setItem("EmailIt", "0");
        swal.fire({
            title: 'Do you want to Send the Email??',
            text: "Enter the email",
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


                var EmailMessage = $('#body-print-record').html();

                KendoGlobalAjax({ commandName: 'Employee_SentEmail', values: { SenderName: "", SenderSubject: "Info Email", SenderEmail: restult.value, SenderMessage: EmailMessage } });


                if (result.value == true) {
                    Swal.fire('Send!', '', 'success')
                } else {
                    Swal.fire('<p>Changes are not saved </p>', '', 'info')
                }


            } else {
                swal.fire("Cancelled", '', "error");

            }
        });
    } else {

    }

    ////----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------

});



function LoadEmployeeKendoForPrint() {

    KendoGlobalAjax({ commandName: 'Employee_Select', values: { Status: 'Active' }, CallBack: loadEmployeePrint });
}


var loadEmployeePrint = function (d) {

    KendoGridPrint(JSON.parse(d.Value));
}

var KendoGridPrint = function (_data) {
    var record = 0;

    var colModel = [



        { field: "employeeID", title: "EmployeeID", hidden: true, width: 200 },

        {
            field: "userName", width: 140, title: "UserName", hidden: true,
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            //     template: "# if (IsReadEmployeeDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a>  # } else   {# #=userName# #}#",
            // template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=userName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },

        { field: "prefix", title: "Prefix", width: 80, filterable: true, hidden: true },
        //{ field: "firstName", title: "First Name", width: 110, filterable: true },
        //{ field: "lastName", title: "Last Name", width: 90, filterable: true },
        { field: "givenName", title: "Given Name", width: 180, filterable: true, hidden: false },
        { field: "mobilePhone", title: "Mobile Phone", width: 120, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 120, filterable: true },
        { field: "emailAddress", title: "Email Address", width: 200, filterable: true, },
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

    BindkendoGridPrint($grid1, 50, colModel, _data);
};



function LoadEmployeeDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Employee_SelectByID', values: { EmployeeID: id }, CallBack: loadEmployeesDataByID });
    }

}

var loadEmployeesDataByID = function (d) {
    console.log(d);

    setTimeout(function () {
        $('input,select,textarea').removeClass('error');

        //fnAssignTypeToCustomer(JSON.parse(d.Value)[0].customerType);

        $('#GivenName').text(JSON.parse(d.Value)[0].givenName);
        $('#EmailAddress').text(JSON.parse(d.Value)[0].emailAddress);
        $('#MobilePhone').text(JSON.parse(d.Value)[0].mobilePhone);
        $('#CurPostalAddress').text(JSON.parse(d.Value)[0].curPostalAddress);


       
    }, 50);


}
//{ $('#body-print-record').load('/shared/PartialViewExample');  }

