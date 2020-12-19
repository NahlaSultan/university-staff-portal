const mongoose = require('mongoose')
const { staffSchema } = require('./staff_member_models')


const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    instructors: {
        type: [],
        default: []
    },
    teachingAssistants: {
        type: [] ,
        default: []   
    },
    courseCoordinator: {
        type: staffSchema,
        unique: true
    },
    teachingSlots: {
        type: []
    },
    teachingSlotsNumber: {
        type: Number,
        //required: true
    }
})



module.exports.model = mongoose.model('course', courseSchema)
module.exports.courseSchema = courseSchema
