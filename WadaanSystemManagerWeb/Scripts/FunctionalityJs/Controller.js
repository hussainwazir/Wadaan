var GlobalAjax = function (options) {
     $.ajax({
        type: 'POST',
         url: '/services/XtremeTech/process',
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
