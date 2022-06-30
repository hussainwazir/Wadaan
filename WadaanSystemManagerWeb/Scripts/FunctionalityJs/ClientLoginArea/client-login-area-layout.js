
var userId = "";
var username = "";
var roleID = "";
 
localStorage.setItem('IsReadTaskDetail', false);
localStorage.setItem('IsReadProjectDetail', false);
var $grid = "load-tasks-of-current-day-grid";

$(document).ready(function () {
  
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");
    $('#Project-Menu').show();
    $('#Task-Menu').show();

    LoadPermissionAgainstRole();

});




function LoadPermissionAgainstRole() {

    KendoGlobalAjax({ commandName: 'Permissions_SelectRoleBase', values: { RoleID: roleID }, CallBack: fnLoadPermissionAgainstRole });
}
var fnLoadPermissionAgainstRole = function (d) {
  
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
       
        if (JSON.parse(d.Value)[i].moduleName == "Project" && JSON.parse(d.Value)[i].formName == "List Project" && JSON.parse(d.Value)[i].isRead == true) {
            $('#Project-Menu').show();
        }
        if (JSON.parse(d.Value)[i].moduleName == "Project" && JSON.parse(d.Value)[i].formName == "Project Detail" && JSON.parse(d.Value)[i].isRead == true) {
           
            localStorage.setItem('IsReadProjectDetail', true);
        }
        if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "List Task" && JSON.parse(d.Value)[i].isRead == true) {
            $('#Task-Menu').show();
        } 
        if (JSON.parse(d.Value)[i].moduleName == "Task" && JSON.parse(d.Value)[i].formName == "Task Detail" && JSON.parse(d.Value)[i].isRead == true) {
            IsReadTaskDetail = true;
            localStorage.setItem('IsReadTaskDetail', true);
        } 
    }
   


}




