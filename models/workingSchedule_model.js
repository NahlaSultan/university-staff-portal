const mongoose = require('mongoose')
const { daySchema } = require('./day_model')


const workingScheduleSchema = new mongoose.Schema({

    day1: {
        type: daySchema,
        required: true
    },

    day2: {
        type: daySchema,
        required: true
    },

    day3: {
        type: daySchema,
        required: true
    },

    day4: {
        type: daySchema,
        required: true
    },

    day5: {
        type: daySchema,
        required: true
    }

})

module.exports.model = mongoose.model('workingSched', workingScheduleSchema)
module.exports.workingScheduleSchema = workingScheduleSchema