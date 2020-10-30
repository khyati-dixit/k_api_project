    $("#btnSave").click(function () {
        debugger;
        $.ajax(
            {
                type: "POST",
                url: "http://localhost:63313/api/authentication/register",
                headers: { "Content-type": "application/json; charset=utf-8" },
                data: JSON.stringify({
                    username: $("#n").val(),
                    email: $("#e").val(),
                    password: $("#p").val(),                  
                }),
                success: function (data) {
                    location.reload();

                }
            });
    });


