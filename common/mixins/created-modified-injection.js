module.exports = function(Model, options) {
    'use strict';
    Model.belongsTo('UserInfo',{as:'created_by',foreignKey:'created_by'});
    Model.belongsTo('UserInfo',{as:'updated_by',foreignKey:'updated_by'});
    Model.defineProperty('created_date', {type: Date});
    Model.defineProperty('updated_date', {type: Date});    
    Model.observe('before save', function event(ctx, next) {
        const token = ctx.options && ctx.options.accessToken;
        const userId = token && token.userId;
        let date = new Date();
        if (ctx.instance) {
            if (ctx.isNewInstance) {
                ctx.instance.created_by   = ctx.instance.created_by || userId;
                ctx.instance.created_date   = date;
            }else{
                ctx.instance.updated_by   = ctx.instance.updated_by || userId;
                ctx.instance.updated_date   = date;
            }
        }
next();
    });
};