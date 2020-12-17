const mongoose = require('mongoose')

const leavesSchema = new mongoose.Schema({
    type: {
        type: String,
        required:true,
        $in: ["Annual", "Accidental", "Sick", "Maternity", "Compensation"]
    },
    submission: {
        type: Date,
        required: true
    }
})

module.exports.model = mongoose.model('leave', leavesSchema)
module.exports.leavesSchema = leavesSchema