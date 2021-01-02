const mongoose = require('mongoose')
const { staffSchema } = require('./staff_member_models')

const attendanceSchema = new mongoose.Schema(
    {
    
        signInTime: {
            type: Date,
        } ,
        signOutTime: {
            type: Date,
            strict:true,
            default:null
          
        
        } 
    })
    
    //req mongoose, then schema, then export
    
    module.exports.model = mongoose.model('attendance',attendanceSchema)
    module.exports.attendanceSchema=attendanceSchema
    //table is lowercase and plural of 'user' insterted above
    