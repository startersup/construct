module.exports =function(router,app){
    router.get('/product', function(req, res) {
        res.render('./product');
      });
}