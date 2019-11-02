

var HostName = window.location.host;
var Protocol = window.location.protocol;
var LocationUrl = "";
LocationUrl = Protocol + "//" + HostName + "/";
var currPage;

var gstFlag = '';
var arrcgst = [];
var arrsgst = [];
var arrgst = [];
var arrgstamt = [];
var arrtaxableValue = [];


var config;
$.getJSON(LocationUrl+'js/configure.json')
    .done(function (data) {
        config = data;
    });

function subUrl() {
    a = window.location.pathname;
    var y = a.substring(1, a.length);
    return y;
}


function MaskedDecimal(ele, wnum, dnum) {

    var regex = new RegExp("^\\d{0," + wnum + "}(\\.\\d{0," + dnum + "})?$");
    if (!regex.test(ele.value)) {
        ele.value = ele.value.substring(0, ele.value.length - 1);
    }

}

function MaskedNumber(ele, num) {

    var regex = new RegExp("^\\d{0," + num + "}?$");
    if (!regex.test(ele.value)) {
        ele.value = ele.value.substring(0, ele.value.length - 1);
    }

}

Today_Date_view = new Date();
Today_Date_value = new Date();
var dd = String(Today_Date_view.getDate()).padStart(2, '0');
var mm = String(Today_Date_view.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = Today_Date_view.getFullYear();

Today_Date_view = dd + '/' + mm + '/' + yyyy;
Today_Date_value = yyyy + '-' + mm + '-' + dd;


// $('.MaskedDecimal').on('input', function (event) {
//   var num = $(this).attr("maskedFormat").toString().split(',');
//   var regex = new RegExp("^\\d{0," + num[0] + "}(\\.\\d{0," + num[1] + "})?$");
//   if (!regex.test(this.value)) {
//     this.value = this.value.substring(0, this.value.length - 1);
//   }
// });

// $('.MaskedNumber').on('input', function (event) {
//   var num = $(this).attr("maskedFormat").toString();
//   var regex = new RegExp("^\\d{0," + num[0] + "}?$");
//   if (!regex.test(this.value)) {
//     this.value = this.value.substring(0, this.value.length - 1);
//   }
// });

function randomString(len) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}
function func_submit(load) {
    var val = func_validate(load);
    if (val == 1) {
        var apiJson = func_createJson(load);
        var apiUrl = LocationUrl + config[load]["api"];
        func_post(apiUrl, apiJson);
    }
}

function func_btnClick(ele) {
    var temp = subUrl();
    if (ele.id == 'Place_Order') {
        PurchaseTableToJson();
        func_submit(temp);
    }else if ((ele.id == 'Add_Vendor') || (ele.id == 'Add_Employee') ) {
        
        func_submit(temp);
    }
    

}

function PurchaseUpdateRow() {

    var rowlength = document.getElementById("Purchase_Order_Table").rows.length;
    var v = "0";
    var grandnet = parseFloat(v);
    var grandgst = parseFloat(v);
    var grandtot = parseFloat(v);
    for (var i = 1; i < rowlength; i++) {
        var table = document.getElementById("Purchase_Order_Table"); // Tabli Id
        var row = table.rows[i];  //Table Row Number
        var temp = row.id

        var x1 = document.getElementById(temp + "rateid").value;
        var x2 = document.getElementById(temp + "quantityid").value;
        var x3 = document.getElementById(temp + "gstid").value;

        var netvalue = parseFloat(x1) * parseFloat(x2);
        grandnet = grandnet + netvalue;
        var gstvalue = (parseFloat(netvalue) / 100) * parseFloat(x3);
        grandgst = grandgst + gstvalue;
        var total = netvalue + gstvalue;
        grandtot = grandtot + total;

        document.getElementById(temp + "netamountid").value = netvalue;
        document.getElementById(temp + "gstamountid").value = gstvalue;
        document.getElementById(temp + "totalamountid").value = total;
    }

    document.getElementById("nettotal").value = grandnet;
    document.getElementById("gsttotal").value = grandgst;
    document.getElementById("grandtotal").value = grandtot;
}
function seperategst(gst, gstamount) {

}

function SomeDeleteRowFunction(rowcount) {
    document.getElementById('Purchase_Order_Table').deleteRow(rowcount);

    var rowlength = document.getElementById("Purchase_Order_Table").rows.length;
    var table = document.getElementById("Purchase_Order_Table");
    for (var i = 1; i < rowlength; i++) {
        // Tabli Id
        var row = table.rows[i];  //Table Row Number
        var temp = row.id + 'sno';
        document.getElementById(temp).innerHTML = i;
    }
    PurchaseUpdateRow();

}
function PurchaseAddRow() {
    PurchaseGstValue();
    var res = func_validate('purchaseadd');
    if (res == 1) {
        var rowcounter = document.getElementById("Purchase_Order_Table").rows.length;
        var table = document.getElementById("Purchase_Order_Table");
        var rowcount = randomString(20);
        //

        var row = document.createElement("tr");
        row.id = rowcount;



        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");

        var x1 = document.getElementById("item").value;
        var x2 = document.getElementById("rate").value;
        var x3 = document.getElementById("quantity").value;

        if(document.getElementById("cgst").value == '')
        {
            document.getElementById("cgst").value="0";
        }
        if(document.getElementById("sgst").value == '')
        {
            document.getElementById("sgst").value="0";
        }
        if(document.getElementById("igst").value == '')
        {
            document.getElementById("igst").value="0";
        }
        var cgst = parseFloat(document.getElementById("cgst").value);
        var sgst = parseFloat(document.getElementById("sgst").value);
        var igst = parseFloat(document.getElementById("igst").value);

        var gst = cgst + sgst + igst;
        gst = parseFloat(gst);

        var netamount = parseFloat(x2) * parseFloat(x3);
        netamount = parseFloat(netamount);

        var strhidden = document.getElementById("hiddenitemid").value;

        seperategst(gst, parseFloat(((netamount / 100) * gst).toFixed(2)));

        td0.innerHTML = rowcounter;
        td0.id = rowcount + 'sno';
        td1.innerHTML = '<input  class="editcontrol" type="text" id="' + rowcount + 'itemid' + '" name="' + rowcount + 'itemid' + '" value="' + x1 + '"  >' + '<input  class="editcontrol" type="hidden" id="' + rowcount + 'hiddenitemid' + '" name="' + rowcount + 'itemid' + '" value="' + strhidden + '"  >';

        td2.innerHTML = '<input onchange="PurchaseUpdateRow();" class="editcontrol" type="text" name="' + rowcount + 'quantityid' + '" id="' + rowcount + 'quantityid' + '" value="' + x3 + '" >';

        td3.innerHTML = document.getElementById('hiddenitemunit').value;

        td4.innerHTML = '<input onchange="PurchaseUpdateRow();" class="editcontrol" type="text" name="' + rowcount + 'rateid' + '" id="' + rowcount + 'rateid' + '" value="' + x2 + '"  >';



        td5.innerHTML = '<input  class="editcontrol" disabled type="text" id="' + rowcount + 'netamountid' + '" name="' + rowcount + 'netamount' + '" value="' + netamount + '"  >';

        td6.innerHTML = '<input onchange="PurchaseUpdateRow();" class="editcontrol" type="text" name="' + rowcount + 'gstid' + '" id="' + rowcount + 'gstid' + '" value="' + gst + '" >';

        td7.innerHTML = '<input  class="editcontrol" disabled type="text" id="' + rowcount + 'gstamountid' + '" name="' + rowcount + 'gstamount' + '" value="' + parseFloat(((netamount / 100) * gst).toFixed(2)) + '"  >';

        td8.innerHTML = '<input  class="editcontrol" disabled type="text" id="' + rowcount + 'totalamountid' + '" name="' + rowcount + 'totalamountid' + '" value="' + parseFloat((netamount + ((netamount / 100) * gst)).toFixed(2)) + '"  >';

        td9.innerHTML = '<td><input type="button" class="Purchase-delete" value="X" onclick="SomeDeleteRowFunction(\'' + rowcounter + '\')"></td>'

        row.appendChild(td0);
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

        var result_style = document.getElementById(rowcount).style;

        result_style.display = 'table-row';

        document.getElementById("item").value = "";
        document.getElementById("rate").value = "";
        document.getElementById("quantity").value = "";

        document.getElementById("cgst").value = "";
        document.getElementById("sgst").value = "";

        document.getElementById("igst").value = "";


        var tot = document.getElementById("grandtotal").value;
        tot = parseFloat(tot) + parseFloat(netamount) + parseFloat((netamount / 100) * gst);
        document.getElementById("grandtotal").value = parseFloat(tot.toFixed(2));

        tot = document.getElementById("nettotal").value;
        tot = parseFloat(tot) + parseFloat(netamount);
        document.getElementById("nettotal").value = parseFloat(tot.toFixed(2));

        tot = document.getElementById("gsttotal").value;
        tot = parseFloat(tot) + parseFloat(((netamount / 100) * gst));
        document.getElementById("gsttotal").value = parseFloat(tot.toFixed(2));

    }

}

function PurchaseGstValue() {

    var gst;

    if (gstFlag == 'OT') {
        gst = parseFloat(document.getElementById("igst").value);
    }
    else if (gstFlag == 'TN') {
        gst = parseFloat(document.getElementById("cgst").value);

    }

    var taxableValue = parseFloat(document.getElementById("rate").value) * parseFloat(document.getElementById("quantity").value);

    var gstamt = parseFloat(gst) * (parseFloat(taxableValue / 100));

    if (arrgst.length > 0) {
        if (arrgst.indexOf(gst) >= 0) {

            var idx = arrgst.indexOf(gst);
            arrgstamt[idx] = parseFloat(arrgstamt[idx]) + gstamt;
            arrtaxableValue[idx] = parseFloat(arrtaxableValue[idx]) + taxableValue;
        }
        else {
            
            arrgst.push(gst);
            arrgstamt.push(gstamt);
            arrtaxableValue.push(taxableValue);
        }


    } else {
        arrgst.push(gst);
        arrgstamt.push(gstamt);
        arrtaxableValue.push(taxableValue);

    }

    PurchaseGstTable();
}

function PurchaseGstTable() {
    if (gstFlag == 'TN') {

        var table = document.getElementById("GstTable");
        table.innerHTML = '<tr>                    '
            + '<th>Taxable Value</th> '
            + '<th>CGST %</th>         '
            + '<th>Amount</th>        '
            + '<th>SGST %</th>        '
            + '<th>Amount</th>        '
            + '<th>Net %</th>         '
            + '<th>Amount</th>        '
            + '</tr>             '
            + '<tr>                   ';
        var len = arrgst.length;

        for (var i = 0; i < len; i++) {
            var row = document.createElement("tr");

            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var td6 = document.createElement("td");
            var td7 = document.createElement("td");

            td1.innerHTML = arrtaxableValue[i];
            td2.innerHTML = (arrgst[i] / 2).toFixed(2);
            td3.innerHTML = (arrgstamt[i] / 2).toFixed(2);
            td4.innerHTML = (arrgst[i] / 2).toFixed(2);
            td5.innerHTML = (arrgstamt[i] / 2).toFixed(2);
            td6.innerHTML = arrgst[i];
            td7.innerHTML = arrgstamt[i];

            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.appendChild(td5);
            row.appendChild(td6);
            row.appendChild(td7);
            table.children[0].appendChild(row);

        }

    } else if (gstFlag == 'OT') {
        var table = document.getElementById("IgstTable");
        table.innerHTML = '<tr>                    '
            + '<th>Taxable Value</th> '
            + '<th>IGST %</th>         '
            + '<th>Amount</th>        '
        var len = arrgst.length;

        for (var i = 0; i < len; i++) {
            var row = document.createElement("tr");

            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");

            td1.innerHTML = arrtaxableValue[i];
            td2.innerHTML = arrgst[i];
            td3.innerHTML = arrgstamt[i];

            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);

            table.children[0].appendChild(row);

        }

    }
}

function PurchaseTableToJson() {

    var rlength = document.getElementById("Purchase_Order_Table").rows.length;

    var tableobj = [];
    var sid;

    var table = document.getElementById("Purchase_Order_Table");



    for (var j = 1; j < rlength; j++) {

        var row = table.rows[j];  //Table Row Number
        var i = row.id;

        var data = {};

        sid = i + 'quantityid';
        data["quantity"] = parseInt(document.getElementById(sid).value);

        sid = i + 'rateid';
        data["unit_price"] = parseInt(document.getElementById(sid).value);

        sid = i + 'gstid';
        data["gst"] = parseInt(document.getElementById(sid).value);

        sid = i + 'gstamountid';
        data["cgst"] = parseInt(document.getElementById(sid).value);

        sid = i + 'totalamountid';
        data["total"] = parseInt(document.getElementById(sid).value);

        sid = i + 'hiddenitemid';
        data["id"] = document.getElementById(sid).value;

        tableobj.push(data);




    }

    if(tableobj.length != 0)
    {
        document.getElementById("purchase_items").value = JSON.stringify(tableobj);
    }
   
}

function func_validate(load) {
    var ret = 1;
    var loop = config[load]["arr_req"].length;
    for (var i = 0; i < loop; i++) {
        var myid = config[load]["arr_req"][i];
        if (ret == 1) {
            if (document.getElementById(myid).value == '') {
                document.getElementById(myid).style = 'border: 2px solid red;';
                document.getElementById('alertid').innerHTML = 'Please Fill The Mandatory Feilds';
                
                if(document.getElementById(myid).type == 'hidden')
                {
                    document.getElementById('alertid').innerHTML = 'Please Insert Atleast One item';
                }

                ret = 0;
            }
            else {
                document.getElementById(myid).style = '';
                document.getElementById('alertid').innerHTML = '';

            }
        }
    }
    return ret;
}

function func_createJson(load) {
    var loop = config[load]["arr_form"].length;
    var obj = {};
    for (var i = 0; i < loop; i++) {

        var myid = config[load]["arr_form"][i];
        if (myid == "purchase_items") {
            var temp = document.getElementById(myid).value;
            obj[myid] = JSON.parse(temp);
        }
        else {
            obj[myid] = document.getElementById(myid).value;
        }

    }
    return (obj);
}

function showResult(val) {

    var myurl = LocationUrl + "api/products?filter=%7B%22where%22%3A%7B%22name%22%3A+%7B%22like%22%3A%22%25" + val + "%25%22%7D%7D%2C%22limit%22%3A10%2C%22fields%22%3A%5B%22id%22%2C%22name%22%2C%22unit%22%5D%2C%22include%22%3A%5B%22orders%22%5D%7D";

    func_get(myurl, 'livesearch', '');

}
function func_getvendor() {

    var strid = document.getElementById("vendor").value;
    var myurl = LocationUrl + "api/vendors/" + strid;
    func_get(myurl, 'SetVendorDetails', strid);


}

function SetVendorDetails(strid, obj) {

    document.getElementById("VendorEmail").value = obj.email;
    document.getElementById("VendorPhone").value = obj.phone;
    document.getElementById("VendorState").value = obj.state;

    if ((obj.state == 'TamilNadu') || (obj.state == 'Tamil Nadu')) {
        gstFlag = "TN";

        document.getElementById("IgstTable").style.display = 'none';
        document.getElementById("GstTable").style.display = 'block';

        document.getElementById("igst").type = 'hidden';
        document.getElementById("igst").value = 0;
        document.getElementById("cgst").type = 'text';
        document.getElementById("cgst").value = '';


    } else if ((obj.state == '') || (obj.state == null)) {
        document.getElementById("IgstTable").style.display = 'none';
        document.getElementById("GstTable").style.display = 'none';
        document.getElementById("igst").type = 'hidden';
        document.getElementById("cgst").type = 'hidden';



    } else {
        gstFlag = "OT";
        document.getElementById("GstTable").style.display = 'none';
        document.getElementById("IgstTable").style.display = 'block';

        document.getElementById("igst").type = 'text';
        document.getElementById("igst").value = '';
        document.getElementById("cgst").type = 'hidden';
        document.getElementById("cgst").value = 0;
    }

}
function hideResult() {
    document.getElementById("livesearch").innerHTML = "";
    document.getElementById("livesearch").style.border = "";
    document.getElementById("livesearch").style.padding = "";
}
function livesearch(unw, data) {

    var strlen = data.length;

    if (strlen > 0) {
        document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
        document.getElementById("livesearch").style.padding = "5px 15px";
    }
    if (strlen == 0) {

        document.getElementById("livesearch").style.border = "";
        document.getElementById("livesearch").style.padding = "";
    }
    var strlist = "";
    for (var i = 0; i < strlen; i++) {
        strlist = strlist + '<p onclick="setlivedata(this)" id="' + data[i].id + '" class="' + data[i].unit + '"  >' + data[i].name + "<br>";

    }
    document.getElementById("livesearch").innerHTML = strlist;
}


function setlivedata(ele) {
    var newstring = ele.innerHTML.replace('<br>', '');

    document.getElementById('hiddenitemid').value = ele.id;
    document.getElementById('hiddenitemunit').value = ele.className;
    document.getElementById('item').value = newstring;
    document.getElementById("livesearch").innerHTML = "";
    document.getElementById("livesearch").style.border = "";
    document.getElementById("livesearch").style.padding = "";
}

function modal_success(res) {
    if (res == 'suc') {
        document.getElementById("modal_success").click();
        func_refresh();
    }
    else {
        document.getElementById("modal_fail").click();
    }
}

function func_refresh() {
    if (subUrl() == 'purchase') {
        document.getElementById("vendor").value = '';
        document.getElementById("VendorEmail").value = '';
        document.getElementById("VendorPhone").value = '';
        document.getElementById("VendorState").value = '';
        document.getElementById("site").value = '';
        LoadPurchasePage();
        var rowlength = document.getElementById("Purchase_Order_Table").rows.length;

        for (var i = 1; i < rowlength; i++) {

            document.getElementById('Purchase_Order_Table').deleteRow(1);

        }

         rowlength = document.getElementById("IgstTable").rows.length;

        for (var i = 1; i < rowlength; i++) {

            document.getElementById('IgstTable').deleteRow(1);

        }

         rowlength = document.getElementById("GstTable").rows.length;

        for (var i = 1; i < rowlength; i++) {

            document.getElementById('GstTable').deleteRow(1);

        }
        




    } else if ((subUrl() == 'vendor') || (subUrl() == 'employee')) {

        var load =subUrl();
        var loop = config[load]["arr_form"].length;

        for(var i=0 ; i< loop;i++)
        {
            var myid = config[load]["arr_form"][i];
            document.getElementById(myid).value='';
        }

    }
}

function func_post(apiUrl, apiJson) {
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

function Refresh() {
    document.location.reload(true);
}

function Reload() {
    document.location.reload(true);
}

function func_get(apiUrl, fnName, arg1) {

    $.ajax({
        url: apiUrl,
        cache: false,
        processData: false,
        contentType: 'application/json',
        type: 'GET',
        success: function (dataofconfirm) {
            window[fnName](arg1, dataofconfirm);
        },
        error: function (xhr, status, error) {
            return 0;
        }
    });
}

function func_put(apiUrl, apiJson) {
    var fd = JSON.stringify(apiJson);
    $.ajax({
        url: apiUrl,
        data: fd,
        cache: false,
        processData: false,
        contentType: 'application/json',
        type: 'PATCH',
        success: function (dataofconfirm) {
            modal_success('suc');
        },
        error: function (xhr, status, error) {
            modal_success('fail');
        }
    });
}


function func_onload() {

    currPage = subUrl();
    
    if (currPage == 'purchase') {
        func_get(LocationUrl + 'api/vendors', 'JsonToDropdown', 'vendor');

        //       JsonToDropdown('vendor', json)
        LoadPurchasePage();
    } else if (currPage == 'purchase-request')
    {
        var myurl = LocationUrl + "api/purchase_order/";
        func_get(myurl, 'setpurchase', '');
    } else if (currPage == 'employee-view')
    {
        var myurl = LocationUrl + config[currPage].getapi;
        func_get(myurl, 'LoadEmpoyeeTable', '');
    } else if (currPage == 'vendor-view')
    {
        var myurl = LocationUrl + config[currPage].getapi;
        func_get(myurl, 'LoadVendorTable', '');
    }
    

}

function LoadEmpoyeeTable(arg1,objJson)
{

    var tableId = config[currPage].table.id[0];
    var table = document.getElementById(tableId);
    var loop = objJson.length;
    var ColumnSize = config[currPage].table[tableId].cols;

    var rowid = randomString(20);
    //

    var row = document.createElement("tr");
    row.id = rowid;
    row.class = "header";

    for(var i=0 ; i<ColumnSize ; i++ )
    {
        var td = document.createElement("th");
        td.innerHTML =config[currPage].table[tableId].heading[i];
        row.appendChild(td);
    }
    table.children[0].appendChild(row);
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

        td1.innerHTML  =(i+1);
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

function EmployeeUpdate(EmpId)
{
    var myurl = LocationUrl+"api/users/"+EmpId;

    var EmpObj={};
   
    var temp = document.getElementById(EmpId).cells[1].innerHTML;
    var name= temp.split(' ');
    
    EmpObj["first_name"]=name[0];
    EmpObj["last_name"]=name[1];
    EmpObj["email"]=document.getElementById(EmpId).cells[2].innerHTML;
    EmpObj["phone"]=document.getElementById(EmpId).cells[3].innerHTML;
   // EmpObj["role"]=name[0];
    EmpObj["salary"]=document.getElementById(EmpId).cells[5].innerHTML;
    EmpObj["address"]=document.getElementById(EmpId).cells[6].innerHTML;
    func_put(myurl,EmpObj);

}

function VendorUpdate(VendorId)
{

var myurl = LocationUrl+"api/vendors/"+VendorId;

    var vendorObj={};

    vendorObj["name"]=document.getElementById(VendorId).cells[1].innerHTML;
   
    vendorObj["email"]=document.getElementById(VendorId).cells[2].innerHTML;
    vendorObj["phone"]=document.getElementById(VendorId).cells[3].innerHTML;
    vendorObj["gstNumber"]=document.getElementById(VendorId).cells[4].innerHTML;
    vendorObj["state"]=document.getElementById(VendorId).cells[5].innerHTML;
    vendorObj["location"]=document.getElementById(VendorId).cells[6].innerHTML;
  
    func_put(myurl,vendorObj);

}

function LoadVendorTable(arg1,objJson)
{

    var tableId = config[currPage].table.id[0];
    var table = document.getElementById(tableId);
    var loop = objJson.length;
    var ColumnSize = config[currPage].table[tableId].cols;

    var rowid = randomString(20);
    //

    var row = document.createElement("tr");
    row.id = rowid;
    row.class = "header";

    for(var i=0 ; i<ColumnSize ; i++ )
    {
        var td = document.createElement("th");
        td.innerHTML =config[currPage].table[tableId].heading[i];
        row.appendChild(td);
    }
    table.children[0].appendChild(row);
    for (var i=0; i<loop ; i++)
    {
        row = document.createElement("tr");
        row.id = objJson[i].id;
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td2.setAttribute("contenteditable", "true");
        var td3 = document.createElement("td");
        td3.setAttribute("contenteditable", "true");
        var td4 = document.createElement("td");
        td4.setAttribute("contenteditable", "true");
        var td5 = document.createElement("td");
        td5.setAttribute("contenteditable", "true");
        var td6 = document.createElement("td");
        td6.setAttribute("contenteditable", "true");
        var td7 = document.createElement("td");
        td7.setAttribute("contenteditable", "true");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");
      
        td1.innerHTML  =(i+1);
        td2.innerHTML  =objJson[i].name ;
        td3.innerHTML  =objJson[i].email ;
        td4.innerHTML  =objJson[i].phone ;
        td5.innerHTML  =objJson[i].gstNumber ;
        td6.innerHTML  =objJson[i].state;
        td7.innerHTML  =objJson[i].location ;
        td8.innerHTML  ='Active';
        td9.innerHTML  ='<button onclick="VendorUpdate(\''+objJson[i].id+'\');" class="buttonnew" id="'+objJson[i].id+' "> Update</button>';

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



function JsonToDropdown(ElementId, json) {
    var x = document.getElementById(ElementId);
    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        var option = document.createElement("option");
        option.text = obj.name;
        option.value = obj.id;
        x.add(option);
    }
}

function PushValue() {

}
function PushInnerValue() {

}

function LoadPurchasePage() {

    document.getElementById('curr').innerHTML = "<span  >Order Date :</span>" + Today_Date_view;
    ordid = Math.floor(Math.random() * 100001);
    document.getElementById("ordid").innerHTML = "<span  >Order No :</span> #" + ordid;
    document.getElementById("order_no").value = ordid;

}
  // function setparam_purchase(formid) {
  //   var obj = {};
  //   var strsplit = formid + "__";

  //   var c = document.getElementById(formid).children;
  //   var txt = "";
  //   var i;

  //   for (i = 0; i < c.length; i++) {
  //     var txt = c[i].id;

  //     var strvalue = document.getElementById(txt).value;
  //     txt = txt.split(strsplit);

  //     // var strkey='"'+txt[1]+'"';
  //     var strkey = txt[1];
  //     obj[strkey] = strvalue;
  //   }

  //   return (obj);
  // }

