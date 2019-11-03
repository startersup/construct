
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