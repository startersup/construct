
  function func_login()
  {
    var load = subUrl();
    var val = func_validate(load);
    if (val == 1) {
    var apiurl=LocationUrl+"api/users/login";
    var obj = {};
    obj["email"] = document.getElementById("UserName").value;
    obj["password"] =  document.getElementById("Password").value;
    var postdata = JSON.stringify(obj);
    $.ajax({
        url: apiurl,
        data: postdata,
        cache: false,
        processData: false,
        contentType: 'application/json',
        type: 'POST',
        success: function (dataofconfirm) {
            // do something with the result
            location.reload(true);
        },
        error: function(xhr, status, error) {

            alert("fail");

}
    });


  }
}