module.exports = function(router,app){
  router.get('/mobile/', function(req, res) {
    res.render('./mobile/mobiledash');
  });
  router.get('/mobile/irequest', function(req, res) {
    res.render('./mobile/irequest');
  });
    router.get('/mobile/login', function(req, res) {
        res.render('./mobile/login');
      });
}
