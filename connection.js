var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 100,
    host     : '13.233.163.72',
    user     : 'root',
    password : 'root',
    database : 'construction',
    debug    :  false
});    
module.exports.executeQuery=function(query,callback){
        pool.query(query,function(err,result){
            if(err){
                callback(err);
                return;
            }
                callback(false, result);          
    });
}