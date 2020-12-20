
//table is lowercase and plural of 'user' insterted above
const mongoose = require('mongoose')

const AutoIncrementFactory = require('mongoose-sequence');
const connection = mongoose.createConnection(process.env.DB_URL);
const AutoIncrement = AutoIncrementFactory(connection);


const { attendanceSchema } = require('./attendance_record')
const { leavesSchema } = require('./leaves_model')
const { locationSchema } = require('./location_model')
const { replacementSchema } = require('./replacement_requests');
const { slotLinkingSchema } = require('./slotLinking_request');
const { workingScheduleSchema } = require('./workingSchedule_model')

const staffSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 5
        },
        numberID: {
            type: Number
            //unique: true
            // required: true

        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            default: "123456"
        },
        salary: {
            type: Number,
            required: true
        },
        staffType: {
            type: String,
            required: true,
            $in: ["hr", "academic"]

        },
        memberID: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            //operators start with $, to specify constraints
            $in: ["HR members", "teachingAssistants", "courseInstructors", "courseCoordinators", "headOfdepartments"]
        },
        attendance: {
            type: [],
            default: []
        },
        dayOff: {
            type: String,
            required: true,
            $in: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

        },
        annualLeavesBalance: {
            type: Number,
            default: 2.5
        }
        ,
        leaves: {
            type: [],
            default: []
        },
        workingSchedule: {
            type: String
            //referenced the id of the schedule
            //has the same id of the staff member
        },
        requestReplacementSent:
        //the ones I send
        {
            type: [],
            default: []
        },
        faculty: {
            type: String
        },
        department: {
            type: String
        },
        requestReplacmentReceived:
        {
            //the ones I received
            type: [],
            default: []
        },

        officeLocation:
        {
            type: locationSchema,
        },
        staffLinkingRequests: {
            //array of _id of slotLinking requests
            type: [],
            default: []

        },
        coordinatorLinkingRequests: {
            //for coordinators
            type: [],
            default: []
        },
        course: {

            type: []
        }
        ,
        coordinatorCourse: {
            type: [],
            default: []
        },
        courseCoverage: {
            type: Number,
            default: 0
        },
        slotsAssigned: {
            type: []//slot ids

        },
        slotsReplaced: {
            //slots that will be replaced for me
            type: [],
            default: []
        },
        slotsToReplace: {
            //slots I will replace
            type: [],
            default: []
        },
        dayOffRequestsHOD: {
            type: [],
            default: []
        },
        dayOffRequestSent: {
            type: String
        },
        missingDays:{
        type:[],
        default:[]
        },
        missingHours:{
            type:[],
        default:[]

        }
    })

staffSchema.plugin(AutoIncrement, { id: 'id_seq', inc_field: 'numberID', reference_fields: ['staffType'] });
// const Model = mongoose.model('staff', staffSchema)
// Model.counterReset('id_seq', function(err) {
// });    
module.exports.model = mongoose.model('staff', staffSchema)
module.exports.staffSchema = staffSchema
        //table is lowercase and plural of 'user' insterted above

