module.exports= async function(app){
  var User = app.models.UserInfo;  
   User.afterRemote('login', function(context, accessToken, next) {
        let res = context.res;
        let req = context.req;
        console.log(req.signedCookies);
        if (accessToken != null) {
          if (accessToken.id != null) {
            res.cookie('access_token', accessToken.id, {
              signed: req.signedCookies ? true : false,
              maxAge: 1000 * accessToken.ttl,
              secret: '1235'
            });
            res.cookie('userId', accessToken.userId.toString(), {
              signed:  false,
              maxAge: 1000 * accessToken.ttl,
              secret: '12345'
            });
          }
        }
        return next();
      });
    
     User.afterRemote('logout', function(context, result, next) {
        let res = context.res;
        res.clearCookie('access_token');
        res.clearCookie('userId');
        return next();
      });
}