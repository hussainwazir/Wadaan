var checkAlreadyLogin = '';

$(function () {
   
    //checkAlreadyLogin = window.localStorage.getItem("roleForLogin");

    //if (checkAlreadyLogin != null) {
    //    fnCheckAlreadyExist();
    //    //window.location.href = '/Employee/Employee/Dashboard';
    //}
    $("#frmLogin").keypress(function (e) {
        if (e.which === 13) {
            $('#btnLogin').click();
        }
    });
    function validateLogin() {

        $('input').removeClass('error');
        var isFalse = false;
        if ($("#username").val() == '') {
            $("#username").addClass('error'); isFalse = true;
        } if ($("#password").val() == '') {
            $("#password").addClass('error'); isFalse = true;
        }
        return isFalse;
    } function validateRegistration() {

        $('input').removeClass('error');
        var isFalse = false;
        if ($("#frmRegister #username").val() == '') {
            alert(isFalse);
            $("#frmRegister #username").addClass('error'); isFalse = true;
        } if ($("#frmRegister #Password").val() == '') {

            $("#frmRegister #Password").addClass('error'); isFalse = true;
        }
        return isFalse;
    }
    $('#btnLogin').on('click', function (e) {
       
        if ($('#username').val() != "" && $('#password').val() != "") {

            $('#username').removeClass('invalid');
            $('#password').removeClass('invalid');

            //if ($("#username").val() == "hr" && $('#password').val() == "hr" || $("#username").val() == "Hr" && $('#password').val() == "Hr" || $("#username").val() == "Hr" && $('#password').val() == "hr" || $("#username").val() == "hr" && $('#password').val() == "Hr") {
          
            $("#frmLogin").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    
                    if (typeof response !== 'undefined') {
                        var data = JSON.parse(response);
                        var d = JSON.parse(data);
                
                        window.localStorage.setItem("roleForLogin", JSON.parse(data)["roleName"]);
                       
                        switch (JSON.parse(data)["roleName"]) {
                            case "admin":
                                SetUserName(d.userID, d.username, d.roleID, d.storeid);
                                window.location.href = '/Employee/Employee/Dashboard';
                                break;
                            case "Client":
                                SetUserName(d.userID, d.username, d.roleID, d.storeid);
                                window.location.href = '/CLIENTAREA/ClientArea/Dashboard';
                               
                                break;
                            case "Manager":
                                SetUserName(d.userID, d.username, d.roleID, d.storeid);
                                //window.location.href = '/PROJECTMANAGERAREA/ProjectManager/Dashboard';
                                window.location.href = '/PROJECTMANAGERAREA/ProjectManager/Dashboard';
                                //window.location.href = '/Home/Login';
                                break;
                            case "CEO":
                                SetUserName(d.userID, d.username, d.roleID, d.storeid);
                                window.location.href = '/CEOAREA/CEO/Dashboard';
                                //window.location.href = '/Home/Login';
                                break;
                            case "User":
                                //SetUserName(d.userID, d.username, d.roleID, d.storeid);
                                //window.location.href = '/Employee/Employee/Dashboard';
                                window.location.href = '/EmployeeArea/EmployeeArea/Dashboard';
                                break;
                            default:
                                window.location.href = '/Home/Login';
                                return true;
                        }


                        SetUserName(d.userID, d.username, d.roleID);
                      
                        if (d.roleName == "admin") {

                            window.location.href = '/Employee/Employee/Dashboard';
                        }  

                        // orignal JSON.parse(data)["username"] == $("#username").val() && JSON.parse(data)["password"] == $('#password').val() && JSON.parse(data)["roleName"] == 'StoreKeeper' ? window.location.href = '/Store/Main' : '/Home/Dashboard';
                        //JSON.parse(data)["username"] == $("#admin").val() && JSON.parse(data)["password"] == $('#admin@admin').val() && JSON.parse(data)["roleName"] == 'ADMIN' ? window.location.href = '/Area/Account/Index' : '/Home/Login';
                        //JSON.parse(data)["username"] == $("#wuser").val() && JSON.parse(data)["password"] == $('#wuser@wuser').val() && JSON.parse(data)["roleName"] == 'WORKSHOP' ? window.location.href = '/Home/Workshop' : '/Home/Login';
                        //JSON.parse(data)["username"] == $("#username").val() && JSON.parse(data)["password"] == $('#password').val() && JSON.parse(data)["title"] == 'Sub Agent' ? window.location.href = '/SubAgent/Dashboard' : '';

                    }
                    else {
                        $("#error_span").text("Invalid user name or password");
                    }
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmLogin").ajaxSubmit(options);


            //--------------------------------------------------Todays work for one more user-----------------------------------------
            //$("#frmLogin").ajaxForm();
            //var options = {
            //    success: function (response, statusText, jqXHR) {
            //        if (typeof response !== 'undefined') {
            //            var data = JSON.parse(response);
            //            var d = JSON.parse(data);
            //            SetUserName(d.userID, d.username, d.roleID);
            //            window.location.href = '/Home/Dashboard';
            //            //JSON.parse(data)["username"] == $("#username").val() && JSON.parse(data)["password"] == $('#password').val() && JSON.parse(data)["title"] == 'Super Admin' ? window.location.href = '/Home/SuperAdminDashboard' : '';
            //            //JSON.parse(data)["username"] == $("#username").val() && JSON.parse(data)["password"] == $('#password').val() && JSON.parse(data)["title"] == 'Agent' ? window.location.href = '/Home/AgentDashboard' : '';
            //            //JSON.parse(data)["username"] == $("#username").val() && JSON.parse(data)["password"] == $('#password').val() && JSON.parse(data)["title"] == 'Sub Agent' ? window.location.href = '/SubAgent/Dashboard' : '';
            //        }
            //        else {
            //            $("#error_span").text("Invalid user name or password");
            //        }
            //    },
            //    error: function (xhr, status, error) {
            //        var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
            //        alert(errmsg);
            //    }
            //};
            //$("#frmLogin").ajaxSubmit(options);
            //--------------------------------------------------Todays works for one more user-----------------------------------------

        } else {
            $('#username').addClass('invalid');
            $('#password').addClass('invalid');


        }
        return false;
    });


    var loadUserCredential = function (d) {

        if (typeof d !== 'undefined') {

            SetUserName(d.userID, d.username, d.roleID, d.storeID);
            window.location.href = '/Home/Dashboard';
        }
        else {
            $("#error_span").text("Invalid user name or password");
        }
    }

   


    $('#Login').on('click', function (e) {
        $('#frmLogin').show(); $('#frmRegister').hide();

    });
    $('#Register').on('click', function (e) {
        $('#frmRegister').show(); $('#frmLogin').hide();

    });

    $('#signup').on('click', function (e) {

        if (!validateRegistration()) {

            $("#frmRegister").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    if (typeof response !== 'undefined') {
                        var data = JSON.parse(response);
                        var d = JSON.parse(data);

                        $("#frmLogin #username").val($("#frmRegister #Password").val());
                        $("#frmLogin #password").val($("#frmRegister #Password").val());
                        $('#frmLogin').show();
                        $('#frmRegister').hide();

                    }
                    else {
                        $("#error_span").text("Invalid user name or password");
                    }
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmRegister").ajaxSubmit(options);
        } else
            return false;
    });





});
//-------------------------- CHECK CREDENTIAL START-------------------------------------------------------------
//var Username = document.getElementById("Username");
//Username.addEventListener("change", CheckUserNameValidations, true);

function CheckUserNameValidations() {

    KendoGlobalAjax({ commandName: 'CheckUserNameValidation', values: $('#Username').val(), CallBack: CheckUserNameValidation });
}

var CheckUserNameValidation = function (d) {


    if (JSON.parse(d.Value) != null) {
        if (this.values == JSON.parse(d.Value)["username"]) {
            $('#Username').val('');
            document.getElementById("Username").placeholder = JSON.parse(d.Value)["username"] + " already exists.Try another...";
            $('#Username').addClass('error');
        } else {
            document.getElementById("Username").placeholder = "Username";
            $('#Username').removeClass('error');
        }
    } else {
        $('#Username').css('border-color', '#d9d9d9');

    }
}

var input = $('input[type=text]');

input.focus(function () {
    $(this).removeClass('error');
});

function fnCheckAlreadyExist() {
    switch (checkAlreadyLogin) {
        case "admin":
            SetUserName(window.localStorage.userId, window.localStorage.userName, window.localStorage.RoleId, null);
            window.location.href = '/Employee/Employee/Dashboard';
            break;
        case "Client":
            SetUserName(window.localStorage.userId, window.localStorage.userName, window.localStorage.RoleId, null);            //window.location.href = '/Employee/Employee/Dashboard';
            break;
        case "Employee":
            SetUserName(window.localStorage.userId, window.localStorage.userName, window.localStorage.RoleId, null);
            //window.location.href = '/Employee/Employee/Dashboard';
            break;
        case "Manager":
            SetUserName(window.localStorage.userId, window.localStorage.userName, window.localStorage.RoleId, null);
            window.location.href = '/PROJECTMANAGERAREA/ProjectManager/Dashboard';
            break;
           
        default:
            window.location.href = '/Home/Login';
    }
}
function SetUserName(userId, username, roleID, storeID) {
    window.localStorage.setItem('multiTabs', 'true');
    window.localStorage.setItem('userId', userId);
    window.localStorage.setItem('userName', username);
    window.localStorage.setItem("RoleId", roleID);
    //window.localStorage.setItem("StoreId", storeID);
}