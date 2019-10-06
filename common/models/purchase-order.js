'use strict';

module.exports = function(Purchaseorder) {
    Purchaseorder.afterRemote('create', function(ctx, inst, next) {
        let PurchaseItemInfo = Purchaseorder.app.models.PurchaseItemInfo;
         if((inst.purchase_items)&&(inst.purchase_items instanceof Array)){
            let order = inst.id;
            inst.purchase_items.forEach(purchase_items => {
                let item = purchase_items.id;
                PurchaseItemInfo.create({order_id:order,item_id:item,quantity:purchase_items.quantity,unit_price:purchase_items.unit_price,gst:purchase_items.gst,cgst:purchase_items.cgst,total:purchase_items.total},function(err,ctx){
                    console.log("----->>>Purchase Added");
                });
            });
        }
        console.log(inst);
        next();
     });
};
