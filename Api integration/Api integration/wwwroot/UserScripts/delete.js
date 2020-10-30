function DeleteUser(item) {
    var id = $(item).data("id");
    debugger;
    var result = confirm('Are you sure you wish to delete this record?');
    if (result) {
        $.ajax({
            url: 'http://localhost:63313/api/Values/'+id,
            type: 'Delete',
            dataType: 'html',
            success: function (data) {
                //window.reload();

            }

        });

    }
    location.reload();
}
//function DeleteUser(item) {
//    debugger;
//    var id = $(item).data("id");
//    var options = {};
//    options.url = 'http://localhost:63313/api/Values/'+id,   
       
//    options.type = "DELETE";
//    options.dataType = "html";
//    options.success = function (msg) {
//        console.log('msg= ' + msg);
//        $("#msg").html(msg);
//        getEmployeeList();
//    };
//    options.error = function () {
//        $("#msg").html("Error while calling the Web API!");
//    };
//    $.ajax(options);
//} 