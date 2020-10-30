
$(document).ready(function () {

    $("#btnSave").click(function () {
        alert(localStorage.getItem('token'));
        debugger;
        $.ajax(
            {
                type: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                url: "http://localhost:63313/api/Values",

                data: JSON.stringify({
                    name: $("#n").val(),
                    city: $("#c").val(),
                    address: $("#a").val(),
                    phone: $("#p").val()

                }),

                success: function (data) {
                    if (data)
                        location.reload();

                }

            });

    });

});



