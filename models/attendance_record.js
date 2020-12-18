const mongoose = require('mongoose')
const { staffSchema } = require('./staff_member_models')

const attendanceSchema = new mongoose.Schema(
    {
    
        signInTime: {
            type: Date,
            required:true
        } ,
        signOutTime: {
            type: Date,
            required:true
        } 
    })
    
    //req mongoose, then schema, then export
    
    module.exports.model = mongoose.model('attendance',attendanceSchema)
    module.exports.attendanceSchema=attendanceSchema
    //table is lowercase and plural of 'user' insterted above
    