const mongoose = require('mongoose')
const { attendanceSchema } = require('./attendance_record')
const { leavesSchema } = require('./leaves_model')
const { replacementSchema } = require('./replacement_requests')
const { workingScheduleSchema } = require('./workingSchedule_model')

const staffSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 5
        },
        ID: {
            type: String,
            // unique: true,
            required: true

        },
        email: {
            type: String,
            // unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            default: "123456"
        },
        salary: {
            type: Number,
            // required:true
        },
        role: {
            type: String,
            required: true,
            //operators start with $, to specify constraints
            $in: ["HR members", "teachingAssistants", "courseInstructors", "courseCoordinators", "headOfdepartments"]
        },
        attendance: {
            type: []
        },
        dayOff: {
            type: String,
            required: true
        },
        annualLeavesBalance: {
            type: Number,
            required: true
        }
        ,
        leaves: {
            type: []
        },
        workingSchedule: {
            type: []
        },
        requestReplacementSent:
        //the ones I send
        {
            type:[]
        }
        // },
        // requestReplacement:{
        //     type:replacementSchema
        // }

    })


module.exports.model = mongoose.model('staff', staffSchema)
module.exports.staffSchema = staffSchema
    //table is lowercase and plural of 'user' insterted above
