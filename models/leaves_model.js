const mongoose = require('mongoose')

const leavesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        $in: ["Annual", "Accidental", "Sick", "Maternity", "Compensation"]
    },
    submission: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    staffID: {
        type: String,
        required: true
    },
    pending: {
        type: Boolean,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    },
    replacementRequest: {
        //_id of the request
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    hodID: {
        type: String,
        required: true
    },
    documentLinks: {
        type: String
    },
    compensatingDay: {
        type: Date
    }
})

module.exports.model = mongoose.model('leave', leavesSchema)
module.exports.leavesSchema = leavesSchema