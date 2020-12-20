const mongoose = require('mongoose')
const { daySchema } = require('./day_model')


const workingScheduleSchema = new mongoose.Schema({

    Saturday: {
        type: daySchema,
        required: true
    },

    Sunday: {
        type: daySchema,
        required: true
    },

    Monday: {
        type: daySchema,
        required: true
    },

    Tuesday: {
        type: daySchema,
        required: true
    },

    Wednesday: {
        type: daySchema,
        required: true
    },
    Thursday: {
        type: daySchema,
        required: true
    }

})

module.exports.model = mongoose.model('workingSched', workingScheduleSchema)
module.exports.workingScheduleSchema = workingScheduleSchema