const mongoose = require('mongoose')
const { staffSchema } = require('./staff_member_models')
const { courseSchema } = require('./course_model')

const departmentSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    headOfDepartment: {
        //memberID of this staff member
        type: String,
        unique: true
    },
    courses:{
        type:[],
        default: []
    } 

})
module.exports.model = mongoose.model("department", departmentSchema)
module.exports.departmentSchema = departmentSchema