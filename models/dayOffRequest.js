const mongoose = require('mongoose')
const dayOffSchema = new mongoose.Schema({

    pending: {
        type: Boolean,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    day: {
        type: String,
        require: true,
        $in: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    },
    HODId:
    {
        type: String,
        required: true
    },
    senderId:
    {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
})
module.exports.model = mongoose.model('dayOffChange_requests', dayOffSchema)
module.exports.dayOffSchema = dayOffSchema