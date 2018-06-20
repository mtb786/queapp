const departmentCollection = require('../model/department.model');
const user = require('../model/user.model');

module.exports = {
    addDepartment: function (req, res) {
        const department = departmentCollection();
        try {
            user.findOne({ 'id': req.body.created_By }, function (err, obj) {
                if(obj === null) {
                    return res.status(200).send({ 'error_Message': 'Created User Does Not Match' });
                    
                } else { 
                const _id = obj._id;
                department.id = req.body.id; 
                department.dep_Id = req.body.id;
                department.dep_Name = req.body.dep_Name;
                department.dep_Location = req.body.dep_Location;
                department.dep_Description = req.body.dep_Desscription;
                department.created_By = _id;
                department.save((depModelError) => {
                    if (depModelError) {
                        const errorCode = depModelError.code;
                        if (errorCode === 11000) {
                            return res.status(400).send({ 'error_Message': 'Department id already added' });
                        } else {
                            return res.status(400).send({ 'errormessage': depModelError });
                        }
                    } else {
                        return res.status(200).send({ 'message': 'Department Added' });
                    }

                });
            }
            });
        } catch (err) {
        }

    }
}