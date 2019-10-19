const fs = require('fs')
const path = require('path');
module.exports= async function(app){
  let dbWork = JSON.parse(fs.readFileSync(path.join(__dirname, '/../db-work.json'),'utf-8'));
  if(dbWork.populated==true){
    console.log("----->Modules Already Populated");
    return;
  }
    var User = app.models.UserInfo;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
   await User.create([
      {first_name: 'Super Admin', email: 'saicharan14996@gmail.com', password: 'admin123',phone:'8056012353'}
    ], async function(err, users) {
        console.log('----->>>Users Populated');
        await Role.create([{name: 'Super Admin'},{name: 'Admin'},{name: 'Site Admin'},{name: 'Worker'}], async function(err, roles) {
        console.log('----->>>Roles Populated');
       await roles[0].principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          console.log('----->>>Super Admin Added');
        });
      });
    });
    var POStatus = app.models.PurchaseStatus;
    var status = [{name:"Draft",is_pending:1},{name:"Requested",is_pending:1},{name:"Confirmed",is_pending:1},{name:"Partially Recieved",is_pending:1},{name:"Recieved",is_pending:0},{name:"Cancelled",is_pending:0}];
    await POStatus.create(status,function(err,status){
        if (err) throw err;
        console.log("----->>>PO Status Popuplated");
    });
    var Inventory = app.models.Inventory;
    var InventoryData = require("../data-dictionary/product-dictionary.json");
    await Inventory.create(InventoryData,function(err,data){
        if (err) throw err;
        console.log("----->>>Inventory Products Popuplated");
    });
    dbWork.populated=true;
    fs.writeFileSync(path.join(__dirname, '/../db-work.json'), JSON.stringify(dbWork));
}