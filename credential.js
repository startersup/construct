var isAdmin=function isAdmin(req){
    if(req.session.level==1){
      return true;
      }
      else{
        return false;
      }
  }
  module.exports.isAdmin=isAdmin;