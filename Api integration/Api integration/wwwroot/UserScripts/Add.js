
$(document).ready(function () {

    $("#btnSave").click(function () {
        debugger;
        var p = $("#p").val();
        phoneno(p);

        if (AddValidate()) {

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
                        phone: $("#p").val(),
                        gender: $("input[name='gender']:checked").val(),
                        technology: $('.Checkbox:checked').map(function () { return this.value; }).get().join(',')

                    }),

                    success: function (data) {

                        location.reload();

                    }

                });
        }
        else {
            if ($("#n").val() === "") {
                return window.alert("Name cannot be null !!");
            }
            if ($("#a").val() === "") {
                return window.alert("Address cannot be null !!");
            }
            if ($("#p").val() === "") {
                return window.alert("Invalid number");
            }

            if ($("#c").val() === "") {
                return window.alert("Please select a city!!");
                if (($("#cb1").checked == false) && ($("#cb2").checked == false) && ($("#cb3").checked == false))
                    return window.alert("Please select a technology");
            }
            else if (!($('#g1').prop('checked') || $('#g2').prop('checked'))) {
                return window.alert("Please select gender");
            }
        }
    });

});
function AddValidate() {
    debugger;
    var pa = $("#p").val();
    if ($("#p").val() === "") {
        return false;
    }

    else if (pa.length < 10) {
        return false;
    }


    else if ($("#a").val() === "") {
        return false;
    }
    else if ($("#n").val() === "") {
        return false;
    }
    else if ($("#c").val() === "") {
        return false;
    }
    else if (!($('#g1').prop('checked') || $('#g2').prop('checked'))) {
        return false;
    }
    //else if (($("#cb").checked == false) && ($("#cb2").checked == false) && ($("#cb3").checked == false))
    //    return false;
    return true;
}
function phoneno(p) {
    var phoneno = /^\d{10}$/;
    if (p.match(phoneno)) {
        return true;
    }
    else {
        alert("Not a valid Phone Number");
        return false;
    }
}