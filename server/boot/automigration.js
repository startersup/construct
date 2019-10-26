const fs = require('fs');
const path = require('path');
module.exports = async function (app) {
   let dbWork = JSON.parse(fs.readFileSync(path.join(__dirname, '/../db-work.json'),'utf-8'));
   if(dbWork.reinitDB==true){
      await app.dataSources.db.automigrate();
      dbWork.reinitDB=false;
      fs.writeFileSync(path.join(__dirname, '/../db-work.json'), JSON.stringify(dbWork));
   }else{
   await app.dataSources.db.autoupdate();
   }
    console.log("Performed automigration.");
 }