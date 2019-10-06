
module.exports = async function (app) {
   await app.dataSources.db.automigrate();
    console.log("Performed automigration.");
 }