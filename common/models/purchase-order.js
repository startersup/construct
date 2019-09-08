'use strict';

module.exports = function(Purchaseorder) {
    Purchaseorder.afterRemote('prototype.__create__products', function(ctx, inst, next) {
        let PurchaseItemInfo = Purchaseorder.app.models.PurchaseItemInfo;
         if(!(inst instanceof Array)){
            let order = ctx.instance.id;
            let item = inst.id;
            PurchaseItemInfo.find({where: {and: [{orderId: order}, {itemId: item}]}},function(err,Items) {
                if(err)throw err;
                let itemInfo = inst.purchase_items;
                PurchaseItemInfo.update({where:{id:Items[0].id}},{quantity:itemInfo.quantity,unit_price:itemInfo.unit_price,total:itemInfo.total},function(err,ctx){
                    console.log(ctx.data);
                });
            });
        }
        console.log(inst);
        next();
     });
};
