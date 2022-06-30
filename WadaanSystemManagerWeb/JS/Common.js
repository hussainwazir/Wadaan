
$(function () {
    if (window.sessionStorage.getItem("userName") == null)
    { window.location.href = '/Login'; }

    $('#userName').html(window.sessionStorage.getItem("userDisplayName"));
       
    $('#btnPassword').on('click', function (e) {
        if (!validateForm("frmPassword")) {
            return false;
        }
        e.preventDefault();
        $("#frmPassword").ajaxForm();
        var options = {
            success: function (response) {
                var data = JSON.parse(JSON.parse(response));
                if (data.result == 1) {
                    $('#error_span').html("Current password is wrong.");
                } else {
                    $('#error_span').html("Password changed successfully.");
                    $('input[type=password]').val('');
                }
            }
        };
        $("#frmPassword").ajaxSubmit(options);
    });

});



var fileUploadSetting = function ($file, $name) {
    $file.on('change', function () {
        if ($file.get(0).files.length > 0) {
            $name.val($file.get(0).files[0].name);
        }
    });
}

var dateFormat = function (_d) {
    if (_d == null) return "";
    var _date = new Date(_d);
    var _day = _date.getDate() + "";
    if (_day.length == 1) { _day = "0" + _day };
    var _month = (_date.getMonth() + 1) + "";
    if (_month.length == 1) { _month = "0" + _month };
    return _day + '/' + _month + '/' + _date.getFullYear();
}


var DatePickerSetting = function ($datepicker) {
    if ($datepicker.length) {
        $datepicker.datepicker({
            enableOnReadonly: true,
            todayHighlight: true,
            autoclose: true,
            format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap'
        });
    }
}

var _minWidth = 0;
var _maxWidth = $(window).width() - 150;
var _clickCount = 0;
var GridResizer = function ($grid,$container) {

    if (_clickCount == 0) {
        _minWidth = $container.width();
    }
    else if (_clickCount == 1) {
        _maxWidth = $container.width();
    }
    _clickCount++;

    if ((_clickCount % 2) != 0)
    { $grid.jqGrid("setGridWidth", _maxWidth, true); }
    else
    { $grid.jqGrid("setGridWidth", _minWidth, true); }
}

var LogOut = function () {
    window.sessionStorage.removeItem("userName");
    window.location.href = '/Login';
}


var ChangePassword = function () {
    $('#error_span').html("");
    $('input[type=password]').val('');
    $('#hdId').val(window.sessionStorage.getItem('userName'));
    $('#PasswordModel').modal('show');
}

var getUrlVars = function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


