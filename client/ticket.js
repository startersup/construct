
function AddIndent()
{

    //vendorObj["name"]=document.getElementById(VendorId).cells[1].innerHTML;
    var rowid = randomString(20);
       var table =  document.getElementById("IndentAddTable").innerHTML;
       var count = document.getElementById("IndentAddTable").rows.length;
       var row = document.createElement("tr");

       var tRow ='<tr id ="'+rowid+'">';
        tRow =  tRow    +'<td > '+(count+1)+'</td>';
        tRow =  tRow            +'<td contenteditable = "true">'+document.getElementById("item").value+' </td>';
        tRow =  tRow            +'<td contenteditable = "true" id="'+rowid+'itemquantity"'+'> 1</td>';
        tRow =  tRow            +'<td><input type="hidden" id="'+rowid+"itemid"+'" value="'+document.getElementById("hiddenitemid").value+'" '; 
        tRow =  tRow            +' </td> '             
        tRow =  tRow           +'<td><input type="button" class="Purchase-delete" value="X" onclick="DeleteFromIndent(\'' + rowid+ '\')"></td>'

        tRow =  tRow            +'</tr>';

        document.getElementById("IndentAddTable").innerHTML = document.getElementById("IndentAddTable").innerHTML
                                                                 + tRow;
        document.getElementById("item").value='';
 

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
    var load =subUrl();
    var rows=document.getElementById("IndentAddTable").rows.length;
    if(rows > 0)
    {
        document.getElementById("IndentAddTableValue").value=rows;
    }
    else{
        document.getElementById("IndentAddTableValue").value='';
    }
   // load = load +"_"+ document.getElementById("type").value;
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
            upload_indent(dataofconfirm.id);
           
        },
        error: function (xhr, status, error) {

            modal_success('fail');

        }
    });
}

function upload_indent(TicketId)
{
    

    var rlength = document.getElementById("IndentAddTable").rows.length;

    var tableobj = [];
    var sid;

    var table = document.getElementById("IndentAddTable");



    for (var j = 0; j < rlength; j++) {

        var row = table.rows[j];  //Table Row Number
        var i = row.id;

        var data = {};

        sid = i + 'itemquantity';
        data["quantity"] = parseInt(document.getElementById(sid).innerHTML);

        sid = i + 'itemid';
        data["product_id"] = parseInt(document.getElementById(sid).value);


        tableobj.push(data);

    }
    var load =subUrl();
    var apiUrl = LocationUrl + config[load]["api"]+"/"+TicketId+"/purchase_associations";
    Indent_submit(apiUrl, tableobj);
    

}


function Indent_submit(apiUrl, apiJson) {
    var fd = JSON.stringify(apiJson);
    $.ajax({
        url: apiUrl,
        data: fd,
        cache: false,
        processData: false,
        contentType: 'application/json',
        type: 'POST',
        success: function (dataofconfirm) {
            
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

function TicketViewLoad()
{
    var load =subUrl();
    var apiUrl = LocationUrl + config[load]["api"];
    func_get(apiUrl,'TicketTableLoad','');
}

function TicketTableLoad(dummy,objJson)
{
    var table = document.getElementById("TicketViewTable");
    var loop = objJson.length;
    for (var i=0; i<loop ; i++)
    {
        row = document.createElement("tr");
        row.id = objJson[i].id;
        var td1 = document.createElement("td");        
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");

        td1.innerHTML  ='<input type="checkbox" class="checkthis" id="checkthis" />';
        td2.innerHTML  =objJson[i].first_name + ' '+objJson[i].last_name;
        td2.contenteditable=true;
        td2.setAttribute("contenteditable", "true");
        td3.innerHTML  =objJson[i].email ;
        td3.setAttribute("contenteditable", "true");
        td4.innerHTML  =objJson[i].phone ;
        td4.setAttribute("contenteditable", "true");
        td5.innerHTML  ='';
        td6.innerHTML  =objJson[i].salary;
        td6.setAttribute("contenteditable", "true");
        td7.innerHTML  =objJson[i].address ;
        td7.setAttribute("contenteditable", "true");
        td8.innerHTML  ='Active';
        td9.innerHTML  ='<button onclick="EmployeeUpdate(\''+objJson[i].id+'\');" class="buttonnew" id="'+objJson[i].id+' "> Update</button>';

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        row.appendChild(td7);
        row.appendChild(td8);
        row.appendChild(td9);
        table.children[0].appendChild(row);

    }

}