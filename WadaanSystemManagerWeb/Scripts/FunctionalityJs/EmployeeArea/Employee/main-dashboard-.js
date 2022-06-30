
var userId = "";
var username = "";
var roleID = "";
var dbData = [];
var labelsArr = [];
var dataforChart = [];
var projectTimeLineChartData = [];

$(document).ready(function () {

    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //LoadPermissionAgainstRole();
    LoadMainDashbaordData();

    LoadMainDashboard_ForProject();


    projectselectdashboard();

    taskSelectDashboard();
    LoadProjectsDDL();
    LoadTimeLineChartForAllProjects();
    LoadtaskVersionKendo();
});

function LoadtaskVersionKendo() {
    KendoGlobalAjax({ commandName: 'Task_SelectCountByStatusForEmployee', values: {  }, CallBack: fnLoadTaskAssignsToEmployeeDetail });
}


var fnLoadTaskAssignsToEmployeeDetail = function (d) {
    debugger;
    KendoGridTaskDetail(JSON.parse(d.Value));
}

var KendoGridTaskDetail = function (_data) {
    console.log(_data);
    var record = 0;
    var colModel = [
       
        {
            field: "fullName", width: 120, title: "Full Name ", width:200,
            filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "projectName", title: "ProjectName", width:100},
        { field: "notStartedYet", title: "NotStartedYet", width: 100 },
        { field: "inProgress", title: "InProgress", width: 100},
        { field: "completed", title: "Completed", width: 100 },
        { field: "deffered", title: "Deffered", width: 100 },
        { field: "approved", title: "Approved", width: 100 },
        { field: "rejected", title: "Rejected", width: 100 }
        
        ];

    BindkendoGrid('grid-testing', 50, colModel, _data);
};



function LoadTimeLineChartForAllProjects() {
    KendoGlobalAjax({ commandName: 'MainDashboard_TimeLineChartForAllProject', values: {}, CallBack: fnProjectTimelineChartData });
}

function LoadMainDashbaordData() {

    KendoGlobalAjax({ commandName: 'MainDashboardData', values: { UserID: userId }, CallBack: fnLoadMainDashbaordData });
}

var fnLoadMainDashbaordData = function (d) {
    console.log(d);
    $('#login-user-name').text(' Welcome back ! ' + ' ' + JSON.parse(d.Value)[0].loginUserName);
    $('#total-no-of-employees').text('( ' + JSON.parse(d.Value)[0].totalEmployee + ' )' + ' ' + 'Employees');
    $('#total-no-of-clients').text('( ' + JSON.parse(d.Value)[0].totalClient + ' )' + ' ' + 'Clients');
    $('#total-no-of-contractor').text('( ' + JSON.parse(d.Value)[0].totalContractor + ' )' + ' ' + 'Contractors');
    $('#total-no-of-projects').text('( ' + JSON.parse(d.Value)[0].totalProjects + ' )' + ' ' + 'Total Projects');
    $('#total-no-of-meetings').text('( ' + JSON.parse(d.Value)[0].totalMeeting + ' )' + ' ' + 'Meetings');
    $('#total-no-of-supplier').text('( ' + JSON.parse(d.Value)[0].totalSupplier + ' )' + ' ' + 'Suppliers');
    $('#total-no-of-tasks').text('( ' + JSON.parse(d.Value)[0].totalTasks + ' )' + ' ' + 'Tasks');
    $('#total-no-of-pending-tasks').text('( ' + JSON.parse(d.Value)[0].totalPendingTask + ' )' + ' ' + 'Pending Tasks');
    $('#total-no-of-completed-tasks').text('( ' + JSON.parse(d.Value)[0].totalCompletedTask + ' )' + ' ' + 'Completed Tasks');
    $('#total-no-of-pause-tasks').text('( ' + JSON.parse(d.Value)[0].totalPauseTask + ' )' + ' ' + 'Pause Tasks');
    $('#total-no-of-not-started-tasks').text('( ' + JSON.parse(d.Value)[0].notStarted + ' )' + ' ' + 'Task in Queue ');


    //$('.chartline-dashboard-chart').empty();


    var datasetsForPieChart = [
        JSON.parse(d.Value)[0].totalProjects,
        JSON.parse(d.Value)[0].completedProjects,
        JSON.parse(d.Value)[0].inProgressProjects,
        JSON.parse(d.Value)[0].pauseProjects,
        JSON.parse(d.Value)[0].rejectedProjects,
        JSON.parse(d.Value)[0].overDue]


    var ctx = $("#chart-line");

    // ctx[0].remove();
    var myLineChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Total Projects", "Completed", "InProgress", "Pause", "Rejected", "OverDue"],
            datasets: [{
                //data: [JSON.parse(d.Value)[0].totalProjects,
                //JSON.parse(d.Value)[0].completedProjects,
                //JSON.parse(d.Value)[0].inProgressProjects,
                //JSON.parse(d.Value)[0].pauseProjects,
                //JSON.parse(d.Value)[0].rejectedProjects,
                //    JSON.parse(d.Value)[0].overDue],
                data: datasetsForPieChart,

                backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)", "rgba(200, 50, 255, 0.5)", "rgba(0, 100, 255, 0.5)", "rgba(155, 100, 0, 0.9)", "rgba(0, 100, 0, 0.9)"]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Project Status'
            }
        }
    });
    //for (var y = 0; y < myLineChart.data.datasets[0].data.length; y++) {
    //    myLineChart.data.datasets[0].data[y] = 0;
    //}

    // it will show Task Percentage

    $('#progress-chart-task-completed').text(JSON.parse(d.Value)[0].tCompletedTasks + ' ' + '% ' + ' ' + 'Completed');
    $('#progress-chart-task-InProgress').text(JSON.parse(d.Value)[0].tInProgressTask + '% ' + ' ' + 'In Progress');
    $('#progress-chart-task-Pause').text(JSON.parse(d.Value)[0].tPauseTasks + ' ' + '%  ' + ' ' + 'Pause');
    $('#progress-chart-task-Rejected').text(JSON.parse(d.Value)[0].tRejectedTasks + ' ' + '%  ' + ' ' + 'Rejected');
    $('#progress-chart-task-Queue').text(JSON.parse(d.Value)[0].tNotStartedYet + ' ' + '%  ' + ' ' + 'In Queue');
    $('#progress-chart-task-OverDue').text(JSON.parse(d.Value)[0].tOverDueProject + ' ' + '%  ' + ' ' + 'Over Due');

    // It will show total Tasks

    $('#chart-progress-task-total1').text('(' + ' ' + JSON.parse(d.Value)[0].totalCompletedTask + ' ' + 'of' + '  ' + JSON.parse(d.Value)[0].totalTasks + ' ' + ')');
    $('#chart-progress-task-total2').text('(' + ' ' + JSON.parse(d.Value)[0].totalPendingTask + ' ' + 'of' + '  ' + JSON.parse(d.Value)[0].totalTasks + ' ' + ')');
    $('#chart-progress-task-total3').text('(' + ' ' + JSON.parse(d.Value)[0].totalPauseTask + ' ' + 'of' + '  ' + JSON.parse(d.Value)[0].totalTasks + ' ' + ')');
    $('#chart-progress-task-total4').text('(' + ' ' + JSON.parse(d.Value)[0].totalRejectedTask + ' ' + 'of' + '  ' + JSON.parse(d.Value)[0].totalTasks + ' ' + ')');
    $('#chart-progress-task-total5').text('(' + ' ' + JSON.parse(d.Value)[0].notStarted + ' ' + 'of' + '  ' + JSON.parse(d.Value)[0].totalTasks + ' ' + ')');
    $('#chart-progress-task-total6').text('(' + ' ' + JSON.parse(d.Value)[0].tOverDueProject + ' ' + 'of' + '  ' + JSON.parse(d.Value)[0].totalTasks + ' ' + ')');



    $('.divCompleted').empty();
    $('.divCompleted').append('<div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ' + JSON.parse(d.Value)[0].tCompletedTasks + '%" aria-valuenow="' + JSON.parse(d.Value)[0].tCompletedTasks + '" aria-valuemin="' + JSON.parse(d.Value)[0].tCompletedTasks + '" aria-valuemax="' + JSON.parse(d.Value)[0].tCompletedTasks + '"></div>')

    $('.divInProgress').empty();
    $('.divInProgress').append('<div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: ' + JSON.parse(d.Value)[0].tInProgressTask + '%" aria-valuenow="' + JSON.parse(d.Value)[0].tInProgressTask + '" aria-valuemin="' + JSON.parse(d.Value)[0].tInProgressTask + '" aria-valuemax="' + JSON.parse(d.Value)[0].tInProgressTask + '"></div>')

    $('.divPause').empty();
    $('.divPause').append('<div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ' + JSON.parse(d.Value)[0].tPauseTasks + '%" aria-valuenow="' + JSON.parse(d.Value)[0].tPauseTasks + '" aria-valuemin="' + JSON.parse(d.Value)[0].tPauseTasks + '" aria-valuemax="' + JSON.parse(d.Value)[0].tPauseTasks + '"></div>')

    $('.divRejected').empty();
    $('.divRejected').append('<div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ' + JSON.parse(d.Value)[0].tRejectedTasks + '%" aria-valuenow="' + JSON.parse(d.Value)[0].tRejectedTasks + '" aria-valuemin="' + JSON.parse(d.Value)[0].tRejectedTasks + '" aria-valuemax="' + JSON.parse(d.Value)[0].tRejectedTasks + '"></div>')

    $('.divQueue').empty();
    $('.divQueue').append('<div class="progress-bar progress-bar-striped bg-side" role="progressbar" style="width: ' + JSON.parse(d.Value)[0].tNotStartedYet + '%" aria-valuenow="' + JSON.parse(d.Value)[0].tNotStartedYet + '" aria-valuemin="' + JSON.parse(d.Value)[0].tNotStartedYet + '" aria-valuemax="' + JSON.parse(d.Value)[0].tNotStartedYet + '"></div>')

    $('.divOverDue').empty();
    $('.divOverDue').append('<div class="progress-bar progress-bar-striped bg-cyan" role="progressbar" style="width: ' + JSON.parse(d.Value)[0].tOverDueProject + '%" aria-valuenow="' + JSON.parse(d.Value)[0].tOverDueProject + '" aria-valuemin="' + JSON.parse(d.Value)[0].tOverDueProject + '" aria-valuemax="' + JSON.parse(d.Value)[0].tOverDueProject + '"></div>')






    $('#dashboard-donut-chart').empty();

    if (window.areaChart != undefined) {

        for (var z = 0; z < window.areaChart.data.length; z++) {
            window.areaChart.data[z].value = 0;
            window.areaChart.values[z] = 0;
        }




}
    window.areaChart = Morris.Donut({
        element: 'dashboard-donut-chart',
        redraw: true,

        data: [
            {
                label: "In Progress", value: JSON.parse(d.Value)[0].tProjectInProgress
            },
            { label: "Completed", value: JSON.parse(d.Value)[0].tProjectCompleted },
            { label: "Rejected", value: JSON.parse(d.Value)[0].tProjectRejected },
            { label: "Pause", value: JSON.parse(d.Value)[0].tPauseProject },
            { label: "Over Due", value: JSON.parse(d.Value)[0].tOverDueProject },
            { label: "Not Started Yet", value: JSON.parse(d.Value)[0].nStartedProject },
        ],
        //data: dbData,
        colors: ['#34495e', '#2ecc71', '#e74c3c', '#9E5B15', '#0E517C']
    });



}






function LoadPermissionAgainstRole() {

    KendoGlobalAjax({ commandName: 'Permissions_SelectRoleBase', values: { RoleID: roleID }, CallBack: fnLoadPermissionAgainstRole });
}
var fnLoadPermissionAgainstRole = function (d) {

    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

        if (JSON.parse(d.Value)[i].moduleName == "Employee" && JSON.parse(d.Value)[i].formName == "List Employee" && JSON.parse(d.Value)[i].isRead == true) {
            $('#main-layout-employee-menu').show();
        }
        if (JSON.parse(d.Value)[i].moduleName == "Project" && JSON.parse(d.Value)[i].formName == "Project Detail" && JSON.parse(d.Value)[i].isRead == true) {

            localStorage.setItem('IsReadProjectDetail', true);
        }
        //if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "List Task" && JSON.parse(d.Value)[i].isRead == true) {
        //    $('#Task-Menu').show();
        //}
        //if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "Task Detail" && JSON.parse(d.Value)[i].isRead == true) {
        //    IsReadTaskDetail = true;
        //    localStorage.setItem('IsReadTaskDetail', true);
        //}
    }
}

function LoadMainDashboard_ForProject() {

    KendoGlobalAjax({ commandName: 'MainDashboard_ForProject', values: {}, CallBack: fnLoadMainDashbaordDataForChart });
    //KendoGlobalAjax({ commandName: 'MainDashboard_ProjectTimelineChartData', values: {}, CallBack: fnProjectTimelineChartData });
}

//var fnProjectTimelineChartData = function (d) {
    
//    projectTimeLineChartData = []; 
//    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

//        projectTimeLineChartData.push([JSON.parse(d.Value)[i].projectName, JSON.parse(d.Value)[i].taskName, new Date(JSON.parse(d.Value)[i].reportedDate), new Date(JSON.parse(d.Value)[i].dueDate)]);
        
//    }
//    drawChart3_1();
//}
var fnLoadMainDashbaordDataForChart = function (d) {

    labelsArr = [];
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

        labelsArr.push({ Label: JSON.parse(d.Value)[i].year });
        dataforChart.push({
            data: JSON.parse(d.Value)[i].inProgress,
            label: JSON.parse(d.Value)[i].inProgress,
            borderColor: '#D43817',
            backgroundColor: '#D43817',
            fill: false,
        }, {
                data: JSON.parse(d.Value)[i].completed,
                label: JSON.parse(d.Value)[i].completed,
                borderColor: '#17D4A3',
                backgroundColor: '#17D4A3',
                fill: false,
            }, {
                data: JSON.parse(d.Value)[i].pause,
                label: JSON.parse(d.Value)[i].pause,
                borderColor: '#4985EF',
                backgroundColor: '#4985EF',
                fill: false,
            }, {
                data: JSON.parse(d.Value)[i].rejected,
                label: JSON.parse(d.Value)[i].rejected,
                borderColor: '#F12355',
                backgroundColor: '#F12355',
                fill: false,
            });
        //**************************************** START ******************************************************

        //data: {
        //    labels: [2019],
        //        datasets: [{
        //            data: [86],
        //            label: "Completed",
        //            borderColor: "#458af7",
        //            backgroundColor: '#458af7',
        //            fill: false
        //        }, {
        //            data: [282],
        //            label: "InProgress",
        //            borderColor: "#8e5ea2",
        //            fill: true,
        //            backgroundColor: '#8e5ea2'
        //        },
        //        {
        //            data: [282],
        //            label: "Pause",
        //            borderColor: "#E72D21",
        //            fill: true,
        //            backgroundColor: '#E72D21'
        //        }, {
        //            data: [168],
        //            label: "Rejected",
        //            borderColor: "#3cba9f",
        //            fill: false,
        //            backgroundColor: '#3cba9f'
        //        }]
        //},

        //**************************************** END ******************************************************



    }

}
function projectselectdashboard() {

    KendoGlobalAjax({ commandName: 'Project_Select_For_Dashboard', values: {}, CallBack: loadprojectsdashboarddata });

}

var loadprojectsdashboarddata = function (d) {

    datatablereceiveddatagrid(JSON.parse(d.Value));
}

var datatablereceiveddatagrid = function (_data) {

    $("#project-Dashboard-Record-List").empty();
    $.each(_data, function (index, value) {

        var projectText = '', projectOverDueStatus = '';

        if (value.projectStatus == "Completed") {

            projectText = '<label class="label label-success">' + value.projectStatus + '</label>';
        }
        if (value.projectStatus == "Pause") {

            projectText = '<label class="label label-warning">' + value.projectStatus + '</label>';
        }
        else if (value.projectStatus == "Rejected") {
            projectText = '<label class="label label-danger">' + value.projectStatus + '</label>';

        }

        else if (value.projectStatus == "InProgress") {
            projectText = '<label class="label label-info">' + value.projectStatus + '</label>';

        } else if (value.projectStatus == "OverDue") {
            projectText = '<blink><label class="label btn-dark">' + value.projectStatus + '</label></blink>';

        }


        if (value.projectDateStatus == "OverDue") {

            projectOverDueStatus = '<blink><label class="label btn-dark">' + value.projectDateStatus + '</label></blink>';

        } else {
            projectOverDueStatus = '<label class="label label-success">' + value.projectDateStatus + '</label>';

        }

        $("#project-Dashboard-Record-List").append('<tr style="background: #90ee904d;">   <td style="text-align: left; " >' + value.projectName + '</td> <td style="text-align: left;">' + value.projectCategory + '</td> <td style="text-align: left; color: black;" class="projectstatus">' + projectText + '</td><td style="text-align: left; color: red; font-weight: bold;" class="createddate">' + value.createdDate + '</td><td style="text-align: left;" class="projectdatestatus">' + projectOverDueStatus + '</td>  </tr>');
        //<td style="text-align: left;"><i class="ti-check-box" style="font-size: xx-large;color:green"></i></td>


    });

};


function taskSelectDashboard() {

    KendoGlobalAjax({ commandName: 'Task_Select_from_Dashbaord', values: {}, CallBack: loadTaskDashboardData });
}

var loadTaskDashboardData = function (d) {

    DataTableReceivedDataGridd(JSON.parse(d.Value));
}

var DataTableReceivedDataGridd = function (_data) {
    $("#Today-Customer-Order-List").empty();

    $.each(_data, function (index, value) {

        var text = '';

        if (value.issueStatusID == "Completed") {

            text = '<label class="label label-success">' + value.issueStatusID + '</label>';
        }
        if (value.issueStatusID == "Pause") {

            text = '<label class="label label-warning">' + value.issueStatusID + '</label>';
        }
        else if (value.issueStatusID == "Rejected") {

            text = '<label class="label label-danger">' + value.issueStatusID + '</label>';
        }

        else if (value.issueStatusID == "InProgress") {

            text = '<label class="label label-info">' + value.issueStatusID + '</label>';

        } else if (value.issueStatusID == "OverDue") {

            text = '<blink><label class="label btn-dark">' + value.issueStatusID + '</label></blink>';

        }

        $("#Today-Customer-Order-List").append('<tr style="background: #90ee904d;">   <td style="text-align: left; " >' + value.taskTitle + '</td> <td style="text-align: left; color: green; font-weight: bold;">' + value.reportedDate + '</td><td style="text-align: left; color: red; font-weight: bold;" class="dueDate">' + value.dueDate + '</td> <td style="text-align: left;" class="totalEstimation">' + value.totalEstimatedTime + '</td>  <td style="text-align: left; color: Black;" class="reportedDate">' + text + '</td>  </tr>');
        //<td style="text-align: left;"><i class="ti-check-box" style="font-size: xx-large;color:green"></i></td>  <td style="text-align: left;" class="totalEstimation">' + value.totalEstimatedTime + '</td>


    });

};




//***************************** DDL AJAX WORK START *********************************************
function LoadProjectsDDL() {
    KendoGlobalAjax({ commandName: 'Project_SelectDDL', values: '{}', CallBack: fnLoadProjects });
}
var fnLoadProjects = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProjectID"), "Select Project");
}
//***************************** DDL AJAX WORK END  *********************************************
//***************************** LOAD DATA BY PROJECT ID START  *********************************************
function fnLoadDataByProjectID(e) {
    if (e.value == '00000000-0000-0000-0000-000000000000') {
        location.reload();
    } else {


        KendoGlobalAjax({ commandName: 'MainDashboardData_ByProjectID', values: { UserID: userId, ProjectID: e.value }, CallBack: fnLoadMainDashbaordData });
        KendoGlobalAjax({ commandName: 'MainDashboard_ForProject_ByProjectID', values: { UserID: userId, ProjectID: e.value }, CallBack: fnLoadMainDashbaordDataForChart });


        KendoGlobalAjax({ commandName: 'Project_Select_For_Dashboard_ByProjectID', values: { UserID: userId, ProjectID: e.value }, CallBack: loadprojectsdashboarddata });
        KendoGlobalAjax({ commandName: 'Task_Select_For_Dashboard_ByProjectID', values: { UserID: userId, ProjectID: e.value }, CallBack: loadTaskDashboardData });

        KendoGlobalAjax({ commandName: 'Calender_Select_For_Dashboard_ByProjectID', values: { UserID: userId, ProjectID: e.value }, CallBack: fnLoadTaskListNames });
        KendoGlobalAjax({ commandName: 'MainDashboard_ProjectTimelineChartDataByProjectID', values: { ProjectID: e.value }, CallBack: fnProjectTimelineChartData });
    }


    LoadMainDashbaordData();

}


//***************************** GANTT Chart Status Start *******************************************


google.charts.load('current', { 'packages': ['gantt'] });
google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    data.addRows([
        ['Research', 'Find sources',
            new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
        ['Write', 'Write paper',
            null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
        ['Cite', 'Create bibliography',
            null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
        ['Complete', 'Hand in paper',
            null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
        ['Outline', 'Outline paper',
            null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
    ]);

    var options = {
        height: 275
    };

    var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

    chart.draw(data, options);
}


//***************************** GANTT Chart Status END *********************************************


google.charts.load("current", {
    packages: ["timeline"]
});
 
 google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    drawChart3_1();
    drawChart4_2();
};

function drawChart3_1() {
 
    var checkdataFromProjectTimeLineArray = projectTimeLineChartData;
     
    if (checkdataFromProjectTimeLineArray.length > 0) {


    }
    var container = document.getElementById('example3.1');

 
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({
        type: 'string',
        id: 'Position'
    });
    dataTable.addColumn({
        type: 'string',
        id: 'Name'
    });
    dataTable.addColumn({
        type: 'date',
        id: 'Start'
    });
    dataTable.addColumn({
        type: 'date',
        id: 'End',
        
    }); 
    dataTable.addRows(projectTimeLineChartData);
    console.log(dataTable);
   // dataTable.addRows([["a", "ABC Construction", new Date(2021, 07, 01), new Date(2021, 07, 03)]]);

    //dataTable.addRows([
    //    ['A',  'Task 1', new Date(2019, 3, 30), new Date(2021, 3, 30)],
    //    ['A', 'FFEF', new Date(2019, 2, 4), new Date(2020, 2, 4)],
    //    //['A', 'FEFEF', new Date(2019, 2, 4), new Date(2020, 2, 4)],
    //    //['Vice President', 'John Adams', new Date(2019, 3, 21), new Date(2020, 2, 4)],
    //    //['Vice President', 'Thomas Jefferson', new Date(2019, 2, 4), new Date(2020, 2, 4)],
    //    //['Vice President', 'Aaron Burr', new Date(2019, 2, 4), new Date(2020, 2, 4)],
    //    //['Vice President', 'George Clinton', new Date(2019, 2, 4), new Date(2020, 3, 20)],
    //    //['Secretary of State', 'John Jay', new Date(2019, 8, 25), new Date(2020, 2, 22)],
    //    //['Secretary of State', 'Thomas Jefferson', new Date(2019, 2, 22), new Date(2020, 11, 31)],
    //    //['Secretary of State', 'Edmund Randolph', new Date(2019, 0, 2), new Date(2020, 7, 20)],
    //    //['Secretary of State', 'Timothy Pickering', new Date(2019, 7, 20), new Date(2020, 4, 12)],
    //    //['Secretary of State', 'Charles Lee', new Date(2019, 4, 13), new Date(2020, 5, 5)],
    //    //['Secretary of State', 'John Marshall', new Date(2019, 5, 13), new Date(2020, 2, 4)],
    //    //['Secretary of State', 'Levi Lincoln', new Date(2019, 2, 5), new Date(2020, 4, 1)],
    //    //['Secretary of State', 'James Madison', new Date(2019, 4, 2), new Date(2020, 2, 3)]
    //]);

    chart.draw(dataTable);
};

function drawChart4_2() {
    var container = document.getElementById('example4.2');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({
        type: 'string',
        id: 'Role'
    });
    dataTable.addColumn({
        type: 'string',
        id: 'Name'
    });
    dataTable.addColumn({
        type: 'date',
        id: 'Start'
    });
    dataTable.addColumn({
        type: 'date',
        id: 'End'
    });
    dataTable.addRows([
        ['President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
        ['President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
        ['President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)]
    ]);

    var options = {
        enableInteractivity: false,
        timeline: {
            enableInteractivity: false,
            groupByRowLabel: true
        }
    };

    chart.draw(dataTable, options);
};


//***************************** LOAD DATA BY PROJECT ID END  *********************************************

/*

var ctx = $("#chart-bar");
var Chart;
var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        // labels: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
        labels: labelsArr.Label,
        datasets: dataforChart
    },
    options: {
        title: {
            display: true,
            text: 'Projects Status wise details'
        }
    }
    //  data: dataforChart,
    //data: {

    //    labels: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
    //    datasets: [{
    //        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
    //        label: "Completed",
    //        borderColor: "#458af7",
    //        backgroundColor: '#458af7',
    //        fill: false
    //    }, {
    //        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
    //        label: "InProgress",
    //        borderColor: "#8e5ea2",
    //        fill: true,
    //        backgroundColor: '#8e5ea2'
    //    },
    //    {
    //        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
    //        label: "Pause",
    //        borderColor: "#E72D21",
    //        fill: true,
    //        backgroundColor: '#E72D21'
    //    }, {
    //        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
    //        label: "Rejected",
    //        borderColor: "#3cba9f",
    //        fill: false,
    //        backgroundColor: '#3cba9f'
    //    }]
    //},

});


*/
/*
var ctx = document.getElementById("myChart4").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        // labels: ["<  1","1 - 2","3 - 4","5 - 9","10 - 14","15 - 19","20 - 24","25 - 29","> - 29"],
        datasets: [{
            label: 'Employee',
            backgroundColor: "#caf270",
            data: [12, 59, 5, 56, 58],
        },
        {
            label: 'Engineer',
            backgroundColor: "#45c490",
            data: [12, 59, 5, 56, 58, 12],
        },
        {
            label: 'Government',
            backgroundColor: "#008d93",
            data: [12, 59, 5, 56, 58, 12],
        },
        {
            label: 'Political parties',
            backgroundColor: "#2e5468",
            data: [12, 59, 5, 56, 58, 12],
        }],
    },

    options: {
        tooltips: {
            displayColors: true,
            callbacks: {
                mode: 'x',
            },
        },
        scales: {
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
                type: 'linear',
            }]
        },

        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'bottom' },
    }
});

 
 */