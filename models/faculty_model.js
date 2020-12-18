const mongoose = require('mongoose')
const { courseSchema } = require('./course_model')
const { staffSchema } = require('./staff_member_models')
const { departmentSchema } = require('./department_model')


const facultySchema = new mongoose.Schema({
    facultyName: {
        type: String,
        required: true
    },
    departments: {
      //  type: departmentSchema
        type: [],
        default: []
    }
})
module.exports = mongoose.model('faculty', facultySchema)
module.exports.facultySchema = facultySchema