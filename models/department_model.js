const mongoose = require('mongoose')


const departmentSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    headOfDepartment: {
        type: staffSchema,
        unique: true
    }
    

})
module.exports.model = mongoose.model("department_model", departmentSchema)
module.exports.departmentSchema = departmentSchema