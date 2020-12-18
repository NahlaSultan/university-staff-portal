const mongoose = require('mongoose')
const { staffSchema } = require('./staff_member_models')


const slotSchema = new mongoose.Schema({
   
    type: {
        type: String,
        required: true,
        $in: ["lecture", "tutorial", "lab"]
    },
    time: {
        type: Date,
        required: true
    },
    courseTaught: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    id:{
        type:Number,
        unique:true,
        required:true
    }
    // ,
    // academicMember: {
    //     type: staffSchema
    // }
    
   
})
module.exports.model = mongoose.model('slot', slotSchema)
module.exports.slotSchema = slotSchema