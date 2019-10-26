module.exports = function(router,app){
  router.get('/mobile/mobiledash', function(req, res) {
    res.render('./mobile/mobiledash');
  });
  router.get('/mobile/next', function(req, res) {
    res.render('./mobile/next');
  });
    router.get('/mobile/login', function(req, res) {
        res.render('./mobile/login');
      });
}
