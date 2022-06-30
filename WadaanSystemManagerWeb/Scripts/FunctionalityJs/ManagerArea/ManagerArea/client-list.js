
var userId = "";
var username = "";
var roleID = "";
var status = "";

var status = "Active";
var $grid = "client-grid";
var $grid1 = "in-active-client-grid";
var $grid2 = "all-client-grid";

var IsCreateClient = localStorage.getItem('IsCreateClient');
var IsReadClient = localStorage.getItem('IsReadClient');
var IsUpdatedClient = localStorage.getItem('IsUpdatedClient');
var IsDeleteClient = localStorage.getItem('IsDeleteClient');
var IsReadClientDetail = localStorage.getItem('IsReadClientDetail');

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

   
    if (IsCreateClient == 'false') {

        $('#btn-add-manager-client').hide();
    }


    LoadClientKendo();

});

///===================================== For Active Client List =====================================///


$("#active-client").on('click', function () {

    LoadClientKendo();

});
function LoadClientKendo() {

    status = "Active"
    KendoGlobalAjax({ commandName: 'Client_Select', values: { status: status }, CallBack: loadClient });
}


var loadClient = function (d) {

    KendoGridActive(JSON.parse(d.Value));

}

var KendoGridActive = function (_data) {

    var record = 0;

    var colModel = [

        { field: "clientID", title: "ClientID", hidden: true, width: 200 },
        {
            field: "firstName", width: 180, title: "First Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadClientDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a>  # } else  {# #=firstName# #}#",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "prefix", title: "Prefix", width: 170, filterable: true, hidden: true },

        { field: "lastName", title: "Last Name", width: 140, filterable: true },
        { field: "givenName", title: "Given Name", width: 140, filterable: true, hidden: true },
        { field: "mobilePhone", title: "Mobile Phone", width: 140, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 140, filterable: true, hidden: true },
        { field: "emailAddress", title: "Email", width: 150, filterable: true },
        { field: "curPostalAddress", title: "Postal Address", width: 170, filterable: true, hidden: true },
        { field: "curHouseNo", title: "CurHouseNo", width: 170, filterable: true, hidden: true },
        { field: "curStreetNo", title: "CurStreetNo", width: 170, filterable: true, hidden: true },
        { field: "curTownSector", title: "CurTownSector", width: 170, filterable: true, hidden: true },
        { field: "curCity", title: "CurCity", width: 170, filterable: true, hidden: true },
        { field: "curProvince", title: "CurProvince", width: 170, filterable: true, hidden: true },
        { field: "perHouseNo", title: "PerHouseNo", width: 170, filterable: true, hidden: true },
        { field: "perStreetNo", title: "PerStreetNo", width: 170, filterable: true, hidden: true },
        { field: "perTownSector", title: "PerTownSector", width: 170, filterable: true, hidden: true },
        { field: "perCity", title: "PerCity", width: 170, filterable: true, hidden: true },
        { field: "perProvince", title: "PerProvince", width: 170, filterable: true, hidden: true },
        { field: "maritalStatus", title: "MaritalStatus", width: 170, filterable: true, hidden: true },
        { field: "occupation", title: "Occupation", width: 170, filterable: true, hidden: true },
        { field: "designationID", title: "DesignationID", width: 170, filterable: true, hidden: true },
        { field: "company", title: "Company", width: 170, filterable: true, hidden: true },
        { field: "bPhone", title: "BPhone", width: 170, filterable: true, hidden: true },
        { field: "bEmail", title: "BEmail", width: 170, filterable: true, hidden: true },
        { field: "bPostalAddress", title: "BPostalAddress", width: 170, filterable: true, hidden: true },
        { field: "bOffice", title: "BOffice", width: 170, filterable: true, hidden: true },
        { field: "bStreet", title: "BStreet", width: 170, filterable: true, hidden: true },
        { field: "bTownSector", title: "BTownSector", width: 170, filterable: true, hidden: true },
        { field: "bCity", title: "BCity", width: 170, filterable: true, hidden: true },
        { field: "bProvince", title: "BProvince", width: 170, filterable: true, hidden: true },
        { field: "bWebpage", title: "BWebpage", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromGoogle", title: "KnowUsFromGoogle", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromFacebook", title: "KnowUsFromFacebook", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromWebsite", title: "KnowUsFromWebsite", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromInstagram", title: "KnowUsFromInstagram", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromLinkdin", title: "KnowUsFromLinkdin", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromTwitter", title: "KnowUsFromTwitter", width: 170, filterable: true, hidden: true },
        { field: "refreeName", title: "RefreeName", width: 170, filterable: true, hidden: true },
        { field: "refreePhoneNo", title: "RefreePhoneNo", width: 170, filterable: true, hidden: true },
        { field: "dispatchHouseNo", title: "DispatchHouseNo", width: 170, filterable: true, hidden: true },
        { field: "dispatchStreet", title: "DispatchStreet", width: 170, filterable: true, hidden: true },
        { field: "dispatchTownSector", title: "DispatchTownSector", width: 170, filterable: true, hidden: true },
        { field: "dispatchCity", title: "DispatchCity", width: 170, filterable: true, hidden: true },
        { field: "dispatchProvince", title: "DispatchProvince", width: 170, filterable: true, hidden: true },
        { field: "billHouseNo", title: "BillHouseNo", width: 170, filterable: true, hidden: true },
        { field: "billStreetNo", title: "BillStreetNo", width: 170, filterable: true, hidden: true },
        { field: "billCity", title: "Bill City", width: 170, filterable: true },
        { field: "billProvince", title: "BillProvince", width: 170, filterable: true, hidden: true },
        { field: "hobGardening", title: "HobGardening", width: 170, filterable: true, hidden: true },
        { field: "hobBookReading", title: "HobBookReading", width: 170, filterable: true, hidden: true },
        { field: "hobMoviesAndSerials", title: "HobMoviesAndSerials", width: 170, filterable: true, hidden: true },
        { field: "hobCoocking", title: "HobCoocking", width: 170, filterable: true, hidden: true },
        { field: "userID", title: "UserID", width: 170, filterable: true, hidden: true, hidden: true },
        {
            field: "", width: 170,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
            //            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
             template: "# if (IsUpdatedClient == 'true') { # <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Client' <span class='fa fa-edit'></span></a>  # } if (IsDeleteClient == 'true'){# <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=clientID#')  title='Delete Client'<span class='fa fa-trash'></span></a> #}   #",
           // template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Client' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=clientID#')  title='Delete Client'><span class='fa fa-trash'></span></a>"


        }];

    BindkendoGrid($grid, 50, colModel, _data);
};


///===================================== For In-Active Client List =====================================///
$("#in-active-client").on('click', function () {
    LoadInActiveClient();
});

function LoadInActiveClient() {
    status = 'inActive';
    KendoGlobalAjax({ commandName: 'Client_Select', values: { Status: status }, CallBack: fnloadInactiveClient });

}

var fnloadInactiveClient = function (d) {
    KendoGridinActive(JSON.parse(d.Value));
}


var KendoGridinActive = function (_data) {

    var record = 0;

    var colModel = [

        { field: "clientID", title: "ClientID", hidden: true, width: 200 },
        {
            field: "firstName", width: 180, title: "First Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "# if (IsReadClientDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a>  # } else  {# #=firstName# #}#",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "prefix", title: "Prefix", width: 170, filterable: true, hidden: true },

        { field: "lastName", title: "Last Name", width: 140, filterable: true },
        { field: "givenName", title: "Given Name", width: 140, filterable: true, hidden: true },
        { field: "mobilePhone", title: "Mobile Phone", width: 140, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 140, filterable: true, hidden: true },
        { field: "emailAddress", title: "Email", width: 150, filterable: true },
        { field: "curPostalAddress", title: "Postal Address", width: 170, filterable: true, hidden: true },
        { field: "curHouseNo", title: "CurHouseNo", width: 170, filterable: true, hidden: true },
        { field: "curStreetNo", title: "CurStreetNo", width: 170, filterable: true, hidden: true },
        { field: "curTownSector", title: "CurTownSector", width: 170, filterable: true, hidden: true },
        { field: "curCity", title: "CurCity", width: 170, filterable: true, hidden: true },
        { field: "curProvince", title: "CurProvince", width: 170, filterable: true, hidden: true },
        { field: "perHouseNo", title: "PerHouseNo", width: 170, filterable: true, hidden: true },
        { field: "perStreetNo", title: "PerStreetNo", width: 170, filterable: true, hidden: true },
        { field: "perTownSector", title: "PerTownSector", width: 170, filterable: true, hidden: true },
        { field: "perCity", title: "PerCity", width: 170, filterable: true, hidden: true },
        { field: "perProvince", title: "PerProvince", width: 170, filterable: true, hidden: true },
        { field: "maritalStatus", title: "MaritalStatus", width: 170, filterable: true, hidden: true },
        { field: "occupation", title: "Occupation", width: 170, filterable: true, hidden: true },
        { field: "designationID", title: "DesignationID", width: 170, filterable: true, hidden: true },
        { field: "company", title: "Company", width: 170, filterable: true, hidden: true },
        { field: "bPhone", title: "BPhone", width: 170, filterable: true, hidden: true },
        { field: "bEmail", title: "BEmail", width: 170, filterable: true, hidden: true },
        { field: "bPostalAddress", title: "BPostalAddress", width: 170, filterable: true, hidden: true },
        { field: "bOffice", title: "BOffice", width: 170, filterable: true, hidden: true },
        { field: "bStreet", title: "BStreet", width: 170, filterable: true, hidden: true },
        { field: "bTownSector", title: "BTownSector", width: 170, filterable: true, hidden: true },
        { field: "bCity", title: "BCity", width: 170, filterable: true, hidden: true },
        { field: "bProvince", title: "BProvince", width: 170, filterable: true, hidden: true },
        { field: "bWebpage", title: "BWebpage", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromGoogle", title: "KnowUsFromGoogle", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromFacebook", title: "KnowUsFromFacebook", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromWebsite", title: "KnowUsFromWebsite", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromInstagram", title: "KnowUsFromInstagram", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromLinkdin", title: "KnowUsFromLinkdin", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromTwitter", title: "KnowUsFromTwitter", width: 170, filterable: true, hidden: true },
        { field: "refreeName", title: "RefreeName", width: 170, filterable: true, hidden: true },
        { field: "refreePhoneNo", title: "RefreePhoneNo", width: 170, filterable: true, hidden: true },
        { field: "dispatchHouseNo", title: "DispatchHouseNo", width: 170, filterable: true, hidden: true },
        { field: "dispatchStreet", title: "DispatchStreet", width: 170, filterable: true, hidden: true },
        { field: "dispatchTownSector", title: "DispatchTownSector", width: 170, filterable: true, hidden: true },
        { field: "dispatchCity", title: "DispatchCity", width: 170, filterable: true, hidden: true },
        { field: "dispatchProvince", title: "DispatchProvince", width: 170, filterable: true, hidden: true },
        { field: "billHouseNo", title: "BillHouseNo", width: 170, filterable: true, hidden: true },
        { field: "billStreetNo", title: "BillStreetNo", width: 170, filterable: true, hidden: true },
        { field: "billCity", title: "Bill City", width: 170, filterable: true },
        { field: "billProvince", title: "BillProvince", width: 170, filterable: true, hidden: true },
        { field: "hobGardening", title: "HobGardening", width: 170, filterable: true, hidden: true },
        { field: "hobBookReading", title: "HobBookReading", width: 170, filterable: true, hidden: true },
        { field: "hobMoviesAndSerials", title: "HobMoviesAndSerials", width: 170, filterable: true, hidden: true },
        { field: "hobCoocking", title: "HobCoocking", width: 170, filterable: true, hidden: true },
        { field: "userID", title: "UserID", width: 170, filterable: true, hidden: true, hidden: true },
        {
            field: "", width: 170,
            title: "Action",


            // template: "# if (IsUpdatedClient == 'true') { #  <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>  # }   #",
            template: " <a style='font-size:20px;cursor:pointer;' onClick= ChangeStatus(this) title='Change Status' ><span class='mdi mdi-refresh'></span></a>",

        }
    ];


    BindkendoGrid($grid1, 50, colModel, _data);
};


function ChangeStatus(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid1).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
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
            KendoGlobalAjax({ commandName: 'Client_ChangeStatus', values: "{ClientID:'" + dataItem.clientID + "'}", CallBack: '' });
            setTimeout(function () {
                LoadInActiveClient();

            }, 50);

            swal.fire('Updated', '', 'success');

        } else {
            swal.fire("Cancelled", '', "error");

        }
    });


}


///===================================== For All Client List =====================================///

$("#all-client").on('click', function () {
    status = 'All';
    KendoGlobalAjax({ commandName: 'Client_Select', values: { Status: status }, CallBack: loadAllClient });
});

var loadAllClient = function (d) {

    KendoGridAllClient(JSON.parse(d.Value));
}

var KendoGridAllClient = function (_data) {

    var record = 0;

    var colModel = [

        { field: "clientID", title: "ClientID", hidden: true, width: 200 },
        {
            field: "firstName", width: 180, title: "First Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            // template: "# if (IsReadClientDetail == 'true') { # <a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a>  # } else  {# #=firstName# #}#",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=firstName#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "prefix", title: "Prefix", width: 170, filterable: true, hidden: true },

        { field: "lastName", title: "Last Name", width: 140, filterable: true },
        { field: "givenName", title: "Given Name", width: 140, filterable: true, hidden: true },
        { field: "mobilePhone", title: "Mobile Phone", width: 140, filterable: true },
        { field: "whatsApp", title: "WhatsApp", width: 140, filterable: true, hidden: true },
        { field: "emailAddress", title: "Email", width: 150, filterable: true },
        { field: "curPostalAddress", title: "Postal Address", width: 170, filterable: true, hidden: true },
        { field: "curHouseNo", title: "CurHouseNo", width: 170, filterable: true, hidden: true },
        { field: "curStreetNo", title: "CurStreetNo", width: 170, filterable: true, hidden: true },
        { field: "curTownSector", title: "CurTownSector", width: 170, filterable: true, hidden: true },
        { field: "curCity", title: "CurCity", width: 170, filterable: true, hidden: true },
        { field: "curProvince", title: "CurProvince", width: 170, filterable: true, hidden: true },
        { field: "perHouseNo", title: "PerHouseNo", width: 170, filterable: true, hidden: true },
        { field: "perStreetNo", title: "PerStreetNo", width: 170, filterable: true, hidden: true },
        { field: "perTownSector", title: "PerTownSector", width: 170, filterable: true, hidden: true },
        { field: "perCity", title: "PerCity", width: 170, filterable: true, hidden: true },
        { field: "perProvince", title: "PerProvince", width: 170, filterable: true, hidden: true },
        { field: "maritalStatus", title: "MaritalStatus", width: 170, filterable: true, hidden: true },
        { field: "occupation", title: "Occupation", width: 170, filterable: true, hidden: true },
        { field: "designationID", title: "DesignationID", width: 170, filterable: true, hidden: true },
        { field: "company", title: "Company", width: 170, filterable: true, hidden: true },
        { field: "bPhone", title: "BPhone", width: 170, filterable: true, hidden: true },
        { field: "bEmail", title: "BEmail", width: 170, filterable: true, hidden: true },
        { field: "bPostalAddress", title: "BPostalAddress", width: 170, filterable: true, hidden: true },
        { field: "bOffice", title: "BOffice", width: 170, filterable: true, hidden: true },
        { field: "bStreet", title: "BStreet", width: 170, filterable: true, hidden: true },
        { field: "bTownSector", title: "BTownSector", width: 170, filterable: true, hidden: true },
        { field: "bCity", title: "BCity", width: 170, filterable: true, hidden: true },
        { field: "bProvince", title: "BProvince", width: 170, filterable: true, hidden: true },
        { field: "bWebpage", title: "BWebpage", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromGoogle", title: "KnowUsFromGoogle", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromFacebook", title: "KnowUsFromFacebook", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromWebsite", title: "KnowUsFromWebsite", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromInstagram", title: "KnowUsFromInstagram", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromLinkdin", title: "KnowUsFromLinkdin", width: 170, filterable: true, hidden: true },
        { field: "knowUsFromTwitter", title: "KnowUsFromTwitter", width: 170, filterable: true, hidden: true },
        { field: "refreeName", title: "RefreeName", width: 170, filterable: true, hidden: true },
        { field: "refreePhoneNo", title: "RefreePhoneNo", width: 170, filterable: true, hidden: true },
        { field: "dispatchHouseNo", title: "DispatchHouseNo", width: 170, filterable: true, hidden: true },
        { field: "dispatchStreet", title: "DispatchStreet", width: 170, filterable: true, hidden: true },
        { field: "dispatchTownSector", title: "DispatchTownSector", width: 170, filterable: true, hidden: true },
        { field: "dispatchCity", title: "DispatchCity", width: 170, filterable: true, hidden: true },
        { field: "dispatchProvince", title: "DispatchProvince", width: 170, filterable: true, hidden: true },
        { field: "billHouseNo", title: "BillHouseNo", width: 170, filterable: true, hidden: true },
        { field: "billStreetNo", title: "BillStreetNo", width: 170, filterable: true, hidden: true },
        { field: "billCity", title: "Bill City", width: 170, filterable: true },
        { field: "billProvince", title: "BillProvince", width: 170, filterable: true, hidden: true },
        { field: "hobGardening", title: "HobGardening", width: 170, filterable: true, hidden: true },
        { field: "hobBookReading", title: "HobBookReading", width: 170, filterable: true, hidden: true },
        { field: "hobMoviesAndSerials", title: "HobMoviesAndSerials", width: 170, filterable: true, hidden: true },
        { field: "hobCoocking", title: "HobCoocking", width: 170, filterable: true, hidden: true },
        { field: "userID", title: "UserID", width: 170, filterable: true, hidden: true, hidden: true },

    ];

    BindkendoGrid2($grid2, 50, colModel, _data);
};


function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/ClientDetail?clientID=' + dataItem.clientID + '';
}

function EditDetail(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/ClientSave?clientID=' + dataItem.clientID + '';
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
            KendoGlobalAjax({ commandName: 'Client_DeleteByID', values: "{ClientID:'" + id + "'}", CallBack: '' });
            setTimeout(function () {

                LoadClientKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}




$('#btn-add-update-employee').click(function () {
    window.location.href = '/PROJECTMANAGERAREA/ProjectManager/ClientList', '';
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