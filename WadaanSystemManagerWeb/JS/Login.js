$(document).ready(function () {

    $.ajax({
        type: 'POST',
        url: '/services/botik/process',
        data: JSON.stringify({ type: 'login', value: { username: "sabir", Password: "1234" } }),
        contentType: "application/json; charset=utf-8",
        xhrFields: { withCredentials: true },
        statusCode: {
            401: function () {
            }
        },
        success: function (d, s, h) {
            var data = JSON.parse(d.Value);
            if (data.status) {
                alert(data.message);
            }
            else {
                alert(data.message);
            }

        },
        error: function (d, s, h) {
            $("error_span").text("Invalid Login");
        }
    });
});