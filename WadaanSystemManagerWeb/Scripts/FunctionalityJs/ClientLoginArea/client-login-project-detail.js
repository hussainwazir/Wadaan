
var userId = "";
var username = "";
var roleID = "";

var $grid = "tasks-list-on-client-project-grid";

$(document).ready(function () {
    //$('#div-main-header').find('span').css('font-size', '19px');
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadProjectDataDetail();
   

});


function testing () {
    LoadtaskKendo();
}
$('#taskdetail').click(function () {

   

});

function LoadProjectDataDetail() {
 
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'Project_SelectDetailByID', values: { ProjectID: id }, CallBack: LoadProjectDataDetailsByID });
    KendoGlobalAjax({ commandName: 'Project_SelectAttachmentProjectID', values: "{EmployeeID:'" + id + "'}", CallBack: fnloadProjectAttachementByProjectID });


}
var LoadProjectDataDetailsByID = function (d) {
  
    setTimeout(function () {
        
        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        $('.project').text(JSON.parse(d.Value)[0]["projectName"]);
        $('.priority').text(JSON.parse(d.Value)[0]["priority"]);
        $('.category').text(JSON.parse(d.Value)[0]["projectCategory"]);
        $('.cType').text(JSON.parse(d.Value)[0]["contractType"]);
        $('.pSize').text(JSON.parse(d.Value)[0]["residentialPlotSize"]);
        $('.contractType').text(JSON.parse(d.Value)[0]["contractType"]);
        $('.ResidentialPlotSize').text(JSON.parse(d.Value)[0]["residentialPlotSize"]);
        $('.cName').text(JSON.parse(d.Value)[0]["contractorName"]);
        $('.SubStructure').text(JSON.parse(d.Value)[0]["subStructure"]);
        $('.SuperStructure').text(JSON.parse(d.Value)[0]["superStructure"]);
        $('.Finishing').text(JSON.parse(d.Value)[0]["finishing"]);
        $('.Sketch').text(JSON.parse(d.Value)[0]["sketch"]);
        $('.SubmissionDrawing').text(JSON.parse(d.Value)[0]["submissionDrawing"]);
        $('.ArchitecturalDrawing').text(JSON.parse(d.Value)[0]["architecturalDrawing"]);
        $('.StructuralDrawing').text(JSON.parse(d.Value)[0]["structuralDrawing"]);
        $('.ElectricalDrawing').text(JSON.parse(d.Value)[0]["electricalDrawing"]);
        $('.PlumbingDrawing').text(JSON.parse(d.Value)[0]["plumbingDrawing"]);
        $('.Estimation').text(JSON.parse(d.Value)[0]["estimation"]);

        $('.ProjectName').text(JSON.parse(d.Value)[0]["projectName"]);
        $('.name').text(JSON.parse(d.Value)[0]["firstName"]);
       
        $('.contractor').text(JSON.parse(d.Value)[0]["contractorID"]);
        $('.houseNo').text(JSON.parse(d.Value)[0]["plotHouseNo"]);
        $('.street').text(JSON.parse(d.Value)[0]["street"]);
        $('.TownSector').text(JSON.parse(d.Value)[0]["townSector"]); 
        $('.provinceID').text(JSON.parse(d.Value)[0]["provinceName"]);
        $('.cityID').text(JSON.parse(d.Value)[0]["cityName"]);
        $('.contractor').text(JSON.parse(d.Value)[0]["contractorName"]);
        $('.east').text(JSON.parse(d.Value)[0]["east"]);
        $('.north').text(JSON.parse(d.Value)[0]['north']);
        $('.west').text(JSON.parse(d.Value)[0]['west']);
        $('.south').text(JSON.parse(d.Value)[0]['south']);

        $('.estimation').text(JSON.parse(d.Value)[0]['east']);
        //$('.contractorImage').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);


    }, 50);
}


var fnloadProjectAttachementByProjectID = function (d) {
    var fileExtension = "";

    $('.appendAttachment').empty();

    if (JSON.parse(d.Value).length == 0) {

        //    $('.appendAttachment').append('<img class="appendAttachment"  src="~/images/xpmDef25-b1e0-4ac4-82d9-bb10eebcc55c.png" style=" width:15%;" alt="" />')

    } else {
       
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            if (JSON.parse(d.Value)[i].path.split('.')[1] == "docx" || JSON.parse(d.Value)[i].path.split('.')[1] == "doc" || JSON.parse(d.Value)[i].path.split('.')[1] == "docs") {
                fileExtension = " icofont icofont-file-word f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "pdf" || JSON.parse(d.Value)[i].path.split('.')[1] == "PDF") {

                fileExtension = "icofont icofont-file-powerpoint f-28 text-muted";
            } else if (JSON.parse(d.Value)[i].path.split('.')[1] == "jpg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPG" || JSON.parse(d.Value)[i].path.split('.')[1] == "jpeg" || JSON.parse(d.Value)[i].path.split('.')[1] == "JPEG" || JSON.parse(d.Value)[i].path.split('.')[1] == "png" || JSON.parse(d.Value)[i].path.split('.')[1] == "PNG") {
                fileExtension = "ti-gallery f-28 text-muted";
            }
            $('.appendAttachment').append('<li  style="font-size:larger;" class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + JSON.parse(d.Value)[i]["name"] + '</div><div  style="margin-left: auto;" class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li><hr/>')
        }
    }

}



function LoadtaskKendo() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    KendoGlobalAjax({ commandName: 'TaskList_SelectByProjectID', values: { ProjectID: id }, CallBack: loadTaskData });
}


var loadTaskData = function (d) {
  
    KendoGrid(JSON.parse(d.Value));

}

var KendoGrid = function (_data) {

    var record = 0;

    var colModel = [

        { field: "taskId", title: "TaskId", hidden: true, width: 200 },

        {
            field: "taskTitle", width: 250, title: "Name",
            //template: "<a    title='View member' class='viewbutton' href='/Home/memberDashboard?memberID=#=EmployeeID#' >#=name#</a>"
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "mileStoneID", title: "Milestone", width: 170, filterable: true, hidden: true },
        { field: "projectID", title: "Project", width: 170, filterable: true },
        { field: "assigneeID", title: "Assign To", width: 170, filterable: true },
        { field: "issueTypeId", title: "Issue Type", width: 170, filterable: true },
        { field: "reportedBy", title: "Reported By", width: 170, filterable: true, hidden: true },
        { field: "reportedDate", title: "Reported Date", width: 170, filterable: true },
        { field: "issuePriority", title: "Priority", width: 170, filterable: true },
        { field: "dueDate", title: "Due Date", width: 170, filterable: true },
        //{
        //    field: "", width: 170,
        //    title: "Action",
        //    //  template: " <a style='font-size:20px;color:red;cursor: pointer;' onClick= OpenMembershipPrint(this) title='Print' ><span class='fa fa-print'></span></a>  <a style='font-size:20px;' onClick= EditDetail(this) title='Edit member' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Agent'><span class='icofont icofont-ui-delete'></span></a>"
        //    //template: "<a style='cursor:pointer; font-size:20px;' onClick= EditDetail(this) title='Edit Task' ><span class='icofont icofont-ui-edit'></span></a>  <a style='cursor:pointer;font-size:20px;' onClick= deleteRecordByID('#=taskID#')  title='Delete Employee'><span class='icofont icofont-ui-delete'></span></a><a href=javascript:('##') style='font-size:20px;color:black;' onClick= LoadRecordByID(this)   title='View Details'><i class='icofont icofont-eye-alt' > </i ></a>" 
        //    template: "   <a style='font-size:20px;cursor:pointer;' onClick= EditDetail(this) title='Edit Task' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRecordByID('#=taskId#')  title='Delete Task'><span class='fa fa-trash'></span></a>"
        //}
    ];

    BindkendoGrid($grid, 50, colModel, _data);
};


function LoadRecordByID(e) {
   
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/CLIENTAREA/ClientArea/CATaskDetail?taskID=' + dataItem.taskId + '';
}









function fnLoadImage(e) {

    window.location.href = "/'" + e.src + "'", '_blank';
}

function fnLoadImageByID(e) {

    //  $('#modal-open-project-for-floor-plan-image').addClass('md-show');
    var full_url = e.src;
    var url_array = full_url.split('Temp/'); //Split 
    var imagePath = url_array[url_array.length - 1];

    $('.load-image-by-click').attr('src', '../../Temp/' + imagePath);

}

function fnloadRefferenceAttahcmentsImageInModal(e) {

    $('#modal-open-employee-attachment-images').addClass('md-show');
    var full_url = e.src;
    var url_array = full_url.split('Temp/'); //Split 
    var imagePath = url_array[url_array.length - 1];

    $('.load-image-by-click').attr('src', '../../Temp/' + imagePath);

}
 