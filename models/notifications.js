const mongoose = require('mongoose')


const notificationSchema = new mongoose.Schema({
    staff: {
        type: String
    },
    dayOff: {
        type: []
    },
    replacement: {
        type: []
    },
    slotLinking: {
        type: []
    },
    leave: {
        type: []
    }



})

module.exports.model = mongoose.model('notification', notificationSchema)
module.exports.notificationSchema = notificationSchema