
var userId = "";
var username = "";
var roleID = "";

var $grid = "meeting-grid";


var IsCreateMeeting = localStorage.getItem('IsCreateMeeting');
var IsReadMeeting = localStorage.getItem('IsReadMeeting');
var IsUpdatedMeeting = localStorage.getItem('IsUpdatedMeeting');
var IsDeleteMeeting = localStorage.getItem('IsDeleteMeeting');
var IsReadMeetingDetail = localStorage.getItem('IsReadMeetingDetail');




$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);



  
        $('#btn-add-new-meeting').show();
 


    LoadMeetingKendo();

});


function LoadMeetingKendo() {
    KendoGlobalAjax({ commandName: 'Meeting_Select', values: {}, CallBack: loadMeeting });  
}


var loadMeeting = function (d) {
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;

    var colModel = [

      

        { field: "MeetingID", title: "MeetingID", hidden: true, width: 200 },

        {
            field: "meetingName", width: 250, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            //template: "# if (IsReadMeetingDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=meetingName#</a>  # } else  {# #=meetingName# #}#",
           template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=meetingName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "meetingType", title: "Meeting Type", width: 190, filterable: true },
        { field: "meetingDate", title: "Start Date/Time", width: 190, filterable: true },
        { field: "meetingEndDate", title: "End Date/Time", width: 190, filterable: true },
        
        { field: "meetingDiscussion", title: "Meeting Discussion", width: 190, filterable: true, hidden:true },
        { field: "firstName", title: "Client Name", width: 170, filterable: true },
        { field: "employeeName", title: "Employee Name", width: 170, filterable: true },
        {
            field: "", width: 170,
            title: "Action",
            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //  template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Meeting' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=meetingID#')  title='Delete Meeting'><span class='fa fa-trash'></span></a>"
           // template: "# if (IsUpdatedMeeting == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Meeting' <span class='fa fa-edit'></span></a>   # } else if (IsDeleteMeeting == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=meetingID#')  title='Delete Meeting'<span class='fa fa-trash'></span></a> #}   #",


        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Meeting/Meeting/MeetingDetail?meetingID=' + dataItem.meetingID + '';
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Meeting/Meeting/Save?meetingID=' + dataItem.meetingID + '';
}


var deleteRecordByID = function (id) {

    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
        text: "You want to delete this!",
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
            KendoGlobalAjax({ commandName: 'Meeting_DeleteByID', values: "{MeetingID:'" + id + "'}", CallBack: '' });  
            setTimeout(function () {

                LoadMeetingKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

 


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