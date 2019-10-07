
module.exports = async function (app) {
   await app.dataSources.db.autoupdate();
    console.log("Performed automigration.");
 }