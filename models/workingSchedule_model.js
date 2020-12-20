const mongoose = require('mongoose')
const { daySchema } = require('./day_model')


const workingScheduleSchema = new mongoose.Schema({
    //each day is an array of slots of max length 5
    staffID: {
        //the id of the staff member 
        type: String,
        unique: true,
        required: true
    },
    Saturday: {
        type: [],
        maxlength: 5,
        default: []
    },

    Sunday: {
        type: [],
        maxlength: 5,
        default: []
    },

    Monday: {
        type: [],
        maxlength: 5,
        default: []
    },

    Tuesday: {
        type: [],
        maxlength: 5,
        default: []
    },

    Wednesday: {
        type: [],
        maxlength: 5,
        default: []
    },
    Thursday: {
        type: [],
        maxlength: 5,
        default: []
    }

})

module.exports.model = mongoose.model('workingSched', workingScheduleSchema)
module.exports.workingScheduleSchema = workingScheduleSchema