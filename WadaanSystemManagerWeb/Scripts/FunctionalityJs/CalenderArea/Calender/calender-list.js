
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    LoadTaskList();
    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);


  
});

function LoadTaskList() {
    KendoGlobalAjax({ commandName: 'Calender_Select', values: {}, CallBack: fnLoadTaskListNames });
}
var fnLoadTaskListNames = function (d) {
  
    var dbevents = [];
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
 
        dbevents.push({
            id: JSON.parse(d.Value)[i].taskId,
            title: JSON.parse(d.Value)[i].taskTitle,
            start: JSON.parse(d.Value)[i].reportedDate,
            end: JSON.parse(d.Value)[i].dueDate,
           //  overlap: false,
           //  rendering: "background",
             color: '#d' + i * 9 + 'd'+i*4+'d6',
            constraint: 'businessHours'
        });
    }
   
 
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
        },
        defaultDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
         editable: true,
        //  droppable: true, // this allows things to be dropped onto the calendar

        //drop: function () {
        //
        //    // is the "remove after drop" checkbox checked?
        //    if ($('#checkbox2').is(':checked')) {
        //        // if so, remove the element from the "Draggable Events" list
        //        $(this).remove();
        //    }
        //},
      events: dbevents
       
        , eventClick: function (info) {
           
           
            LoadTaskDetails(info.id);
            window.localStorage.setItem("id", info.id);
           $('#FkTypeID').val(info.id);
          $('#task-detail-modal').modal('show');
           
           
        }
    });
   
    
}

 