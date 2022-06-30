var importJS = function (_file) {
    document.write('<script type="text/javascript" charset="UTF-8" src="' + _file + '"></script>');
}

importJS("../../themes/vendors/js/vendor.bundle.base.js");

var importStyle = function (_file) {
    $('head').append('<link type="text/css" rel="stylesheet" href="' + _file + '" />');
}

var themes = function () {
    importStyle("../../themes/vendors/mdi/css/materialdesignicons.min.css");
    importStyle("../../themes/vendors/css/vendor.bundle.base.css");
    importStyle("../../themes/css/style.css");

   // importJS("../../themes/vendors/js/vendor.bundle.base.js");
    importJS("../../themes/vendors/chart.js/Chart.min.js");
    importJS("../../themes/vendors/progressbar.js/progressbar.min.js");
    importJS("../../themes/js/off-canvas.js");
    importJS("../../themes/js/hoverable-collapse.js");
    importJS("../../themes/js/settings.js");
    importJS("../../themes/js/todolist.js");
    importJS("../../themes/js/dashboard.js");
}

var Dashboard = function () {
    //importJS("../../themes/js/off-canvas.js");
    //importJS("../../themes/js/hoverable-collapse.js");
    //importJS("../../themes/js/settings.js");
    //importJS("../../themes/js/todolist.js");
    //importJS("../../themes/js/dashboard.js");
}

var BootstrapFiles = function () {
    importStyle("../../themes/vendors/bootstrap/dist/css/bootstrap.css");
    importJS("../../themes/vendors/bootstrap/dist/js/bootstrap.js");
}

var Charts = function () {
    importJS("../../themes/vendors/chart.js/Chart.min.js");
}


var DataPicker = function () {
    importStyle("../../themes/vendors/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css");
    importStyle("../../themes/vendors/bootstrap-daterangepicker/daterangepicker.css");
    importJS("../../themes/vendors/moment/min/moment.min.js");
    importJS("../../themes/vendors/bootstrap-daterangepicker/daterangepicker.js");
    importJS("../../themes/vendors/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js");
}


var FontAwesome5 = function () {
    importStyle("../../FontAwesome5/css/all.min.css");
    importStyle("../../FontAwesome5/css/fontawesome.min.css");
    importStyle("../../FontAwesome5/css/v4-shims.min.css");
    importJS("../../FontAwesome5/js/v4-shims.min.js");
}

var jQueryConfirm = function () {
    importStyle("../../Content/css/jquery-confirm.css");
    importJS("../../Content/js/jquery-confirm.js");
}

var jqGridGuriddo = function () {
    importStyle("../../Content/free-jqgrid/css/ui.jqgrid-bootstrap4.css");
    importStyle("../../Content/free-jqgrid/css/jqgrid.xtreme.css");
    importJS("../../Content/free-jqgrid/dist/jquery.jqGrid.min.js");
    importJS("../../Content/free-jqgrid/js/jszip.min.js");
    importJS("../../Content/free-jqgrid/js/jqGridExporter.js");
}


var AjaxForm = function () {
    importJS("../../JS/jquery.form.min.js");
}

var Select2Dropdown = function () {
    importStyle("../../themes/vendors/select2/select2.min.css");
    importJS("../../themes/vendors/select2/select2.min.js");
}


var ImportCommon = function () {
    importJS("../../JS/Common.js");
}
var BindCombo = function (data, $combo) {
    var $list = "";
    $combo.empty();
    $combo.append($('<option />'));
    $.map(data, function (item) {
        $combo.append($('<option />').val(item.id).text(item.name));
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}
var GridFilterList = function (data) {
    var $list = "";
    $.map(data, function (item) {
        $list += ";" + item.name + ":" + item.name;
    });
    return $list;
}
var BindGurrido = function ($grid, $pager, $colNames, $colModel, $data) {
    $grid.jqGrid({
        data: $data,
        datatype: "local",
        contentType: "application/json; charset-utf-8",
        colNames: $colNames,
        colModel: $colModel,
        rownumbers: true,
        pager: $pager,
        rowNum: 15,
        rownumWidth: 50,
        rowList: [20, 30, 40, 50],
        height: '100%',
        viewrecords: true,
        loadonce: true,
        emptyrecords: 'No records are available to display',
        forceFit: true,
        autowidth: true,
        shrinkToFit: true,
        multiselect: false,
        //direction: 'rtl',
        loadComplete: function (_data) {
            $("tr.jqgrow:odd").addClass('myAltRowClassOdd');
            $("tr.jqgrow:even").addClass('myAltRowClassEven');
            // alert(JSON.stringify(_data));
        },
    });
    $grid.jqGrid('setGridParam', { data: $data });
    $grid.trigger('reloadGrid');
    $grid.jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
    $grid.jqGrid('setLabel', 'rn', 'SNo');
}

var GlobalAjax = function (options) {
   // alert(options.commandName);
    $.ajax({
        type: 'POST',
        url: '/services/Xtreme/process',
        data: JSON.stringify({ type: options.commandName, value: options.values }),
        contentType: "application/json; charset=utf-8",
        xhrFields: { withCredentials: true },
        statusCode: {
            401: function () {
            }
        },
        success: function (data) {
            if (options.CallBack !== '') { options.CallBack(data); }
        }
    });
}


var validateForm = function ($form) {
    var valid = true;
    $('#' + $form + " input[required],#" + $form + " textarea[required],#" + $form + " select[required]").each(function () {
        if ($(this).hasClass('select2')) {
            $($(this).data('select2').$container).removeClass("invalid");
        } else { $(this).removeClass('invalid'); }

        $(this).attr('title', '');
        if (!$(this).val()) {
            if ($(this).hasClass('select2')) {
                $($(this).data('select2').$container).addClass("invalid");
            }
            else {
                $(this).addClass('invalid');
            }
            $(this).attr('title', 'This field is required');
            valid = false;
        }

        //if ($(this).attr("type") == "email" && !$(this).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        //    $(this).addClass('invalid');
        //    $(this).attr('title', 'Enter valid email');
        //    valid = false;
        //}
    });
    return valid;
}


