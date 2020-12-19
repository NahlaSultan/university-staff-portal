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
    courseCoordinatorID:{
        type:String,
    } ,
    numberID:
    {
        type:Number
    },
    assignedFlag:{
         type:Boolean,
         default:false
    }
    // ,
    // academicMember: {
    //     type: staffSchema
    // }
    
   
})
slotSchema.plugin(AutoIncrement, { id: 'slotid_seq', inc_field: 'numberID', reference_fields: ['slotID'] });
module.exports.model = mongoose.model('slot', slotSchema)
module.exports.slotSchema = slotSchema