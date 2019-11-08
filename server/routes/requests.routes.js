module.exports = function(router, app){
    router.get('/ticket', function(req, res) {
        res.render('./ticket');
      });

      router.get('/ticketinfo', function(req, res) {
        res.render('./ticketinfo');
      });
}