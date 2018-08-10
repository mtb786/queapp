let jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const tokken = req.headers['tokken'];
    if (tokken) {

        jwt.verify(tokken, 'A22', (err, doc) => {
            if (err) {
                res.send('Not Authenticated');
            } else {
                if(doc.id === req.body.id) {
                    req.decoded = doc;                  
                    next(); //no error, proceed
                } else {
                 res.status(403).send({'error ' : true, 'message' : 'Not Autherized'});   
                }
               
            }
        });
    } else {
        res.status(403).send({ 'error': true ,'message' :'Tokken is missing' });
    }
}

