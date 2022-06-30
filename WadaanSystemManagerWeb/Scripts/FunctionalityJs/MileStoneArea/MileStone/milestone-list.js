
var userId = "";
var username = "";
var roleID = "";

var $grid = "milestone-grid";

$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);

    LoadMileStoneKendo();
 });


function LoadMileStoneKendo() {
    KendoGlobalAjax({ commandName: 'MileStone_Select', values: {}, CallBack: loadMileStone });  
}


var loadMileStone = function (d) {
  
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {
    
    var record = 0;

    var colModel = [

      

        { field: "milestoneID", title: "MilestoneID", hidden: true, width: 200 },

        {
            field: "name", width: 250, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=name#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
       
        { field: "description", title: "Description", width: 170, filterable: true , hidden:true},
        { field: "startDate", title: "Start Date", width: 170, filterable: true },
        { field: "endDate", title: "End Date", width: 170, filterable: true },
        { field: "status", title: "Status", width: 170, filterable: true },
        { field: "isActive", title: "IsActive", width: 170, filterable: true, hidden:true },
        {
            field: "", width: 170,
            title: "Action",


            //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
//            template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Employee' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=milestoneID#')  title='Delete Employee'><span class='fa fa-trash'></span></a>"


        }];

    BindkendoGrid($grid, 50, colModel, _data);
};

function LoadRecordByID(e) {
   

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/MileStone/MileStone/MileStoneDetail?mileStoneID=' + dataItem.milestoneID + '';
}

function EditDetail(e) {
 
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/MileStone/MileStone/Save?mileStoneID=' + dataItem.milestoneID + '';
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
            KendoGlobalAjax({ commandName: 'MileStone_DeleteByID', values: "{MileStoneID:'" + id + "'}", CallBack: '' });  
            setTimeout(function () {
                LoadMileStoneKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}

 





