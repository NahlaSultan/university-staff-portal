const mongoose = require('mongoose')


const slotLinkingSchema = new mongoose.Schema({
    pending:{
        type:Boolean,
        required:true
    },
    accepted:{
        type:Boolean,
        default:false
    },
    slotID:{
        type:String,
        require:true
    },
    coordinatorId:
    {
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    notified:{
        type:Boolean
    }

})
module.exports.model = mongoose.model('slotLinking_request', slotLinkingSchema)
module.exports.slotLinkingSchema=slotLinkingSchema