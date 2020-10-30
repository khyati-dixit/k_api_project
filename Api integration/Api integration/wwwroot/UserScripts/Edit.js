function EditUserDetails(item) {
    var id = $(item).data("id");

    debugger;
    $.ajax({
        url: 'http://localhost:63313/api/Values/' + id,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem('token')
        },
        success: function (data) {
            debugger;
            console.log(data);
            $("#g1").val(data.id);
            $("#n1").val(data.name);
            $("#c1").val(data.city);
            $("#a1").val(data.address);
            $("#p1").val(data.phone);
            var gen = $('input[name=gender]:checked').val(data.gender);

            if (gen == "male")
                $("#g1").prop('checked', true);

            else
                $("#g2").prop('checked', true);
            //($(this).is(":checked") ? $('.checkbox').prop("checked", true) : $('.checkbox').prop("checked", false))

        }

    });
}

function Update() {
    debugger;

    var p = $("#p1").val();
    phoneno(p);


    if (Validate()) {

        const params = {
            id: parseInt($("#g1").val()),
            name: $("#n1").val(),
            address: $("#a1").val(),
            phone: $("#p1").val(),
            city: $("#c1").val(),
            gender: $('input[name=gender]:checked').val(),
            technology: $('.Checkbox:checked').map(function () { return this.value; }).get().join(',')
        };

        const url = 'http://localhost:63313/api/Values/Update';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(() => {
                location.reload();
            })
            .catch(error => console.error('unable to add item', error));
    }
    else {
        if ($("#n1").val() === "") {
            return window.alert("Name cannot be null !!");
        }
        if ($("#a1").val() === "") {
            return window.alert("Address cannot be null !!");
        }
        if ($("#p1").val() === "") {
            return window.alert("Invalid number");
        }

        if ($("#c1").val() === "") {
            return window.alert("Please select a city!!");
            if (($("#cb1").checked == false) && ($("#cb2").checked == false) && ($("#cb3").checked == false))
                return window.alert("Please select a technology");
        }
    }


}

function Validate() {
    var p = $("#p1").val();
    if ($("#p1").val() === "") {
        return false;
    }

    else if (p.length < 10) {
        return false;
    }


    else if ($("#a1").val() === "") {
        return false;
    }
    else if ($("#n1").val() === "") {
        return false;
    }
    else if ($("#c1").val() === "") {
        return false;
    }
    else if ($('input[name=gender]:checked').val() === "") {
        return false;
    }
    else if (($("#cb1").checked == false) && ($("#cb2").checked == false) && ($("#cb3").checked == false))
        return false;
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
