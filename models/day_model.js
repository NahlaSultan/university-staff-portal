
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
        type: slotSchema
    },

    slot2: {
        type: slotSchema
    },

    slot3: {
        type: slotSchema
    },

    slot4: {
        type: slotSchema
    },

    slot5: {
        type: slotSchema
    }

})
module.exports.model = mongoose.model('day', daySchema)
module.exports.daySchema = daySchema