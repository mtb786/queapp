const leadsales = require('../model/lead.model');


module.exports = {

    lead: function (req, res) {

        let leadModel = leadsales();
        let id = req.body.id;
        let lead = req.body.lead;
        leadModel.id = id;
        leadModel.leadTotal = lead;
        try {
            leadModel.save((leadModelError) => {
                if (leadModelError) {
                    return res.status(200).send({ message: leadModelError });
                } else {
                    return res.status(200).send({ message: 'Lead Added' });
                }
            })
        } catch (err) {
            return res.status(400).send({ message: error });
        }
    },

    leadInfo : function (req ,res) {
        try {
            leadsales.find({}).then((responseData, resposneError) => {
        res.status(200).send({data : responseData}); 
        });
        }catch(err) {
            console.log(err);
            return res.status(400).send({message : err})
        }   
        
    }
}