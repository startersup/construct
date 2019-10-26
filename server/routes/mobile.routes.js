module.exports = function(router,app){
    router.get('/mobile/login', function(req, res) {
        res.render('./mobile/login');
      });
}