module.exports = function(req,res,next){
        let app = req.app;
        let auth_token ;
        let userid ;
        if(req.cookies && req.signedCookies){
             auth_token = req.signedCookies['access_token'];
             userid = req.cookies.userId;
        }
        if (!auth_token || !userid){
            res.render('./login');
            return;
        };
        app.models.AccessToken.find({where: {and: [{id: auth_token}, {userId: userid}]}}, function(err, authInfo) {
          if (err) {
              res.status(500);
              res.render('./login',{ERROR:"Internal Error"});
              return;
            };
          if (authInfo.length<1) {
               res.status(404);
               res.render('./login',{ERROR:"User Not Found"});
               return;
          }
          next();
        });
}