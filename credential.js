var isAdmin = function isAdmin(req){
    if(req.session.level==1){
      return true;
      }
      return false;
  }
  var isLabor = function(req){
    if(req.session.level==2){
      return true;
    }
    return false;
  }
  module.exports.isAdmin=isAdmin;
  module.exports.isLabor=isLabor;