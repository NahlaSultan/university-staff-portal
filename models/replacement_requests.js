const mongoose = require('mongoose')
const { slotSchema } = require('./slot_model')
const { staffSchema } = require('./staff_member_models')

const replacementSchema = new mongoose.Schema({

    pending: {
        type: Boolean,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    slot: {
        type: String,
        require: true
    },
    receiverId:
    {
        type: String,
        required: true
    },
    senderId:
    {
        type: String,
        required: true
    },
    date: {
        type: Date,
        // required: true
    }

})
module.exports.model = mongoose.model('replacment_requests', replacementSchema)
module.exports.replacementSchema = replacementSchema