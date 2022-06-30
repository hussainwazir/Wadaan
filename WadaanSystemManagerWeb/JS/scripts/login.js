
$(function () {
    $("#frmLogin").keypress(function (e) {
        if (e.which == 13) {
            $('#btnLogin').click();
        }
    });

    $('#btnLogin').on('click', function (e) {
        window.sessionStorage.setItem('barcode', '123450');

        if (!validateForm("frmLogin")) {
            return false;
        }
       
        $("#frmLogin").ajaxForm();
        var options = {
            success: function (response,statusText,jqXHR) {
                //var data = JSON.parse(JSON.parse(response));
                if (typeof response != 'undefined') {
                    var data = JSON.parse(response);
                    data = JSON.parse(data);
                    window.sessionStorage.setItem('userName', data.userName);
                    window.sessionStorage.setItem('userId', data.id);
                    window.sessionStorage.setItem('employeeNo', data.employeeNo);
                    window.sessionStorage.setItem("userDisplayName", data.name);
                    window.sessionStorage.setItem("RoleId", data.roleId);
                    if (data.roleId === 1) {
                      
                        
                        window.location.href = '/Home';
                    }
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
    });
});
