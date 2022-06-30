
var userId = "";
var username = "";
var roleID = "";
var $grid = "load-status-wise-tasks";
var $gridOverDueTasks = "overdue-tasks-of-project-grid";
$(document).ready(function () {
    
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    LoadProjectDataDetail();

});

$('#btn-update-status-and-progress').click(function () {

    if ($('#ProjectStatus').val() == '0') {
        Swal.fire({ icon: 'error', text: 'Select status first...', showConfirmButton: true, timer: 1500 });
        return;
    }
    if ($('#ProjectProgress').val() == '0') {
        Swal.fire({ icon: 'error', text: 'Plz select progress ...', showConfirmButton: true, timer: 1500 });
        return;
    }
   
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    var Status = $('#ProjectStatus').val();
    var Progress = $('#ProjectProgress').val();

    KendoGlobalAjax({ commandName: 'ProjectStatusAndProgress_Update', values: { ProjectID: id,ProjectStatus : Status,ProjectProgress : Progress }, CallBack: '' });
    Swal.fire({ icon: 'success', text: 'Updated successfully...', showConfirmButton: false, timer: 1500 });
})



function LoadProjectDataDetail() {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    // EmployeeLeavesByID(id);
    KendoGlobalAjax({ commandName: 'Project_SelectDetailByID', values: { ProjectID: id }, CallBack: LoadProjectDataDetailsByID });
    KendoGlobalAjax({ commandName: 'Project_SelectProjectDocument', values: { Id: id }, CallBack: loadProjectAttachementByProjectID });


}

var loadProjectAttachementByProjectID = function (d) {
 
    var fileExtension = "";

    $('.appendAttachment').empty();

    if (JSON.parse(d.Value).length == 0) {
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



    if (JSON.parse(d.Value).length > 0) {

        $('#tbl-items-tbody-project-gallery').empty('');
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            $("#tbl-items-tbody-project-gallery").append('<tr style="background: #e9ecef;"> '

                + '<td style="text-align: left;" class=""><a  target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i].path + '"> <img class="img-circle" src="../../Temp/' + JSON.parse(d.Value)[i].path + '" style="width:28%" /></a></td>'
                + '<td style="text-align: left;" class=""> <input type="hidden" readonly="" class="form-control pname ImageID"   id="ImageID" value="' + JSON.parse(d.Value)[i].imageID + '">' + JSON.parse(d.Value)[i].name + '</td>'
                + '</td><td><input  style="font-size: x-large;" accept="image/*" onChange="processFile(this)"  class="form-control pname ProjectAttachements' + [i] + '" name="' + JSON.parse(d.Value)[i].imageID + '" type="file" id="upload-photo" /></td> </tr>');

        };
    }


}

function processFile(imageInput) {

    if (imageInput.files[0]) {
        const file = imageInput.files[0];
        var pattern = /image-*/;

        if (!file.type.match(pattern)) {
            $(imageInput).val('');
            swal.fire({
                text: 'Invalid Format,Only images allowed...!',

                icon: 'error',

                confirmButtonColor: '#5cb85c',
                cancelButtonColor: '#d9534f',
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-warning",
                        closeModal: true
                    }
                }
            });
            return;
        }

    }
}

$('#btn-redirect-to-task').click(function () {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    window.localStorage.setItem("ProjectID", id);
    window.location.href = '/Task/Task/Save';
})
 
var LoadProjectDataDetailsByID = function (d) {
   
    setTimeout(function () {
        
        //$('.emirateID').text(JSON.parse(d.Value)[0]["employeeID"]);
        $('.project').text(JSON.parse(d.Value)[0]["projectName"]);
        $('.priority').text(JSON.parse(d.Value)[0]["priority"]);
        $('.contractType').text(JSON.parse(d.Value)[0]["contractType"]);
        $('.ResidentialPlotSize').text(JSON.parse(d.Value)[0]["residentialPlotSize"]);
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

        $('#ProjectStatus').val(JSON.parse(d.Value)[0]["projectStatus"]);
        $('#select2-ProjectStatus-container').text($('#ProjectStatus :selected').text());
        
        $('#ProjectProgress').val(JSON.parse(d.Value)[0]["projectProgress"]);
        $('#select2-ProjectProgress-container').text($('#ProjectProgress :selected').text());

        $('.contractorName').text(JSON.parse(d.Value)[0]['contractorName']);
        $('.contractorPhone').text(JSON.parse(d.Value)[0]['contractorPhone']);

    }, 50);
}



function LoadStatusWiseTasksAgainstProject() {
     
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    setTimeout(function () {
        KendoGlobalAjax({ commandName: 'Task_SelectStatusWiseAgainstProject', values: { ProjectID: id, SelectedStatus: $('#task-status').val() }, CallBack: fnLoadStatusWiseTasksAgainstProject });
    }, 100);
}
var fnLoadStatusWiseTasksAgainstProject = function (d) {
  
    KendoGrid(JSON.parse(d.Value));
}
var KendoGrid = function (_data) {
    
   
    var record = 0;
    var colModel = [
        { field: "projectID", title: "ProjectID", hidden: true, },
        { field: "taskId", title: "TaskId", hidden: true, },
        {
            field: "taskTitle", title: "Task",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;'  onClick= LoadRecordByTaskID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: false
        },
        {

            field: "projectName", title: "Project",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByProjectID(this)   title='Show Details'>#=projectName#</a> ",
            filterable: false

        },

        { field: "issueStatusID", title: "Status", filterable: false },
        { field: "assigneeID", title: "Employee", filterable: false, hidden: true },
        //{
        //    width: 170,
        //    title: "Action",
        //    // attributes: { "class": "cellGreen" },
        //    //template: "   <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Stop Timer'><span class='fas fa-hand-paper'></span></a>"

        //    //template: "# if (issueStatusID == 'NotStartedYet' ) {# <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a>  #}  else if (issueStatusID == 'InProgress' ) {#  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Pause Timer'><span class='fas fa-hand-paper'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= TaskCompleted(this)  title='Completed'><span class='far fa-check-circle'></span></a> #}    else if (issueStatusID == 'Pause' ) {# <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= TaskCompleted(this)  title='Completed'><span class='far fa-check-circle'></span></a>  #}  else if (issueStatusID == 'Completed' ) {# <span class='fa fa-check'></span> #}  else if (issueStatusID == 'Approved' ) {# <span class='fa fa-check'></span> #} else if (issueStatusID == 'Underreview' ) {#  #} else if (issueStatusID == 'Accepted' ) {#  #}  else if (issueStatusID == 'Rejected' ) {# <span class='fa fa-times'></span> #}   else if (issueStatusID == 'InProgress' ) {#  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Stop Timer'><span class='fas fa-hand-paper'></span></a> #}  else   { # <a style='font-size:20px;cursor:pointer;' onClick= StartTimer(this) title='Start Timer' ><span class='fa fa-clock'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= StopTimer(this)  title='Stop Timer'><span class='fas fa-hand-paper'></span></a># }  # "



        //}
    ];
    BindkendoGrid($grid, 50, colModel, _data);
};




// Load All OverDue Tasks of This Project



$('#overdue-tasks').on('click', function () {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    setTimeout(function () {
        KendoGlobalAjax({ commandName: 'Task_OverDueOfSelectedProject', values: { ProjectID: id }, CallBack: fnLoadOverDueTasksOfSelectedProject });
    }, 100);
});
 
var fnLoadOverDueTasksOfSelectedProject = function (d) {

    KendoGridOverDueTasks(JSON.parse(d.Value));
}
var KendoGridOverDueTasks = function (_data) {


    var record = 0;
    var colModel = [
        { field: "projectID", title: "ProjectID", hidden: true, },
        { field: "taskId", title: "TaskId", hidden: true, },
        {
            field: "taskTitle", title: "Task",
            template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;'  onClick= LoadRecordOfOverDueTasksByTaskID(this)  title='Show Details'>#=taskTitle#</a> ",
            filterable: false
        },
        {
            field: "projectName", title: "Project",
            //template: "<a  class='viewbutton' style='font-size:15px;cursor:pointer;' onClick= LoadRecordByProjectID(this)   title='Show Details'>#=projectName#</a> ",
            filterable: false
        },
        { field: "issueStatusID", title: "Status", filterable: false },
        { field: "assigneeID", title: "Employee", filterable: false, hidden: true },
    ];
    BindkendoGrid($gridOverDueTasks, 50, colModel, _data);
};


$('#task-list').on('click', function () {
    
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('='); //Split 
    id = url_array[url_array.length - 1];//Get ID
    setTimeout(function () {
        KendoGlobalAjax({ commandName: 'Task_SelectStatusWiseAgainstProject', values: { ProjectID: id, SelectedStatus: 'All' }, CallBack: fnLoadStatusWiseTasksAgainstProject });
    }, 100);

});

function LoadRecordByTaskID(e) {
    
    var row = $(e).closest('tr');
    var grid = $('#' + $grid).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    window.open('/Task/Task/TaskDetail?taskID=' + dataItem.taskId + '', '_blank');
}

function LoadRecordOfOverDueTasksByTaskID(e) {
   
    var row = $(e).closest('tr');
    var grid = $('#' + $gridOverDueTasks).data('kendoGrid');
    var dataItem = grid.dataItem(row);
    window.open('/Task/Task/TaskDetail?taskID=' + dataItem.taskId + '', '_blank');
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


//********************************** IMAGE UPDATE WORK ******************************************************************
$('#btn-update-images').on('click', function (e) {


    //Button Loader
    var btn = document.getElementById('btn-update-images');
    btn.disabled = true;
    btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';

    $("#frmProjectGallery").ajaxForm();
    var options = {
        success: function (response, statusText, jqXHR) {
            Swal.fire({
                icon: 'success',
                title: 'Record saved successfully...',
                showConfirmButton: false,
                timer: 1500
            });
            KendoGlobalAjax({ commandName: 'Project_SelectProjectDocument', values: { Id: id }, CallBack: loadProjectAttachementByProjectID });
            btn.disabled = false;
            btn.innerHTML = '<i class = "fa fa-save fa-save"></i> Save';

        },
        error: function (xhr, status, error) {
            var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
            alert(errmsg);
        }
    };
    $("#frmProjectGallery").ajaxSubmit(options);



});

//********************************** IMAGE UPDATE WORK END******************************************************************





//********************************** IMAGE UPDATE WORK END******************************************************************




function fnHideotherTab(e) {


    if (e.id == "project-gallery") {
        $('#ProjectDocument').hide();
        $('#ProjectGallery').show();
    } else {
        $('#ProjectGallery').hide();
        $('#ProjectDocument').show();
    }
}