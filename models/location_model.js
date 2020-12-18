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
        type: int,
        required: true
    },

    officeMembers: {
        type: int,
    }

   

})

module.exports.model = mongoose.model('location_model', locationSchema)
module.exports.locationSchema = locationSchema