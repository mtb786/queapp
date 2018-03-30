

module.exports={
    LoginVerification : function(req,res) {
        try {
            console.log('user controller req');
            console.log(req.userid);
            res.send('hello User manish');
        }catch(err) {
            console.log(err);
        }


    } 
}
