


module.exports = function(req,res,next) {

if(req.body.id === null || req.body.id === undefined || req.id === '') {
    res.status(400).send({status : false , message : 'user id is missing'});   
} else {
    next();
}
}