module.exports= async function(app){
    var User = app.models.UserInfo;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
   await User.create([
      {first_name: 'Super Admin', email: 'saicharan14996@gmail.com', password: 'admin123',phone:'8056012353'}
    ], async function(err, users) {
      console.log('Created users:', users);
     await Role.create([{name: 'Super Admin'},{name: 'Admin'},{name: 'Site Admin'},{name: 'Worker'}], function(err, roles) {
        console.log('Created role:', roles);
        roles[0].principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          if (err) throw err;
          console.log('Created principal:', principal);
        });
      });
    });
  
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