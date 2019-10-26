
  module.exports = function(router,app){
    router.get('/employee', function(req, res) {
        res.render('./employee');
      });
      router.get('/login', function(req, res) {
        res.render('./login');
      });
      router.get('/vendor', function(req, res) {
        res.render('./vendor');
      });
  }