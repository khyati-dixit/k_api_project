$(document).ready(function () {

    $("#btnLogin").click(function () {
        debugger;
        $.ajax(
            {
                type: "POST",
                url: "http://localhost:63313/api/authentication/login",
                headers: { "Content-type": "application/json; charset=utf-8" },
                data: JSON.stringify({
                    username: $("#n1").val(),
                    password: $("#p1").val()

                }),

                success: function (data) {
                    //location.reload();
                    
                    localStorage.setItem('token', data.token);
                    console.log(data);

                    console.log(data.token);
                    if (data)
                        window.location.href ="https://localhost:44325/Home/Index";
                    
                }

            });

    });

});
