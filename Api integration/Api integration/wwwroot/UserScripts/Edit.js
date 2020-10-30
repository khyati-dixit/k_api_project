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

        }

    });
}

function Update() {
    debugger;

    const params = {
        id: parseInt($("#g1").val()),
        name: $("#n1").val(),
        address: $("#a1").val(),
        phone: $("#p1").val(),
        city: $("#c1").val()

    };

    const url = 'http://localhost:63313/api/Values/Update';

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem('token')
        },
        body: JSON.stringify(params)
    })
        .then(response => response.json())
        .then(() => {
            location.reload();
        })
        .catch(error => console.error('unable to add item', error));
};