module.exports= async function(app){
    var POStatus = app.models.PurchaseStatus;
    var status = [{name:"Draft",is_pending:1},{name:"Requested",is_pending:1},{name:"Recieved",is_pending:0},{name:"Cancelled",is_pending:0}];
    await POStatus.create(status,function(err,status){
        console.log("Created Status:",status);
    });
}