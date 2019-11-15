
function AddIndent()
{

    //vendorObj["name"]=document.getElementById(VendorId).cells[1].innerHTML;
    var rowid = randomString(20);
       var table =  document.getElementById("IndentAddTable").innerHTML;
       var count = document.getElementById("IndentAddTable").rows.length;
       var row = document.createElement("tr");

       var tRow ='<tr id ="'+rowid+'">';
        tRow =  tRow    +'<td > '+(count+1)+'</td>';
        tRow =  tRow            +'<td contenteditable = "true">'+document.getElementById("itemname").value+' </td>';
        tRow =  tRow            +'<td contenteditable = "true">'+document.getElementById("quantity").value+' </td>';
        tRow =  tRow           +'<td><input type="button" class="Purchase-delete" value="X" onclick="DeleteFromIndent(\'' + rowid+ '\')"></td>'

        tRow =  tRow            +'</tr>';

        document.getElementById("IndentAddTable").innerHTML = document.getElementById("IndentAddTable").innerHTML
                                                                 + tRow;
        document.getElementById("quantity").value='';
        document.getElementById("itemname").value='';
 

}

function DeleteFromIndent(rowid)
{
    var row = document.getElementById(rowid);
    row.parentNode.removeChild(row);

    var rowlength = document.getElementById("IndentAddTable").rows.length;
    var table = document.getElementById("IndentAddTable");
    for (var i = 0; i < rowlength; i++) {
        // Tabli Id
        var row = table.rows[i];  //Table Row Number
        var temp = row.id;
        document.getElementById(temp).cells[0].innerHTML = (i+1);
    }
}

function LoadTicketInfoPage() {

 
    var ticketId = Math.floor(Math.random() * 10000001);
    document.getElementById("TicketId").innerHTML='#'+ticketId;
    document.getElementById("request_no").value=ticketId;
    document.getElementById("IndentAddTable").innerHTML='';
    document.getElementById("site").value='';
    document.getElementById("subject").value='';
    document.getElementById("description").value='';
 
}
function Ticket_submit() {
    var load= subUrl();
    var val = func_validate(load);
    if (val == 1) {
        var apiJson = func_createJson(load);
        var apiUrl = LocationUrl + config[load]["api"];
        Ticket_Post(apiUrl, apiJson);
    }
}

function Ticket_Post(apiUrl, apiJson) {
    var fd = JSON.stringify(apiJson);
    $.ajax({
        url: apiUrl,
        data: fd,
        cache: false,
        processData: false,
        contentType: 'application/json',
        type: 'POST',
        success: function (dataofconfirm) {
            // do something with the result
           // alert(dataofconfirm);
            console.log("purchase : "+JSON.stringify(dataofconfirm));
            modal_success('suc');
        },
        error: function (xhr, status, error) {

            modal_success('fail');

        }
    });
}

function func_onload()
{

    requestid = Math.floor(Math.random() * 100001);
    document.getElementById("requestid").innerHTML = " #" + requestid;

}