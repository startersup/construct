module.exports = function(req,res,next){
        let app = req.app;
        let auth_token ;
        let userid ;
        let mobile = req.originalUrl.startsWith('/mobile');
        if(req.cookies && req.signedCookies){
             auth_token = req.signedCookies['access_token'];
             userid = req.cookies.userId;
        }
        if (!auth_token || !userid){
          if (mobile){
            res.render('./mobile/login');
          }else{
            res.render('./login');
          }
            return;
        };
        app.models.AccessToken.find({where: {and: [{id: auth_token}, {userId: userid}]}}, function(err, authInfo) {
          if (err) {
              res.status(500);
              if (mobile){
                res.render('./mobile/login',{ERROR:"Internal Error"});
              }else{
                res.render('./login',{ERROR:"Internal Error"});
              }
              return;
            };
          if (authInfo.length<1) {
               res.status(404);
               if (mobile){
                res.render('./mobile/login',{ERROR:"User Not Found"});
              }else{
                res.render('./login',{ERROR:"User Not Found"});
              }
               return;
          }
          next();
        });
}