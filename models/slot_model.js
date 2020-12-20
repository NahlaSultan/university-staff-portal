const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const AutoIncrementFactory = require('mongoose-sequence');
const connection = mongoose.createConnection(process.env.DB_URL);
const AutoIncrement = AutoIncrementFactory(connection);


const slotSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
        $in: ["lecture", "tutorial", "lab"]
    },
    time: {
        type: String,
        required: true,
        $in: ["First Slot", "Second Slot", "Third Slot", "Fourth Slot", "Fifth Slot"]
    },
    day: {
        type: String,
        required: true,
        $in: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    },
    courseTaught: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    courseCoordinatorID: {
        type: String,
    },
    numberID:
    {
        type: Number,
        unique: true
    },
    assignedFlag: {
        type: Boolean,
        default: false
    }
    // ,
    // academicMember: {
    //     type: staffSchema
    // }


})
slotSchema.plugin(AutoIncrement, { id: 'slotid_seq', inc_field: 'numberID' });

module.exports.model = mongoose.model('slots', slotSchema)
module.exports.slotSchema = slotSchema