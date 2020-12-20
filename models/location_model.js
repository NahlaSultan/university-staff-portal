const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({

    type: {
        type: String,
        $in: ["hall", "room", "lab", "office"]
    },

    name: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },

    capacity: {
        type: Number,
        required: true
    },

    officeMembers: {
        type: Number,
    }

   

})

module.exports.model = mongoose.model('location', locationSchema)
module.exports.locationSchema = locationSchema