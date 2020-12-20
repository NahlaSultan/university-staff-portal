
const mongoose = require('mongoose')
const { slotSchema } = require('./slot_model')



const daySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        $in: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    }
    ,

    slot1: {
        type: Number,
        default: 0
    },

    slot2: {
        type: Number,
        default: 0
    },

    slot3: {
        type: Number,
        default: 0
    },

    slot4: {
        type: Number,
        default: 0
    },

    slot5: {
        type: Number,
        default: 0
    }

})
module.exports.model = mongoose.model('day', daySchema)
module.exports.daySchema = daySchema